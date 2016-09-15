var MAP, colors;
"\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under Apache 2.0 license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n  RapydScript source code is originally based on UglifyJS2 (covered\n  by BSD license). UglifyJS2 was written by Mihai Bazon\n  <mihai.bazon@gmail.com>, who is its respective copyright holder.\n\n    Redistribution and use in source and binary forms, with or without\n    modification, are permitted provided that the following conditions\n    are met:\n\n        * Redistributions of source code must retain the above\n          copyright notice, this list of conditions and the following\n          disclaimer.\n\n        * Redistributions in binary form must reproduce the above\n          copyright notice, this list of conditions and the following\n          disclaimer in the documentation and/or other materials\n          provided with the distribution.\n\n    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY\n    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE\n    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,\n    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF\n    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF\n    SUCH DAMAGE.\n\n **********************************************************************\n";
function array_to_hash(a) {
    var ՐՏ_Temp, ret, i;
    ret = Object.create(null);
    for (i = 0; i < len(a); i++) {
        ret[a[i]] = true;
    }
    return ret;
}
function slice(a, start) {
    var ՐՏ_Temp;
    return Array.prototype.slice.call(a, start || 0);
}
function characters(str_) {
    var ՐՏ_Temp;
    return str_.split("");
}
function member(name, array) {
    var ՐՏ_Temp, i;
    var ՐՏ_Iter0 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
    for (var ՐՏ_Index0 = 0; ՐՏ_Index0 < ՐՏ_Iter0.length; ՐՏ_Index0++) {
        i = ՐՏ_Iter0[ՐՏ_Index0];
        if (array[i] === name) {
            return true;
        }
    }
    return false;
}
function find_if(func, array) {
    var ՐՏ_Temp, i;
    for (i = 0; i < len(array); i++) {
        if (func(array[i])) {
            return array[i];
        }
    }
}
function repeat_string(str_, i) {
    var ՐՏ_Temp, d;
    if (i <= 0) {
        return "";
    }
    if (i === 1) {
        return str_;
    }
    d = repeat_string(str_, i >> 1);
    d += d;
    if (i & 1) {
        d += str_;
    }
    return d;
}
function DefaultsError(msg, defs) {
    var ՐՏ_Temp;
    this.msg = msg;
    this.defs = defs;
}
function ImportError() {
    ImportError.prototype.__init__.apply(this, arguments);
}
ՐՏ_extends(ImportError, Error);
ImportError.prototype.__init__ = function __init__(message){
    var self = this;
    var ՐՏ_Temp;
    self.message = message;
};

function ParseError() {
    ParseError.prototype.__init__.apply(this, arguments);
}
ՐՏ_extends(ParseError, Error);
ParseError.prototype.__init__ = function __init__(message, line, col, pos, is_eof){
    var self = this;
    var ՐՏ_Temp;
    self.message = message;
    self.line = line;
    self.col = col;
    self.pos = pos;
    self.stack = new Error().stack;
    self.is_eof = is_eof;
};
ParseError.prototype.toString = function toString(){
    var self = this;
    var ՐՏ_Temp;
    return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
};

function defaults(args, defs, croak) {
    var ՐՏ_Temp, args, ret, i;
    if (args === true) {
        args = {};
    }
    ret = args || {};
    if (croak) {
        for (i in ret) {
            if (ret.hasOwnProperty(i) && !defs.hasOwnProperty(i)) {
                throw new DefaultsError("`" + i + "` is not a supported option", defs);
            }
        }
    }
    for (i in defs) {
        if (defs.hasOwnProperty(i)) {
            ret[i] = args && args.hasOwnProperty(i) ? args[i] : defs[i];
        }
    }
    return ret;
}
function merge(obj, ext) {
    var ՐՏ_Temp, i;
    for (i in ext) {
        if (ext.hasOwnProperty(i)) {
            obj[i] = ext[i];
        }
    }
    return obj;
}
function noop() {
    var ՐՏ_Temp;
}
MAP = function() {
    var ՐՏ_Temp, skip;
    function MAP(a, f, backwards) {
        var ՐՏ_Temp, ret, top, i;
        ret = [];
        top = [];
        function doit() {
            var ՐՏ_Temp, val, is_last;
            val = f(a[i], i);
            is_last = val instanceof Last;
            if (is_last) {
                val = val.v;
            }
            if (val instanceof AtTop) {
                val = val.v;
                if (val instanceof Splice) {
                    top.push.apply(top, backwards ? val.v.slice().reverse() : val.v);
                } else {
                    top.push(val);
                }
            } else if (val !== skip) {
                if (val instanceof Splice) {
                    ret.push.apply(ret, backwards ? val.v.slice().reverse() : val.v);
                } else {
                    ret.push(val);
                }
            }
            return is_last;
        }
        if (Array.isArray(a)) {
            if (backwards) {
                var ՐՏ_Iter1 = ՐՏ_Iterable(range(a.length - 1, -1, -1));
                for (var ՐՏ_Index1 = 0; ՐՏ_Index1 < ՐՏ_Iter1.length; ՐՏ_Index1++) {
                    i = ՐՏ_Iter1[ՐՏ_Index1];
                    if (doit()) {
                        break;
                    }
                }
                ret.reverse();
                top.reverse();
            } else {
                for (i = 0; i < len(a); i++) {
                    if (doit()) {
                        break;
                    }
                }
            }
        } else {
            for (i in a) {
                if (a.hasOwnProperty(i)) {
                    if (doit()) {
                        break;
                    }
                }
            }
        }
        return top.concat(ret);
    }
    MAP.at_top = function(val) {
        var ՐՏ_Temp;
        return new AtTop(val);
    };
    MAP.splice = function(val) {
        var ՐՏ_Temp;
        return new Splice(val);
    };
    MAP.last = function(val) {
        var ՐՏ_Temp;
        return new Last(val);
    };
    skip = MAP.skip = {};
    function AtTop(val) {
        var ՐՏ_Temp;
        this.v = val;
    }
    function Splice(val) {
        var ՐՏ_Temp;
        this.v = val;
    }
    function Last(val) {
        var ՐՏ_Temp;
        this.v = val;
    }
    return MAP;
}.call(this);
function push_uniq(array, el) {
    var ՐՏ_Temp;
    if (!(ՐՏ_in(el, array))) {
        array.push(el);
    }
}
function string_template(text, props) {
    var ՐՏ_Temp;
    return text.replace(/\{(.+?)\}/g, function(str_, p) {
        var ՐՏ_Temp;
        return props[p];
    });
}
function remove(array, el) {
    var ՐՏ_Temp, i;
    var ՐՏ_Iter2 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
    for (var ՐՏ_Index2 = 0; ՐՏ_Index2 < ՐՏ_Iter2.length; ՐՏ_Index2++) {
        i = ՐՏ_Iter2[ՐՏ_Index2];
        if (array[i] === el) {
            array.splice(i, 1);
        }
    }
}
function mergeSort(array, cmp) {
    var ՐՏ_Temp;
    if (array.length < 2) {
        return array.slice();
    }
    function merge(a, b) {
        var ՐՏ_Temp, r, ai, bi, i;
        r = [];
        ai = 0;
        bi = 0;
        i = 0;
        while (ai < a.length && bi < b.length) {
            if (cmp(a[ai], b[bi]) <= 0) {
                r[i] = a[ai];
                ++ai;
            } else {
                r[i] = b[bi];
                ++bi;
            }
            ++i;
        }
        if (ai < a.length) {
            r.push.apply(r, a.slice(ai));
        }
        if (bi < b.length) {
            r.push.apply(r, b.slice(bi));
        }
        return r;
    }
    function _ms(a) {
        var ՐՏ_Temp, m, left, right;
        if (a.length <= 1) {
            return a;
        }
        m = Math.floor(a.length / 2);
        left = a.slice(0, m);
        right = a.slice(m);
        left = _ms(left);
        right = _ms(right);
        return merge(left, right);
    }
    return _ms(array);
}
function set_difference(a, b) {
    var ՐՏ_Temp;
    return a.filter(function(el) {
        var ՐՏ_Temp;
        return !(ՐՏ_in(el, b));
    });
}
function set_intersection(a, b) {
    var ՐՏ_Temp;
    return a.filter(function(el) {
        var ՐՏ_Temp;
        return ՐՏ_in(el, b);
    });
}
function makePredicate(words) {
    var ՐՏ_Temp, words, f, cats, i, skip, j, cat;
    if (!Array.isArray(words)) {
        words = words.split(" ");
    }
    f = "";
    cats = [];
    for (i = 0; i < len(words); i++) {
        skip = false;
        for (j = 0; j < len(cats); j++) {
            if (cats[j][0].length === words[i].length) {
                cats[j].push(words[i]);
                skip = true;
                break;
            }
        }
        if (!skip) {
            cats.push([ words[i] ]);
        }
    }
    function compareTo(arr) {
        var ՐՏ_Temp, i;
        if (arr.length === 1) {
            return f += "return str === " + JSON.stringify(arr[0]) + ";";
        }
        f += "switch(str){";
        for (i = 0; i < len(arr); i++) {
            f += "case " + JSON.stringify(arr[i]) + ":";
        }
        f += "return true}return false;";
    }
    if (cats.length > 3) {
        cats.sort(function(a, b) {
            var ՐՏ_Temp;
            return b.length - a.length;
        });
        f += "switch(str.length){";
        for (i = 0; i < len(cats); i++) {
            cat = cats[i];
            f += "case " + cat[0].length + ":";
            compareTo(cat);
        }
        f += "}";
    } else {
        compareTo(words);
    }
    return new Function("str", f);
}
function Dictionary() {
    var ՐՏ_Temp;
    this._values = Object.create(null);
    this._size = 0;
}
Dictionary.prototype = {
    set: function(key, val) {
        var ՐՏ_Temp;
        if (!this.has(key)) {
            ++this._size;
        }
        this._values["$" + key] = val;
        return this;
    },
    add: function(key, val) {
        var ՐՏ_Temp;
        if (this.has(key)) {
            this.get(key).push(val);
        } else {
            this.set(key, [ val ]);
        }
        return this;
    },
    get: function(key) {
        var ՐՏ_Temp;
        return this._values["$" + key];
    },
    del_: function(key) {
        var ՐՏ_Temp;
        if (this.has(key)) {
            --this._size;
            delete this._values["$" + key];
        }
        return this;
    },
    has: function(key) {
        var ՐՏ_Temp;
        return ՐՏ_in("$" + key, this._values);
    },
    each: function(f) {
        var ՐՏ_Temp, i;
        for (i in this._values) {
            f(this._values[i], i.substr(1));
        }
    },
    size: function() {
        var ՐՏ_Temp;
        return this._size;
    },
    map: function(f) {
        var ՐՏ_Temp, ret, i;
        ret = [];
        for (i in this._values) {
            ret.push(f(this._values[i], i.substr(1)));
        }
        return ret;
    }
};
colors = [ "red", "green", "yellow", "blue", "magenta", "cyan", "white" ];
function ansi(code) {
    var ՐՏ_Temp, code;
    code = code || 0;
    return "[" + code + "m";
}
function colored(string, color, bold) {
    var ՐՏ_Temp, prefix;
    prefix = [];
    if (bold) {
        prefix.push(ansi(1));
    }
    if (color) {
        prefix.push(ansi(colors.indexOf(color) + 31));
    }
    return prefix.join("") + string + ansi(0);
}