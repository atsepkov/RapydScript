var MAP;
"use strict";
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
    var i;
    for (i = array.length - 1; i > -1; i-=1) {
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
function defaults(args, defs, croak) {
    var ret, i;
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
    var i;
    for (i in ext) {
        if (ext.hasOwnProperty(i)) {
            obj[i] = ext[i];
        }
    }
    return obj;
}
function noop() {
}
MAP = function() {
    var skip;
    function MAP(a, f, backwards) {
        var ret, top, i;
        ret = [];
        top = [];
        function doit() {
            var is_last, val;
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
                for (i = a.length - 1; i > -1; i-=1) {
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
    if (array.indexOf(el) < 0) {
        array.push(el);
    }
}
function string_template(text, props) {
    return text.replace(/\{(.+?)\}/g, function(str_, p) {
        return props[p];
    });
}
function remove(array, el) {
    var i;
    for (i = array.length - 1; i > -1; i-=1) {
        if (array[i] === el) {
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
                ai += 1;
            } else {
                r[i] = b[bi];
                bi += 1;
            }
            i += 1;
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
        return merge(left, right);
    }
    return _ms(array);
}
function set_difference(a, b) {
    return a.filter(function(el) {
        return b.indexOf(el) < 0;
    });
}
function set_intersection(a, b) {
    return a.filter(function(el) {
        return b.indexOf(el) >= 0;
    });
}
function makePredicate(words) {
    var a, k;
    if (!Array.isArray(words)) {
        words = words.split(" ");
    }
    if (typeof Set === "function") {
        a = new Set(words);
        return function(x) {
            return a.has(x);
        };
    } else {
        a = {};
        var _$rapyd$_Iter1 = _$rapyd$_Iterable(words);
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            k = _$rapyd$_Iter1[_$rapyd$_Index1];
            a[k] = true;
        }
        return function(x) {
            return a.hasOwnProperty(x);
        };
    }
}
function Dictionary() {
    this._values = Object.create(null);
    this._size = 0;
}
Dictionary.prototype = {
    set: function(key, val) {
        if (!this.has(key)) {
            this._size += 1;
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
            this._size -= 1;
            delete this._values["$" + key];
        }
        return this;
    },
    has: function(key) {
        return _$rapyd$_in("$" + key, this._values);
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