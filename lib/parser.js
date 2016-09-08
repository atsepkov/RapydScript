var NATIVE_CLASSES, COMMON_STATIC, CLASS_MAP, BASELIB, STDLIB, UNARY_PREFIX, ASSIGNMENT, PRECEDENCE, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN, DANGER_ZONE;
"\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under Apache 2.0 license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n  RapydScript source code is originally based on UglifyJS2 (covered\n  by BSD license). UglifyJS2 was written by Mihai Bazon\n  <mihai.bazon@gmail.com>, who is its respective copyright holder.\n\n    Redistribution and use in source and binary forms, with or without\n    modification, are permitted provided that the following conditions\n    are met:\n\n        * Redistributions of source code must retain the above\n          copyright notice, this list of conditions and the following\n          disclaimer.\n\n        * Redistributions in binary form must reproduce the above\n          copyright notice, this list of conditions and the following\n          disclaimer in the documentation and/or other materials\n          provided with the distribution.\n\n    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY\n    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE\n    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,\n    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF\n    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF\n    SUCH DAMAGE.\n\n**********************************************************************\n";
"use strict";
NATIVE_CLASSES = {
    "Image": {},
    "RegExp": {},
    "Error": {},
    "Object": {
        "static": [ "assign", "getOwnPropertyNames", "keys", "create", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf" ]
    },
    "String": {
        "static": [ "fromCharCode" ]
    },
    "Array": {
        "static": [ "isArray", "from", "of" ]
    },
    "Number": {
        "static": [ "isFinite", "isNaN" ]
    },
    "Function": {},
    "Date": {
        "static": [ "UTC", "now", "parse" ]
    },
    "Boolean": {},
    "ArrayBuffer": {},
    "DataView": {},
    "Float32Array": {},
    "Float64Array": {},
    "Int16Array": {},
    "Int32Array": {},
    "Int8Array": {},
    "Uint16Array": {},
    "Uint32Array": {},
    "Uint8Array": {},
    "Uint8ClampedArray": {},
    "Map": {},
    "WeakMap": {},
    "Set": {},
    "WeakSet": {},
    "AssertionError": {},
    "IndexError": {},
    "KeyError": {},
    "TypeError": {},
    "ValueError": {}
};
COMMON_STATIC = [ "call", "apply", "bind", "toString" ];
CLASS_MAP = {};
BASELIB = {};
STDLIB = [ "abs", "bin", "cmp", "chr", "dir", "hex", "max", "min", "mixin", "print", "range", "reduce", "getattr", "setattr", "hasattr", "eq", "bind", "rebind_all", "all", "any", "enumerate", "filter", "len", "map", "reversed", "sum", "zip", "AssertionError", "IndexError", "KeyError", "TypeError", "ValueError" ];
UNARY_PREFIX = makePredicate([ "typeof", "void", "delete", "--", "++", "!", "~", "-", "+", "@" ]);
ASSIGNMENT = makePredicate([ "=", "+=", "-=", "/=", "//=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);
PRECEDENCE = function(a, ret) {
    var ՐՏ_Temp, i, b, j;
    for (i = 0; i < a.length; i++) {
        b = a[i];
        for (j = 0; j < b.length; j++) {
            ret[b[j]] = i + 1;
        }
    }
    return ret;
}.call(this, [ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "//", "%" ], [ "**" ] ], {});
STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);
ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);
DANGER_ZONE = {};
function parse($TEXT, options) {
    var ՐՏ_Temp, options, module_id, import_dirs, IMPORTED, IMPORTING, S, cname, obj, statement, import_, class_, function_, nonlocal_, const_, new_, expr_atom, array_, object_, subscripts, maybe_unary, expr_op, maybe_conditional, maybe_assign, expression;
    options = defaults(options, {
        strict: false,
        filename: null,
        auto_bind: false,
        module_id: "__main__",
        es6: false,
        toplevel: null,
        import_dirs: [],
        classes: undefined
    });
    module_id = options.module_id;
    import_dirs = options.import_dirs.slice(0);
    if (options.libdir) {
        import_dirs.push(options.libdir);
    }
    if (options.basedir) {
        import_dirs.unshift(options.basedir);
    }
    IMPORTED = options.IMPORTED || {};
    IMPORTING = options.IMPORTING || {};
    IMPORTING[module_id] = true;
    DANGER_ZONE[module_id] = {};
    S = {
        input: typeof $TEXT === "string" ? tokenizer($TEXT, options.filename) : $TEXT,
        token: null,
        prev: null,
        peeked: null,
        in_directives: true,
        in_loop: 0,
        in_scope: [ {
            type: null,
            vars: {},
            "nonlocal": {},
            classes: {}
        } ],
        labels: [],
        decorators: []
    };
    if (options.classes) {
        var ՐՏ_Iter16 = ՐՏ_Iterable(options.classes);
        for (var ՐՏ_Index16 = 0; ՐՏ_Index16 < ՐՏ_Iter16.length; ՐՏ_Index16++) {
            cname = ՐՏ_Iter16[ՐՏ_Index16];
            obj = options.classes[cname];
            S.in_scope[0].classes[cname] = {
                "static": obj.static,
                "bound": obj.bound
            };
        }
    }
    S.token = next();
    function is_(type, value) {
        var ՐՏ_Temp;
        return is_token(S.token, type, value);
    }
    function peek() {
        var ՐՏ_Temp;
        return S.peeked || (S.peeked = S.input());
    }
    function next() {
        var ՐՏ_Temp;
        S.prev = S.token;
        if (S.peeked) {
            S.token = S.peeked;
            S.peeked = null;
        } else {
            S.token = S.input();
        }
        S.in_directives = S.in_directives && (S.token.type === "string" || is_("punc", ";"));
        return S.token;
    }
    function prev() {
        var ՐՏ_Temp;
        return S.prev;
    }
    function croak(msg, line, col, pos, is_eof) {
        var ՐՏ_Temp, ctx;
        ctx = S.input.context();
        js_error(msg, ctx.filename, line !== undefined ? line : ctx.tokline, col !== undefined ? col : ctx.tokcol, pos !== undefined ? pos : ctx.tokpos, is_eof);
    }
    function token_error(token, msg) {
        var ՐՏ_Temp, is_eof;
        is_eof = token.type === "eof" ? true : false;
        croak(msg, token.line, token.col, undefined, is_eof);
    }
    function unexpected(token) {
        var ՐՏ_Temp, token;
        if (token === undefined) {
            token = S.token;
        }
        token_error(token, "Unexpected token: " + token.type + " «" + token.value + "»");
    }
    function expect_token(type, val) {
        var ՐՏ_Temp;
        if (is_(type, val)) {
            return next();
        }
        token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
    }
    function expect(punc) {
        var ՐՏ_Temp;
        return expect_token("punc", punc);
    }
    function can_insert_semicolon() {
        var ՐՏ_Temp;
        return !options.strict && (S.token.nlb || is_("eof") || is_("punc", "}"));
    }
    function semicolon() {
        var ՐՏ_Temp;
        if (is_("punc", ";")) {
            next();
            S.token.nlb = true;
        }
    }
    function parenthesised() {
        var ՐՏ_Temp, exp;
        expect("(");
        exp = expression(true);
        expect(")");
        return exp;
    }
    function embed_tokens(parser) {
        var ՐՏ_Temp;
        return function() {
            var ՐՏ_Temp, start, expr, end;
            start = S.token;
            expr = parser();
            if (expr === undefined) {
                unexpected();
            }
            end = prev();
            expr.start = start;
            expr.end = end;
            return expr;
        };
    }
    function is_nested_comparison(stmt) {
        var ՐՏ_Temp, comparators;
        "\n        Check if the statement is a nested comparison\n        ";
        comparators = {
            "<": true,
            ">": true,
            "<=": true,
            ">=": true,
            "==": true,
            "!=": true,
            "===": true,
            "!==": true
        };
        if (stmt instanceof AST_Binary && ՐՏ_in(stmt.operator, comparators) && stmt.left instanceof AST_Binary && ՐՏ_in(stmt.left.operator, comparators)) {
            return true;
        } else {
            return false;
        }
    }
    function scan_for_top_level_callables(body) {
        var ՐՏ_Temp, ans, name, obj, x, opt;
        ans = [];
        if (Array.isArray(body)) {
            for (name in body) {
                obj = body[name];
                if (obj instanceof AST_Function || obj instanceof AST_Class) {
                    if (obj.name) {
                        ans.push(obj.name);
                    } else {
                        token_error(obj.start, "Top-level functions must have names");
                    }
                } else {
                    if (obj instanceof AST_Scope) {
                        continue;
                    }
                    var ՐՏ_Iter17 = ՐՏ_Iterable([ "body", "alternative" ]);
                    for (var ՐՏ_Index17 = 0; ՐՏ_Index17 < ՐՏ_Iter17.length; ՐՏ_Index17++) {
                        x = ՐՏ_Iter17[ՐՏ_Index17];
                        opt = obj[x];
                        if (opt) {
                            ans = ans.concat(scan_for_top_level_callables(opt));
                        }
                        if (opt instanceof AST_Assign && !(opt.right instanceof AST_Scope)) {
                            ans = ans.concat(scan_for_top_level_callables(opt.right));
                        }
                    }
                }
            }
        } else if (body.body) {
            ans = ans.concat(scan_for_top_level_callables(body.body));
            if (body.alternative) {
                ans = ans.concat(scan_for_top_level_callables(body.alternative));
            }
        }
        return ans;
    }
    statement = embed_tokens(function() {
        var ՐՏ_Temp, tmp_, dir, stat, start, func, chain, ctor, tmp;
        if (is_("operator", "/") || is_("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.substr(1));
        }
        tmp_ = S.token.type;
        if (tmp_ === "string") {
            dir = S.in_directives;
            stat = simple_statement();
            if (dir && stat.body instanceof AST_String && !is_("punc", ",")) {
                return new AST_Directive({
                    value: stat.body.value
                });
            }
            return stat;
        } else if (tmp_ === "shebang") {
            tmp_ = S.token.value;
            next();
            return new AST_Directive({
                value: tmp_
            });
        } else if (tmp_ === "num" || tmp_ === "regexp" || tmp_ === "operator" || tmp_ === "atom") {
            return simple_statement();
        } else if (tmp_ === "punc") {
            tmp_ = S.token.value;
            if (tmp_ === ":") {
                return new AST_BlockStatement({
                    start: S.token,
                    body: block_(),
                    end: prev()
                });
            } else if (tmp_ === "{" || tmp_ === "[" || tmp_ === "(") {
                return simple_statement();
            } else if (tmp_ === ";") {
                next();
                return new AST_EmptyStatement();
            } else {
                unexpected();
            }
        } else if (tmp_ === "name") {
            return is_token(peek(), "punc", ":") ? labeled_statement() : simple_statement();
        } else if (tmp_ === "keyword") {
            tmp_ = S.token.value;
            if (ES6_KEYWORDS(tmp_) && !options.es6) {
                token_error(prev(), "«" + tmp_ + "» keyword not supported with ES5-compatible output, use --ecmascript6 compilation flag");
            }
            next();
            if (tmp_ === "break") {
                return break_cont(AST_Break);
            } else if (tmp_ === "continue") {
                return break_cont(AST_Continue);
            } else if (tmp_ === "debugger") {
                semicolon();
                return new AST_Debugger();
            } else if (tmp_ === "do") {
                return new AST_Do({
                    body: in_loop(statement),
                    condition: function() {
                        var ՐՏ_Temp, tmp;
                        expect(".");
                        expect_token("keyword", "while");
                        tmp = expression(true);
                        semicolon();
                        return tmp;
                    }.call(this)
                });
            } else if (tmp_ === "while") {
                return new AST_While({
                    condition: expression(true),
                    body: in_loop(statement)
                });
            } else if (tmp_ === "for") {
                if (is_("name", "JS")) {
                    return for_js();
                }
                return for_();
            } else if (tmp_ === "from") {
                return import_(true);
            } else if (tmp_ === "import") {
                return import_(false);
            } else if (tmp_ === "class") {
                BASELIB["extends"] = true;
                if (options.auto_bind) {
                    BASELIB["rebind_all"] = true;
                    BASELIB["bind"] = true;
                }
                return class_();
            } else if (tmp_ === "def") {
                start = prev();
                func = function_(S.in_scope[S.in_scope.length-1].type === "class" ? S.in_scope[S.in_scope.length-1].name : false);
                func.start = start;
                func.end = prev();
                chain = subscripts(func, true);
                if (chain === func) {
                    return func;
                } else {
                    return new AST_SimpleStatement({
                        start: start,
                        body: chain,
                        end: prev()
                    });
                }
            } else if (tmp_ === "if") {
                return if_();
            } else if (tmp_ === "pass") {
                semicolon();
                return new AST_EmptyStatement();
            } else if (tmp_ === "return" || tmp_ === "yield") {
                if (S.in_scope[S.in_scope.length-1].type !== "function") {
                    croak("'return' outside of function");
                }
                if (tmp_ === "yield") {
                    S.in_scope[S.in_scope.length-1].generator = true;
                    ctor = AST_Yield;
                } else {
                    ctor = AST_Return;
                }
                return new ctor({
                    value: is_("punc", ";") ? function() {
                        var ՐՏ_Temp;
                        semicolon();
                        return null;
                    }() : can_insert_semicolon() ? null : function() {
                        var ՐՏ_Temp, tmp;
                        tmp = expression(true);
                        semicolon();
                        return tmp;
                    }()
                });
            } else if (tmp_ === "switch") {
                return new AST_Switch({
                    expression: parenthesised(),
                    body: in_loop(switch_body_)
                });
            } else if (tmp_ === "raise") {
                if (S.token.nlb) {
                    return new AST_Throw({
                        value: new AST_SymbolCatch({
                            name: "ՐՏ_Exception"
                        })
                    });
                }
                tmp = expression(true);
                semicolon();
                return new AST_Throw({
                    value: tmp
                });
            } else if (tmp_ === "try") {
                return try_();
            } else if (tmp_ === "nonlocal") {
                tmp = nonlocal_();
                semicolon();
                return tmp;
            } else if (tmp_ === "const") {
                tmp = const_();
                semicolon();
                return tmp;
            } else if (tmp_ === "with") {
                return new AST_With({
                    expression: parenthesised(),
                    body: statement()
                });
            } else {
                unexpected();
            }
        }
    });
    function labeled_statement() {
        var ՐՏ_Temp, label, stat;
        label = as_symbol(AST_Label);
        if (find_if(function(l) {
            var ՐՏ_Temp;
            return l.name === label.name;
        }, S.labels)) {
            croak("Label " + label.name + " defined twice");
        }
        expect(":");
        S.labels.push(label);
        stat = statement();
        S.labels.pop();
        return new AST_LabeledStatement({
            body: stat,
            label: label
        });
    }
    function simple_statement(tmp) {
        var ՐՏ_Temp, tmp;
        tmp = expression(true);
        semicolon();
        return new AST_SimpleStatement({
            body: tmp
        });
    }
    function break_cont(type) {
        var ՐՏ_Temp, label;
        label = null;
        if (!can_insert_semicolon()) {
            label = as_symbol(AST_LabelRef, true);
        }
        if (label !== null) {
            if (!find_if(function(l) {
                var ՐՏ_Temp;
                return l.name === label.name;
            }, S.labels)) {
                croak("Undefined label " + label.name);
            }
        } else if (S.in_loop === 0) {
            croak(type.TYPE + " not inside a loop or switch");
        }
        semicolon();
        return new type({
            label: label
        });
    }
    function seq_to_array(seq) {
        var ՐՏ_Temp, tmp, iter;
        tmp = [];
        iter = seq;
        while (iter && iter.car) {
            tmp.push(iter.car);
            iter = iter.cdr;
        }
        tmp.push(iter);
        return new AST_Array({
            start: seq.start,
            elements: tmp,
            end: seq.end
        });
    }
    function for_(list_comp) {
        var ՐՏ_Temp, init;
        init = null;
        if (!is_("punc", ";")) {
            init = expression(true, true);
            if (init instanceof AST_Seq) {
                init = seq_to_array(init);
            }
            if (is_("operator", "in")) {
                if (init instanceof AST_Var && init.definitions.length > 1) {
                    croak("Only one variable declaration allowed in for..in loop");
                }
                next();
                return for_in(init, list_comp);
            }
        }
        unexpected();
    }
    function for_in(init, list_comp) {
        var ՐՏ_Temp, lhs, obj, element;
        lhs = init instanceof AST_Var ? init.definitions[0].name : null;
        obj = expression(true);
        if (init instanceof AST_Array) {
            var ՐՏ_Iter18 = ՐՏ_Iterable(init.elements);
            for (var ՐՏ_Index18 = 0; ՐՏ_Index18 < ՐՏ_Iter18.length; ՐՏ_Index18++) {
                element = ՐՏ_Iter18[ՐՏ_Index18];
                mark_local_assignment(element);
            }
        } else {
            mark_local_assignment(init);
        }
        BASELIB["iterable"] = true;
        if (list_comp) {
            return {
                init: init,
                name: lhs,
                object: obj
            };
        }
        return new AST_ForIn({
            init: init,
            name: lhs,
            object: obj,
            body: in_loop(statement)
        });
    }
    function for_js() {
        var ՐՏ_Temp, condition;
        condition = expression(true, true);
        return new AST_ForJS({
            condition: condition,
            body: in_loop(statement)
        });
    }
    function get_class_in_scope(expr) {
        var ՐՏ_Temp, s, referenced_path, expr, class_name;
        if (expr instanceof AST_SymbolRef) {
            if (NATIVE_CLASSES.hasOwnProperty(expr.name)) {
                return NATIVE_CLASSES[expr.name];
            }
            var ՐՏ_Iter19 = ՐՏ_Iterable(range(S.in_scope.length - 1, -1, -1));
            for (var ՐՏ_Index19 = 0; ՐՏ_Index19 < ՐՏ_Iter19.length; ՐՏ_Index19++) {
                s = ՐՏ_Iter19[ՐՏ_Index19];
                if (S.in_scope[s].classes.hasOwnProperty(expr.name)) {
                    return S.in_scope[s].classes[expr.name];
                }
            }
        } else if (expr instanceof AST_Dot) {
            referenced_path = [];
            while (expr instanceof AST_Dot) {
                referenced_path.unshift(expr.property);
                expr = expr.expression;
            }
            if (expr instanceof AST_SymbolRef) {
                referenced_path.unshift(expr.name);
                if (len(referenced_path) > 1) {
                    class_name = referenced_path.join(".");
                    var ՐՏ_Iter20 = ՐՏ_Iterable(range(S.in_scope.length - 1, -1, -1));
                    for (var ՐՏ_Index20 = 0; ՐՏ_Index20 < ՐՏ_Iter20.length; ՐՏ_Index20++) {
                        s = ՐՏ_Iter20[ՐՏ_Index20];
                        if (S.in_scope[s].classes.hasOwnProperty(class_name)) {
                            return S.in_scope[s].classes[class_name];
                        }
                    }
                }
            }
        }
        return false;
    }
    function do_import(key) {
        var ՐՏ_Temp, package_module_id, src_code, filename, modpath, location, data, contents;
        if (IMPORTED.hasOwnProperty(key)) {
            return;
        }
        if (IMPORTING.hasOwnProperty(key) && IMPORTING[key]) {
            throw ImportError("Detected a recursive import of: " + key + " while importing: " + module_id);
        }
        package_module_id = key.split(".").slice(0, -1).join(".");
        if (len(package_module_id) > 0) {
            do_import(package_module_id);
        }
        function safe_read(base_path) {
            var ՐՏ_Temp, i, path;
            var ՐՏ_Iter21 = ՐՏ_Iterable(enumerate([ base_path + ".pyj", base_path + "/__init__.pyj" ]));
            for (var ՐՏ_Index21 = 0; ՐՏ_Index21 < ՐՏ_Iter21.length; ՐՏ_Index21++) {
                var ՐՏ_Unpack = ՐՏ_Iter21[ՐՏ_Index21];
                i = ՐՏ_Unpack[0];
                path = ՐՏ_Unpack[1];
                try {
                    return [ options.readfile(path, "utf-8"), path ];
                } catch (ՐՏ_Exception) {
                    var e = ՐՏ_Exception;
                    if (e.code === "ENOENT" || e.code === "EPERM" || e.code === "EACCESS") {
                        if (i === 1) {
                            return [null, null];
                        }
                    }
                    if (i === 1) {
                        throw ՐՏ_Exception;
                    }
                }
            }
        }
        src_code = filename = null;
        modpath = key.replace(".", "/");
        var ՐՏ_Iter22 = ՐՏ_Iterable(import_dirs);
        for (var ՐՏ_Index22 = 0; ՐՏ_Index22 < ՐՏ_Iter22.length; ՐՏ_Index22++) {
            location = ՐՏ_Iter22[ՐՏ_Index22];
            if (location) {
                var ՐՏ_Unpack = safe_read(location + "/" + modpath);
                data = ՐՏ_Unpack[0];
                filename = ՐՏ_Unpack[1];
                if (data !== null) {
                    src_code = data;
                    break;
                }
            }
        }
        if (src_code === null) {
            throw "Failed Import: '" + key + "' module doesn't exist in any of the import directories: " + import_dirs.join(", ");
        }
        contents = parse(src_code, {
            filename: filename,
            toplevel: null,
            readfile: options.readfile,
            basedir: options.basedir,
            libdir: options.libdir,
            module_id: key,
            IMPORTED: IMPORTED,
            IMPORTING: IMPORTING
        });
        if (len(package_module_id) > 0) {
            IMPORTED[package_module_id].submodules.push(key);
        }
    }
    import_ = function(from_import) {
        var ՐՏ_Temp, ans, tmp, name, key, alias, imp, classes, argnames, aname, argvar, obj, i;
        ans = new AST_Imports({
            "imports": []
        });
        while (true) {
            tmp = name = expression(false);
            key = "";
            while (tmp instanceof AST_Dot) {
                key = "." + tmp.property + key;
                tmp = tmp.expression;
            }
            key = tmp.name + key;
            alias = null;
            if (!from_import && is_("keyword", "as")) {
                next();
                alias = as_symbol(AST_SymbolAlias);
            }
            imp = new AST_Import({
                "module": name,
                "key": key,
                "alias": alias,
                "argnames": null,
                "body": function() {
                    var ՐՏ_Temp;
                    return IMPORTED[key];
                }
            });
            ans.imports.push(imp);
            if (from_import) {
                break;
            }
            if (is_("punc", ",")) {
                next();
            } else {
                break;
            }
        }
        var ՐՏ_Iter23 = ՐՏ_Iterable(ans["imports"]);
        for (var ՐՏ_Index23 = 0; ՐՏ_Index23 < ՐՏ_Iter23.length; ՐՏ_Index23++) {
            imp = ՐՏ_Iter23[ՐՏ_Index23];
            do_import(imp.key);
            classes = IMPORTED[key].classes;
            if (from_import) {
                expect_token("keyword", "import");
                imp.argnames = argnames = [];
                while (true) {
                    aname = as_symbol(AST_ImportedVar);
                    if (from_import && name.name === "danger_zone" && aname.name === "equality") {
                        DANGER_ZONE[options.module_id].equality = true;
                        BASELIB["eq"] = true;
                    }
                    if (is_("keyword", "as")) {
                        next();
                        aname.alias = as_symbol(AST_SymbolAlias);
                    }
                    argnames.push(aname);
                    if (is_("punc", ",")) {
                        next();
                    } else {
                        break;
                    }
                }
                var ՐՏ_Iter24 = ՐՏ_Iterable(argnames);
                for (var ՐՏ_Index24 = 0; ՐՏ_Index24 < ՐՏ_Iter24.length; ՐՏ_Index24++) {
                    argvar = ՐՏ_Iter24[ՐՏ_Index24];
                    obj = classes[argvar.name];
                    if (obj) {
                        key = argvar.alias ? argvar.alias.name : argvar.name;
                        S.in_scope[S.in_scope.length-1].classes[key] = {
                            "static": obj.static,
                            "bound": obj.bound
                        };
                    }
                }
            } else {
                for (i in classes) {
                    obj = classes[i];
                    if (obj instanceof AST_Class) {
                        key = imp.alias ? imp.alias.name : imp.key;
                        S.in_scope[S.in_scope.length-1].classes[key + "." + obj.name.name] = {
                            "static": obj.static,
                            "bound": obj.bound
                        };
                    }
                }
            }
        }
        return ans;
    };
    class_ = function() {
        var ՐՏ_Temp, name, externaldecorator, class_details, definition, i, stmt, class_var_names, visitor;
        name = as_symbol(AST_SymbolDefun);
        if (!name) {
            unexpected();
        }
        externaldecorator = S.decorators.indexOf("external");
        if (externaldecorator !== -1) {
            S.decorators.splice(externaldecorator, 1);
        }
        class_details = {
            "static": [],
            "bound": {}
        };
        definition = new AST_Class({
            name: name,
            module_id: module_id,
            parent: function() {
                var ՐՏ_Temp, a;
                if (is_("punc", "(")) {
                    next();
                    if (is_("punc", ")")) {
                        S.in_parenthesized_expr = false;
                        next();
                        return null;
                    }
                    a = expr_atom(false);
                    expect(")");
                    return a;
                } else {
                    return null;
                }
            }(),
            localvars: [],
            "static": class_details.static,
            external: externaldecorator !== -1,
            bound: class_details.bound,
            statements: [],
            decorators: function() {
                var ՐՏ_Temp, d;
                d = [];
                S.decorators.forEach(function(decorator) {
                    var ՐՏ_Temp;
                    if (decorator === "kwargs") {
                        BASELIB["kwargs"] = true;
                    }
                    d.push(new AST_Decorator({
                        name: decorator
                    }));
                });
                S.decorators = [];
                return d;
            }(),
            body: function(loop, labels) {
                var ՐՏ_Temp, a;
                S.in_scope[S.in_scope.length-1].classes[name.name] = class_details;
                S.in_scope.push({
                    type: "class",
                    name: name.name,
                    "nonlocal": {},
                    vars: {},
                    classes: {}
                });
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                a = block_();
                S.in_scope.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            }(S.in_loop, S.labels)
        });
        for (i in definition.body) {
            stmt = definition.body[i];
            if (stmt instanceof AST_Method && stmt.name.name === "__init__") {
                definition.init = stmt;
                break;
            }
        }
        class_var_names = {};
        function walker() {
            var ՐՏ_Temp;
            this._visit = function(node, descend) {
                var ՐՏ_Temp, child;
                if (node instanceof AST_Method) {
                    class_var_names[node.name.name] = true;
                    return;
                } else if (node instanceof AST_Assign && node.left instanceof AST_SymbolRef) {
                    class_var_names[node.left.name] = true;
                }
                var ՐՏ_Iter25 = ՐՏ_Iterable(node);
                for (var ՐՏ_Index25 = 0; ՐՏ_Index25 < ՐՏ_Iter25.length; ՐՏ_Index25++) {
                    child = ՐՏ_Iter25[ՐՏ_Index25];
                    if (node[child] instanceof AST_SymbolRef && Object.prototype.hasOwnProperty.call(class_var_names, node[child].name)) {
                        node[child] = new AST_SymbolClassRef({
                            "class": name,
                            "name": node[child].name
                        });
                    }
                }
                if (descend) {
                    descend.call(node);
                }
            };
        }
        visitor = new walker();
        var ՐՏ_Iter26 = ՐՏ_Iterable(definition.body);
        for (var ՐՏ_Index26 = 0; ՐՏ_Index26 < ՐՏ_Iter26.length; ՐՏ_Index26++) {
            stmt = ՐՏ_Iter26[ՐՏ_Index26];
            if (!(stmt instanceof AST_Class) && !(stmt instanceof AST_Method)) {
                stmt.walk(visitor);
                definition.statements.push(stmt);
            }
        }
        if (S.in_scope.length === 1) {
            CLASS_MAP[definition.name.name] = definition;
        }
        return definition;
    };
    function_ = function(in_class, ctor) {
        var ՐՏ_Temp, is_accessor, name, generator, localvars, staticmethod, has_special_decorator, ctor;
        is_accessor = ctor === AST_Accessor;
        name = is_("name") ? as_symbol(in_class ? AST_SymbolDefun : is_accessor ? AST_SymbolAccessor : AST_SymbolLambda) : is_accessor && (is_("string") || is_("num")) ? as_atom_node() : null;
        if (in_class && !name) {
            unexpected();
        }
        generator = false;
        localvars = null;
        staticmethod = false;
        has_special_decorator = function(name) {
            var ՐՏ_Temp, index;
            index = S.decorators.indexOf(name);
            if (index !== -1) {
                S.decorators.splice(index, 1);
                return true;
            }
            return false;
        };
        if (in_class) {
            if (has_special_decorator("staticmethod")) {
                S.in_scope[S.in_scope.length-2].classes[in_class].static.push(name.name);
                staticmethod = true;
            }
            if (has_special_decorator("bind") || name.name !== "__init__" && options.auto_bind) {
                BASELIB["bind"] = true;
                S.in_scope[S.in_scope.length-2].classes[in_class].bound[name.name] = true;
            }
        }
        expect("(");
        if (!ctor) {
            ctor = in_class ? AST_Method : AST_Function;
        }
        return new ctor({
            name: name,
            argnames: function(a) {
                var ՐՏ_Temp, defaults, first, seen_names, val;
                defaults = {};
                first = true;
                seen_names = {};
                function get_arg() {
                    var ՐՏ_Temp;
                    if (Object.prototype.hasOwnProperty.call(seen_names, S.token.value)) {
                        token_error(prev(), "Can't repeat parameter names");
                    }
                    if (S.token.value === "arguments") {
                        token_error(prev(), "Can't use the name arguments as a parameter name, it is reserved by JavaScript");
                    }
                    seen_names[S.token.value] = true;
                    return as_symbol(AST_SymbolFunarg);
                }
                while (!is_("punc", ")")) {
                    if (first) {
                        first = false;
                    } else {
                        expect(",");
                    }
                    if (is_("operator", "**")) {
                        token_error(prev(), "**kwargs in function definition is not implemented yet, work in progress");
                        next();
                        if (a.kwargs) {
                            token_error(prev(), "Can't define multiple **kwargs in function definition");
                        }
                        a.kwargs = get_arg();
                    } else if (is_("operator", "*")) {
                        next();
                        if (a.starargs) {
                            token_error(prev(), "Can't define multiple *args in function definition");
                        }
                        if (a.kwargs) {
                            token_error(prev(), "Can't define *args after **kwargs in function definition");
                        }
                        a.starargs = get_arg();
                    } else {
                        if (a.starargs || a.kwargs) {
                            token_error(prev(), "Can't define a formal parameter after *args or **kwargs");
                        }
                        a.push(get_arg());
                        if (is_("operator", "=")) {
                            if (a.kwargs) {
                                token_error(prev(), "Can't define an optional formal parameter after **kwargs");
                            }
                            val = prev().value;
                            next();
                            defaults[val] = expression(false);
                            a.has_defaults = true;
                        } else {
                            if (a.has_defaults) {
                                token_error(prev(), "Can't define required formal parameters after optional formal parameters");
                            }
                        }
                    }
                }
                next();
                a.defaults = defaults;
                return a;
            }([]),
            decorators: function() {
                var ՐՏ_Temp, d;
                d = [];
                S.decorators.forEach(function(decorator) {
                    var ՐՏ_Temp;
                    d.push(new AST_Decorator({
                        name: decorator
                    }));
                });
                S.decorators = [];
                return d;
            }(),
            body: function(loop, labels) {
                var ՐՏ_Temp, a;
                S.in_scope.push({
                    type: "function",
                    "nonlocal": {},
                    vars: {
                        "ՐՏ_Temp": [ "?" ]
                    },
                    args: {},
                    classes: {}
                });
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                a = block_();
                generator = S.in_scope[S.in_scope.length-1].generator;
                localvars = Object.keys(S.in_scope[S.in_scope.length-1].vars).filter(function(variable) {
                    var ՐՏ_Temp;
                    if (ՐՏ_in(variable, S.in_scope[S.in_scope.length-1].nonlocal)) {
                        return false;
                    }
                    return true;
                }).map(function(variable) {
                    var ՐՏ_Temp;
                    return new_symbol(AST_SymbolVar, variable);
                });
                S.in_scope.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            }(S.in_loop, S.labels),
            generator: generator,
            localvars: localvars,
            "static": in_class && staticmethod
        });
    };
    function if_() {
        var ՐՏ_Temp, cond, body, belse;
        cond = expression(true);
        body = statement();
        belse = null;
        if (is_("keyword", "elif") || is_("keyword", "else")) {
            if (is_("keyword", "else")) {
                next();
            } else {
                S.token.value = "if";
            }
            belse = statement();
        }
        return new AST_If({
            condition: cond,
            body: body,
            alternative: belse
        });
    }
    function block_() {
        var ՐՏ_Temp, a;
        expect(":");
        a = [];
        if (!S.token.nlb) {
            while (!S.token.nlb) {
                if (is_("eof")) {
                    unexpected();
                }
                a.push(statement());
            }
        } else {
            while (!is_("punc", "}")) {
                if (is_("eof")) {
                    return a;
                }
                a.push(statement());
            }
            next();
        }
        return a;
    }
    function switch_body_() {
        var ՐՏ_Temp, a, cur, branch;
        expect("{");
        a = [];
        cur = null;
        branch = null;
        while (!is_("punc", "}")) {
            if (is_("eof")) {
                unexpected();
            }
            if (is_("keyword", "case")) {
                if (branch) {
                    branch.end = prev();
                }
                cur = [];
                branch = new AST_Case({
                    start: function() {
                        var ՐՏ_Temp, tmp;
                        tmp = S.token;
                        next();
                        return tmp;
                    }(),
                    expression: expression(true),
                    body: cur
                });
                a.push(branch);
                expect(":");
            } else if (is_("keyword", "default")) {
                if (branch) {
                    branch.end = prev();
                }
                cur = [];
                branch = new AST_Default({
                    start: function() {
                        var ՐՏ_Temp, tmp;
                        tmp = S.token;
                        next();
                        expect(":");
                        return tmp;
                    }(),
                    body: cur
                });
                a.push(branch);
            } else {
                if (!cur) {
                    unexpected();
                }
                cur.push(statement());
            }
        }
        if (branch) {
            branch.end = prev();
        }
        next();
        return a;
    }
    function try_() {
        var ՐՏ_Temp, body, bcatch, bfinally, start, exceptions, name;
        body = block_();
        bcatch = [];
        bfinally = null;
        while (is_("keyword", "except")) {
            start = S.token;
            next();
            exceptions = [];
            if (!is_("punc", ":") && !is_("keyword", "as")) {
                exceptions.push(as_symbol(AST_SymbolVar));
                while (is_("punc", ",")) {
                    next();
                    exceptions.push(as_symbol(AST_SymbolVar));
                }
            }
            name = null;
            if (is_("keyword", "as")) {
                next();
                name = as_symbol(AST_SymbolCatch);
            }
            bcatch.push(new AST_Except({
                start: start,
                argname: name,
                errors: exceptions,
                body: block_(),
                end: prev()
            }));
        }
        if (is_("keyword", "finally")) {
            start = S.token;
            next();
            bfinally = new AST_Finally({
                start: start,
                body: block_(),
                end: prev()
            });
        }
        if (!bcatch.length && !bfinally) {
            croak("Missing except/finally blocks");
        }
        return new AST_Try({
            body: body,
            bcatch: bcatch.length ? new AST_Catch({
                body: bcatch
            }) : null,
            bfinally: bfinally
        });
    }
    function vardefs(no_in, type) {
        var ՐՏ_Temp, a;
        a = [];
        while (true) {
            a.push(new AST_VarDef({
                start: S.token,
                name: as_symbol(type === "const" ? AST_SymbolConst : AST_SymbolVar),
                value: is_("operator", "=") ? (next(), expression(false, no_in)) : null,
                end: prev()
            }));
            if (type === "nonlocal") {
                S.in_scope[S.in_scope.length-1].nonlocal[a[a.length-1].name.name] = true;
            }
            if (!is_("punc", ",")) {
                break;
            }
            next();
        }
        return a;
    }
    nonlocal_ = function(no_in) {
        var ՐՏ_Temp;
        return new AST_Var({
            start: prev(),
            definitions: vardefs(no_in, "nonlocal"),
            end: prev()
        });
    };
    const_ = function() {
        var ՐՏ_Temp;
        return new AST_Const({
            start: prev(),
            definitions: vardefs(false, "const"),
            end: prev()
        });
    };
    new_ = function() {
        var ՐՏ_Temp, start, newexp, args;
        start = S.token;
        expect_token("operator", "new");
        newexp = expr_atom(false);
        if (is_("punc", "(")) {
            next();
            args = expr_list(")");
        } else {
            args = [];
        }
        return subscripts(new AST_New({
            start: start,
            expression: newexp,
            args: args,
            end: prev()
        }), true);
    };
    function as_atom_node(token) {
        var ՐՏ_Temp, tok, tmp_, ret, token, tmp__;
        tok = token || S.token;
        tmp_ = tok.type;
        if (tmp_ === "name") {
            ret = kwargs(as_symbol)(AST_SymbolRef, {token: tok});
        } else if (tmp_ === "num") {
            ret = new AST_Number({
                start: tok,
                end: tok,
                value: tok.value
            });
        } else if (tmp_ === "string") {
            ret = new AST_String({
                start: tok,
                end: tok,
                value: tok.value,
                modifier: tok.subtype
            });
        } else if (tmp_ === "regexp") {
            ret = new AST_RegExp({
                start: tok,
                end: tok,
                value: tok.value
            });
        } else if (tmp_ === "atom") {
            tmp__ = tok.value;
            if (tmp__ === "False") {
                ret = new AST_False({
                    start: tok,
                    end: tok
                });
            } else if (tmp__ === "True") {
                ret = new AST_True({
                    start: tok,
                    end: tok
                });
            } else if (tmp__ === "None") {
                ret = new AST_Null({
                    start: tok,
                    end: tok
                });
            }
        }
        if (!token) {
            next();
        }
        return ret;
    }
    expr_atom = function(allow_calls) {
        var ՐՏ_Temp, start, tmp_, ex, cls, func;
        if (is_("operator", "new")) {
            return new_();
        }
        start = S.token;
        if (is_("punc")) {
            tmp_ = start.value;
            if (tmp_ === "(") {
                next();
                ex = expression(true);
                ex.start = start;
                ex.end = S.token;
                if (ex instanceof AST_SymbolRef) {
                    ex.parens = true;
                }
                expect(")");
                return subscripts(ex, allow_calls);
            } else if (tmp_ === "[") {
                return subscripts(array_(), allow_calls);
            } else if (tmp_ === "{") {
                return subscripts(object_(), allow_calls);
            }
            unexpected();
        }
        if (is_("keyword", "class")) {
            next();
            cls = class_();
            cls.start = start;
            cls.end = prev();
            return subscripts(cls, allow_calls);
        }
        if (is_("keyword", "def")) {
            next();
            func = function_(false);
            func.start = start;
            func.end = prev();
            return subscripts(func, allow_calls);
        }
        if (ATOMIC_START_TOKEN[S.token.type]) {
            return subscripts(as_atom_node(), allow_calls);
        }
        unexpected();
    };
    function expr_list(closing, allow_trailing_comma, allow_empty, func_call) {
        var ՐՏ_Temp, first, a, saw_starargs, tmp, i, arg;
        first = true;
        a = [];
        saw_starargs = false;
        while (!is_("punc", closing)) {
            if (saw_starargs) {
                token_error(prev(), "*args must be the last argument in a function call");
            }
            if (first) {
                first = false;
            } else {
                expect(",");
            }
            if (allow_trailing_comma && is_("punc", closing)) {
                break;
            }
            if (is_("operator", "*") && func_call) {
                saw_starargs = true;
                next();
            }
            if (is_("punc", ",") && allow_empty) {
                a.push(new AST_Hole({
                    start: S.token,
                    end: S.token
                }));
            } else {
                a.push(expression(false));
            }
        }
        if (func_call) {
            tmp = [];
            tmp.kwargs = [];
            var ՐՏ_Iter27 = ՐՏ_Iterable(enumerate(a));
            for (var ՐՏ_Index27 = 0; ՐՏ_Index27 < ՐՏ_Iter27.length; ՐՏ_Index27++) {
                var ՐՏ_Unpack = ՐՏ_Iter27[ՐՏ_Index27];
                i = ՐՏ_Unpack[0];
                arg = ՐՏ_Unpack[1];
                if (arg instanceof AST_Assign) {
                    BASELIB["kwargs"] = true;
                    tmp.kwargs.push([ arg.left, arg.right ]);
                } else {
                    tmp.push(arg);
                }
            }
            a = tmp;
        }
        next();
        if (saw_starargs) {
            a.starargs = true;
        }
        return a;
    }
    function func_call_list() {
        var ՐՏ_Temp, a, first, kwargs, arg;
        a = [];
        first = true;
        a.kwargs = [];
        a.kwarg_items = kwargs = [];
        a.starargs = false;
        while (!is_("punc", ")")) {
            if (first) {
                first = false;
            } else {
                expect(",");
            }
            if (is_("operator", "*")) {
                next();
                arg = expression(false);
                arg.is_array = true;
                a.push(arg);
                a.starargs = true;
            } else if (is_("operator", "**")) {
                BASELIB["kwargs"] = true;
                next();
                kwargs.push(as_symbol(AST_SymbolVar, false));
            } else {
                arg = expression(false);
                if (arg instanceof AST_Assign) {
                    BASELIB["kwargs"] = true;
                    a.kwargs.push([ arg.left, arg.right ]);
                } else {
                    a.push(arg);
                }
            }
        }
        next();
        return a;
    }
    function read_comprehension(object) {
        var ՐՏ_Temp, terminator, forloop;
        terminator = object instanceof AST_DictComprehension ? "}" : "]";
        expect_token("keyword", "for");
        forloop = for_(true);
        BASELIB["iterable"] = true;
        object.init = forloop.init;
        object.name = forloop.name;
        object.object = forloop.object;
        object.condition = is_("punc", terminator) ? null : (expect_token("keyword", "if"), 
        expression(true));
        expect(terminator);
        return object;
    }
    array_ = embed_tokens(function() {
        var ՐՏ_Temp, expr, ret;
        expect("[");
        expr = [];
        if (!is_("punc", "]")) {
            expr.push(expression(false));
            if (is_("keyword", "for")) {
                return read_comprehension(new AST_ListComprehension({
                    statement: expr[0]
                }));
            }
            if (is_("operator", "til")) {
                BASELIB["range"] = true;
                next();
                expr.push(expression(false));
                ret = subscripts(new AST_Call({
                    start: S.token,
                    expression: new AST_SymbolRef({
                        name: "range"
                    }),
                    args: expr,
                    end: prev()
                }), true);
                expect("]");
                return ret;
            } else if (is_("operator", "to")) {
                BASELIB["range"] = true;
                next();
                expr.push(new AST_Binary({
                    left: expression(false),
                    operator: "+",
                    right: new AST_Number({
                        value: 1e-6
                    })
                }));
                ret = subscripts(new AST_Call({
                    start: S.token,
                    expression: new AST_SymbolRef({
                        name: "range"
                    }),
                    args: expr,
                    end: prev()
                }), true);
                expect("]");
                return ret;
            } else if (!is_("punc", "]")) {
                expect(",");
            }
        }
        return new AST_Array({
            elements: expr.concat(expr_list("]", !options.strict, true))
        });
    });
    object_ = embed_tokens(function() {
        var ՐՏ_Temp, maybe_dict_comprehension, first, a, start, type, key, name, quoted;
        maybe_dict_comprehension = false;
        expect("{");
        first = true;
        a = [];
        while (!is_("punc", "}")) {
            if (!first) {
                expect(",");
            }
            if (!options.strict && is_("punc", "}")) {
                break;
            }
            start = S.token;
            type = start.type;
            if (first && peek().value !== ":") {
                maybe_dict_comprehension = true;
                key = expression(false);
                name = null;
            } else {
                key = as_property_name();
                name = key.value;
                quoted = key.type === "string";
            }
            if (type === "name" && !is_("punc", ":")) {
                if (name === "get") {
                    a.push(new AST_ObjectGetter({
                        start: start,
                        key: name,
                        quoted: quoted,
                        value: function_(false, AST_Accessor),
                        end: prev()
                    }));
                    continue;
                }
                if (name === "set") {
                    a.push(new AST_ObjectSetter({
                        start: start,
                        key: name,
                        quoted: quoted,
                        value: function_(false, AST_Accessor),
                        end: prev()
                    }));
                    continue;
                }
            }
            expect(":");
            a.push(new AST_ObjectKeyVal({
                start: start,
                key: name,
                quoted: quoted,
                value: expression(false),
                end: prev()
            }));
            if (a.length === 1 && is_("keyword", "for")) {
                return read_comprehension(new AST_DictComprehension({
                    statement: maybe_dict_comprehension ? key : as_atom_node(a[0].start),
                    value_statement: a[0].value
                }));
            }
            first = false;
        }
        next();
        return new AST_Object({
            properties: a
        });
    });
    function as_property_name() {
        var ՐՏ_Temp, tmp, tmp_;
        tmp = S.token;
        next();
        tmp_ = tmp.type;
        if (tmp_ === "num" || tmp_ === "string" || tmp_ === "name" || tmp_ === "operator" || tmp_ === "keyword" || tmp_ === "atom") {
            return tmp;
        } else {
            unexpected();
        }
    }
    function as_name() {
        var ՐՏ_Temp, tmp, tmp_;
        tmp = S.token;
        next();
        tmp_ = tmp.type;
        if (tmp_ === "name" || tmp_ === "operator" || tmp_ === "keyword" || tmp_ === "atom") {
            return tmp.value;
        } else {
            unexpected();
        }
    }
    function as_symbol(type, noerror, token) {
        var ՐՏ_Temp, token_, name, sym;
        token_ = token || S.token;
        if (!is_token(token_, "name")) {
            if (!noerror) {
                croak("Name expected");
            }
            return null;
        }
        name = token_.value;
        sym = new (name === "this" ? AST_This : type)({
            name: String(token_.value),
            start: token_,
            end: token_
        });
        if (!token) {
            next();
        }
        return sym;
    }
    function new_symbol(type, name) {
        var ՐՏ_Temp, sym;
        sym = new (name === "this" ? AST_This : type)({
            name: String(name),
            start: null,
            end: null
        });
        return sym;
    }
    function is_static_method(cls, method) {
        var ՐՏ_Temp;
        if (ՐՏ_in(method, COMMON_STATIC) || cls.static && ՐՏ_in(method, cls.static)) {
            return true;
        } else {
            return false;
        }
    }
    function mark_local_assignment(element) {
        var ՐՏ_Temp, name;
        name = typeof element === "string" ? element : element.name;
        if (name) {
            if (ՐՏ_in(name, S.in_scope[S.in_scope.length-1].vars)) {
                S.in_scope[S.in_scope.length-1].vars[name].push("?");
            } else {
                S.in_scope[S.in_scope.length-1].vars[name] = [ "?" ];
            }
        }
    }
    subscripts = function(expr, allow_calls) {
        var ՐՏ_Temp, start, slice_bounds, is_slice, i, str_, ret, c, funcname, tmp_, args;
        start = expr.start;
        if (is_("punc", ".")) {
            next();
            return subscripts(new AST_Dot({
                start: start,
                expression: expr,
                property: as_name(),
                end: prev()
            }), allow_calls);
        }
        if (is_("punc", "[") && !S.token.nlb) {
            next();
            slice_bounds = [];
            is_slice = false;
            if (is_("punc", ":")) {
                slice_bounds.push(null);
            } else {
                slice_bounds.push(expression(false));
            }
            if (is_("punc", ":")) {
                is_slice = true;
                next();
                if (is_("punc", ":")) {
                    slice_bounds.push(null);
                } else if (!is_("punc", "]")) {
                    slice_bounds.push(expression(false));
                }
            }
            if (is_("punc", ":")) {
                BASELIB["eslice"] = true;
                next();
                if (is_("punc", "]")) {
                    unexpected();
                } else {
                    slice_bounds.push(expression(false));
                }
            }
            expect("]");
            if (is_slice) {
                if (is_("operator") && S.token.value === "=") {
                    next();
                    return subscripts(new AST_Splice({
                        start: start,
                        expression: expr,
                        property: slice_bounds[0] || new AST_Number({
                            value: 0
                        }),
                        property2: slice_bounds[1],
                        assignment: expression(true),
                        end: prev()
                    }), allow_calls);
                } else if (slice_bounds.length === 3) {
                    slice_bounds.unshift(slice_bounds.pop());
                    if (!slice_bounds[slice_bounds.length-1]) {
                        slice_bounds.pop();
                        if (!slice_bounds[slice_bounds.length-1]) {
                            slice_bounds.pop();
                        }
                    } else if (!slice_bounds[slice_bounds.length-2]) {
                        slice_bounds[slice_bounds.length-2] = new AST_Undefined();
                    }
                    return subscripts(new AST_Call({
                        start: start,
                        expression: new AST_SymbolRef({
                            name: "eslice"
                        }),
                        args: [ expr ].concat(slice_bounds),
                        end: prev()
                    }), allow_calls);
                } else {
                    slice_bounds = (function() {
                        var ՐՏ_Iter = ՐՏ_Iterable(slice_bounds), ՐՏ_Result = [], i;
                        for (var ՐՏ_Index = 0; ՐՏ_Index < ՐՏ_Iter.length; ՐՏ_Index++) {
                            i = ՐՏ_Iter[ՐՏ_Index];
                            ՐՏ_Result.push(i === null ? new AST_Number({
                                value: 0
                            }) : i);
                        }
                        return ՐՏ_Result;
                    })();
                    return subscripts(new AST_Call({
                        start: start,
                        expression: new AST_Dot({
                            start: start,
                            expression: expr,
                            property: "slice",
                            end: prev()
                        }),
                        args: slice_bounds,
                        end: prev()
                    }), allow_calls);
                }
            } else {
                return subscripts(new AST_Sub({
                    start: start,
                    expression: expr,
                    property: slice_bounds[0] || new AST_Number({
                        value: 0
                    }),
                    end: prev()
                }), allow_calls);
            }
        }
        if (allow_calls && is_("punc", "(") && !S.token.nlb) {
            next();
            if (expr instanceof AST_SymbolRef && expr.name === "JS") {
                str_ = expression(false);
                if (!(str_ instanceof AST_String)) {
                    token_error(prev(), "Compile-time function JS() can't evaluate variables or expressions");
                }
                ret = new AST_Verbatim({
                    start: start,
                    value: str_.value,
                    end: prev()
                });
                expect(")");
                return subscripts(ret, true);
            } else if (!expr.parens && get_class_in_scope(expr)) {
                if (ՐՏ_in(expr.name, STDLIB)) {
                    BASELIB[expr.name] = true;
                    if (/Error$/.test(expr.name)) {
                        BASELIB["extends"] = true;
                    }
                }
                return subscripts(new AST_New({
                    start: start,
                    expression: expr,
                    args: func_call_list(),
                    end: prev()
                }), true);
            } else {
                if (expr instanceof AST_Dot) {
                    c = get_class_in_scope(expr.expression);
                }
                if (c) {
                    funcname = expr;
                    if (funcname.property === "__init__") {
                        funcname.property = "constructor";
                    }
                    return subscripts(new AST_ClassCall({
                        start: start,
                        "class": expr.expression,
                        method: funcname.property,
                        "static": is_static_method(c, funcname.property),
                        args: func_call_list(),
                        end: prev()
                    }), true);
                } else if (expr instanceof AST_SymbolRef) {
                    tmp_ = expr.name;
                    if (ՐՏ_in(tmp_, STDLIB)) {
                        BASELIB[tmp_] = true;
                    } else if (tmp_ === "type") {
                        return new AST_UnaryPrefix({
                            start: start,
                            operator: "typeof",
                            expression: func_call_list()[0],
                            end: prev()
                        });
                    } else if (tmp_ === "isinstance") {
                        args = func_call_list();
                        return new AST_Binary({
                            start: start,
                            operator: "instanceof",
                            left: args[0],
                            right: args[1],
                            end: prev()
                        });
                    }
                }
                return subscripts(new AST_Call({
                    start: start,
                    expression: expr,
                    args: func_call_list(),
                    end: prev()
                }), true);
            }
        }
        return expr;
    };
    maybe_unary = function(allow_calls) {
        var ՐՏ_Temp, start, ex, val;
        start = S.token;
        if (is_("operator") && UNARY_PREFIX(start.value)) {
            next();
            if (start.value === "@") {
                if (is_("name") && (peek().value === "@" || peek().value === "def" || peek().value === "class")) {
                    S.decorators.push(S.token.value);
                    next();
                    return new AST_EmptyStatement();
                } else {
                    unexpected();
                }
            }
            ex = make_unary(AST_UnaryPrefix, start.value, maybe_unary(allow_calls));
            ex.start = start;
            ex.end = prev();
            return ex;
        }
        val = expr_atom(allow_calls);
        while (is_("operator") && UNARY_POSTFIX(S.token.value) && !S.token.nlb) {
            val = make_unary(AST_UnaryPostfix, S.token.value, val);
            val.start = start;
            val.end = S.token;
            next();
        }
        return val;
    };
    function make_unary(ctor, op, expr) {
        var ՐՏ_Temp;
        return new ctor({
            operator: op,
            expression: expr
        });
    }
    expr_op = function(left, min_prec, no_in) {
        var ՐՏ_Temp, op, not_in, prec, right, ret;
        op = is_("operator") ? S.token.value : null;
        not_in = false;
        if (op === "!" && peek().type === "operator" && peek().value === "in") {
            next();
            op = "in";
            not_in = true;
        }
        if (op === "in") {
            if (no_in) {
                op = null;
            } else {
                BASELIB[op] = true;
            }
        }
        prec = op !== null ? PRECEDENCE[op] : null;
        if (prec !== null && prec > min_prec) {
            next();
            right = expr_op(maybe_unary(true), prec, no_in);
            if (DANGER_ZONE[options.module_id].equality && ՐՏ_in(op, [ "==", "!=" ])) {
                ret = new AST_DeepEquality({
                    start: left.start,
                    left: left,
                    operator: op,
                    right: right,
                    end: right.end
                });
            } else {
                ret = new AST_Binary({
                    start: left.start,
                    left: left,
                    operator: op,
                    right: right,
                    end: right.end
                });
            }
            if (not_in) {
                ret = new AST_UnaryPrefix({
                    start: left.start,
                    operator: "!",
                    expression: ret,
                    end: right.end
                });
            }
            return expr_op(ret, min_prec, no_in);
        }
        return left;
    };
    function expr_ops(no_in) {
        var ՐՏ_Temp;
        return expr_op(maybe_unary(true), 0, no_in);
    }
    maybe_conditional = function(no_in) {
        var ՐՏ_Temp, start, expr, yes;
        start = S.token;
        expr = expr_ops(no_in);
        if (is_("operator", "?")) {
            next();
            yes = expression(false);
            expect(":");
            return new AST_Conditional({
                start: start,
                condition: expr,
                consequent: yes,
                alternative: expression(false, no_in),
                end: peek()
            });
        }
        return expr;
    };
    function is_assignable(expr) {
        var ՐՏ_Temp, tmp_;
        if (!options.strict) {
            return true;
        }
        tmp_ = expr[0] + "";
        if (tmp_ === "dot" || tmp_ === "sub" || tmp_ === "new" || tmp_ === "call") {
            return true;
        } else if (tmp_ === "name") {
            return expr[1] !== "this";
        }
    }
    maybe_assign = function(no_in) {
        var ՐՏ_Temp, start, left, val;
        start = S.token;
        left = maybe_conditional(no_in);
        val = S.token.value;
        if (is_("operator") && ASSIGNMENT(val)) {
            if (is_assignable(left)) {
                mark_local_assignment(left);
                next();
                return new AST_Assign({
                    start: start,
                    left: left,
                    operator: val,
                    right: maybe_assign(no_in),
                    end: prev()
                });
            }
            croak("Invalid assignment");
        }
        return left;
    };
    expression = function(commas, no_in) {
        var ՐՏ_Temp, start, expr, left, right, leftAst, element;
        start = S.token;
        expr = maybe_assign(no_in);
        if (commas) {
            left = [ expr ];
            right = [];
            while (is_("punc", ",") && !peek().nlb) {
                next();
                if (expr instanceof AST_Assign) {
                    left[left.length-1] = left[left.length-1].left;
                    if (left.length === 1) {
                        if (left[0] instanceof AST_Seq) {
                            leftAst = seq_to_array(left[0]);
                            var ՐՏ_Iter28 = ՐՏ_Iterable(leftAst);
                            for (var ՐՏ_Index28 = 0; ՐՏ_Index28 < ՐՏ_Iter28.length; ՐՏ_Index28++) {
                                element = ՐՏ_Iter28[ՐՏ_Index28];
                                mark_local_assignment(element);
                            }
                        } else {
                            leftAst = left[0];
                            mark_local_assignment(leftAst);
                        }
                    } else {
                        leftAst = new AST_Array({
                            elements: left
                        });
                        var ՐՏ_Iter29 = ՐՏ_Iterable(left);
                        for (var ՐՏ_Index29 = 0; ՐՏ_Index29 < ՐՏ_Iter29.length; ՐՏ_Index29++) {
                            element = ՐՏ_Iter29[ՐՏ_Index29];
                            mark_local_assignment(element);
                        }
                    }
                    return new AST_Assign({
                        start: start,
                        left: leftAst,
                        operator: expr.operator,
                        right: new AST_Seq({
                            car: expr.right,
                            cdr: expression(true, no_in)
                        }),
                        end: peek()
                    });
                }
                expr = maybe_assign(no_in);
                left.push(expr);
            }
            if (expr instanceof AST_Assign && expr.left instanceof AST_Seq) {
                expr.left = seq_to_array(expr.left);
            }
            if (left.length > 1 && left[left.length-1] instanceof AST_Assign) {
                left[left.length-1] = left[left.length-1].left;
                var ՐՏ_Iter30 = ՐՏ_Iterable(left);
                for (var ՐՏ_Index30 = 0; ՐՏ_Index30 < ՐՏ_Iter30.length; ՐՏ_Index30++) {
                    element = ՐՏ_Iter30[ՐՏ_Index30];
                    mark_local_assignment(element);
                }
                return new AST_Assign({
                    start: start,
                    left: new AST_Array({
                        elements: left
                    }),
                    operator: expr.operator,
                    right: expr.right,
                    end: peek()
                });
            }
            return function build_seq(a) {
                var ՐՏ_Temp;
                if (a.length === 1) {
                    return a[0];
                }
                return new AST_Seq({
                    start: start,
                    car: a.shift(),
                    cdr: build_seq(a),
                    end: peek()
                });
            }(left);
        }
        return expr;
    };
    function in_loop(cont) {
        var ՐՏ_Temp, ret;
        S.in_loop += 1;
        ret = cont();
        S.in_loop -= 1;
        return ret;
    }
    return function() {
        var ՐՏ_Temp, start, body, first_token, element, shebang, end, toplevel, assignments, callables;
        start = S.token;
        body = [];
        first_token = true;
        while (!is_("eof")) {
            element = statement();
            if (first_token && element instanceof AST_Directive && element.value.indexOf("#!") === 0) {
                shebang = element.value;
            } else {
                body.push(element);
            }
            first_token = false;
        }
        end = prev();
        toplevel = options.toplevel;
        if (toplevel) {
            toplevel.body = toplevel.body.concat(body);
            toplevel.end = end;
        } else {
            toplevel = new AST_Toplevel({
                start: start,
                body: body,
                strict: function() {
                    var ՐՏ_Temp, stmt;
                    var ՐՏ_Iter31 = ՐՏ_Iterable(body);
                    for (var ՐՏ_Index31 = 0; ՐՏ_Index31 < ՐՏ_Iter31.length; ՐՏ_Index31++) {
                        stmt = ՐՏ_Iter31[ՐՏ_Index31];
                        if (stmt instanceof AST_Directive && stmt.value === "use strict") {
                            return true;
                        }
                    }
                    return false;
                }(),
                shebang: shebang,
                end: end
            });
        }
        function uniq(element, index, arr) {
            var ՐՏ_Temp;
            return arr.lastIndexOf(element) === index;
        }
        toplevel.nonlocalvars = Object.keys(S.in_scope[S.in_scope.length-1].nonlocal);
        assignments = Object.keys(S.in_scope[S.in_scope.length-1].vars);
        callables = scan_for_top_level_callables(toplevel.body).filter(uniq);
        toplevel.localvars = [];
        assignments.forEach(function(item) {
            var ՐՏ_Temp;
            if (!(ՐՏ_in(item, toplevel.nonlocalvars))) {
                toplevel.localvars.push(new_symbol(AST_SymbolVar, item));
            }
        });
        toplevel.exports = toplevel.localvars.concat(callables).filter(uniq);
        toplevel.submodules = [];
        toplevel.classes = CLASS_MAP;
        toplevel.import_order = Object.keys(IMPORTED).length;
        toplevel.module_id = module_id;
        IMPORTED[module_id] = toplevel;
        toplevel.imports = IMPORTED;
        toplevel.baselib = BASELIB;
        IMPORTING[module_id] = false;
        return toplevel;
    }();
}