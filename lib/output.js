"\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under Apache 2.0 license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n  RapydScript source code is originally based on UglifyJS2 (covered\n  by BSD license). UglifyJS2 was written by Mihai Bazon\n  <mihai.bazon@gmail.com>, who is its respective copyright holder.\n\n    Redistribution and use in source and binary forms, with or without\n    modification, are permitted provided that the following conditions\n    are met:\n\n        * Redistributions of source code must retain the above\n          copyright notice, this list of conditions and the following\n          disclaimer.\n\n        * Redistributions in binary form must reproduce the above\n          copyright notice, this list of conditions and the following\n          disclaimer in the documentation and/or other materials\n          provided with the distribution.\n\n    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY\n    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE\n    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,\n    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF\n    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF\n    SUCH DAMAGE.\n\n **********************************************************************\n";
function OutputStream(options) {
    var ՐՏ_Temp, options, indentation, current_col, current_line, current_pos, OUTPUT, IMPORTED, might_need_space, might_need_semicolon, last, requireSemicolonChars, space, indent, with_indent, newline, semicolon, add_mapping, stack;
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
    OUTPUT = "";
    IMPORTED = {};
    function to_ascii(str_, identifier) {
        var ՐՏ_Temp;
        return str_.replace(/[\u0080-\uffff]/g, function(ch) {
            var ՐՏ_Temp, code;
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
    function make_string(str_) {
        var ՐՏ_Temp, dq, sq, str_;
        dq = 0;
        sq = 0;
        str_ = str_.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function(s) {
            var ՐՏ_Temp, tmp_, dq, sq;
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
            } else if (tmp_ === "\"") {
                dq += 1;
                return "\"";
            } else if (tmp_ === "'") {
                sq += 1;
                return "'";
            } else if (tmp_ === "\0") {
                return "\\0";
            }
            return s;
        });
        if (options.ascii_only) {
            str_ = to_ascii(str_);
        }
        if (dq > sq) {
            return "'" + str_.replace(/\x27/g, "\\'") + "'";
        } else {
            return "\"" + str_.replace(/\x22/g, "\\\"") + "\"";
        }
    }
    function encode_string(str_) {
        var ՐՏ_Temp, ret;
        ret = make_string(str_);
        if (options.inline_script) {
            ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
        }
        return ret;
    }
    function make_name(name) {
        var ՐՏ_Temp, name;
        name = name.toString();
        if (options.ascii_only) {
            name = to_ascii(name, true);
        }
        return name;
    }
    function make_indent(back) {
        var ՐՏ_Temp;
        return repeat_string(" ", options.indent_start + indentation - back * options.indent_level);
    }
    might_need_space = false;
    might_need_semicolon = false;
    last = null;
    function last_char() {
        var ՐՏ_Temp;
        return last.charAt(last.length - 1);
    }
    function maybe_newline() {
        var ՐՏ_Temp;
        if (options.max_line_len && current_col > options.max_line_len) {
            print_("\n");
        }
    }
    requireSemicolonChars = makePredicate("( [ + * / - , .");
    function print_(str_) {
        var ՐՏ_Temp, str_, ch, target_line, prev, a, n;
        str_ = String(str_);
        ch = str_.charAt(0);
        if (might_need_semicolon) {
            if ((!ch || !(ՐՏ_in(ch, ";}"))) && !/[;]$/.test(last)) {
                if (options.semicolons || requireSemicolonChars(ch)) {
                    OUTPUT += ";";
                    current_col += 1;
                    current_pos += 1;
                } else {
                    OUTPUT += "\n";
                    current_pos += 1;
                    current_line += 1;
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
                OUTPUT += "\n";
                current_pos += 1;
                current_line += 1;
                current_col = 0;
                might_need_space = false;
            }
        }
        if (might_need_space) {
            prev = last_char();
            if (is_identifier_char(prev) && (is_identifier_char(ch) || ch === "\\") || /^[\+\-\/]$/.test(ch) && ch === prev) {
                OUTPUT += " ";
                current_col += 1;
                current_pos += 1;
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
        OUTPUT += str_;
    }
    space = options.beautify ? function() {
        var ՐՏ_Temp;
        print_(" ");
    } : function() {
        var ՐՏ_Temp;
        might_need_space = true;
    };
    indent = options.beautify ? function(half) {
        var ՐՏ_Temp;
        if (options.beautify) {
            print_(make_indent(half ? .5 : 0));
        }
    } : noop;
    with_indent = options.beautify ? function(col, cont) {
        var ՐՏ_Temp, col, save_indentation, ret;
        if (col === true) {
            col = next_indent();
        }
        save_indentation = indentation;
        indentation = col;
        ret = cont();
        indentation = save_indentation;
        return ret;
    } : function(col, cont) {
        var ՐՏ_Temp;
        return cont();
    };
    newline = options.beautify ? function() {
        var ՐՏ_Temp;
        print_("\n");
    } : noop;
    semicolon = options.beautify ? function() {
        var ՐՏ_Temp;
        print_(";");
    } : function() {
        var ՐՏ_Temp;
        might_need_semicolon = true;
    };
    function force_semicolon() {
        var ՐՏ_Temp;
        might_need_semicolon = false;
        print_(";");
    }
    function next_indent() {
        var ՐՏ_Temp;
        return indentation + options.indent_level;
    }
    function spaced() {
        var ՐՏ_Temp, i, x;
        var ՐՏ_Iter0 = ՐՏ_Iterable(enumerate(arguments));
        for (var ՐՏ_Index0 = 0; ՐՏ_Index0 < ՐՏ_Iter0.length; ՐՏ_Index0++) {
            var ՐՏ_Unpack0 = ՐՏ_Iter0[ՐՏ_Index0];
            i = ՐՏ_Unpack0[0];
            x = ՐՏ_Unpack0[1];
            if (i > 0) {
                space();
            }
            print_(x);
        }
    }
    function end_statement() {
        var ՐՏ_Temp;
        semicolon();
        newline();
    }
    function with_block(cont) {
        var ՐՏ_Temp, ret;
        ret = null;
        print_("{");
        newline();
        with_indent(next_indent(), function() {
            var ՐՏ_Temp;
            ret = cont();
        });
        indent();
        print_("}");
        return ret;
    }
    function with_parens(cont) {
        var ՐՏ_Temp, ret;
        print_("(");
        ret = cont();
        print_(")");
        return ret;
    }
    function with_square(cont) {
        var ՐՏ_Temp, ret;
        print_("[");
        ret = cont();
        print_("]");
        return ret;
    }
    function comma() {
        var ՐՏ_Temp;
        print_(",");
        space();
    }
    function colon() {
        var ՐՏ_Temp;
        print_(":");
        if (options.space_colon) {
            space();
        }
    }
    add_mapping = options.source_map ? function(token, name) {
        var ՐՏ_Temp;
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
    function get() {
        var ՐՏ_Temp;
        return OUTPUT;
    }
    function assign_var(name) {
        var ՐՏ_Temp;
        if (typeof name === "string") {
            print_(name);
        } else {
            name.print(this);
        }
        space();
        print_("=");
        space();
    }
    stack = [];
    return {
        get: get,
        toString: get,
        indent: indent,
        indentation: function() {
            var ՐՏ_Temp;
            return indentation;
        },
        current_width: function() {
            var ՐՏ_Temp;
            return current_col - indentation;
        },
        should_break: function() {
            var ՐՏ_Temp;
            return options.width && this.current_width() >= options.width;
        },
        newline: newline,
        print: print_,
        space: space,
        comma: comma,
        colon: colon,
        last: function() {
            var ՐՏ_Temp;
            return last;
        },
        semicolon: semicolon,
        force_semicolon: force_semicolon,
        to_ascii: to_ascii,
        print_name: function(name) {
            var ՐՏ_Temp;
            print_(make_name(name));
        },
        print_string: function(str_) {
            var ՐՏ_Temp;
            print_(encode_string(str_));
        },
        next_indent: next_indent,
        with_indent: with_indent,
        with_block: with_block,
        with_parens: with_parens,
        spaced: spaced,
        end_statement: end_statement,
        with_square: with_square,
        add_mapping: add_mapping,
        assign: assign_var,
        get_baselib: function(key) {
            var ՐՏ_Temp;
            if (!options.omit_baselib) {
                return options.baselib[key];
            }
            return null;
        },
        "import": function(key) {
            var ՐՏ_Temp;
            if (!IMPORTED.hasOwnProperty(key)) {
                IMPORTED[key] = key;
                return true;
            }
            return false;
        },
        is_main: function() {
            var ՐՏ_Temp;
            return OUTPUT.length === 0;
        },
        option: function(opt) {
            var ՐՏ_Temp;
            return options[opt];
        },
        line: function() {
            var ՐՏ_Temp;
            return current_line;
        },
        col: function() {
            var ՐՏ_Temp;
            return current_col;
        },
        pos: function() {
            var ՐՏ_Temp;
            return current_pos;
        },
        push_node: function(node) {
            var ՐՏ_Temp;
            stack.push(node);
        },
        pop_node: function() {
            var ՐՏ_Temp;
            return stack.pop();
        },
        stack: function() {
            var ՐՏ_Temp;
            return stack;
        },
        tmp_index: 0,
        parent: function(n) {
            var ՐՏ_Temp;
            return stack[stack.length - 2 - (n || 0)];
        }
    };
}
(function() {
    var ՐՏ_Temp, SPECIAL_METHODS, tmp_index, CREATION;
    SPECIAL_METHODS = {
        bind: "ՐՏ_bind",
        rebind_all: "ՐՏ_rebindAll",
        bool: "!!",
        "float": "parseFloat",
        "int": "parseInt",
        mixin: "ՐՏ_mixin",
        print: "ՐՏ_print",
        eslice: "ՐՏ_eslice"
    };
    tmp_index = 0;
    function tempVar(subtype) {
        subtype = subtype === undefined ? "" : subtype;
        var ՐՏ_Temp;
        tmp_index += 1;
        return RAPYD_PREFIX + subtype + tmp_index;
    }
    function DEFPRINT(nodetype, generator) {
        var ՐՏ_Temp;
        nodetype.DEFMETHOD("_codegen", generator);
    }
    AST_Node.DEFMETHOD("print", function(stream, force_parens) {
        var ՐՏ_Temp, self, generator;
        self = this;
        generator = self._codegen;
        stream.push_node(self);
        if (force_parens || self.needs_parens(stream)) {
            stream.with_parens(function() {
                var ՐՏ_Temp;
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
        var ՐՏ_Temp, s;
        s = OutputStream(options);
        this.print(s);
        return s.get();
    });
    AST_Node.DEFMETHOD("add_comments", function(output) {
        var ՐՏ_Temp, c, self, start, comments;
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
                        var ՐՏ_Temp;
                        return c.test(comment.value);
                    });
                } else if (typeof c === "function") {
                    comments = comments.filter(function(comment) {
                        var ՐՏ_Temp;
                        return c(self, comment);
                    });
                }
                comments.forEach(function(c) {
                    var ՐՏ_Temp;
                    if (c.type === "comment:line") {
                        output.print("//" + c.value + "\n");
                        output.indent();
                    } else if (c.type === "comment:multiline") {
                        output.print("/*" + c.value + "*/");
                        if (start.nlb) {
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
        var ՐՏ_Temp;
        nodetype.DEFMETHOD("needs_parens", func);
    }
    PARENS(AST_Node, function() {
        var ՐՏ_Temp;
        return false;
    });
    PARENS(AST_Function, function(output) {
        var ՐՏ_Temp;
        return first_in_statement(output);
    });
    PARENS(AST_Object, function(output) {
        var ՐՏ_Temp;
        return first_in_statement(output);
    });
    PARENS(AST_Unary, function(output) {
        var ՐՏ_Temp, p;
        p = output.parent();
        return p instanceof AST_PropAccess && p.expression === this;
    });
    PARENS(AST_Seq, function(output) {
        var ՐՏ_Temp, p;
        p = output.parent();
        return p instanceof AST_Unary || p instanceof AST_VarDef || p instanceof AST_Dot || p instanceof AST_ObjectProperty || p instanceof AST_Conditional;
    });
    PARENS(AST_Binary, function(output) {
        var ՐՏ_Temp, p, po, pp, so, sp;
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
        var ՐՏ_Temp, p;
        p = output.parent();
        if (p instanceof AST_New && p.expression === this) {
            try {
                this.walk(new TreeWalker(function(node) {
                    var ՐՏ_Temp;
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
        var ՐՏ_Temp, p;
        p = output.parent();
        return p instanceof AST_New && p.expression === this;
    });
    PARENS(AST_New, function(output) {
        var ՐՏ_Temp, p;
        p = output.parent();
        if (no_constructor_parens(this, output) && (p instanceof AST_PropAccess || p instanceof AST_BaseCall && p.expression === this)) {
            return true;
        }
    });
    PARENS(AST_Number, function(output) {
        var ՐՏ_Temp, p;
        p = output.parent();
        if (this.getValue() < 0 && p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    });
    PARENS(AST_NaN, function(output) {
        var ՐՏ_Temp, p;
        p = output.parent();
        if (p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    });
    function assign_and_conditional_paren_rules(output) {
        var ՐՏ_Temp, p;
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
        var ՐՏ_Temp;
        output.print_string(self.value);
        output.semicolon();
    });
    DEFPRINT(AST_Debugger, function(self, output) {
        var ՐՏ_Temp;
        output.print("debugger");
        output.semicolon();
    });
    function display_body(body, is_toplevel, output) {
        var ՐՏ_Temp, last;
        last = body.length - 1;
        body.forEach(function(stmt, i) {
            var ՐՏ_Temp;
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
        var ՐՏ_Temp, arg;
        for (arg in methods) {
            output.indent();
            output.print("this.");
            output.assign(arg);
            output.print("ՐՏ_bind");
            output.with_parens(function() {
                var ՐՏ_Temp;
                output.print("this.");
                output.print(arg);
                output.comma();
                output.print("this");
            });
            output.semicolon();
            output.newline();
        }
    }
    function write_imports(module_, output) {
        var ՐՏ_Temp, imports, import_id, nonlocalvars, module_, name;
        imports = [];
        var ՐՏ_Iter1 = ՐՏ_Iterable(Object.keys(module_.imports));
        for (var ՐՏ_Index1 = 0; ՐՏ_Index1 < ՐՏ_Iter1.length; ՐՏ_Index1++) {
            import_id = ՐՏ_Iter1[ՐՏ_Index1];
            imports.push(module_.imports[import_id]);
        }
        imports.sort(function(a, b) {
            var ՐՏ_Temp, b, a;
            var ՐՏ_Unpack2 = [a.import_order, b.import_order];
            a = ՐՏ_Unpack2[0];
            b = ՐՏ_Unpack2[1];
            return a < b ? -1 : a > b ? 1 : 0;
        });
        if (imports.length > 1) {
            output.indent();
            output.print("var ՐՏ_modules = {};");
            output.newline();
        }
        nonlocalvars = {};
        var ՐՏ_Iter3 = ՐՏ_Iterable(imports);
        for (var ՐՏ_Index3 = 0; ՐՏ_Index3 < ՐՏ_Iter3.length; ՐՏ_Index3++) {
            module_ = ՐՏ_Iter3[ՐՏ_Index3];
            var ՐՏ_Iter4 = ՐՏ_Iterable(module_.nonlocalvars);
            for (var ՐՏ_Index4 = 0; ՐՏ_Index4 < ՐՏ_Iter4.length; ՐՏ_Index4++) {
                name = ՐՏ_Iter4[ՐՏ_Index4];
                nonlocalvars[name] = true;
            }
        }
        nonlocalvars = Object.getOwnPropertyNames(nonlocalvars).join(", ");
        if (nonlocalvars.length) {
            output.indent();
            output.print("var " + nonlocalvars);
            output.semicolon();
            output.newline();
        }
        var ՐՏ_Iter5 = ՐՏ_Iterable(imports);
        for (var ՐՏ_Index5 = 0; ՐՏ_Index5 < ՐՏ_Iter5.length; ՐՏ_Index5++) {
            module_ = ՐՏ_Iter5[ՐՏ_Index5];
            if (module_.module_id !== "__main__") {
                output.indent();
                output.print("ՐՏ_modules[\"");
                output.print(module_.module_id);
                output.print("\"] = {}");
                output.semicolon();
                output.newline();
            }
        }
        var ՐՏ_Iter6 = ՐՏ_Iterable(imports);
        for (var ՐՏ_Index6 = 0; ՐՏ_Index6 < ՐՏ_Iter6.length; ՐՏ_Index6++) {
            module_ = ՐՏ_Iter6[ՐՏ_Index6];
            if (module_.module_id !== "__main__") {
                print_module(module_, output);
            }
        }
    }
    function write_main_name(output) {
        var ՐՏ_Temp;
        if (output.option("write_name")) {
            output.newline();
            output.indent();
            output.print("var __name__ = \"__main__\"");
            output.semicolon();
            output.newline();
        }
    }
    function display_complex_body(node, is_toplevel, output) {
        var ՐՏ_Temp, offset, arg;
        offset = 0;
        if (node instanceof AST_Method && !node.static) {
            output.indent();
            output.print("var");
            output.space();
            output.assign(node.argnames[0]);
            output.print("this");
            output.semicolon();
            output.newline();
            offset += 1;
        }
        if (node instanceof AST_Scope) {
            if (node.argnames) {
                if (node.argnames.starargs) {
                    output.indent();
                    output.print("var");
                    output.space();
                    output.assign(node.argnames.starargs);
                    output.print("[].slice.call");
                    output.with_parens(function() {
                        var ՐՏ_Temp;
                        output.print("arguments");
                        output.comma();
                        output.print(node.argnames.length - offset);
                    });
                    output.semicolon();
                    output.newline();
                }
                if (!output.option("es6")) {
                    for (arg in node.argnames.defaults) {
                        output.indent();
                        output.assign(arg);
                        output.print(arg);
                        output.space();
                        output.print("===");
                        output.space();
                        output.print("undefined");
                        output.space();
                        output.print("?");
                        output.space();
                        force_statement(node.argnames.defaults[arg], output);
                        output.space();
                        output.colon();
                        output.print(arg);
                        output.semicolon();
                        output.newline();
                    }
                }
            }
            if (output.option("auto_bind") && node.name && node.name.name === "__init__") {
                output.indent();
                output.print("ՐՏ_rebindAll");
                output.with_parens(function() {
                    var ՐՏ_Temp;
                    output.print("this");
                    output.comma();
                    output.print("true");
                });
                output.semicolon();
                output.newline();
                bind_methods(node.bound, output);
            }
            declare_vars(node.localvars, output);
        } else if (node instanceof AST_Except) {
            if (node.argname) {
                output.indent();
                output.print("var");
                output.space();
                output.assign(node.argname);
                output.print("ՐՏ_Exception");
                output.semicolon();
                output.newline();
            }
        }
        display_body(node.body, is_toplevel, output);
    }
    function declare_vars(vars, output) {
        var ՐՏ_Temp;
        if (vars.length) {
            output.indent();
            output.print("var");
            output.space();
            vars.forEach(function(arg, i) {
                var ՐՏ_Temp;
                if (i) {
                    output.comma();
                }
                arg.print(output);
            });
            output.semicolon();
            output.newline();
        }
    }
    function declare_exports(module_id, exports, submodules, output) {
        var ՐՏ_Temp, seen, symbol, sub_module_id, key;
        seen = {};
        var ՐՏ_Iter7 = ՐՏ_Iterable(exports);
        for (var ՐՏ_Index7 = 0; ՐՏ_Index7 < ՐՏ_Iter7.length; ՐՏ_Index7++) {
            symbol = ՐՏ_Iter7[ՐՏ_Index7];
            output.newline();
            output.indent();
            output.print("ՐՏ_modules[\"" + module_id + "\"][\"" + symbol.name + "\"] = " + symbol.name);
            seen[symbol.name] = true;
            output.semicolon();
            output.newline();
        }
        var ՐՏ_Iter8 = ՐՏ_Iterable(submodules);
        for (var ՐՏ_Index8 = 0; ՐՏ_Index8 < ՐՏ_Iter8.length; ՐՏ_Index8++) {
            sub_module_id = ՐՏ_Iter8[ՐՏ_Index8];
            if (!seen.hasOwnProperty(module_id)) {
                key = sub_module_id.split(".")[sub_module_id.split(".").length-1];
                output.newline();
                output.indent();
                output.print("ՐՏ_modules[\"" + module_id + "\"][\"" + key + "\"] = ");
                output.print("ՐՏ_modules[\"" + sub_module_id + "\"]");
                output.semicolon();
                output.newline();
            }
        }
    }
    function unpack_tuple(tuple, output, in_statement) {
        var ՐՏ_Temp;
        tuple.elements.forEach(function(elem, i) {
            var ՐՏ_Temp;
            output.indent();
            output.assign(elem);
            output.print("ՐՏ_Unpack" + output.tmp_index);
            output.with_square(function() {
                var ՐՏ_Temp;
                output.print(i);
            });
            if (!in_statement || i < tuple.elements.length - 1) {
                output.semicolon();
                output.newline();
            }
        });
    }
    AST_StatementWithBody.DEFMETHOD("_do_print_body", function(output) {
        var ՐՏ_Temp;
        force_statement(this.body, output);
    });
    DEFPRINT(AST_Statement, function(self, output) {
        var ՐՏ_Temp;
        self.body.print(output);
        output.semicolon();
    });
    DEFPRINT(AST_Toplevel, function(self, output) {
        var ՐՏ_Temp, is_main;
        is_main = output.is_main();
        if (output.option("private_scope") && is_main) {
            output.with_parens(function() {
                var ՐՏ_Temp;
                output.print("function()");
                output.with_block(function() {
                    var ՐՏ_Temp;
                    output.indent();
                    output.print("\"use strict\"");
                    output.semicolon();
                    output.newline();
                    output.indent();
                    output.print("var ՐՏ_Temp");
                    output.semicolon();
                    output.newline();
                    Object.keys(self.baselib).forEach(function(key) {
                        var ՐՏ_Temp, splat;
                        splat = output.get_baselib(key);
                        if (splat) {
                            splat.print(output);
                        }
                    });
                    write_imports(self, output);
                    output.newline();
                    output.indent();
                    output.with_parens(function() {
                        var ՐՏ_Temp;
                        output.print("function()");
                        output.with_block(function() {
                            var ՐՏ_Temp;
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
                    var ՐՏ_Temp, splat;
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
        var ՐՏ_Temp;
        output.newline();
        output.indent();
        output.with_parens(function() {
            var ՐՏ_Temp;
            output.print("function()");
            output.with_block(function() {
                var ՐՏ_Temp;
                output.indent();
                output.print("var ");
                output.assign("__name__");
                output.print("\"" + self.module_id + "\"");
                output.semicolon();
                output.newline();
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
                declare_exports(self.module_id, self.exports, self.submodules, output);
            });
        });
        output.print("()");
        output.semicolon();
        output.newline();
    }
    DEFPRINT(AST_Splat, function(self, output) {
        var ՐՏ_Temp;
        if (output.import(self.module.name)) {
            display_body(self.body.body, true, output);
            output.newline();
        }
    });
    DEFPRINT(AST_Imports, function(container, output) {
        var ՐՏ_Temp, self, argname, alias, bound_name;
        function add_aname(aname, key, from_import) {
            var ՐՏ_Temp;
            output.print("var ");
            output.assign(aname);
            output.print("ՐՏ_modules[\"");
            output.print(key);
            output.print("\"]");
            if (from_import) {
                output.print(".");
                output.print(from_import);
            }
            output.semicolon();
            output.newline();
            output.indent();
        }
        var ՐՏ_Iter9 = ՐՏ_Iterable(container.imports);
        for (var ՐՏ_Index9 = 0; ՐՏ_Index9 < ՐՏ_Iter9.length; ՐՏ_Index9++) {
            self = ՐՏ_Iter9[ՐՏ_Index9];
            output.import(self.module.name);
            if (self.argnames) {
                var ՐՏ_Iter10 = ՐՏ_Iterable(self.argnames);
                for (var ՐՏ_Index10 = 0; ՐՏ_Index10 < ՐՏ_Iter10.length; ՐՏ_Index10++) {
                    argname = ՐՏ_Iter10[ՐՏ_Index10];
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
        var ՐՏ_Temp;
        self.label.print(output);
        output.colon();
        self.body.print(output);
    });
    DEFPRINT(AST_SimpleStatement, function(self, output) {
        var ՐՏ_Temp;
        if (!(self.body instanceof AST_EmptyStatement)) {
            self.body.print(output);
            output.semicolon();
        }
    });
    function print_bracketed(node, output, complex) {
        var ՐՏ_Temp;
        if (node.body.length > 0) {
            output.with_block(function() {
                var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        print_bracketed(self, output);
    });
    DEFPRINT(AST_EmptyStatement, function(self, output) {
        var ՐՏ_Temp;
    });
    DEFPRINT(AST_Do, function(self, output) {
        var ՐՏ_Temp;
        output.print("do");
        output.space();
        self._do_print_body(output);
        output.space();
        output.print("while");
        output.space();
        output.with_parens(function() {
            var ՐՏ_Temp;
            self.condition.print(output);
        });
        output.semicolon();
    });
    DEFPRINT(AST_While, function(self, output) {
        var ՐՏ_Temp;
        output.print("while");
        output.space();
        output.with_parens(function() {
            var ՐՏ_Temp;
            self.condition.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    function is_simple_for_in(self) {
        var ՐՏ_Temp;
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "dir" && self.object.args.length === 1) {
            return true;
        }
        return false;
    }
    function is_simple_for(self) {
        var ՐՏ_Temp;
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "range" && !(self.init instanceof AST_Array) && (self.object.args.length < 3 || self.object.args[self.object.args.length-1][0] instanceof AST_Number || self.object.args[self.object.args.length-1][0] instanceof AST_Unary && self.object.args[self.object.args.length-1][0].operator === "-" && self.object.args[self.object.args.length-1][0].expression instanceof AST_Number)) {
            return true;
        }
        return false;
    }
    AST_ForIn.DEFMETHOD("_do_print_body", function(output) {
        var ՐՏ_Temp, self;
        self = this;
        output.with_block(function() {
            var ՐՏ_Temp, iterator, index, unpack;
            if (!(is_simple_for(self) || is_simple_for_in(self))) {
                output.indent();
                iterator = "ՐՏ_Iter" + output.tmp_index;
                index = "ՐՏ_Index" + output.tmp_index;
                if (self.init instanceof AST_Array) {
                    if (output.option("es6")) {
                        output.with_square(function() {
                            var ՐՏ_Temp;
                            self.init.elements.forEach(function(element, index) {
                                var ՐՏ_Temp;
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
                        unpack = "ՐՏ_Unpack" + output.tmp_index;
                        output.assign("var " + unpack);
                        output.print(iterator + "[" + index + "];");
                        output.newline();
                        unpack_tuple(self.init, output);
                    }
                } else {
                    output.assign(self.init);
                    output.print(iterator + "[" + index + "];");
                    output.newline();
                }
                output.tmp_index += 1;
            }
            self.body.body.forEach(function(stmt, i) {
                var ՐՏ_Temp;
                output.indent();
                stmt.print(output);
                output.newline();
            });
        });
    });
    DEFPRINT(AST_ForIn, function(self, output) {
        var ՐՏ_Temp, increment, args, tmp_, start, end;
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
                var ՐՏ_Temp;
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
                var ՐՏ_Temp;
                self.init.print(output);
                output.space();
                output.print("in");
                output.space();
                self.object.args[0].print(output);
            });
        } else {
            output.assign("var ՐՏ_Iter" + output.tmp_index);
            output.print("ՐՏ_Iterable");
            output.with_parens(function() {
                var ՐՏ_Temp;
                self.object.print(output);
            });
            output.semicolon();
            output.newline();
            output.indent();
            output.print("for");
            output.space();
            output.with_parens(function() {
                var ՐՏ_Temp;
                output.print("var");
                output.space();
                output.assign("ՐՏ_Index" + output.tmp_index);
                output.print("0");
                output.semicolon();
                output.space();
                output.print("ՐՏ_Index" + output.tmp_index);
                output.space();
                output.print("<");
                output.space();
                output.print("ՐՏ_Iter" + output.tmp_index + ".length");
                output.semicolon();
                output.space();
                output.print("ՐՏ_Index" + output.tmp_index + "++");
            });
        }
        output.space();
        self._do_print_body(output);
    });
    AST_ForJS.DEFMETHOD("_do_print_body", function(output) {
        var ՐՏ_Temp, self;
        self = this;
        output.with_block(function() {
            var ՐՏ_Temp;
            self.body.body.forEach(function(stmt, i) {
                var ՐՏ_Temp;
                output.indent();
                stmt.print(output);
                output.newline();
            });
        });
    });
    DEFPRINT(AST_ForJS, function(self, output) {
        var ՐՏ_Temp;
        output.print("for");
        output.space();
        output.with_parens(function() {
            var ՐՏ_Temp;
            self.condition.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    DEFPRINT(AST_ListComprehension, function(self, output) {
        var ՐՏ_Temp, constructor, add_entry;
        constructor = {
            "ListComprehension": "[]",
            "DictComprehension": "{}"
        }[self.TYPE];
        if (self instanceof AST_DictComprehension) {
            add_entry = function() {
                var ՐՏ_Temp;
                output.indent();
                output.print("ՐՏ_Result");
                output.with_square(function() {
                    var ՐՏ_Temp;
                    self.statement.print(output);
                });
                output.space();
                output.print("=");
                output.space();
                self.value_statement.print(output);
                output.semicolon();
                output.newline();
            };
        } else {
            add_entry = function() {
                var ՐՏ_Temp;
                output.indent();
                output.print("ՐՏ_Result.push");
                output.with_parens(function() {
                    var ՐՏ_Temp;
                    self.statement.print(output);
                });
                output.semicolon();
                output.newline();
            };
        }
        output.with_parens(function() {
            var ՐՏ_Temp;
            output.print("function");
            output.print("()");
            output.space();
            output.with_block(function() {
                var ՐՏ_Temp;
                output.indent();
                output.assign("var ՐՏ_Iter");
                output.print("ՐՏ_Iterable");
                output.with_parens(function() {
                    var ՐՏ_Temp;
                    self.object.print(output);
                });
                output.comma();
                output.assign("ՐՏ_Result");
                output.print(constructor);
                if (self.init instanceof AST_Array) {
                    self.init.elements.forEach(function(i) {
                        var ՐՏ_Temp;
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
                    var ՐՏ_Temp;
                    output.print("var");
                    output.space();
                    output.assign("ՐՏ_Index");
                    output.print("0");
                    output.semicolon();
                    output.space();
                    output.print("ՐՏ_Index");
                    output.space();
                    output.print("<");
                    output.space();
                    output.print("ՐՏ_Iter.length");
                    output.semicolon();
                    output.space();
                    output.print("ՐՏ_Index++");
                });
                output.space();
                output.with_block(function() {
                    var ՐՏ_Temp;
                    output.indent();
                    if (self.init instanceof AST_Array) {
                        if (output.option("es6")) {
                            output.with_square(function() {
                                var ՐՏ_Temp;
                                self.left.elements.forEach(function(element, index) {
                                    var ՐՏ_Temp;
                                    if (index) output.comma();
                                    element.print(output);
                                });
                            });
                            output.comma();
                            output.print("=");
                            output.comma();
                        } else {
                            output.assign("var ՐՏ_Unpack" + output.tmp_index);
                        }
                        output.print("ՐՏ_Iter[ՐՏ_Index];");
                        output.newline();
                        if (!output.option("es6")) {
                            unpack_tuple(self.init, output);
                        }
                        output.tmp_index += 1;
                    } else {
                        output.assign(self.init);
                        output.print("ՐՏ_Iter[ՐՏ_Index];");
                        output.newline();
                    }
                    if (self.condition) {
                        output.indent();
                        output.print("if");
                        output.space();
                        output.with_parens(function() {
                            var ՐՏ_Temp;
                            self.condition.print(output);
                        });
                        output.space();
                        output.with_block(function() {
                            var ՐՏ_Temp;
                            add_entry();
                        });
                        output.newline();
                    } else {
                        add_entry();
                    }
                });
                output.newline();
                output.indent();
                output.print("return ՐՏ_Result");
                output.semicolon();
                output.newline();
            });
        });
        output.print("()");
    });
    DEFPRINT(AST_With, function(self, output) {
        var ՐՏ_Temp;
        output.print("with");
        output.space();
        output.with_parens(function() {
            var ՐՏ_Temp;
            self.expression.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    function decorate(decorators, output, internalsub) {
        var ՐՏ_Temp, pos, wrap;
        pos = 0;
        wrap = function() {
            var ՐՏ_Temp;
            if (pos < decorators.length) {
                decorators[pos].expression.print(output);
                pos += 1;
                output.with_parens(function() {
                    var ՐՏ_Temp;
                    wrap();
                });
            } else {
                internalsub();
            }
        };
        wrap();
    }
    AST_Lambda.DEFMETHOD("_do_print", function(output, nokeyword) {
        var ՐՏ_Temp, self;
        self = this;
        function internalsub() {
            var ՐՏ_Temp;
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
                var ՐՏ_Temp;
                self.argnames.forEach(function(arg, i) {
                    var ՐՏ_Temp;
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
                    if (argnames.length) {
                        output.comma();
                    }
                    output.print("ՐՏ_kw");
                }
            });
            output.space();
            print_bracketed(self, output, true);
        }
        if (self.decorators && self.decorators.length) {
            output.print("var");
            output.space();
            output.assign(self.name.name);
            decorate(self.decorators, output, internalsub);
            output.semicolon();
        } else {
            internalsub();
        }
    });
    DEFPRINT(AST_Lambda, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output);
    });
    AST_Class.DEFMETHOD("_do_print", function(output) {
        var ՐՏ_Temp, self, class_def, define_method;
        self = this;
        if (self.external) {
            return;
        }
        class_def = function(method) {
            var ՐՏ_Temp;
            output.indent();
            self.name.print(output);
            if (method && ՐՏ_in(method, self.static)) {
                output.assign("." + method);
            } else {
                output.assign(".prototype" + (method ? "." + method : ""));
            }
        };
        define_method = function(stmt) {
            var ՐՏ_Temp, name;
            name = stmt.name.name;
            class_def(name);
            function internalsub() {
                var ՐՏ_Temp;
                output.print("function");
                output.space();
                output.print(name);
                output.with_parens(function() {
                    var ՐՏ_Temp;
                    stmt.argnames.forEach(function(arg, i) {
                        var ՐՏ_Temp, i;
                        if (ՐՏ_in(name, self.static)) {
                            i += 1;
                        }
                        if (i > 1) {
                            output.comma();
                        }
                        if (i) {
                            arg.print(output);
                        }
                    });
                    if (self.kwargs) {
                        if (argnames.length) {
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
            output.semicolon();
            output.newline();
        };
        function internalsub() {
            var ՐՏ_Temp;
            if (self.init || self.parent) {
                output.print("function");
                output.space();
                self.name.print(output);
                output.print("()");
                output.space();
                output.with_block(function() {
                    var ՐՏ_Temp, cname;
                    bind_methods(self.bound, output);
                    output.indent();
                    cname = self.name ? self.name : self.parent;
                    cname.print(output);
                    output.print(".prototype.__init__.apply");
                    output.with_parens(function() {
                        var ՐՏ_Temp;
                        output.print("this");
                        output.comma();
                        output.print("arguments");
                    });
                    output.semicolon();
                    output.newline();
                });
            } else {
                output.print("function");
                output.space();
                self.name.print(output);
                output.print("()");
                output.space();
                output.with_block(function() {
                    var ՐՏ_Temp;
                    bind_methods(self.bound, output);
                });
            }
        }
        if (self.decorators && self.decorators.length) {
            output.print("var ");
            output.assign(self.name);
            decorate(self.decorators, output, internalsub);
            output.semicolon();
        } else {
            internalsub();
        }
        output.newline();
        if (self.parent) {
            output.indent();
            output.print("ՐՏ_extends");
            output.with_parens(function() {
                var ՐՏ_Temp;
                self.name.print(output);
                output.comma();
                self.parent.print(output);
            });
            output.semicolon();
            output.newline();
        }
        self.statements.forEach(function(stmt) {
            var ՐՏ_Temp;
            output.indent();
            stmt.print(output);
            output.newline();
        });
        self.body.forEach(function(stmt, i) {
            var ՐՏ_Temp;
            if (stmt instanceof AST_Method) {
                define_method(stmt);
            } else if (stmt instanceof AST_Class) {
                console.error("Nested classes aren't supported yet");
            }
        });
    });
    DEFPRINT(AST_Class, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output);
    });
    DEFPRINT(AST_SymbolClassRef, function(self, output) {
        var ՐՏ_Temp;
        self.class.print(output);
        output.print(".prototype.");
        output.print(self.name);
    });
    AST_Exit.DEFMETHOD("_do_print", function(output, kind) {
        var ՐՏ_Temp, self;
        self = this;
        output.print(kind);
        if (self.value) {
            output.space();
            self.value.print(output);
        }
        output.semicolon();
    });
    DEFPRINT(AST_Return, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output, "return");
    });
    DEFPRINT(AST_Yield, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output, "yield");
    });
    DEFPRINT(AST_Throw, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output, "throw");
    });
    AST_LoopControl.DEFMETHOD("_do_print", function(output, kind) {
        var ՐՏ_Temp;
        output.print(kind);
        if (this.label) {
            output.space();
            this.label.print(output);
        }
        output.semicolon();
    });
    DEFPRINT(AST_Break, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output, "break");
    });
    DEFPRINT(AST_Continue, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output, "continue");
    });
    function make_then(self, output) {
        var ՐՏ_Temp, b;
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
        b = self.body;
        while (true) {
            if (b instanceof AST_If) {
                if (!b.alternative) {
                    make_block(self.body, output);
                    return;
                }
                b = b.alternative;
            } else if (b instanceof AST_StatementWithBody) {
                b = b.body;
            } else {
                break;
            }
        }
        force_statement(self.body, output);
    }
    DEFPRINT(AST_If, function(self, output) {
        var ՐՏ_Temp;
        output.print("if");
        output.space();
        output.with_parens(function() {
            var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        output.print("switch");
        output.space();
        output.with_parens(function() {
            var ՐՏ_Temp;
            self.expression.print(output);
        });
        output.space();
        if (self.body.length > 0) {
            output.with_block(function() {
                var ՐՏ_Temp;
                self.body.forEach(function(stmt, i) {
                    var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        if (this.body.length > 0) {
            output.newline();
            this.body.forEach(function(stmt) {
                var ՐՏ_Temp;
                output.indent();
                stmt.print(output);
                output.newline();
            });
        }
    });
    DEFPRINT(AST_Default, function(self, output) {
        var ՐՏ_Temp;
        output.print("default:");
        self._do_print_body(output);
    });
    DEFPRINT(AST_Case, function(self, output) {
        var ՐՏ_Temp;
        output.print("case");
        output.space();
        self.expression.print(output);
        output.print(":");
        self._do_print_body(output);
    });
    DEFPRINT(AST_Try, function(self, output) {
        var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        output.print("catch");
        output.space();
        output.with_parens(function() {
            var ՐՏ_Temp;
            output.print("ՐՏ_Exception");
        });
        output.space();
        if (self.body.length > 1 || self.body[0].errors.length) {
            output.with_block(function() {
                var ՐՏ_Temp, no_default;
                output.indent();
                no_default = true;
                self.body.forEach(function(exception, i) {
                    var ՐՏ_Temp, no_default;
                    if (i) {
                        output.print("else ");
                    }
                    if (exception.errors.length) {
                        output.print("if");
                        output.space();
                        output.with_parens(function() {
                            var ՐՏ_Temp;
                            exception.errors.forEach(function(err, i) {
                                var ՐՏ_Temp;
                                if (i) {
                                    output.newline();
                                    output.indent();
                                    output.print("||");
                                    output.space();
                                }
                                output.print("ՐՏ_Exception");
                                output.space();
                                output.print("instanceof");
                                output.space();
                                err.print(output);
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
                        var ՐՏ_Temp;
                        output.indent();
                        output.print("throw");
                        output.space();
                        output.print("ՐՏ_Exception");
                        output.semicolon();
                        output.newline();
                    });
                }
                output.newline();
            });
        } else {
            print_bracketed(self.body[0], output, true);
        }
    });
    DEFPRINT(AST_Finally, function(self, output) {
        var ՐՏ_Temp;
        output.print("finally");
        output.space();
        print_bracketed(self, output);
    });
    AST_Definitions.DEFMETHOD("_do_print", function(output, kind) {
        var ՐՏ_Temp, p, in_for, avoid_semicolon;
        output.print(kind);
        output.space();
        this.definitions.forEach(function(def_, i) {
            var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        self._do_print(output, "var");
    });
    DEFPRINT(AST_Const, function(self, output) {
        var ՐՏ_Temp;
        self._do_print(output, "const");
    });
    function parenthesize_for_noin(node, output, noin) {
        var ՐՏ_Temp;
        if (!noin) {
            node.print(output);
        } else {
            try {
                node.walk(new TreeWalker(function(node) {
                    var ՐՏ_Temp;
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
        var ՐՏ_Temp, p, noin;
        self.name.print(output);
        if (self.value) {
            output.assign("");
            p = output.parent(1);
            noin = p instanceof AST_ForIn;
            parenthesize_for_noin(self.value, output, noin);
        }
    });
    CREATION = [];
    DEFPRINT(AST_BaseCall, function(self, output) {
        var ՐՏ_Temp, call_format, object, has_kwarg_items, has_kwarg_formals, has_kwargs, obj, output_kwargs;
        call_format = function() {
            var ՐՏ_Temp, rename;
            if (self instanceof AST_ClassCall) {
                if (self.static) {
                    self.class.print(output);
                    output.print(".");
                    output.print(self.method);
                } else {
                    self.class.print(output);
                    output.print(".prototype.");
                    output.print(self.method);
                    output.print(".call");
                }
            } else {
                rename = SPECIAL_METHODS.hasOwnProperty(self.expression.name) ? SPECIAL_METHODS[self.expression.name] : undefined;
                if (rename) {
                    output.print(rename);
                } else {
                    self.expression.print(output);
                }
            }
        };
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
            if (self instanceof AST_New) {
                call_format();
                output.semicolon();
                output.newline();
                output.indent();
                if (has_kwargs) {
                    output.print("kwargs");
                    output.with_parens(function() {
                        var ՐՏ_Temp;
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
                    var ՐՏ_Temp;
                    call_format();
                });
            } else {
                call_format();
            }
        } else {
            call_format();
        }
        output_kwargs = function() {
            var ՐՏ_Temp;
            if (has_kwarg_items) {
                self.args.kwarg_items.forEach(function(kwname, i) {
                    var ՐՏ_Temp;
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
                    var ՐՏ_Temp;
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
        if (self.args.starargs) {
            output.print(".apply");
            output.with_parens(function() {
                var ՐՏ_Temp;
                obj.print(output);
                output.comma();
                if (self.args.length > 1) {
                    output.with_square(function() {
                        var ՐՏ_Temp;
                        self.args.slice(0, -1).forEach(function(expr, i) {
                            var ՐՏ_Temp;
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
                        var ՐՏ_Temp;
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
                var ՐՏ_Temp, arg;
                obj.print(output);
                var ՐՏ_Iter11 = ՐՏ_Iterable(self.args);
                for (var ՐՏ_Index11 = 0; ՐՏ_Index11 < ՐՏ_Iter11.length; ՐՏ_Index11++) {
                    arg = ՐՏ_Iter11[ՐՏ_Index11];
                    output.comma();
                    arg.print(output);
                }
                output.comma();
                output_kwargs();
            });
        } else {
            output.with_parens(function() {
                var ՐՏ_Temp;
                self.args.forEach(function(expr, i) {
                    var ՐՏ_Temp;
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
    });
    DEFPRINT(AST_New, function(self, output) {
        var ՐՏ_Temp;
        output.print("new");
        output.space();
        AST_BaseCall.prototype._codegen(self, output);
    });
    AST_Seq.DEFMETHOD("_do_print", function(output) {
        var ՐՏ_Temp, self, p, print_seq;
        self = this;
        p = output.parent();
        print_seq = function() {
            var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        self._do_print(output);
    });
    DEFPRINT(AST_Dot, function(self, output) {
        var ՐՏ_Temp, expr;
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
        var ՐՏ_Temp;
        self.expression.print(output);
        output.print("[");
        if (self.property instanceof AST_Unary && self.property.operator === "-" && self.property.expression instanceof AST_Number) {
            self.expression.print(output);
            output.print(".length");
        }
        self.property.print(output);
        output.print("]");
    });
    DEFPRINT(AST_Splice, function(self, output) {
        var ՐՏ_Temp;
        output.print("[].splice.apply");
        output.with_parens(function() {
            var ՐՏ_Temp;
            self.expression.print(output);
            output.comma();
            output.with_square(function() {
                var ՐՏ_Temp;
                self.property.print(output);
                output.comma();
                self.property2.print(output);
                output.print("-");
                self.property.print(output);
            });
            output.print(".concat");
            output.with_parens(function() {
                var ՐՏ_Temp;
                self.assignment.print(output);
            });
        });
    });
    DEFPRINT(AST_UnaryPrefix, function(self, output) {
        var ՐՏ_Temp, op;
        op = self.operator;
        output.print(op);
        if (/^[a-z]/i.test(op)) {
            output.space();
        }
        self.expression.print(output);
    });
    DEFPRINT(AST_UnaryPostfix, function(self, output) {
        var ՐՏ_Temp;
        self.expression.print(output);
        output.print(self.operator);
    });
    DEFPRINT(AST_Binary, function(self, output) {
        var ՐՏ_Temp, comparators, function_ops, normalize, operator, leftvar;
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
            var ՐՏ_Temp;
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
                var ՐՏ_Temp;
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
                    var ՐՏ_Temp;
                    output.assign("ՐՏ_Temp");
                    self.left.right.print(output);
                    leftvar = "ՐՏ_Temp";
                });
            }
            output.space();
            output.print("&&");
            output.space();
            output.print(leftvar);
            output.space();
            output.print(operator);
            output.space();
            self.right.print(output);
        } else {
            operator = normalize(self.operator);
            self.left.print(output);
            output.space();
            output.print(operator);
            output.space();
            self.right.print(output);
        }
    });
    DEFPRINT(AST_DeepEquality, function(self, output) {
        var ՐՏ_Temp;
        output.with_parens(function() {
            var ՐՏ_Temp;
            if (self.operator === "==") {
                self.left.print(output);
                output.space();
                output.print("===");
                output.space();
                self.right.print(output);
                output.space();
                output.print("||");
                output.space();
                output.print("typeof ");
                self.left.print(output);
                output.space();
                output.print("===");
                output.space();
                output.print("\"object\"");
                output.space();
                output.print("&&");
                output.space();
                output.print("ՐՏ_eq");
                output.with_parens(function() {
                    var ՐՏ_Temp;
                    self.left.print(output);
                    output.comma();
                    self.right.print(output);
                });
            } else {
                self.left.print(output);
                output.space();
                output.print("!==");
                output.space();
                self.right.print(output);
                output.space();
                output.print("&&");
                output.space();
                output.with_parens(function() {
                    var ՐՏ_Temp;
                    output.print("typeof ");
                    self.left.print(output);
                    output.space();
                    output.print("!==");
                    output.space();
                    output.print("\"object\"");
                    output.space();
                    output.print("||");
                    output.space();
                    output.print("!ՐՏ_eq");
                    output.with_parens(function() {
                        var ՐՏ_Temp;
                        self.left.print(output);
                        output.comma();
                        self.right.print(output);
                    });
                });
            }
        });
    });
    DEFPRINT(AST_Assign, function(self, output) {
        var ՐՏ_Temp;
        if (self.operator === "//=") {
            output.assign(self.left);
            output.print("Math.floor");
            output.with_parens(function() {
                var ՐՏ_Temp;
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
                    var ՐՏ_Temp;
                    self.left.elements.forEach(function(element, index) {
                        var ՐՏ_Temp;
                        if (index) output.comma();
                        element.print(output);
                    });
                });
            } else {
                output.print("var ՐՏ_Unpack" + output.tmp_index);
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
                output.semicolon();
                output.newline();
                unpack_tuple(self.left, output, true);
            }
            output.tmp_index += 1;
        }
    });
    DEFPRINT(AST_Conditional, function(self, output) {
        var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        output.with_square(function() {
            var ՐՏ_Temp, a, len_;
            a = self.elements;
            len_ = a.length;
            if (len_ > 0) {
                output.space();
            }
            a.forEach(function(exp, i) {
                var ՐՏ_Temp;
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
    DEFPRINT(AST_Object, function(self, output) {
        var ՐՏ_Temp;
        if (self.properties.length > 0) {
            output.with_block(function() {
                var ՐՏ_Temp;
                self.properties.forEach(function(prop, i) {
                    var ՐՏ_Temp;
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
        var ՐՏ_Temp, key;
        key = self.key;
        if (self.quoted) {
            output.print_string(key + "");
        } else if ((typeof key === "number" || !output.option("beautify") && +key + "" === key) && parseFloat(key) >= 0) {
            output.print(make_num(key));
        } else if (!is_identifier(key)) {
            output.print_string(key);
        } else {
            output.print_name(key);
        }
        output.colon();
        self.value.print(output);
    });
    DEFPRINT(AST_ObjectSetter, function(self, output) {
        var ՐՏ_Temp;
        output.print("set");
        self.value._do_print(output, true);
    });
    DEFPRINT(AST_ObjectGetter, function(self, output) {
        var ՐՏ_Temp;
        output.print("get");
        self.value._do_print(output, true);
    });
    AST_Symbol.DEFMETHOD("definition", function() {
        var ՐՏ_Temp;
        return this.thedef;
    });
    DEFPRINT(AST_Symbol, function(self, output) {
        var ՐՏ_Temp, def_;
        def_ = self.definition();
        output.print_name(def_ ? def_.mangled_name || def_.name : self.name);
    });
    DEFPRINT(AST_Undefined, function(self, output) {
        var ՐՏ_Temp;
        output.print("void 0");
    });
    DEFPRINT(AST_Hole, noop);
    DEFPRINT(AST_Infinity, function(self, output) {
        var ՐՏ_Temp;
        output.print("1/0");
    });
    DEFPRINT(AST_NaN, function(self, output) {
        var ՐՏ_Temp;
        output.print("0/0");
    });
    DEFPRINT(AST_This, function(self, output) {
        var ՐՏ_Temp;
        output.print("this");
    });
    DEFPRINT(AST_Constant, function(self, output) {
        var ՐՏ_Temp;
        output.print(self.getValue());
    });
    DEFPRINT(AST_String, function(self, output) {
        var ՐՏ_Temp;
        output.print_string(self.getValue());
    });
    DEFPRINT(AST_Verbatim, function(self, output) {
        var ՐՏ_Temp;
        output.print(self.getValue());
    });
    DEFPRINT(AST_Number, function(self, output) {
        var ՐՏ_Temp;
        output.print(make_num(self.getValue()));
    });
    DEFPRINT(AST_RegExp, function(self, output) {
        var ՐՏ_Temp, str_, p;
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
        var ՐՏ_Temp;
        if (output.option("bracketize")) {
            if (!stat || stat instanceof AST_EmptyStatement) {
                output.print("{}");
            } else if (stat instanceof AST_BlockStatement) {
                stat.print(output);
            } else {
                output.with_block(function() {
                    var ՐՏ_Temp;
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
        var ՐՏ_Temp, a, i, node, p;
        a = output.stack();
        i = a.length;
        node = a[i -= 1];
        p = a[i -= 1];
        while (i > 0) {
            if (p instanceof AST_Statement && p.body === node) {
                return true;
            }
            if (p instanceof AST_Seq && p.car === node || p instanceof AST_BaseCall && p.expression === node || p instanceof AST_Dot && p.expression === node || p instanceof AST_Sub && p.expression === node || p instanceof AST_Conditional && p.condition === node || p instanceof AST_Binary && p.left === node || p instanceof AST_UnaryPostfix && p.expression === node) {
                node = p;
                p = a[i -= 1];
            } else {
                return false;
            }
        }
    }
    function no_constructor_parens(self, output) {
        var ՐՏ_Temp;
        return self.args.length === 0 && !output.option("beautify");
    }
    function best_of(a) {
        var ՐՏ_Temp, best, len_, i;
        best = a[0];
        len_ = best.length;
        for (i = 1; i < a.length; i++) {
            if (a[i].length < len_) {
                best = a[i];
                len_ = best.length;
            }
        }
        return best;
    }
    function make_num(num) {
        var ՐՏ_Temp, str_, a, m;
        str_ = num.toString(10);
        a = [ str_.replace(/^0\./, ".").replace("e+", "e") ];
        m = null;
        if (Math.floor(num) === num) {
            if (num >= 0) {
                a.push("0x" + num.toString(16).toLowerCase(), "0" + num.toString(8));
            } else {
                a.push("-0x" + (-num).toString(16).toLowerCase(), "-0" + (-num).toString(8));
            }
            if (m = /^(.*?)(0+)$/.exec(num)) {
                a.push(m[1] + "e" + m[2].length);
            }
        } else if (m = /^0?\.(0+)(.*)$/.exec(num)) {
            a.push(m[2] + "e-" + (m[1].length + m[2].length), str_.substr(str_.indexOf(".")));
        }
        return best_of(a);
    }
    function make_block(stmt, output) {
        var ՐՏ_Temp;
        if (stmt instanceof AST_BlockStatement) {
            stmt.print(output);
            return;
        }
        output.with_block(function() {
            var ՐՏ_Temp;
            output.indent();
            stmt.print(output);
            output.newline();
        });
    }
    function DEFMAP(nodetype, generator) {
        var ՐՏ_Temp;
        nodetype.DEFMETHOD("add_source_map", function(stream) {
            var ՐՏ_Temp;
            generator(this, stream);
        });
    }
    DEFMAP(AST_Node, noop);
    function basic_sourcemap_gen(self, output) {
        var ՐՏ_Temp;
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
        var ՐՏ_Temp;
        output.add_mapping(self.start, self.key);
    });
})();