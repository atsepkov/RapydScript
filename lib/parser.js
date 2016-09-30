var RAPYD_PREFIX, NATIVE_CLASSES, COMMON_STATIC, CLASS_MAP, BASELIB, STDLIB, UNARY_PREFIX, ASSIGNMENT, PRECEDENCE, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN;
RAPYD_PREFIX = "ՐՏ";
NATIVE_CLASSES = {
    "Image": {},
    "RegExp": {},
    "Error": {},
    "Object": {
        static: [ "assign", "getOwnPropertyNames", "keys", "create", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf" ]
    },
    "String": {
        static: [ "fromCharCode" ]
    },
    "Array": {
        static: [ "isArray", "from", "of" ]
    },
    "Number": {
        static: [ "isFinite", "isNaN" ]
    },
    "Function": {},
    "Date": {
        static: [ "UTC", "now", "parse" ]
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
STDLIB = [ "abs", "bin", "cmp", "chr", "dir", "hex", "max", "min", "merge", "mixin", "print", "range", "reduce", "getattr", "setattr", "hasattr", "eq", "bind", "rebind_all", "all", "any", "enumerate", "filter", "len", "map", "reversed", "sum", "zip", "AssertionError", "IndexError", "KeyError", "TypeError", "ValueError" ];
function has_simple_decorator(decorators, name) {
    var remove, s;
    remove = [];
    for (var i = 0; i < decorators.length; i++) {
        s = decorators[i];
        if (s instanceof AST_SymbolRef && !s.parens && s.name === name) {
            remove.push(i);
        }
    }
    if (remove.length) {
        remove.reverse();
        for (var i = 0; i < remove.length; i++) {
            decorators.splice(remove[i], 1);
        }
        return true;
    }
    return false;
}
UNARY_PREFIX = makePredicate([ "typeof", "void", "delete", "--", "++", "!", "~", "-", "+", "*", "@" ]);
ASSIGNMENT = makePredicate([ "=", "+=", "-=", "/=", "//=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);
PRECEDENCE = function(a, ret) {
    var i, b, j;
    for (i = 0; i < a.length; i++) {
        b = a[i];
        for (j = 0; j < b.length; j++) {
            ret[b[j]] = i + 1;
        }
    }
    return ret;
}([ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "//", "%" ], [ "**" ] ], {});
STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);
ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);
function parse($TEXT, options) {
    var ՐՏitr1, ՐՏidx1, ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4;
    var options, module_id, import_dirs, IMPORTED, IMPORTING, S, cname, obj;
    options = defaults(options, {
        strict: false,
        filename: null,
        auto_bind: false,
        module_id: "__main__",
        es6: false,
        toplevel: null,
        import_dirs: [],
        dropDecorators: [],
        dropImports: [],
        classes: null
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
            nonlocal: {},
            functions: {},
            classes: {}
        } ],
        labels: [],
        decorators: [],
        in_seq: false,
        in_decorator: false
    };
    if (options.classes) {
        ՐՏitr1 = ՐՏ_Iterable(options.classes);
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            cname = ՐՏitr1[ՐՏidx1];
            obj = options.classes[cname];
            S.in_scope[0].classes[cname] = {
                "static": obj.static,
                "bound": obj.bound
            };
        }
    }
    S.token = next();
    function is_(type, value) {
        return is_token(S.token, type, value);
    }
    function peek() {
        return S.peeked || (S.peeked = S.input());
    }
    function next() {
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
        return S.prev;
    }
    function croak(msg, line, col, pos, is_eof) {
        var ctx;
        ctx = S.input.context();
        js_error(msg, ctx.filename, line !== void 0 ? line : ctx.tokline, col !== void 0 ? col : ctx.tokcol, pos !== void 0 ? pos : ctx.tokpos, is_eof);
    }
    function token_error(token, msg) {
        var is_eof;
        is_eof = token.type === "eof" ? true : false;
        croak(msg, token.line, token.col, void 0, is_eof);
    }
    function unexpected(token) {
        var token;
        if (token === void 0) {
            token = S.token;
        }
        token_error(token, "Unexpected token: " + token.type + " «" + token.value + "»");
    }
    function expect_token(type, val) {
        if (is_(type, val)) {
            return next();
        }
        token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
    }
    function expect(punc) {
        return expect_token("punc", punc);
    }
    function can_insert_semicolon() {
        return !options.strict && (S.token.newline_before || is_("eof") || is_("punc", "}"));
    }
    function semicolon() {
        if (is_("punc", ";")) {
            next();
            S.token.newline_before = true;
        }
    }
    function parenthesised() {
        var exp;
        expect("(");
        exp = expression(true);
        expect(")");
        return exp;
    }
    function embed_tokens(parser) {
        return function() {
            var start, expr, end;
            start = S.token;
            expr = parser();
            if (expr === void 0) {
                unexpected();
            }
            end = prev();
            expr.start = start;
            expr.end = end;
            return expr;
        };
    }
    var is_nested_comparison = (ՐՏ_1 = function is_nested_comparison(stmt) {
        var comparators;
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
    }, Object.defineProperty(ՐՏ_1, "__doc__", {
        value: "Check if the statement is a nested comparison"
    }), ՐՏ_1);
    function scan_for_top_level_callables(body) {
        var ՐՏitr2, ՐՏidx2;
        var ans, name, obj, x, opt;
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
                    ՐՏitr2 = ՐՏ_Iterable([ "body", "alternative" ]);
                    for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
                        x = ՐՏitr2[ՐՏidx2];
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
    
    var statement = (ՐՏ_2 = function statement() {
        var tmp_, dir, stat, type, start, func, chain, ctor, result, expectedType, actualType, tmp;
        if (is_("operator", "/") || is_("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.slice(1));
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
            if (ՐՏ_in(S.token.value, [ "set", "get" ])) {
                if (!options.es6) {
                    croak("Class getters/setters require ES6 compilation mode");
                }
                type = S.token.value;
                start = S.token.start;
                next();
                return accessor_(type, start, true);
            }
            return is_token(peek(), "punc", ":") ? labeled_statement() : simple_statement();
        } else if (tmp_ === "keyword") {
            tmp_ = S.token.value;
            if (ES6_KEYWORDS(tmp_) && !options.es6) {
                token_error(prev(), "«" + tmp_ + "» keyword not supported with ES5 output, use --ecmascript6 compilation flag");
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
                        var tmp;
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
                result = new ctor({
                    value: is_("punc", ";") ? function() {
                        semicolon();
                        return null;
                    }() : can_insert_semicolon() ? null : function() {
                        var tmp;
                        tmp = expression(true);
                        semicolon();
                        return tmp;
                    }()
                });
                if (S.in_scope[S.in_scope.length-1].return_annotation) {
                    expectedType = S.in_scope[S.in_scope.length-1].return_annotation.resolveType(S.in_scope);
                    actualType = result.resolveType(S.in_scope);
                    if (!(ՐՏ_in(actualType, [ expectedType, "?" ]))) {
                        croak("Type annotation states that function returns " + expectedType + ", actual returned type is " + actualType + "");
                    }
                }
                return result;
            } else if (tmp_ === "switch") {
                return new AST_Switch({
                    expression: parenthesised(),
                    body: in_loop(switch_body_)
                });
            } else if (tmp_ === "raise") {
                if (S.token.newline_before) {
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
    }, ՐՏ_2 = embed_tokens(ՐՏ_2), ՐՏ_2);
    function labeled_statement() {
        var label, stat;
        label = as_symbol(AST_Label);
        if (find_if(function(l) {
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
        var tmp;
        tmp = expression(true);
        semicolon();
        return new AST_SimpleStatement({
            body: tmp
        });
    }
    function break_cont(type) {
        var label;
        label = null;
        if (!can_insert_semicolon()) {
            label = as_symbol(AST_LabelRef, true);
        }
        if (label !== null) {
            if (!find_if(function(l) {
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
        return new AST_Array({
            start: seq.start,
            elements: seq.to_array(),
            end: seq.end
        });
    }
    function for_(list_comp) {
        var init;
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
        var ՐՏitr3, ՐՏidx3, ՐՏupk1;
        var lhs, obj, i, element, value;
        lhs = init instanceof AST_Var ? init.definitions[0].name : null;
        obj = expression(true);
        if (init instanceof AST_Array) {
            ՐՏitr3 = ՐՏ_Iterable(enumerate(init.elements));
            for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
                ՐՏupk1 = ՐՏitr3[ՐՏidx3];
                i = ՐՏupk1[0];
                element = ՐՏupk1[1];
                value = null;
                if (obj instanceof AST_Call && obj.expression instanceof AST_SymbolRef && obj.expression.name === "enumerate") {
                    if (i === 0) {
                        value = "Number";
                    }
                }
                mark_local_assignment(element, value);
            }
        } else {
            value = null;
            if (obj instanceof AST_Call && obj.expression instanceof AST_SymbolRef && obj.expression.name === "range") {
                value = "Number";
            }
            mark_local_assignment(init, value);
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
        var condition;
        condition = expression(true, true);
        return new AST_ForJS({
            condition: condition,
            body: in_loop(statement)
        });
    }
    function get_class_in_scope(expr) {
        var ՐՏitr4, ՐՏidx4, ՐՏitr5, ՐՏidx5;
        var s, referenced_path, expr, class_name;
        if (expr instanceof AST_SymbolRef) {
            if (ՐՏ_in(expr.name, NATIVE_CLASSES)) {
                return NATIVE_CLASSES[expr.name];
            }
            ՐՏitr4 = ՐՏ_Iterable(range(S.in_scope.length - 1, -1, -1));
            for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
                s = ՐՏitr4[ՐՏidx4];
                if (ՐՏ_in(expr.name, S.in_scope[s].classes)) {
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
                    ՐՏitr5 = ՐՏ_Iterable(range(S.in_scope.length - 1, -1, -1));
                    for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                        s = ՐՏitr5[ՐՏidx5];
                        if (ՐՏ_in(class_name, S.in_scope[s].classes)) {
                            return S.in_scope[s].classes[class_name];
                        }
                    }
                }
            }
        }
        return false;
    }
    function do_import(key) {
        var ՐՏitr7, ՐՏidx7, ՐՏupk3;
        var package_module_id, filename, src_code, modpath, location, data, contents;
        if (ՐՏ_in(key, IMPORTED)) {
            return;
        }
        if (IMPORTING[key]) {
            throw ImportError("Detected a recursive import of: " + key + " while importing: " + module_id);
        }
        package_module_id = key.split(".").slice(0, -1).join(".");
        if (len(package_module_id) > 0) {
            do_import(package_module_id);
        }
        function safe_read(base_path) {
            var ՐՏitr6, ՐՏidx6, ՐՏupk2;
            var i, path;
            ՐՏitr6 = ՐՏ_Iterable(enumerate([ base_path + ".pyj", base_path + "/__init__.pyj" ]));
            for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                ՐՏupk2 = ՐՏitr6[ՐՏidx6];
                i = ՐՏupk2[0];
                path = ՐՏupk2[1];
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
        ՐՏitr7 = ՐՏ_Iterable(import_dirs);
        for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
            location = ՐՏitr7[ՐՏidx7];
            if (location) {
                ՐՏupk3 = safe_read(location + "/" + modpath);
                data = ՐՏupk3[0];
                filename = ՐՏupk3[1];
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
            IMPORTING: IMPORTING,
            auto_bind: options.auto_bind,
            es6: options.es6,
            import_dirs: options.import_dirs,
            dropDecorators: options.dropDecorators,
            dropImports: options.dropImports
        });
        if (len(package_module_id) > 0) {
            IMPORTED[package_module_id].submodules.push(key);
        }
    }
    function import_(from_import) {
        var ՐՏitr8, ՐՏidx8, ՐՏitr9, ՐՏidx9;
        var ans, name, tmp, key, alias, imp, classes, argnames, aname, argvar, obj, i;
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
            if (!keepDecoratorOrImport(key, true)) {
                return new AST_EmptyStatement({
                    start: prev(),
                    end: prev()
                });
            }
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
        ՐՏitr8 = ՐՏ_Iterable(ans["imports"]);
        for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
            imp = ՐՏitr8[ՐՏidx8];
            do_import(imp.key);
            classes = IMPORTED[key].classes;
            if (from_import) {
                expect_token("keyword", "import");
                imp.argnames = argnames = [];
                while (true) {
                    aname = as_symbol(AST_ImportedVar);
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
                ՐՏitr9 = ՐՏ_Iterable(argnames);
                for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
                    argvar = ՐՏitr9[ՐՏidx9];
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
    }
    function class_() {
        var ՐՏitr12, ՐՏidx12;
        var start, name, externaldecorator, class_details, parent, docstring, definition, i, stmt, class_var_names, visitor;
        start = prev();
        name = as_symbol(AST_SymbolDefun);
        if (!name) {
            unexpected();
        }
        externaldecorator = has_simple_decorator(S.decorators, "external");
        class_details = {
            "static": [],
            "bound": {}
        };
        parent = null;
        docstring = null;
        definition = new AST_Class({
            start: start,
            name: name,
            module_id: module_id,
            parent: function() {
                var atom;
                if (is_("punc", "(")) {
                    next();
                    if (is_("punc", ")")) {
                        S.in_parenthesized_expr = false;
                        next();
                        return null;
                    }
                    atom = expr_atom(false);
                    expect(")");
                    parent = atom.name;
                    return atom;
                } else {
                    return null;
                }
            }(),
            localvars: [],
            static: class_details.static,
            external: externaldecorator,
            bound: class_details.bound,
            statements: [],
            decorators: function() {
                var ՐՏitr10, ՐՏidx10;
                var d, decorator;
                d = [];
                ՐՏitr10 = ՐՏ_Iterable(S.decorators);
                for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
                    decorator = ՐՏitr10[ՐՏidx10];
                    if (decorator === "kwargs") {
                        BASELIB["kwargs"] = true;
                    }
                    d.push(new AST_Decorator({
                        expression: decorator
                    }));
                }
                S.decorators = [];
                return d;
            }(),
            body: function(loop, labels) {
                var a;
                S.in_scope[S.in_scope.length-1].classes[name.name] = class_details;
                S.in_scope.push({
                    type: "class",
                    name: name.name,
                    parent: parent,
                    nonlocal: {},
                    functions: {},
                    vars: {},
                    classes: {}
                });
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                a = block_();
                docstring = S.in_scope[S.in_scope.length-1].docstring;
                S.in_scope.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            }(S.in_loop, S.labels),
            docstring: docstring,
            end: prev()
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
            this._visit = function(node, descend) {
                var ՐՏitr11, ՐՏidx11;
                var child;
                if (node instanceof AST_Method) {
                    class_var_names[node.name.name] = true;
                    return;
                } else if (node instanceof AST_Assign && node.left instanceof AST_SymbolRef) {
                    class_var_names[node.left.name] = true;
                }
                ՐՏitr11 = ՐՏ_Iterable(node);
                for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
                    child = ՐՏitr11[ՐՏidx11];
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
        ՐՏitr12 = ՐՏ_Iterable(definition.body);
        for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
            stmt = ՐՏitr12[ՐՏidx12];
            if (!(stmt instanceof AST_Class) && !(stmt instanceof AST_Method)) {
                stmt.walk(visitor);
                definition.statements.push(stmt);
            }
        }
        if (S.in_scope.length === 1) {
            CLASS_MAP[definition.name.name] = definition;
        }
        return definition;
    }
    function function_(in_class, ctor) {
        var start, is_accessor, name, generator, localvars, staticmethod, function_args, return_annotation, has_special_decorator, ctor, docstring, definition;
        start = prev();
        is_accessor = ctor === AST_ObjectGetter || ctor === AST_ObjectSetter;
        name = is_("name") ? as_symbol(in_class ? AST_SymbolDefun : is_accessor ? AST_SymbolAccessor : AST_SymbolLambda) : is_accessor && (is_("string") || is_("num")) ? as_atom_node() : null;
        if (in_class && !name) {
            unexpected();
        }
        generator = false;
        localvars = null;
        staticmethod = false;
        function_args = {};
        return_annotation = null;
        has_special_decorator = function(name) {
            return has_simple_decorator(S.decorators, name);
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
        docstring = null;
        definition = new ctor({
            start: start,
            name: name,
            argnames: function(a) {
                var defaults, first, seen_names, def_line, val, expr;
                defaults = {};
                first = true;
                seen_names = {};
                def_line = S.input.context().tokline;
                function get_arg() {
                    var name_token, name_ctx, ntok, annotation, sym;
                    if (Object.prototype.hasOwnProperty.call(seen_names, S.token.value)) {
                        token_error(prev(), "Can't repeat parameter names");
                    }
                    if (S.token.value === "arguments") {
                        token_error(prev(), "Can't use the name arguments as a parameter name, it is reserved by JavaScript");
                    }
                    seen_names[S.token.value] = true;
                    name_token = S.token;
                    name_ctx = S.input.context();
                    ntok = peek();
                    if (ntok.type === "punc" && ntok.value === ":") {
                        next();
                        expect(":");
                        annotation = maybe_conditional();
                        if (!is_token(name_token, "name")) {
                            croak("Name expected", name_ctx.tokline);
                            return null;
                        }
                        sym = new AST_SymbolFunarg({
                            "name": name_token.value,
                            "start": S.token,
                            "end": S.token,
                            "annotation": annotation ? new AST_Annotation({
                                "start": annotation.start,
                                "expression": annotation,
                                "end": annotation.end
                            }) : null
                        });
                    } else {
                        if (!is_("name")) {
                            if (S.input.context().tokline !== def_line) {
                                croak("Name expected", def_line);
                            } else {
                                croak("Name expected");
                            }
                            return null;
                        }
                        sym = new AST_SymbolFunarg({
                            "name": S.token.value,
                            "start": S.token,
                            "end": S.token,
                            "annotation": null
                        });
                        next();
                    }
                    function_args[sym.name] = sym.annotation ? sym.annotation.resolveType(S.in_scope) : "?";
                    return sym;
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
                if (is_("punc", "->")) {
                    next();
                    expr = expression(true);
                    return_annotation = new AST_Annotation({
                        start: expr.start,
                        expression: expr,
                        end: expr.end
                    });
                }
                a.defaults = defaults;
                return a;
            }([]),
            decorators: function() {
                var ՐՏitr13, ՐՏidx13;
                var d, decorator;
                d = [];
                ՐՏitr13 = ՐՏ_Iterable(S.decorators);
                for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
                    decorator = ՐՏitr13[ՐՏidx13];
                    d.push(new AST_Decorator({
                        expression: decorator
                    }));
                }
                S.decorators = [];
                return d;
            }(),
            return_annotation: return_annotation,
            body: function(loop, labels) {
                var a, variable;
                S.in_scope.push({
                    type: "function",
                    name: name ? name.name : null,
                    return_annotation: return_annotation,
                    nonlocal: {},
                    vars: {},
                    args: function_args,
                    functions: {},
                    classes: {}
                });
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                a = block_();
                generator = S.in_scope[S.in_scope.length-1].generator;
                docstring = S.in_scope[S.in_scope.length-1].docstring;
                if (generator) {
                    ՐՏ_print(S.in_scope[S.in_scope.length-1]);
                }
                localvars = (function() {
                    var ՐՏidx14, ՐՏitr14 = ՐՏ_Iterable(Object.keys(S.in_scope[S.in_scope.length-1].vars)), ՐՏres = [], variable;
                    for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
                        variable = ՐՏitr14[ՐՏidx14];
                        if (!(ՐՏ_in(variable, S.in_scope[S.in_scope.length-1].nonlocal))) {
                            ՐՏres.push(new_symbol(AST_SymbolVar, variable));
                        }
                    }
                    return ՐՏres;
                })();
                S.in_scope.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            }(S.in_loop, S.labels),
            docstring: docstring,
            generator: generator,
            localvars: localvars,
            end: prev(),
            static: in_class && staticmethod
        });
        if (name) {
            S.in_scope[S.in_scope.length-1].functions[name.name] = definition.resolveType(S.in_scope);
        }
        if (in_class && !staticmethod) {
            if (definition.argnames.length < 1) {
                croak("Class methods require at least one argument (self)", start.line, start.col, start.pos);
            } else if (ctor === AST_ObjectGetter && definition.argnames.length !== 1) {
                croak("Class getters don't take any arguments aside from one referencing the instance (self)", start.line, start.col, start.pos);
            } else if (ctor === AST_ObjectSetter && definition.argnames.length !== 2) {
                croak("Class setters take exactly 2 arguments (self, value)", start.line, start.col, start.pos);
            }
        } else if (is_accessor) {
            if (ctor === AST_ObjectGetter && definition.argnames.length) {
                croak("Object getters don't take any arguments", start.line, start.col, start.pos);
            } else if (ctor === AST_ObjectSetter && definition.argnames.length !== 1) {
                croak("Object setters take exactly 1 argument", start.line, start.col, start.pos);
            }
        }
        return definition;
    }
    function accessor_(type, start, in_class) {
        var func;
        if (type === "get") {
            func = function_(in_class, AST_ObjectGetter);
        } else if (type === "set") {
            func = function_(in_class, AST_ObjectSetter);
        } else {
            croak("Expecting setter/getter, got '" + type + "' instead.");
        }
        func.start = start;
        func.end = prev();
        return func;
    }
    function if_() {
        var cond, body, belse;
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
    function is_docstring(stmt) {
        if (stmt instanceof AST_Directive && !S.in_scope[S.in_scope.length-1].docstring) {
            return true;
        }
        return false;
    }
    function format_docstring(string) {
        var ՐՏitr15, ՐՏidx15, ՐՏitr16, ՐՏidx16;
        var lines, indent, line, pad, trimmed;
        lines = string.split(/\n/g);
        indent = 1e6;
        ՐՏitr15 = ՐՏ_Iterable(lines.slice(1));
        for (ՐՏidx15 = 0; ՐՏidx15 < ՐՏitr15.length; ՐՏidx15++) {
            line = ՐՏitr15[ՐՏidx15];
            if (line.trim().length) {
                pad = line.match(/^\s*/)[0];
                indent = Math.min(indent, pad.length);
            }
        }
        trimmed = [ lines[0].trim() ];
        if (indent < 1e6) {
            ՐՏitr16 = ՐՏ_Iterable(lines.slice(1));
            for (ՐՏidx16 = 0; ՐՏidx16 < ՐՏitr16.length; ՐՏidx16++) {
                line = ՐՏitr16[ՐՏidx16];
                trimmed.push(line.slice(indent).replace(/\s+$/));
            }
        }
        while (trimmed && !trimmed[trimmed.length-1]) {
            trimmed.pop();
        }
        while (trimmed && !trimmed[0]) {
            trimmed.shift();
        }
        return trimmed.join("\n");
    }
    function block_() {
        var a, stmt;
        expect(":");
        a = [];
        if (!S.token.newline_before) {
            while (!S.token.newline_before) {
                if (is_("eof")) {
                    unexpected();
                }
                stmt = statement();
                if (!a.length && is_docstring(stmt)) {
                    S.in_scope[S.in_scope.length-1].docstring = format_docstring(stmt.value);
                } else {
                    a.push(stmt);
                }
            }
        } else {
            while (!is_("punc", "}")) {
                if (is_("eof")) {
                    return a;
                }
                stmt = statement();
                if (!a.length && is_docstring(stmt)) {
                    S.in_scope[S.in_scope.length-1].docstring = format_docstring(stmt.value);
                } else {
                    a.push(stmt);
                }
            }
            next();
        }
        return a;
    }
    function switch_body_() {
        var a, cur, branch;
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
                        var tmp;
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
                        var tmp;
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
        var body, bcatch, bfinally, start, exceptions, name;
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
        var a, symbol;
        a = [];
        while (true) {
            symbol = new AST_VarDef({
                start: S.token,
                name: as_symbol(type === "const" ? AST_SymbolConst : type === "nonlocal" ? AST_SymbolNonlocal : AST_SymbolVar),
                end: prev()
            });
            if (type === "nonlocal") {
                S.in_scope[S.in_scope.length-1].nonlocal[symbol.name.name] = true;
            }
            a.push(symbol);
            if (!is_("punc", ",")) {
                break;
            }
            next();
        }
        return a;
    }
    function nonlocal_(no_in) {
        return new AST_Var({
            start: prev(),
            definitions: vardefs(no_in, "nonlocal"),
            end: prev()
        });
    }
    function const_() {
        return new AST_Const({
            start: prev(),
            definitions: vardefs(false, "const"),
            end: prev()
        });
    }
    function new_() {
        var start, newexp, args;
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
    }
    function as_atom_node(token) {
        var tok, tmp_, token, ret, tmp__;
        tok = token || S.token;
        tmp_ = tok.type;
        if (tmp_ === "name") {
            if (tok.value === "NaN") {
                ret = kwargs(as_symbol)(AST_NaN, {token: tok});
            } else if (tok.value === "undefined") {
                ret = kwargs(as_symbol)(AST_Undefined, {token: tok});
            } else {
                ret = kwargs(as_symbol)(AST_SymbolRef, {token: tok});
            }
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
        ret.resolveType(S.in_scope);
        return ret;
    }
    function expr_atom(allow_calls) {
        var start, tmp_, ex, cls, func;
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
    }
    function expr_list(closing, allow_trailing_comma, allow_empty, func_call) {
        var ՐՏitr17, ՐՏidx17, ՐՏupk4;
        var first, a, saw_starargs, tmp, i, arg;
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
            ՐՏitr17 = ՐՏ_Iterable(enumerate(a));
            for (ՐՏidx17 = 0; ՐՏidx17 < ՐՏitr17.length; ՐՏidx17++) {
                ՐՏupk4 = ՐՏitr17[ՐՏidx17];
                i = ՐՏupk4[0];
                arg = ՐՏupk4[1];
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
        var a, first, kwargs, arg;
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
        var terminator, forloop;
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
    
    var array_ = (ՐՏ_3 = function array_() {
        var expr, ret;
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
                ret = new AST_Range({
                    start: S.token,
                    left: expr[0],
                    operator: "til",
                    right: expr[1],
                    end: prev()
                });
                expect("]");
                return ret;
            } else if (is_("operator", "to")) {
                BASELIB["range"] = true;
                next();
                expr.push(expression(false));
                ret = new AST_Range({
                    start: S.token,
                    left: expr[0],
                    operator: "to",
                    right: expr[1],
                    end: prev()
                });
                expect("]");
                return ret;
            } else if (!is_("punc", "]")) {
                expect(",");
            }
        }
        return new AST_Array({
            elements: expr.concat(expr_list("]", !options.strict, true))
        });
    }, ՐՏ_3 = embed_tokens(ՐՏ_3), ՐՏ_3);
    
    var object_ = (ՐՏ_4 = function object_() {
        var maybe_dict_comprehension, first, a, start, type, computed, saw_starargs, key, name, ctx, orig, key_;
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
            computed = false;
            saw_starargs = false;
            if (is_("operator", "*")) {
                saw_starargs = true;
                if (!options.es6) {
                    croak("Spread operator in object literals is only allowed in ES6 mode");
                }
                a.push(maybe_unary(true));
            } else if (first && peek().value !== ":") {
                maybe_dict_comprehension = true;
                key = expression(false);
                name = null;
            } else {
                ctx = S.input.context();
                orig = ctx.expect_object_literal_key;
                ctx.expect_object_literal_key = true;
                if (is_("punc", "(")) {
                    if (!options.es6) {
                        croak("Computed properties are only allowed in ES6 mode");
                    }
                    expect("(");
                    key = expression(false);
                    expect(")");
                    computed = true;
                } else {
                    key_ = as_property_name();
                    name = key_.value;
                    if (key_.type === "num") {
                        key = new AST_Number({
                            start: start,
                            value: name,
                            end: prev()
                        });
                    } else if (key_.type === "name" || key_.type === "keyword") {
                        if (ՐՏ_in(name, [ "True", "False" ])) {
                            key = new AST_Boolean({
                                start: start,
                                value: name,
                                end: prev()
                            });
                        } else {
                            key = new AST_Identifier({
                                start: start,
                                value: name,
                                end: prev()
                            });
                        }
                    } else {
                        key = new AST_String({
                            start: start,
                            value: name,
                            end: prev()
                        });
                    }
                }
                ctx.expect_object_literal_key = orig;
                if (type === "name" && !is_("punc", ":")) {
                    a.push(accessor_(name, start, false));
                    continue;
                }
            }
            if (!saw_starargs) {
                expect(":");
                a.push(new AST_ObjectKeyVal({
                    start: start,
                    key: key,
                    value: expression(false),
                    end: prev()
                }));
                if (a.length === 1 && is_("keyword", "for")) {
                    return read_comprehension(new AST_DictComprehension({
                        statement: maybe_dict_comprehension ? key : as_atom_node(a[0].start),
                        value_statement: a[0].value
                    }));
                }
            }
            first = false;
        }
        next();
        return new AST_Object({
            properties: a
        });
    }, ՐՏ_4 = embed_tokens(ՐՏ_4), ՐՏ_4);
    function as_property_name() {
        var tmp, tmp_;
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
        var tmp, tmp_;
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
        var token_, name, sym;
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
        var sym;
        sym = new (name === "this" ? AST_This : type)({
            name: String(name),
            start: null,
            end: null
        });
        return sym;
    }
    function is_static_method(cls, method) {
        if (ՐՏ_in(method, COMMON_STATIC) || cls.static && ՐՏ_in(method, cls.static)) {
            return true;
        } else {
            return false;
        }
    }
    function mark_local_assignment(element, value) {
        var computedType, name;
        if (value) {
            computedType = typeof value === "string" ? value : value.resolveType(S.in_scope);
        } else {
            computedType = "?";
        }
        name = typeof element === "string" ? element : element.name;
        if (name) {
            if (ՐՏ_in(name, S.in_scope[S.in_scope.length-1].vars)) {
                S.in_scope[S.in_scope.length-1].vars[name].push(computedType);
            } else {
                S.in_scope[S.in_scope.length-1].vars[name] = [ computedType ];
            }
        }
    }
    function subscripts(expr, allow_calls) {
        var start, slice_bounds, is_slice, i, str_, ret, cls, funcname, tmp_, args;
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
        if (is_("punc", "[") && !S.token.newline_before) {
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
                    return subscripts(new AST_Slice({
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
                        var ՐՏidx18, ՐՏitr18 = ՐՏ_Iterable(slice_bounds), ՐՏres = [], i;
                        for (ՐՏidx18 = 0; ՐՏidx18 < ՐՏitr18.length; ՐՏidx18++) {
                            i = ՐՏitr18[ՐՏidx18];
                            ՐՏres.push(i === null ? new AST_Number({
                                value: 0
                            }) : i);
                        }
                        return ՐՏres;
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
        if (allow_calls && is_("punc", "(") && !S.token.newline_before) {
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
                    cls = get_class_in_scope(expr.expression);
                }
                if (cls) {
                    funcname = expr;
                    if (funcname.property === "__init__") {
                        funcname.property = "constructor";
                    }
                    return validateCallArgs(subscripts(new AST_ClassCall({
                        start: start,
                        class: expr.expression,
                        method: funcname.property,
                        super: S.in_scope.length > 1 && S.in_scope[S.in_scope.length-2].type === "class" && expr.expression.name === S.in_scope[S.in_scope.length-2].parent,
                        static: is_static_method(cls, funcname.property),
                        args: func_call_list(),
                        end: prev()
                    }), true));
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
                return validateCallArgs(subscripts(new AST_Call({
                    start: start,
                    expression: expr,
                    args: func_call_list(),
                    end: prev()
                }), true));
            }
        }
        return expr;
    }
    function keepDecoratorOrImport(expr, imp) {
        imp = imp === void 0 ? false : imp;
        var name;
        if (imp) {
            if (!options.dropImports.length) {
                return true;
            }
        } else {
            if (!options.dropDecorators.length) {
                return true;
            }
        }
        function stringifyName(expr) {
            if (expr instanceof AST_Dot) {
                return stringifyName(expr.expression) + "." + expr.property;
            }
            return expr.name;
        }
        if (typeof expr === "string") {
            name = expr;
        } else if (expr instanceof AST_SymbolRef) {
            name = expr.name;
        } else if (expr instanceof AST_Dot) {
            name = stringifyName(expr);
        } else if (expr instanceof AST_Call) {
            name = stringifyName(expr.expression);
        } else {
            croak("Unsupported decorator");
        }
        if (imp) {
            return !(ՐՏ_in(name, options.dropImports));
        } else {
            return !(ՐՏ_in(name, options.dropDecorators));
        }
    }
    function maybe_unary(allow_calls) {
        var start, expr, ex, val;
        start = S.token;
        if (is_("operator", "@")) {
            if (S.in_decorator) {
                croak("Nested decorators are not allowed");
            }
            next();
            S.in_decorator = true;
            expr = expression();
            S.in_decorator = false;
            if (keepDecoratorOrImport(expr)) {
                S.decorators.push(expr);
            }
            return new AST_EmptyStatement({
                stype: "@",
                start: prev(),
                end: prev()
            });
        }
        if (is_("operator") && UNARY_PREFIX(start.value)) {
            next();
            ex = make_unary(AST_UnaryPrefix, start.value, maybe_unary(allow_calls));
            ex.start = start;
            ex.end = prev();
            return ex;
        }
        val = expr_atom(allow_calls);
        while (is_("operator") && UNARY_POSTFIX(S.token.value) && !S.token.newline_before) {
            val = make_unary(AST_UnaryPostfix, S.token.value, val);
            val.start = start;
            val.end = S.token;
            next();
        }
        return val;
    }
    function make_unary(ctor, op, expr) {
        return validateUnary(new ctor({
            operator: op,
            expression: expr
        }));
    }
    function validateBinary(astElement) {
        var left, right, op;
        left = astElement.left.resolveType(S.in_scope);
        right = astElement.right.resolveType(S.in_scope);
        op = astElement.operator;
        if (!(ՐՏ_in(op, [ "in", "instanceof", "==", "!=", "===", "!==", "||", "&&", "=" ])) && (!(ՐՏ_in(left, [ "Number", "String", "Boolean", "?" ])) || !(ՐՏ_in(right, [ "Number", "String", "Boolean", "?" ])) || left === "String" && !(ՐՏ_in(op, [ "+", "+=" ])) || right === "String" && !(ՐՏ_in(op, [ "+", "+=" ])))) {
            if (left[0] === "[") {
                left = "Array";
            } else if (left[0] === "{") {
                left = "Object";
            }
            if (right[0] === "[") {
                right = "Array";
            } else if (right[0] === "{") {
                right = "Object";
            }
            throw croak("cannot perform binary '" + op + "' operation on incompatbile elements of type " + left + " and " + right + "");
        }
        return astElement;
    }
    function validateUnary(astElement) {
        var element, op;
        element = astElement.expression.resolveType(S.in_scope);
        op = astElement.operator;
        if (!(ՐՏ_in(element, [ "Number", "?" ])) && ՐՏ_in(op, [ "+", "-" ]) || !(ՐՏ_in(element[0], [ "[", "{", "?" ])) && op === "*") {
            if (element[0] === "[") {
                element = "Array";
            } else if (element[0] === "{") {
                element = "Object";
            }
            throw croak("cannot perform unary '" + op + "' operation on incompatbile element of type " + element);
        }
        return astElement;
    }
    function validateCallArgs(astElement) {
        var ՐՏitr19, ՐՏidx19, ՐՏitr20, ՐՏidx20, ՐՏitr21, ՐՏidx21, ՐՏitr22, ՐՏidx22, ՐՏupk5;
        var name, found, scope, func, signature, variable, args, i, arg, expected, actual;
        if (astElement.expression instanceof AST_SymbolRef) {
            name = astElement.expression.name;
            found = false;
            ՐՏitr19 = ՐՏ_Iterable(reversed(S.in_scope));
            for (ՐՏidx19 = 0; ՐՏidx19 < ՐՏitr19.length; ՐՏidx19++) {
                scope = ՐՏitr19[ՐՏidx19];
                ՐՏitr20 = ՐՏ_Iterable(scope.functions);
                for (ՐՏidx20 = 0; ՐՏidx20 < ՐՏitr20.length; ՐՏidx20++) {
                    func = ՐՏitr20[ՐՏidx20];
                    if (func === name) {
                        signature = scope.functions[func];
                        found = true;
                        break;
                    }
                }
                ՐՏitr21 = ՐՏ_Iterable(scope.vars);
                for (ՐՏidx21 = 0; ՐՏidx21 < ՐՏitr21.length; ՐՏidx21++) {
                    variable = ՐՏitr21[ՐՏidx21];
                    if (variable === name) {
                        signature = scope.vars[func];
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            if (signature && signature.slice(0, 9) === "Function(") {
                args = /\((.*)\)/.exec(signature)[1].split(",");
                if (args.length === 1 && !args[0].length) {
                    args.pop();
                }
                if (args.length < astElement.args.length) {
                    croak("Function '" + name + "' takes " + args.length + " arguments, yet your call contains " + astElement.args.length + "");
                }
                ՐՏitr22 = ՐՏ_Iterable(enumerate(astElement.args));
                for (ՐՏidx22 = 0; ՐՏidx22 < ՐՏitr22.length; ՐՏidx22++) {
                    ՐՏupk5 = ՐՏitr22[ՐՏidx22];
                    i = ՐՏupk5[0];
                    arg = ՐՏupk5[1];
                    expected = args[i].trim();
                    actual = arg.resolveType(S.in_scope);
                    if (expected !== "?" && !(ՐՏ_in(actual, [ expected, "?" ]))) {
                        croak("Function '" + name + "' expects argument " + i + " type of " + expected + ", but you're passing " + actual + "");
                    }
                }
            }
        }
        return astElement;
    }
    function expr_op(left, min_prec, no_in) {
        var op, not_in, prec, right, ret;
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
            if (ՐՏ_in(op, [ "==", "!=" ])) {
                BASELIB["eq"] = true;
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
                validateBinary(ret);
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
    }
    function expr_ops(no_in) {
        return expr_op(maybe_unary(true), 0, no_in);
    }
    function maybe_conditional(no_in) {
        var start, expr, yes;
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
    }
    function isAssignable(expr) {
        var ՐՏitr23, ՐՏidx23;
        var element;
        if (expr instanceof AST_SymbolRef || expr instanceof AST_PropAccess) {
            return true;
        }
        if (expr instanceof AST_Array) {
            ՐՏitr23 = ՐՏ_Iterable(expr.elements);
            for (ՐՏidx23 = 0; ՐՏidx23 < ՐՏitr23.length; ՐՏidx23++) {
                element = ՐՏitr23[ՐՏidx23];
                if (!isAssignable(element)) {
                    return false;
                }
            }
            return true;
        }
        if (expr instanceof AST_Seq) {
            if (isAssignable(expr.car) && isAssignable(expr.cdr)) {
                return true;
            }
        }
        return false;
    }
    function maybe_assign(no_in) {
        var start, left, val, right;
        start = S.token;
        left = maybe_conditional(no_in);
        val = S.token.value;
        if (is_("operator") && ASSIGNMENT(val)) {
            if (isAssignable(left)) {
                if (left instanceof AST_SymbolRef && val !== "=" && !(ՐՏ_in(left.name, S.in_scope[S.in_scope.length-1].vars)) && (!S.in_scope[S.in_scope.length-1].args || !(ՐՏ_in(left.name, S.in_scope[S.in_scope.length-1].args))) && !(ՐՏ_in(left.name, S.in_scope[S.in_scope.length-1].nonlocal))) {
                    croak("Attempting to increment/modify uninitialized variable '" + left.name + "', this can also occur if you're trying to shadow without initializing the variable in local scope.");
                }
                next();
                right = maybe_assign(no_in);
                if (!S.in_seq) {
                    mark_local_assignment(left, right);
                }
                return validateBinary(new AST_Assign({
                    start: start,
                    left: left,
                    operator: val,
                    right: right,
                    end: prev()
                }));
            }
            croak("Invalid assignment");
        }
        return left;
    }
    function expression(commas, no_in) {
        var ՐՏitr24, ՐՏidx24, ՐՏupk6, ՐՏitr25, ՐՏidx25, ՐՏupk7;
        var start, expr, left, leftAst, right, index, element, seq;
        start = S.token;
        expr = maybe_assign(no_in);
        if (commas) {
            left = [ expr ];
            while (is_("punc", ",") && !peek().newline_before) {
                S.in_seq = true;
                next();
                if (expr instanceof AST_Assign) {
                    left[left.length-1] = left[left.length-1].left;
                    if (left.length === 1) {
                        if (left[0] instanceof AST_Seq) {
                            leftAst = seq_to_array(left[0]);
                        } else {
                            leftAst = left[0];
                        }
                    } else {
                        leftAst = new AST_Array({
                            elements: left
                        });
                    }
                    right = seq_to_array(new AST_Seq({
                        car: expr.right,
                        cdr: expression(true, no_in)
                    }));
                    ՐՏitr24 = ՐՏ_Iterable(enumerate(leftAst.elements));
                    for (ՐՏidx24 = 0; ՐՏidx24 < ՐՏitr24.length; ՐՏidx24++) {
                        ՐՏupk6 = ՐՏitr24[ՐՏidx24];
                        index = ՐՏupk6[0];
                        element = ՐՏupk6[1];
                        mark_local_assignment(element, right.elements[index]);
                    }
                    return new AST_Assign({
                        start: start,
                        left: leftAst,
                        operator: expr.operator,
                        right: right,
                        end: peek()
                    });
                }
                expr = maybe_assign(no_in);
                left.push(expr);
            }
            S.in_seq = false;
            if (expr instanceof AST_Assign && expr.left instanceof AST_Seq) {
                expr.left = seq_to_array(expr.left);
            }
            if (left.length > 1 && left[left.length-1] instanceof AST_Assign) {
                left[left.length-1] = left[left.length-1].left;
                ՐՏitr25 = ՐՏ_Iterable(enumerate(left));
                for (ՐՏidx25 = 0; ՐՏidx25 < ՐՏitr25.length; ՐՏidx25++) {
                    ՐՏupk7 = ՐՏitr25[ՐՏidx25];
                    index = ՐՏupk7[0];
                    element = ՐՏupk7[1];
                    mark_local_assignment(element, expr.right instanceof AST_Array ? expr.right.elements[index] : null);
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
            seq = function build_seq(a) {
                var ՐՏitr26, ՐՏidx26, ՐՏupk8;
                var first, index, element;
                first = a.shift();
                if (first instanceof AST_Assign) {
                    if (first.left instanceof AST_Array) {
                        ՐՏitr26 = ՐՏ_Iterable(enumerate(first.left.elements));
                        for (ՐՏidx26 = 0; ՐՏidx26 < ՐՏitr26.length; ՐՏidx26++) {
                            ՐՏupk8 = ՐՏitr26[ՐՏidx26];
                            index = ՐՏupk8[0];
                            element = ՐՏupk8[1];
                            mark_local_assignment(element, first.right instanceof AST_Array ? first.right.elements[index] : null);
                        }
                    }
                }
                if (!a.length) {
                    return first;
                }
                return new AST_Seq({
                    start: start,
                    car: first,
                    cdr: build_seq(a),
                    end: peek()
                });
            }(left);
            return seq;
        }
        return expr;
    }
    function in_loop(cont) {
        var ret;
        ++S.in_loop;
        ret = cont();
        --S.in_loop;
        return ret;
    }
    return function() {
        var ՐՏitr27, ՐՏidx27;
        var start, body, docstring, first_token, element, shebang, end, toplevel, assignments, callables, item;
        start = S.token;
        body = [];
        docstring = null;
        first_token = true;
        while (!is_("eof")) {
            element = statement();
            if (first_token && element instanceof AST_Directive && element.value.indexOf("#!") === 0) {
                shebang = element.value;
            } else if (!body.length && is_docstring(element)) {
                docstring = format_docstring(element.value);
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
                strict: true,
                shebang: shebang,
                docstring: docstring,
                end: end
            });
        }
        function uniq(element, index, arr) {
            return arr.lastIndexOf(element) === index;
        }
        toplevel.nonlocalvars = Object.keys(S.in_scope[S.in_scope.length-1].nonlocal);
        assignments = Object.keys(S.in_scope[S.in_scope.length-1].vars);
        callables = scan_for_top_level_callables(toplevel.body).filter(uniq);
        toplevel.localvars = [];
        ՐՏitr27 = ՐՏ_Iterable(assignments);
        for (ՐՏidx27 = 0; ՐՏidx27 < ՐՏitr27.length; ՐՏidx27++) {
            item = ՐՏitr27[ՐՏidx27];
            if (!(ՐՏ_in(item, toplevel.nonlocalvars))) {
                toplevel.localvars.push(new_symbol(AST_SymbolVar, item));
            }
        }
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