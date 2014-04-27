"\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript2\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under Apache 2.0 license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n  RapydScript source code is originally based on UglifyJS2 (covered\n  by BSD license). UglifyJS2 was written by Mihai Bazon\n  <mihai.bazon@gmail.com>, who is its respective copyright holder.\n\n    Redistribution and use in source and binary forms, with or without\n    modification, are permitted provided that the following conditions\n    are met:\n\n        * Redistributions of source code must retain the above\n          copyright notice, this list of conditions and the following\n          disclaimer.\n\n        * Redistributions in binary form must reproduce the above\n          copyright notice, this list of conditions and the following\n          disclaimer in the documentation and/or other materials\n          provided with the distribution.\n\n    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY\n    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE\n    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,\n    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF\n    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF\n    SUCH DAMAGE.\n\n **********************************************************************\n";
"use strict";
function OutputStream(options) {
    var indentation, current_col, current_line, current_pos, OUTPUT, IMPORTED, might_need_space, might_need_semicolon, last, requireSemicolonChars, space, indent, with_indent, newline, semicolon, add_mapping, stack;
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
        beautify: false,
        source_map: null,
        bracketize: false,
        semicolons: true,
        comments: false,
        preserve_line: false,
        namespace_imports: false,
        amd: false,
        omit_baselib: false,
        private_scope: true,
        screw_old_browsers: false,
        auto_bind: false
    }, true);
    indentation = 0;
    current_col = 0;
    current_line = 1;
    current_pos = 0;
    OUTPUT = "";
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
    function make_string(str_) {
        var dq, sq;
        dq = 0;
        sq = 0;
        str_ = str_.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function(s) {
            var tmp_, dq, sq;
            tmp_ = s;
            if (tmp_ == "\\") {
                return "\\\\";
            } else if (tmp_ == "\b") {
                return "\\b";
            } else if (tmp_ == "\f") {
                return "\\f";
            } else if (tmp_ == "\n") {
                return "\\n";
            } else if (tmp_ == "\t") {
                return "\\t";
            } else if (tmp_ == "\r") {
                return "\\r";
            } else if (tmp_ == "\u2028") {
                return "\\u2028";
            } else if (tmp_ == "\u2029") {
                return "\\u2029";
            } else if (tmp_ == "\"") {
                dq += 1;
                return "\"";
            } else if (tmp_ == "'") {
                sq += 1;
                return "'";
            } else if (tmp_ == "\0") {
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
        var ret;
        ret = make_string(str_);
        if (options.inline_script) {
            ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
        }
        return ret;
    }
    function make_name(name) {
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
        var ch, target_line, prev, a, n;
        str_ = String(str_);
        ch = str_.charAt(0);
        if (might_need_semicolon) {
            if ((!ch || ";}".indexOf(ch) < 0) && !/[;]$/.test(last)) {
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
            if (is_identifier_char(prev) && (is_identifier_char(ch) || ch == "\\") || /^[\+\-\/]$/.test(ch) && ch == prev) {
                OUTPUT += " ";
                current_col += 1;
                current_pos += 1;
            }
            might_need_space = false;
        }
        a = str_.split(/\r?\n/);
        n = a.length - 1;
        current_line += n;
        if (n == 0) {
            current_col += a[n].length;
        } else {
            current_col = a[n].length;
        }
        current_pos += str_.length;
        last = str_;
        OUTPUT += str_;
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
        var save_indentation, ret;
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
                options.source_map.add(token.file || "?", current_line, current_col, token.line, token.col, !name && token.type == "name" ? token.value : name);
            }
        } catch (_$rapyd$_Exception) {
            var ex = _$rapyd$_Exception;
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
    function dump_baselib(key) {
        var stmt_gen, line_gen, func_gen, lib;
        stmt_gen = function(item, i) {
            if (i && !item.call) {
                space();
            }
            if (typeof item === "string") {
                print_(item);
            } else if (item.parens) {
                with_parens(function() {
                    item.parens.forEach(stmt_gen);
                });
            } else if (item.call) {
                with_parens(function() {
                    item.call.forEach(stmt_gen);
                });
            } else if (item.square) {
                with_square(function() {
                    item.square.forEach(stmt_gen);
                });
            } else if (item.block) {
                with_block(function() {
                    item.block.forEach(line_gen);
                });
            } else if (item.sequence) {
                item.sequence.forEach(function(elem, i) {
                    if (i) {
                        comma();
                    }
                    print_(elem);
                });
            }
        };
        line_gen = function(item, i) {
            indent();
            item.forEach(stmt_gen);
            if (!item.slice(-1)[0].block || item[0] == "=" || item[0] == "return") {
                semicolon();
            }
            newline();
        };
        func_gen = function(name, data) {
            indent();
            print_("function " + name);
            with_parens(function() {
                data.args.forEach(function(arg, i) {
                    if (i) {
                        comma();
                    }
                    print_(arg);
                });
            });
            space();
            with_block(function() {
                data.body.forEach(line_gen);
            });
            newline();
        };
        lib = {
            "abs": function() {
                return func_gen("abs", {
                    args: [ "n" ],
                    body: [ [ "return", "Math.abs", {
                        call: [ {
                            sequence: [ "n" ]
                        } ]
                    } ] ]
                });
            },
            "bind": function() {
                return func_gen("_$rapyd$_bind", {
                    args: [ "fn", "thisArg" ],
                    body: [ [ "if", {
                        parens: [ "fn._orig" ]
                    }, "fn", "=", "fn._orig" ], [ "if", {
                        parens: [ "thisArg", "===", "false" ]
                    }, "return", "fn" ], [ "var", "ret", "=", "fn.bind", {
                        call: [ {
                            sequence: [ "thisArg" ]
                        } ]
                    } ], [ "ret._orig", "=", "fn" ], [ "return", "ret" ] ]
                });
            },
            "rebind_all": function() {
                return func_gen("_$rapyd$_rebindAll", {
                    args: [ "thisArg", "rebind" ],
                    body: [ [ "if", {
                        parens: [ "typeof", "rebind", "===", "\"undefined\"" ]
                    }, "rebind", "=", "true" ], [ "for", {
                        parens: [ "var", "p", "in", "thisArg" ]
                    }, {
                        block: [ [ "if", {
                            parens: [ "thisArg[p]", "&&", "thisArg[p]._orig" ]
                        }, {
                            block: [ [ "if", {
                                parens: [ "rebind" ]
                            }, "thisArg[p]", "=", "_$rapyd$_bind", {
                                call: [ {
                                    sequence: [ "thisArg[p]", "thisArg" ]
                                } ]
                            } ], [ "else", "thisArg[p]", "=", "thisArg[p]._orig" ] ]
                        } ] ]
                    } ] ]
                });
            },
            "dir": function() {
                return func_gen("dir", {
                    args: [ "item" ],
                    body: [ [ "var", "arr", "=", "[]" ], [ "for", {
                        parens: [ "var", "i", "in", "item" ]
                    }, {
                        block: [ [ "arr.push", {
                            call: [ "i" ]
                        } ] ]
                    } ], [ "return", "arr" ] ]
                });
            },
            "enumerate": function() {
                return func_gen("enumerate", {
                    args: [ "item" ],
                    body: [ [ "var", "arr", "=", "[]" ], [ "for", {
                        parens: [ "var", "i", "=", "0;", "i", "<", "item.length;", "i++" ]
                    }, {
                        block: [ [ "arr[arr.length]", "=", {
                            square: [ {
                                sequence: [ "i", "item[i]" ]
                            } ]
                        } ] ]
                    } ], [ "return", "arr" ] ]
                });
            },
            "extends": function() {
                var body;
                if (options.screw_old_browsers) {
                    return func_gen("_$rapyd$_extends", {
                        args: [ "child", "parent" ],
                        body: [ [ "child.prototype", "=", "Object.create", {
                            call: [ "parent.prototype" ]
                        } ], [ "child.prototype.constructor", "=", "child" ] ]
                    });
                } else {
                    body = [ [ "child.prototype", "=", "new", "parent" ], [ "child.prototype.constructor", "=", "child" ] ];
                    if (options.auto_bind) {
                        body.push([ "_$rapyd$_rebindAll", {
                            call: [ "child.prototype" ]
                        } ]);
                    }
                    return func_gen("_$rapyd$_extends", {
                        args: [ "child", "parent" ],
                        body: body
                    });
                }
            },
            "in": function() {
                return func_gen("_$rapyd$_in", {
                    args: [ "val", "arr" ],
                    body: [ [ "if", {
                        parens: [ "arr", "instanceof", "Array", "||", "typeof", "arr", "===", "\"string\"" ]
                    }, "return", "arr.indexOf(val)", "!=", "-1" ], [ "else", {
                        block: [ [ "for", {
                            parens: [ "i", "in", "arr" ]
                        }, {
                            block: [ [ "if", {
                                parens: [ "arr.hasOwnProperty(i)", "&&", "i", "===", "val" ]
                            }, "return", "true" ] ]
                        } ], [ "return", "false" ] ]
                    } ] ]
                });
            },
            "len": function() {
                return func_gen("len", {
                    args: [ "obj" ],
                    body: [ [ "if", {
                        parens: [ "obj", "instanceof", "Array", "||", "typeof", "obj", "===", "\"string\"" ]
                    }, "return", "obj.length" ], [ "else", {
                        block: [ [ "var", "count", "=", "0" ], [ "for", {
                            parens: [ "var", "i", "in", "obj" ]
                        }, {
                            block: [ [ "if", {
                                parens: [ "obj.hasOwnProperty(i)" ]
                            }, "count++" ] ]
                        } ], [ "return", "count" ] ]
                    } ] ]
                });
            },
            "mixin": function() {
                return func_gen("_$rapyd$_mixin", {
                    args: [ "target", "source", "overwrite" ],
                    body: [ [ "for", {
                        parens: [ "var", "i", "in", "source" ]
                    }, {
                        block: [ [ "if", {
                            parens: [ "source.hasOwnProperty(i)", "&&", {
                                parens: [ "overwrite", "||", "typeof", "taget[i]", "===", "\"undefined\"" ]
                            } ]
                        }, "target[i]", "=", "source[i]" ] ]
                    } ] ]
                });
            },
            "print": function() {
                return func_gen("_$rapyd$_print", {
                    args: [],
                    body: [ [ "var", {
                        sequence: [ "args", "output" ]
                    } ], [ "args", "=", "[].slice.call", {
                        call: [ {
                            sequence: [ "arguments", "0" ]
                        } ]
                    } ], [ "output", "=", "JSON.stringify(args)" ], [ "if", {
                        parens: [ "\"console\"", "in", "window" ]
                    }, "console.log", {
                        call: [ "output.substr", {
                            call: [ {
                                sequence: [ "1", "output.length-2" ]
                            } ]
                        } ]
                    } ] ]
                });
            },
            "range": function() {
                return func_gen("range", {
                    args: [ "start", "stop", "step" ],
                    body: [ [ "if", {
                        parens: [ "arguments.length", "<=", "1" ]
                    }, {
                        block: [ [ "stop", "=", "start", "||", "0" ], [ "start", "=", "0" ] ]
                    } ], [ "step", "=", "arguments[2]", "||", "1" ], [ "var", "length", "=", "Math.max", {
                        parens: [ "Math.ceil", {
                            parens: [ {
                                parens: [ "stop", "-", "start" ]
                            }, "/", "step" ]
                        }, ",", "0" ]
                    } ], [ "var", "idx", "=", "0" ], [ "var", "range", "=", "new", "Array(length)" ], [ "while", {
                        parens: [ "idx", "<", "length" ]
                    }, {
                        block: [ [ "range[idx++]", "=", "start" ], [ "start", "+=", "step" ] ]
                    } ], [ "return", "range" ] ]
                });
            },
            "reversed": function() {
                return func_gen("reversed", {
                    args: [ "arr" ],
                    body: [ [ "var", "tmp", "=", "[]" ], [ "for", {
                        parens: [ "var", "i", "=", "arr.length", "-", "1;", "i", ">=", "0;", "i--" ]
                    }, {
                        block: [ [ "tmp.push", {
                            call: [ "arr[i]" ]
                        } ] ]
                    } ], [ "return", "tmp" ] ]
                });
            },
            "getattr": function() {
                return func_gen("getattr", {
                    args: [ "obj", "name" ],
                    body: [ [ "return", "obj[name]" ] ]
                });
            },
            "setattr": function() {
                return func_gen("setattr", {
                    args: [ "obj", "name", "value" ],
                    body: [ [ "obj[name]", "=", "value" ] ]
                });
            },
            "hasattr": function() {
                return func_gen("hasattr", {
                    args: [ "obj", "name" ],
                    body: [ [ "return", "name", "in", "obj" ] ]
                });
            }
        };
        lib[key]();
    }
    function prologue(module_) {
        var lib;
        if (!options.omit_baselib) {
            for (lib in module_.baselib) {
                dump_baselib(lib);
            }
        }
    }
    function get() {
        return OUTPUT;
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
    stack = [];
    return {
        get: get,
        toString: get,
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
        print_string: function(str_) {
            print_(encode_string(str_));
        },
        next_indent: next_indent,
        with_indent: with_indent,
        with_block: with_block,
        with_parens: with_parens,
        with_square: with_square,
        add_mapping: add_mapping,
        assign: assign_var,
        prologue: prologue,
        "import": function(module_) {
            var key, should_import;
            key = "";
            while (module_ instanceof AST_Dot) {
                key = "." + module_.property + key;
                module_ = module_.expression;
            }
            key = module_.name + key;
            should_import = !IMPORTED[key];
            IMPORTED[key] = true;
            return should_import;
        },
        is_main: function() {
            return OUTPUT.length == 0;
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
        parent: function(n) {
            return stack[stack.length - 2 - (n || 0)];
        }
    };
}
(function() {
    var SPECIAL_METHODS, INDEX_COUNTER;
    SPECIAL_METHODS = {
        bind: "_$rapyd$_bind",
        rebind_all: "_$rapyd$_rebindAll",
        bool: "!!",
        "float": "parseFloat",
        "int": "parseInt",
        mixin: "_$rapyd$_mixin",
        print: "_$rapyd$_print"
    };
    INDEX_COUNTER = 0;
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
                } else if (typeof c == "function") {
                    comments = comments.filter(function(comment) {
                        return c(self, comment);
                    });
                }
                comments.forEach(function(c) {
                    if (c.type == "comment1") {
                        output.print("//" + c.value + "\n");
                        output.indent();
                    } else if (c.type == "comment2") {
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
            if (pp > sp || pp == sp && this === p.right && !(so == po && (so == "*" || so == "&&" || so == "||"))) {
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
            } catch (_$rapyd$_Exception) {
                var ex = _$rapyd$_Exception;
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
                if (!(i == last && is_toplevel)) {
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
            output.print("_$rapyd$_bind");
            output.with_parens(function() {
                output.print("this.");
                output.print(arg);
                output.comma();
                output.print("this");
            });
            output.semicolon();
            output.newline();
        }
    }
    function display_complex_body(node, is_toplevel, output) {
        var offset, arg;
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
                    node.argnames.forEach(function(arg, i) {
                        if (i >= offset) {
                            output.indent();
                            output.print("var");
                            output.space();
                            output.assign(arg);
                            output.print("arguments");
                            output.with_square(function() {
                                output.print(i - offset);
                            });
                            output.semicolon();
                            output.newline();
                        }
                    });
                    output.indent();
                    output.print("var");
                    output.space();
                    output.assign(node.argnames.starargs);
                    output.print("[].slice.call");
                    output.with_parens(function() {
                        output.print("arguments");
                        output.comma();
                        output.print(node.argnames.length - offset);
                    });
                    output.semicolon();
                    output.newline();
                }
                for (arg in node.argnames.defaults) {
                    output.indent();
                    output.print("if");
                    output.space();
                    output.with_parens(function() {
                        output.print("typeof " + arg);
                        output.space();
                        output.print("===");
                        output.space();
                        output.print("\"undefined\"");
                    });
                    output.space();
                    output.assign(arg);
                    force_statement(node.argnames.defaults[arg], output);
                    output.semicolon();
                    output.newline();
                }
            }
            if (output.option("auto_bind") && node.name && node.name.name == "__init__") {
                output.indent();
                output.print("_$rapyd$_rebindAll");
                output.with_parens(function() {
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
                output.print("_$rapyd$_Exception");
                output.semicolon();
                output.newline();
            }
        }
        display_body(node.body, is_toplevel, output);
    }
    function declare_vars(vars, output) {
        if (vars.length) {
            output.indent();
            output.print("var");
            output.space();
            vars.forEach(function(arg, i) {
                if (i) {
                    output.comma();
                }
                arg.print(output);
            });
            output.semicolon();
            output.newline();
        }
    }
    function unpack_tuple(tuple, output, in_statement) {
        tuple.elements.forEach(function(elem, i) {
            output.indent();
            output.assign(elem);
            output.print("_$rapyd$_Unpack");
            output.with_square(function() {
                output.print(i);
            });
            if (!in_statement || i < tuple.elements.length - 1) {
                output.semicolon();
                output.newline();
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
    function print_private_scope(self, output) {
        output.with_parens(function() {
            output.print("function()");
            output.with_block(function() {
                output.prologue(self);
                display_complex_body(self, true, output);
                output.newline();
            });
        });
        output.print("();");
        output.print("");
    }
    function print_return_map_var(output, name, exported, j) {
        if (_$rapyd$_in(name, exported)) {
            return;
        }
        exported[name] = true;
        if (j > 0) {
            output.comma();
        }
        output.newline();
        output.indent();
        output.indent();
        output.print(name + ": " + name);
    }
    function print_amd(self, output) {
        var imports, import_paths, module_name, i, package_name, n;
        imports = {};
        import_paths = [];
        output.print("define('");
        module_name = self.start.file.slice(0, -3);
        output.print(module_name);
        output.print("'");
        output.comma();
        output.newline();
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
        import_paths.forEach(function(path, j) {
            var node, param;
            if (j > 0) {
                output.comma();
            }
            node = imports[path];
            if (node.as) {
                param = node.as.name;
            } else {
                param = path.replace(/(\/|-)/g, "_");
            }
            output.print(param);
        });
        output.print(")");
        output.with_block(function() {
            var exported;
            output.prologue(self);
            display_complex_body(self, true, output);
            output.newline();
            output.indent();
            output.print("return {");
            exported = {};
            self.body.forEach(function(node, j) {
                var name;
                if (!(_$rapyd$_in(node.TYPE, [ "Function", "Class", "Var", "Const", "Import" ]))) {
                    return;
                }
                if (node.TYPE === "Import") {
                    if (!node.argnames) {
                        return;
                    }
                    var _$rapyd$_Iter0 = node.argnames;
                    for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                        name = _$rapyd$_Iter0[_$rapyd$_Index0];
                        print_return_map_var(output, name.name, exported, j);
                    }
                    return;
                }
                name = node.name.name;
                print_return_map_var(output, name, exported, j);
            });
            output.newline();
            output.indent();
            output.print("};");
            output.newline();
        });
        output.print(");");
        output.print("");
    }
    DEFPRINT(AST_Toplevel, function(self, output) {
        if (output.option("amd") && output.is_main()) {
            print_amd(self, output);
        } else if (output.option("private_scope") && output.is_main()) {
            print_private_scope(self, output);
        } else {
            if (output.is_main()) {
                output.prologue(self);
            }
            if (self.strict) {
                declare_vars(self.localvars, output);
            }
            display_body(self.body, true, output);
        }
    });
    function print_module(self, name, variables, output) {
        function print_var(name) {
            if (typeof name === "string") {
                output.print(name);
            } else {
                name.print(output);
            }
        }
        output.print("var");
        output.space();
        output.assign(name);
        output.with_parens(function() {
            output.print("function()");
            output.with_block(function() {
                display_complex_body(self, false, output);
                output.newline();
                output.indent();
                output.print("return");
                output.with_block(function() {
                    if (!self.variables) {
                        return;
                    }
                    self.variables.forEach(function(arg, i) {
                        output.indent();
                        print_var(arg);
                        output.print(":");
                        output.space();
                        print_var(arg);
                        if (i < self.variables.length - 1) {
                            output.comma();
                        }
                        output.newline();
                    });
                });
                output.semicolon();
                output.newline();
            });
        });
        output.print("()");
        output.semicolon();
        output.newline();
    }
    DEFPRINT(AST_Import, function(self, output) {
        if (output.import(self.module) && !output.option("amd")) {
            if (!output.option("namespace_imports")) {
                self.body.print(output);
            } else if (output.option("namespace_imports")) {
                print_module(self.body, self.module, self.variables, output);
            }
        }
        if (output.option("amd") && self.argnames) {
            self.argnames.forEach(function(arg) {
                output.print("var");
                output.space();
                output.assign(arg);
                output.print(self.path.replace(/(\/|-)/g, "_"));
                output.print(".");
                arg.print(output);
                output.semicolon();
                output.newline();
            });
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
        if (node.body.length > 0) {
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
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name == "dir" && self.object.args.length == 1) {
            return true;
        }
        return false;
    }
    function is_simple_for(self) {
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name == "range" && !(self.init instanceof AST_Array) && (self.object.args.length < 3 || self.object.args.slice(-1)[0] instanceof AST_Number || self.object.args.slice(-1)[0] instanceof AST_Unary && self.object.args.slice(-1)[0].operator == "-" && self.object.args.slice(-1)[0].expression instanceof AST_Number)) {
            return true;
        }
        return false;
    }
    AST_ForIn.DEFMETHOD("_do_print_body", function(output) {
        var self;
        self = this;
        output.with_block(function() {
            if (!(is_simple_for(self) || is_simple_for_in(self))) {
                output.indent();
                if (self.init instanceof AST_Array) {
                    output.assign("_$rapyd$_Unpack");
                    output.print("_$rapyd$_Iter" + INDEX_COUNTER + "[_$rapyd$_Index" + INDEX_COUNTER + "];");
                    output.newline();
                    unpack_tuple(self.init, output);
                } else {
                    output.assign(self.init);
                    output.print("_$rapyd$_Iter" + INDEX_COUNTER + "[_$rapyd$_Index" + INDEX_COUNTER + "];");
                    output.newline();
                }
                INDEX_COUNTER += 1;
            }
            self.body.body.forEach(function(stmt, i) {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        });
    });
    DEFPRINT(AST_ForIn, function(self, output) {
        var args, tmp_, start, end, increment;
        if (is_simple_for(self)) {
            increment = null;
            args = self.object.args;
            tmp_ = args.length;
            if (tmp_ == 1) {
                start = 0;
                end = args[0];
            } else if (tmp_ == 2) {
                start = args[0];
                end = args[1];
            } else if (tmp_ == 3) {
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
                if (increment && (!(increment instanceof AST_Unary) || increment.expression.value != "1")) {
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
                self.init.print(output);
                output.space();
                output.print("in");
                output.space();
                self.object.args[0].print(output);
            });
        } else {
            output.assign("var _$rapyd$_Iter" + INDEX_COUNTER);
            self.object.print(output);
            output.semicolon();
            output.newline();
            output.indent();
            output.print("for");
            output.space();
            output.with_parens(function() {
                output.print("var");
                output.space();
                output.assign("_$rapyd$_Index" + INDEX_COUNTER);
                output.print("0");
                output.semicolon();
                output.space();
                output.print("_$rapyd$_Index" + INDEX_COUNTER);
                output.space();
                output.print("<");
                output.space();
                output.print("_$rapyd$_Iter" + INDEX_COUNTER + ".length");
                output.semicolon();
                output.space();
                output.print("_$rapyd$_Index" + INDEX_COUNTER + "++");
            });
        }
        output.space();
        self._do_print_body(output);
    });
    DEFPRINT(AST_ListComprehension, function(self, output) {
        output.with_parens(function() {
            output.print("function");
            output.print("()");
            output.space();
            output.with_block(function() {
                output.indent();
                output.assign("var _$rapyd$_Iter");
                self.object.print(output);
                output.comma();
                output.assign("_$rapyd$_Result");
                output.print("[]");
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
                    output.print("var");
                    output.space();
                    output.assign("_$rapyd$_Index");
                    output.print("0");
                    output.semicolon();
                    output.space();
                    output.print("_$rapyd$_Index");
                    output.space();
                    output.print("<");
                    output.space();
                    output.print("_$rapyd$_Iter.length");
                    output.semicolon();
                    output.space();
                    output.print("_$rapyd$_Index++");
                });
                output.space();
                output.with_block(function() {
                    var add_to_list;
                    output.indent();
                    if (self.init instanceof AST_Array) {
                        output.assign("_$rapyd$_Unpack");
                        output.print("_$rapyd$_Iter[_$rapyd$_Index];");
                        output.newline();
                        unpack_tuple(self.init, output);
                    } else {
                        output.assign(self.init);
                        output.print("_$rapyd$_Iter[_$rapyd$_Index];");
                        output.newline();
                    }
                    add_to_list = function() {
                        output.indent();
                        output.print("_$rapyd$_Result.push");
                        output.with_parens(function() {
                            self.statement.print(output);
                        });
                        output.semicolon();
                        output.newline();
                    };
                    if (self.condition) {
                        output.indent();
                        output.print("if");
                        output.space();
                        output.with_parens(function() {
                            self.condition.print(output);
                        });
                        output.space();
                        output.with_block(function() {
                            add_to_list();
                        });
                        output.newline();
                    } else {
                        add_to_list();
                    }
                });
                output.newline();
                output.indent();
                output.print("return _$rapyd$_Result");
                output.semicolon();
                output.newline();
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
    function decorate(node, output, prefix) {
        var wrap;
        if (node.decorators && node.decorators.length) {
            output.indent();
            if (prefix) {
                output.print(prefix);
            }
            output.assign(node.name);
            wrap = function(d) {
                if (d.length) {
                    output.print(d.slice(0)[0].name);
                    output.with_parens(function() {
                        wrap(d.slice(1));
                    });
                } else {
                    if (prefix) {
                        output.print(prefix);
                    }
                    node.name.print(output);
                }
            };
            wrap(node.decorators);
            output.semicolon();
            output.newline();
        }
    }
    AST_Lambda.DEFMETHOD("_do_print", function(output, nokeyword) {
        var self;
        self = this;
        if (!nokeyword) {
            output.print("function");
        }
        if (self.name) {
            output.space();
            self.name.print(output);
        }
        output.with_parens(function() {
            if (!self.argnames.starargs) {
                self.argnames.forEach(function(arg, i) {
                    if (i) {
                        output.comma();
                    }
                    arg.print(output);
                });
            }
        });
        output.space();
        print_bracketed(self, output, true);
        decorate(self, output);
    });
    DEFPRINT(AST_Lambda, function(self, output) {
        self._do_print(output);
    });
    AST_Class.DEFMETHOD("_do_print", function(output) {
        var self, class_def, class_fun_def;
        self = this;
        if (self.external) {
            return;
        }
        class_def = function(method) {
            output.indent();
            self.name.print(output);
            if (method && self.static.indexOf(method) != -1) {
                output.assign("." + method);
            } else {
                output.assign(".prototype" + (method ? "." + method : ""));
            }
        };
        class_fun_def = function(stmt) {
            var name;
            name = stmt.name.name;
            if (name == "__init__") {
                stmt.bound = self.bound;
                output.print("function");
                output.space();
                self.name.print(output);
            } else {
                output.newline();
                class_def(name);
                output.print("function");
                output.space();
                output.print(name);
            }
            output.with_parens(function() {
                if (!stmt.argnames.starargs) {
                    stmt.argnames.forEach(function(arg, i) {
                        if (self.static.indexOf(name) != -1) {
                            i += 1;
                        }
                        if (i > 1) {
                            output.comma();
                        }
                        if (i) {
                            arg.print(output);
                        }
                    });
                }
            });
            print_bracketed(stmt, output, true);
            output.semicolon();
            output.newline();
            decorate(stmt, output, self.name.name + ".prototype.");
        };
        if (self.init) {
            class_fun_def(self.init, self.name.name);
        } else if (self.parent) {
            output.print("function");
            output.space();
            self.name.print(output);
            output.print("()");
            output.space();
            output.with_block(function() {
                bind_methods(self.bound, output);
                output.indent();
                self.parent.print(output);
                output.print(".prototype.constructor.apply");
                output.with_parens(function() {
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
                bind_methods(self.bound, output);
            });
        }
        output.newline();
        if (self.parent) {
            output.indent();
            output.print("_$rapyd$_extends");
            output.with_parens(function() {
                self.name.print(output);
                output.comma();
                self.parent.print(output);
            });
            output.semicolon();
            output.newline();
        }
        self.body.forEach(function(stmt, i) {
            if (stmt instanceof AST_Method) {
                if (stmt.name.name != "__init__") {
                    class_fun_def(stmt);
                }
            } else if (stmt instanceof AST_Class) {
                output.indent();
                self.name.print(output);
                output.print(".");
                stmt.print(output);
                output.newline();
            }
        });
        decorate(self, output);
    });
    DEFPRINT(AST_Class, function(self, output) {
        self._do_print(output);
    });
    AST_Module.DEFMETHOD("_do_print", function(output) {
        var self;
        self = this;
        if (self.external) {
            return;
        }
        print_module(self, self.name, self.variables, output);
        decorate(self, output);
    });
    DEFPRINT(AST_Module, function(self, output) {
        self._do_print(output);
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
        var b;
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
            output.print("_$rapyd$_Exception");
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
                                output.print("_$rapyd$_Exception");
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
                        output.indent();
                        output.print("throw");
                        output.space();
                        output.print("_$rapyd$_Exception");
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
                    if (node instanceof AST_Binary && node.operator == "in") {
                        throw output;
                    }
                }));
                node.print(output);
            } catch (_$rapyd$_Exception) {
                var ex = _$rapyd$_Exception;
                if (ex !== output) {
                    throw ex;
                }
                node.print(output, true);
            }
        }
    }
    DEFPRINT(AST_VarDef, function(self, output) {
        var p, noin;
        self.name.print(output);
        if (self.value) {
            output.assign("");
            p = output.parent(1);
            noin = p instanceof AST_ForIn;
            parenthesize_for_noin(self.value, output, noin);
        }
    });
    DEFPRINT(AST_BaseCall, function(self, output) {
        var rename, output_kwargs, obj, last;
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
        if (self instanceof AST_New && no_constructor_parens(self, output)) {
            return;
        }
        output_kwargs = function() {
            if (self.args.kwargs && self.args.kwargs.length) {
                if (self.args.length) {
                    output.comma();
                }
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
        if (self.args.starargs) {
            obj = self.expression.expression ? self.expression.expression.name : "this";
            last = self.args.length - 1;
            output.print(".apply");
            output.with_parens(function() {
                output.print(obj);
                output.comma();
                output.with_square(function() {
                    self.args.forEach(function(expr, i) {
                        if (i != last) {
                            if (i) {
                                output.comma();
                            }
                            expr.print(output);
                        }
                    });
                    output_kwargs();
                });
                output.print(".concat");
                output.with_parens(function() {
                    self.args[last].print(output);
                });
            });
        } else {
            output.with_parens(function() {
                self.args.forEach(function(expr, i) {
                    if (i) {
                        output.comma();
                    }
                    expr.print(output);
                });
                output_kwargs();
            });
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
        if (self.property instanceof AST_Unary && self.property.operator == "-" && self.property.expression instanceof AST_Number) {
            self.expression.print(output);
            output.print(".length");
        }
        self.property.print(output);
        output.print("]");
    });
    DEFPRINT(AST_UnaryPrefix, function(self, output) {
        var op;
        op = self.operator;
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
        var comparators, leftvar;
        comparators = {
            "<": true,
            ">": true,
            "<=": true,
            ">=": true,
            "==": true,
            "!=": true
        };
        if (self.operator == "in") {
            output.print("_$rapyd$_in");
            output.with_parens(function() {
                self.left.print(output);
                output.comma();
                self.right.print(output);
            });
        } else if (comparators[self.operator] && self.left instanceof AST_Binary && comparators[self.left.operator]) {
            if (self.left.right instanceof AST_Symbol) {
                self.left.print(output);
                leftvar = self.left.right.name;
            } else {
                self.left.left.print(output);
                output.space();
                output.print(self.left.operator);
                output.space();
                output.with_parens(function() {
                    output.assign("_$rapyd$_Temp");
                    self.left.right.print(output);
                    leftvar = "_$rapyd$_Temp";
                });
            }
            output.space();
            output.print("&&");
            output.space();
            output.print(leftvar);
            output.space();
            output.print(self.operator);
            output.space();
            self.right.print(output);
        } else {
            self.left.print(output);
            output.space();
            output.print(self.operator);
            output.space();
            self.right.print(output);
        }
    });
    DEFPRINT(AST_Assign, function(self, output) {
        if (self.left instanceof AST_Array) {
            output.print("_$rapyd$_Unpack");
        } else {
            self.left.print(output);
        }
        output.space();
        output.print(self.operator);
        output.space();
        self.right.print(output);
        if (self.left instanceof AST_Array) {
            output.semicolon();
            output.newline();
            unpack_tuple(self.left, output, true);
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
            var a, len_;
            a = self.elements;
            len_ = a.length;
            if (len_ > 0) {
                output.space();
            }
            a.forEach(function(exp, i) {
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
        var key;
        key = self.key;
        if (self.quoted) {
            output.print_string(key + "");
        } else if ((typeof key == "number" || !output.option("beautify") && +key + "" == key) && parseFloat(key) >= 0) {
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
        output.print("set");
        self.value._do_print(output, true);
    });
    DEFPRINT(AST_ObjectGetter, function(self, output) {
        output.print("get");
        self.value._do_print(output, true);
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
        output.print_string(self.getValue());
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
        var a, i, node, p;
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
        return self.args.length == 0 && !output.option("beautify");
    }
    function best_of(a) {
        var best, len_, i;
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
        var str_, a, m;
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