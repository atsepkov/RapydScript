/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict;";

var fs = require('fs');
var path = require('path');
var rapydscript = require("../lib/rapydscript");

var WARN = 1, ERROR = 2;
var MESSAGES = {
    'undef': 'undefined symbol: "{name}"',
    'unused-import': '"{name}" is imported but not used',
    'unused-local' : '"{name}" is defined but not used',
    'loop-shadowed': 'The loop variable "{name}" was previously used in this scope at line: {line}',
    'extra-semicolon': 'This semi-colon is not needed',
    'eol-semicolon': 'Semi-colons at the end of the line are unnecessary',
    'func-in-branch': 'JavaScript in strict mode does not allow the definition of named functions/classes inside a branch such as an if/try/switch',
    'syntax-err': 'A syntax error caused compilation to abort',
    'import-err': 'An import error caused compilation to abort',
    'def-after-use': 'The symbol "{name}" is defined (at line {line}) after it is used',
    'dup-key': 'JavaScript in strict mode does not allow for duplicate keys ("{name}" is duplicated) in object mode',
    'dup-method': 'The method {name} was defined previously at line: {line}',
    'bad-var-name': '"{name}" is not descriptive enough or too long',
};

//BUILTINS = {'this':true, 'self':true, 'window':true, 'document':true, 'console':true};
var BUILTINS = {};
[
    // JavaScript
    'this',
    'undefined',
    'alert',
    'arguments',
    'window',
    'document',
    'console',
    'JSON',
    'parseInt',
    'parseFloat',
    'Math',
    'isNaN',
    'isFinite',
    'eval',
    'require',
    'setInterval',
    'setTimeout',
    'clearInterval',
    'clearTimeout',

    // node
    'global',
    'process',

    // Python
    'bool',
    'int',
    'float',

    // RapydScript
    'root',
].forEach(function (name) { BUILTINS[name] = true; });

// TEMP: temporary polyfill until ES6
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

// Append native JavaScript classes
Object.keys(rapydscript.NATIVE_CLASSES).forEach(function (name) { BUILTINS[name] = true; });

// Append baselib
Object.keys(rapydscript.parse_baselib(
    path.normalize(path.join(path.dirname(module.filename), '../src'))
)).forEach(function (name) { BUILTINS[name] = true; });

function cmp(a, b) {
    return (a < b) ? -1 : ((a > b) ? 1 : 0);
}

function msg_from_node(filename, ident, name, node, level, line) {
    name = name || ((node.name) ? ((node.name.name) ? node.name.name : node.name) : '');
    if (node instanceof rapydscript.ast.Lambda && node.name) name = node.name.name;
    var msg = MESSAGES[ident].replace('{name}', name || '').replace('{line}', line || '');
    return {
        filename: filename, 
        start_line: (node.start) ? node.start.line : undefined,
        start_col: (node.start) ? node.start.col : undefined,
        end_line: (node.end) ? node.end.line : undefined,
        end_col: (node.end) ? node.end.col: undefined,
        ident: ident,
        message: msg,
        level: level || ERROR,
        name:name,
        other_line: line,
    };
}

function Binding(name, node, options) {
    options = options || {};
    this.node = node;
    this.name = name;
    this.is_import = !!options.is_import;
    this.is_toplevel = !!options.is_toplevel;
    this.is_class = !!options.is_class;
    this.is_function = !!(options.is_function && !options.is_class);
    this.is_func_arg = !!options.is_func_arg;

    this.is_loop = false;
    this.used = false;
}

function merge(one, two) {
    var ans = {};
    Object.keys(one).forEach(function (n) { ans[n] = one[n]; });
    Object.keys(two).forEach(function (n) { ans[n] = two[n]; });
    return ans;
}

function Scope(is_toplevel, parent_scope, filename) {
    // TODO: refactor into a common scope object
    this.parent_scope = parent_scope;
    this.is_toplevel = !!is_toplevel;
    this.bindings = {};
    this.children = [];
    this.shadowed = [];
    this.undefined_references = {};
    this.unused_bindings = {};
    this.nonlocals = {};
    this.defined_after_use = {};
    this.seen_method_names = {};
    this.methods = {};
    this.bad_var_names = {};

    this.add_binding = function(name, node, options) {
        var already_bound = this.bindings.hasOwnProperty(name);
        var b = new Binding(name, node, options);
        if (already_bound) {
            if (this.bindings[name].used) b.used = true;
            this.shadowed.push([name, this.bindings[name], b]);
        } else if (name.length < 2 || name.length > 30) {
            this.bad_var_names[name] = b;
        }
        this.bindings[name] = b;
        return b;
    };

    this.add_nonlocal = function(name) {
        this.nonlocals[name] = true;
    };

    this.register_use = function(name, node) {
        if (this.bindings.hasOwnProperty(name)) {
            this.bindings[name].used = true;
        } else {
            this.undefined_references[name] = node;
        }
    };

    this.finalize = function() {
        // Find defined after use
        Object.keys(this.undefined_references).forEach(function (name) {
            if (this.bindings.hasOwnProperty(name) && !this.nonlocals.hasOwnProperty(name)) {
                var b = this.bindings[name];
                b.used = true;
                if (!this.defined_after_use.hasOwnProperty(name)) {
                    this.defined_after_use[name] = [this.undefined_references[name], b];
                }
                delete this.undefined_references[name];
            }
            if (this.methods.hasOwnProperty(name)) delete this.undefined_references[name];
        }, this);

        // Find unused bindings
        Object.keys(this.bindings).forEach(function(name) {
            var b = this.bindings[name];
            // Check if it is used in a descendant scope
            var found = false;
            this.for_descendants(function (scope) {
                if (scope.undefined_references.hasOwnProperty(name)) {
                    found = true;
                    // Remove from childs' undefined references
                    delete scope.undefined_references[name];
                } else if (scope.nonlocals.hasOwnProperty(name) && scope.bindings.hasOwnProperty(name)) found = true;
            });
            if (!found && !b.used) {
                // We deliberately ignore unused loop variables so as not to complain for the
                // common idiom of using a for loop to repeat an action, without referring to the
                // loop variable
                this.unused_bindings[name] = b;
            }
        }, this);
    };

    this.for_descendants = function(func) {
        this.children.forEach(function (child) {
            func(child);
            child.for_descendants(func);
        });
    };

    this.messages = function() {
        var ans = [];

        Object.keys(this.undefined_references).forEach(function (name) {
            var node = this.undefined_references[name];
            ans.push(msg_from_node(filename, 'undef', name, node));
        }, this);

        Object.keys(this.unused_bindings).forEach(function (name) {
            var b = this.unused_bindings[name];
            if (b.is_import) {
                ans.push(msg_from_node(filename, 'unused-import', name, b.node));
            } else if (!b.is_toplevel && !b.is_func_arg) {
                ans.push(msg_from_node(filename, 'unused-local', name, b.node));
            }
        }, this);

        this.shadowed.forEach(function(x) {
            var name = x[0], first = x[1], second = x[2];
            if (second.is_loop && !first.is_loop) {
                var line = (first.node.start) ? first.node.start.line : undefined;
                ans.push(msg_from_node(filename, 'loop-shadowed', name, second.node, ERROR, line));
            }
        });

        Object.keys(this.defined_after_use).forEach(function (name) {
            var use = this.defined_after_use[name][0], binding = this.defined_after_use[name][1];
            ans.push(msg_from_node(filename, 'def-after-use', name, use, ERROR, binding.node.start.line));
        }, this);

        Object.keys(this.bad_var_names).forEach(function (name) {
            var b = this.bad_var_names[name];
            if (b.is_import) {
                ans.push(msg_from_node(filename, 'bad-var-name', name, b.node, WARN));
            } else if (!b.is_toplevel && !b.is_func_arg) {
                ans.push(msg_from_node(filename, 'bad-var-name', name, b.node, WARN));
            }
        }, this);

        return ans;
    };

}

function Linter(toplevel, filename, code) {

    this.scopes = [];
    this.walked_scopes = [];
    this.current_node = null;
    this.in_assign = false;
    this.branches = [];
    this.messages = [];

    this.add_binding = function(name, binding_node) {
        var scope = this.scopes[this.scopes.length - 1];
        var node = this.current_node;
        var options = {
            is_toplevel: scope.is_toplevel,
            is_import: (node instanceof rapydscript.ast.Import || node instanceof rapydscript.ast.ImportedVar),
            is_function: (node instanceof rapydscript.ast.Lambda),
            is_class: (node instanceof rapydscript.ast.Class),
            is_func_arg: (node instanceof rapydscript.ast.SymbolFunarg),
        };
        return scope.add_binding(name, (binding_node || node), options);
    };

    this.add_nonlocal = function(name) {
        var scope = this.scopes[this.scopes.length - 1];
        return scope.add_nonlocal(name);
    };

    this.register_use = function(name) {
        var scope = this.scopes[this.scopes.length - 1];
        var node = this.current_node;
        return scope.register_use(name, node);
    };

    this.handle_import = function() {
        var node = this.current_node;
        if (!node.argnames) {
            var name = (node.alias) ? node.alias.name : node.key.split('.', 1)[0];
            this.add_binding(name, (node.alias || node));
        }
    };

    this.handle_imported_var = function() {
        var node = this.current_node;
        var name = (node.alias) ? node.alias.name : node.name;
        this.add_binding(name);
    };

    this.handle_lambda = function() {
        var node = this.current_node;
        var name = node.name ? node.name.name : undefined;

        var scope = this.scopes[this.scopes.length - 1];
        if (this.branches.length && name) {
            this.messages.push(msg_from_node(filename, 'func-in-branch', node.name, node));
        }

        if (name) {
            // FIXME this triggers a false positive in cases when user decides to name a function that's being passed in as an argument
            // or used as a hash value. A potential way to address that would be to track how the current node gets used by its parent.
            if (node instanceof rapydscript.ast.Method) {
                scope.methods[name] = true;
                if (scope.seen_method_names.hasOwnProperty(name)) {
                    if (!node.is_setter) this.messages.push(msg_from_node(filename, 'dup-method', node.name, node, WARN, scope.seen_method_names[name]));
                } else scope.seen_method_names[name] = node.start.line;
            } else this.add_binding(name);
        }
    };

    this.handle_assign = function() {
        var node = this.current_node;

        if (node.left instanceof rapydscript.ast.SymbolRef) {
            node.left.lint_visited = node.operator === '=';  // Could be compound assignment like: +=
            if (node.operator === '=') {
                // Only create a binding if the operator is not 
                // a compound assignment operator
                this.current_node = node.left;
                this.add_binding(node.left.name);
                this.current_node = node;
            }
        } else if (node.left instanceof rapydscript.ast.Array) {
            // destructuring assignment: a, b = 1, 2
            for (var i = 0; i < node.left.elements.length; i++) {
                var cnode = node.left.elements[i];
                if (cnode instanceof rapydscript.ast.SymbolRef) {
                    this.current_node = cnode;
                    cnode.lint_visited = true;
                    this.add_binding(cnode.name);
                    this.current_node = node;
                }
            }
        }

    };

    this.handle_vardef = function() {
        var node = this.current_node;
        if (node.value) this.current_node = node.value;
        if (node.name instanceof rapydscript.ast.SymbolNonlocal) {
            this.add_nonlocal(node.name.name);
        } else {
            this.add_binding(node.name.name, node.name);
        }
        this.current_node = node;
    };

    this.handle_symbol_ref = function() {
        var node = this.current_node;
        this.register_use(node.name);
    };

    this.handle_decorator = function() {
        var node = this.current_node;
        this.register_use(node.name);
    };

    this.handle_scope = function() {
        var node = this.current_node;
        var nscope = new Scope(node instanceof rapydscript.ast.TopLevel, this.scopes[this.scopes.length - 1], filename);
        if (this.scopes.length) this.scopes[this.scopes.length - 1].children.push(nscope);
        this.scopes.push(nscope);
    };

    this.handle_symbol_funarg = function() {
        // Arguments in a function definition
        var node = this.current_node;
        this.add_binding(node.name);
    };

    this.handle_comprehension = function() {
        this.handle_scope();  // Comprehensions create their own scope
        this.handle_for_in();
    };

    this.handle_for_in = function() {
        var node = this.current_node;
        if (node.init instanceof rapydscript.ast.SymbolRef) {
            this.add_binding(node.init.name).is_loop = true;
            node.init.lint_visited = true;
        } else if (node.init instanceof rapydscript.ast.Array) {
            // destructuring assignment: for a, b in []
            for (var i = 0; i < node.init.elements.length; i++) {
                var cnode = node.init.elements[i];
                if (cnode instanceof rapydscript.ast.SymbolRef) {
                    this.current_node = cnode;
                    cnode.lint_visited = true;
                    this.add_binding(cnode.name).is_loop = true;
                    this.current_node = node;
                }
            }
 
        }
    };

    this.handle_for_js = function() {
        var node = this.current_node;
        var js = node.condition.value;
        var statements = js.split(';');
        var decl = statements[0].trim();
        var declared = false;
        if (decl.startsWith('var ')) {
            declared = true;
            decl = decl.slice(4);
        }
        var self = this;
        decl.split(',').forEach(function (part) {
            var name = /^[a-zA-Z0-9_]+/.exec(part.trimLeft())[0];
            if (declared) self.add_binding(name);
            self.register_use(name);

        });
    };

    this.handle_except = function() {
        var node = this.current_node;
        if (node.argname) {
            this.add_binding(node.argname.name, node.argname);
        }
    };

    this.handle_empty_statement = function() {
        var node = this.current_node;
        if (node.stype == ';') {
            this.messages.push(msg_from_node(filename, 'extra-semicolon', ';', node, WARN));
        }
    };

    this.handle_class = function() {
        var node = this.current_node;
        if (node.name) {
            node.name.lint_visited = true;
            this.add_binding(node.name.name, node.name);
        }
    };

    this.handle_object_literal = function() {
        var node = this.current_node;
        var seen = {};
        (node.properties || []).forEach(function (prop) {
            if (prop.key instanceof rapydscript.ast.Constant) {
                var val = prop.key.getValue();
                if (seen.hasOwnProperty(val)) {
                    this.messages.push(msg_from_node(filename, 'dup-key', val, prop));
                }
                seen[val] = true;
            }
        }, this);
    };

    this.handle_call = function() {
        var node = this.current_node;
        if (node.args.kwargs) node.args.kwargs.forEach(function(kw) { kw[0].lint_visited = true; });
    };

    this._visit = function (node, cont) {
        if (node.lint_visited) return;
        this.current_node = node;
        var scope_count = this.scopes.length;
        var branch_count = this.branches.length;
        if (node instanceof rapydscript.ast.If || node instanceof rapydscript.ast.Switch || node instanceof rapydscript.ast.Try || node instanceof rapydscript.ast.Catch || node instanceof rapydscript.ast.Except) {
            this.branches.push(1);
        }

        if (node instanceof rapydscript.ast.Lambda) {
            this.handle_lambda();
        } else if (node instanceof rapydscript.ast.Import) {
            this.handle_import();
        } else if (node instanceof rapydscript.ast.ImportedVar) {
            this.handle_imported_var();
        } else if (node instanceof rapydscript.ast.Class) {
            this.handle_class();
        } else if (node instanceof rapydscript.ast.BaseCall) {
            this.handle_call();
        } else if (node instanceof rapydscript.ast.Assign) {
            this.handle_assign();
        } else if (node instanceof rapydscript.ast.VarDef) {
            this.handle_vardef();
        } else if (node instanceof rapydscript.ast.SymbolRef) {
            this.handle_symbol_ref();
        } else if (node instanceof rapydscript.ast.Decorator) {
            this.handle_decorator();
        } else if (node instanceof rapydscript.ast.SymbolFunarg) {
            this.handle_symbol_funarg();
        } else if (node instanceof rapydscript.ast.ListComprehension) {
            this.handle_comprehension();
        } else if (node instanceof rapydscript.ast.ForIn) {
            this.handle_for_in();
        } else if (node instanceof rapydscript.ast.ForJS) {
            this.handle_for_js();
        } else if (node instanceof rapydscript.ast.Except) {
            this.handle_except();
        } else if (node instanceof rapydscript.ast.EmptyStatement) {
            this.handle_empty_statement();
        } else if (node instanceof rapydscript.ast.ObjectLiteral) {
            this.handle_object_literal();
        }

        if (node instanceof rapydscript.ast.Scope) {
            this.handle_scope();
        } 

        if (cont !== undefined) cont();

        if (this.scopes.length > scope_count) {
            this.scopes[this.scopes.length - 1].finalize();
            this.walked_scopes.push(this.scopes.pop());
        }

        if (this.branches.length > branch_count) this.branches.pop();
    };

    this.resolve = function() {
        var messages = this.messages;
        var line_filters = {};

        code.split('\n').forEach(function(line, num) {
            line = line.trimRight();
            num++;
            if (line[line.length - 1] === ';') {
                var ident = 'eol-semicolon';
                messages.push({filename:filename, ident:ident, message:MESSAGES[ident],
                    level:WARN, name:';', start_line:num, start_col:line.lastIndexOf(';')});
            }
            var parts = line.split(' ');
            var last = parts[parts.length - 1], filters;
            if (last && last.substr(0, 7).toLowerCase().replace('#', '') === 'no-lint') {
                parts = last.split(':').slice(1);
                if (parts.length) {
                    filters = {};
                    parts = parts[0].split(',');
                    for (var i = 0; i < parts.length; i++) filters[parts[i].trim()] = true;
                } else filters = MESSAGES;
            }
            if (filters) line_filters[num] = filters;
        });

        this.walked_scopes.forEach(function (scope) {
            messages = messages.concat(scope.messages());
        });
        messages = messages.filter(function(msg) {
            var ignore = (msg.start_line !== undefined && line_filters.hasOwnProperty(msg.start_line) && line_filters[msg.start_line].hasOwnProperty(msg.ident));
            return !ignore && (msg.ident != 'undef' || !BUILTINS.hasOwnProperty(msg.name));
        });
        messages.sort(function (a, b) { return cmp(a.start_line, b.start_line) || cmp(a.start_col, b.start_col_); });
        return messages;
    };

}

function lint_code(code, options) {
    options = options || {};
    var reportcb = options.report || cli_report;
    var filename = options.filename || '<eval>';
    var toplevel, messages;
    var lines = code.split('\n');  // Can be used (in the future) to display extract from code corresponding to error location
    rapydscript.ast.Node.warn_function = function() {};

    try {
        toplevel = rapydscript.parse(code, {
            filename: filename,
            basedir: path.dirname(filename),
            libdir: path.dirname(filename),
            es6: ARGV.ecmascript6,
            for_linting: true,
        });
    } catch(e) {
        if (e instanceof rapydscript.ParseError) {
            messages = [{
                filename: filename,
                start_line: e.line,
                start_col: e.col,
                level: ERROR,
                ident: 'syntax-err',
                message: e.message
            }];
        } else if (e instanceof rapydscript.ImportError) {
            messages = [{
                filename: filename,
                start_line: e.line,
                start_col: e.col,
                level: ERROR,
                ident: 'import-err',
                message: e.message
            }];
        } else {
            throw e;
        }
    }

    if (toplevel) {
        var linter = new Linter(toplevel, filename, code);
        toplevel.walk(linter);
        messages = linter.resolve();
    }

    messages.forEach(reportcb);
    return messages;
}

// CLI
function read_whole_file(filename, cb) {
    if (!filename) {
        var chunks = [];
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function () {
            cb(null, chunks.join(""));
        });
        process.openStdin();
    } else {
        fs.readFile(filename, "utf-8", cb);
    }
}

function cli_report(r) {
    var parts = [];
    parts.push(r.filename);
    parts.push((r.start_line || 0) + ',' + ((r.start_col === undefined) ? 0 : r.start_col + 1));
    parts.push((r.level === WARN ? 'WARN' : 'ERR') + '(' + (r.name || '') + ')\t' + r.message + ' [' + r.ident + ']');
    console.log(parts.join(' '));
}

var ARGV = {};
module.exports.cli = function(argv, base_path, src_path, lib_path) {
    ARGV = argv;
    var files = argv.files.slice();
    var num_of_files = files.length || 1;

    if (files.filter(function(el){ return el == "-"; }).length > 1) {
        console.error("ERROR: Can read a single file from STDIN (two or more dashes specified)");
        process.exit(1);
    }

    var all_ok = true;

    function lint_single_file(err, code) {
        var output;
        if (err) {
            console.error("ERROR: can't read file: " + file);
            process.exit(1);
        }
        if (lint_code(code, {filename:files[0]}).length) all_ok = false;

        files = files.slice(1);
        if (files.length) {
            setImmediate(read_whole_file, files[0], lint_single_file);
            return;
        } else process.exit((all_ok) ? 0 : 2);
    }

    setImmediate(read_whole_file, files[0], lint_single_file);

};

module.exports.lint_code = lint_code;
module.exports.WARN = WARN;
module.exports.ERROR = ERROR;
module.exports.MESSAGES = MESSAGES;
