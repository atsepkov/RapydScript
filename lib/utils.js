var ՐՏ_1, ՐՏ_2;
var MAP, colors;
function array_to_hash(a) {
    var ret, i;
    ret = Object.create(null);
    for (i = 0; i < len(a); i++) {
        ret[a[i]] = true;
    }
    return ret;
}
function slice(a, start) {
    return Array.prototype.slice.call(a, start || 0);
}
function characters(str_) {
    return str_.split("");
}
function member(name, array) {
    var ՐՏitr1, ՐՏidx1;
    var i;
    ՐՏitr1 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
    for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
        i = ՐՏitr1[ՐՏidx1];
        if (array[i] === name) {
            return true;
        }
    }
    return false;
}
function find_if(func, array) {
    var i;
    for (i = 0; i < len(array); i++) {
        if (func(array[i])) {
            return array[i];
        }
    }
}
function repeat_string(str_, i) {
    var d;
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
    this.msg = msg;
    this.defs = defs;
}
var ImportError = (ՐՏ_1 = function ImportError() {
    ImportError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_1, Error), Object.defineProperties(ՐՏ_1.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.message = message;
        }
    }
}), ՐՏ_1);
var ParseError = (ՐՏ_2 = function ParseError() {
    ParseError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_2, Error), Object.defineProperties(ՐՏ_2.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message, line, col, pos, is_eof){
            var self = this;
            self.message = message;
            self.line = line;
            self.col = col;
            self.pos = pos;
            self.stack = new Error().stack;
            self.is_eof = is_eof;
        }
    },
    toString: {
        enumerable: true, 
        writable: true, 
        value: function toString(){
            var self = this;
            return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
        }
    }
}), ՐՏ_2);
function defaults(args, defs, croak) {
    var ՐՏitr2, ՐՏidx2, ՐՏitr3, ՐՏidx3;
    var args, ret, key;
    if (args === true) {
        args = {};
    }
    ret = args || {};
    if (croak) {
        ՐՏitr2 = ՐՏ_Iterable(ret);
        for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
            key = ՐՏitr2[ՐՏidx2];
            if (!(ՐՏ_in(key, defs))) {
                throw new DefaultsError("`" + key + "` is not a supported option", defs);
            }
        }
    }
    ՐՏitr3 = ՐՏ_Iterable(defs);
    for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
        key = ՐՏitr3[ՐՏidx3];
        ret[key] = args && ՐՏ_in(key, args) ? args[key] : defs[key];
    }
    return ret;
}
function merge(obj, ext) {
    var ՐՏitr4, ՐՏidx4;
    var key;
    ՐՏitr4 = ՐՏ_Iterable(ext);
    for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
        key = ՐՏitr4[ՐՏidx4];
        obj[key] = ext[key];
    }
    return obj;
}
function noop() {
}
MAP = function() {
    var skip;
    function MAP(a, f, backwards) {
        var ՐՏitr5, ՐՏidx5;
        var ret, top, i;
        ret = [];
        top = [];
        function doit() {
            var val, is_last;
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
                ՐՏitr5 = ՐՏ_Iterable(range(a.length - 1, -1, -1));
                for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                    i = ՐՏitr5[ՐՏidx5];
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
        return new AtTop(val);
    };
    MAP.splice = function(val) {
        return new Splice(val);
    };
    MAP.last = function(val) {
        return new Last(val);
    };
    skip = MAP.skip = {};
    function AtTop(val) {
        this.v = val;
    }
    function Splice(val) {
        this.v = val;
    }
    function Last(val) {
        this.v = val;
    }
    return MAP;
}.call(this);
function push_uniq(array, el) {
    if (!(ՐՏ_in(el, array))) {
        array.push(el);
    }
}
function string_template(text, props) {
    return text.replace(/\{(.+?)\}/g, function(str_, p) {
        return props[p];
    });
}
function remove(array, el) {
    var ՐՏitr6, ՐՏidx6;
    var idx;
    ՐՏitr6 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
    for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
        idx = ՐՏitr6[ՐՏidx6];
        if (array[idx] === el) {
            array.splice(i, 1);
        }
    }
}
function mergeSort(array, cmp) {
    if (array.length < 2) {
        return array.slice();
    }
    function merge(a, b) {
        var r, ai, bi, i;
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
        var m, left, right;
        if (a.length <= 1) {
            return a;
        }
        m = Math.floor(a.length / 2);
        left = a.slice(0, m);
        right = a.slice(m);
        left = _ms(left);
        right = _ms(right);
        return ՐՏ_merge(left, right);
    }
    return _ms(array);
}
function set_difference(a, b) {
    return a.filter(function(el) {
        return !(ՐՏ_in(el, b));
    });
}
function set_intersection(a, b) {
    return a.filter(function(el) {
        return ՐՏ_in(el, b);
    });
}
function makePredicate(words) {
    var words, f, cats, i, skip, j, cat;
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
        var i;
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
    this._values = Object.create(null);
    this._size = 0;
}
Dictionary.prototype = {
    set: function(key, val) {
        if (!this.has(key)) {
            ++this._size;
        }
        this._values["$" + key] = val;
        return this;
    },
    add: function(key, val) {
        if (this.has(key)) {
            this.get(key).push(val);
        } else {
            this.set(key, [ val ]);
        }
        return this;
    },
    get: function(key) {
        return this._values["$" + key];
    },
    del_: function(key) {
        if (this.has(key)) {
            --this._size;
            delete this._values["$" + key];
        }
        return this;
    },
    has: function(key) {
        return ՐՏ_in("$" + key, this._values);
    },
    each: function(f) {
        var i;
        for (i in this._values) {
            f(this._values[i], i.substr(1));
        }
    },
    size: function() {
        return this._size;
    },
    map: function(f) {
        var ret, i;
        ret = [];
        for (i in this._values) {
            ret.push(f(this._values[i], i.substr(1)));
        }
        return ret;
    }
};
colors = [ "red", "green", "yellow", "blue", "magenta", "cyan", "white" ];
function ansi(code) {
    var code;
    code = code || 0;
    return "[" + code + "m";
}
function colored(string, color, bold) {
    var prefix;
    prefix = [];
    if (bold) {
        prefix.push(ansi(1));
    }
    if (color) {
        prefix.push(ansi(colors.indexOf(color) + 31));
    }
    return prefix.join("") + string + ansi(0);
}