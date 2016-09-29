function OutputStream(options) {
    var options, indentation, current_col, current_line, current_pos, BUFFERS, IMPORTED, might_need_space, might_need_semicolon, last, requireSemicolonChars, space, indent, with_indent, newline, semicolon, add_mapping, tmpIndex, stack;
    options = defaults(options, {
        indent_start: 0,
        indent_level: 4,
        quote_keys: false,
        space_colon: true,
        ascii_only: false,
        inline_script: false,
        width: 80,
        max_line_len: 32e3,
        ie_proof: true,
        es6: false,
        beautify: false,
        source_map: null,
        bracketize: false,
        semicolons: true,
        comments: false,
        preserve_line: false,
        omit_baselib: false,
        baselib: null,
        private_scope: true,
        auto_bind: false,
        write_name: true
    }, true);
    indentation = 0;
    current_col = 0;
    current_line = 1;
    current_pos = 0;
    BUFFERS = [ {
        vars: [],
        output: ""
    } ];
    IMPORTED = {};
    function to_ascii(str_, identifier) {
        return str_.replace(/[\u0080-\uffff]/g, function(ch) {
            var code;
            code = ch.charCodeAt(0).toString(16);
            if (code.length <= 2 && !identifier) {
                while (code.length < 2) {
                    code = "0" + code;
                }
                return "\\x" + code;
            } else {
                while (code.length < 4) {
                    code = "0" + code;
                }
                return "\\u" + code;
            }
        });
    }
    function make_string(str_, quotes) {
        var dq, sq, str_;
        dq = 0;
        sq = 0;
        str_ = str_.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function(s) {
            var tmp_;
            tmp_ = s;
            if (tmp_ === "\\") {
                return "\\\\";
            } else if (tmp_ === "\b") {
                return "\\b";
            } else if (tmp_ === "\f") {
                return "\\f";
            } else if (tmp_ === "\n") {
                return "\\n";
            } else if (tmp_ === "\t") {
                return "\\t";
            } else if (tmp_ === "\r") {
                return "\\r";
            } else if (tmp_ === "\u2028") {
                return "\\u2028";
            } else if (tmp_ === "\u2029") {
                return "\\u2029";
            } else if (tmp_ === '"') {
                ++dq;
                return '"';
            } else if (tmp_ === "'") {
                ++sq;
                return "'";
            } else if (tmp_ === "\0") {
                return "\\0";
            }
            return s;
        });
        if (options.ascii_only) {
            str_ = to_ascii(str_);
        }
        if (quotes) {
            if (dq > sq) {
                return "'" + str_.replace(/\x27/g, "\\'") + "'";
            } else {
                return '"' + str_.replace(/\x22/g, '\\"') + '"';
            }
        } else {
            return str_;
        }
    }
    function encode_string(str_, quotes) {
        var ret;
        ret = make_string(str_, quotes);
        if (options.inline_script) {
            ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
        }
        return ret;
    }
    function make_name(name) {
        var name;
        name = name.toString();
        if (options.ascii_only) {
            name = to_ascii(name, true);
        }
        return name;
    }
    function make_indent(back) {
        return repeat_string(" ", options.indent_start + indentation - back * options.indent_level);
    }
    might_need_space = false;
    might_need_semicolon = false;
    last = null;
    function last_char() {
        return last.charAt(last.length - 1);
    }
    function maybe_newline() {
        if (options.max_line_len && current_col > options.max_line_len) {
            print_("\n");
        }
    }
    requireSemicolonChars = makePredicate("( [ + * / - , .");
    function print_(str_) {
        var str_, ch, target_line, prev, a, n;
        str_ = String(str_);
        ch = str_.charAt(0);
        if (might_need_semicolon) {
            if ((!ch || !(ՐՏ_in(ch, ";}"))) && !/[;]$/.test(last)) {
                if (options.semicolons || requireSemicolonChars(ch)) {
                    BUFFERS[BUFFERS.length-1].output += ";";
                    ++current_col;
                    ++current_pos;
                } else {
                    BUFFERS[BUFFERS.length-1].output += "\n";
                    ++current_pos;
                    ++current_line;
                    current_col = 0;
                }
                if (!options.beautify) {
                    might_need_space = false;
                }
            }
            might_need_semicolon = false;
            maybe_newline();
        }
        if (!options.beautify && options.preserve_line && stack[stack.length - 1]) {
            target_line = stack[stack.length - 1].start.line;
            while (current_line < target_line) {
                BUFFERS[BUFFERS.length-1].output += "\n";
                ++current_pos;
                ++current_line;
                current_col = 0;
                might_need_space = false;
            }
        }
        if (might_need_space) {
            prev = last_char();
            if (is_identifier_char(prev) && (is_identifier_char(ch) || ch === "\\") || /^[\+\-\/]$/.test(ch) && ch === prev) {
                BUFFERS[BUFFERS.length-1].output += " ";
                ++current_col;
                ++current_pos;
            }
            might_need_space = false;
        }
        a = str_.split(/\r?\n/);
        n = a.length - 1;
        current_line += n;
        if (n === 0) {
            current_col += a[n].length;
        } else {
            current_col = a[n].length;
        }
        current_pos += str_.length;
        last = str_;
        BUFFERS[BUFFERS.length-1].output += str_;
    }
    space = options.beautify ? function() {
        print_(" ");
    } : function() {
        might_need_space = true;
    };
    indent = options.beautify ? function(half) {
        if (options.beautify) {
            print_(make_indent(half ? .5 : 0));
        }
    } : noop;
    with_indent = options.beautify ? function(col, cont) {
        var col, save_indentation, ret;
        if (col === true) {
            col = next_indent();
        }
        save_indentation = indentation;
        indentation = col;
        ret = cont();
        indentation = save_indentation;
        return ret;
    } : function(col, cont) {
        return cont();
    };
    newline = options.beautify ? function() {
        print_("\n");
    } : noop;
    semicolon = options.beautify ? function() {
        print_(";");
    } : function() {
        might_need_semicolon = true;
    };
    function force_semicolon() {
        might_need_semicolon = false;
        print_(";");
    }
    function next_indent() {
        return indentation + options.indent_level;
    }
    function spaced() {
        var ՐՏitr1, ՐՏidx1, ՐՏupk1;
        var i, x;
        ՐՏitr1 = ՐՏ_Iterable(enumerate(arguments));
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            ՐՏupk1 = ՐՏitr1[ՐՏidx1];
            i = ՐՏupk1[0];
            x = ՐՏupk1[1];
            if (i > 0) {
                space();
            }
            if (x.print) {
                x.print(this);
            } else {
                print_(x);
            }
        }
    }
    function addProperty(prop, val) {
        return function(obj) {
            var output;
            output = this;
            output.print("Object.defineProperty(");
            output.print(obj);
            output.comma();
            output.print_string(prop);
            output.comma();
            output.with_block(function() {
                output.indent();
                output.print("value");
                output.colon();
                output.print_string(val);
                output.newline();
            });
            output.print(")");
        };
    }
    function addProperties(subattr, props) {
        return function(obj) {
            var output;
            output = this;
            output.print("Object.defineProperties(");
            output.print(obj);
            if (subattr) {
                output.print("." + subattr);
            }
            output.comma();
            output.with_block(function() {
                Object.keys(props).forEach(function(key, i) {
                    if (i) {
                        output.print(",");
                        output.newline();
                    }
                    output.indent();
                    output.print(key);
                    output.colon();
                    output.with_block(function() {
                        var ՐՏitr2, ՐՏidx2;
                        var attr;
                        ՐՏitr2 = ՐՏ_Iterable([ "enumerable", "writable" ]);
                        for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
                            attr = ՐՏitr2[ՐՏidx2];
                            output.indent();
                            output.print(attr);
                            output.colon();
                            output.print("true");
                            output.comma();
                            output.newline();
                        }
                        output.indent();
                        output.print("value");
                        output.colon();
                        props[key](output);
                    });
                });
                output.newline();
            });
            output.print(")");
        };
    }
    function end_statement() {
        semicolon();
        newline();
    }
    function with_block(cont) {
        var ret;
        ret = null;
        print_("{");
        newline();
        with_indent(next_indent(), function() {
            ret = cont();
        });
        indent();
        print_("}");
        return ret;
    }
    function with_parens(cont) {
        var ret;
        print_("(");
        ret = cont();
        print_(")");
        return ret;
    }
    function with_square(cont) {
        var ret;
        print_("[");
        ret = cont();
        print_("]");
        return ret;
    }
    function comma() {
        print_(",");
        space();
    }
    function colon() {
        print_(":");
        if (options.space_colon) {
            space();
        }
    }
    add_mapping = options.source_map ? function(token, name) {
        try {
            if (token) {
                options.source_map.add(token.file || "?", current_line, current_col, token.line, token.col, !name && token.type === "name" ? token.value : name);
            }
        } catch (ՐՏ_Exception) {
            var ex = ՐՏ_Exception;
            AST_Node.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]", {
                file: token.file,
                line: token.line,
                col: token.col,
                cline: current_line,
                ccol: current_col,
                name: name || ""
            });
        }
    } : noop;
    function get_() {
        if (BUFFERS.len > 1) {
            throw new Error("Something went wrong, output generator didn't exit all of its scopes properly.");
        }
        if (BUFFERS[0].vars.length) {
            BUFFERS.unshift({
                vars: [],
                output: ""
            });
            endLocalBuffer();
        }
        return BUFFERS[0].output;
    }
    function assign_var(name) {
        if (typeof name === "string") {
            print_(name);
        } else {
            name.print(this);
        }
        space();
        print_("=");
        space();
    }
    tmpIndex = {
        "itr": 0,
        "idx": 0,
        "upk": 0,
        "_": 0
    };
    function newTemp(subtype, buffer) {
        subtype = subtype === void 0 ? "_" : subtype;
        buffer = buffer === void 0 ? true : buffer;
        var tmp;
        ++tmpIndex[subtype];
        tmp = RAPYD_PREFIX + subtype + tmpIndex[subtype];
        if (buffer) {
            BUFFERS[BUFFERS.length-1].vars.push(tmp);
        }
        return tmp;
    }
    function prevTemp(subtype) {
        subtype = subtype === void 0 ? "_" : subtype;
        return RAPYD_PREFIX + subtype + tmpIndex[subtype];
    }
    function startLocalBuffer() {
        BUFFERS.push({
            vars: [],
            output: ""
        });
    }
    function endLocalBuffer() {
        var localBuffer;
        localBuffer = BUFFERS.pop();
        if (localBuffer.vars.length) {
            indent();
            print_("var ");
            localBuffer.vars.forEach(function(local, i) {
                if (i) {
                    comma();
                }
                print_(local);
            });
            end_statement();
        }
        BUFFERS[BUFFERS.length-1].output += localBuffer.output;
    }
    stack = [];
    return {
        get: get_,
        toString: get_,
        indent: indent,
        indentation: function() {
            return indentation;
        },
        current_width: function() {
            return current_col - indentation;
        },
        should_break: function() {
            return options.width && this.current_width() >= options.width;
        },
        newline: newline,
        print: print_,
        space: space,
        comma: comma,
        colon: colon,
        last: function() {
            return last;
        },
        semicolon: semicolon,
        force_semicolon: force_semicolon,
        to_ascii: to_ascii,
        print_name: function(name) {
            print_(make_name(name));
        },
        print_string: function(str_, quotes) {
            quotes = quotes === void 0 ? true : quotes;
            print_(encode_string(str_, quotes));
        },
        next_indent: next_indent,
        with_indent: with_indent,
        with_block: with_block,
        with_parens: with_parens,
        spaced: spaced,
        end_statement: end_statement,
        addProperty: addProperty,
        startLocalBuffer: startLocalBuffer,
        endLocalBuffer: endLocalBuffer,
        addProperties: addProperties,
        with_square: with_square,
        add_mapping: add_mapping,
        assign: assign_var,
        get_baselib: function(key) {
            if (!options.omit_baselib) {
                return options.baselib[key];
            }
            return null;
        },
        import: function(key) {
            if (!IMPORTED.hasOwnProperty(key)) {
                IMPORTED[key] = key;
                return true;
            }
            return false;
        },
        is_main: function() {
            return BUFFERS.length === 1 && BUFFERS[BUFFERS.length-1].output.length === 0;
        },
        option: function(opt) {
            return options[opt];
        },
        line: function() {
            return current_line;
        },
        col: function() {
            return current_col;
        },
        pos: function() {
            return current_pos;
        },
        push_node: function(node) {
            stack.push(node);
        },
        pop_node: function() {
            return stack.pop();
        },
        stack: function() {
            return stack;
        },
        newTemp: newTemp,
        prevTemp: prevTemp,
        parent: function(n) {
            return stack[stack.length - 2 - (n || 0)];
        }
    };
}
(function() {
    var SPECIAL_METHODS, CREATION;
    SPECIAL_METHODS = {
        bind: "ՐՏ_bind",
        rebind_all: "ՐՏ_rebindAll",
        bool: "!!",
        "float": "parseFloat",
        "int": "parseInt",
        mixin: "ՐՏ_mixin",
        merge: "ՐՏ_merge",
        print: "ՐՏ_print",
        eslice: "ՐՏ_eslice"
    };
    function unify(output, assign) {
        var args = [].slice.call(arguments, 2);
        var args;
        args = args.filter(function(i) {
            return i !== null;
        });
        return function(baseFn) {
            if (args.length) {
                return function() {
                    var tmp;
                    tmp = output.newTemp();
                    if (assign) {
                        output.assign(assign);
                    }
                    output.with_parens(function() {
                        var ՐՏitr3, ՐՏidx3;
                        var arg;
                        output.assign(tmp);
                        baseFn();
                        output.comma();
                        ՐՏitr3 = ՐՏ_Iterable(args);
                        for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
                            arg = ՐՏitr3[ՐՏidx3];
                            if (arg !== null) {
                                arg.call(output, tmp);
                                output.comma();
                            }
                        }
                        output.print(tmp);
                    });
                    if (assign) {
                        output.semicolon();
                    }
                };
            } else {
                return function() {
                    baseFn();
                };
            }
        };
    }
    function DEFPRINT(nodetype, generator) {
        nodetype.DEFMETHOD("_codegen", generator);
    }
    AST_Node.DEFMETHOD("print", function(stream, force_parens) {
        var self, generator;
        self = this;
        generator = self._codegen;
        stream.push_node(self);
        if (force_parens || self.needs_parens(stream)) {
            stream.with_parens(function() {
                self.add_comments(stream);
                self.add_source_map(stream);
                generator(self, stream);
            });
        } else {
            self.add_comments(stream);
            self.add_source_map(stream);
            generator(self, stream);
        }
        stream.pop_node();
    });
    AST_Node.DEFMETHOD("print_to_string", function(options) {
        var s;
        s = OutputStream(options);
        this.print(s);
        return s.get();
    });
    AST_Node.DEFMETHOD("add_comments", function(output) {
        var c, self, start, comments;
        c = output.option("comments");
        self = this;
        if (c) {
            start = self.start;
            if (start && !start._comments_dumped) {
                start._comments_dumped = true;
                comments = start.comments_before;
                if (self instanceof AST_Exit && self.value && self.value.start.comments_before.length > 0) {
                    comments = (comments || []).concat(self.value.start.comments_before);
                    self.value.start.comments_before = [];
                }
                if (c.test) {
                    comments = comments.filter(function(comment) {
                        return c.test(comment.value);
                    });
                } else if (typeof c === "function") {
                    comments = comments.filter(function(comment) {
                        return c(self, comment);
                    });
                }
                comments.forEach(function(c) {
                    if (c.type === "comment:line") {
                        output.print("//" + c.value + "\n");
                        output.indent();
                    } else if (c.type === "comment:multiline") {
                        output.print("/*" + c.value + "*/");
                        if (start.newline_before) {
                            output.print("\n");
                            output.indent();
                        } else {
                            output.space();
                        }
                    }
                });
            }
        }
    });
    function PARENS(nodetype, func) {
        nodetype.DEFMETHOD("needs_parens", func);
    }
    PARENS(AST_Node, function() {
        return false;
    });
    PARENS(AST_Function, function(output) {
        return first_in_statement(output);
    });
    PARENS(AST_Object, function(output) {
        return first_in_statement(output);
    });
    PARENS(AST_Unary, function(output) {
        var p;
        p = output.parent();
        return p instanceof AST_PropAccess && p.expression === this;
    });
    PARENS(AST_Seq, function(output) {
        var p;
        p = output.parent();
        return p instanceof AST_Unary || p instanceof AST_VarDef || p instanceof AST_Dot || p instanceof AST_ObjectProperty || p instanceof AST_Conditional;
    });
    PARENS(AST_Range, function(output) {
        return false;
    });
    PARENS(AST_Binary, function(output) {
        var p, po, pp, so, sp;
        p = output.parent();
        if (p instanceof AST_BaseCall && p.expression === this) {
            return true;
        }
        if (p instanceof AST_Unary) {
            return true;
        }
        if (p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
        if (p instanceof AST_Binary) {
            po = p.operator;
            pp = PRECEDENCE[po];
            so = this.operator;
            sp = PRECEDENCE[so];
            if (pp > sp || pp === sp && this === p.right && !(so === po && (so === "*" || so === "&&" || so === "||"))) {
                return true;
            }
        }
    });
    PARENS(AST_PropAccess, function(output) {
        var p;
        p = output.parent();
        if (p instanceof AST_New && p.expression === this) {
            try {
                this.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_BaseCall) {
                        throw p;
                    }
                }));
            } catch (ՐՏ_Exception) {
                var ex = ՐՏ_Exception;
                if (ex !== p) {
                    throw ex;
                }
                return true;
            }
        }
    });
    PARENS(AST_BaseCall, function(output) {
        var p;
        p = output.parent();
        return p instanceof AST_New && p.expression === this;
    });
    PARENS(AST_New, function(output) {
        var p;
        p = output.parent();
        if (no_constructor_parens(this, output) && (p instanceof AST_PropAccess || p instanceof AST_BaseCall && p.expression === this)) {
            return true;
        }
    });
    PARENS(AST_Number, function(output) {
        var p;
        p = output.parent();
        if (this.getValue() < 0 && p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    });
    PARENS(AST_NaN, function(output) {
        var p;
        p = output.parent();
        if (p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    });
    function assign_and_conditional_paren_rules(output) {
        var p;
        p = output.parent();
        if (p instanceof AST_Unary) {
            return true;
        }
        if (p instanceof AST_Binary && !(p instanceof AST_Assign)) {
            return true;
        }
        if (p instanceof AST_BaseCall && p.expression === this) {
            return true;
        }
        if (p instanceof AST_Conditional && p.condition === this) {
            return true;
        }
        if (p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    }
    PARENS(AST_Assign, assign_and_conditional_paren_rules);
    PARENS(AST_Conditional, assign_and_conditional_paren_rules);
    DEFPRINT(AST_Directive, function(self, output) {
        output.print_string(self.value);
        output.semicolon();
    });
    DEFPRINT(AST_Debugger, function(self, output) {
        output.print("debugger");
        output.semicolon();
    });
    function display_body(body, is_toplevel, output) {
        var last;
        last = body.length - 1;
        body.forEach(function(stmt, i) {
            if (!(stmt instanceof AST_EmptyStatement) && !(stmt instanceof AST_Definitions)) {
                output.indent();
                stmt.print(output);
                if (!(i === last && is_toplevel)) {
                    output.newline();
                }
            }
        });
    }
    function bind_methods(methods, output) {
        var arg;
        for (arg in methods) {
            output.indent();
            output.print("this.");
            output.assign(arg);
            output.print("ՐՏ_bind");
            output.with_parens(function() {
                output.print("this." + arg);
                output.comma();
                output.print("this");
            });
            output.end_statement();
        }
    }
    function write_imports(module_, output) {
        var ՐՏitr4, ՐՏidx4, ՐՏitr5, ՐՏidx5, ՐՏitr6, ՐՏidx6, ՐՏitr7, ՐՏidx7, ՐՏitr8, ՐՏidx8;
        var imports, import_id, nonlocalvars, module_, name;
        imports = [];
        ՐՏitr4 = ՐՏ_Iterable(Object.keys(module_.imports));
        for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
            import_id = ՐՏitr4[ՐՏidx4];
            imports.push(module_.imports[import_id]);
        }
        imports.sort(function(a, b) {
            var ՐՏupk2;
            var a, b;
            ՐՏupk2 = [ a.import_order, b.import_order ];
            a = ՐՏupk2[0];
            b = ՐՏupk2[1];
            return a < b ? -1 : a > b ? 1 : 0;
        });
        if (imports.length > 1) {
            output.indent();
            output.spaced("var ՐՏ_modules", "=", "{};");
            output.newline();
        }
        nonlocalvars = {};
        ՐՏitr5 = ՐՏ_Iterable(imports);
        for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
            module_ = ՐՏitr5[ՐՏidx5];
            ՐՏitr6 = ՐՏ_Iterable(module_.nonlocalvars);
            for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                name = ՐՏitr6[ՐՏidx6];
                nonlocalvars[name] = true;
            }
        }
        nonlocalvars = Object.getOwnPropertyNames(nonlocalvars).join(", ");
        if (nonlocalvars.length) {
            output.indent();
            output.print("var " + nonlocalvars);
            output.end_statement();
        }
        ՐՏitr7 = ՐՏ_Iterable(imports);
        for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
            module_ = ՐՏitr7[ՐՏidx7];
            if (module_.module_id !== "__main__") {
                output.indent();
                output.assign('ՐՏ_modules["' + module_.module_id + '"]');
                output.print("{}");
                output.end_statement();
            }
        }
        ՐՏitr8 = ՐՏ_Iterable(imports);
        for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
            module_ = ՐՏitr8[ՐՏidx8];
            if (module_.module_id !== "__main__") {
                print_module(module_, output);
            }
        }
    }
    function write_main_name(output) {
        if (output.option("write_name")) {
            output.newline();
            output.indent();
            output.spaced("var __name__", "=", '"__main__"');
            output.end_statement();
        }
    }
    function display_complex_body(node, is_toplevel, output) {
        var offset, arg;
        output.startLocalBuffer();
        offset = 0;
        if (node instanceof AST_Method && !node.static && !(output.option("es6") && node.name.name === "__init__")) {
            output.indent();
            output.spaced("var", node.argnames[0], "=", "this");
            output.end_statement();
            ++offset;
        }
        if (node instanceof AST_Scope) {
            if (node.argnames) {
                if (node.argnames.starargs) {
                    output.indent();
                    output.spaced("var", node.argnames.starargs, "=", "[].slice.call");
                    output.with_parens(function() {
                        output.print("arguments");
                        output.comma();
                        output.print(node.argnames.length - offset);
                    });
                    output.end_statement();
                }
                if (!output.option("es6")) {
                    for (arg in node.argnames.defaults) {
                        output.indent();
                        output.spaced(arg, "=", arg, "===", "void 0", "?");
                        output.space();
                        force_statement(node.argnames.defaults[arg], output);
                        output.space();
                        output.colon();
                        output.print(arg);
                        output.end_statement();
                    }
                }
            }
            if (output.option("auto_bind") && node.name && node.name.name === "__init__") {
                output.indent();
                output.print("ՐՏ_rebindAll");
                output.with_parens(function() {
                    output.print("this");
                    output.comma();
                    output.print("true");
                });
                output.end_statement();
                bind_methods(node.bound, output);
            }
            declare_vars(node.localvars, output);
        } else if (node instanceof AST_Except) {
            if (node.argname) {
                output.indent();
                output.print("var ");
                output.assign(node.argname);
                output.print("ՐՏ_Exception");
                output.end_statement();
            }
        }
        display_body(node.body, is_toplevel, output);
        output.endLocalBuffer();
    }
    function declare_vars(vars, output) {
        if (vars.length) {
            output.indent();
            output.print("var ");
            vars.forEach(function(arg, i) {
                if (i) {
                    output.comma();
                }
                arg.print(output);
            });
            output.end_statement();
        }
    }
    function declare_exports(module_id, exports, submodules, output) {
        var ՐՏitr9, ՐՏidx9, ՐՏitr10, ՐՏidx10;
        var seen, symbol, sub_module_id, key;
        seen = {};
        ՐՏitr9 = ՐՏ_Iterable(exports);
        for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
            symbol = ՐՏitr9[ՐՏidx9];
            output.newline();
            output.indent();
            output.print('ՐՏ_modules["' + module_id + '"]["' + symbol.name + '"] = ' + symbol.name);
            seen[symbol.name] = true;
            output.end_statement();
        }
        ՐՏitr10 = ՐՏ_Iterable(submodules);
        for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
            sub_module_id = ՐՏitr10[ՐՏidx10];
            if (!seen.hasOwnProperty(module_id)) {
                key = sub_module_id.split(".")[sub_module_id.split(".").length-1];
                output.newline();
                output.indent();
                output.print('ՐՏ_modules["' + module_id + '"]["' + key + '"] = ');
                output.print('ՐՏ_modules["' + sub_module_id + '"]');
                output.end_statement();
            }
        }
    }
    function unpack_tuple(tuple, output, in_statement) {
        tuple.elements.forEach(function(elem, i) {
            output.indent();
            output.assign(elem);
            output.print(output.prevTemp("upk"));
            output.with_square(function() {
                output.print(i);
            });
            if (!in_statement || i < tuple.elements.length - 1) {
                output.end_statement();
            }
        });
    }
    AST_StatementWithBody.DEFMETHOD("_do_print_body", function(output) {
        force_statement(this.body, output);
    });
    DEFPRINT(AST_Statement, function(self, output) {
        self.body.print(output);
        output.semicolon();
    });
    DEFPRINT(AST_Toplevel, function(self, output) {
        var is_main;
        is_main = output.is_main();
        if (output.option("private_scope") && is_main) {
            output.with_parens(function() {
                output.print("function()");
                output.with_block(function() {
                    output.indent();
                    output.print('"use strict"');
                    output.end_statement();
                    Object.keys(self.baselib).forEach(function(key) {
                        var splat;
                        splat = output.get_baselib(key);
                        if (splat) {
                            splat.print(output);
                        }
                    });
                    write_imports(self, output);
                    output.newline();
                    output.indent();
                    output.with_parens(function() {
                        output.print("function()");
                        output.with_block(function() {
                            write_main_name(output);
                            output.newline();
                            display_complex_body(self, true, output);
                            output.newline();
                        });
                    });
                    output.print("();");
                    output.newline();
                });
            });
            output.print("();");
            output.print("");
        } else {
            if (is_main) {
                Object.keys(self.baselib).forEach(function(key) {
                    var splat;
                    splat = output.get_baselib(key);
                    if (splat) {
                        splat.print(output);
                    }
                });
                write_imports(self, output);
                write_main_name(output);
            }
            if (self.strict) {
                declare_vars(self.localvars, output);
            }
            display_body(self.body, true, output);
        }
    });
    function print_module(self, output) {
        output.newline();
        output.indent();
        output.with_parens(function() {
            output.print("function()");
            output.with_block(function() {
                output.indent();
                output.assign("var __name__");
                output.print('"' + self.module_id + '"');
                output.end_statement();
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
                declare_exports(self.module_id, self.exports, self.submodules, output);
            });
        });
        output.print("()");
        output.end_statement();
    }
    DEFPRINT(AST_Splat, function(self, output) {
        if (output.import(self.module.name)) {
            display_body(self.body.body, true, output);
            output.newline();
        }
    });
    DEFPRINT(AST_Imports, function(container, output) {
        var ՐՏitr11, ՐՏidx11, ՐՏitr12, ՐՏidx12;
        var self, argname, alias, bound_name;
        function add_aname(aname, key, from_import) {
            output.assign("var " + aname);
            output.print('ՐՏ_modules["' + key + '"]');
            if (from_import) {
                output.print("." + from_import);
            }
            output.end_statement();
            output.indent();
        }
        ՐՏitr11 = ՐՏ_Iterable(container.imports);
        for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
            self = ՐՏitr11[ՐՏidx11];
            output.import(self.module.name);
            if (self.argnames) {
                ՐՏitr12 = ՐՏ_Iterable(self.argnames);
                for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
                    argname = ՐՏitr12[ՐՏidx12];
                    alias = argname.alias ? argname.alias.name : argname.name;
                    add_aname(alias, self.key, argname.name);
                }
            } else {
                if (self.alias) {
                    add_aname(self.alias.name, self.key, false);
                } else {
                    bound_name = self.key.split(".", 1)[0];
                    add_aname(bound_name, bound_name, false);
                }
            }
        }
    });
    DEFPRINT(AST_LabeledStatement, function(self, output) {
        self.label.print(output);
        output.colon();
        self.body.print(output);
    });
    DEFPRINT(AST_SimpleStatement, function(self, output) {
        if (!(self.body instanceof AST_EmptyStatement)) {
            self.body.print(output);
            output.semicolon();
        }
    });
    function print_bracketed(node, output, complex) {
        if (node.body.length) {
            output.with_block(function() {
                if (complex) {
                    display_complex_body(node, false, output);
                } else {
                    display_body(node.body, false, output);
                }
            });
        } else {
            output.print("{}");
        }
    }
    DEFPRINT(AST_BlockStatement, function(self, output) {
        print_bracketed(self, output);
    });
    DEFPRINT(AST_EmptyStatement, function(self, output) {
    });
    DEFPRINT(AST_Do, function(self, output) {
        output.print("do");
        output.space();
        self._do_print_body(output);
        output.space();
        output.print("while");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.semicolon();
    });
    DEFPRINT(AST_While, function(self, output) {
        output.print("while");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    function is_simple_for_in(self) {
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "dir" && self.object.args.length === 1) {
            return true;
        }
        return false;
    }
    function is_simple_for(self) {
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "range" && !(self.init instanceof AST_Array) && (self.object.args.length < 3 || self.object.args[self.object.args.length-1][0] instanceof AST_Number || self.object.args[self.object.args.length-1][0] instanceof AST_Unary && self.object.args[self.object.args.length-1][0].operator === "-" && self.object.args[self.object.args.length-1][0].expression instanceof AST_Number)) {
            return true;
        }
        return false;
    }
    AST_ForIn.DEFMETHOD("_do_print_body", function(output) {
        var self;
        self = this;
        output.with_block(function() {
            var iterator, index, unpack;
            if (!(is_simple_for(self) || is_simple_for_in(self))) {
                output.indent();
                iterator = output.prevTemp("itr");
                index = output.prevTemp("idx");
                if (self.init instanceof AST_Array) {
                    if (output.option("es6")) {
                        output.with_square(function() {
                            self.init.elements.forEach(function(element, index) {
                                if (index) output.comma();
                                element.print(output);
                            });
                        });
                        output.space();
                        output.print("=");
                        output.space();
                        output.print(iterator + "[" + index + "];");
                        output.newline();
                    } else {
                        unpack = output.newTemp("upk");
                        output.assign(unpack);
                        output.print(iterator + "[" + index + "];");
                        output.newline();
                        unpack_tuple(self.init, output);
                    }
                } else {
                    output.assign(self.init);
                    output.print(iterator + "[" + index + "];");
                    output.newline();
                }
            }
            self.body.body.forEach(function(stmt, i) {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        });
    });
    DEFPRINT(AST_ForIn, function(self, output) {
        var increment, args, tmp_, start, end, iterator;
        if (is_simple_for(self)) {
            increment = null;
            args = self.object.args;
            tmp_ = args.length;
            if (tmp_ === 1) {
                start = 0;
                end = args[0];
            } else if (tmp_ === 2) {
                start = args[0];
                end = args[1];
            } else if (tmp_ === 3) {
                start = args[0];
                end = args[1];
                increment = args[2];
            }
            output.print("for");
            output.space();
            output.with_parens(function() {
                output.assign(self.init);
                start.print ? start.print(output) : output.print(start);
                output.semicolon();
                output.space();
                self.init.print(output);
                output.space();
                increment instanceof AST_Unary ? output.print(">") : output.print("<");
                output.space();
                end.print(output);
                output.semicolon();
                output.space();
                self.init.print(output);
                if (increment && (!(increment instanceof AST_Unary) || increment.expression.value !== "1")) {
                    if (increment instanceof AST_Unary) {
                        output.print("-=");
                        increment.expression.print(output);
                    } else {
                        output.print("+=");
                        increment.print(output);
                    }
                } else {
                    if (increment instanceof AST_Unary) {
                        output.print("--");
                    } else {
                        output.print("++");
                    }
                }
            });
        } else if (is_simple_for_in(self)) {
            output.print("for");
            output.space();
            output.with_parens(function() {
                output.spaced(self.init, "in", self.object.args[0]);
            });
        } else {
            iterator = output.newTemp("itr");
            output.assign(iterator);
            output.print("ՐՏ_Iterable");
            output.with_parens(function() {
                self.object.print(output);
            });
            output.end_statement();
            output.indent();
            output.print("for");
            output.space();
            output.with_parens(function() {
                var index;
                index = output.newTemp("idx");
                output.assign(index);
                output.print("0");
                output.semicolon();
                output.space();
                output.spaced(index, "<", iterator + ".length");
                output.semicolon();
                output.space();
                output.print(index + "++");
            });
        }
        output.space();
        self._do_print_body(output);
    });
    AST_ForJS.DEFMETHOD("_do_print_body", function(output) {
        var self;
        self = this;
        output.with_block(function() {
            self.body.body.forEach(function(stmt, i) {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        });
    });
    DEFPRINT(AST_ForJS, function(self, output) {
        output.print("for");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    DEFPRINT(AST_ListComprehension, function(self, output) {
        var constructor, iterator, index, result, add_entry;
        constructor = {
            "ListComprehension": "[]",
            "DictComprehension": "{}"
        }[self.TYPE];
        iterator = output.newTemp("itr", false);
        index = output.newTemp("idx", false);
        result = RAPYD_PREFIX + "res";
        if (self instanceof AST_DictComprehension) {
            add_entry = function() {
                output.indent();
                output.print(result);
                output.with_square(function() {
                    self.statement.print(output);
                });
                output.assign("");
                self.value_statement.print(output);
                output.end_statement();
            };
        } else {
            add_entry = function() {
                output.indent();
                output.print(result + ".push");
                output.with_parens(function() {
                    self.statement.print(output);
                });
                output.end_statement();
            };
        }
        output.with_parens(function() {
            output.print("function");
            output.print("()");
            output.space();
            output.with_block(function() {
                output.indent();
                output.print("var " + index);
                output.comma();
                output.assign(iterator);
                output.print("ՐՏ_Iterable");
                output.with_parens(function() {
                    self.object.print(output);
                });
                output.comma();
                output.assign(result);
                output.print(constructor);
                if (self.init instanceof AST_Array) {
                    self.init.elements.forEach(function(i) {
                        output.comma();
                        i.print(output);
                    });
                } else {
                    output.comma();
                    self.init.print(output);
                }
                output.semicolon();
                output.newline();
                output.indent();
                output.print("for");
                output.space();
                output.with_parens(function() {
                    output.spaced(index, "=", "0");
                    output.semicolon();
                    output.space();
                    output.spaced(index, "<", iterator + ".length");
                    output.semicolon();
                    output.space();
                    output.print(index + "++");
                });
                output.space();
                output.with_block(function() {
                    output.indent();
                    if (self.init instanceof AST_Array) {
                        if (output.option("es6")) {
                            output.with_square(function() {
                                self.left.elements.forEach(function(element, index) {
                                    if (index) output.comma();
                                    element.print(output);
                                });
                            });
                            output.comma();
                            output.print("=");
                            output.comma();
                        } else {
                            output.assign(output.newTemp("upk"));
                        }
                        output.print(iterator + "[" + index + "];");
                        output.newline();
                        if (!output.option("es6")) {
                            unpack_tuple(self.init, output);
                        }
                    } else {
                        output.assign(self.init);
                        output.print(iterator + "[" + index + "];");
                        output.newline();
                    }
                    if (self.condition) {
                        output.indent();
                        output.print("if");
                        output.space();
                        output.with_parens(function() {
                            self.condition.print(output);
                        });
                        output.space();
                        output.with_block(function() {
                            add_entry();
                        });
                        output.newline();
                    } else {
                        add_entry();
                    }
                });
                output.newline();
                output.indent();
                output.print("return " + result);
                output.end_statement();
            });
        });
        output.print("()");
    });
    DEFPRINT(AST_With, function(self, output) {
        output.print("with");
        output.space();
        output.with_parens(function() {
            self.expression.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    function decorate(decorators, output, internalsub) {
        var pos, wrap;
        pos = 0;
        wrap = function() {
            if (pos < decorators.length) {
                decorators[pos].expression.print(output);
                ++pos;
                output.with_parens(function() {
                    wrap();
                });
            } else {
                internalsub();
            }
        };
        wrap();
    }
    function decorated(decorators, output) {
        return function(baseFn) {
            return function() {
                decorate(decorators, output, baseFn);
            };
        };
    }
    AST_Lambda.DEFMETHOD("_do_print", function(output, nokeyword) {
        var ՐՏ_1;
        var self, name;
        self = this;
        function addDecorators() {
            if (self.decorators && self.decorators.length) {
                return function(obj) {
                    var output;
                    output = this;
                    output.assign(obj);
                    decorate(self.decorators, output, function() {
                        output.print(obj);
                    });
                };
            }
            return null;
        }
        function addDocstring() {
            if (self.docstring) {
                return function(obj) {
                    var output;
                    output = this;
                    output.addProperty("__doc__", self.docstring).call(output, obj);
                };
            }
            return null;
        }
        name = null;
        if (self.name) {
            name = "var " + self.name.name;
        }
        
        var internalsub = (ՐՏ_1 = function internalsub() {
            if (!nokeyword) {
                output.print("function");
                if (self.generator) {
                    output.print("*");
                }
            }
            if (self.name) {
                output.space();
                self.name.print(output);
            }
            output.with_parens(function() {
                self.argnames.forEach(function(arg, i) {
                    if (i) {
                        output.comma();
                    }
                    arg.print(output);
                    if (output.option("es6") && self.argnames.defaults[arg.name]) {
                        output.print("=");
                        self.argnames.defaults[arg.name].print(output);
                    }
                });
                if (self.kwargs) {
                    if (self.argnames.length) {
                        output.comma();
                    }
                    output.print("ՐՏ_kw");
                }
            });
            output.space();
            print_bracketed(self, output, true);
        }, ՐՏ_1 = unify(output, name, addDecorators(), addDocstring())(ՐՏ_1), ՐՏ_1);
        internalsub();
    });
    DEFPRINT(AST_Lambda, function(self, output) {
        self._do_print(output);
    });
    AST_Class.DEFMETHOD("_do_print", function(output) {
        var ՐՏ_2, ՐՏupk3, ՐՏ_3;
        var self, name, methods, staticmethods;
        self = this;
        if (self.external) {
            return;
        }
        function addDecorators() {
            if (self.decorators && self.decorators.length) {
                return function(obj) {
                    var output;
                    output = this;
                    output.assign(obj);
                    decorate(self.decorators, output, function() {
                        output.print(obj);
                    });
                };
            }
            return null;
        }
        name = null;
        if (self.name) {
            name = "var " + self.name.name;
        }
        if (output.option("es6")) {
            function addClassVariables() {
                var properties;
                properties = {};
                if (self.docstring) {
                    properties["__doc__"] = function(output) {
                        output.print_string(self.docstring);
                    };
                }
                self.body.forEach(function(stmt, i) {
                    if (stmt instanceof AST_SimpleStatement && stmt.body instanceof AST_Assign && stmt.body.operator === "=") {
                        properties[stmt.body.left.name] = function(output) {
                            stmt.body.right.print(output);
                            output.newline();
                        };
                    }
                });
                if (Object.keys(properties).length) {
                    return output.addProperties("prototype", properties);
                }
                return null;
            }
            
            var generateClass = (ՐՏ_2 = function generateClass() {
                output.print("class");
                if (self.name) {
                    output.space();
                    self.name.print(output);
                }
                if (self.parent) {
                    output.space();
                    output.print("extends");
                    output.space();
                    self.parent.print(output);
                }
                output.space();
                output.with_block(function() {
                    self.body.forEach(function(stmt, i) {
                        if (stmt instanceof AST_Lambda) {
                            output.indent();
                            if (stmt.static) {
                                output.print("static");
                                output.space();
                            }
                            if (stmt.name.name === "__init__") {
                                output.print("constructor");
                            } else {
                                if (stmt instanceof AST_ObjectGetter) {
                                    output.print("get ");
                                } else if (stmt instanceof AST_ObjectSetter) {
                                    output.print("set ");
                                }
                                stmt.name.print(output);
                            }
                            output.space();
                            output.with_parens(function() {
                                stmt.argnames.forEach(function(arg, i) {
                                    var i;
                                    if (ՐՏ_in(name, self.static)) {
                                        ++i;
                                    }
                                    if (i > 1) {
                                        output.comma();
                                    }
                                    if (i) {
                                        arg.print(output);
                                    }
                                });
                                if (self.kwargs) {
                                    if (self.argnames.length) {
                                        output.comma();
                                    }
                                    output.print("ՐՏ_kw");
                                }
                            });
                            output.space();
                            print_bracketed(stmt, output, true);
                            output.newline();
                        }
                    });
                });
            }, ՐՏ_2 = unify(output, name, addDecorators(), addClassVariables())(ՐՏ_2), ՐՏ_2);
        } else {
            function define_method(stmt) {
                return function(output) {
                    var name;
                    name = stmt.name.name;
                    function internalsub() {
                        output.print("function");
                        output.space();
                        output.print(name);
                        output.with_parens(function() {
                            stmt.argnames.forEach(function(arg, i) {
                                var i;
                                if (ՐՏ_in(name, self.static)) {
                                    ++i;
                                }
                                if (i > 1) {
                                    output.comma();
                                }
                                if (i) {
                                    arg.print(output);
                                }
                            });
                            if (self.kwargs) {
                                if (self.argnames.length) {
                                    output.comma();
                                }
                                output.print("ՐՏ_kw");
                            }
                        });
                        print_bracketed(stmt, output, true);
                    }
                    if (stmt.decorators && stmt.decorators.length) {
                        decorate(stmt.decorators, output, internalsub);
                    } else {
                        internalsub();
                    }
                    output.newline();
                };
            }
            function addInheritance() {
                if (self.parent) {
                    return function(obj) {
                        var output;
                        output = this;
                        output.print("ՐՏ_extends");
                        output.with_parens(function() {
                            output.print(obj);
                            output.comma();
                            self.parent.print(output);
                        });
                    };
                }
                return null;
            }
            function addMethods() {
                var methods, static, methodOutput, staticMethodOutput;
                methods = {};
                static = {};
                if (self.docstring) {
                    methods["__doc__"] = function(output) {
                        output.print_string(self.docstring);
                    };
                }
                self.body.forEach(function(stmt, i) {
                    if (stmt instanceof AST_Method) {
                        if (stmt.static) {
                            static[stmt.name.name] = define_method(stmt);
                        } else {
                            methods[stmt.name.name] = define_method(stmt);
                        }
                    } else if (stmt instanceof AST_Class) {
                        console.error("Nested classes aren't supported yet");
                    }
                });
                methodOutput = null;
                if (Object.keys(methods).length) {
                    methodOutput = output.addProperties("prototype", methods);
                }
                staticMethodOutput = null;
                if (Object.keys(static).length) {
                    staticMethodOutput = output.addProperties(null, static);
                }
                return [methodOutput, staticMethodOutput];
            }
            ՐՏupk3 = addMethods();
            methods = ՐՏupk3[0];
            staticmethods = ՐՏupk3[1];
            
            var generateClass = (ՐՏ_3 = function generateClass() {
                if (self.init || self.parent || self.statements.length) {
                    output.print("function");
                    output.space();
                    self.name.print(output);
                    output.print("()");
                    output.space();
                    output.with_block(function() {
                        var cname;
                        bind_methods(self.bound, output);
                        self.statements.forEach(function(stmt) {
                            output.indent();
                            stmt.print(output);
                            output.newline();
                        });
                        if (self.init || self.parent) {
                            output.indent();
                            cname = self.init ? self.name : self.parent;
                            cname.print(output);
                            output.print(".prototype.__init__.apply");
                            output.with_parens(function() {
                                output.print("this");
                                output.comma();
                                output.print("arguments");
                            });
                            output.end_statement();
                        }
                    });
                } else {
                    output.print("function");
                    output.space();
                    self.name.print(output);
                    output.print("()");
                    output.space();
                    output.with_block(function() {
                        bind_methods(self.bound, output);
                    });
                }
            }, ՐՏ_3 = unify(output, name, addInheritance(), addDecorators(), methods, staticmethods)(ՐՏ_3), ՐՏ_3);
        }
        generateClass();
    });
    DEFPRINT(AST_Class, function(self, output) {
        self._do_print(output);
    });
    DEFPRINT(AST_SymbolClassRef, function(self, output) {
        self.class.print(output);
        output.print(".prototype." + self.name);
    });
    AST_Exit.DEFMETHOD("_do_print", function(output, kind) {
        var self;
        self = this;
        output.print(kind);
        if (self.value) {
            output.space();
            self.value.print(output);
        }
        output.semicolon();
    });
    DEFPRINT(AST_Return, function(self, output) {
        self._do_print(output, "return");
    });
    DEFPRINT(AST_Yield, function(self, output) {
        self._do_print(output, "yield");
    });
    DEFPRINT(AST_Throw, function(self, output) {
        self._do_print(output, "throw");
    });
    AST_LoopControl.DEFMETHOD("_do_print", function(output, kind) {
        output.print(kind);
        if (this.label) {
            output.space();
            this.label.print(output);
        }
        output.semicolon();
    });
    DEFPRINT(AST_Break, function(self, output) {
        self._do_print(output, "break");
    });
    DEFPRINT(AST_Continue, function(self, output) {
        self._do_print(output, "continue");
    });
    function make_then(self, output) {
        var body;
        if (output.option("bracketize")) {
            make_block(self.body, output);
            return;
        }
        if (!self.body) {
            return output.force_semicolon();
        }
        if (self.body instanceof AST_Do && output.option("ie_proof")) {
            make_block(self.body, output);
            return;
        }
        body = self.body;
        while (true) {
            if (body instanceof AST_If) {
                if (!body.alternative) {
                    make_block(self.body, output);
                    return;
                }
                body = body.alternative;
            } else if (body instanceof AST_StatementWithBody) {
                body = body.body;
            } else {
                break;
            }
        }
        force_statement(self.body, output);
    }
    DEFPRINT(AST_If, function(self, output) {
        output.print("if");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.space();
        if (self.alternative) {
            make_then(self, output);
            output.space();
            output.print("else");
            output.space();
            force_statement(self.alternative, output);
        } else {
            self._do_print_body(output);
        }
    });
    DEFPRINT(AST_Switch, function(self, output) {
        output.print("switch");
        output.space();
        output.with_parens(function() {
            self.expression.print(output);
        });
        output.space();
        if (self.body.length > 0) {
            output.with_block(function() {
                self.body.forEach(function(stmt, i) {
                    if (i) {
                        output.newline();
                    }
                    output.indent(true);
                    stmt.print(output);
                });
            });
        } else {
            output.print("{}");
        }
    });
    AST_SwitchBranch.DEFMETHOD("_do_print_body", function(output) {
        if (this.body.length > 0) {
            output.newline();
            this.body.forEach(function(stmt) {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        }
    });
    DEFPRINT(AST_Default, function(self, output) {
        output.print("default:");
        self._do_print_body(output);
    });
    DEFPRINT(AST_Case, function(self, output) {
        output.print("case");
        output.space();
        self.expression.print(output);
        output.print(":");
        self._do_print_body(output);
    });
    DEFPRINT(AST_Try, function(self, output) {
        output.print("try");
        output.space();
        print_bracketed(self, output);
        if (self.bcatch) {
            output.space();
            self.bcatch.print(output);
        }
        if (self.bfinally) {
            output.space();
            self.bfinally.print(output);
        }
    });
    DEFPRINT(AST_Catch, function(self, output) {
        output.print("catch");
        output.space();
        output.with_parens(function() {
            output.print("ՐՏ_Exception");
        });
        output.space();
        if (self.body.length > 1 || self.body[0].errors.length) {
            output.with_block(function() {
                var no_default;
                output.indent();
                no_default = true;
                self.body.forEach(function(exception, i) {
                    var no_default;
                    if (i) {
                        output.print("else ");
                    }
                    if (exception.errors.length) {
                        output.print("if");
                        output.space();
                        output.with_parens(function() {
                            exception.errors.forEach(function(err, i) {
                                if (i) {
                                    output.newline();
                                    output.indent();
                                    output.print("||");
                                    output.space();
                                }
                                output.spaced("ՐՏ_Exception", "instanceof", err);
                            });
                        });
                        output.space();
                    } else {
                        no_default = false;
                    }
                    print_bracketed(exception, output, true);
                    output.space();
                });
                if (no_default) {
                    output.print("else");
                    output.space();
                    output.with_block(function() {
                        output.indent();
                        output.spaced("throw", "ՐՏ_Exception");
                        output.end_statement();
                    });
                }
                output.newline();
            });
        } else {
            print_bracketed(self.body[0], output, true);
        }
    });
    DEFPRINT(AST_Finally, function(self, output) {
        output.print("finally");
        output.space();
        print_bracketed(self, output);
    });
    AST_Definitions.DEFMETHOD("_do_print", function(output, kind) {
        var p, in_for, avoid_semicolon;
        output.print(kind);
        output.space();
        this.definitions.forEach(function(def_, i) {
            if (i) {
                output.comma();
            }
            def_.print(output);
        });
        p = output.parent();
        in_for = p instanceof AST_ForIn;
        avoid_semicolon = in_for && p.init === this;
        if (!avoid_semicolon) {
            output.semicolon();
        }
    });
    DEFPRINT(AST_Var, function(self, output) {
        self._do_print(output, "var");
    });
    DEFPRINT(AST_Const, function(self, output) {
        self._do_print(output, "const");
    });
    function parenthesize_for_noin(node, output, noin) {
        if (!noin) {
            node.print(output);
        } else {
            try {
                node.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_Binary && node.operator === "in") {
                        throw output;
                    }
                }));
                node.print(output);
            } catch (ՐՏ_Exception) {
                var ex = ՐՏ_Exception;
                if (ex !== output) {
                    throw ex;
                }
                node.print(output, true);
            }
        }
    }
    DEFPRINT(AST_VarDef, function(self, output) {
        self.name.print(output);
        if (self.value) {
            output.assign("");
            parenthesize_for_noin(self.value, output, output.parent(1) instanceof AST_ForIn);
        }
    });
    CREATION = [];
    DEFPRINT(AST_BaseCall, function(self, output) {
        var selfArg, object, has_kwarg_items, has_kwarg_formals, has_kwargs, obj, output_kwargs;
        selfArg = null;
        function call_format() {
            var rename;
            if (self instanceof AST_ClassCall) {
                if (self.static) {
                    self.class.print(output);
                    output.print("." + self.method);
                } else if (output.option("es6") && self.super) {
                    output.print("super");
                    if (self.method !== "constructor") {
                        output.print("." + self.method);
                    }
                    selfArg = self.args.shift();
                } else {
                    self.class.print(output);
                    output.print(".prototype." + self.method + ".call");
                }
            } else {
                rename = ՐՏ_in(self.expression.name, SPECIAL_METHODS) ? SPECIAL_METHODS[self.expression.name] : void 0;
                if (rename) {
                    output.print(rename);
                } else {
                    self.expression.print(output);
                }
            }
        }
        if (self instanceof AST_New) {
            object = CREATION.pop();
            if (no_constructor_parens(self, output)) {
                call_format();
                return;
            }
        }
        has_kwarg_items = self.args.kwarg_items && self.args.kwarg_items.length;
        has_kwarg_formals = self.args.kwargs && self.args.kwargs.length;
        has_kwargs = has_kwarg_items || has_kwarg_formals;
        if (self.args.starargs || has_kwargs) {
            obj = self instanceof AST_New ? object : self.expression.expression ? self.expression.expression : new AST_This();
            if (output.option("es6")) {
                if (has_kwargs) {
                    output.print("kwargs");
                    output.with_parens(function() {
                        call_format();
                    });
                } else {
                    call_format();
                }
            } else {
                if (self instanceof AST_New) {
                    call_format();
                    output.semicolon();
                    output.newline();
                    output.indent();
                    if (has_kwargs) {
                        output.print("kwargs");
                        output.with_parens(function() {
                            object.print(output);
                            output.print(".__init__");
                        });
                    } else {
                        object.print(output);
                        output.print(".__init__");
                    }
                } else if (has_kwargs) {
                    output.print("kwargs");
                    output.with_parens(function() {
                        call_format();
                    });
                } else {
                    call_format();
                }
            }
        } else {
            call_format();
        }
        output_kwargs = function() {
            if (has_kwarg_items) {
                self.args.kwarg_items.forEach(function(kwname, i) {
                    if (i > 0) {
                        output.print(",");
                        output.space();
                    }
                    kwname.print(output);
                });
                if (has_kwarg_formals) {
                    output.print(",");
                    output.space();
                }
            }
            if (has_kwarg_formals) {
                output.print("{");
                self.args.kwargs.forEach(function(pair, i) {
                    if (i) {
                        output.comma();
                    }
                    pair[0].print(output);
                    output.print(":");
                    output.space();
                    pair[1].print(output);
                });
                output.print("}");
            }
        };
        if (output.option("es6") && self.args.starargs) {
            output.with_parens(function() {
                self.args.forEach(function(expr, i) {
                    if (i) {
                        output.comma();
                    }
                    if (self.args.starargs && i === self.args.length - 1) {
                        output.print("...");
                    }
                    expr.print(output);
                });
            });
        } else if (self.args.starargs) {
            output.print(".apply");
            output.with_parens(function() {
                obj.print(output);
                output.comma();
                if (self.args.length > 1) {
                    output.with_square(function() {
                        self.args.slice(0, -1).forEach(function(expr, i) {
                            if (i) {
                                output.comma();
                            }
                            expr.print(output);
                        });
                    });
                } else {
                    self.args[0].print(output);
                }
                if (has_kwargs || self.args.length > 1) {
                    output.print(".concat");
                    output.with_parens(function() {
                        if (self.args.length > 1) {
                            self.args[self.args.length-1].print(output);
                            if (has_kwargs) {
                                output.comma();
                            }
                        }
                        output_kwargs();
                    });
                }
            });
        } else if (has_kwargs && (self instanceof AST_New || self.expression && self.expression.expression)) {
            output.print(".call");
            output.with_parens(function() {
                var ՐՏitr13, ՐՏidx13;
                var arg;
                obj.print(output);
                ՐՏitr13 = ՐՏ_Iterable(self.args);
                for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
                    arg = ՐՏitr13[ՐՏidx13];
                    output.comma();
                    arg.print(output);
                }
                output.comma();
                output_kwargs();
            });
        } else {
            output.with_parens(function() {
                self.args.forEach(function(expr, i) {
                    if (i) {
                        output.comma();
                    }
                    expr.print(output);
                });
                if (has_kwargs) {
                    if (self.args.length) {
                        output.comma();
                    }
                    output_kwargs();
                }
            });
        }
        if (output.option("es6") && self instanceof AST_ClassCall && self.super) {
            output.end_statement();
            output.indent();
            output.spaced("var", selfArg, "=", "this");
        }
    });
    DEFPRINT(AST_New, function(self, output) {
        output.print("new");
        output.space();
        AST_BaseCall.prototype._codegen(self, output);
    });
    AST_Seq.DEFMETHOD("_do_print", function(output) {
        var self, p, print_seq;
        self = this;
        p = output.parent();
        print_seq = function() {
            self.car.print(output);
            if (self.cdr) {
                output.comma();
                if (output.should_break()) {
                    output.newline();
                    output.indent();
                }
                self.cdr.print(output);
            }
        };
        if (p instanceof AST_Binary || p instanceof AST_Return || p instanceof AST_Array || p instanceof AST_BaseCall || p instanceof AST_SimpleStatement) {
            output.with_square(print_seq);
        } else {
            print_seq();
        }
    });
    DEFPRINT(AST_Seq, function(self, output) {
        self._do_print(output);
    });
    DEFPRINT(AST_Dot, function(self, output) {
        var expr;
        expr = self.expression;
        expr.print(output);
        if (expr instanceof AST_Number && expr.getValue() >= 0) {
            if (!/[xa-f.]/i.test(output.last())) {
                output.print(".");
            }
        }
        output.print(".");
        output.add_mapping(self.end);
        output.print_name(self.property);
    });
    DEFPRINT(AST_Sub, function(self, output) {
        self.expression.print(output);
        output.print("[");
        if (self.property instanceof AST_Unary && self.property.operator === "-" && self.property.expression instanceof AST_Number) {
            self.expression.print(output);
            output.print(".length");
        }
        self.property.print(output);
        output.print("]");
    });
    DEFPRINT(AST_Slice, function(self, output) {
        output.print("[].splice.apply");
        output.with_parens(function() {
            self.expression.print(output);
            output.comma();
            output.with_square(function() {
                self.property.print(output);
                output.comma();
                self.property2.print(output);
                output.print("-");
                self.property.print(output);
            });
            output.print(".concat");
            output.with_parens(function() {
                self.assignment.print(output);
            });
        });
    });
    DEFPRINT(AST_UnaryPrefix, function(self, output) {
        var op;
        op = self.operator;
        if (op === "*") {
            op = "...";
        }
        output.print(op);
        if (/^[a-z]/i.test(op)) {
            output.space();
        }
        self.expression.print(output);
    });
    DEFPRINT(AST_UnaryPostfix, function(self, output) {
        self.expression.print(output);
        output.print(self.operator);
    });
    DEFPRINT(AST_Binary, function(self, output) {
        var comparators, function_ops, normalize, operator, leftvar;
        comparators = {
            "<": true,
            ">": true,
            "<=": true,
            ">=": true,
            "==": true,
            "!=": true
        };
        function_ops = {
            "in": "ՐՏ_in",
            "**": "Math.pow",
            "//": "Math.floor"
        };
        normalize = function(op) {
            if (op === "==") {
                return "===";
            } else if (op === "!=") {
                return "!==";
            }
            return op;
        };
        if (ՐՏ_in(self.operator, function_ops)) {
            output.print(function_ops[self.operator]);
            output.with_parens(function() {
                self.left.print(output);
                if (self.operator === "//") {
                    output.space();
                    output.print("/");
                    output.space();
                } else {
                    output.comma();
                }
                self.right.print(output);
            });
        } else if (comparators[self.operator] && self.left instanceof AST_Binary && comparators[self.left.operator]) {
            operator = normalize(self.operator);
            if (self.left.right instanceof AST_Symbol) {
                self.left.print(output);
                leftvar = self.left.right.name;
            } else {
                self.left.left.print(output);
                output.space();
                output.print(self.left.operator);
                output.space();
                output.with_parens(function() {
                    leftvar = output.newTemp();
                    output.assign(leftvar);
                    self.left.right.print(output);
                });
            }
            output.space();
            output.spaced("&&", leftvar, operator, self.right);
        } else {
            output.spaced(self.left, normalize(self.operator), self.right);
        }
    });
    DEFPRINT(AST_DeepEquality, function(self, output) {
        var primitives;
        primitives = [ "Boolean", "String", "Number" ];
        if (ՐՏ_in(self.left.computedType, primitives) || ՐՏ_in(self.right.computedType, primitives)) {
            self.left.print(output);
            output.space();
            self.operator === "==" ? output.print("===") : output.print("!==");
            output.space();
            self.right.print(output);
        } else {
            function cacheBubble(operand) {
                var tmp;
                if (!(operand instanceof AST_SymbolRef || operand instanceof AST_SymbolClassRef)) {
                    tmp = output.newTemp();
                    output.with_parens(function() {
                        output.spaced(tmp, "=", operand);
                    });
                    return {
                        print: function(output) {
                            output.print(tmp);
                        }
                    };
                }
                operand.print(output);
                return operand;
            }
            output.with_parens(function() {
                var left, right;
                left = cacheBubble(self.left);
                if (self.operator === "==") {
                    output.space();
                    output.spaced("===");
                    output.space();
                    right = cacheBubble(self.right);
                    output.space();
                    output.spaced("||", "typeof", left, "===", '"object"');
                    output.space();
                    output.print("&&");
                    output.space();
                    output.print("ՐՏ_eq");
                    output.with_parens(function() {
                        left.print(output);
                        output.comma();
                        right.print(output);
                    });
                } else {
                    output.space();
                    output.spaced("!==");
                    output.space();
                    right = cacheBubble(self.right);
                    output.space();
                    output.print("&&");
                    output.space();
                    output.with_parens(function() {
                        output.spaced("typeof", left, "!==", '"object"');
                        output.space();
                        output.print("||");
                        output.space();
                        output.print("!ՐՏ_eq");
                        output.with_parens(function() {
                            left.print(output);
                            output.comma();
                            right.print(output);
                        });
                    });
                }
            });
        }
    });
    DEFPRINT(AST_Assign, function(self, output) {
        if (self.right instanceof AST_Number && self.right.value === 1 && ՐՏ_in(self.operator, [ "+=", "-=" ])) {
            output.print(self.operator === "+=" ? "++" : "--");
            self.left.print(output);
        } else {
            if (self.operator === "//=") {
                output.assign(self.left);
                output.print("Math.floor");
                output.with_parens(function() {
                    self.left.print(output);
                    output.space();
                    output.print("/");
                    output.space();
                    self.right.print(output);
                });
                return;
            }
            if (self.left instanceof AST_Array) {
                if (output.option("es6")) {
                    output.with_square(function() {
                        self.left.elements.forEach(function(element, index) {
                            if (index) output.comma();
                            element.print(output);
                        });
                    });
                } else {
                    output.print(output.newTemp("upk"));
                }
            } else {
                self.left.print(output);
            }
            output.space();
            output.print(self.operator);
            output.space();
            if (self.right instanceof AST_New) {
                CREATION.push(self.left);
            }
            self.right.print(output);
            if (self.left instanceof AST_Array) {
                if (!output.option("es6")) {
                    output.end_statement();
                    unpack_tuple(self.left, output, true);
                }
            }
        }
    });
    DEFPRINT(AST_Conditional, function(self, output) {
        self.condition.print(output);
        output.space();
        output.print("?");
        output.space();
        self.consequent.print(output);
        output.space();
        output.colon();
        self.alternative.print(output);
    });
    DEFPRINT(AST_Array, function(self, output) {
        output.with_square(function() {
            var array, len_;
            array = self.elements;
            len_ = array.length;
            if (len_ > 0) {
                output.space();
            }
            array.forEach(function(exp, i) {
                if (i) {
                    output.comma();
                }
                exp.print(output);
            });
            if (len_ > 0) {
                output.space();
            }
        });
    });
    DEFPRINT(AST_Range, function(self, output) {
        var ՐՏitr14, ՐՏidx14;
        var indexes, element, start, end, step;
        indexes = [];
        ՐՏitr14 = ՐՏ_Iterable([ self.left, self.right ]);
        for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
            element = ՐՏitr14[ՐՏidx14];
            if (element instanceof AST_UnaryPrefix && element.operator === "-" && element.expression instanceof AST_Number) {
                indexes.push(parseFloat("-" + element.expression.value));
            } else if (element instanceof AST_Number) {
                indexes.push(parseFloat(element.value));
            } else {
                indexes.push(null);
            }
        }
        if (indexes[0] && indexes[1] && Math.abs(indexes[1] - indexes[0]) < 50) {
            start = indexes[0];
            end = indexes[1];
            step = start < end ? 1 : -1;
            if (self.operator === "to") {
                end += step / 1e6;
            }
            output.with_square(function() {
                var ՐՏitr15, ՐՏidx15;
                var i;
                ՐՏitr15 = ՐՏ_Iterable(range(start, end, step));
                for (ՐՏidx15 = 0; ՐՏidx15 < ՐՏitr15.length; ՐՏidx15++) {
                    i = ՐՏitr15[ՐՏidx15];
                    if (i !== start) {
                        output.comma();
                    }
                    output.print(i);
                }
            });
        } else {
            output.print("range");
            output.with_parens(function() {
                self.left.print(output);
                output.comma();
                if (self.operator === "to") {
                    output.spaced(self.left, "<", self.right, "?", self.right, "+", 1e-6, ":", self.right, "-", 1e-6);
                } else {
                    self.right.print(output);
                }
                output.comma();
                output.spaced(self.left, "<", self.right, "?", "1", ":", "-1");
            });
        }
    });
    DEFPRINT(AST_Object, function(self, output) {
        if (self.properties.length > 0) {
            output.with_block(function() {
                self.properties.forEach(function(prop, i) {
                    if (i) {
                        output.print(",");
                        output.newline();
                    }
                    output.indent();
                    prop.print(output);
                });
                output.newline();
            });
        } else {
            output.print("{}");
        }
    });
    DEFPRINT(AST_ObjectKeyVal, function(self, output) {
        if (self.key instanceof AST_Identifier || self.key instanceof AST_String || self.key instanceof AST_Number || self.key instanceof AST_Boolean) {
            self.key.print(output);
        } else {
            output.with_square(function() {
                self.key.print(output);
            });
        }
        output.colon();
        self.value.print(output);
    });
    AST_Symbol.DEFMETHOD("definition", function() {
        return this.thedef;
    });
    DEFPRINT(AST_Symbol, function(self, output) {
        var def_;
        def_ = self.definition();
        output.print_name(def_ ? def_.mangled_name || def_.name : self.name);
    });
    DEFPRINT(AST_Undefined, function(self, output) {
        output.print("void 0");
    });
    DEFPRINT(AST_Hole, noop);
    DEFPRINT(AST_Infinity, function(self, output) {
        output.print("1/0");
    });
    DEFPRINT(AST_NaN, function(self, output) {
        output.print("0/0");
    });
    DEFPRINT(AST_This, function(self, output) {
        output.print("this");
    });
    DEFPRINT(AST_Constant, function(self, output) {
        output.print(self.getValue());
    });
    DEFPRINT(AST_String, function(self, output) {
        if (ՐՏ_in(self.modifier, "fF")) {
            output.print("`");
            output.print_string(self.getValue(), false);
            output.print("`");
        } else {
            output.print_string(self.getValue());
        }
    });
    DEFPRINT(AST_Verbatim, function(self, output) {
        output.print(self.getValue());
    });
    DEFPRINT(AST_Number, function(self, output) {
        output.print(make_num(self.getValue()));
    });
    DEFPRINT(AST_RegExp, function(self, output) {
        var str_, p;
        str_ = self.getValue().toString();
        if (output.option("ascii_only")) {
            str_ = output.to_ascii(str_);
        }
        output.print(str_);
        p = output.parent();
        if (p instanceof AST_Binary && /^in/.test(p.operator) && p.left === self) {
            output.print(" ");
        }
    });
    function force_statement(stat, output) {
        if (output.option("bracketize")) {
            if (!stat || stat instanceof AST_EmptyStatement) {
                output.print("{}");
            } else if (stat instanceof AST_BlockStatement) {
                stat.print(output);
            } else {
                output.with_block(function() {
                    output.indent();
                    stat.print(output);
                    output.newline();
                });
            }
        } else {
            if (!stat || stat instanceof AST_EmptyStatement) {
                output.force_semicolon();
            } else {
                stat.print(output);
            }
        }
    }
    function first_in_statement(output) {
        var processed, i, node, prev;
        processed = output.stack();
        i = processed.length;
        node = processed[--i];
        prev = processed[--i];
        while (i > 0) {
            if (prev instanceof AST_Statement && prev.body === node) {
                return true;
            }
            if (prev instanceof AST_Seq && prev.car === node || prev instanceof AST_BaseCall && prev.expression === node || prev instanceof AST_Dot && prev.expression === node || prev instanceof AST_Sub && prev.expression === node || prev instanceof AST_Conditional && prev.condition === node || prev instanceof AST_Binary && prev.left === node || prev instanceof AST_UnaryPostfix && prev.expression === node) {
                node = prev;
                prev = processed[--i];
            } else {
                return false;
            }
        }
    }
    function no_constructor_parens(self, output) {
        return self.args.length === 0 && !output.option("beautify");
    }
    function best_of(choices) {
        var best, len_, i;
        best = choices[0];
        len_ = best.length;
        for (i = 1; i < choices.length; i++) {
            if (choices[i].length < len_) {
                best = choices[i];
                len_ = best.length;
            }
        }
        return best;
    }
    function make_num(num) {
        var str_, choices, match;
        str_ = num.toString(10);
        choices = [ str_.replace(/^0\./, ".").replace("e+", "e") ];
        match = null;
        if (Math.floor(num) === num) {
            if (num >= 0) {
                choices.push("0x" + num.toString(16).toLowerCase(), "0" + num.toString(8));
            } else {
                choices.push("-0x" + (-num).toString(16).toLowerCase(), "-0" + (-num).toString(8));
            }
            if (match = /^(.*?)(0+)$/.exec(num)) {
                choices.push(match[1] + "e" + match[2].length);
            }
        } else if (match = /^0?\.(0+)(.*)$/.exec(num)) {
            choices.push(match[2] + "e-" + (match[1].length + match[2].length), str_.substr(str_.indexOf(".")));
        }
        return best_of(choices);
    }
    function make_block(stmt, output) {
        if (stmt instanceof AST_BlockStatement) {
            stmt.print(output);
            return;
        }
        output.with_block(function() {
            output.indent();
            stmt.print(output);
            output.newline();
        });
    }
    function DEFMAP(nodetype, generator) {
        nodetype.DEFMETHOD("add_source_map", function(stream) {
            generator(this, stream);
        });
    }
    DEFMAP(AST_Node, noop);
    function basic_sourcemap_gen(self, output) {
        output.add_mapping(self.start);
    }
    DEFMAP(AST_Directive, basic_sourcemap_gen);
    DEFMAP(AST_Debugger, basic_sourcemap_gen);
    DEFMAP(AST_Symbol, basic_sourcemap_gen);
    DEFMAP(AST_Jump, basic_sourcemap_gen);
    DEFMAP(AST_StatementWithBody, basic_sourcemap_gen);
    DEFMAP(AST_LabeledStatement, noop);
    DEFMAP(AST_Lambda, basic_sourcemap_gen);
    DEFMAP(AST_Switch, basic_sourcemap_gen);
    DEFMAP(AST_SwitchBranch, basic_sourcemap_gen);
    DEFMAP(AST_BlockStatement, basic_sourcemap_gen);
    DEFMAP(AST_Toplevel, noop);
    DEFMAP(AST_New, basic_sourcemap_gen);
    DEFMAP(AST_Try, basic_sourcemap_gen);
    DEFMAP(AST_Catch, basic_sourcemap_gen);
    DEFMAP(AST_Finally, basic_sourcemap_gen);
    DEFMAP(AST_Definitions, basic_sourcemap_gen);
    DEFMAP(AST_Constant, basic_sourcemap_gen);
    DEFMAP(AST_ObjectProperty, function(self, output) {
        output.add_mapping(self.start, self.key);
    });
})();