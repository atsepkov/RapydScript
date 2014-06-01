"use strict";
function get_next_part(next_part, part) {
    var new_part;
    if (!(_$rapyd$_in(part, next_part))) {
        new_part = {};
        next_part[part] = new_part;
        next_part = new_part;
    } else {
        next_part = next_part[part];
    }
    return next_part;
}
function add_import_var(import_vars, node, path) {
    var name, components, next_part, param_name;
    name = node.name ? node.name : node.expression.name;
    components = [ name ];
    next_part = get_next_part(import_vars, name);
    if (node instanceof AST_Dot && node.property == ".") {
        node = node.expression;
    }
    while (node instanceof AST_Dot) {
        components.push(node.property);
        next_part = get_next_part(next_part, node.property);
        node = node.expression;
    }
    param_name = path.replace(/\//g, "_");
    if (len(components) == 1) {
        next_part["___assign___"] = components[0] + " = " + param_name + ";";
    } else {
        next_part["___assign___"] = param_name;
    }
}
function indent(output, level) {
    var k;
    k = 0;
    while (k < level) {
        output.indent();
        k += 1;
    }
}
function print_import_vars(output, import_vars) {
    var next_part, name;
    function print_object(output, next_part, level) {
        var part, name;
        for (name in next_part) {
            part = next_part[name];
            if (_$rapyd$_in("___assign___", part)) {
                output.newline();
                indent(output, level);
                output.print(name + ": " + part["___assign___"]);
            } else {
                indent(output, level);
                output.print(name + "{ ");
                print_object(output, part, level + 1);
                indent(output, level);
                output.print("}");
                output.newline();
            }
        }
    }
    for (name in import_vars) {
        output.print("var " + name + ";");
        output.newline();
        next_part = import_vars[name];
        if (_$rapyd$_in("___assign___", next_part)) {
            output.print(next_part["___assign___"]);
            output.newline();
        } else {
            output.print(name + " = { ");
            print_object(output, next_part, 1);
            output.newline();
            output.print("};");
        }
    }
}
function print_return_map_var(output, name, node_type, exported, j) {
    if (_$rapyd$_in(name, exported)) {
        return j;
    }
    exported[name] = true;
    if (j > 0) {
        output.comma();
    }
    output.newline();
    output.indent();
    output.indent();
    output.print(name + ": " + name);
    return j + 1;
}
function print_explicit_module_name(output, module_name) {
    output.print("'");
    output.print(module_name);
    output.print("'");
    output.comma();
    output.newline();
}
function print_amd(self, output, display_complex_body) {
    var ext_len, module_name, imports, import_paths, i, package_name, n, import_vars, k;
    ext_len = -1 * len(output.option("ext"));
    module_name = self.start.file.slice(0, ext_len);
    imports = {};
    import_paths = [];
    output.newline();
    output.print("'use strict'");
    output.newline();
    output.print("\n        if (typeof define !== 'function') {\n            var define = require('amdefine')(module);\n        }\n    ");
    output.newline();
    output.print("define(");
    i = len(module_name) - module_name.lastIndexOf("/") + 1;
    if (i > 0) {
        package_name = module_name.slice(0, -1 * i) + "/";
    } else {
        package_name = "";
    }
    self.body.forEach(function(node) {
        if (node.TYPE !== "Import") {
            return;
        }
        if (_$rapyd$_in(node.path, imports)) {
            return;
        }
        imports[node.path] = node;
        import_paths.push(node.path);
    });
    output.print("[");
    n = import_paths.length - 1;
    import_paths.forEach(function(path, j) {
        if (j > 0) {
            output.comma();
        }
        output.newline();
        output.print("\"" + path + "\"");
    });
    output.newline();
    output.print("],");
    output.newline();
    output.print("function(");
    import_vars = {};
    import_paths.forEach(function(path, j) {
        var node, param;
        node = imports[path];
        if (node.as) {
            if (node.as.name) {
                param = node.as.name;
            } else if (node.as.value) {
                param = node.as.value;
            }
            if (param.indexOf("!", param.length - 1) !== -1) {
                param = null;
            }
        } else {
            if (node.argnames) {
                param = path.replace(/\/__init__$/, "");
            } else {
                param = node.path;
                add_import_var(import_vars, node.module, path);
            }
        }
        if (param) {
            if (j > 0) {
                output.comma();
            }
            param = param.replace(/(\/|-)/g, "_");
            output.print(param);
        }
    });
    output.print(")");
    k = 0;
    function output_exported(output, node, exported, j) {
        var name;
        if (!(_$rapyd$_in(node.TYPE, [ "Function", "Class", "SymbolRef", "Import" ]))) {
            return;
        }
        if (node.TYPE === "Import") {
            if (!node.argnames) {
                return;
            }
            var _$rapyd$_Iter0 = node.argnames;
            for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                name = _$rapyd$_Iter0[_$rapyd$_Index0];
                k = print_return_map_var(output, name.name, node.TYPE, exported, k);
            }
            return;
        }
        if (!node.public) {
            return;
        }
        name = node.name;
        if (node.name.name) {
            name = node.name.name;
        }
        k = print_return_map_var(output, name, node.TYPE, exported, k);
    }
    output.with_block(function() {
        var exported;
        output.prologue(self);
        output.newline();
        print_import_vars(output, import_vars);
        display_complex_body(self, true, output);
        output.newline();
        output.indent();
        output.print("return {");
        exported = {};
        self.body.forEach(function(node, j) {
            var i;
            if (node.TYPE === "SimpleStatement") {
                i = 0;
                node.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_Assign) {
                        output_exported(output, node.left, exported, j + i);
                    }
                    i += 1;
                }));
                return;
            }
            output_exported(output, node, exported, j);
        });
        output.newline();
        output.indent();
        output.print("};");
        output.newline();
    });
    output.print(");");
    output.newline();
}