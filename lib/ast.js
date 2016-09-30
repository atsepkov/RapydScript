var ՐՏ_1, ՐՏ_2;
var AST_Token, AST_Node, AST_Statement, AST_Debugger, AST_Directive, AST_SimpleStatement, AST_Block, AST_BlockStatement, AST_EmptyStatement, AST_StatementWithBody, AST_LabeledStatement, AST_DWLoop, AST_Do, AST_While, AST_ForIn, AST_ForJS, AST_ListComprehension, AST_DictComprehension, AST_With, AST_Scope, AST_Toplevel, AST_Splat, AST_Import, AST_Imports, AST_Decorator, AST_Annotation, AST_Lambda, AST_Accessor, AST_Function, AST_Class, AST_Module, AST_Method, AST_Jump, AST_Exit, AST_Return, AST_Yield, AST_Throw, AST_LoopControl, AST_Break, AST_Continue, AST_If, AST_Switch, AST_SwitchBranch, AST_Default, AST_Case, AST_Try, AST_Catch, AST_Except, AST_Finally, AST_Definitions, AST_Var, AST_Const, AST_VarDef, AST_BaseCall, AST_Call, AST_ClassCall, AST_New, AST_Seq, AST_PropAccess, AST_Dot, AST_Sub, AST_Slice, AST_Unary, AST_UnaryPrefix, AST_UnaryPostfix, AST_Binary, AST_Range, AST_DeepEquality, AST_Conditional, AST_Assign, AST_Array, AST_TupleUnpack, AST_Object, AST_ObjectProperty, AST_ObjectKeyVal, AST_ObjectSetter, AST_ObjectGetter, AST_Symbol, AST_SymbolAlias, AST_SymbolAccessor, AST_SymbolDeclaration, AST_SymbolVar, AST_SymbolNonlocal, AST_ImportedVar, AST_SymbolConst, AST_SymbolFunarg, AST_SymbolDefun, AST_SymbolLambda, AST_SymbolCatch, AST_Label, AST_SymbolRef, AST_SymbolClassRef, AST_LabelRef, AST_This, AST_Constant, AST_String, AST_Verbatim, AST_Number, AST_Identifier, AST_RegExp, AST_Atom, AST_Null, AST_NaN, AST_Undefined, AST_Hole, AST_Infinity, AST_Boolean, AST_False, AST_True;
function DEFNODE(type, props, methods, base) {
    var ՐՏitr1, ՐՏidx1;
    var base, props, self_props, code, i, proto, ctor, method;
    if (arguments.length < 4) {
        base = AST_Node;
    }
    if (!props) {
        props = [];
    } else {
        props = props.split(/\s+/);
    }
    self_props = props;
    if (base && base.PROPS) {
        props = props.concat(base.PROPS);
    }
    code = "return function AST_" + type + "(props){ if (props) { ";
    ՐՏitr1 = ՐՏ_Iterable(range(props.length - 1, -1, -1));
    for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
        i = ՐՏitr1[ՐՏidx1];
        code += "this." + props[i] + " = props." + props[i] + ";";
    }
    proto = base && new base();
    if (proto && proto.initialize || methods && methods.initialize) {
        code += "this.initialize();";
    }
    code += "}}";
    ctor = new Function(code)();
    if (proto) {
        ctor.prototype = proto;
        ctor.BASE = base;
    }
    if (base) {
        base.SUBCLASSES.push(ctor);
    }
    ctor.prototype.CTOR = ctor;
    ctor.PROPS = props || null;
    ctor.SELF_PROPS = self_props;
    ctor.SUBCLASSES = [];
    if (type) {
        ctor.prototype.TYPE = ctor.TYPE = type;
    }
    function memoized(f) {
        return function(x) {
            if (!this.computedType) {
                this.computedType = f.call(this, x);
            }
            return this.computedType;
        };
    }
    if (methods) {
        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                if (method === "resolveType") {
                    ctor.prototype[method] = memoized(methods[method]);
                } else if (/^\$/.test(method)) {
                    ctor[method.slice(1)] = methods[method];
                } else {
                    ctor.prototype[method] = methods[method];
                }
            }
        }
    }
    ctor.DEFMETHOD = function(name, method) {
        this.prototype[name] = method;
    };
    return ctor;
}
AST_Token = DEFNODE("Token", "type subtype value line col pos endpos newline_before comments_before file", {}, null);
AST_Node = DEFNODE("Node", "start end", {
    clone: function() {
        return new this.CTOR(this);
    },
    $documentation: "Base class of all AST nodes",
    $propdoc: {
        start: "[AST_Token] The first token of this node",
        end: "[AST_Token] The last token of this node"
    },
    _walk: function(visitor) {
        return visitor._visit(this);
    },
    walk: function(visitor) {
        return this._walk(visitor);
    },
    _dump: (ՐՏ_1 = function(depth, omit, offset, include_name, compact) {
        var ՐՏitr2, ՐՏidx2, ՐՏitr3, ՐՏidx3, ՐՏitr4, ՐՏidx4, ՐՏitr5, ՐՏidx5;
        var key, colored_key, value, element, property;
        function out(string) {
            var pad;
            pad = new Array(offset + 1).join("  ");
            console.log(pad + string);
        }
        if (include_name) {
            out(colored(this.TYPE, "yellow"));
        }
        ՐՏitr2 = ՐՏ_Iterable(this);
        for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
            key = ՐՏitr2[ՐՏidx2];
            if (ՐՏ_in(key, omit)) {
                continue;
            }
            colored_key = colored(key + ": ", "blue");
            value = this[key];
            if (Array.isArray(value)) {
                if (value.length) {
                    out(" " + colored_key + "[");
                    if (depth > 1) {
                        ՐՏitr3 = ՐՏ_Iterable(value);
                        for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
                            element = ՐՏitr3[ՐՏidx3];
                            element._dump(depth - 1, omit, offset + 1, true, compact);
                        }
                    } else {
                        ՐՏitr4 = ՐՏ_Iterable(value);
                        for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
                            element = ՐՏitr4[ՐՏidx4];
                            out("   " + colored(element.TYPE, "yellow"));
                        }
                    }
                    out(" ]");
                } else {
                    if (!compact) {
                        out(" " + colored_key + "[]");
                    }
                }
            } else if (!(ՐՏ_in(value, [ void 0, null ]))) {
                if (value.TYPE) {
                    if (value.TYPE === "Token") {
                        if (compact) {
                            out(" " + colored_key + colored(value.TYPE + "(" + value.file + ":" + value.line + ":" + value.col + ": " + value.value + ")", "magenta"));
                        } else {
                            out(" " + colored_key + colored(value.TYPE, "magenta"));
                            ՐՏitr5 = ՐՏ_Iterable(value);
                            for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                                property = ՐՏitr5[ՐՏidx5];
                                out("   " + colored(property + ": ", "blue") + value[property]);
                            }
                        }
                    } else {
                        out(" " + colored_key + colored(value.TYPE, "yellow"));
                        if (depth > 1) {
                            value._dump(depth - 1, omit, offset + 1, false, compact);
                        }
                    }
                } else if (typeof value === "string") {
                    out(" " + colored_key + colored('"' + value + '"', "green"));
                } else if (typeof value === "number") {
                    out(" " + colored_key + colored(value, "green"));
                } else if (typeof value === "boolean") {
                    out(" " + colored_key + colored(value, "green"));
                } else {
                    out(" " + colored_key + colored(value, "red"));
                }
            } else {
                if (!compact) {
                    out(" " + colored_key + value);
                }
            }
        }
    }, Object.defineProperty(ՐՏ_1, "__doc__", {
        value: "Dump node structure, used for debugging:\n\n    depth: how many nodes below to dump\n    omit: properties to omit\n    offset: padding offset to use\n    include_name: whether to output the name of the node\n    compact: use compact representation of the node"
    }), ՐՏ_1),
    dump: function(depth, omit, compact) {
        depth = depth === void 0 ? 2 : depth;
        omit = omit === void 0 ? [ "start", "end" ] : omit;
        compact = compact === void 0 ? true : compact;
        return this._dump(depth, omit, 0, true, compact);
    },
    computedType: null,
    resolveType: (ՐՏ_2 = function(heap) {
        return "?";
    }, Object.defineProperty(ՐՏ_2, "__doc__", {
        value: "Function to resolve the final object type of the statement, if possible, override this on\nper-node basis"
    }), ՐՏ_2)
}, null);
AST_Node.warn_function = null;
AST_Node.warn = function(txt, props) {
    if (AST_Node.warn_function) {
        AST_Node.warn_function(string_template(txt, props));
    }
};
AST_Statement = DEFNODE("Statement", null, {
    $documentation: "Base class of all statements"
});
AST_Debugger = DEFNODE("Debugger", null, {
    $documentation: "Represents a debugger statement"
}, AST_Statement);
AST_Directive = DEFNODE("Directive", "value scope", {
    $documentation: 'Represents a directive, like "use strict";',
    $propdoc: {
        value: "[string] The value of this directive as a plain string (it's not an AST_String!)",
        scope: "[AST_Scope/S] The scope that this directive affects"
    }
}, AST_Statement);
AST_SimpleStatement = DEFNODE("SimpleStatement", "body", {
    $documentation: "A statement consisting of an expression, i.e. a = 1 + 2",
    $propdoc: {
        body: "[AST_Node] an expression node (should not be instanceof AST_Statement)"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.body._walk(visitor);
        });
    }
}, AST_Statement);
function walk_body(node, visitor) {
    var ՐՏitr6, ՐՏidx6;
    var stat;
    if (node.body instanceof AST_Statement) {
        node.body._walk(visitor);
    } else if (node.body) {
        ՐՏitr6 = ՐՏ_Iterable(node.body);
        for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
            stat = ՐՏitr6[ՐՏidx6];
            stat._walk(visitor);
        }
    }
}
AST_Block = DEFNODE("Block", "body", {
    $documentation: "A body of statements (usually bracketed)",
    $propdoc: {
        body: "[AST_Statement*] an array of statements"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(this, function() {
            walk_body(node, visitor);
        });
    }
}, AST_Statement);
AST_BlockStatement = DEFNODE("BlockStatement", null, {
    $documentation: "A block statement"
}, AST_Block);
AST_EmptyStatement = DEFNODE("EmptyStatement", null, {
    $documentation: "The empty statement (empty block or simply a semicolon)",
    _walk: function(visitor) {
        return visitor._visit(this);
    }
}, AST_Statement);
AST_StatementWithBody = DEFNODE("StatementWithBody", "body", {
    $documentation: "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",
    $propdoc: {
        body: "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.body._walk(visitor);
        });
    }
}, AST_Statement);
AST_LabeledStatement = DEFNODE("LabeledStatement", "label", {
    $documentation: "Statement with a label",
    $propdoc: {
        label: "[AST_Label] a label definition"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.label._walk(visitor);
            node.body._walk(visitor);
        });
    }
}, AST_StatementWithBody);
AST_DWLoop = DEFNODE("DWLoop", "condition", {
    $documentation: "Base class for do/while statements",
    $propdoc: {
        condition: "[AST_Node] the loop condition.  Should not be instanceof AST_Statement"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.condition._walk(visitor);
            node.body._walk(visitor);
        });
    }
}, AST_StatementWithBody);
AST_Do = DEFNODE("Do", null, {
    $documentation: "A `do` statement"
}, AST_DWLoop);
AST_While = DEFNODE("While", null, {
    $documentation: "A `while` statement"
}, AST_DWLoop);
AST_ForIn = DEFNODE("ForIn", "init name object", {
    $documentation: "A `for ... in` statement",
    $propdoc: {
        init: "[AST_Node] the `for/in` initialization code",
        name: "[AST_SymbolRef?] the loop variable, only if `init` is AST_Var",
        object: "[AST_Node] the object that we're looping through"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.init._walk(visitor);
            node.object._walk(visitor);
            node.body._walk(visitor);
        });
    }
}, AST_StatementWithBody);
AST_ForJS = DEFNODE("ForJS", "condition", {
    $documentation: "A `for ... in` statement",
    $propdoc: {
        condition: "[AST_Verbatim] raw JavaScript conditional"
    }
}, AST_StatementWithBody);
AST_ListComprehension = DEFNODE("ListComprehension", "condition statement", {
    $documentation: "A list comprehension expression",
    $propdoc: {
        condition: "[AST_Node] the `if` condition",
        statement: "[AST_Node] statement to perform on each element before returning it"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.init._walk(visitor);
            if (node.condition) node.condition._walk(visitor);
            node.statement._walk(visitor);
        });
    }
}, AST_ForIn);
AST_DictComprehension = DEFNODE("DictComprehension", "value_statement", {
    $documentation: "A dict comprehension expression",
    $propdoc: {
        value_statement: "[AST_Node] statement to perform on each value before returning it"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.init._walk(visitor);
            node.statement._walk(visitor);
            node.value_statement._walk(visitor);
            if (node.condition) {
                node.condition._walk(visitor);
            }
        });
    }
}, AST_ListComprehension);
AST_With = DEFNODE("With", "expression", {
    $documentation: "A `with` statement",
    $propdoc: {
        expression: "[AST_Node] the `with` expression"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            node.body._walk(visitor);
        });
    }
}, AST_StatementWithBody);
AST_Scope = DEFNODE("Scope", "docstring directives variables localvars functions parent_scope enclosed cname", {
    $documentation: "Base class for all statements introducing a lexical scope",
    $propdoc: {
        docstring: "[string?] docstring for this scope, if any",
        directives: "[string*/S] an array of directives declared in this scope",
        variables: "[Object/S] a map of name -> SymbolDef for all variables/functions defined in this scope",
        localvars: "[SymbolDef*] list of variables local to this scope",
        functions: "[Object/S] like `variables`, but only lists function declarations",
        parent_scope: "[AST_Scope?/S] link to the parent scope",
        enclosed: "[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes"
    }
}, AST_Block);
AST_Toplevel = DEFNODE("Toplevel", "globals baselib imports strict shebang import_order module_id exports submodules classes filename srchash", {
    $documentation: "The toplevel scope",
    $propdoc: {
        globals: "[Object/S] a map of name -> SymbolDef for all undeclared names",
        baselib: "[Object/s] a collection of used parts of baselib",
        imports: "[Object/S] a map of module_id->AST_Toplevel for all imported modules",
        nonlocalvars: "[String*] a list of all non-local variable names (names that come from the global scope)",
        strict: "[boolean/S] true if strict directive is in scope",
        shebang: "[string] If #! line is present, it will be stored here",
        import_order: "[number] The global order in which this scope was imported",
        module_id: "[string] The id of this module",
        exports: "[SymbolDef*] list of names exported from this module",
        submodules: "[string*] list of names exported from this module",
        classes: "[Object/S] a map of class names to AST_Class for classes defined in this module",
        filename: "[string] The absolute path to the file from which this module was read",
        srchash: "[string] SHA1 hash of source code, used for caching"
    },
    wrap_enclose: function(arg_parameter_pairs) {
        var ՐՏitr7, ՐՏidx7;
        var self, args, parameters, pair, split, wrapped_tl;
        self = this;
        args = [];
        parameters = [];
        ՐՏitr7 = ՐՏ_Iterable(arg_parameter_pairs);
        for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
            pair = ՐՏitr7[ՐՏidx7];
            split = pair.split(":");
            args.push(split[0]);
            parameters.push(split[1]);
        }
        wrapped_tl = "(function(" + parameters.join(",") + "){ '$ORIG'; })(" + args.join(",") + ")";
        wrapped_tl = parse(wrapped_tl);
        wrapped_tl = wrapped_tl.transform(new TreeTransformer(function before(node) {
            if (node instanceof AST_Directive && node.value === "$ORIG") {
                return MAP.splice(self.body);
            }
        }));
        return wrapped_tl;
    },
    wrap_commonjs: function(name, export_all) {
        var self, to_export, wrapped_tl;
        self = this;
        to_export = [];
        if (export_all) {
            self.figure_out_scope();
            self.walk(new TreeWalker(function(node) {
                if (node instanceof AST_SymbolDeclaration && node.definition().global) {
                    if (!find_if(function(n) {
                        return n.name === node.name;
                    }, to_export)) {
                        to_export.push(node);
                    }
                }
            }));
        }
        wrapped_tl = "(function(exports, global){ global['" + name + "'] = exports; '$ORIG'; '$EXPORTS'; }({}, (function(){return this}())))";
        wrapped_tl = parse(wrapped_tl);
        wrapped_tl = wrapped_tl.transform(new TreeTransformer(function before(node) {
            var ՐՏitr8, ՐՏidx8;
            var node, tmp_, body, sym;
            if (node instanceof AST_SimpleStatement) {
                node = node.body;
                if (node instanceof AST_String) {
                    tmp_ = node.getValue();
                    if (tmp_ === "$ORIG") {
                        return MAP.splice(self.body);
                    } else if (tmp_ === "$EXPORTS") {
                        body = [];
                        ՐՏitr8 = ՐՏ_Iterable(to_export);
                        for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                            sym = ՐՏitr8[ՐՏidx8];
                            body.push(new AST_SimpleStatement({
                                body: new AST_Assign({
                                    left: new AST_Sub({
                                        expression: new AST_SymbolRef({
                                            name: "exports"
                                        }),
                                        property: new AST_String({
                                            value: sym.name
                                        })
                                    }),
                                    operator: "=",
                                    right: new AST_SymbolRef(sym)
                                })
                            }));
                        }
                        return MAP.splice(body);
                    }
                }
            }
        }));
        return wrapped_tl;
    }
}, AST_Scope);
AST_Splat = DEFNODE("Splat", "module key body", {
    $documentation: "Container for a naive import into the same scope, everything contained within the splat will be imported",
    $propdoc: {
        module: "[AST_SymbolVar] name of the module we're splatting",
        key: "[string] The key by which this module is stored in the global modules mapping",
        body: "[AST_TopLevel] parsed contents of the imported file"
    }
}, AST_Statement);
AST_Import = DEFNODE("Import", "module key alias argnames body", {
    $documentation: "Container for a single import",
    $propdoc: {
        module: "[AST_SymbolVar] name of the module we're importing",
        key: "[string] The key by which this module is stored in the global modules mapping",
        alias: "[AST_SymbolAlias] The name this module is imported as, can be None. For import x as y statements.",
        argnames: "[AST_ImportedVar*] names of objects to be imported",
        body: "[AST_TopLevel] parsed contents of the imported file"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr9, ՐՏidx9;
            var arg;
            ՐՏitr9 = ՐՏ_Iterable(node.argnames);
            for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
                arg = ՐՏitr9[ՐՏidx9];
                arg._walk(visitor);
            }
        });
    }
}, AST_Statement);
AST_Imports = DEFNODE("Imports", "imports", {
    $documentation: "Container for a single import",
    $propdoc: {
        "imports": "[AST_Import+] array of imports"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr10, ՐՏidx10;
            var imp;
            ՐՏitr10 = ՐՏ_Iterable(node.imports);
            for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
                imp = ՐՏitr10[ՐՏidx10];
                imp._walk(visitor);
            }
        });
    }
}, AST_Statement);
AST_Decorator = DEFNODE("Decorator", "expression", {
    $documentation: "Class for function decorators",
    $propdoc: {
        expression: "[AST_Node] decorator expression"
    },
    _walk: function(visitor) {
        if (this.expression) {
            this.expression.walk(visitor);
        }
    }
});
AST_Annotation = DEFNODE("Annotation", "expression", {
    $documentation: "Class for argument/return annotations",
    $propdoc: {
        expression: "[AST_Node] decorator expression"
    },
    _walk: function(visitor) {
        if (this.expression) {
            this.expression.walk(visitor);
        }
    },
    resolveType: function(heap) {
        function parse(obj) {
            var ՐՏ_3;
            if (obj instanceof AST_Array) {
                if (obj.elements.length === 1) {
                    return "[" + parse(obj.elements[0]) + "]";
                }
                return "[?]";
            }
            if (obj instanceof AST_Object) {
                if (obj.properties.length === 1) {
                    return "{String:" + parse(obj.properties[0].value) + "}";
                }
                return "{String:?}";
            }
            if (obj instanceof AST_SymbolRef) {
                return obj.name === "Array" ? "[?]" : ՐՏ_in(obj.name, [ "Object", "Dictionary" ]) ? "{String:?}" : obj.name;
            }
            if (obj instanceof AST_Call) {
                if (obj.expression instanceof AST_SymbolRef && obj.expression.name === "Array" && obj.args.length === 1) {
                    return "[" + parse(obj.args[0]) + "]";
                }
                if (obj.expression instanceof AST_SymbolRef && ՐՏ_in(obj.expression.name, [ "Object", "Dictionary" ])) {
                    if (1 <= (ՐՏ_3 = obj.args.length) && ՐՏ_3 <= 2) {
                        return "{String:" + parse(obj.args[obj.args.length-1]) + "}";
                    }
                    return "{String:?}";
                }
            }
            return "?";
        }
        return parse(this.expression);
    }
});
AST_Lambda = DEFNODE("Lambda", "name argnames kwargs uses_arguments decorators generator return_annotation", {
    $documentation: "Base class for functions",
    $propdoc: {
        name: "[AST_SymbolDeclaration?] the name of this function/class/method",
        argnames: "[AST_SymbolFunarg*] array of arguments",
        kwargs: "[AST_SymbolFunarg?] kwargs symbol, if any",
        uses_arguments: "[boolean/S] tells whether this function accesses the arguments array",
        decorators: "[AST_Decorator*] function decorators, if any",
        generator: "[boolean] true if this is a generator function (false by default)",
        return_annotation: "[AST_Annotation?] the return type annotation provided (if any)"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr11, ՐՏidx11, ՐՏitr12, ՐՏidx12;
            var d, arg;
            if (node.decorators) {
                ՐՏitr11 = ՐՏ_Iterable(node.decorators);
                for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
                    d = ՐՏitr11[ՐՏidx11];
                    d.walk(visitor);
                }
            }
            if (node.name) {
                node.name._walk(visitor);
            }
            ՐՏitr12 = ՐՏ_Iterable(node.argnames);
            for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
                arg = ՐՏitr12[ՐՏidx12];
                arg._walk(visitor);
            }
            if (node.argnames.starargs) {
                node.argnames.starargs._walk(visitor);
            }
            if (node.kwargs) {
                node.kwargs._walk(visitor);
            }
            walk_body(node, visitor);
        });
    }
}, AST_Scope);
AST_Accessor = DEFNODE("Accessor", null, {
    $documentation: "A setter/getter function"
}, AST_Lambda);
AST_Function = DEFNODE("Function", null, {
    $documentation: "A function expression",
    resolveType: function(heap) {
        var ՐՏitr13, ՐՏidx13;
        var annotated, args, arg, computedType, result, signature;
        if (this.argnames.starargs) {
            return "Function";
        }
        annotated = true;
        args = [];
        ՐՏitr13 = ՐՏ_Iterable(this.argnames);
        for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
            arg = ՐՏitr13[ՐՏidx13];
            if (arg.annotation) {
                computedType = arg.annotation.resolveType(heap);
                if (computedType) {
                    args.push(computedType);
                } else {
                    annotated = false;
                    break;
                }
            } else {
                annotated = false;
                break;
            }
        }
        if (this.return_annotation) {
            result = this.return_annotation.resolveType(heap);
            if (!result) {
                annotated = false;
            }
        }
        signature = "Function";
        if (annotated) {
            signature += "(" + args.join(",") + ")";
            if (result) {
                signature += " -> " + result;
            }
        }
        return signature;
    }
}, AST_Lambda);
AST_Class = DEFNODE("Class", "init name parent static external bound decorators module_id statements", {
    $documentation: "A class declaration",
    $propdoc: {
        name: "[AST_SymbolDeclaration?] the name of this class",
        init: "[AST_Function] constructor for the class",
        parent: "[AST_Class?] parent class this class inherits from",
        "static": "[string*] list of static methods",
        external: "[boolean] true if class is declared elsewhere, but will be within current scope at runtime",
        bound: "[string*] hash of methods that need to be bound to behave correctly (function pointers)",
        decorators: "[AST_Decorator*] function decorators, if any",
        module_id: "[string] The id of the module this class is defined in",
        statements: "[AST_Node*] list of statements in the class scope (excluding method definitions)"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.name._walk(visitor);
            walk_body(this, visitor);
            if (node.parent) {
                node.parent._walk(visitor);
            }
        });
    },
    resolveType: function(heap) {
        return this.name.name;
    }
}, AST_Scope);
AST_Module = DEFNODE("Module", "name external decorators", {
    $documentation: "A module definition, meant to abstract a group of related classes and/or functions",
    $propdoc: {
        name: "[AST_SymbolDeclaration?] the name of this class",
        external: "[boolean] true if module is declared elsewhere, but will be within current scope at runtime",
        decorators: "[AST_Decorator*] module decorators, if any"
    }
}, AST_Scope);
AST_Method = DEFNODE("Method", "static", {
    $documentation: "A class method definition",
    $propdoc: {
        "static": "[boolean] true if method is static"
    }
}, AST_Lambda);
AST_Jump = DEFNODE("Jump", null, {
    $documentation: "Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"
}, AST_Statement);
AST_Exit = DEFNODE("Exit", "value", {
    $documentation: "Base class for “exits” (`return` and `throw`)",
    $propdoc: {
        value: "[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            if (node.value) {
                node.value._walk(visitor);
            }
        });
    },
    resolveType: function(heap) {
        return this.value.resolveType(heap);
    }
}, AST_Jump);
AST_Return = DEFNODE("Return", null, {
    $documentation: "A `return` statement"
}, AST_Exit);
AST_Yield = DEFNODE("Yield", null, {
    $documentation: "A `yield` statement"
}, AST_Exit);
AST_Throw = DEFNODE("Throw", null, {
    $documentation: "A `throw` statement"
}, AST_Exit);
AST_LoopControl = DEFNODE("LoopControl", "label", {
    $documentation: "Base class for loop control statements (`break` and `continue`)",
    $propdoc: {
        label: "[AST_LabelRef?] the label, or null if none"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            if (node.label) {
                node.label._walk(visitor);
            }
        });
    }
}, AST_Jump);
AST_Break = DEFNODE("Break", null, {
    $documentation: "A `break` statement"
}, AST_LoopControl);
AST_Continue = DEFNODE("Continue", null, {
    $documentation: "A `continue` statement"
}, AST_LoopControl);
AST_If = DEFNODE("If", "condition alternative", {
    $documentation: "A `if` statement",
    $propdoc: {
        condition: "[AST_Node] the `if` condition",
        alternative: "[AST_Statement?] the `else` part, or null if not present"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.condition._walk(visitor);
            node.body._walk(visitor);
            if (node.alternative) {
                node.alternative._walk(visitor);
            }
        });
    }
}, AST_StatementWithBody);
AST_Switch = DEFNODE("Switch", "expression", {
    $documentation: "A `switch` statement",
    $propdoc: {
        expression: "[AST_Node] the `switch` “discriminant”"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            walk_body(node, visitor);
        });
    }
}, AST_Block);
AST_SwitchBranch = DEFNODE("SwitchBranch", null, {
    $documentation: "Base class for `switch` branches"
}, AST_Block);
AST_Default = DEFNODE("Default", null, {
    $documentation: "A `default` switch branch"
}, AST_SwitchBranch);
AST_Case = DEFNODE("Case", "expression", {
    $documentation: "A `case` switch branch",
    $propdoc: {
        expression: "[AST_Node] the `case` expression"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            walk_body(node, visitor);
        });
    }
}, AST_SwitchBranch);
AST_Try = DEFNODE("Try", "bcatch bfinally", {
    $documentation: "A `try` statement",
    $propdoc: {
        bcatch: "[AST_Catch?] the catch block, or null if not present",
        bfinally: "[AST_Finally?] the finally block, or null if not present"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            walk_body(node, visitor);
            if (node.bcatch) {
                node.bcatch._walk(visitor);
            }
            if (node.bfinally) {
                node.bfinally._walk(visitor);
            }
        });
    }
}, AST_Block);
AST_Catch = DEFNODE("Catch", null, {
    $documentation: "A `catch` node; only makes sense as part of a `try` statement",
    $propdoc: {}
}, AST_Block);
AST_Except = DEFNODE("Except", "argname errors", {
    $documentation: "An `except` node for RapydScript, which resides inside the catch block",
    $propdoc: {
        argname: "[AST_SymbolCatch] symbol for the exception",
        errors: "[AST_SymbolVar*] error classes to catch in this block"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr14, ՐՏidx14;
            var e;
            if (node.argname) {
                node.argname.walk(visitor);
            }
            if (node.errors) {
                ՐՏitr14 = ՐՏ_Iterable(node.errors);
                for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
                    e = ՐՏitr14[ՐՏidx14];
                    e.walk(visitor);
                }
            }
            walk_body(node, visitor);
        });
    }
}, AST_Block);
AST_Finally = DEFNODE("Finally", null, {
    $documentation: "A `finally` node; only makes sense as part of a `try` statement"
}, AST_Block);
AST_Definitions = DEFNODE("Definitions", "definitions", {
    $documentation: "Base class for `var` or `const` nodes (variable declarations/initializations)",
    $propdoc: {
        definitions: "[AST_VarDef*] array of variable definitions"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr15, ՐՏidx15;
            var def_;
            ՐՏitr15 = ՐՏ_Iterable(node.definitions);
            for (ՐՏidx15 = 0; ՐՏidx15 < ՐՏitr15.length; ՐՏidx15++) {
                def_ = ՐՏitr15[ՐՏidx15];
                def_._walk(visitor);
            }
        });
    }
}, AST_Statement);
AST_Var = DEFNODE("Var", null, {
    $documentation: "A `var` statement"
}, AST_Definitions);
AST_Const = DEFNODE("Const", null, {
    $documentation: "A `const` statement"
}, AST_Definitions);
AST_VarDef = DEFNODE("VarDef", "name value", {
    $documentation: "A variable declaration; only appears in a AST_Definitions node",
    $propdoc: {
        name: "[AST_SymbolVar|AST_SymbolConst] name of the variable",
        value: "[AST_Node?] initializer, or null if there's no initializer"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.name._walk(visitor);
            if (node.value) {
                node.value._walk(visitor);
            }
        });
    }
});
AST_BaseCall = DEFNODE("BaseCall", "args", {
    $documentation: "A base class for function calls",
    $propdoc: {
        args: "[AST_Node*] array of arguments"
    }
});
AST_Call = DEFNODE("Call", "expression", {
    $documentation: "A function call expression",
    $propdoc: {
        expression: "[AST_Node] expression to invoke as function"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr16, ՐՏidx16, ՐՏitr17, ՐՏidx17, ՐՏitr18, ՐՏidx18;
            var arg;
            node.expression._walk(visitor);
            ՐՏitr16 = ՐՏ_Iterable(node.args);
            for (ՐՏidx16 = 0; ՐՏidx16 < ՐՏitr16.length; ՐՏidx16++) {
                arg = ՐՏitr16[ՐՏidx16];
                arg._walk(visitor);
            }
            if (node.args.kwargs) {
                ՐՏitr17 = ՐՏ_Iterable(node.args.kwargs);
                for (ՐՏidx17 = 0; ՐՏidx17 < ՐՏitr17.length; ՐՏidx17++) {
                    arg = ՐՏitr17[ՐՏidx17];
                    arg[0]._walk(visitor);
                    arg[1]._walk(visitor);
                }
            }
            if (node.args.kwarg_items) {
                ՐՏitr18 = ՐՏ_Iterable(node.args.kwarg_items);
                for (ՐՏidx18 = 0; ՐՏidx18 < ՐՏitr18.length; ՐՏidx18++) {
                    arg = ՐՏitr18[ՐՏidx18];
                    arg._walk(visitor);
                }
            }
        });
    },
    resolveType: function(heap) {
        var ՐՏitr19, ՐՏidx19;
        var scope, parse, result;
        if (this.expression instanceof AST_SymbolRef) {
            ՐՏitr19 = ՐՏ_Iterable(reversed(heap));
            for (ՐՏidx19 = 0; ՐՏidx19 < ՐՏitr19.length; ՐՏidx19++) {
                scope = ՐՏitr19[ՐՏidx19];
                if (ՐՏ_in(this.expression.name, scope.vars) && ՐՏ_in("->", scope.vars[this.expression.name][scope.vars[this.expression.name].length-1])) {
                    return scope.vars[this.expression.name][scope.vars[this.expression.name].length-1].split("->")[1].trim();
                } else if (ՐՏ_in(this.expression.name, scope.functions) && ՐՏ_in("->", scope.functions[this.expression.name])) {
                    return scope.functions[this.expression.name].split("->")[1].trim();
                } else if (scope.type === "function" && this.expression.name === scope.name && scope.return) {
                    parse = function(variable) {
                        var ՐՏ_4;
                        var wrap, wrapper, element, result;
                        wrap = {
                            "array": function(value) {
                                return "[" + value + "]";
                            },
                            "dict": function(value) {
                                return "{String:" + value + "}";
                            },
                            "base": function(value) {
                                return value;
                            }
                        };
                        wrapper = "base";
                        if (variable instanceof AST_Array) {
                            if (variable.elements.length !== 1) {
                                return;
                            }
                            wrapper = "array";
                            element = variable.elements[0];
                        } else if (variable instanceof AST_Call && variable.expression instanceof AST_SymbolRef && variable.expression.name === "Array") {
                            if (variable.args.length !== 1) {
                                return;
                            }
                            wrapper = "array";
                            element = variable.args[0];
                        } else if (variable instanceof AST_Object) {
                            if (variable.properties.length !== 1) {
                                return;
                            }
                            wrapper = "dict";
                            element = variable.properties[0].value;
                        } else if (variable instanceof AST_Call && variable.expression instanceof AST_SymbolRef && ՐՏ_in(variable.expression.name, [ "Object", "Dictionary" ])) {
                            if (1 <= (ՐՏ_4 = variable.args.length) && ՐՏ_4 <= 2) {
                                element = variable.args[variable.args.length-1];
                                wrapper = "dict";
                            } else {
                                return;
                            }
                        } else {
                            element = variable;
                        }
                        if (element instanceof AST_SymbolRef && ՐՏ_in(element.name, NATIVE_CLASSES)) {
                            return wrap[wrapper](element.name);
                        } else if (element instanceof AST_Array || element instanceof AST_Object || element instanceof AST_Call) {
                            result = parse(element);
                            if (result) {
                                return wrap[wrapper](result);
                            }
                        }
                    };
                    result = parse(scope.return_annotation);
                    if (result) {
                        return result;
                    }
                }
            }
        }
        return "?";
    }
}, AST_BaseCall);
AST_ClassCall = DEFNODE("ClassCall", "class super method static", {
    $documentation: "A function call expression",
    $propdoc: {
        "class": "[string] name of the class method belongs to",
        "super": "[boolean] this call can be replaced with a super() call",
        "method": "[string] class method being called",
        "static": "[boolean] defines whether the method is static"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr20, ՐՏidx20, ՐՏitr21, ՐՏidx21, ՐՏitr22, ՐՏidx22;
            var arg;
            if (node.expression) {
                node.expression._walk(visitor);
            }
            ՐՏitr20 = ՐՏ_Iterable(node.args);
            for (ՐՏidx20 = 0; ՐՏidx20 < ՐՏitr20.length; ՐՏidx20++) {
                arg = ՐՏitr20[ՐՏidx20];
                arg._walk(visitor);
            }
            ՐՏitr21 = ՐՏ_Iterable(node.args.kwargs);
            for (ՐՏidx21 = 0; ՐՏidx21 < ՐՏitr21.length; ՐՏidx21++) {
                arg = ՐՏitr21[ՐՏidx21];
                arg[0]._walk(visitor);
                arg[1]._walk(visitor);
            }
            ՐՏitr22 = ՐՏ_Iterable(node.args.kwarg_items);
            for (ՐՏidx22 = 0; ՐՏidx22 < ՐՏitr22.length; ՐՏidx22++) {
                arg = ՐՏitr22[ՐՏidx22];
                arg._walk(visitor);
            }
        });
    }
}, AST_BaseCall);
AST_New = DEFNODE("New", null, {
    $documentation: "An object instantiation. Derives from a function call since it has exactly the same properties"
}, AST_Call);
AST_Seq = DEFNODE("Seq", "car cdr", {
    $documentation: "A sequence expression (two comma-separated expressions)",
    $propdoc: {
        car: "[AST_Node] first element in sequence",
        cdr: "[AST_Node] second element in sequence"
    },
    $cons: function(x, y) {
        var seq;
        seq = new AST_Seq(x);
        seq.car = x;
        seq.cdr = y;
        return seq;
    },
    $from_array: function(array) {
        var ՐՏitr23, ՐՏidx23;
        var list, i, p;
        if (array.length === 0) {
            return null;
        }
        if (array.length === 1) {
            return array[0].clone();
        }
        list = null;
        ՐՏitr23 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
        for (ՐՏidx23 = 0; ՐՏidx23 < ՐՏitr23.length; ՐՏidx23++) {
            i = ՐՏitr23[ՐՏidx23];
            list = AST_Seq.cons(array[i], list);
        }
        p = list;
        while (p) {
            if (p.cdr && !p.cdr.cdr) {
                p.cdr = p.cdr.car;
                break;
            }
            p = p.cdr;
        }
        return list;
    },
    to_array: function() {
        var p, a;
        p = this;
        a = [];
        while (p) {
            a.push(p.car);
            if (p.cdr && !(p.cdr instanceof AST_Seq)) {
                a.push(p.cdr);
                break;
            }
            p = p.cdr;
        }
        return a;
    },
    add: function(node) {
        var p, cell;
        p = this;
        while (p) {
            if (!(p.cdr instanceof AST_Seq)) {
                cell = AST_Seq.cons(p.cdr, node);
                return p.cdr = cell;
            }
            p = p.cdr;
        }
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.car._walk(visitor);
            if (node.cdr) {
                node.cdr._walk(visitor);
            }
        });
    }
});
AST_PropAccess = DEFNODE("PropAccess", "expression property", {
    $documentation: 'Base class for property access expressions, i.e. `a.foo`, `a["foo"]` or a[1:5]',
    $propdoc: {
        expression: "[AST_Node] the “container” expression",
        property: "[AST_Node|string] the property to access. For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"
    }
});
AST_Dot = DEFNODE("Dot", null, {
    $documentation: "A dotted property access expression",
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
        });
    },
    resolveType: function(heap) {
        var containerType;
        containerType = this.expression.resolveType(heap);
        if (containerType && containerType[0] === "{") {
            return /\{\w+:(.*)\}/.exec(containerType)[1];
        }
        return "?";
    }
}, AST_PropAccess);
AST_Sub = DEFNODE("Sub", null, {
    $documentation: 'Index-style property access, i.e. `a["foo"]`',
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            node.property._walk(visitor);
        });
    },
    resolveType: function(heap) {
        var containerType;
        containerType = this.expression.resolveType(heap);
        if (containerType) {
            if (containerType[0] === "[" && this.property instanceof AST_Number) {
                return /\[(.*)\]/.exec(containerType)[1];
            }
            if (containerType[0] === "{") {
                return /\{\w+:(.*)\}/.exec(containerType)[1];
            }
        }
        return "?";
    }
}, AST_PropAccess);
AST_Slice = DEFNODE("Slice", "property2 assignment", {
    $documentation: "Index-style property access, i.e. `a[3:5]`",
    $propdoc: {
        property2: "[AST_Node] the 2nd property to access - typically ending index for the array.",
        assignment: "[AST_Node] The data being spliced in."
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            node.property._walk(visitor);
            node.property2._walk(visitor);
        });
    },
    resolveType: function(heap) {
        return this.expression.resolveType(heap);
    }
}, AST_PropAccess);
AST_Unary = DEFNODE("Unary", "operator expression", {
    $documentation: "Base class for unary expressions",
    $propdoc: {
        operator: "[string] the operator",
        expression: "[AST_Node] expression that this unary operator applies to"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
        });
    },
    resolveType: function(heap) {
        if (this.operator === "!") {
            return "Boolean";
        }
        if (ՐՏ_in(this.operator, [ "-", "+" ]) && this.expression.resolveType(heap) === "Number") {
            return "Number";
        }
        return "?";
    }
});
AST_UnaryPrefix = DEFNODE("UnaryPrefix", null, {
    $documentation: "Unary prefix expression, i.e. `typeof i` or `++i`"
}, AST_Unary);
AST_UnaryPostfix = DEFNODE("UnaryPostfix", null, {
    $documentation: "Unary postfix expression, i.e. `i++`"
}, AST_Unary);
AST_Binary = DEFNODE("Binary", "left operator right", {
    $documentation: "Binary expression, i.e. `a + b`",
    $propdoc: {
        left: "[AST_Node] left-hand side expression",
        operator: "[string] the operator",
        right: "[AST_Node] right-hand side expression"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.left._walk(visitor);
            node.right._walk(visitor);
        });
    },
    resolveType: function(heap) {
        var left, right;
        if (!(this.left && this.right)) {
            return "?";
        }
        left = this.left.resolveType(heap);
        right = this.left.resolveType(heap);
        if (left === "Number" && right === "Number") {
            return "Number";
        }
        if (left === "Boolean" && right === "Boolean" || ՐՏ_in(this.operator, [ "===", "!==", ">", ">=", "<", "<=" ])) {
            return "Boolean";
        }
        if (left === "String" && this.operator === "+") {
            return "String";
        }
        return "?";
    }
});
AST_Range = DEFNODE("Range", null, {
    $documentation: "Range node (to/til)",
    resolveType: function(heap) {
        return "[Number]";
    }
}, AST_Binary);
AST_DeepEquality = DEFNODE("DeepEquality", null, {
    $documentation: "Pythonic deep equality operator",
    resolveType: function(heap) {
        return "Boolean";
    }
}, AST_Binary);
AST_Conditional = DEFNODE("Conditional", "condition consequent alternative", {
    $documentation: "Conditional expression using the ternary operator, i.e. `a ? b : c`",
    $propdoc: {
        condition: "[AST_Node]",
        consequent: "[AST_Node]",
        alternative: "[AST_Node]"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.condition._walk(visitor);
            node.consequent._walk(visitor);
            node.alternative._walk(visitor);
        });
    },
    resolveType: function(heap) {
        var computedType;
        computedType = this.consequent.resolveType(heap);
        return computedType === this.alternative.resolveType(heap) ? computedType : "?";
    }
});
AST_Assign = DEFNODE("Assign", null, {
    $documentation: "An assignment expression — `a = b + 5`",
    resolveType: function(heap) {
        if (this.operator === "=") {
            return this.right.resolveType(heap);
        }
        return "?";
    }
}, AST_Binary);
AST_Array = DEFNODE("Array", "elements", {
    $documentation: "An array literal",
    $propdoc: {
        elements: "[AST_Node*] array of elements"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr24, ՐՏidx24;
            var el;
            ՐՏitr24 = ՐՏ_Iterable(node.elements);
            for (ՐՏidx24 = 0; ՐՏidx24 < ՐՏitr24.length; ՐՏidx24++) {
                el = ՐՏitr24[ՐՏidx24];
                el._walk(visitor);
            }
        });
    },
    resolveType: function(heap) {
        var ՐՏitr25, ՐՏidx25;
        var expected, element, current;
        if (!this.elements.length) {
            return "[?]";
        }
        expected = this.elements[0].resolveType(heap);
        ՐՏitr25 = ՐՏ_Iterable(this.elements.slice(1));
        for (ՐՏidx25 = 0; ՐՏidx25 < ՐՏitr25.length; ՐՏidx25++) {
            element = ՐՏitr25[ՐՏidx25];
            current = element.resolveType(heap);
            if (current !== expected) {
                if (expected.indexOf("Function") === 0 && current.indexOf("Function") === 0) {
                    return "[Function]";
                }
                return "[?]";
            }
        }
        return "[" + expected + "]";
    }
});
AST_TupleUnpack = DEFNODE("TupleUnpack", "elements right", {
    $documentation: "An object used to represent tuple unpacking",
    $propdoc: {
        elements: "[AST_Node*] array of elements being assigned to",
        right: "[AST_Node] right-hand side expression"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr26, ՐՏidx26;
            var el;
            ՐՏitr26 = ՐՏ_Iterable(node.elements);
            for (ՐՏidx26 = 0; ՐՏidx26 < ՐՏitr26.length; ՐՏidx26++) {
                el = ՐՏitr26[ՐՏidx26];
                el._walk(visitor);
            }
            node.right._walk(visitor);
        });
    }
});
AST_Object = DEFNODE("Object", "properties", {
    $documentation: "An object literal",
    $propdoc: {
        properties: "[AST_ObjectProperty*] array of properties"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var ՐՏitr27, ՐՏidx27;
            var prop;
            ՐՏitr27 = ՐՏ_Iterable(node.properties);
            for (ՐՏidx27 = 0; ՐՏidx27 < ՐՏitr27.length; ՐՏidx27++) {
                prop = ՐՏitr27[ՐՏidx27];
                prop._walk(visitor);
            }
        });
    },
    resolveType: function(heap) {
        var ՐՏitr28, ՐՏidx28;
        var start, spread, expected, element, current, result;
        if (!this.properties.length) {
            return "{String:?}";
        }
        start = 0;
        spread = null;
        while (this.properties[start] instanceof AST_UnaryPrefix) {
            spread = this.properties[start].expression.resolveType(heap);
            if (ՐՏ_in("?", spread)) {
                return "{String:?}";
            }
            ++start;
        }
        expected = this.properties[start].value.resolveType(heap);
        ՐՏitr28 = ՐՏ_Iterable(this.properties.slice(start + 1));
        for (ՐՏidx28 = 0; ՐՏidx28 < ՐՏitr28.length; ՐՏidx28++) {
            element = ՐՏitr28[ՐՏidx28];
            if (element instanceof AST_UnaryPrefix) {
                if (spread) {
                    if (spread !== element.expression.resolveType(heap)) {
                        return "{String:?}";
                    }
                } else {
                    spread = element.expression.resolveType(heap);
                }
            } else if (element instanceof AST_Accessor) {
            } else {
                current = element.value.resolveType(heap);
                if (current !== expected) {
                    if (expected.indexOf("Function") === 0 && current.indexOf("Function") === 0) {
                        return "{String:Function}";
                    }
                    return "{String:?}";
                }
            }
        }
        result = "{String:" + expected + "}";
        if (spread) {
            if (spread === result) {
                return result;
            } else {
                return "{String:?}";
            }
        }
        return result;
    }
});
AST_ObjectProperty = DEFNODE("ObjectProperty", "key value", {
    $documentation: "Base class for literal object properties",
    $propdoc: {
        key: "[AST_Node] the property name or expression for computed key ",
        value: "[AST_Node] property value. For setters and getters this is an AST_Function."
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.key._walk(visitor);
            node.value._walk(visitor);
        });
    }
});
AST_ObjectKeyVal = DEFNODE("ObjectKeyVal", null, {
    $documentation: "A key: value object property"
}, AST_ObjectProperty);
AST_ObjectSetter = DEFNODE("ObjectSetter", null, {
    $documentation: "An object setter property"
}, AST_Accessor);
AST_ObjectGetter = DEFNODE("ObjectGetter", null, {
    $documentation: "An object getter property"
}, AST_Accessor);
AST_Symbol = DEFNODE("Symbol", "scope name thedef", {
    $propdoc: {
        name: "[string] name of this symbol",
        scope: "[AST_Scope/S] the current scope (not necessarily the definition scope)",
        thedef: "[SymbolDef/S] the definition of this symbol"
    },
    $documentation: "Base class for all symbols"
});
AST_SymbolAlias = DEFNODE("SymbolAlias", null, {
    $documentation: "An alias used in an import statement"
}, AST_Symbol);
AST_SymbolAccessor = DEFNODE("SymbolAccessor", null, {
    $documentation: "The name of a property accessor (setter/getter function)"
}, AST_Symbol);
AST_SymbolDeclaration = DEFNODE("SymbolDeclaration", "init", {
    $documentation: "A declaration symbol (symbol in var/const, function name or argument, symbol in catch)",
    $propdoc: {
        init: "[AST_Node*/S] array of initializers for this declaration."
    }
}, AST_Symbol);
AST_SymbolVar = DEFNODE("SymbolVar", null, {
    $documentation: "Symbol defining a variable"
}, AST_SymbolDeclaration);
AST_SymbolNonlocal = DEFNODE("SymbolNonlocal", null, {
    $documentation: "A nonlocal declaration"
}, AST_SymbolDeclaration);
AST_ImportedVar = DEFNODE("ImportedVar", "alias", {
    $documentation: "Symbol defining an imported symbol",
    $propdoc: {
        alias: "AST_SymbolAlias the alias for this imported symbol"
    }
}, AST_SymbolVar);
AST_SymbolConst = DEFNODE("SymbolConst", null, {
    $documentation: "A constant declaration"
}, AST_SymbolDeclaration);
AST_SymbolFunarg = DEFNODE("SymbolFunarg", "annotation", {
    $documentation: "Symbol naming a function argument",
    $propdoc: {
        annotation: "[AST_Annotation?] annotation provided for this argument, if any"
    }
}, AST_SymbolVar);
AST_SymbolDefun = DEFNODE("SymbolDefun", null, {
    $documentation: "Symbol defining a function"
}, AST_SymbolDeclaration);
AST_SymbolLambda = DEFNODE("SymbolLambda", null, {
    $documentation: "Symbol naming a function expression"
}, AST_SymbolDeclaration);
AST_SymbolCatch = DEFNODE("SymbolCatch", null, {
    $documentation: "Symbol naming the exception in catch"
}, AST_SymbolDeclaration);
AST_Label = DEFNODE("Label", "references", {
    $documentation: "Symbol naming a label (declaration)",
    $propdoc: {
        references: "[AST_LabelRef*] a list of nodes referring to this label"
    }
}, AST_Symbol);
AST_SymbolRef = DEFNODE("SymbolRef", "parens", {
    $documentation: "Reference to some symbol (not definition/declaration)",
    $propdoc: {
        parens: "[boolean/S] if true, this variable is wrapped in parentheses"
    },
    resolveType: function(heap) {
        var ՐՏitr29, ՐՏidx29;
        var scope;
        ՐՏitr29 = ՐՏ_Iterable(reversed(heap));
        for (ՐՏidx29 = 0; ՐՏidx29 < ՐՏitr29.length; ՐՏidx29++) {
            scope = ՐՏitr29[ՐՏidx29];
            if (ՐՏ_in(this.name, scope.vars)) {
                return scope.vars[this.name][scope.vars[this.name].length-1];
            }
            if (scope.args && ՐՏ_in(this.name, scope.args)) {
                return scope.args[this.name];
            }
        }
        return "?";
    }
}, AST_Symbol);
AST_SymbolClassRef = DEFNODE("SymbolClassRef", "class", {
    $documentation: "Reference to class symbol",
    $propdoc: {
        class: "[AST_SymbolDeclaration?] the name of this class"
    }
}, AST_Symbol);
AST_LabelRef = DEFNODE("LabelRef", null, {
    $documentation: "Reference to a label symbol"
}, AST_Symbol);
AST_This = DEFNODE("This", null, {
    $documentation: "The `this` symbol"
}, AST_Symbol);
AST_Constant = DEFNODE("Constant", null, {
    $documentation: "Base class for all constants",
    getValue: function() {
        return this.value;
    }
});
AST_String = DEFNODE("String", "value modifier", {
    $documentation: "A string literal",
    $propdoc: {
        value: "[string] the contents of this string",
        modifier: "[string] string type modifier"
    },
    resolveType: function() {
        return "String";
    }
}, AST_Constant);
AST_Verbatim = DEFNODE("Verbatim", "value", {
    $documentation: "Raw JavaScript code",
    $propdoc: {
        value: "[string] A string of raw JS code"
    }
}, AST_Constant);
AST_Number = DEFNODE("Number", "value", {
    $documentation: "A number literal",
    $propdoc: {
        value: "[number] the numeric value"
    },
    resolveType: function() {
        return "Number";
    }
}, AST_Constant);
AST_Identifier = DEFNODE("Identifier", "value", {
    $documentation: "An identifier literal, used for unquoted property key",
    $propdoc: {
        value: "[string] the name of this key"
    },
    resolveType: function() {
        return "String";
    }
}, AST_Constant);
AST_RegExp = DEFNODE("RegExp", "value", {
    $documentation: "A regexp literal",
    $propdoc: {
        value: "[RegExp] the actual regexp"
    },
    resolveType: function() {
        return "RegExp";
    }
}, AST_Constant);
AST_Atom = DEFNODE("Atom", null, {
    $documentation: "Base class for atoms"
}, AST_Constant);
AST_Null = DEFNODE("Null", null, {
    $documentation: "The `null` atom",
    value: null,
    resolveType: function() {
        return null;
    }
}, AST_Atom);
AST_NaN = DEFNODE("NaN", null, {
    $documentation: "The impossible value",
    value: 0 / 0,
    resolveType: function() {
        return null;
    }
}, AST_Atom);
AST_Undefined = DEFNODE("Undefined", null, {
    $documentation: "The `undefined` value",
    value: void 0,
    resolveType: function() {
        return null;
    }
}, AST_Atom);
AST_Hole = DEFNODE("Hole", null, {
    $documentation: "A hole in an array",
    value: void 0,
    resolveType: function() {
        return null;
    }
}, AST_Atom);
AST_Infinity = DEFNODE("Infinity", null, {
    $documentation: "The `Infinity` value",
    value: 1 / 0,
    resolveType: function() {
        return "Number";
    }
}, AST_Atom);
AST_Boolean = DEFNODE("Boolean", null, {
    $documentation: "Base class for booleans",
    resolveType: function() {
        return "Boolean";
    }
}, AST_Atom);
AST_False = DEFNODE("False", null, {
    $documentation: "The `false` atom",
    value: false
}, AST_Boolean);
AST_True = DEFNODE("True", null, {
    $documentation: "The `true` atom",
    value: true
}, AST_Boolean);
function TreeWalker(callback) {
    this.visit = callback;
    this.stack = [];
}
TreeWalker.prototype = {
    _visit: function(node, descend) {
        var ret;
        this.stack.push(node);
        ret = this.visit(node, descend ? function() {
            descend.call(node);
        } : noop);
        if (!ret && descend) {
            descend.call(node);
        }
        this.stack.pop();
        return ret;
    },
    parent: function(n) {
        return this.stack[this.stack.length - 2 - (n || 0)];
    },
    push: function(node) {
        this.stack.push(node);
    },
    pop: function() {
        return this.stack.pop();
    },
    self: function() {
        return this.stack[this.stack.length - 1];
    },
    find_parent: function(type) {
        var ՐՏitr30, ՐՏidx30;
        var stack, i, x;
        stack = this.stack;
        ՐՏitr30 = ՐՏ_Iterable(range(stack.length - 1, -1, -1));
        for (ՐՏidx30 = 0; ՐՏidx30 < ՐՏitr30.length; ՐՏidx30++) {
            i = ՐՏitr30[ՐՏidx30];
            x = stack[i];
            if (x instanceof type) {
                return x;
            }
        }
    },
    in_boolean_context: function() {
        var stack, i, self, p;
        stack = this.stack;
        i = stack.length;
        self = stack[--i];
        while (i > 0) {
            p = stack[--i];
            if (p instanceof AST_If && p.condition === self || p instanceof AST_Conditional && p.condition === self || p instanceof AST_DWLoop && p.condition === self || p instanceof AST_UnaryPrefix && p.operator === "!" && p.expression === self) {
                return true;
            }
            if (!(p instanceof AST_Binary && (p.operator === "&&" || p.operator === "||"))) {
                return false;
            }
            self = p;
        }
    },
    loopcontrol_target: function(label) {
        var ՐՏitr31, ՐՏidx31, ՐՏitr32, ՐՏidx32;
        var stack, i, x;
        stack = this.stack;
        if (label) {
            ՐՏitr31 = ՐՏ_Iterable(range(stack.length - 1, -1, -1));
            for (ՐՏidx31 = 0; ՐՏidx31 < ՐՏitr31.length; ՐՏidx31++) {
                i = ՐՏitr31[ՐՏidx31];
                x = stack[i];
                if (x instanceof AST_LabeledStatement && x.label.name === label.name) {
                    return x.body;
                }
            }
        } else {
            ՐՏitr32 = ՐՏ_Iterable(range(stack.length - 1, -1, -1));
            for (ՐՏidx32 = 0; ՐՏidx32 < ՐՏitr32.length; ՐՏidx32++) {
                i = ՐՏitr32[ՐՏidx32];
                x = stack[i];
                if (x instanceof AST_Switch || x instanceof AST_ForIn || x instanceof AST_DWLoop) {
                    return x;
                }
            }
        }
    }
};