(function(){
"use strict";

    function factory(){
        "use strict";
        var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5, ՐՏ_6, ՐՏ_7, ՐՏ_8, ՐՏ_9, ՐՏ_10, ՐՏ_11, ՐՏ_12, ՐՏ_13, ՐՏ_14, ՐՏ_15, ՐՏ_16, ՐՏ_17, ՐՏ_18, ՐՏ_19, ՐՏ_20, ՐՏ_21, ՐՏ_22, ՐՏ_23, ՐՏ_24, ՐՏ_25, ՐՏ_26, ՐՏ_27, ՐՏ_28, ՐՏ_29, ՐՏ_32, ՐՏ_33, ՐՏ_34, ՐՏ_35, ՐՏ_36, ՐՏ_37, ՐՏ_38, ՐՏ_39, ՐՏ_40, ՐՏ_41, ՐՏ_42, ՐՏ_43, ՐՏ_44, ՐՏ_45, ՐՏ_46, ՐՏ_47, ՐՏ_48, ՐՏ_49, ՐՏ_50, ՐՏ_51, ՐՏ_52, ՐՏ_53, ՐՏ_54, ՐՏ_55, ՐՏ_56, ՐՏ_57, ՐՏ_58, ՐՏ_59, ՐՏ_60, ՐՏ_61, ՐՏ_67, ՐՏ_68, ՐՏ_69, ՐՏ_70, ՐՏ_71, ՐՏ_72, ՐՏ_73, ՐՏ_74, ՐՏ_75, ՐՏ_76, ՐՏ_77, ՐՏ_78, ՐՏ_79, ՐՏ_80, ՐՏ_81, ՐՏ_82, ՐՏ_83, ՐՏ_84, ՐՏ_85, ՐՏ_86, ՐՏ_87, ՐՏ_88, ՐՏ_89, ՐՏ_90, ՐՏ_91, ՐՏ_92, ՐՏ_93, ՐՏ_94, ՐՏ_95, ՐՏ_96, ՐՏ_97, ՐՏ_98, ՐՏ_99, ՐՏ_100, ՐՏ_101, ՐՏ_102, ՐՏ_103, ՐՏ_105, ՐՏ_106, ՐՏ_107, ՐՏ_108, ՐՏ_109, ՐՏ_110, ՐՏ_111, ՐՏ_112, ՐՏ_113, ՐՏ_114, ՐՏ_115, ՐՏ_116, ՐՏ_117, ՐՏ_118, ՐՏ_119, ՐՏ_120, ՐՏ_121;
function ՐՏ_with__name__(fn, name) {
    fn.__name__ = name;
    return fn;
}
function cmp(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
function dir(item) {
    var arr;
    arr = [];
    for (var i in item) {
        arr.push(i);
    }
    return arr;
}
function enumerate(item) {
    var arr, iter, i;
    arr = [];
    iter = ՐՏ_Iterable(item);
    for (i = 0; i < iter.length; i++) {
        arr[arr.length] = [ i, item[i] ];
    }
    return arr;
}
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
}
function ՐՏ_in(val, arr) {
    if (typeof arr.indexOf === "function") {
        return arr.indexOf(val) !== -1;
    } else if (typeof arr.has === "function") {
        return arr.has(val);
    }
    return arr.hasOwnProperty(val);
}
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    if (Set && iterable.constructor === Set) {
        return Array.from(iterable);
    }
    return Object.keys(iterable);
}
function len(obj) {
    var tmp;
    if (obj.constructor === [].constructor || obj.constructor === "".constructor || (tmp = Array.prototype.slice.call(obj)).length) {
        return (tmp || obj).length;
    }
    if (Set && obj.constructor === Set) {
        return obj.size;
    }
    return Object.keys(obj).length;
}
function ՐՏ_merge(target, source, overwrite) {
    var ՐՏitr96, ՐՏidx96;
    var prop;
    for (var i in source) {
        if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) {
            target[i] = source[i];
        }
    }
    ՐՏitr96 = ՐՏ_Iterable(Object.getOwnPropertyNames(source.prototype));
    for (ՐՏidx96 = 0; ՐՏidx96 < ՐՏitr96.length; ՐՏidx96++) {
        prop = ՐՏitr96[ՐՏidx96];
        if (overwrite || typeof target.prototype[prop] === "undefined") {
            Object.defineProperty(target.prototype, prop, Object.getOwnPropertyDescriptor(source.prototype, prop));
        }
    }
}
function range(start, stop, step) {
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function reversed(arr) {
    var tmp;
    tmp = arr.slice(0);
    return tmp.reverse();
}
function ՐՏ_type(obj) {
    return obj && obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1);
}
function ՐՏ_eq(a, b) {
    var ՐՏitr97, ՐՏidx97;
    var i;
    if (a === b) {
        return true;
    }
    if (a === void 0 || b === void 0 || a === null || b === null) {
        return false;
    }
    if (a.constructor !== b.constructor) {
        return false;
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (i = 0; i < a.length; i++) {
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        ՐՏitr97 = ՐՏ_Iterable(a);
        for (ՐՏidx97 = 0; ՐՏidx97 < ՐՏitr97.length; ՐՏidx97++) {
            i = ՐՏitr97[ՐՏidx97];
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (Set && a.constructor === Set || Map && a.constructor === Map) {
        if (a.size !== b.size) {
            return false;
        }
        for (i of a) {
            if (!b.has(i)) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Date) {
        return a.getTime() === b.getTime();
    } else if (typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    return false;
}
function kwargs(f) {
    var argNames;
    argNames = f.toString().match(/\(([^\)]+)/)[1];
    if (!kwargs.memo[argNames]) {
        kwargs.memo[argNames] = argNames ? argNames.split(",").map(function(s) {
            return s.trim();
        }) : [];
    }
    argNames = kwargs.memo[argNames];
    return function() {
        var args, kw, i;
        args = [].slice.call(arguments);
        if (args.length) {
            kw = args[args.length-1];
            if (typeof kw === "object") {
                for (i = 0; i < argNames.length; i++) {
                    if (ՐՏ_in(argNames[i], kw)) {
                        args[i] = kw[argNames[i]];
                    }
                }
            } else {
                args.push(kw);
            }
        }
        try {
            return f.apply(this, args);
        } catch (ՐՏ_Exception) {
            var e = ՐՏ_Exception;
            if (/Class constructor \w+ cannot be invoked without 'new'/.test(e)) {
                return new f(args);
            }
            throw ՐՏ_Exception;
        }
    };
}
kwargs.memo = {};
function ՐՏ_def_modules() {
    var modules;
    modules = {};
    function mounter(mod_id) {
        var rs_mod_id, rs_mod;
        rs_mod_id = "ՐՏ:" + mod_id;
        rs_mod = modules[rs_mod_id] = {
            "body": null,
            "exports": null
        };
        rs_mod["export"] = function(prop, get, set) {
            if (!rs_mod["exports"]) {
                rs_mod["exports"] = {};
            }
            Object.defineProperty(rs_mod["exports"], prop, {
                configurable: true,
                enumerable: true,
                get: get,
                set: set
            });
        };
        Object.defineProperty(modules, mod_id, {
            enumerable: true,
            get: function() {
                var mod;
                return (mod = modules[rs_mod_id])["exports"] || mod["body"]();
            },
            set: function(v) {
                modules[rs_mod_id]["exports"] = v;
            }
        });
        return rs_mod;
    }
    Object.defineProperty(modules, "ՐՏ_def", {
        configurable: false,
        enumerable: false,
        value: mounter
    });
    return modules;
}
var ՐՏ_modules = ՐՏ_def_modules();
ՐՏ_modules.ՐՏ_def("utils");
ՐՏ_modules.ՐՏ_def("ast");
ՐՏ_modules.ՐՏ_def("tokenizer");
ՐՏ_modules.ՐՏ_def("parser");
ՐՏ_modules.ՐՏ_def("_baselib");
ՐՏ_modules.ՐՏ_def("stream");
ՐՏ_modules.ՐՏ_def("output");

ՐՏ_modules["ՐՏ:utils"].body = function(){
    var __name__ = "utils";

    var RAPYD_PREFIX, MAP, colors;
    RAPYD_PREFIX = "ՐՏ";
    function slice(a, start) {
        return Array.prototype.slice.call(a, start || 0);
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
            value: function __init__(message, filename, readfile_error){
                var self = this;
                self.message = message;
                self.filename = filename;
                self.readfile_error = readfile_error;
            }

        }
    }), ՐՏ_1);
    var ParseError = (ՐՏ_2 = function ParseError() {
        ParseError.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_2, Error), Object.defineProperties(ՐՏ_2.prototype, {
        __init__: {
            enumerable: true, 
            writable: true, 
            value: function __init__(message, line, col, pos, is_eof, filename){
                var self = this;
                self.message = message;
                self.line = line;
                self.col = col;
                self.pos = pos;
                self.stack = new Error().stack;
                self.is_eof = is_eof;
                self.filename = filename;
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
        var ret, key;
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
    }();
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
        var f, cats, i, skip, j, cat;
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
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:utils"];
    ՐՏ_mod.export("RAPYD_PREFIX", function(){return RAPYD_PREFIX;}, function(ՐՏ_v){if (typeof RAPYD_PREFIX !== "undefined") {RAPYD_PREFIX = ՐՏ_v;};});
    ՐՏ_mod.export("MAP", function(){return MAP;}, function(ՐՏ_v){if (typeof MAP !== "undefined") {MAP = ՐՏ_v;};});
    ՐՏ_mod.export("colors", function(){return colors;}, function(ՐՏ_v){if (typeof colors !== "undefined") {colors = ՐՏ_v;};});
    ՐՏ_mod.export("slice", function(){return slice;}, function(ՐՏ_v){if (typeof slice !== "undefined") {slice = ՐՏ_v;};});
    ՐՏ_mod.export("member", function(){return member;}, function(ՐՏ_v){if (typeof member !== "undefined") {member = ՐՏ_v;};});
    ՐՏ_mod.export("find_if", function(){return find_if;}, function(ՐՏ_v){if (typeof find_if !== "undefined") {find_if = ՐՏ_v;};});
    ՐՏ_mod.export("repeat_string", function(){return repeat_string;}, function(ՐՏ_v){if (typeof repeat_string !== "undefined") {repeat_string = ՐՏ_v;};});
    ՐՏ_mod.export("DefaultsError", function(){return DefaultsError;}, function(ՐՏ_v){if (typeof DefaultsError !== "undefined") {DefaultsError = ՐՏ_v;};});
    ՐՏ_mod.export("ImportError", function(){return ImportError;}, function(ՐՏ_v){if (typeof ImportError !== "undefined") {ImportError = ՐՏ_v;};});
    ՐՏ_mod.export("ParseError", function(){return ParseError;}, function(ՐՏ_v){if (typeof ParseError !== "undefined") {ParseError = ՐՏ_v;};});
    ՐՏ_mod.export("defaults", function(){return defaults;}, function(ՐՏ_v){if (typeof defaults !== "undefined") {defaults = ՐՏ_v;};});
    ՐՏ_mod.export("merge", function(){return merge;}, function(ՐՏ_v){if (typeof merge !== "undefined") {merge = ՐՏ_v;};});
    ՐՏ_mod.export("noop", function(){return noop;}, function(ՐՏ_v){if (typeof noop !== "undefined") {noop = ՐՏ_v;};});
    ՐՏ_mod.export("push_uniq", function(){return push_uniq;}, function(ՐՏ_v){if (typeof push_uniq !== "undefined") {push_uniq = ՐՏ_v;};});
    ՐՏ_mod.export("string_template", function(){return string_template;}, function(ՐՏ_v){if (typeof string_template !== "undefined") {string_template = ՐՏ_v;};});
    ՐՏ_mod.export("remove", function(){return remove;}, function(ՐՏ_v){if (typeof remove !== "undefined") {remove = ՐՏ_v;};});
    ՐՏ_mod.export("mergeSort", function(){return mergeSort;}, function(ՐՏ_v){if (typeof mergeSort !== "undefined") {mergeSort = ՐՏ_v;};});
    ՐՏ_mod.export("set_difference", function(){return set_difference;}, function(ՐՏ_v){if (typeof set_difference !== "undefined") {set_difference = ՐՏ_v;};});
    ՐՏ_mod.export("set_intersection", function(){return set_intersection;}, function(ՐՏ_v){if (typeof set_intersection !== "undefined") {set_intersection = ՐՏ_v;};});
    ՐՏ_mod.export("makePredicate", function(){return makePredicate;}, function(ՐՏ_v){if (typeof makePredicate !== "undefined") {makePredicate = ՐՏ_v;};});
    ՐՏ_mod.export("Dictionary", function(){return Dictionary;}, function(ՐՏ_v){if (typeof Dictionary !== "undefined") {Dictionary = ՐՏ_v;};});
    ՐՏ_mod.export("ansi", function(){return ansi;}, function(ՐՏ_v){if (typeof ansi !== "undefined") {ansi = ՐՏ_v;};});
    ՐՏ_mod.export("colored", function(){return colored;}, function(ՐՏ_v){if (typeof colored !== "undefined") {colored = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

ՐՏ_modules["ՐՏ:ast"].body = function(){
    var __name__ = "ast";

    var noop = ՐՏ_modules["utils"].noop;var string_template = ՐՏ_modules["utils"].string_template;var colored = ՐՏ_modules["utils"].colored;
    function memoized(f) {
        return function(x) {
            if (!this.computedType) {
                this.computedType = f.call(this, x);
            }
            return this.computedType;
        };
    }
    var AST = (ՐՏ_3 = function AST() {
        AST.prototype.__init__.apply(this, arguments);
    }, (function(){
        var properties = {};
        Object.defineProperties(ՐՏ_3.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            __init__: {
                enumerable: true, 
                writable: true, 
                value: function __init__(initializer){
                    var self = this;
                    var obj, i;
                    if (initializer) {
                        obj = self;
                        while (obj) {
                            for (i in obj.properties) {
                                self[i] = initializer[i];
                            }
                            obj = Object.getPrototypeOf(obj);
                        }
                    }
                }

            },
            clone: {
                enumerable: true, 
                writable: true, 
                value: function clone(){
                    var self = this;
                    return new self.constructor(self);
                }

            }
        })    })(), ՐՏ_3);
    var Token = (ՐՏ_4 = function Token() {
        AST.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_4, AST), (function(){
        var properties = {
            "type": "The type of the token",
            "subtype": "The subtype of the token",
            "value": "The value of the token",
            "_value": "The src value of the token",
            "line": "The line number at which the token occurs",
            "col": "The column number at which the token occurs",
            "pos": "Absolute position of the token start, relative to document start",
            "endpos": "Absolute position of the token start, relative to document start",
            "newline_before": "True if there was a newline before this token",
            "comments_before": "True if there were comments before this token",
            "comma_expected": "True if comma was expected instead of this token",
            "file": "Name of the file currently being parsed"
        };
        Object.defineProperties(ՐՏ_4.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_4);
    var Node = (ՐՏ_5 = function Node() {
        AST.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_5, AST), (function(){
        var properties = {
            "start": "[Token] The first token of this node",
            "end": "[Token] The last token of this node"
        };
        var computedType = null;
        Object.defineProperties(ՐՏ_5.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            computedType: {
                enumerable: true, 
                writable: true, 
                value: computedType
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var heap = this;
                    return "?";
                })

            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self);
                }

            },
            walk: {
                enumerable: true, 
                writable: true, 
                value: function walk(visitor){
                    var self = this;
                    return self._walk(visitor);
                }

            },
            _dump: {
                enumerable: true, 
                writable: true, 
                value: function _dump(depth, omit, offset, include_name, compact){
                    var ՐՏitr7, ՐՏidx7, ՐՏitr8, ՐՏidx8, ՐՏitr9, ՐՏidx9, ՐՏitr10, ՐՏidx10;
                    var self = this;
                    var key, colored_key, value, element, property;
                    function out(string) {
                        var pad;
                        pad = new Array(offset + 1).join("  ");
                        console.log(pad + string);
                    }
                    if (include_name) {
                        out(colored(ՐՏ_type(self), "yellow"));
                    }
                    ՐՏitr7 = ՐՏ_Iterable(this);
                    for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                        key = ՐՏitr7[ՐՏidx7];
                        if (ՐՏ_in(key, omit)) {
                            continue;
                        }
                        colored_key = colored(key + ": ", "blue");
                        value = self[key];
                        if (Array.isArray(value)) {
                            if (value.length) {
                                out(" " + colored_key + "[");
                                if (depth > 1) {
                                    ՐՏitr8 = ՐՏ_Iterable(value);
                                    for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                                        element = ՐՏitr8[ՐՏidx8];
                                        element._dump(depth - 1, omit, offset + 1, true, compact);
                                    }
                                } else {
                                    ՐՏitr9 = ՐՏ_Iterable(value);
                                    for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
                                        element = ՐՏitr9[ՐՏidx9];
                                        out("   " + colored(ՐՏ_type(element), "yellow"));
                                    }
                                }
                                out(" ]");
                            } else {
                                if (!compact) {
                                    out(" " + colored_key + "[]");
                                }
                            }
                        } else if (!(ՐՏ_in(value, [ void 0, null ]))) {
                            if (ՐՏ_type(value)) {
                                if (ՐՏ_type(value) === "Token") {
                                    if (compact) {
                                        out(" " + colored_key + colored(ՐՏ_type(value) + "(" + value.file + ":" + value.line + ":" + value.col + ": " + value.value + ")", "magenta"));
                                    } else {
                                        out(" " + colored_key + colored(ՐՏ_type(value), "magenta"));
                                        ՐՏitr10 = ՐՏ_Iterable(value);
                                        for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
                                            property = ՐՏitr10[ՐՏidx10];
                                            out("   " + colored(property + ": ", "blue") + value[property]);
                                        }
                                    }
                                } else {
                                    out(" " + colored_key + colored(ՐՏ_type(value), "yellow"));
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
                }

            },
            dump: {
                enumerable: true, 
                writable: true, 
                value: function dump(depth, omit, compact){
                    var self = this;
                    depth = depth === void 0 ? 2 : depth;
                    omit = omit === void 0 ? [ "start", "end" ] : omit;
                    compact = compact === void 0 ? true : compact;
                    return self._dump(depth, omit, 0, true, compact);
                }

            }
        })    })(), Object.defineProperties(ՐՏ_5, {
        warn_function: {
            enumerable: true, 
            writable: true, 
            value: function warn_function(self){
            }

        },
        warn: {
            enumerable: true, 
            writable: true, 
            value: function warn(txt, props){
                if (Node.warn_function) {
                    Node.warn_function(string_template(txt, props));
                }
            }

        }
    }), ՐՏ_5);
    var Statement = (ՐՏ_6 = function Statement() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_6, Node), ՐՏ_6);
    var Debugger = (ՐՏ_7 = function Debugger() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_7, Statement), ՐՏ_7);
    var Directive = (ՐՏ_8 = function Directive() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_8, Statement), (function(){
        var properties = {
            value: "[string] The value of this directive as a plain string (it's not a String!)",
            scope: "[Scope/S] The scope that this directive affects"
        };
        Object.defineProperties(ՐՏ_8.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_8);
    var SimpleStatement = (ՐՏ_9 = function SimpleStatement() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_9, Statement), (function(){
        var properties = {
            body: "[Node] an expression node (should not be instanceof Statement)"
        };
        Object.defineProperties(ՐՏ_9.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            walk_: {
                enumerable: true, 
                writable: true, 
                value: function walk_(){
                    var visitor = this;
                    var node;
                    node = this;
                    return visitor._visit(node, function() {
                        node.body._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_9);
    function walk_body(node, visitor) {
        var ՐՏitr11, ՐՏidx11;
        var stat;
        if (node.body instanceof Statement) {
            node.body._walk(visitor);
        } else if (node.body) {
            ՐՏitr11 = ՐՏ_Iterable(node.body);
            for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
                stat = ՐՏitr11[ՐՏidx11];
                stat._walk(visitor);
            }
        }
    }
    var Block = (ՐՏ_10 = function Block() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_10, Statement), (function(){
        var properties = {
            body: "[Statement*] an array of statements"
        };
        Object.defineProperties(ՐՏ_10.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        walk_body(self, visitor);
                    });
                }

            }
        })    })(), ՐՏ_10);
    var BlockStatement = (ՐՏ_11 = function BlockStatement() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_11, Block), ՐՏ_11);
    var EmptyStatement = (ՐՏ_12 = function EmptyStatement() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_12, Statement), Object.defineProperties(ՐՏ_12.prototype, {
        _walk: {
            enumerable: true, 
            writable: true, 
            value: function _walk(visitor){
                var self = this;
                return visitor._visit(self);
            }

        }
    }), ՐՏ_12);
    var StatementWithBody = (ՐՏ_13 = function StatementWithBody() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_13, Statement), (function(){
        var properties = {
            body: "[Statement] the body; this should always be present, even if it's an EmptyStatement"
        };
        Object.defineProperties(ՐՏ_13.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.body._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_13);
    var LabeledStatement = (ՐՏ_14 = function LabeledStatement() {
        StatementWithBody.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_14, StatementWithBody), (function(){
        var properties = {
            label: "[Label] a label definition"
        };
        Object.defineProperties(ՐՏ_14.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.label._walk(visitor);
                        self.body._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_14);
    var DWLoop = (ՐՏ_15 = function DWLoop() {
        StatementWithBody.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_15, StatementWithBody), (function(){
        var properties = {
            condition: "[Node] the loop condition.  Should not be instanceof Statement"
        };
        Object.defineProperties(ՐՏ_15.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.condition._walk(visitor);
                        self.body._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_15);
    var Do = (ՐՏ_16 = function Do() {
        DWLoop.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_16, DWLoop), ՐՏ_16);
    var While = (ՐՏ_17 = function While() {
        DWLoop.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_17, DWLoop), ՐՏ_17);
    var ForIn = (ՐՏ_18 = function ForIn() {
        StatementWithBody.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_18, StatementWithBody), (function(){
        var properties = {
            init: "[Node] the `for/in` initialization code",
            name: "[SymbolRef?] the loop variable, only if `init` is Var",
            object: "[Node] the object that we're looping through"
        };
        Object.defineProperties(ՐՏ_18.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.init._walk(visitor);
                        self.object._walk(visitor);
                        self.body._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_18);
    var ForJS = (ՐՏ_19 = function ForJS() {
        StatementWithBody.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_19, StatementWithBody), (function(){
        var properties = {
            condition: "[Verbatim] raw JavaScript conditional"
        };
        Object.defineProperties(ՐՏ_19.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_19);
    var ListComprehension = (ՐՏ_20 = function ListComprehension() {
        ForIn.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_20, ForIn), (function(){
        var properties = {
            condition: "[Node] the `if` condition",
            statement: "[Node] statement to perform on each element before returning it"
        };
        Object.defineProperties(ՐՏ_20.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.init._walk(visitor);
                        self.statement._walk(visitor);
                        if (self.condition) {
                            self.condition._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_20);
    var DictComprehension = (ՐՏ_21 = function DictComprehension() {
        ListComprehension.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_21, ListComprehension), (function(){
        var properties = {
            value_statement: "[Node] statement to perform on each value before returning it"
        };
        Object.defineProperties(ՐՏ_21.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.init._walk(visitor);
                        self.statement._walk(visitor);
                        self.value_statement._walk(visitor);
                        if (self.condition) {
                            self.condition._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_21);
    var With = (ՐՏ_22 = function With() {
        StatementWithBody.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_22, StatementWithBody), (function(){
        var properties = {
            expression: "[Node] the `with` expression"
        };
        Object.defineProperties(ՐՏ_22.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.expression._walk(visitor);
                        self.body._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_22);
    var Scope = (ՐՏ_23 = function Scope() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_23, Block), (function(){
        var properties = {
            docstring: "[string?] docstring for this scope, if any",
            directives: "[string*/S] an array of directives declared in this scope",
            variables: "[Object/S] a map of name -> SymbolDef for all variables/functions defined in this scope",
            localvars: "[SymbolDef*] list of variables local to this scope",
            functions: "[Object/S] like `variables`, but only lists function declarations",
            parent_scope: "[Scope?/S] link to the parent scope",
            enclosed: "[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes"
        };
        Object.defineProperties(ՐՏ_23.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_23);
    var TopLevel = (ՐՏ_24 = function TopLevel() {
        Scope.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_24, Scope), (function(){
        var properties = {
            async: "[boolean] if True this is async (external) module should be set at runtime",
            globals: "[Object/S] a map of name -> SymbolDef for all undeclared names",
            baselib: "[Object/s] a collection of used parts of baselib",
            imports: "[Object/S] a map of module_id->TopLevel for all imported modules",
            nonlocalvars: "[String*] a list of all non-local variable names (names that come from the global scope)",
            strict: "[boolean/S] true if strict directive is in scope",
            shebang: "[string] If #! line is present, it will be stored here",
            import_order: "[number] The global order in which this scope was imported",
            module_id: "[string] The id of this module",
            exports: "[SymbolDef*] list of names exported from this module",
            submodules: "[string*] list of names exported from this module",
            classes: "[Object/S] a map of class names to Class for classes defined in this module",
            filename: "[string] The absolute path to the file from which this module was read",
            srchash: "[string] SHA1 hash of source code, used for caching"
        };
        Object.defineProperties(ՐՏ_24.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_24);
    var Splat = (ՐՏ_25 = function Splat() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_25, Statement), (function(){
        var properties = {
            module: "[SymbolVar] name of the module we're splatting",
            key: "[string] The key by which this module is stored in the global modules mapping",
            body: "[TopLevel] parsed contents of the imported file"
        };
        Object.defineProperties(ՐՏ_25.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_25);
    var Import = (ՐՏ_26 = function Import() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_26, Statement), (function(){
        var properties = {
            module: "[SymbolVar] name of the module we're importing",
            key: "[string] The key by which this module is stored in the global modules mapping",
            alias: "[SymbolAlias] The name this module is imported as, can be None. For import x as y statements.",
            argnames: "[ImportedVar*] names of objects to be imported",
            body: "[Function -> TopLevel] returns parsed contents of the imported file"
        };
        Object.defineProperties(ՐՏ_26.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr12, ՐՏidx12;
                        var arg;
                        ՐՏitr12 = ՐՏ_Iterable(self.argnames);
                        for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
                            arg = ՐՏitr12[ՐՏidx12];
                            arg._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_26);
    var Imports = (ՐՏ_27 = function Imports() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_27, Statement), (function(){
        var properties = {
            "imports": "[Import+] array of imports"
        };
        Object.defineProperties(ՐՏ_27.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr13, ՐՏidx13;
                        var imp;
                        ՐՏitr13 = ՐՏ_Iterable(self.imports);
                        for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
                            imp = ՐՏitr13[ՐՏidx13];
                            imp._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_27);
    var Decorator = (ՐՏ_28 = function Decorator() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_28, Node), (function(){
        var properties = {
            expression: "[Node] decorator expression"
        };
        Object.defineProperties(ՐՏ_28.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    if (self.expression) {
                        self.expression.walk(visitor);
                    }
                }

            }
        })    })(), ՐՏ_28);
    var Annotation = (ՐՏ_29 = function Annotation() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_29, Node), (function(){
        var properties = {
            expression: "[Node] decorator expression"
        };
        Object.defineProperties(ՐՏ_29.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    if (self.expression) {
                        self.expression.walk(visitor);
                    }
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var self = this;
                    function parse(obj) {
                        var ՐՏ_30, ՐՏ_31;
                        if (obj instanceof Array) {
                            if (obj.elements.length === 1) {
                                return "[" + parse(obj.elements[0]) + "]";
                            }
                            return "[?]";
                        }
                        if (obj instanceof ObjectLiteral) {
                            if (obj.properties.length === 1) {
                                return "{String:" + parse(obj.properties[0].value) + "}";
                            }
                            return "{String:?}";
                        }
                        if (obj instanceof SymbolRef) {
                            return obj.name === "Array" ? "[?]" : ՐՏ_in(obj.name, [ "Object", "Dictionary" ]) ? "{String:?}" : obj.name;
                        }
                        if (obj instanceof Call) {
                            if (obj.expression instanceof SymbolRef && obj.expression.name === "Array" && obj.args.length === 1) {
                                return "[" + parse(obj.args[0]) + "]";
                            }
                            if (obj.expression instanceof SymbolRef && ՐՏ_in(obj.expression.name, [ "Object", "Dictionary" ])) {
                                if (1 <= (ՐՏ_30 = obj.args.length) && ՐՏ_30 <= 2) {
                                    return "{String:" + parse((ՐՏ_31 = obj.args)[ՐՏ_31.length-1]) + "}";
                                }
                                return "{String:?}";
                            }
                        }
                        return "?";
                    }
                    return parse(self.expression);
                })

            }
        })    })(), ՐՏ_29);
    var Lambda = (ՐՏ_32 = function Lambda() {
        Scope.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_32, Scope), (function(){
        var properties = {
            name: "[SymbolDeclaration?] the name of this function/class/method",
            argnames: "[SymbolFunarg*] array of arguments",
            kwargs: "[SymbolFunarg?] kwargs symbol, if any",
            uses_arguments: "[boolean/S] tells whether this function accesses the arguments array",
            decorators: "[Decorator*] function decorators, if any",
            generator: "[boolean] true if this is a generator function (false by default)",
            return_annotation: "[Annotation?] the return type annotation provided (if any)"
        };
        Object.defineProperties(ՐՏ_32.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr14, ՐՏidx14, ՐՏitr15, ՐՏidx15;
                        var d, arg;
                        if (self.decorators) {
                            ՐՏitr14 = ՐՏ_Iterable(self.decorators);
                            for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
                                d = ՐՏitr14[ՐՏidx14];
                                d.walk(visitor);
                            }
                        }
                        if (self.name) {
                            self.name._walk(visitor);
                        }
                        ՐՏitr15 = ՐՏ_Iterable(self.argnames);
                        for (ՐՏidx15 = 0; ՐՏidx15 < ՐՏitr15.length; ՐՏidx15++) {
                            arg = ՐՏitr15[ՐՏidx15];
                            arg._walk(visitor);
                        }
                        if (self.argnames.starargs) {
                            self.argnames.starargs._walk(visitor);
                        }
                        if (self.kwargs) {
                            self.kwargs._walk(visitor);
                        }
                        walk_body(self, visitor);
                    });
                }

            }
        })    })(), ՐՏ_32);
    var Accessor = (ՐՏ_33 = function Accessor() {
        Lambda.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_33, Lambda), ՐՏ_33);
    var Function = (ՐՏ_34 = function Function() {
        Lambda.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_34, Lambda), Object.defineProperties(ՐՏ_34.prototype, {
        resolveType: {
            enumerable: true, 
            writable: true, 
            value: memoized(function resolveType(heap){
                var ՐՏitr16, ՐՏidx16;
                var self = this;
                var annotated, args, arg, computedType, result, signature;
                if (self.argnames.starargs) {
                    return "Function";
                }
                annotated = true;
                args = [];
                ՐՏitr16 = ՐՏ_Iterable(self.argnames);
                for (ՐՏidx16 = 0; ՐՏidx16 < ՐՏitr16.length; ՐՏidx16++) {
                    arg = ՐՏitr16[ՐՏidx16];
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
                if (self.return_annotation) {
                    result = self.return_annotation.resolveType(heap);
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
            })

        }
    }), ՐՏ_34);
    var Class = (ՐՏ_35 = function Class() {
        Scope.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_35, Scope), (function(){
        var properties = {
            name: "[SymbolDeclaration?] the name of this class",
            init: "[Function] constructor for the class",
            parent: "[Class?] parent class this class inherits from",
            static: "[string*] list of static methods",
            external: "[boolean] true if class is declared elsewhere, but will be within current scope at runtime",
            bound: "[string*] hash of methods that need to be bound to behave correctly (function pointers)",
            decorators: "[Decorator*] function decorators, if any",
            module_id: "[string] The id of the module this class is defined in",
            statements: "[Node*] list of statements in the class scope (excluding method definitions)"
        };
        Object.defineProperties(ՐՏ_35.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.name._walk(visitor);
                        walk_body(this, visitor);
                        if (self.parent) {
                            self.parent._walk(visitor);
                        }
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var self = this;
                    return self.name.name;
                })

            }
        })    })(), ՐՏ_35);
    var Module = (ՐՏ_36 = function Module() {
        Scope.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_36, Scope), (function(){
        var properties = {
            name: "[SymbolDeclaration?] the name of this class",
            external: "[boolean] true if module is declared elsewhere, but will be within current scope at runtime",
            decorators: "[Decorator*] module decorators, if any"
        };
        Object.defineProperties(ՐՏ_36.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_36);
    var Method = (ՐՏ_37 = function Method() {
        Lambda.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_37, Lambda), (function(){
        var properties = {
            static: "[boolean] true if method is static"
        };
        Object.defineProperties(ՐՏ_37.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_37);
    var Constructor = (ՐՏ_38 = function Constructor() {
        Method.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_38, Method), (function(){
        var properties = {
            callsSuper: "[boolean] true if user manually called super or Parent.__init__",
            parent: "[string?] parent class this class inherits from"
        };
        Object.defineProperties(ՐՏ_38.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_38);
    var Jump = (ՐՏ_39 = function Jump() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_39, Statement), ՐՏ_39);
    var Exit = (ՐՏ_40 = function Exit() {
        Jump.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_40, Jump), (function(){
        var properties = {
            value: "[Node?] the value returned or thrown by this statement; could be null for Return"
        };
        Object.defineProperties(ՐՏ_40.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        if (self.value) {
                            self.value._walk(visitor);
                        }
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var self = this;
                    return self.value.resolveType(heap);
                })

            }
        })    })(), ՐՏ_40);
    var Return = (ՐՏ_41 = function Return() {
        Exit.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_41, Exit), ՐՏ_41);
    var Yield = (ՐՏ_42 = function Yield() {
        Exit.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_42, Exit), (function(){
        var properties = {
            yield_from: "[boolean] true if it is `yield from` i.e. JS `yield*` ",
            yield_request: "[boolean] true if some value is requested from `yield`: `a = yield` or `f(yield, ...) ` and so on"
        };
        Object.defineProperties(ՐՏ_42.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_42);
    var Throw = (ՐՏ_43 = function Throw() {
        Exit.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_43, Exit), ՐՏ_43);
    var LoopControl = (ՐՏ_44 = function LoopControl() {
        Jump.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_44, Jump), (function(){
        var properties = {
            label: "[LabelRef?] the label, or null if none"
        };
        Object.defineProperties(ՐՏ_44.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        if (self.label) {
                            self.label._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_44);
    var Break = (ՐՏ_45 = function Break() {
        LoopControl.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_45, LoopControl), ՐՏ_45);
    var Continue = (ՐՏ_46 = function Continue() {
        LoopControl.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_46, LoopControl), ՐՏ_46);
    var If = (ՐՏ_47 = function If() {
        StatementWithBody.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_47, StatementWithBody), (function(){
        var properties = {
            condition: "[Node] the `if` condition",
            alternative: "[Statement?] the `else` part, or null if not present"
        };
        Object.defineProperties(ՐՏ_47.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.condition._walk(visitor);
                        self.body._walk(visitor);
                        if (self.alternative) {
                            self.alternative._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_47);
    var Switch = (ՐՏ_48 = function Switch() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_48, Block), (function(){
        var properties = {
            expression: "[Node] the `switch` “discriminant”"
        };
        Object.defineProperties(ՐՏ_48.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.expression._walk(visitor);
                        walk_body(self, visitor);
                    });
                }

            }
        })    })(), ՐՏ_48);
    var SwitchBranch = (ՐՏ_49 = function SwitchBranch() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_49, Block), ՐՏ_49);
    var Default = (ՐՏ_50 = function Default() {
        SwitchBranch.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_50, SwitchBranch), ՐՏ_50);
    var Case = (ՐՏ_51 = function Case() {
        SwitchBranch.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_51, SwitchBranch), (function(){
        var properties = {
            expression: "[Node] the `case` expression"
        };
        Object.defineProperties(ՐՏ_51.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.expression._walk(visitor);
                        walk_body(self, visitor);
                    });
                }

            }
        })    })(), ՐՏ_51);
    var Try = (ՐՏ_52 = function Try() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_52, Block), (function(){
        var properties = {
            bcatch: "[Catch?] the catch block, or null if not present",
            bfinally: "[Finally?] the finally block, or null if not present"
        };
        Object.defineProperties(ՐՏ_52.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        walk_body(self, visitor);
                        if (self.bcatch) {
                            self.bcatch._walk(visitor);
                        }
                        if (self.bfinally) {
                            self.bfinally._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_52);
    var Catch = (ՐՏ_53 = function Catch() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_53, Block), ՐՏ_53);
    var Except = (ՐՏ_54 = function Except() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_54, Block), (function(){
        var properties = {
            argname: "[SymbolCatch] symbol for the exception",
            errors: "[SymbolVar*] error classes to catch in this block"
        };
        Object.defineProperties(ՐՏ_54.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr17, ՐՏidx17;
                        var e;
                        if (self.argname) {
                            self.argname.walk(visitor);
                        }
                        if (self.errors) {
                            ՐՏitr17 = ՐՏ_Iterable(self.errors);
                            for (ՐՏidx17 = 0; ՐՏidx17 < ՐՏitr17.length; ՐՏidx17++) {
                                e = ՐՏitr17[ՐՏidx17];
                                e.walk(visitor);
                            }
                        }
                        walk_body(self, visitor);
                    });
                }

            }
        })    })(), ՐՏ_54);
    var Finally = (ՐՏ_55 = function Finally() {
        Block.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_55, Block), ՐՏ_55);
    var Definitions = (ՐՏ_56 = function Definitions() {
        Statement.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_56, Statement), (function(){
        var properties = {
            definitions: "[VarDef*] array of variable definitions"
        };
        Object.defineProperties(ՐՏ_56.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr18, ՐՏidx18;
                        var def_;
                        ՐՏitr18 = ՐՏ_Iterable(self.definitions);
                        for (ՐՏidx18 = 0; ՐՏidx18 < ՐՏitr18.length; ՐՏidx18++) {
                            def_ = ՐՏitr18[ՐՏidx18];
                            def_._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_56);
    var Var = (ՐՏ_57 = function Var() {
        Definitions.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_57, Definitions), ՐՏ_57);
    var Const = (ՐՏ_58 = function Const() {
        Definitions.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_58, Definitions), ՐՏ_58);
    var VarDef = (ՐՏ_59 = function VarDef() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_59, Node), (function(){
        var properties = {
            name: "[SymbolVar|SymbolConst] name of the variable",
            value: "[Node?] initializer, or null if there's no initializer"
        };
        Object.defineProperties(ՐՏ_59.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.name._walk(visitor);
                        if (self.value) {
                            self.value._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_59);
    var BaseCall = (ՐՏ_60 = function BaseCall() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_60, Node), (function(){
        var properties = {
            args: "[Node*] array of arguments"
        };
        Object.defineProperties(ՐՏ_60.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_60);
    var Call = (ՐՏ_61 = function Call() {
        BaseCall.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_61, BaseCall), (function(){
        var properties = {
            expression: "[Node] expression to invoke as function"
        };
        Object.defineProperties(ՐՏ_61.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr19, ՐՏidx19, ՐՏitr20, ՐՏidx20, ՐՏitr21, ՐՏidx21;
                        var arg;
                        self.expression._walk(visitor);
                        ՐՏitr19 = ՐՏ_Iterable(self.args);
                        for (ՐՏidx19 = 0; ՐՏidx19 < ՐՏitr19.length; ՐՏidx19++) {
                            arg = ՐՏitr19[ՐՏidx19];
                            arg._walk(visitor);
                        }
                        if (self.args.kwargs) {
                            ՐՏitr20 = ՐՏ_Iterable(self.args.kwargs);
                            for (ՐՏidx20 = 0; ՐՏidx20 < ՐՏitr20.length; ՐՏidx20++) {
                                arg = ՐՏitr20[ՐՏidx20];
                                arg[0]._walk(visitor);
                                arg[1]._walk(visitor);
                            }
                        }
                        if (self.args.kwarg_items) {
                            ՐՏitr21 = ՐՏ_Iterable(self.args.kwarg_items);
                            for (ՐՏidx21 = 0; ՐՏidx21 < ՐՏitr21.length; ՐՏidx21++) {
                                arg = ՐՏitr21[ՐՏidx21];
                                arg._walk(visitor);
                            }
                        }
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var ՐՏitr22, ՐՏidx22, ՐՏ_62, ՐՏ_63, ՐՏ_64;
                    var self = this;
                    var scope, exp_name, parse, result;
                    if (self.expression instanceof SymbolRef) {
                        ՐՏitr22 = ՐՏ_Iterable(reversed(heap));
                        for (ՐՏidx22 = 0; ՐՏidx22 < ՐՏitr22.length; ՐՏidx22++) {
                            scope = ՐՏitr22[ՐՏidx22];
                            exp_name = self.expression.name;
                            if (ՐՏ_in(exp_name, scope.vars) && (ՐՏ_62 = scope.vars[exp_name])[ՐՏ_62.length-1] && ՐՏ_in("->", (ՐՏ_63 = scope.vars[exp_name])[ՐՏ_63.length-1])) {
                                return (ՐՏ_64 = scope.vars[exp_name])[ՐՏ_64.length-1].split("->")[1].trim();
                            } else if (ՐՏ_in(exp_name, scope.functions) && scope.functions[exp_name] && ՐՏ_in("->", scope.functions[exp_name])) {
                                return scope.functions[exp_name].split("->")[1].trim();
                            } else if (scope.type === "function" && exp_name === scope.name && scope.return) {
                                parse = function(variable) {
                                    var ՐՏ_65, ՐՏ_66;
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
                                    if (variable instanceof Array) {
                                        if (variable.elements.length !== 1) {
                                            return;
                                        }
                                        wrapper = "array";
                                        element = variable.elements[0];
                                    } else if (variable instanceof Call && variable.expression instanceof SymbolRef && variable.expression.name === "Array") {
                                        if (variable.args.length !== 1) {
                                            return;
                                        }
                                        wrapper = "array";
                                        element = variable.args[0];
                                    } else if (variable instanceof ObjectLiteral) {
                                        if (variable.properties.length !== 1) {
                                            return;
                                        }
                                        wrapper = "dict";
                                        element = variable.properties[0].value;
                                    } else if (variable instanceof Call && variable.expression instanceof SymbolRef && ՐՏ_in(variable.expression.name, [ "Object", "Dictionary" ])) {
                                        if (1 <= (ՐՏ_65 = variable.args.length) && ՐՏ_65 <= 2) {
                                            element = (ՐՏ_66 = variable.args)[ՐՏ_66.length-1];
                                            wrapper = "dict";
                                        } else {
                                            return;
                                        }
                                    } else {
                                        element = variable;
                                    }
                                    if (element instanceof SymbolRef && ՐՏ_in(element.name, NATIVE_CLASSES)) {
                                        return wrap[wrapper](element.name);
                                    } else if (element instanceof Array || element instanceof ObjectLiteral || element instanceof Call) {
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
                })

            }
        })    })(), ՐՏ_61);
    var ClassCall = (ՐՏ_67 = function ClassCall() {
        BaseCall.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_67, BaseCall), (function(){
        var properties = {
            class: "[string] name of the class method belongs to",
            super: "[boolean] this call can be replaced with a super() call",
            method: "[string] class method being called",
            static: "[boolean] defines whether the method is static"
        };
        Object.defineProperties(ՐՏ_67.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr23, ՐՏidx23, ՐՏitr24, ՐՏidx24, ՐՏitr25, ՐՏidx25;
                        var arg;
                        if (self.expression) {
                            self.expression._walk(visitor);
                        }
                        ՐՏitr23 = ՐՏ_Iterable(self.args);
                        for (ՐՏidx23 = 0; ՐՏidx23 < ՐՏitr23.length; ՐՏidx23++) {
                            arg = ՐՏitr23[ՐՏidx23];
                            arg._walk(visitor);
                        }
                        ՐՏitr24 = ՐՏ_Iterable(self.args.kwargs);
                        for (ՐՏidx24 = 0; ՐՏidx24 < ՐՏitr24.length; ՐՏidx24++) {
                            arg = ՐՏitr24[ՐՏidx24];
                            arg[0]._walk(visitor);
                            arg[1]._walk(visitor);
                        }
                        ՐՏitr25 = ՐՏ_Iterable(self.args.kwarg_items);
                        for (ՐՏidx25 = 0; ՐՏidx25 < ՐՏitr25.length; ՐՏidx25++) {
                            arg = ՐՏitr25[ՐՏidx25];
                            arg._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_67);
    var New = (ՐՏ_68 = function New() {
        Call.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_68, Call), ՐՏ_68);
    var Seq = (ՐՏ_69 = function Seq() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_69, Node), (function(){
        var properties = {
            car: "[Node] first element in sequence",
            cdr: "[Node] second element in sequence"
        };
        Object.defineProperties(ՐՏ_69.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            cons: {
                enumerable: true, 
                writable: true, 
                value: function cons(x, y){
                    var self = this;
                    var seq;
                    seq = new Seq(x);
                    seq.car = x;
                    seq.cdr = y;
                    return seq;
                }

            },
            from_array: {
                enumerable: true, 
                writable: true, 
                value: function from_array(array){
                    var ՐՏitr26, ՐՏidx26;
                    var self = this;
                    var list, i, p;
                    if (array.length === 0) {
                        return null;
                    }
                    if (array.length === 1) {
                        return array[0].clone();
                    }
                    list = null;
                    ՐՏitr26 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
                    for (ՐՏidx26 = 0; ՐՏidx26 < ՐՏitr26.length; ՐՏidx26++) {
                        i = ՐՏitr26[ՐՏidx26];
                        list = Seq.prototype.cons.call(array[i], list);
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
                }

            },
            to_array: {
                enumerable: true, 
                writable: true, 
                value: function to_array(){
                    var self = this;
                    var p, a;
                    p = this;
                    a = [];
                    while (p) {
                        a.push(p.car);
                        if (p.cdr && !(p.cdr instanceof Seq)) {
                            a.push(p.cdr);
                            break;
                        }
                        p = p.cdr;
                    }
                    return a;
                }

            },
            add: {
                enumerable: true, 
                writable: true, 
                value: function add(node){
                    var self = this;
                    var p, cell;
                    p = this;
                    while (p) {
                        if (!(p.cdr instanceof Seq)) {
                            cell = Seq.prototype.cons.call(p.cdr, node);
                            return p.cdr = cell;
                        }
                        p = p.cdr;
                    }
                }

            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.car._walk(visitor);
                        if (self.cdr) {
                            self.cdr._walk(visitor);
                        }
                    });
                }

            }
        })    })(), ՐՏ_69);
    var PropAccess = (ՐՏ_70 = function PropAccess() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_70, Node), (function(){
        var properties = {
            expression: "[Node] the “container” expression",
            property: "[Node|string] the property to access. For Dot this is always a plain string, while for Sub it's an arbitrary Node"
        };
        Object.defineProperties(ՐՏ_70.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_70);
    var Dot = (ՐՏ_71 = function Dot() {
        PropAccess.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_71, PropAccess), Object.defineProperties(ՐՏ_71.prototype, {
        _walk: {
            enumerable: true, 
            writable: true, 
            value: function _walk(visitor){
                var self = this;
                return visitor._visit(self, function() {
                    self.expression._walk(visitor);
                });
            }

        },
        resolveType: {
            enumerable: true, 
            writable: true, 
            value: memoized(function resolveType(heap){
                var self = this;
                var containerType;
                containerType = self.expression.resolveType(heap);
                if (containerType && containerType[0] === "{") {
                    return /\{\w+:(.*)\}/.exec(containerType)[1];
                }
                return "?";
            })

        }
    }), ՐՏ_71);
    var Sub = (ՐՏ_72 = function Sub() {
        PropAccess.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_72, PropAccess), Object.defineProperties(ՐՏ_72.prototype, {
        _walk: {
            enumerable: true, 
            writable: true, 
            value: function _walk(visitor){
                var self = this;
                return visitor._visit(self, function() {
                    self.expression._walk(visitor);
                    self.property._walk(visitor);
                });
            }

        },
        resolveType: {
            enumerable: true, 
            writable: true, 
            value: memoized(function resolveType(heap){
                var self = this;
                var containerType;
                containerType = self.expression.resolveType(heap);
                if (containerType) {
                    if (containerType[0] === "[" && self.property instanceof Number) {
                        return /\[(.*)\]/.exec(containerType)[1];
                    }
                    if (containerType[0] === "{") {
                        return /\{\w+:(.*)\}/.exec(containerType)[1];
                    }
                }
                return "?";
            })

        }
    }), ՐՏ_72);
    var Slice = (ՐՏ_73 = function Slice() {
        PropAccess.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_73, PropAccess), (function(){
        var properties = {
            property2: "[Node] the 2nd property to access - typically ending index for the array.",
            assignment: "[Node] The data being spliced in."
        };
        Object.defineProperties(ՐՏ_73.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.expression._walk(visitor);
                        self.property._walk(visitor);
                        self.property2._walk(visitor);
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var self = this;
                    return self.expression.resolveType(heap);
                })

            }
        })    })(), ՐՏ_73);
    var Unary = (ՐՏ_74 = function Unary() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_74, Node), (function(){
        var properties = {
            operator: "[string] the operator",
            expression: "[Node] expression that this unary operator applies to"
        };
        Object.defineProperties(ՐՏ_74.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.expression._walk(visitor);
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var self = this;
                    if (self.operator === "!") {
                        return "Boolean";
                    }
                    if (ՐՏ_in(self.operator, [ "-", "+" ]) && self.expression.resolveType(heap) === "Number") {
                        return "Number";
                    }
                    return "?";
                })

            }
        })    })(), ՐՏ_74);
    var UnaryPrefix = (ՐՏ_75 = function UnaryPrefix() {
        Unary.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_75, Unary), ՐՏ_75);
    var UnaryPostfix = (ՐՏ_76 = function UnaryPostfix() {
        Unary.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_76, Unary), ՐՏ_76);
    var Binary = (ՐՏ_77 = function Binary() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_77, Node), (function(){
        var properties = {
            left: "[Node] left-hand side expression",
            operator: "[string] the operator",
            right: "[Node] right-hand side expression"
        };
        Object.defineProperties(ՐՏ_77.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.left._walk(visitor);
                        self.right._walk(visitor);
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var self = this;
                    var left, right;
                    if (!(self.left && self.right)) {
                        return "?";
                    }
                    left = self.left.resolveType(heap);
                    right = self.left.resolveType(heap);
                    if (left === "Number" && right === "Number") {
                        return "Number";
                    }
                    if (left === "Boolean" && right === "Boolean" || ՐՏ_in(self.operator, [ "===", "!==", ">", ">=", "<", "<=" ])) {
                        return "Boolean";
                    }
                    if (left === "String" && self.operator === "+") {
                        return "String";
                    }
                    return "?";
                })

            }
        })    })(), ՐՏ_77);
    var Range = (ՐՏ_78 = function Range() {
        Binary.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_78, Binary), Object.defineProperties(ՐՏ_78.prototype, {
        resolveType: {
            enumerable: true, 
            writable: true, 
            value: memoized(function resolveType(heap){
                var self = this;
                return "[Number]";
            })

        }
    }), ՐՏ_78);
    var DeepEquality = (ՐՏ_79 = function DeepEquality() {
        Binary.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_79, Binary), Object.defineProperties(ՐՏ_79.prototype, {
        resolveType: {
            enumerable: true, 
            writable: true, 
            value: memoized(function resolveType(heap){
                var self = this;
                return "Boolean";
            })

        }
    }), ՐՏ_79);
    var Conditional = (ՐՏ_80 = function Conditional() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_80, Node), (function(){
        var properties = {
            condition: "[Node] test to run before deciding the return value",
            consequent: "[Node] return expression in the event on truthy test evaluation",
            alternative: "[Node] return expression in the event of falsy test evaluation"
        };
        Object.defineProperties(ՐՏ_80.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.condition._walk(visitor);
                        self.consequent._walk(visitor);
                        self.alternative._walk(visitor);
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var self = this;
                    var computedType;
                    computedType = self.consequent.resolveType(heap);
                    return computedType === self.alternative.resolveType(heap) ? computedType : "?";
                })

            }
        })    })(), ՐՏ_80);
    var Assign = (ՐՏ_81 = function Assign() {
        Binary.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_81, Binary), Object.defineProperties(ՐՏ_81.prototype, {
        resolveType: {
            enumerable: true, 
            writable: true, 
            value: memoized(function resolveType(heap){
                var self = this;
                if (self.operator === "=") {
                    return self.right.resolveType(heap);
                }
                return "?";
            })

        }
    }), ՐՏ_81);
    var Array = (ՐՏ_82 = function Array() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_82, Node), (function(){
        var properties = {
            elements: "[Node*] array of elements"
        };
        Object.defineProperties(ՐՏ_82.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr27, ՐՏidx27;
                        var el;
                        ՐՏitr27 = ՐՏ_Iterable(self.elements);
                        for (ՐՏidx27 = 0; ՐՏidx27 < ՐՏitr27.length; ՐՏidx27++) {
                            el = ՐՏitr27[ՐՏidx27];
                            el._walk(visitor);
                        }
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var ՐՏitr28, ՐՏidx28;
                    var self = this;
                    var expected, element, current;
                    if (!self.elements.length) {
                        return "[?]";
                    }
                    expected = self.elements[0].resolveType(heap);
                    if (!expected) {
                        return "[?]";
                    }
                    ՐՏitr28 = ՐՏ_Iterable(self.elements.slice(1));
                    for (ՐՏidx28 = 0; ՐՏidx28 < ՐՏitr28.length; ՐՏidx28++) {
                        element = ՐՏitr28[ՐՏidx28];
                        current = element.resolveType(heap);
                        if (current !== expected) {
                            if (expected.indexOf("Function") === 0 && current.indexOf("Function") === 0) {
                                return "[Function]";
                            }
                            return "[?]";
                        }
                    }
                    return "[" + expected + "]";
                })

            }
        })    })(), ՐՏ_82);
    var TupleUnpack = (ՐՏ_83 = function TupleUnpack() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_83, Node), (function(){
        var properties = {
            elements: "[Node*] array of elements being assigned to",
            right: "[Node] right-hand side expression"
        };
        Object.defineProperties(ՐՏ_83.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr29, ՐՏidx29;
                        var el;
                        ՐՏitr29 = ՐՏ_Iterable(self.elements);
                        for (ՐՏidx29 = 0; ՐՏidx29 < ՐՏitr29.length; ՐՏidx29++) {
                            el = ՐՏitr29[ՐՏidx29];
                            el._walk(visitor);
                        }
                        self.right._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_83);
    var ObjectLiteral = (ՐՏ_84 = function ObjectLiteral() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_84, Node), (function(){
        var properties = {
            properties: "[ObjectProperty*] array of properties"
        };
        Object.defineProperties(ՐՏ_84.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        var ՐՏitr30, ՐՏidx30;
                        var prop;
                        ՐՏitr30 = ՐՏ_Iterable(self.properties);
                        for (ՐՏidx30 = 0; ՐՏidx30 < ՐՏitr30.length; ՐՏidx30++) {
                            prop = ՐՏitr30[ՐՏidx30];
                            prop._walk(visitor);
                        }
                    });
                }

            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var ՐՏitr31, ՐՏidx31;
                    var self = this;
                    var start, spread, expected, element, current, result;
                    if (!self.properties.length) {
                        return "{String:?}";
                    }
                    start = 0;
                    spread = null;
                    while (self.properties[start] instanceof UnaryPrefix) {
                        spread = self.properties[start].expression.resolveType(heap);
                        if (ՐՏ_in("?", spread)) {
                            return "{String:?}";
                        }
                        ++start;
                    }
                    expected = self.properties[start].value.resolveType(heap);
                    if (!expected) {
                        return "{String:?}";
                    }
                    ՐՏitr31 = ՐՏ_Iterable(self.properties.slice(start + 1));
                    for (ՐՏidx31 = 0; ՐՏidx31 < ՐՏitr31.length; ՐՏidx31++) {
                        element = ՐՏitr31[ՐՏidx31];
                        if (element instanceof UnaryPrefix) {
                            if (spread) {
                                if (spread !== element.expression.resolveType(heap)) {
                                    return "{String:?}";
                                }
                            } else {
                                spread = element.expression.resolveType(heap);
                            }
                        } else if (element instanceof Accessor) {
                        } else {
                            current = element.value.resolveType(heap);
                            if (!current) {
                                return "{String:?}";
                            } else if (current !== expected) {
                                if (expected.indexOf("Function") === 0 && current.indexOf("Function") === 0) {
                                    continue;
                                } else {
                                    return "{String:?}";
                                }
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
                })

            }
        })    })(), ՐՏ_84);
    var ObjectProperty = (ՐՏ_85 = function ObjectProperty() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_85, Node), (function(){
        var properties = {
            key: "[Node] the property name or expression for computed key ",
            value: "[Node] property value. For setters and getters this is an Function."
        };
        Object.defineProperties(ՐՏ_85.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            _walk: {
                enumerable: true, 
                writable: true, 
                value: function _walk(visitor){
                    var self = this;
                    return visitor._visit(self, function() {
                        self.key._walk(visitor);
                        self.value._walk(visitor);
                    });
                }

            }
        })    })(), ՐՏ_85);
    var ObjectKeyVal = (ՐՏ_86 = function ObjectKeyVal() {
        ObjectProperty.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_86, ObjectProperty), ՐՏ_86);
    var ObjectSetter = (ՐՏ_87 = function ObjectSetter() {
        Accessor.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_87, Accessor), ՐՏ_87);
    var ObjectGetter = (ՐՏ_88 = function ObjectGetter() {
        Accessor.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_88, Accessor), ՐՏ_88);
    var Symbol = (ՐՏ_89 = function Symbol() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_89, Node), (function(){
        var properties = {
            name: "[string] name of this symbol",
            scope: "[Scope/S] the current scope (not necessarily the definition scope)",
            thedef: "[SymbolDef/S] the definition of this symbol"
        };
        Object.defineProperties(ՐՏ_89.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_89);
    var SymbolAlias = (ՐՏ_90 = function SymbolAlias() {
        Symbol.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_90, Symbol), ՐՏ_90);
    var SymbolDeclaration = (ՐՏ_91 = function SymbolDeclaration() {
        Symbol.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_91, Symbol), (function(){
        var properties = {
            init: "[Node*/S] array of initializers for this declaration."
        };
        Object.defineProperties(ՐՏ_91.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_91);
    var SymbolVar = (ՐՏ_92 = function SymbolVar() {
        SymbolDeclaration.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_92, SymbolDeclaration), ՐՏ_92);
    var SymbolNonlocal = (ՐՏ_93 = function SymbolNonlocal() {
        SymbolDeclaration.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_93, SymbolDeclaration), ՐՏ_93);
    var ImportedVar = (ՐՏ_94 = function ImportedVar() {
        SymbolVar.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_94, SymbolVar), (function(){
        var properties = {
            alias: "SymbolAlias the alias for this imported symbol"
        };
        Object.defineProperties(ՐՏ_94.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_94);
    var SymbolConst = (ՐՏ_95 = function SymbolConst() {
        SymbolDeclaration.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_95, SymbolDeclaration), ՐՏ_95);
    var SymbolFunarg = (ՐՏ_96 = function SymbolFunarg() {
        SymbolVar.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_96, SymbolVar), (function(){
        var properties = {
            annotation: "[Annotation?] annotation provided for this argument, if any"
        };
        Object.defineProperties(ՐՏ_96.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_96);
    var SymbolClass = (ՐՏ_97 = function SymbolClass() {
        SymbolDeclaration.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_97, SymbolDeclaration), ՐՏ_97);
    var SymbolDefun = (ՐՏ_98 = function SymbolDefun() {
        SymbolDeclaration.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_98, SymbolDeclaration), (function(){
        var properties = {
            js_reserved: "[boolean/S] If True, the method name must be omitted and defined as anonymous function (does matter in es5 only)"
        };
        Object.defineProperties(ՐՏ_98.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_98);
    var SymbolAccessor = (ՐՏ_99 = function SymbolAccessor() {
        SymbolDefun.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_99, SymbolDefun), ՐՏ_99);
    var SymbolLambda = (ՐՏ_100 = function SymbolLambda() {
        SymbolDeclaration.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_100, SymbolDeclaration), ՐՏ_100);
    var SymbolCatch = (ՐՏ_101 = function SymbolCatch() {
        SymbolDeclaration.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_101, SymbolDeclaration), ՐՏ_101);
    var Label = (ՐՏ_102 = function Label() {
        Symbol.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_102, Symbol), (function(){
        var properties = {
            references: "[LabelRef*] a list of nodes referring to this label"
        };
        Object.defineProperties(ՐՏ_102.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_102);
    var SymbolRef = (ՐՏ_103 = function SymbolRef() {
        Symbol.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_103, Symbol), (function(){
        var properties = {
            parens: "[boolean/S] if true, this variable is wrapped in parentheses"
        };
        Object.defineProperties(ՐՏ_103.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(heap){
                    var ՐՏitr32, ՐՏidx32, ՐՏ_104;
                    var self = this;
                    var scope;
                    ՐՏitr32 = ՐՏ_Iterable(reversed(heap));
                    for (ՐՏidx32 = 0; ՐՏidx32 < ՐՏitr32.length; ՐՏidx32++) {
                        scope = ՐՏitr32[ՐՏidx32];
                        if (ՐՏ_in(self.name, scope.vars)) {
                            return (ՐՏ_104 = scope.vars[self.name])[ՐՏ_104.length-1];
                        }
                        if (scope.args && ՐՏ_in(self.name, scope.args)) {
                            return scope.args[self.name];
                        }
                    }
                    return "?";
                })

            }
        })    })(), ՐՏ_103);
    var SymbolClassRef = (ՐՏ_105 = function SymbolClassRef() {
        Symbol.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_105, Symbol), (function(){
        var properties = {
            class: "[SymbolDeclaration?] the name of this class"
        };
        Object.defineProperties(ՐՏ_105.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            }
        })    })(), ՐՏ_105);
    var LabelRef = (ՐՏ_106 = function LabelRef() {
        Symbol.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_106, Symbol), ՐՏ_106);
    var This = (ՐՏ_107 = function This() {
        Symbol.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_107, Symbol), ՐՏ_107);
    var Constant = (ՐՏ_108 = function Constant() {
        Node.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_108, Node), Object.defineProperties(ՐՏ_108.prototype, {
        getValue: {
            enumerable: true, 
            writable: true, 
            value: function getValue(){
                var self = this;
                return this.value;
            }

        }
    }), ՐՏ_108);
    var String = (ՐՏ_109 = function String() {
        Constant.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_109, Constant), (function(){
        var properties = {
            value: "[string] the contents of this string",
            modifier: "[string] string type modifier"
        };
        Object.defineProperties(ՐՏ_109.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return "String";
                })

            }
        })    })(), ՐՏ_109);
    var Verbatim = (ՐՏ_110 = function Verbatim() {
        Constant.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_110, Constant), (function(){
        var properties = {
            value: "[string] A string of raw JS code"
        };
        Object.defineProperties(ՐՏ_110.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return "?";
                })

            }
        })    })(), ՐՏ_110);
    var Number = (ՐՏ_111 = function Number() {
        Constant.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_111, Constant), (function(){
        var properties = {
            value: "[number] the numeric value"
        };
        Object.defineProperties(ՐՏ_111.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return "Number";
                })

            }
        })    })(), ՐՏ_111);
    var Identifier = (ՐՏ_112 = function Identifier() {
        Constant.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_112, Constant), (function(){
        var properties = {
            value: "[string] the name of this key"
        };
        Object.defineProperties(ՐՏ_112.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return "String";
                })

            }
        })    })(), ՐՏ_112);
    var RegExp = (ՐՏ_113 = function RegExp() {
        Constant.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_113, Constant), (function(){
        var properties = {
            value: "[RegExp] the actual regexp"
        };
        Object.defineProperties(ՐՏ_113.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return "RegExp";
                })

            }
        })    })(), ՐՏ_113);
    var Atom = (ՐՏ_114 = function Atom() {
        Constant.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_114, Constant), ՐՏ_114);
    var Null = (ՐՏ_115 = function Null() {
        Atom.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_115, Atom), (function(){
        var value = null;
        Object.defineProperties(ՐՏ_115.prototype, {
            value: {
                enumerable: true, 
                writable: true, 
                value: value
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return null;
                })

            }
        })    })(), ՐՏ_115);
    var NotANumber = (ՐՏ_116 = function NotANumber() {
        Atom.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_116, Atom), (function(){
        var value = 0 / 0;
        Object.defineProperties(ՐՏ_116.prototype, {
            value: {
                enumerable: true, 
                writable: true, 
                value: value
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return null;
                })

            }
        })    })(), ՐՏ_116);
    var Undefined = (ՐՏ_117 = function Undefined() {
        Atom.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_117, Atom), (function(){
        var value = void 0;
        Object.defineProperties(ՐՏ_117.prototype, {
            value: {
                enumerable: true, 
                writable: true, 
                value: value
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return null;
                })

            }
        })    })(), ՐՏ_117);
    var Hole = (ՐՏ_118 = function Hole() {
        Atom.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_118, Atom), (function(){
        var value = void 0;
        Object.defineProperties(ՐՏ_118.prototype, {
            value: {
                enumerable: true, 
                writable: true, 
                value: value
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return null;
                })

            }
        })    })(), ՐՏ_118);
    var Infinity = (ՐՏ_119 = function Infinity() {
        Atom.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_119, Atom), (function(){
        var value = 1 / 0;
        Object.defineProperties(ՐՏ_119.prototype, {
            value: {
                enumerable: true, 
                writable: true, 
                value: value
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return "Number";
                })

            }
        })    })(), ՐՏ_119);
    var Boolean = (ՐՏ_120 = function Boolean() {
        Atom.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_120, Atom), (function(){
        var properties = {
            value: "[boolean] value"
        };
        Object.defineProperties(ՐՏ_120.prototype, {
            properties: {
                enumerable: true, 
                writable: true, 
                value: properties
            },
            resolveType: {
                enumerable: true, 
                writable: true, 
                value: memoized(function resolveType(){
                    var self = this;
                    return "Boolean";
                })

            }
        })    })(), ՐՏ_120);
    var TreeWalker = (ՐՏ_121 = function TreeWalker() {
        TreeWalker.prototype.__init__.apply(this, arguments);
    }, Object.defineProperties(ՐՏ_121.prototype, {
        __init__: {
            enumerable: true, 
            writable: true, 
            value: function __init__(callback){
                var self = this;
                self.visit = callback;
                self.stack = [];
            }

        },
        _visit: {
            enumerable: true, 
            writable: true, 
            value: function _visit(node, descend){
                var self = this;
                var ret;
                self.stack.push(node);
                ret = self.visit(node, descend ? function() {
                    descend.call(node);
                } : noop);
                if (!ret && descend) {
                    descend.call(node);
                }
                self.stack.pop();
                return ret;
            }

        },
        parent: {
            enumerable: true, 
            writable: true, 
            value: function parent(n){
                var self = this;
                return self.stack[self.stack.length - 2 - (n || 0)];
            }

        },
        push: {
            enumerable: true, 
            writable: true, 
            value: function push(node){
                var self = this;
                self.stack.push(node);
            }

        },
        pop: {
            enumerable: true, 
            writable: true, 
            value: function pop(){
                var self = this;
                return self.stack.pop();
            }

        },
        self: {
            enumerable: true, 
            writable: true, 
            value: function self(){
                var self = this;
                return self.stack[self.stack.length - 1];
            }

        },
        find_parent: {
            enumerable: true, 
            writable: true, 
            value: function find_parent(type){
                var ՐՏitr33, ՐՏidx33;
                var self = this;
                var stack, i, x;
                stack = self.stack;
                ՐՏitr33 = ՐՏ_Iterable(range(stack.length - 1, -1, -1));
                for (ՐՏidx33 = 0; ՐՏidx33 < ՐՏitr33.length; ՐՏidx33++) {
                    i = ՐՏitr33[ՐՏidx33];
                    x = stack[i];
                    if (x instanceof type) {
                        return x;
                    }
                }
            }

        },
        in_boolean_context: {
            enumerable: true, 
            writable: true, 
            value: function in_boolean_context(){
                var self = this;
                var stack, i, p;
                stack = self.stack;
                i = stack.length;
                self = stack[--i];
                while (i > 0) {
                    p = stack[--i];
                    if (p instanceof If && p.condition === self || p instanceof Conditional && p.condition === self || p instanceof DWLoop && p.condition === self || p instanceof UnaryPrefix && p.operator === "!" && p.expression === self) {
                        return true;
                    }
                    if (!(p instanceof Binary && (p.operator === "&&" || p.operator === "||"))) {
                        return false;
                    }
                    self = p;
                }
            }

        },
        loopcontrol_target: {
            enumerable: true, 
            writable: true, 
            value: function loopcontrol_target(label){
                var ՐՏitr34, ՐՏidx34, ՐՏitr35, ՐՏidx35;
                var self = this;
                var stack, i, x;
                stack = self.stack;
                if (label) {
                    ՐՏitr34 = ՐՏ_Iterable(range(stack.length - 1, -1, -1));
                    for (ՐՏidx34 = 0; ՐՏidx34 < ՐՏitr34.length; ՐՏidx34++) {
                        i = ՐՏitr34[ՐՏidx34];
                        x = stack[i];
                        if (x instanceof LabeledStatement && x.label.name === label.name) {
                            return x.body;
                        }
                    }
                } else {
                    ՐՏitr35 = ՐՏ_Iterable(range(stack.length - 1, -1, -1));
                    for (ՐՏidx35 = 0; ՐՏidx35 < ՐՏitr35.length; ՐՏidx35++) {
                        i = ՐՏitr35[ՐՏidx35];
                        x = stack[i];
                        if (x instanceof Switch || x instanceof ForIn || x instanceof DWLoop) {
                            return x;
                        }
                    }
                }
            }

        }
    }), ՐՏ_121);
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:ast"];
    ՐՏ_mod.export("memoized", function(){return memoized;}, function(ՐՏ_v){if (typeof memoized !== "undefined") {memoized = ՐՏ_v;};});
    ՐՏ_mod.export("AST", function(){return AST;}, function(ՐՏ_v){if (typeof AST !== "undefined") {AST = ՐՏ_v;};});
    ՐՏ_mod.export("Token", function(){return Token;}, function(ՐՏ_v){if (typeof Token !== "undefined") {Token = ՐՏ_v;};});
    ՐՏ_mod.export("Node", function(){return Node;}, function(ՐՏ_v){if (typeof Node !== "undefined") {Node = ՐՏ_v;};});
    ՐՏ_mod.export("Statement", function(){return Statement;}, function(ՐՏ_v){if (typeof Statement !== "undefined") {Statement = ՐՏ_v;};});
    ՐՏ_mod.export("Debugger", function(){return Debugger;}, function(ՐՏ_v){if (typeof Debugger !== "undefined") {Debugger = ՐՏ_v;};});
    ՐՏ_mod.export("Directive", function(){return Directive;}, function(ՐՏ_v){if (typeof Directive !== "undefined") {Directive = ՐՏ_v;};});
    ՐՏ_mod.export("SimpleStatement", function(){return SimpleStatement;}, function(ՐՏ_v){if (typeof SimpleStatement !== "undefined") {SimpleStatement = ՐՏ_v;};});
    ՐՏ_mod.export("walk_body", function(){return walk_body;}, function(ՐՏ_v){if (typeof walk_body !== "undefined") {walk_body = ՐՏ_v;};});
    ՐՏ_mod.export("Block", function(){return Block;}, function(ՐՏ_v){if (typeof Block !== "undefined") {Block = ՐՏ_v;};});
    ՐՏ_mod.export("BlockStatement", function(){return BlockStatement;}, function(ՐՏ_v){if (typeof BlockStatement !== "undefined") {BlockStatement = ՐՏ_v;};});
    ՐՏ_mod.export("EmptyStatement", function(){return EmptyStatement;}, function(ՐՏ_v){if (typeof EmptyStatement !== "undefined") {EmptyStatement = ՐՏ_v;};});
    ՐՏ_mod.export("StatementWithBody", function(){return StatementWithBody;}, function(ՐՏ_v){if (typeof StatementWithBody !== "undefined") {StatementWithBody = ՐՏ_v;};});
    ՐՏ_mod.export("LabeledStatement", function(){return LabeledStatement;}, function(ՐՏ_v){if (typeof LabeledStatement !== "undefined") {LabeledStatement = ՐՏ_v;};});
    ՐՏ_mod.export("DWLoop", function(){return DWLoop;}, function(ՐՏ_v){if (typeof DWLoop !== "undefined") {DWLoop = ՐՏ_v;};});
    ՐՏ_mod.export("Do", function(){return Do;}, function(ՐՏ_v){if (typeof Do !== "undefined") {Do = ՐՏ_v;};});
    ՐՏ_mod.export("While", function(){return While;}, function(ՐՏ_v){if (typeof While !== "undefined") {While = ՐՏ_v;};});
    ՐՏ_mod.export("ForIn", function(){return ForIn;}, function(ՐՏ_v){if (typeof ForIn !== "undefined") {ForIn = ՐՏ_v;};});
    ՐՏ_mod.export("ForJS", function(){return ForJS;}, function(ՐՏ_v){if (typeof ForJS !== "undefined") {ForJS = ՐՏ_v;};});
    ՐՏ_mod.export("ListComprehension", function(){return ListComprehension;}, function(ՐՏ_v){if (typeof ListComprehension !== "undefined") {ListComprehension = ՐՏ_v;};});
    ՐՏ_mod.export("DictComprehension", function(){return DictComprehension;}, function(ՐՏ_v){if (typeof DictComprehension !== "undefined") {DictComprehension = ՐՏ_v;};});
    ՐՏ_mod.export("With", function(){return With;}, function(ՐՏ_v){if (typeof With !== "undefined") {With = ՐՏ_v;};});
    ՐՏ_mod.export("Scope", function(){return Scope;}, function(ՐՏ_v){if (typeof Scope !== "undefined") {Scope = ՐՏ_v;};});
    ՐՏ_mod.export("TopLevel", function(){return TopLevel;}, function(ՐՏ_v){if (typeof TopLevel !== "undefined") {TopLevel = ՐՏ_v;};});
    ՐՏ_mod.export("Splat", function(){return Splat;}, function(ՐՏ_v){if (typeof Splat !== "undefined") {Splat = ՐՏ_v;};});
    ՐՏ_mod.export("Import", function(){return Import;}, function(ՐՏ_v){if (typeof Import !== "undefined") {Import = ՐՏ_v;};});
    ՐՏ_mod.export("Imports", function(){return Imports;}, function(ՐՏ_v){if (typeof Imports !== "undefined") {Imports = ՐՏ_v;};});
    ՐՏ_mod.export("Decorator", function(){return Decorator;}, function(ՐՏ_v){if (typeof Decorator !== "undefined") {Decorator = ՐՏ_v;};});
    ՐՏ_mod.export("Annotation", function(){return Annotation;}, function(ՐՏ_v){if (typeof Annotation !== "undefined") {Annotation = ՐՏ_v;};});
    ՐՏ_mod.export("Lambda", function(){return Lambda;}, function(ՐՏ_v){if (typeof Lambda !== "undefined") {Lambda = ՐՏ_v;};});
    ՐՏ_mod.export("Accessor", function(){return Accessor;}, function(ՐՏ_v){if (typeof Accessor !== "undefined") {Accessor = ՐՏ_v;};});
    ՐՏ_mod.export("Function", function(){return Function;}, function(ՐՏ_v){if (typeof Function !== "undefined") {Function = ՐՏ_v;};});
    ՐՏ_mod.export("Class", function(){return Class;}, function(ՐՏ_v){if (typeof Class !== "undefined") {Class = ՐՏ_v;};});
    ՐՏ_mod.export("Module", function(){return Module;}, function(ՐՏ_v){if (typeof Module !== "undefined") {Module = ՐՏ_v;};});
    ՐՏ_mod.export("Method", function(){return Method;}, function(ՐՏ_v){if (typeof Method !== "undefined") {Method = ՐՏ_v;};});
    ՐՏ_mod.export("Constructor", function(){return Constructor;}, function(ՐՏ_v){if (typeof Constructor !== "undefined") {Constructor = ՐՏ_v;};});
    ՐՏ_mod.export("Jump", function(){return Jump;}, function(ՐՏ_v){if (typeof Jump !== "undefined") {Jump = ՐՏ_v;};});
    ՐՏ_mod.export("Exit", function(){return Exit;}, function(ՐՏ_v){if (typeof Exit !== "undefined") {Exit = ՐՏ_v;};});
    ՐՏ_mod.export("Return", function(){return Return;}, function(ՐՏ_v){if (typeof Return !== "undefined") {Return = ՐՏ_v;};});
    ՐՏ_mod.export("Yield", function(){return Yield;}, function(ՐՏ_v){if (typeof Yield !== "undefined") {Yield = ՐՏ_v;};});
    ՐՏ_mod.export("Throw", function(){return Throw;}, function(ՐՏ_v){if (typeof Throw !== "undefined") {Throw = ՐՏ_v;};});
    ՐՏ_mod.export("LoopControl", function(){return LoopControl;}, function(ՐՏ_v){if (typeof LoopControl !== "undefined") {LoopControl = ՐՏ_v;};});
    ՐՏ_mod.export("Break", function(){return Break;}, function(ՐՏ_v){if (typeof Break !== "undefined") {Break = ՐՏ_v;};});
    ՐՏ_mod.export("Continue", function(){return Continue;}, function(ՐՏ_v){if (typeof Continue !== "undefined") {Continue = ՐՏ_v;};});
    ՐՏ_mod.export("If", function(){return If;}, function(ՐՏ_v){if (typeof If !== "undefined") {If = ՐՏ_v;};});
    ՐՏ_mod.export("Switch", function(){return Switch;}, function(ՐՏ_v){if (typeof Switch !== "undefined") {Switch = ՐՏ_v;};});
    ՐՏ_mod.export("SwitchBranch", function(){return SwitchBranch;}, function(ՐՏ_v){if (typeof SwitchBranch !== "undefined") {SwitchBranch = ՐՏ_v;};});
    ՐՏ_mod.export("Default", function(){return Default;}, function(ՐՏ_v){if (typeof Default !== "undefined") {Default = ՐՏ_v;};});
    ՐՏ_mod.export("Case", function(){return Case;}, function(ՐՏ_v){if (typeof Case !== "undefined") {Case = ՐՏ_v;};});
    ՐՏ_mod.export("Try", function(){return Try;}, function(ՐՏ_v){if (typeof Try !== "undefined") {Try = ՐՏ_v;};});
    ՐՏ_mod.export("Catch", function(){return Catch;}, function(ՐՏ_v){if (typeof Catch !== "undefined") {Catch = ՐՏ_v;};});
    ՐՏ_mod.export("Except", function(){return Except;}, function(ՐՏ_v){if (typeof Except !== "undefined") {Except = ՐՏ_v;};});
    ՐՏ_mod.export("Finally", function(){return Finally;}, function(ՐՏ_v){if (typeof Finally !== "undefined") {Finally = ՐՏ_v;};});
    ՐՏ_mod.export("Definitions", function(){return Definitions;}, function(ՐՏ_v){if (typeof Definitions !== "undefined") {Definitions = ՐՏ_v;};});
    ՐՏ_mod.export("Var", function(){return Var;}, function(ՐՏ_v){if (typeof Var !== "undefined") {Var = ՐՏ_v;};});
    ՐՏ_mod.export("Const", function(){return Const;}, function(ՐՏ_v){if (typeof Const !== "undefined") {Const = ՐՏ_v;};});
    ՐՏ_mod.export("VarDef", function(){return VarDef;}, function(ՐՏ_v){if (typeof VarDef !== "undefined") {VarDef = ՐՏ_v;};});
    ՐՏ_mod.export("BaseCall", function(){return BaseCall;}, function(ՐՏ_v){if (typeof BaseCall !== "undefined") {BaseCall = ՐՏ_v;};});
    ՐՏ_mod.export("Call", function(){return Call;}, function(ՐՏ_v){if (typeof Call !== "undefined") {Call = ՐՏ_v;};});
    ՐՏ_mod.export("ClassCall", function(){return ClassCall;}, function(ՐՏ_v){if (typeof ClassCall !== "undefined") {ClassCall = ՐՏ_v;};});
    ՐՏ_mod.export("New", function(){return New;}, function(ՐՏ_v){if (typeof New !== "undefined") {New = ՐՏ_v;};});
    ՐՏ_mod.export("Seq", function(){return Seq;}, function(ՐՏ_v){if (typeof Seq !== "undefined") {Seq = ՐՏ_v;};});
    ՐՏ_mod.export("PropAccess", function(){return PropAccess;}, function(ՐՏ_v){if (typeof PropAccess !== "undefined") {PropAccess = ՐՏ_v;};});
    ՐՏ_mod.export("Dot", function(){return Dot;}, function(ՐՏ_v){if (typeof Dot !== "undefined") {Dot = ՐՏ_v;};});
    ՐՏ_mod.export("Sub", function(){return Sub;}, function(ՐՏ_v){if (typeof Sub !== "undefined") {Sub = ՐՏ_v;};});
    ՐՏ_mod.export("Slice", function(){return Slice;}, function(ՐՏ_v){if (typeof Slice !== "undefined") {Slice = ՐՏ_v;};});
    ՐՏ_mod.export("Unary", function(){return Unary;}, function(ՐՏ_v){if (typeof Unary !== "undefined") {Unary = ՐՏ_v;};});
    ՐՏ_mod.export("UnaryPrefix", function(){return UnaryPrefix;}, function(ՐՏ_v){if (typeof UnaryPrefix !== "undefined") {UnaryPrefix = ՐՏ_v;};});
    ՐՏ_mod.export("UnaryPostfix", function(){return UnaryPostfix;}, function(ՐՏ_v){if (typeof UnaryPostfix !== "undefined") {UnaryPostfix = ՐՏ_v;};});
    ՐՏ_mod.export("Binary", function(){return Binary;}, function(ՐՏ_v){if (typeof Binary !== "undefined") {Binary = ՐՏ_v;};});
    ՐՏ_mod.export("Range", function(){return Range;}, function(ՐՏ_v){if (typeof Range !== "undefined") {Range = ՐՏ_v;};});
    ՐՏ_mod.export("DeepEquality", function(){return DeepEquality;}, function(ՐՏ_v){if (typeof DeepEquality !== "undefined") {DeepEquality = ՐՏ_v;};});
    ՐՏ_mod.export("Conditional", function(){return Conditional;}, function(ՐՏ_v){if (typeof Conditional !== "undefined") {Conditional = ՐՏ_v;};});
    ՐՏ_mod.export("Assign", function(){return Assign;}, function(ՐՏ_v){if (typeof Assign !== "undefined") {Assign = ՐՏ_v;};});
    ՐՏ_mod.export("Array", function(){return Array;}, function(ՐՏ_v){if (typeof Array !== "undefined") {Array = ՐՏ_v;};});
    ՐՏ_mod.export("TupleUnpack", function(){return TupleUnpack;}, function(ՐՏ_v){if (typeof TupleUnpack !== "undefined") {TupleUnpack = ՐՏ_v;};});
    ՐՏ_mod.export("ObjectLiteral", function(){return ObjectLiteral;}, function(ՐՏ_v){if (typeof ObjectLiteral !== "undefined") {ObjectLiteral = ՐՏ_v;};});
    ՐՏ_mod.export("ObjectProperty", function(){return ObjectProperty;}, function(ՐՏ_v){if (typeof ObjectProperty !== "undefined") {ObjectProperty = ՐՏ_v;};});
    ՐՏ_mod.export("ObjectKeyVal", function(){return ObjectKeyVal;}, function(ՐՏ_v){if (typeof ObjectKeyVal !== "undefined") {ObjectKeyVal = ՐՏ_v;};});
    ՐՏ_mod.export("ObjectSetter", function(){return ObjectSetter;}, function(ՐՏ_v){if (typeof ObjectSetter !== "undefined") {ObjectSetter = ՐՏ_v;};});
    ՐՏ_mod.export("ObjectGetter", function(){return ObjectGetter;}, function(ՐՏ_v){if (typeof ObjectGetter !== "undefined") {ObjectGetter = ՐՏ_v;};});
    ՐՏ_mod.export("Symbol", function(){return Symbol;}, function(ՐՏ_v){if (typeof Symbol !== "undefined") {Symbol = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolAlias", function(){return SymbolAlias;}, function(ՐՏ_v){if (typeof SymbolAlias !== "undefined") {SymbolAlias = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolDeclaration", function(){return SymbolDeclaration;}, function(ՐՏ_v){if (typeof SymbolDeclaration !== "undefined") {SymbolDeclaration = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolVar", function(){return SymbolVar;}, function(ՐՏ_v){if (typeof SymbolVar !== "undefined") {SymbolVar = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolNonlocal", function(){return SymbolNonlocal;}, function(ՐՏ_v){if (typeof SymbolNonlocal !== "undefined") {SymbolNonlocal = ՐՏ_v;};});
    ՐՏ_mod.export("ImportedVar", function(){return ImportedVar;}, function(ՐՏ_v){if (typeof ImportedVar !== "undefined") {ImportedVar = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolConst", function(){return SymbolConst;}, function(ՐՏ_v){if (typeof SymbolConst !== "undefined") {SymbolConst = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolFunarg", function(){return SymbolFunarg;}, function(ՐՏ_v){if (typeof SymbolFunarg !== "undefined") {SymbolFunarg = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolClass", function(){return SymbolClass;}, function(ՐՏ_v){if (typeof SymbolClass !== "undefined") {SymbolClass = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolDefun", function(){return SymbolDefun;}, function(ՐՏ_v){if (typeof SymbolDefun !== "undefined") {SymbolDefun = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolAccessor", function(){return SymbolAccessor;}, function(ՐՏ_v){if (typeof SymbolAccessor !== "undefined") {SymbolAccessor = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolLambda", function(){return SymbolLambda;}, function(ՐՏ_v){if (typeof SymbolLambda !== "undefined") {SymbolLambda = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolCatch", function(){return SymbolCatch;}, function(ՐՏ_v){if (typeof SymbolCatch !== "undefined") {SymbolCatch = ՐՏ_v;};});
    ՐՏ_mod.export("Label", function(){return Label;}, function(ՐՏ_v){if (typeof Label !== "undefined") {Label = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolRef", function(){return SymbolRef;}, function(ՐՏ_v){if (typeof SymbolRef !== "undefined") {SymbolRef = ՐՏ_v;};});
    ՐՏ_mod.export("SymbolClassRef", function(){return SymbolClassRef;}, function(ՐՏ_v){if (typeof SymbolClassRef !== "undefined") {SymbolClassRef = ՐՏ_v;};});
    ՐՏ_mod.export("LabelRef", function(){return LabelRef;}, function(ՐՏ_v){if (typeof LabelRef !== "undefined") {LabelRef = ՐՏ_v;};});
    ՐՏ_mod.export("This", function(){return This;}, function(ՐՏ_v){if (typeof This !== "undefined") {This = ՐՏ_v;};});
    ՐՏ_mod.export("Constant", function(){return Constant;}, function(ՐՏ_v){if (typeof Constant !== "undefined") {Constant = ՐՏ_v;};});
    ՐՏ_mod.export("String", function(){return String;}, function(ՐՏ_v){if (typeof String !== "undefined") {String = ՐՏ_v;};});
    ՐՏ_mod.export("Verbatim", function(){return Verbatim;}, function(ՐՏ_v){if (typeof Verbatim !== "undefined") {Verbatim = ՐՏ_v;};});
    ՐՏ_mod.export("Number", function(){return Number;}, function(ՐՏ_v){if (typeof Number !== "undefined") {Number = ՐՏ_v;};});
    ՐՏ_mod.export("Identifier", function(){return Identifier;}, function(ՐՏ_v){if (typeof Identifier !== "undefined") {Identifier = ՐՏ_v;};});
    ՐՏ_mod.export("RegExp", function(){return RegExp;}, function(ՐՏ_v){if (typeof RegExp !== "undefined") {RegExp = ՐՏ_v;};});
    ՐՏ_mod.export("Atom", function(){return Atom;}, function(ՐՏ_v){if (typeof Atom !== "undefined") {Atom = ՐՏ_v;};});
    ՐՏ_mod.export("Null", function(){return Null;}, function(ՐՏ_v){if (typeof Null !== "undefined") {Null = ՐՏ_v;};});
    ՐՏ_mod.export("NotANumber", function(){return NotANumber;}, function(ՐՏ_v){if (typeof NotANumber !== "undefined") {NotANumber = ՐՏ_v;};});
    ՐՏ_mod.export("Undefined", function(){return Undefined;}, function(ՐՏ_v){if (typeof Undefined !== "undefined") {Undefined = ՐՏ_v;};});
    ՐՏ_mod.export("Hole", function(){return Hole;}, function(ՐՏ_v){if (typeof Hole !== "undefined") {Hole = ՐՏ_v;};});
    ՐՏ_mod.export("Infinity", function(){return Infinity;}, function(ՐՏ_v){if (typeof Infinity !== "undefined") {Infinity = ՐՏ_v;};});
    ՐՏ_mod.export("Boolean", function(){return Boolean;}, function(ՐՏ_v){if (typeof Boolean !== "undefined") {Boolean = ՐՏ_v;};});
    ՐՏ_mod.export("TreeWalker", function(){return TreeWalker;}, function(ՐՏ_v){if (typeof TreeWalker !== "undefined") {TreeWalker = ՐՏ_v;};});
    ՐՏ_mod.export("colored", function(){return colored;}, function(ՐՏ_v){if (typeof colored !== "undefined") {colored = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

ՐՏ_modules["ՐՏ:tokenizer"].body = function(){
    var __name__ = "tokenizer";

    var OPTIONS, ES6_KEYWORDS, COMMON_KEYWORDS, JS_KEYWORDS, JS_KEYWORDS_AUTOFIX, RS_KEYWORDS, KEYWORDS, KEYWORDS_ATOM, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, ALL_KEYWORDS, ALL_JS_KEYWORDS, IS_ANY_KEYWORD, OPERATOR_CHARS, RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, REGEXP_MODIFIERS, UNICODE, IDENTIFIER_PAT, STRING_MODIFIERS, UNARY_POSTFIX, PRECEDENCE, EX_EOF;
    var makePredicate = ՐՏ_modules["utils"].makePredicate;var ParseError = ՐՏ_modules["utils"].ParseError;var defaults = ՐՏ_modules["utils"].defaults;
    var ast = ՐՏ_modules["ast"];
    OPTIONS = {
        indent_min: 2
    };
    function set_options(opt) {
        OPTIONS = defaults(opt, OPTIONS, true);
    }
    function characters(str_) {
        return str_.split("");
    }
    ES6_KEYWORDS = "async await yield";
    COMMON_KEYWORDS = "break case class const continue debugger default do else " + "finally for if import in new return switch " + "try void while with " + ES6_KEYWORDS;
    JS_KEYWORDS = "enum export extends implements " + "interface let package private protected " + "public static this";
    JS_KEYWORDS_AUTOFIX = "var function instanceof typeof catch delete throw false null true";
    RS_KEYWORDS = "as def del elif except " + "from is nonlocal pass raise til to or and not";
    KEYWORDS = [ RS_KEYWORDS, COMMON_KEYWORDS ].join(" ");
    KEYWORDS_ATOM = "False None True";
    RESERVED_WORDS = [ KEYWORDS_ATOM, KEYWORDS, JS_KEYWORDS ].join(" ");
    KEYWORDS_BEFORE_EXPRESSION = "return new del raise elif else if";
    ALL_KEYWORDS = [ RESERVED_WORDS, JS_KEYWORDS_AUTOFIX ].join(" ");
    ALL_JS_KEYWORDS = [ JS_KEYWORDS, JS_KEYWORDS_AUTOFIX, COMMON_KEYWORDS ].join(" ");
    KEYWORDS = makePredicate(KEYWORDS);
    ES6_KEYWORDS = makePredicate(ES6_KEYWORDS);
    RESERVED_WORDS = makePredicate(RESERVED_WORDS);
    IS_ANY_KEYWORD = makePredicate(ALL_KEYWORDS);
    KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
    KEYWORDS_ATOM = makePredicate(KEYWORDS_ATOM);
    JS_KEYWORDS_AUTOFIX = makePredicate(JS_KEYWORDS_AUTOFIX);
    ALL_JS_KEYWORDS = makePredicate(ALL_JS_KEYWORDS);
    OPERATOR_CHARS = makePredicate(characters("+-*&%=<>!?|~^@"));
    RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
    RE_OCT_NUMBER = /^0[0-7]+$/;
    RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
    OPERATORS = makePredicate([ "in", "new", "void", "del", "++", "--", "+", "-", "not", "~", "&", "|", "^", "**", "*", "/", "//", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "is", "!=", "!==", "?", "=", "+=", "-=", "/=", "//=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "and", "or", "til", "to", "@", "->" ]);
    OP_MAP = {
        "or": "||",
        "and": "&&",
        "not": "!",
        "del": "delete",
        "None": "null",
        "is": "==="
    };
    WHITESPACE_CHARS = makePredicate(characters("  \n\r\t\f​᠎             　"));
    PUNC_BEFORE_EXPRESSION = makePredicate(characters("[{(,.;:"));
    PUNC_CHARS = makePredicate(characters("[]{}(),;:"));
    REGEXP_MODIFIERS = makePredicate(characters("gmsiy"));
    UNICODE = {
        letter: new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
        non_spacing_mark: new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
        space_combining_mark: new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
        connector_punctuation: new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
    };
    IDENTIFIER_PAT = /^[a-z_$][_a-z0-9$]*$/i;
    STRING_MODIFIERS = "urfvURFV";
    UNARY_POSTFIX = makePredicate([ "--", "++" ]);
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
    function is_letter(code) {
        return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 170 && UNICODE.letter.test(String.fromCharCode(code));
    }
    function is_digit(code) {
        return code >= 48 && code <= 57;
    }
    function is_alphanumeric_char(code) {
        return is_digit(code) || is_letter(code);
    }
    function is_unicode_combining_mark(ch) {
        return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
    }
    function is_unicode_connector_punctuation(ch) {
        return UNICODE.connector_punctuation.test(ch);
    }
    function is_string_modifier(val) {
        var ՐՏitr36, ՐՏidx36;
        var ch;
        ՐՏitr36 = ՐՏ_Iterable(val);
        for (ՐՏidx36 = 0; ՐՏidx36 < ՐՏitr36.length; ՐՏidx36++) {
            ch = ՐՏitr36[ՐՏidx36];
            if (ՐՏ_in(ch, STRING_MODIFIERS)) {
                return true;
            }
        }
        return false;
    }
    function is_identifier(name) {
        return !RESERVED_WORDS(name) && IDENTIFIER_PAT.test(name);
    }
    function is_identifier_start(code) {
        return code === 36 || code === 95 || is_letter(code);
    }
    function is_identifier_char(ch) {
        var code;
        code = ch.charCodeAt(0);
        return is_identifier_start(code) || is_digit(code) || code === 8204 || code === 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
    }
    function parse_js_number(num) {
        if (RE_HEX_NUMBER.test(num)) {
            return parseInt(num.substr(2), 16);
        } else if (RE_OCT_NUMBER.test(num)) {
            return parseInt(num.substr(1), 8);
        } else if (RE_DEC_NUMBER.test(num)) {
            return parseFloat(num);
        }
    }
    function is_token(token, type, val) {
        var type_subtype, subtype;
        type_subtype = type.split(":");
        type = type_subtype[0];
        subtype = type_subtype[1];
        return token.type === type && (subtype ? token.subtype === subtype : true) && (val === null || val === void 0 || Array.isArray(val) && val.indexOf(token.value) >= 0 || token.value === val);
    }
    function js_error(message, filename, line, col, pos, is_eof) {
        ast.Node.warn("ERROR: {message} [{file}:{line},{col}]", {
            message: message,
            file: filename,
            line: line,
            col: col
        });
        throw new ParseError(message, line, col, pos, is_eof, filename);
    }
    EX_EOF = {};
    function tokenizer($TEXT, filename) {
        var ՐՏ_129, ՐՏ_130, ՐՏ_131;
        var S;
        S = {
            text: $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, ""),
            filename: filename,
            pos: 0,
            tokpos: 0,
            line: 1,
            tokline: 0,
            col: 0,
            tokcol: 0,
            newline_before: false,
            regex_allowed: false,
            comments_before: [],
            whitespace_before: [],
            newblock: false,
            endblock: false,
            cached_whitespace: "",
            prev: void 0,
            in_scope: [ "block" ],
            comma_expect: false,
            block_expect: false
        };
        function peek() {
            return S.text.charAt(S.pos);
        }
        function prevChar() {
            return S.text.charAt(S.tokpos - 1);
        }
        function next(signal_eof, in_string) {
            var ch;
            ch = S.text.charAt(S.pos);
            ++S.pos;
            if (signal_eof && !ch) {
                throw EX_EOF;
            }
            if (ch === "\n") {
                S.newline_before = S.newline_before || !in_string;
                ++S.line;
                S.col = 0;
            } else {
                ++S.col;
            }
            return ch;
        }
        function find(what, signal_eof) {
            var pos;
            pos = S.text.indexOf(what, S.pos);
            if (signal_eof && pos === -1) {
                throw EX_EOF;
            }
            return pos;
        }
        function start_token() {
            S.tokline = S.line;
            S.tokcol = S.col;
            S.tokpos = S.pos;
        }
        function token(full_type, value, is_comment, keep_newline) {
            var ՐՏ_122, ՐՏ_123, ՐՏ_124, ՐՏ_125, ՐՏ_126;
            var _full_type, type, subtype, _value, ret, block_expect, i, top_scope;
            _full_type = full_type.split(":");
            type = _full_type[0];
            subtype = _full_type[1];
            _value = null;
            S.regex_allowed = type === "operator" && !UNARY_POSTFIX[value] || type === "keyword" && KEYWORDS_BEFORE_EXPRESSION(value) || type === "punc" && PUNC_BEFORE_EXPRESSION(value);
            if (type === "operator" && value === "is" && S.text.substr(S.pos).trimLeft().substr(0, 4).trimRight() === "not") {
                next_token();
                value = "!==";
            }
            if (type === "operator" && OP_MAP[value]) {
                _value = value;
                value = OP_MAP[value];
            }
            ret = {
                type: type,
                subtype: subtype,
                value: value,
                _value: _value,
                line: S.tokline,
                col: S.tokcol,
                pos: S.tokpos,
                endpos: S.pos,
                newline_before: S.newline_before,
                comma_expected: S.comma_expect,
                file: filename
            };
            S.comma_expect = false;
            if (!S.block_expect) {
                S.block_expect = (ՐՏ_122 = S.in_scope)[ՐՏ_122.length-1] === "{}" && (S.prev.type === "keyword" && S.prev.value === "def" && (value === "(" || ՐՏ_in(type, [ "name", "string", "num" ]) || full_type === "operator:keyword") || S.prev.type === "name" && ՐՏ_in(S.prev.value, [ "get", "set" ]) && (ՐՏ_in(type, [ "name", "string", "num" ]) || full_type === "operator:keyword")) || (ՐՏ_123 = S.in_scope)[ՐՏ_123.length-1] === "()" && S.prev.type === "keyword" && S.prev.value === "def" && (value === "(" || type === "name");
            } else {
                block_expect = true;
                S.block_expect = false;
            }
            if (!is_comment) {
                ret.comments_before = S.comments_before;
                S.comments_before = [];
                for (i = 0; i < len(ret.comments_before); i++) {
                    ret.newline_before = ret.newline_before || ret.comments_before[i].newline_before;
                }
            }
            if (!keep_newline) {
                S.newline_before = false;
            }
            top_scope = (ՐՏ_124 = S.in_scope)[ՐՏ_124.length-1];
            if (type === "punc") {
                if (value === ":") {
                    if (ՐՏ_in(top_scope, [ "block", "def", "[]" ])) {
                        if (top_scope === "def") {
                            S.in_scope.pop();
                        }
                        if (!S.text.substring(S.pos, find("\n")).trim() || !S.text.substring(S.pos, find("#")).trim()) {
                            S.newblock = true;
                            S.in_scope.push("block");
                        }
                    }
                } else if (value === "[") {
                    if (S.prev && S.prev.type === "name") {
                        S.in_scope.push("[:]");
                    } else {
                        S.in_scope.push("[]");
                    }
                } else if (value === "(") {
                    if (block_expect || S.block_expect) {
                        S.in_scope.push("def");
                        S.block_expect = false;
                    }
                    S.in_scope.push("()");
                } else if (value === "{") {
                    S.in_scope.push("{}");
                } else if (ՐՏ_in(value, [ "]", ")", "}" ])) {
                    if (top_scope[top_scope.length-1] === value) {
                        S.in_scope.pop();
                    } else {
                        console.log("mismatch: " + value);
                    }
                } else if (value === "endblock") {
                    ret.value = "}";
                    if (ret.comments_before.length && (ՐՏ_125 = ret.comments_before)[ՐՏ_125.length-1].col <= S.col) {
                        S.comments_before = ret.comments_before;
                        ret.comments_before = [];
                    }
                    if (top_scope === "block") {
                        S.in_scope.pop();
                        if (ՐՏ_in((ՐՏ_126 = S.in_scope)[ՐՏ_126.length-1], [ "[]", "{}", "()" ])) {
                            S.comma_expect = true;
                        }
                    } else {
                        console.log("missmatch: " + value);
                    }
                }
            }
            S.prev = new ast.Token(ret);
            return S.prev;
        }
        function parse_whitespace() {
            var leading_whitespace, whitespace_exists, ch;
            leading_whitespace = "";
            whitespace_exists = false;
            while (WHITESPACE_CHARS(peek())) {
                whitespace_exists = true;
                ch = next();
                if (ch === "\n") {
                    leading_whitespace = "";
                } else {
                    leading_whitespace += ch;
                }
            }
            if (peek() !== "#") {
                if (!whitespace_exists) {
                    leading_whitespace = S.cached_whitespace;
                } else {
                    S.cached_whitespace = leading_whitespace;
                }
                if (S.newline_before) {
                    return test_indent_token(leading_whitespace);
                }
            }
        }
        function test_indent_token(leading_whitespace) {
            var ՐՏ_127, ՐՏ_128;
            var most_recent;
            most_recent = (ՐՏ_127 = S.whitespace_before)[ՐՏ_127.length-1] || "";
            S.endblock = false;
            if ((ՐՏ_128 = S.in_scope)[ՐՏ_128.length-1] === "block" && leading_whitespace !== most_recent) {
                if ((leading_whitespace.indexOf(" ") === 0 || most_recent.indexOf(" ") === 0) && Math.abs(leading_whitespace.length - most_recent.length) < OPTIONS.indent_min) {
                    TokenizerError("Indentation is too small");
                }
                if (S.newblock && leading_whitespace && leading_whitespace.indexOf(most_recent) === 0) {
                    S.newblock = false;
                    S.whitespace_before.push(leading_whitespace);
                    return 1;
                } else if (most_recent && most_recent.indexOf(leading_whitespace) === 0) {
                    S.endblock = true;
                    S.whitespace_before.pop();
                    return -1;
                } else {
                    TokenizerError("Inconsistent indentation");
                }
            } else {
                return 0;
            }
        }
        function read_while(pred) {
            var ret, i, ch;
            ret = "";
            i = 0;
            while ((ch = peek()) && pred(ch, i)) {
                ++i;
                ret += next();
            }
            return ret;
        }
        function TokenizerError(err, is_eof) {
            js_error(err, filename, S.tokline, S.tokcol, S.tokpos, is_eof);
        }
        function read_num(prefix) {
            var has_e, after_e, has_x, has_dot, num, valid;
            has_e = false;
            after_e = false;
            has_x = false;
            has_dot = prefix === ".";
            num = read_while(function(ch, i) {
                var code, tmp_, has_x, has_e, has_dot;
                code = ch.charCodeAt(0);
                tmp_ = code;
                if (tmp_ === 120 || tmp_ === 88) {
                    return has_x ? false : has_x = true;
                } else if (tmp_ === 101 || tmp_ === 69) {
                    return has_x ? true : has_e ? false : has_e = after_e = true;
                } else if (tmp_ === 45) {
                    return after_e || i === 0 && !prefix;
                } else if (tmp_ === 43) {
                    return after_e;
                } else if (tmp_ === 46) {
                    after_e = false;
                    return !has_dot && !has_x && !has_e ? has_dot = true : false;
                }
                return is_alphanumeric_char(code);
            });
            if (prefix) {
                num = prefix + num;
            }
            valid = parse_js_number(num);
            if (!isNaN(valid)) {
                return token("num", valid);
            } else {
                TokenizerError("Invalid syntax: " + num);
            }
        }
        function read_escaped_char(in_string, digester) {
            var ch, tmp_;
            digester = digester || function(in_str) {
                return next(true, in_str);
            };
            ch = digester(in_string);
            tmp_ = ch.charCodeAt(0);
            if (tmp_ === 110) {
                return "\n";
            } else if (tmp_ === 114) {
                return "\r";
            } else if (tmp_ === 116) {
                return "\t";
            } else if (tmp_ === 98) {
                return "\b";
            } else if (tmp_ === 118) {
                return "";
            } else if (tmp_ === 102) {
                return "\f";
            } else if (tmp_ === 48) {
                return "\0";
            } else if (tmp_ === 120) {
                return String.fromCharCode(hex_bytes(2, digester));
            } else if (tmp_ === 117) {
                return String.fromCharCode(hex_bytes(4, digester));
            } else if (tmp_ === 10) {
                return "";
            } else {
                return ch;
            }
        }
        function hex_bytes(n, digester) {
            var num, i, digit;
            num = 0;
            for (i = 0; i < n; i++) {
                digit = parseInt(digester(), 16);
                if (isNaN(digit)) {
                    TokenizerError("Invalid hex-character pattern in string");
                }
                num = num << 4 | digit;
            }
            return num;
        }
        
        var read_string = (ՐՏ_129 = function read_string(modifier) {
            var token_type, quote, ret, i, tmp, find_newlines, ch;
            token_type = "string";
            if (modifier) {
                token_type += ":" + modifier;
            }
            quote = next();
            ret = "";
            if (peek() === quote) {
                next(true);
                if (peek() === quote) {
                    next(true);
                    i = find(quote + quote + quote, true);
                    if (i !== -1) {
                        tmp = S.text.substring(S.pos, i);
                        S.pos = i + 3;
                        while (tmp.length) {
                            if (tmp[0] === "\\") {
                                tmp = tmp.slice(1);
                                ret += read_escaped_char(true, function() {
                                    var ch;
                                    ch = tmp[0];
                                    tmp = tmp.slice(1);
                                    return ch;
                                });
                            } else {
                                ret += tmp[0];
                                tmp = tmp.slice(1);
                            }
                        }
                        find_newlines = ret.match(/\n/g);
                        if (find_newlines) {
                            S.line += find_newlines.length;
                        }
                        return token(token_type, ret);
                    }
                } else {
                    return token(token_type, "");
                }
            }
            while (true) {
                ch = next(true);
                if (ch === "\n") {
                    TokenizerError("End of line while scanning string literal.");
                }
                if (ch === "\\") {
                    if (peek() === "\n") {
                        next(true);
                        continue;
                    } else {
                        ch = read_escaped_char(true);
                    }
                } else if (ch === quote) {
                    break;
                }
                ret += ch;
            }
            return token(token_type, ret);
        }, ՐՏ_129 = with_eof_error("Unterminated string constant")(ՐՏ_129), ՐՏ_129);
        function read_line_comment(shebang) {
            shebang = shebang === void 0 ? false : shebang;
            var i, ret;
            if (!shebang) {
                next();
            }
            i = find("\n");
            if (i === -1) {
                ret = S.text.substr(S.pos);
                S.pos = S.text.length;
            } else {
                ret = S.text.substring(S.pos, i);
                S.pos = i;
            }
            return token(shebang ? "shebang" : "comment:line", ret, true);
        }
        
        var read_multiline_comment = (ՐՏ_130 = function read_multiline_comment() {
            var i, text, a, n;
            next();
            i = find("*/", true);
            text = S.text.substring(S.pos, i);
            a = text.split("\n");
            n = a.length;
            S.pos = i + 2;
            S.line += n - 1;
            if (n > 1) {
                S.col = a[n - 1].length;
            } else {
                S.col += a[n - 1].length;
            }
            S.col += 2;
            S.newline_before = S.newline_before || ՐՏ_in("\n", text);
            return token("comment:multiline", text, true);
        }, ՐՏ_130 = with_eof_error("Unterminated multiline comment")(ՐՏ_130), ՐՏ_130);
        function read_name() {
            var backslash, name, escaped, ch, hex;
            backslash = false;
            name = "";
            escaped = false;
            while ((ch = peek()) !== null) {
                if (!backslash) {
                    if (ch === "\\") {
                        if (S.text.charAt(S.pos + 1) === "\n") {
                            S.pos += 2;
                            continue;
                        } else {
                            escaped = backslash = true;
                            next();
                        }
                    } else if (is_identifier_char(ch)) {
                        name += next();
                    } else {
                        break;
                    }
                } else {
                    if (ch !== "u") {
                        TokenizerError("Expecting UnicodeEscapeSequence -- uXXXX");
                    }
                    ch = read_escaped_char();
                    if (!is_identifier_char(ch)) {
                        TokenizerError("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                    }
                    name += ch;
                    backslash = false;
                }
            }
            if (KEYWORDS(name) && escaped) {
                hex = name.charCodeAt(0).toString(16).toUpperCase();
                name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
            }
            return name;
        }
        
        var read_regexp = (ՐՏ_131 = function read_regexp(regexp) {
            var prev_backslash, in_class, verbose_regexp, in_comment, mods, ch;
            prev_backslash = false;
            in_class = false;
            verbose_regexp = false;
            in_comment = false;
            if (peek() === "/") {
                next(true);
                if (peek() === "/") {
                    verbose_regexp = true;
                    next(true);
                } else {
                    mods = read_name();
                    return token("regexp", new RegExp(regexp, mods));
                }
            }
            while (ch = next(true)) {
                if (in_comment) {
                    if (ch === "\n") {
                        in_comment = false;
                    }
                    continue;
                }
                if (prev_backslash) {
                    regexp += "\\" + ch;
                    prev_backslash = false;
                } else if (ch === "[") {
                    in_class = true;
                    regexp += ch;
                } else if (ch === "]" && in_class) {
                    in_class = false;
                    regexp += ch;
                } else if (ch === "/" && !in_class) {
                    if (verbose_regexp) {
                        if (peek() !== "/") {
                            regexp += "\\/";
                            continue;
                        }
                        next(true);
                        if (peek() !== "/") {
                            regexp += "\\/\\/";
                            continue;
                        }
                        next(true);
                    }
                    break;
                } else if (ch === "\\") {
                    prev_backslash = true;
                } else if (verbose_regexp && !in_class && ՐՏ_in(ch, " \n\r\t")) {
                } else if (verbose_regexp && !in_class && ch === "#") {
                    in_comment = true;
                } else {
                    regexp += ch;
                }
            }
            mods = read_name();
            return token("regexp", new RegExp(regexp, mods));
        }, ՐՏ_131 = with_eof_error("Unterminated regular expression")(ՐՏ_131), ՐՏ_131);
        function read_operator(prefix) {
            var op;
            function grow(op) {
                var bigger;
                if (!peek()) {
                    return op;
                }
                bigger = op + peek();
                if (OPERATORS(bigger)) {
                    next();
                    return grow(bigger);
                } else {
                    return op;
                }
            }
            op = grow(prefix || next());
            if (ՐՏ_in(op, [ "++", "--", "===", "!==" ])) {
                TokenizerError("Invalid operator «" + op + "»");
            } else if (op === "->") {
                return token("punc", op);
            }
            return token("operator:symbol", op);
        }
        function handle_slash() {
            next();
            return S.regex_allowed ? read_regexp("") : read_operator("/");
        }
        function handle_dot() {
            next();
            return is_digit(peek().charCodeAt(0)) ? read_num(".") : token("punc", ".");
        }
        function read_word() {
            var word;
            word = read_name();
            return KEYWORDS_ATOM(word) ? token("atom", word) : !KEYWORDS(word) ? token("name", word) : OPERATORS(word) && prevChar() !== "." ? token("operator:keyword", word) : token("keyword", word);
        }
        function with_eof_error(eof_error) {
            return function(cont) {
                return function(x) {
                    try {
                        return cont(x);
                    } catch (ՐՏ_Exception) {
                        var ex = ՐՏ_Exception;
                        if (ex === EX_EOF) {
                            TokenizerError(eof_error, true);
                        } else {
                            throw ՐՏ_Exception;
                        }
                    }
                };
            };
        }
        function next_token(force_regexp) {
            var indent, ch, code, tmp_, regex_allowed, tok, mods, string_tok;
            if (!(ՐՏ_in(force_regexp, [null, void 0]))) {
                return read_regexp(force_regexp);
            }
            indent = parse_whitespace();
            if (indent === -1) {
                return token("punc", "endblock", false, true);
            }
            start_token();
            ch = peek();
            if (!ch) {
                return token("eof");
            }
            code = ch.charCodeAt(0);
            tmp_ = code;
            if (tmp_ === 34 || tmp_ === 39) {
                return read_string();
            } else if (tmp_ === 35) {
                if (S.pos === 0 && S.text.charAt(1) === "!") {
                    return read_line_comment(true);
                }
                regex_allowed = S.regex_allowed;
                S.comments_before.push(read_line_comment());
                S.regex_allowed = regex_allowed;
                return next_token();
            } else if (tmp_ === 46) {
                return handle_dot();
            } else if (tmp_ === 47) {
                return handle_slash();
            }
            if (is_digit(code)) {
                return read_num();
            }
            if (PUNC_CHARS(ch)) {
                return token("punc", next());
            }
            if (OPERATOR_CHARS(ch)) {
                return read_operator();
            }
            if (code === 92 && S.text.charAt(S.pos + 1) === "\n") {
                next();
                next();
                S.newline_before = false;
                return next_token();
            }
            if (code === 92 || is_identifier_start(code)) {
                tok = read_word();
                if (ՐՏ_in(peek(), "'\"") && is_string_modifier(tok.value)) {
                    mods = tok.value.toLowerCase();
                    string_tok = read_string(mods);
                    tok.endpos = string_tok.endpos;
                    tok.value = string_tok.value;
                    tok.subtype = string_tok.subtype;
                    tok.type = string_tok.type;
                }
                return tok;
            }
            TokenizerError("Unexpected character «" + ch + "»");
        }
        next_token.context = function(nc) {
            if (nc) {
                S = nc;
            }
            return S;
        };
        return next_token;
    }
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:tokenizer"];
    ՐՏ_mod.export("OPTIONS", function(){return OPTIONS;}, function(ՐՏ_v){if (typeof OPTIONS !== "undefined") {OPTIONS = ՐՏ_v;};});
    ՐՏ_mod.export("ES6_KEYWORDS", function(){return ES6_KEYWORDS;}, function(ՐՏ_v){if (typeof ES6_KEYWORDS !== "undefined") {ES6_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("COMMON_KEYWORDS", function(){return COMMON_KEYWORDS;}, function(ՐՏ_v){if (typeof COMMON_KEYWORDS !== "undefined") {COMMON_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("JS_KEYWORDS", function(){return JS_KEYWORDS;}, function(ՐՏ_v){if (typeof JS_KEYWORDS !== "undefined") {JS_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("JS_KEYWORDS_AUTOFIX", function(){return JS_KEYWORDS_AUTOFIX;}, function(ՐՏ_v){if (typeof JS_KEYWORDS_AUTOFIX !== "undefined") {JS_KEYWORDS_AUTOFIX = ՐՏ_v;};});
    ՐՏ_mod.export("RS_KEYWORDS", function(){return RS_KEYWORDS;}, function(ՐՏ_v){if (typeof RS_KEYWORDS !== "undefined") {RS_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("KEYWORDS", function(){return KEYWORDS;}, function(ՐՏ_v){if (typeof KEYWORDS !== "undefined") {KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("KEYWORDS_ATOM", function(){return KEYWORDS_ATOM;}, function(ՐՏ_v){if (typeof KEYWORDS_ATOM !== "undefined") {KEYWORDS_ATOM = ՐՏ_v;};});
    ՐՏ_mod.export("RESERVED_WORDS", function(){return RESERVED_WORDS;}, function(ՐՏ_v){if (typeof RESERVED_WORDS !== "undefined") {RESERVED_WORDS = ՐՏ_v;};});
    ՐՏ_mod.export("KEYWORDS_BEFORE_EXPRESSION", function(){return KEYWORDS_BEFORE_EXPRESSION;}, function(ՐՏ_v){if (typeof KEYWORDS_BEFORE_EXPRESSION !== "undefined") {KEYWORDS_BEFORE_EXPRESSION = ՐՏ_v;};});
    ՐՏ_mod.export("ALL_KEYWORDS", function(){return ALL_KEYWORDS;}, function(ՐՏ_v){if (typeof ALL_KEYWORDS !== "undefined") {ALL_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("ALL_JS_KEYWORDS", function(){return ALL_JS_KEYWORDS;}, function(ՐՏ_v){if (typeof ALL_JS_KEYWORDS !== "undefined") {ALL_JS_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("IS_ANY_KEYWORD", function(){return IS_ANY_KEYWORD;}, function(ՐՏ_v){if (typeof IS_ANY_KEYWORD !== "undefined") {IS_ANY_KEYWORD = ՐՏ_v;};});
    ՐՏ_mod.export("OPERATOR_CHARS", function(){return OPERATOR_CHARS;}, function(ՐՏ_v){if (typeof OPERATOR_CHARS !== "undefined") {OPERATOR_CHARS = ՐՏ_v;};});
    ՐՏ_mod.export("RE_HEX_NUMBER", function(){return RE_HEX_NUMBER;}, function(ՐՏ_v){if (typeof RE_HEX_NUMBER !== "undefined") {RE_HEX_NUMBER = ՐՏ_v;};});
    ՐՏ_mod.export("RE_OCT_NUMBER", function(){return RE_OCT_NUMBER;}, function(ՐՏ_v){if (typeof RE_OCT_NUMBER !== "undefined") {RE_OCT_NUMBER = ՐՏ_v;};});
    ՐՏ_mod.export("RE_DEC_NUMBER", function(){return RE_DEC_NUMBER;}, function(ՐՏ_v){if (typeof RE_DEC_NUMBER !== "undefined") {RE_DEC_NUMBER = ՐՏ_v;};});
    ՐՏ_mod.export("OPERATORS", function(){return OPERATORS;}, function(ՐՏ_v){if (typeof OPERATORS !== "undefined") {OPERATORS = ՐՏ_v;};});
    ՐՏ_mod.export("OP_MAP", function(){return OP_MAP;}, function(ՐՏ_v){if (typeof OP_MAP !== "undefined") {OP_MAP = ՐՏ_v;};});
    ՐՏ_mod.export("WHITESPACE_CHARS", function(){return WHITESPACE_CHARS;}, function(ՐՏ_v){if (typeof WHITESPACE_CHARS !== "undefined") {WHITESPACE_CHARS = ՐՏ_v;};});
    ՐՏ_mod.export("PUNC_BEFORE_EXPRESSION", function(){return PUNC_BEFORE_EXPRESSION;}, function(ՐՏ_v){if (typeof PUNC_BEFORE_EXPRESSION !== "undefined") {PUNC_BEFORE_EXPRESSION = ՐՏ_v;};});
    ՐՏ_mod.export("PUNC_CHARS", function(){return PUNC_CHARS;}, function(ՐՏ_v){if (typeof PUNC_CHARS !== "undefined") {PUNC_CHARS = ՐՏ_v;};});
    ՐՏ_mod.export("REGEXP_MODIFIERS", function(){return REGEXP_MODIFIERS;}, function(ՐՏ_v){if (typeof REGEXP_MODIFIERS !== "undefined") {REGEXP_MODIFIERS = ՐՏ_v;};});
    ՐՏ_mod.export("UNICODE", function(){return UNICODE;}, function(ՐՏ_v){if (typeof UNICODE !== "undefined") {UNICODE = ՐՏ_v;};});
    ՐՏ_mod.export("IDENTIFIER_PAT", function(){return IDENTIFIER_PAT;}, function(ՐՏ_v){if (typeof IDENTIFIER_PAT !== "undefined") {IDENTIFIER_PAT = ՐՏ_v;};});
    ՐՏ_mod.export("STRING_MODIFIERS", function(){return STRING_MODIFIERS;}, function(ՐՏ_v){if (typeof STRING_MODIFIERS !== "undefined") {STRING_MODIFIERS = ՐՏ_v;};});
    ՐՏ_mod.export("UNARY_POSTFIX", function(){return UNARY_POSTFIX;}, function(ՐՏ_v){if (typeof UNARY_POSTFIX !== "undefined") {UNARY_POSTFIX = ՐՏ_v;};});
    ՐՏ_mod.export("PRECEDENCE", function(){return PRECEDENCE;}, function(ՐՏ_v){if (typeof PRECEDENCE !== "undefined") {PRECEDENCE = ՐՏ_v;};});
    ՐՏ_mod.export("EX_EOF", function(){return EX_EOF;}, function(ՐՏ_v){if (typeof EX_EOF !== "undefined") {EX_EOF = ՐՏ_v;};});
    ՐՏ_mod.export("set_options", function(){return set_options;}, function(ՐՏ_v){if (typeof set_options !== "undefined") {set_options = ՐՏ_v;};});
    ՐՏ_mod.export("characters", function(){return characters;}, function(ՐՏ_v){if (typeof characters !== "undefined") {characters = ՐՏ_v;};});
    ՐՏ_mod.export("is_letter", function(){return is_letter;}, function(ՐՏ_v){if (typeof is_letter !== "undefined") {is_letter = ՐՏ_v;};});
    ՐՏ_mod.export("is_digit", function(){return is_digit;}, function(ՐՏ_v){if (typeof is_digit !== "undefined") {is_digit = ՐՏ_v;};});
    ՐՏ_mod.export("is_alphanumeric_char", function(){return is_alphanumeric_char;}, function(ՐՏ_v){if (typeof is_alphanumeric_char !== "undefined") {is_alphanumeric_char = ՐՏ_v;};});
    ՐՏ_mod.export("is_unicode_combining_mark", function(){return is_unicode_combining_mark;}, function(ՐՏ_v){if (typeof is_unicode_combining_mark !== "undefined") {is_unicode_combining_mark = ՐՏ_v;};});
    ՐՏ_mod.export("is_unicode_connector_punctuation", function(){return is_unicode_connector_punctuation;}, function(ՐՏ_v){if (typeof is_unicode_connector_punctuation !== "undefined") {is_unicode_connector_punctuation = ՐՏ_v;};});
    ՐՏ_mod.export("is_string_modifier", function(){return is_string_modifier;}, function(ՐՏ_v){if (typeof is_string_modifier !== "undefined") {is_string_modifier = ՐՏ_v;};});
    ՐՏ_mod.export("is_identifier", function(){return is_identifier;}, function(ՐՏ_v){if (typeof is_identifier !== "undefined") {is_identifier = ՐՏ_v;};});
    ՐՏ_mod.export("is_identifier_start", function(){return is_identifier_start;}, function(ՐՏ_v){if (typeof is_identifier_start !== "undefined") {is_identifier_start = ՐՏ_v;};});
    ՐՏ_mod.export("is_identifier_char", function(){return is_identifier_char;}, function(ՐՏ_v){if (typeof is_identifier_char !== "undefined") {is_identifier_char = ՐՏ_v;};});
    ՐՏ_mod.export("parse_js_number", function(){return parse_js_number;}, function(ՐՏ_v){if (typeof parse_js_number !== "undefined") {parse_js_number = ՐՏ_v;};});
    ՐՏ_mod.export("is_token", function(){return is_token;}, function(ՐՏ_v){if (typeof is_token !== "undefined") {is_token = ՐՏ_v;};});
    ՐՏ_mod.export("js_error", function(){return js_error;}, function(ՐՏ_v){if (typeof js_error !== "undefined") {js_error = ՐՏ_v;};});
    ՐՏ_mod.export("tokenizer", function(){return tokenizer;}, function(ՐՏ_v){if (typeof tokenizer !== "undefined") {tokenizer = ՐՏ_v;};});
    ՐՏ_mod.export("defaults", function(){return defaults;}, function(ՐՏ_v){if (typeof defaults !== "undefined") {defaults = ՐՏ_v;};});
    ՐՏ_mod.export("ast", function(){return ast;}, function(ՐՏ_v){if (typeof ast !== "undefined") {ast = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

ՐՏ_modules["ՐՏ:parser"].body = function(){
    var __name__ = "parser";

    var NATIVE_CLASSES, COMMON_STATIC, CLASS_MAP, BASELIB, STDLIB, UNARY_PREFIX, ASSIGNMENT, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN;
    var makePredicate = ՐՏ_modules["utils"].makePredicate;var defaults = ՐՏ_modules["utils"].defaults;var ImportError = ՐՏ_modules["utils"].ImportError;var js_error = ՐՏ_modules["utils"].js_error;var RAPYD_PREFIX = ՐՏ_modules["utils"].RAPYD_PREFIX;var find_if = ՐՏ_modules["utils"].find_if;
    var ast = ՐՏ_modules["ast"];
    var tokenizer = ՐՏ_modules["tokenizer"];
    NATIVE_CLASSES = null;
    COMMON_STATIC = null;
    CLASS_MAP = null;
    BASELIB = null;
    STDLIB = null;
    function array_to_hash(a) {
        var ret, i;
        ret = {};
        for (i = 0; i < len(a); i++) {
            ret[a[i]] = true;
        }
        return ret;
    }
    function init_mod() {
        var key;
        NATIVE_CLASSES = {
            "Image": {},
            "RegExp": {},
            "Error": {},
            "Object": {
                static: [ "assign", "getOwnPropertyNames", "keys", "create", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf", "getOwnPropertyDescriptor", "getOwnPropertyDescriptors", "values", "entries" ]
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
            "ArrayBuffer": {
                static: [ "isView", "transfer" ]
            },
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
            "Promise": {
                static: [ "all", "race", "reject", "resolve" ]
            },
            "AssertionError": {},
            "IndexError": {},
            "KeyError": {},
            "TypeError": {},
            "ValueError": {}
        };
        COMMON_STATIC = [ "call", "apply", "bind", "toString" ];
        CLASS_MAP = {};
        BASELIB = (function() {
            var ՐՏidx37, ՐՏitr37 = ՐՏ_Iterable([ "abs", "all", "any", "bin", "bind", "rebind_all", "with__name__", "def_modules", "cmp", "chr", "dir", "enumerate", "eslice", "extends", "filter", "hex", "in", "iterable", "len", "map", "max", "min", "merge", "mixin", "print", "range", "reduce", "reversed", "sorted", "sum", "type", "zip", "getattr", "setattr", "hasattr", "eq", "kwargs", "AssertionError", "IndexError", "KeyError", "TypeError", "ValueError" ]), ՐՏres = {}, key;
            for (ՐՏidx37 = 0; ՐՏidx37 < ՐՏitr37.length; ՐՏidx37++) {
                key = ՐՏitr37[ՐՏidx37];
                ՐՏres[key] = 0;
            }
            return ՐՏres;
        })();
        STDLIB = [ "abs", "bin", "cmp", "chr", "dir", "hex", "max", "min", "merge", "mixin", "print", "range", "reduce", "getattr", "setattr", "hasattr", "eq", "bind", "rebind_all", "type", "all", "any", "enumerate", "filter", "len", "map", "reversed", "sum", "zip", "AssertionError", "IndexError", "KeyError", "TypeError", "ValueError" ];
    }
    function has_simple_decorator(decorators, name) {
        var remove, s;
        remove = [];
        for (var i = 0; i < decorators.length; i++) {
            s = decorators[i];
            if (s instanceof ast.SymbolRef && !s.parens && s.name === name) {
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
    STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);
    ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);
    function parse($TEXT, options) {
        var ՐՏitr38, ՐՏidx38, ՐՏ_132, ՐՏ_160, ՐՏ_161;
        var class_map, module_id, import_dirs, depends_on, PRE_IMPORTED, IMPORTED, IMPORTING, S, cname, obj;
        if (!STDLIB) {
            init_mod();
        }
        class_map = {};
        options = defaults(options, {
            strict: false,
            strict_names: false,
            filename: null,
            auto_bind: false,
            module_id: "__main__",
            es6: false,
            toplevel: null,
            import_dirs: [],
            dropDecorators: [],
            dropImports: [],
            dropDocstrings: false,
            classes: null,
            readfile: typeof require != "undefined" ? require("fs").readFileSync : null,
            indent_min: 2
        });
        module_id = options.module_id;
        import_dirs = options.import_dirs.slice(0);
        if (options.libdir) {
            import_dirs.push(options.libdir);
        }
        if (options.basedir) {
            import_dirs.unshift(options.basedir);
        }
        depends_on = {};
        PRE_IMPORTED = options.PRE_IMPORTED || {};
        IMPORTED = options.IMPORTED || {};
        IMPORTING = options.IMPORTING || {};
        IMPORTING[module_id] = true;
        tokenizer.set_options({
            indent_min: options.indent_min
        });
        S = {
            input: typeof $TEXT === "string" ? tokenizer.tokenizer($TEXT, options.filename) : $TEXT,
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
            ՐՏitr38 = ՐՏ_Iterable(options.classes);
            for (ՐՏidx38 = 0; ՐՏidx38 < ՐՏitr38.length; ՐՏidx38++) {
                cname = ՐՏitr38[ՐՏidx38];
                obj = options.classes[cname];
                S.in_scope[0].classes[cname] = {
                    "static": obj.static,
                    "bound": obj.bound
                };
            }
        }
        S.token = next();
        function maybe_keyword(name) {
            if (!tokenizer.IS_ANY_KEYWORD(name)) {
                return name;
            }
            if (!options.strict_names && tokenizer.JS_KEYWORDS_AUTOFIX(name)) {
                return name + "_ϟ";
            }
            token_error(prev(), "Can't use the name '" + name + "' as a parameter/variable name, it is reserved by JavaScript");
        }
        function is_(type, value) {
            return tokenizer.is_token(S.token, type, value);
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
            tokenizer.js_error(msg, ctx.filename, line !== void 0 ? line : ctx.tokline, col !== void 0 ? col : ctx.tokcol, pos !== void 0 ? pos : ctx.tokpos, is_eof);
        }
        function token_error(token, msg) {
            var is_eof;
            is_eof = token.type === "eof" ? true : false;
            croak(msg, token.line, token.col, void 0, is_eof);
        }
        function unexpected(token) {
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
            if (punc === "," && S.token.comma_expected) {
                if (is_("punc", ",")) {
                    next();
                }
                return S.token;
            }
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
                expr = parser.apply(this, arguments);
                if (expr === void 0) {
                    unexpected();
                }
                end = prev();
                expr.start = start;
                expr.end = end;
                return expr;
            };
        }
        function is_nested_comparison(stmt) {
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
            if (stmt instanceof ast.Binary && ՐՏ_in(stmt.operator, comparators) && stmt.left instanceof ast.Binary && ՐՏ_in(stmt.left.operator, comparators)) {
                return true;
            } else {
                return false;
            }
        }
        function scan_for_top_level_imports(body) {
            var ՐՏitr39, ՐՏidx39, ՐՏitr40, ՐՏidx40, ՐՏitr41, ՐՏidx41;
            var self_fun, ans, name, obj, imp, argname, imp_sym, x, opt;
            self_fun = scan_for_top_level_imports;
            ans = [];
            if (Array.isArray(body)) {
                for (name in body) {
                    obj = body[name];
                    if (obj instanceof ast.Imports) {
                        ՐՏitr39 = ՐՏ_Iterable(obj.imports);
                        for (ՐՏidx39 = 0; ՐՏidx39 < ՐՏitr39.length; ՐՏidx39++) {
                            imp = ՐՏitr39[ՐՏidx39];
                            if (imp.argnames) {
                                ՐՏitr40 = ՐՏ_Iterable(imp.argnames);
                                for (ՐՏidx40 = 0; ՐՏidx40 < ՐՏitr40.length; ՐՏidx40++) {
                                    argname = ՐՏitr40[ՐՏidx40];
                                    imp_sym = argname.alias || argname;
                                }
                            } else {
                                imp_sym = imp.alias || new_symbol(ast.SymbolVar, imp.key.split(".", 1)[0]);
                            }
                            ans.push(imp_sym);
                        }
                    } else {
                        if (obj instanceof ast.Scope) {
                            continue;
                        }
                        ՐՏitr41 = ՐՏ_Iterable([ "body", "alternative" ]);
                        for (ՐՏidx41 = 0; ՐՏidx41 < ՐՏitr41.length; ՐՏidx41++) {
                            x = ՐՏitr41[ՐՏidx41];
                            opt = obj[x];
                            if (opt) {
                                ans = ans.concat(self_fun(opt));
                            }
                        }
                    }
                }
            } else if (body.body) {
                ans = ans.concat(self_fun(body.body));
                if (body.alternative) {
                    ans = ans.concat(self_fun(body.alternative));
                }
            }
            return ans;
        }
        function scan_for_top_level_callables(body) {
            var ՐՏitr42, ՐՏidx42;
            var ans, name, obj, x, opt;
            ans = [];
            if (Array.isArray(body)) {
                for (name in body) {
                    obj = body[name];
                    if (obj instanceof ast.Function || obj instanceof ast.Class) {
                        if (obj.name) {
                            ans.push(obj.name);
                        } else {
                            token_error(obj.start, "Top-level functions must have names");
                        }
                    } else {
                        if (obj instanceof ast.Scope) {
                            continue;
                        }
                        ՐՏitr42 = ՐՏ_Iterable([ "body", "alternative" ]);
                        for (ՐՏidx42 = 0; ՐՏidx42 < ՐՏitr42.length; ՐՏidx42++) {
                            x = ՐՏitr42[ՐՏidx42];
                            opt = obj[x];
                            if (opt) {
                                ans = ans.concat(scan_for_top_level_callables(opt));
                            }
                            if (opt instanceof ast.Assign && !(opt.right instanceof ast.Scope)) {
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
        function block_statement() {
            return statement(true);
        }
        
        var statement = (ՐՏ_132 = function statement(expect_block) {
            var ՐՏ_133, ՐՏ_134, ՐՏ_135, ՐՏ_136, ՐՏ_137, ՐՏ_138, ՐՏ_139;
            var tmp_, dir, stat, type, start, func, chain, is_from, result, ctor, expectedType, actualType, tmp;
            if (is_("operator", "/") || is_("operator", "/=")) {
                S.peeked = null;
                S.token = S.input(S.token.value.slice(1));
            }
            if (expect_block) {
                if (is_("punc", ":")) {
                    return new ast.BlockStatement({
                        start: S.token,
                        body: block_(),
                        end: prev()
                    });
                } else {
                    unexpected();
                }
            }
            tmp_ = S.token.type;
            if (tmp_ === "string") {
                dir = S.in_directives;
                stat = simple_statement();
                if (dir && stat.body instanceof ast.String && !is_("punc", ",")) {
                    return new ast.Directive({
                        value: stat.body.value
                    });
                }
                return stat;
            } else if (tmp_ === "shebang") {
                tmp_ = S.token.value;
                next();
                return new ast.Directive({
                    value: tmp_
                });
            } else if (tmp_ === "num" || tmp_ === "regexp" || tmp_ === "operator" || tmp_ === "atom") {
                return simple_statement();
            } else if (tmp_ === "punc") {
                tmp_ = S.token.value;
                if (tmp_ === "{" || tmp_ === "[" || tmp_ === "(") {
                    return simple_statement();
                } else if (tmp_ === ";") {
                    next();
                    return new ast.EmptyStatement();
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
                    if (!((ՐՏ_133 = S.in_scope)[ՐՏ_133.length-1].type === "class")) {
                        croak("Getter/setter outside of class");
                    }
                    return accessor_(type, start, (ՐՏ_134 = S.in_scope)[ՐՏ_134.length-1].name || true);
                }
                return tokenizer.is_token(peek(), "punc", ":") ? labeled_statement() : simple_statement();
            } else if (tmp_ === "keyword") {
                tmp_ = S.token.value;
                if (tokenizer.ES6_KEYWORDS(tmp_) && !options.es6) {
                    token_error(prev() || S.token, "«" + tmp_ + "» keyword not supported with ES5 output, use --ecmascript6 compilation flag");
                }
                next();
                if (tmp_ === "break") {
                    return break_cont(ast.Break);
                } else if (tmp_ === "continue") {
                    return break_cont(ast.Continue);
                } else if (tmp_ === "debugger") {
                    semicolon();
                    return new ast.Debugger();
                } else if (tmp_ === "do") {
                    return new ast.Do({
                        body: in_loop(block_statement),
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
                    return new ast.While({
                        condition: expression(true),
                        body: in_loop(block_statement)
                    });
                } else if (tmp_ === "for") {
                    if (is_("name", "JS") || is_("string:v")) {
                        return for_js();
                    }
                    return for_();
                } else if (tmp_ === "from") {
                    return import_(true);
                } else if (tmp_ === "import") {
                    return import_(false);
                } else if (tmp_ === "class") {
                    ++BASELIB["extends"];
                    if (options.auto_bind) {
                        ++BASELIB["rebind_all"];
                    }
                    if (!options.es6) {
                        ++BASELIB["with__name__"];
                    }
                    return class_();
                } else if (tmp_ === "def") {
                    start = prev();
                    func = function_((ՐՏ_135 = S.in_scope)[ՐՏ_135.length-1].type === "class" ? (ՐՏ_136 = S.in_scope)[ՐՏ_136.length-1].name : false);
                    func.start = start;
                    func.end = prev();
                    chain = subscripts(func, true);
                    if (chain === func) {
                        return func;
                    } else {
                        return new ast.SimpleStatement({
                            start: start,
                            body: chain,
                            end: prev()
                        });
                    }
                } else if (tmp_ === "if") {
                    return if_();
                } else if (tmp_ === "pass") {
                    semicolon();
                    return new ast.EmptyStatement();
                } else if (tmp_ === "async") {
                    is_from = false;
                    if (S.token.type === "keyword" && (S.token.value === "import" || (is_from = S.token.value === "from"))) {
                        next();
                        return import_(is_from, true);
                    }
                    unexpected();
                } else if (tmp_ === "return" || tmp_ === "yield") {
                    if ((ՐՏ_137 = S.in_scope)[ՐՏ_137.length-1].type !== "function") {
                        croak("'return' outside of function");
                    }
                    if (tmp_ === "yield") {
                        result = yield_();
                    } else {
                        ctor = ast.Return;
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
                    }
                    if ((ՐՏ_138 = S.in_scope)[ՐՏ_138.length-1].return_annotation) {
                        expectedType = (ՐՏ_139 = S.in_scope)[ՐՏ_139.length-1].return_annotation.resolveType(S.in_scope);
                        actualType = result.resolveType(S.in_scope);
                        if (!(ՐՏ_in(actualType, [ expectedType, "?" ]))) {
                            croak("Type annotation states that function returns " + expectedType + ", actual returned type is " + actualType + "");
                        }
                    }
                    return result;
                } else if (tmp_ === "switch") {
                    return new ast.Switch({
                        expression: parenthesised(),
                        body: in_loop(switch_body_)
                    });
                } else if (tmp_ === "raise") {
                    if (S.token.newline_before) {
                        return new ast.Throw({
                            value: new ast.SymbolCatch({
                                name: "ՐՏ_Exception"
                            })
                        });
                    }
                    tmp = expression(true);
                    semicolon();
                    return new ast.Throw({
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
                    return new ast.With({
                        expression: parenthesised(),
                        body: block_statement()
                    });
                } else {
                    unexpected();
                }
            }
        }, ՐՏ_132 = embed_tokens(ՐՏ_132), ՐՏ_132);
        function labeled_statement() {
            var label, stat;
            label = as_symbol(ast.Label);
            if (find_if(function(l) {
                return l.name === label.name;
            }, S.labels)) {
                croak("Label " + label.name + " defined twice");
            }
            expect(":");
            S.labels.push(label);
            stat = statement();
            S.labels.pop();
            return new ast.LabeledStatement({
                body: stat,
                label: label
            });
        }
        function simple_statement(tmp) {
            tmp = expression(true);
            semicolon();
            return new ast.SimpleStatement({
                body: tmp
            });
        }
        function break_cont(type_) {
            var label;
            label = null;
            if (!can_insert_semicolon()) {
                label = as_symbol(ast.LabelRef, true);
            }
            if (label !== null) {
                if (!find_if(function(l) {
                    return l.name === label.name;
                }, S.labels)) {
                    croak("Undefined label " + label.name);
                }
            } else if (S.in_loop === 0) {
                croak(ՐՏ_type(type_) + " not inside a loop or switch");
            }
            semicolon();
            return new type_({
                label: label
            });
        }
        function seq_to_array(seq) {
            return new ast.Array({
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
                if (init instanceof ast.Seq) {
                    init = seq_to_array(init);
                }
                if (is_("operator", "in")) {
                    if (init instanceof ast.Var && init.definitions.length > 1) {
                        croak("Only one variable declaration allowed in for..in loop");
                    }
                    next();
                    return for_in(init, list_comp);
                }
            }
            unexpected();
        }
        function for_in(init, list_comp) {
            var ՐՏitr43, ՐՏidx43, ՐՏupk1;
            var lhs, obj, i, element, value;
            lhs = init instanceof ast.Var ? init.definitions[0].name : null;
            obj = expression(true);
            if (init instanceof ast.Array) {
                ՐՏitr43 = ՐՏ_Iterable(enumerate(init.elements));
                for (ՐՏidx43 = 0; ՐՏidx43 < ՐՏitr43.length; ՐՏidx43++) {
                    ՐՏupk1 = ՐՏitr43[ՐՏidx43];
                    i = ՐՏupk1[0];
                    element = ՐՏupk1[1];
                    value = null;
                    if (obj instanceof ast.Call && obj.expression instanceof ast.SymbolRef && obj.expression.name === "enumerate") {
                        if (i === 0) {
                            value = "Number";
                        }
                    }
                    mark_local_assignment(element, value);
                }
            } else {
                value = null;
                if (obj instanceof ast.Call && obj.expression instanceof ast.SymbolRef && obj.expression.name === "range") {
                    value = "Number";
                }
                mark_local_assignment(init, value);
            }
            ++BASELIB["iterable"];
            if (list_comp) {
                return {
                    init: init,
                    name: lhs,
                    object: obj
                };
            }
            return new ast.ForIn({
                init: init,
                name: lhs,
                object: obj,
                body: in_loop(block_statement)
            });
        }
        function for_js() {
            var condition;
            condition = expression(true, true);
            return new ast.ForJS({
                condition: condition,
                body: in_loop(block_statement)
            });
        }
        function get_class_in_scope(expr) {
            var ՐՏitr44, ՐՏidx44, ՐՏitr45, ՐՏidx45;
            var s, referenced_path, class_name;
            if (expr instanceof ast.SymbolRef) {
                if (ՐՏ_in(expr.name, NATIVE_CLASSES)) {
                    return NATIVE_CLASSES[expr.name];
                }
                ՐՏitr44 = ՐՏ_Iterable(range(S.in_scope.length - 1, -1, -1));
                for (ՐՏidx44 = 0; ՐՏidx44 < ՐՏitr44.length; ՐՏidx44++) {
                    s = ՐՏitr44[ՐՏidx44];
                    if (ՐՏ_in(expr.name, S.in_scope[s].classes)) {
                        return S.in_scope[s].classes[expr.name];
                    }
                }
            } else if (expr instanceof ast.Dot) {
                referenced_path = [];
                while (expr instanceof ast.Dot) {
                    referenced_path.unshift(expr.property);
                    expr = expr.expression;
                }
                if (expr instanceof ast.SymbolRef) {
                    referenced_path.unshift(expr.name);
                    if (len(referenced_path) > 1) {
                        class_name = referenced_path.join(".");
                        ՐՏitr45 = ՐՏ_Iterable(range(S.in_scope.length - 1, -1, -1));
                        for (ՐՏidx45 = 0; ՐՏidx45 < ՐՏitr45.length; ՐՏidx45++) {
                            s = ՐՏitr45[ՐՏidx45];
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
            var ՐՏitr47, ՐՏidx47, ՐՏupk3;
            var package_module_id, filename, src_code, modpath, location, data, msg, contents, subs;
            if (ՐՏ_in(key, IMPORTED)) {
                return;
            }
            if (IMPORTING[key]) {
                throw new ImportError("Detected a recursive import of: " + key + " while importing: " + module_id, options.filename);
            }
            package_module_id = key.split(".").slice(0, -1).join(".");
            if (len(package_module_id) > 0 && !IMPORTING[package_module_id]) {
                do_import(package_module_id);
                if (ՐՏ_in(key, IMPORTED)) {
                    return;
                }
            }
            function safe_read(base_path) {
                var ՐՏitr46, ՐՏidx46, ՐՏupk2;
                var i, path;
                ՐՏitr46 = ՐՏ_Iterable(enumerate([ base_path + ".pyj", base_path + "/__init__.pyj" ]));
                for (ՐՏidx46 = 0; ՐՏidx46 < ՐՏitr46.length; ՐՏidx46++) {
                    ՐՏupk2 = ՐՏitr46[ՐՏidx46];
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
                        } else {
                            throw ՐՏ_Exception;
                        }
                    }
                }
            }
            src_code = filename = null;
            modpath = key.replace(/\./g, "/");
            ՐՏitr47 = ՐՏ_Iterable(import_dirs);
            for (ՐՏidx47 = 0; ՐՏidx47 < ՐՏitr47.length; ՐՏidx47++) {
                location = ՐՏitr47[ՐՏidx47];
                if (location) {
                    try {
                        ՐՏupk3 = safe_read(location + "/" + modpath);
                        data = ՐՏupk3[0];
                        filename = ՐՏupk3[1];
                    } catch (ՐՏ_Exception) {
                        var e = ՐՏ_Exception;
                        if (e instanceof ImportError) {
                            throw e;
                        }
                        msg = "Failed Import: '" + key + "', due to an error: " + e.message;
                        throw new ImportError(msg, options.filename, e);
                    }
                    if (data !== null) {
                        src_code = data;
                        break;
                    }
                }
            }
            if (src_code === null) {
                throw new ImportError("Failed Import: '" + key + "' module doesn't exist in any of the import directories: " + import_dirs.join(", "), options.filename);
            }
            contents = parse(src_code, {
                filename: filename,
                toplevel: null,
                readfile: options.readfile,
                basedir: options.basedir,
                libdir: options.libdir,
                module_id: key,
                PRE_IMPORTED: PRE_IMPORTED,
                IMPORTED: IMPORTED,
                IMPORTING: IMPORTING,
                auto_bind: options.auto_bind,
                es6: options.es6,
                import_dirs: options.import_dirs,
                dropDecorators: options.dropDecorators,
                dropImports: options.dropImports,
                dropDocstrings: options.dropDocstrings
            });
            if (len(package_module_id) > 0) {
                subs = !IMPORTING[package_module_id] ? IMPORTED[package_module_id].submodules : PRE_IMPORTED[package_module_id].submodules;
                if (!(ՐՏ_in(key, subs))) {
                    subs.push(key);
                }
            }
        }
        function import_(from_import, async_import) {
            var ՐՏitr48, ՐՏidx48, ՐՏitr49, ՐՏidx49, ՐՏ_140, ՐՏitr50, ՐՏidx50;
            var ans, imp_with, package_pref, name, tmp, key, alias, imp, from_pack_imp, cur_imported, argnames, from_pack_module_names, aname, classes, argvar, obj, mod_name;
            ans = new ast.Imports({
                "imports": [],
                "async": async_import
            });
            imp_with = null;
            while (true) {
                package_pref = "";
                if (!async_import) {
                    if (!async_import && (options.filename || "").endsWith("/__init__.pyj")) {
                        package_pref = options.module_id + ".";
                        if (!PRE_IMPORTED[options.module_id]) {
                            PRE_IMPORTED[options.module_id] = {
                                submodules: []
                            };
                        }
                    }
                    if (is_("punc", ".")) {
                        if (!package_pref) {
                            package_pref = (/^(.+?\.)[^\.]+$/.exec(options.module_id || "") || [ "", "" ])[1];
                        }
                        next();
                    } else {
                        package_pref = "";
                    }
                }
                tmp = name = expression(false);
                key = "";
                while (tmp instanceof ast.Dot) {
                    key = "." + tmp.property + key;
                    tmp = tmp.expression;
                }
                key = package_pref + tmp.name + key;
                if (!keepDecoratorOrImport(key, true)) {
                    return new ast.EmptyStatement({
                        start: prev(),
                        end: prev()
                    });
                }
                alias = null;
                if (!from_import) {
                    if (imp_with === null) {
                        if (is_("keyword", "with")) {
                            imp_with = key;
                            next();
                            continue;
                        } else {
                            imp_with = "";
                        }
                    }
                    if (imp_with) {
                        key = imp_with + "." + key;
                    } else if (is_("keyword", "as")) {
                        next();
                        alias = as_symbol(ast.SymbolAlias);
                    } else if (package_pref) {
                        alias = new_symbol(ast.SymbolAlias, name.name);
                    }
                }
                imp = new ast.Import({
                    "module": name,
                    "key": key,
                    "alias": alias,
                    "argnames": null,
                    "body": function(_) {
                        return function() {
                            return IMPORTED[_];
                        };
                    }(key)
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
            from_pack_imp = [];
            ՐՏitr48 = ՐՏ_Iterable(ans["imports"]);
            for (ՐՏidx48 = 0; ՐՏidx48 < ՐՏitr48.length; ՐՏidx48++) {
                imp = ՐՏitr48[ՐՏidx48];
                if (!async_import) {
                    do_import(imp.key);
                } else {
                    IMPORTED[imp.key] = new ast.TopLevel({
                        imports: {},
                        nonlocalvars: [],
                        module_id: imp.key,
                        exports: [],
                        submodules: [],
                        classes: [],
                        filename: null,
                        async: true
                    });
                    IMPORTED[imp.key].localvars = [];
                    IMPORTED[imp.key].body = [];
                }
                depends_on[imp.key] = true;
                cur_imported = async_import ? null : IMPORTED[imp.key];
                argnames = [];
                if (from_import) {
                    expect_token("keyword", "import");
                    imp.argnames = argnames = [];
                    from_pack_module_names = [];
                    while (true) {
                        if (!is_("name")) {
                            unexpected();
                        }
                        name = S.token.value;
                        if (cur_imported && cur_imported.is_package && !cur_imported.exports.find(function(it) {
                            return it.name === name;
                        })) {
                            key = imp.key + "." + name;
                            aname = new ast.Import({
                                "module": expression(false),
                                "key": key,
                                "alias": new_symbol(ast.SymbolAlias, name),
                                "argnames": null,
                                "body": function() {
                                    return IMPORTED[key];
                                }
                            });
                            from_pack_imp.push(aname);
                            from_pack_module_names.push(aname);
                            do_import(key);
                        } else {
                            aname = as_symbol(ast.ImportedVar);
                            argnames.push(aname);
                        }
                        if (is_("keyword", "as")) {
                            next();
                            aname.alias = as_symbol(ast.SymbolAlias);
                        }
                        if (is_("punc", ",")) {
                            next();
                        } else {
                            break;
                        }
                    }
                    if (cur_imported) {
                        classes = cur_imported.classes;
                        ՐՏitr49 = ՐՏ_Iterable(argnames);
                        for (ՐՏidx49 = 0; ՐՏidx49 < ՐՏitr49.length; ՐՏidx49++) {
                            argvar = ՐՏitr49[ՐՏidx49];
                            obj = classes[argvar.name];
                            if (obj) {
                                key = argvar.alias ? argvar.alias.name : argvar.name;
                                (ՐՏ_140 = S.in_scope)[ՐՏ_140.length-1].classes[key] = {
                                    "static": obj.static,
                                    "bound": obj.bound
                                };
                            }
                        }
                    }
                    ՐՏitr50 = ՐՏ_Iterable(from_pack_module_names);
                    for (ՐՏidx50 = 0; ՐՏidx50 < ՐՏitr50.length; ՐՏidx50++) {
                        mod_name = ՐՏitr50[ՐՏidx50];
                        Object.assign(S.in_scope[S.in_scope.length - 1].classes, IMPORTED[mod_name.key].top_classes(mod_name.alias.name));
                    }
                } else {
                    key = imp.alias ? imp.alias.name : imp.key;
                    if (cur_imported) {
                        Object.assign(S.in_scope[S.in_scope.length - 1].classes, cur_imported.top_classes(key));
                    }
                }
            }
            [].push.apply(ans.imports, from_pack_imp);
            return ans;
        }
        function class_() {
            var ՐՏitr53, ՐՏidx53;
            var start, name, externaldecorator, class_details, parent, docstring, definition, i, stmt, class_vars_names, visitor;
            start = prev();
            name = as_symbol(ast.SymbolClass);
            if (!name) {
                unexpected();
            }
            externaldecorator = has_simple_decorator(S.decorators, "external");
            class_details = {
                "static": [],
                "bound": {},
                "subscribers": [],
                "on_static_change": function(cb) {
                    this.subscribers.push(cb);
                },
                "push_static": function(meth) {
                    this.static.push(meth);
                    this.subscribers.forEach(function(cb) {
                        cb(meth, true);
                    });
                },
                "pop_static": function(meth) {
                    var idx;
                    idx = this.static.indexOf(meth);
                    if (idx >= 0) {
                        this.static.splice(idx, 1);
                        this.subscribers.forEach(function(cb) {
                            cb(meth, false);
                        });
                    }
                }
            };
            parent = null;
            docstring = null;
            definition = new ast.Class({
                start: start,
                name: name,
                module_id: module_id,
                parent: function() {
                    var ՐՏ_141;
                    var atom, parent_details;
                    if (is_("punc", "(")) {
                        next();
                        if (is_("punc", ")")) {
                            S.in_parenthesized_expr = false;
                            next();
                            return null;
                        }
                        atom = expr_atom(false);
                        expect(")");
                        parent = stringifyName(atom);
                        if (parent && (parent_details = (ՐՏ_141 = S.in_scope)[ՐՏ_141.length-1].classes[parent])) {
                            [].push.apply(class_details.static, parent_details.static);
                        }
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
                    var ՐՏitr51, ՐՏidx51;
                    var d, decorator;
                    d = [];
                    ՐՏitr51 = ՐՏ_Iterable(S.decorators);
                    for (ՐՏidx51 = 0; ՐՏidx51 < ՐՏitr51.length; ՐՏidx51++) {
                        decorator = ՐՏitr51[ՐՏidx51];
                        if (decorator === "kwargs") {
                            ++BASELIB["kwargs"];
                        }
                        d.push(new ast.Decorator({
                            expression: decorator
                        }));
                    }
                    S.decorators = [];
                    return d;
                }(),
                body: function(loop, labels) {
                    var ՐՏ_142, ՐՏ_143;
                    var a;
                    (ՐՏ_142 = S.in_scope)[ՐՏ_142.length-1].classes[name.name] = class_details;
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
                    docstring = (ՐՏ_143 = S.in_scope)[ՐՏ_143.length-1].docstring;
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
                if (stmt instanceof ast.Method && stmt.name.name === "__init__") {
                    definition.init = stmt;
                    break;
                }
            }
            class_vars_names = {};
            function walker() {
                this._visit = function(node, descend) {
                    var ՐՏitr52, ՐՏidx52;
                    var child;
                    if (node instanceof ast.Method) {
                        class_vars_names[node.name.name] = true;
                        return;
                    } else if (node instanceof ast.Assign && node.left instanceof ast.SymbolRef) {
                        class_vars_names[node.left.name] = true;
                    }
                    ՐՏitr52 = ՐՏ_Iterable(node);
                    for (ՐՏidx52 = 0; ՐՏidx52 < ՐՏitr52.length; ՐՏidx52++) {
                        child = ՐՏitr52[ՐՏidx52];
                        if (node[child] instanceof ast.SymbolRef && Object.prototype.hasOwnProperty.call(class_vars_names, node[child].name)) {
                            node[child] = new ast.SymbolClassRef({
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
            ՐՏitr53 = ՐՏ_Iterable(definition.body);
            for (ՐՏidx53 = 0; ՐՏidx53 < ՐՏitr53.length; ՐՏidx53++) {
                stmt = ՐՏitr53[ՐՏidx53];
                if (!(stmt instanceof ast.Class) && !(stmt instanceof ast.Method)) {
                    stmt.walk(visitor);
                    definition.statements.push(stmt);
                }
            }
            if (S.in_scope.length === 1) {
                class_map[definition.name.name] = definition;
                CLASS_MAP[definition.name.name] = definition;
            }
            return definition;
        }
        function function_(in_class_or_xobject, ctor) {
            var ՐՏ_144, ՐՏ_145, ՐՏ_152, ՐՏ_153;
            var in_xobject, in_class, start, is_accessor, name, generator, localvars, staticmethod, function_args, return_annotation, has_special_decorator, cls_details, docstring, callsSuper, superCall_expr, definition, arg, args;
            in_class = in_xobject = false;
            if (in_class_or_xobject) {
                in_xobject = in_class_or_xobject === true ? true : false;
                in_class = in_xobject ? false : in_class_or_xobject;
            }
            start = prev();
            is_accessor = ctor === ast.ObjectGetter || ctor === ast.ObjectSetter;
            name = as_symbol(in_class_or_xobject ? is_accessor ? ast.SymbolAccessor : ast.SymbolDefun : ast.SymbolLambda, true);
            if (in_class_or_xobject && !name) {
                unexpected();
            }
            generator = false;
            localvars = null;
            staticmethod = false;
            function_args = {};
            return_annotation = null;
            S.decorators.slice().reverse().forEach(function(d) {
                Array.prototype.unshift.apply(start.comments_before, d.start.comments_before);
            });
            if (!S.in_decorator) {
                has_special_decorator = function(name) {
                    return has_simple_decorator(S.decorators, name);
                };
                if (in_class) {
                    cls_details = (ՐՏ_144 = S.in_scope)[ՐՏ_144.length-2].classes[in_class];
                    if (has_special_decorator("staticmethod")) {
                        staticmethod = true;
                        if (!(ՐՏ_in(name.name, cls_details.static))) {
                            cls_details.push_static(name.name);
                        }
                    } else if (ՐՏ_in(name.name, cls_details.static)) {
                        cls_details.pop_static(name.name);
                    }
                    if (has_special_decorator("bind") || name.name !== "__init__" && options.auto_bind) {
                        ++BASELIB["bind"];
                        (ՐՏ_145 = S.in_scope)[ՐՏ_145.length-2].classes[in_class].bound[name.name] = true;
                    }
                }
            }
            expect("(");
            if (!ctor) {
                if (in_class_or_xobject) {
                    ctor = in_class && name.name === "__init__" ? ast.Constructor : ast.Method;
                } else {
                    ctor = ast.Function;
                }
            }
            docstring = null;
            callsSuper = null;
            superCall_expr = null;
            definition = new ctor({
                start: start,
                name: name,
                argnames: function(a) {
                    var defaults, first, seen_names, val, expr;
                    defaults = {};
                    first = true;
                    seen_names = {};
                    function get_arg() {
                        var name_token, name, ntok, annotation, sym;
                        if (Object.prototype.hasOwnProperty.call(seen_names, S.token.value)) {
                            token_error(prev(), "Can't repeat parameter names");
                        }
                        if (S.token.value === "arguments") {
                            token_error(prev(), "Can't use the name '" + S.token.value + "' as a parameter name, it is reserved by JavaScript");
                        }
                        if (!is_("name")) {
                            croak("Name expected");
                            return null;
                        }
                        name_token = S.token;
                        seen_names[name_token.value] = true;
                        name = maybe_keyword(name_token.value);
                        ntok = peek();
                        if (ntok.type === "punc" && ntok.value === ":") {
                            next();
                            expect(":");
                            annotation = maybe_conditional();
                            sym = new ast.SymbolFunarg({
                                "name": name,
                                "start": name_token,
                                "end": name_token,
                                "annotation": annotation ? new ast.Annotation({
                                    "start": annotation.start,
                                    "expression": annotation,
                                    "end": annotation.end
                                }) : null
                            });
                        } else {
                            sym = new ast.SymbolFunarg({
                                "name": name,
                                "start": name_token,
                                "end": name_token,
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
                        return_annotation = new ast.Annotation({
                            start: expr.start,
                            expression: expr,
                            end: expr.end
                        });
                    }
                    a.defaults = defaults;
                    return a;
                }([]),
                decorators: S.in_decorator ? [] : function() {
                    var ՐՏitr54, ՐՏidx54;
                    var d, decorator;
                    d = [];
                    ՐՏitr54 = ՐՏ_Iterable(S.decorators);
                    for (ՐՏidx54 = 0; ՐՏidx54 < ՐՏitr54.length; ՐՏidx54++) {
                        decorator = ՐՏitr54[ՐՏidx54];
                        d.push(new ast.Decorator({
                            expression: decorator
                        }));
                    }
                    S.decorators = [];
                    return d;
                }(),
                return_annotation: return_annotation,
                body: function(loop, labels) {
                    var ՐՏ_146, ՐՏ_147, ՐՏ_148, ՐՏ_149, ՐՏ_150, ՐՏ_151;
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
                    generator = (ՐՏ_146 = S.in_scope)[ՐՏ_146.length-1].generator;
                    docstring = (ՐՏ_147 = S.in_scope)[ՐՏ_147.length-1].docstring;
                    callsSuper = (ՐՏ_148 = S.in_scope)[ՐՏ_148.length-1].callsSuper;
                    superCall_expr = (ՐՏ_149 = S.in_scope)[ՐՏ_149.length-1].superCall_expr;
                    localvars = (function() {
                        var ՐՏidx55, ՐՏitr55 = ՐՏ_Iterable(Object.keys((ՐՏ_150 = S.in_scope)[ՐՏ_150.length-1].vars)), ՐՏres = [], variable;
                        for (ՐՏidx55 = 0; ՐՏidx55 < ՐՏitr55.length; ՐՏidx55++) {
                            variable = ՐՏitr55[ՐՏidx55];
                            if (!(ՐՏ_in(variable, (ՐՏ_151 = S.in_scope)[ՐՏ_151.length-1].nonlocal))) {
                                ՐՏres.push(new_symbol(ast.SymbolVar, variable));
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
                (ՐՏ_152 = S.in_scope)[ՐՏ_152.length-1].functions[name.name] = definition.resolveType(S.in_scope);
            }
            args = (function() {
                var ՐՏidx56, ՐՏitr56 = ՐՏ_Iterable(definition.argnames), ՐՏres = [], arg;
                for (ՐՏidx56 = 0; ՐՏidx56 < ՐՏitr56.length; ՐՏidx56++) {
                    arg = ՐՏitr56[ՐՏidx56];
                    ՐՏres.push(arg.name);
                }
                return ՐՏres;
            })();
            definition.localvars = definition.localvars.filter(function(var_) {
                return !(ՐՏ_in(var_.name, args));
            });
            if (in_class_or_xobject && !staticmethod) {
                if (in_class) {
                    if (ctor === ast.Constructor) {
                        definition.parent = (ՐՏ_153 = S.in_scope)[ՐՏ_153.length-1].parent;
                        definition.callsSuper = callsSuper;
                        if (superCall_expr) {
                            superCall_expr.selfArg = definition.argnames[0];
                        }
                    }
                }
                if (definition.argnames.length < 1) {
                    croak("Class/object methods require at least one argument (self)", start.line, start.col, start.pos);
                }
                if (ctor === ast.ObjectGetter && definition.argnames.length !== 1) {
                    croak("Class/object getters don't take any arguments aside from one referencing the instance (self)", start.line, start.col, start.pos);
                } else if (ctor === ast.ObjectSetter && definition.argnames.length !== 2) {
                    croak("Class/object setters take exactly 2 arguments (self, value)", start.line, start.col, start.pos);
                }
            }
            return definition;
        }
        function accessor_(type, start, in_class) {
            var func;
            if (type === "get") {
                func = function_(in_class, ast.ObjectGetter);
            } else if (type === "set") {
                func = function_(in_class, ast.ObjectSetter);
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
            body = block_statement();
            belse = null;
            if (is_("keyword", "elif") || is_("keyword", "else")) {
                if (is_("keyword", "else")) {
                    next();
                    belse = block_statement();
                } else {
                    S.token.value = "if";
                    belse = statement();
                }
            }
            return new ast.If({
                condition: cond,
                body: body,
                alternative: belse
            });
        }
        function is_docstring(stmt) {
            var ՐՏ_154;
            if (stmt instanceof ast.Directive && !(ՐՏ_154 = S.in_scope)[ՐՏ_154.length-1].docstring) {
                return true;
            }
            return false;
        }
        function format_docstring(string) {
            var ՐՏitr57, ՐՏidx57, ՐՏitr58, ՐՏidx58;
            var lines, indent, line, pad, trimmed;
            lines = string.split(/\n/g);
            indent = 1e6;
            ՐՏitr57 = ՐՏ_Iterable(lines.slice(1));
            for (ՐՏidx57 = 0; ՐՏidx57 < ՐՏitr57.length; ՐՏidx57++) {
                line = ՐՏitr57[ՐՏidx57];
                if (line.trim().length) {
                    pad = line.match(/^\s*/)[0];
                    indent = Math.min(indent, pad.length);
                }
            }
            trimmed = [ lines[0].trim() ];
            if (indent < 1e6) {
                ՐՏitr58 = ՐՏ_Iterable(lines.slice(1));
                for (ՐՏidx58 = 0; ՐՏidx58 < ՐՏitr58.length; ՐՏidx58++) {
                    line = ՐՏitr58[ՐՏidx58];
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
            var ՐՏ_155, ՐՏ_156;
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
                        if (!options.dropDocstrings) {
                            (ՐՏ_155 = S.in_scope)[ՐՏ_155.length-1].docstring = format_docstring(stmt.value);
                        }
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
                        if (!options.dropDocstrings) {
                            (ՐՏ_156 = S.in_scope)[ՐՏ_156.length-1].docstring = format_docstring(stmt.value);
                        }
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
                    branch = new ast.Case({
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
                    branch = new ast.Default({
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
                    exceptions.push(as_symbol(ast.SymbolVar));
                    while (is_("punc", ",")) {
                        next();
                        exceptions.push(as_symbol(ast.SymbolVar));
                    }
                }
                name = null;
                if (is_("keyword", "as")) {
                    next();
                    name = as_symbol(ast.SymbolCatch);
                }
                bcatch.push(new ast.Except({
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
                bfinally = new ast.Finally({
                    start: start,
                    body: block_(),
                    end: prev()
                });
            }
            if (!bcatch.length && !bfinally) {
                croak("Missing except/finally blocks");
            }
            return new ast.Try({
                body: body,
                bcatch: bcatch.length ? new ast.Catch({
                    body: bcatch
                }) : null,
                bfinally: bfinally
            });
        }
        function vardefs(no_in, type) {
            var ՐՏ_157;
            var a, symbol;
            a = [];
            while (true) {
                symbol = new ast.VarDef({
                    start: S.token,
                    name: as_symbol(type === "const" ? ast.SymbolConst : type === "nonlocal" ? ast.SymbolNonlocal : ast.SymbolVar),
                    end: prev()
                });
                if (type === "nonlocal") {
                    (ՐՏ_157 = S.in_scope)[ՐՏ_157.length-1].nonlocal[symbol.name.name] = true;
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
            return new ast.Var({
                start: prev(),
                definitions: vardefs(no_in, "nonlocal"),
                end: prev()
            });
        }
        function const_() {
            return new ast.Const({
                start: prev(),
                definitions: vardefs(false, "const"),
                end: prev()
            });
        }
        function yield_() {
            var ՐՏ_158, ՐՏ_159;
            var value, yield_from, ret;
            if ((ՐՏ_158 = S.in_scope)[ՐՏ_158.length-1].type !== "function") {
                croak("'yield' outside of function");
            }
            (ՐՏ_159 = S.in_scope)[ՐՏ_159.length-1].generator = true;
            value = null;
            yield_from = false;
            if (is_("punc", ";")) {
                semicolon();
            } else if (!can_insert_semicolon()) {
                if (S.token.type === "keyword" && S.token.value === "from") {
                    yield_from = true;
                    next();
                }
                value = expression(true);
                semicolon();
            }
            ret = new ast.Yield({
                value: value,
                yield_from: yield_from
            });
            return ret;
        }
        function yield_request() {
            var start, ret;
            start = S.token;
            expect_token("keyword", "yield");
            ret = yield_();
            ret.start = start;
            ret.end = prev();
            ret.computedType = "?";
            ret.yield_request = true;
            return ret;
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
            return subscripts(new ast.New({
                start: start,
                expression: newexp,
                args: args,
                end: prev()
            }), true);
        }
        function as_atom_node(token) {
            var tok, tmp_, ret, tmp__;
            tok = token || S.token;
            tmp_ = tok.type;
            if (tmp_ === "name") {
                if (tok.value === "NaN") {
                    ret = kwargs(as_symbol)(ast.NotANumber, {token: tok});
                } else if (tok.value === "undefined") {
                    ret = kwargs(as_symbol)(ast.Undefined, {token: tok});
                } else {
                    ret = kwargs(as_symbol)(ast.SymbolRef, {token: tok});
                }
            } else if (tmp_ === "num") {
                ret = new ast.Number({
                    start: tok,
                    end: tok,
                    value: tok.value
                });
            } else if (tmp_ === "string") {
                if (tok.subtype === "v") {
                    ret = new ast.Verbatim({
                        start: tok,
                        value: tok.value,
                        end: tok
                    });
                } else {
                    ret = new ast.String({
                        start: tok,
                        end: tok,
                        value: tok.value,
                        modifier: tok.subtype
                    });
                }
            } else if (tmp_ === "regexp") {
                ret = new ast.RegExp({
                    start: tok,
                    end: tok,
                    value: tok.value
                });
            } else if (tmp_ === "atom") {
                tmp__ = tok.value.toLowerCase();
                if (/^(none)|(null)$/.test(tmp__)) {
                    ret = new ast.Null({
                        start: tok,
                        end: tok
                    });
                } else if (tmp__ === "false") {
                    ret = new ast.Boolean({
                        start: tok,
                        value: false,
                        end: tok
                    });
                } else if (tmp__ === "true") {
                    ret = new ast.Boolean({
                        start: tok,
                        value: true,
                        end: tok
                    });
                } else {
                    throw new Error("Parser seems corrupted");
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
                    if (ex instanceof ast.SymbolRef || ex instanceof ast.Yield) {
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
            if (is_("keyword", "yield")) {
                return yield_request();
            }
            if (ATOMIC_START_TOKEN[S.token.type]) {
                return subscripts(as_atom_node(), allow_calls);
            }
            unexpected();
        }
        function expr_list(closing, allow_trailing_comma, allow_empty, func_call) {
            var ՐՏitr59, ՐՏidx59, ՐՏupk4;
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
                    a.push(new ast.Hole({
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
                ՐՏitr59 = ՐՏ_Iterable(enumerate(a));
                for (ՐՏidx59 = 0; ՐՏidx59 < ՐՏitr59.length; ՐՏidx59++) {
                    ՐՏupk4 = ՐՏitr59[ՐՏidx59];
                    i = ՐՏupk4[0];
                    arg = ՐՏupk4[1];
                    if (arg instanceof ast.Assign) {
                        ++BASELIB["kwargs"];
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
                    ++BASELIB["kwargs"];
                    next();
                    kwargs.push(as_symbol(ast.SymbolVar, false));
                } else {
                    arg = expression(false);
                    if (arg instanceof ast.Assign) {
                        ++BASELIB["kwargs"];
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
            terminator = object instanceof ast.DictComprehension ? "}" : "]";
            expect_token("keyword", "for");
            forloop = for_(true);
            ++BASELIB["iterable"];
            object.init = forloop.init;
            object.name = forloop.name;
            object.object = forloop.object;
            object.condition = is_("punc", terminator) ? null : (expect_token("keyword", "if"), 
            expression(true));
            expect(terminator);
            return object;
        }
        
        var array_ = (ՐՏ_160 = function array_() {
            var expr, ret;
            expect("[");
            expr = [];
            if (!is_("punc", "]")) {
                expr.push(expression(false));
                if (is_("keyword", "for")) {
                    return read_comprehension(new ast.ListComprehension({
                        statement: expr[0]
                    }));
                }
                if (is_("operator", "til")) {
                    ++BASELIB["range"];
                    next();
                    expr.push(expression(false));
                    ret = new ast.Range({
                        start: S.token,
                        left: expr[0],
                        operator: "til",
                        right: expr[1],
                        end: prev()
                    });
                    expect("]");
                    return ret;
                } else if (is_("operator", "to")) {
                    ++BASELIB["range"];
                    next();
                    expr.push(expression(false));
                    ret = new ast.Range({
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
            return new ast.Array({
                elements: expr.concat(expr_list("]", !options.strict, true))
            });
        }, ՐՏ_160 = embed_tokens(ՐՏ_160), ՐՏ_160);
        
        var object_ = (ՐՏ_161 = function object_() {
            var maybe_dict_comprehension, must_be_comprehension, first, a, start, type, fun_type, value, key, name, key_;
            maybe_dict_comprehension = false;
            must_be_comprehension = false;
            expect("{");
            first = true;
            a = [];
            while (!is_("punc", "}")) {
                if (!first) {
                    expect(",");
                    if (!options.strict && is_("punc", "}")) {
                        break;
                    }
                }
                start = S.token;
                type = start.type;
                if (is_("operator", "*")) {
                    if (!options.es6) {
                        croak("Spread operator in object literals is only allowed in ES6 mode");
                    }
                    a.push(maybe_unary(true));
                    first = false;
                    continue;
                } else if (is_("operator", "@") || (is_("keyword", "def") || is_("name", [ "get", "set" ])) && peek().value !== ":") {
                    while (is_("operator", "@")) {
                        maybe_unary(true);
                    }
                    start = S.token;
                    fun_type = is_("keyword", "def") ? "def" : is_("name", [ "get", "set" ]) ? start.value : null;
                    if (fun_type && peek().value !== ":") {
                        next();
                        if (fun_type === "def") {
                            value = function_(true);
                        } else {
                            value = accessor_(fun_type, start, true);
                        }
                        key = value.name;
                    } else {
                        unexpected();
                    }
                    a.push(new ast.ObjectKeyVal({
                        start: start,
                        key: key,
                        value: value,
                        end: prev()
                    }));
                    first = false;
                    continue;
                } else {
                    if (first && !(ՐՏ_in(peek().value, [ ":", ",", "}" ]))) {
                        maybe_dict_comprehension = true;
                        must_be_comprehension = !is_("punc", "(");
                        key = expression(false);
                        name = null;
                    } else {
                        if (is_("punc", "(")) {
                            if (!options.es6) {
                                croak("Computed properties are only allowed in ES6 mode");
                            }
                            expect("(");
                            key = expression(false);
                            expect(")");
                        } else {
                            key_ = as_property_name();
                            name = key_.value;
                            if (key_.type === "num") {
                                key = new ast.Number({
                                    start: start,
                                    value: name,
                                    end: prev()
                                });
                            } else if (key_.type === "name" || key_.type === "keyword") {
                                if (ՐՏ_in(name, [ "True", "False" ])) {
                                    key = new ast.Boolean({
                                        start: start,
                                        value: name,
                                        end: prev()
                                    });
                                } else {
                                    key = new ast.Identifier({
                                        start: start,
                                        value: name,
                                        end: prev()
                                    });
                                }
                            } else {
                                key = new ast.String({
                                    start: start,
                                    value: name,
                                    end: prev()
                                });
                            }
                        }
                    }
                }
                if (is_("punc") && ՐՏ_in(S.token.value, [ ",", "}" ]) && key instanceof ast.Identifier) {
                    value = key;
                } else {
                    expect(":");
                    value = expression(false);
                }
                a.push(new ast.ObjectKeyVal({
                    start: start,
                    key: key,
                    value: value,
                    end: prev()
                }));
                if (first && is_("keyword", "for")) {
                    return read_comprehension(new ast.DictComprehension({
                        statement: maybe_dict_comprehension ? key : as_atom_node(a[0].start),
                        value_statement: a[0].value
                    }));
                } else if (must_be_comprehension) {
                    unexpected();
                }
                first = false;
            }
            next();
            return new ast.ObjectLiteral({
                properties: a
            });
        }, ՐՏ_161 = embed_tokens(ՐՏ_161), ՐՏ_161);
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
            var token_, js_reserved, name, tmp_, sym;
            token_ = token || S.token;
            js_reserved = false;
            if (ՐՏ_in(type, [ ast.SymbolDefun, ast.SymbolAccessor ])) {
                name = token_._value || token_.value;
                tmp_ = token_.type;
                if (tmp_ === "name" || tmp_ === "num" || tmp_ === "string" || tmp_ === "keyword" || tmp_ === "atom" || tokenizer.is_token(token_, "operator:keyword")) {
                    js_reserved = tokenizer.ALL_JS_KEYWORDS(name);
                } else {
                    return null;
                }
            } else {
                if (!tokenizer.is_token(token_, "name")) {
                    if (!noerror) {
                        croak("Name expected");
                    }
                    return null;
                }
                name = token_.value;
                if (name === "this") {
                    if (type === ast.SymbolLambda) {
                        return null;
                    }
                    type = ast.This;
                } else {
                    name = maybe_keyword(name);
                }
            }
            sym = new (true && type)({
                name: String(name),
                js_reserved: js_reserved,
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
            sym = new (name === "this" ? ast.This : type)({
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
            var ՐՏ_162, ՐՏ_163, ՐՏ_164;
            var computedType, name;
            if (value) {
                computedType = typeof value === "string" ? value : value.resolveType(S.in_scope);
            } else {
                computedType = "?";
            }
            name = typeof element === "string" ? element : element.name;
            if (name) {
                if (ՐՏ_in(name, (ՐՏ_162 = S.in_scope)[ՐՏ_162.length-1].vars)) {
                    (ՐՏ_163 = S.in_scope)[ՐՏ_163.length-1].vars[name].push(computedType);
                } else {
                    (ՐՏ_164 = S.in_scope)[ՐՏ_164.length-1].vars[name] = [ computedType ];
                }
            }
        }
        function subscripts(expr, allow_calls) {
            var ՐՏ_165, ՐՏ_166, ՐՏ_167, ՐՏ_168, ՐՏ_169, ՐՏ_170;
            var start, slice_bounds, is_slice, i, str_, ret, className, funcname, is_super, ast_ClassCall, tmp_, args;
            start = expr.start;
            if (is_("punc", ".")) {
                next();
                return subscripts(new ast.Dot({
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
                    ++BASELIB["eslice"];
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
                        return subscripts(new ast.Slice({
                            start: start,
                            expression: expr,
                            property: slice_bounds[0] || new ast.Number({
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
                            slice_bounds[slice_bounds.length-2] = new ast.Undefined();
                        }
                        return subscripts(new ast.Call({
                            start: start,
                            expression: new ast.SymbolRef({
                                name: "eslice"
                            }),
                            args: [ expr ].concat(slice_bounds),
                            end: prev()
                        }), allow_calls);
                    } else {
                        slice_bounds = (function() {
                            var ՐՏidx60, ՐՏitr60 = ՐՏ_Iterable(slice_bounds), ՐՏres = [], i;
                            for (ՐՏidx60 = 0; ՐՏidx60 < ՐՏitr60.length; ՐՏidx60++) {
                                i = ՐՏitr60[ՐՏidx60];
                                ՐՏres.push(i === null ? new ast.Number({
                                    value: 0
                                }) : i);
                            }
                            return ՐՏres;
                        })();
                        return subscripts(new ast.Call({
                            start: start,
                            expression: new ast.Dot({
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
                    return subscripts(new ast.Sub({
                        start: start,
                        expression: expr,
                        property: slice_bounds[0] || new ast.Number({
                            value: 0
                        }),
                        end: prev()
                    }), allow_calls);
                }
            }
            if (allow_calls && is_("punc", "(") && !S.token.newline_before) {
                next();
                if (expr instanceof ast.SymbolRef && expr.name === "JS") {
                    str_ = expression(false);
                    if (!(str_ instanceof ast.String)) {
                        token_error(prev(), "Compile-time function JS() can't evaluate variables or expressions");
                    }
                    ret = new ast.Verbatim({
                        start: start,
                        value: str_.value,
                        end: prev()
                    });
                    expect(")");
                    return subscripts(ret, true);
                } else if (!expr.parens && get_class_in_scope(expr)) {
                    if (ՐՏ_in(expr.name, STDLIB)) {
                        ++BASELIB[expr.name];
                        if (/Error$/.test(expr.name)) {
                            ++BASELIB["extends"];
                        }
                    }
                    return subscripts(new ast.New({
                        start: start,
                        expression: expr,
                        args: func_call_list(),
                        end: prev()
                    }), true);
                } else {
                    if (expr instanceof ast.Dot) {
                        className = get_class_in_scope(expr.expression);
                    }
                    if (className) {
                        funcname = expr;
                        if (funcname.property === "__init__") {
                            funcname.property = "constructor";
                        }
                        is_super = S.in_scope.length > 1 && (ՐՏ_165 = S.in_scope)[ՐՏ_165.length-2].type === "class" && stringifyName(expr.expression) === (ՐՏ_166 = S.in_scope)[ՐՏ_166.length-2].parent;
                        (ՐՏ_167 = S.in_scope)[ՐՏ_167.length-1].callsSuper = (ՐՏ_168 = S.in_scope)[ՐՏ_168.length-1].callsSuper || is_super;
                        ast_ClassCall = new ast.ClassCall({
                            start: start,
                            class: expr.expression,
                            method: funcname.property,
                            super: is_super,
                            static: is_static_method(className, funcname.property),
                            args: func_call_list(),
                            end: prev()
                        });
                        if (className.on_static_change) {
                            className.on_static_change(function(static_name, on_off) {
                                if (static_name === funcname.property) {
                                    ast_ClassCall.static = on_off;
                                }
                            });
                        }
                        return validateCallArgs(subscripts(ast_ClassCall, true));
                    } else if (expr instanceof ast.SymbolRef) {
                        tmp_ = expr.name;
                        if (ՐՏ_in(tmp_, STDLIB)) {
                            ++BASELIB[tmp_];
                        } else if (tmp_ === "isinstance") {
                            args = func_call_list();
                            if (args.length !== 2) {
                                croak("'isinstance' takes exactly 2 arguments");
                            }
                            return new ast.Binary({
                                start: start,
                                operator: "instanceof",
                                left: args[0],
                                right: args[1],
                                end: prev()
                            });
                        } else if (tmp_ === "super") {
                            (ՐՏ_169 = S.in_scope)[ՐՏ_169.length-1].callsSuper = true;
                            (ՐՏ_170 = S.in_scope)[ՐՏ_170.length-1].superCall_expr = expr;
                        } else {
                            expr.name = maybe_keyword(expr.name);
                        }
                    }
                    return validateCallArgs(subscripts(new ast.Call({
                        start: start,
                        expression: expr,
                        args: func_call_list(),
                        end: prev()
                    }), true));
                }
            }
            return expr;
        }
        function stringifyName(expr) {
            if (expr instanceof ast.Dot) {
                return stringifyName(expr.expression) + "." + expr.property;
            }
            return expr.name;
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
            if (typeof expr === "string") {
                name = expr;
            } else if (expr instanceof ast.SymbolRef) {
                name = expr.name;
            } else if (expr instanceof ast.Dot) {
                name = stringifyName(expr);
            } else if (expr instanceof ast.Call) {
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
                S.token.comments_before = start.comments_before.slice(0);
                S.in_decorator = true;
                expr = expression(true);
                S.in_decorator = false;
                if (keepDecoratorOrImport(expr)) {
                    S.decorators.push(expr);
                }
                return new ast.EmptyStatement({
                    stype: "@",
                    start: prev(),
                    end: prev()
                });
            }
            if (is_("operator") && UNARY_PREFIX(start.value)) {
                next();
                ex = make_unary(ast.UnaryPrefix, start.value, maybe_unary(allow_calls));
                ex.start = start;
                ex.end = prev();
                return ex;
            }
            val = expr_atom(allow_calls);
            while (is_("operator") && tokenizer.UNARY_POSTFIX(S.token.value) && !S.token.newline_before) {
                val = make_unary(ast.UnaryPostfix, S.token.value, val);
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
            if (!(ՐՏ_in(op, [ "in", "instanceof", "==", "!=", "===", "!==", "||", "&&", "=" ])) && (!(ՐՏ_in(left, [ "Number", "String", "Boolean", "?" ])) || !(ՐՏ_in(right, [ "Number", "String", "Boolean", "?" ])) || (left === "String" || right === "String") && (left === right ? !(ՐՏ_in(op, [ "+", "+=", "<", "<=", ">", ">=" ])) : !(ՐՏ_in(op, [ "+", "+=" ]))))) {
                if (left) {
                    if (left[0] === "[") {
                        left = "Array";
                    } else if (left[0] === "{") {
                        left = "Object";
                    }
                }
                if (right) {
                    if (right[0] === "[") {
                        right = "Array";
                    } else if (right[0] === "{") {
                        right = "Object";
                    }
                }
                throw croak("cannot perform binary '" + op + "' operation on incompatible elements of type " + left + " and " + right + "");
            }
            return astElement;
        }
        function validateUnary(astElement) {
            var element, op;
            element = astElement.expression.resolveType(S.in_scope);
            op = astElement.operator;
            if (!element) {
                if (op !== "!") {
                    throw croak("cannot perform unary '" + op + "' operation on incompatible element of type " + element);
                }
            } else if (!(ՐՏ_in(element, [ "Number", "?" ])) && ՐՏ_in(op, [ "+", "-" ]) || !(ՐՏ_in(element[0], [ "[", "{", "?" ])) && op === "*") {
                if (element[0] === "[") {
                    element = "Array";
                } else if (element[0] === "{") {
                    element = "Object";
                }
                throw croak("cannot perform unary '" + op + "' operation on incompatible element of type " + element);
            }
            return astElement;
        }
        function validateCallArgs(astElement) {
            var ՐՏitr61, ՐՏidx61, ՐՏitr62, ՐՏidx62, ՐՏitr63, ՐՏidx63, ՐՏitr64, ՐՏidx64, ՐՏupk5;
            var name, found, scope, func, signature, variable, args, i, arg, expected, actual;
            if (astElement.expression instanceof ast.SymbolRef) {
                name = astElement.expression.name;
                found = false;
                ՐՏitr61 = ՐՏ_Iterable(reversed(S.in_scope));
                for (ՐՏidx61 = 0; ՐՏidx61 < ՐՏitr61.length; ՐՏidx61++) {
                    scope = ՐՏitr61[ՐՏidx61];
                    ՐՏitr62 = ՐՏ_Iterable(scope.functions);
                    for (ՐՏidx62 = 0; ՐՏidx62 < ՐՏitr62.length; ՐՏidx62++) {
                        func = ՐՏitr62[ՐՏidx62];
                        if (func === name) {
                            signature = scope.functions[func];
                            found = true;
                            break;
                        }
                    }
                    ՐՏitr63 = ՐՏ_Iterable(scope.vars);
                    for (ՐՏidx63 = 0; ՐՏidx63 < ՐՏitr63.length; ՐՏidx63++) {
                        variable = ՐՏitr63[ՐՏidx63];
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
                    ՐՏitr64 = ՐՏ_Iterable(enumerate(astElement.args));
                    for (ՐՏidx64 = 0; ՐՏidx64 < ՐՏitr64.length; ՐՏidx64++) {
                        ՐՏupk5 = ՐՏitr64[ՐՏidx64];
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
                    ++BASELIB[op];
                }
            }
            prec = op !== null ? tokenizer.PRECEDENCE[op] : null;
            if (prec !== null && prec > min_prec) {
                next();
                right = expr_op(maybe_unary(true), prec, no_in);
                if (ՐՏ_in(op, [ "==", "!=" ])) {
                    ++BASELIB["eq"];
                    ret = new ast.DeepEquality({
                        start: left.start,
                        left: left,
                        operator: op,
                        right: right,
                        end: right.end
                    });
                } else {
                    ret = new ast.Binary({
                        start: left.start,
                        left: left,
                        operator: op,
                        right: right,
                        end: right.end
                    });
                    validateBinary(ret);
                }
                if (not_in) {
                    ret = new ast.UnaryPrefix({
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
                return new ast.Conditional({
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
            var ՐՏitr65, ՐՏidx65;
            var element;
            if (expr instanceof ast.PropAccess) {
                return true;
            }
            if (expr instanceof ast.SymbolRef) {
                if (options.strict_names && tokenizer.IS_ANY_KEYWORD(expr.name)) {
                    return false;
                }
                return true;
            }
            if (expr instanceof ast.Array) {
                ՐՏitr65 = ՐՏ_Iterable(expr.elements);
                for (ՐՏidx65 = 0; ՐՏidx65 < ՐՏitr65.length; ՐՏidx65++) {
                    element = ՐՏitr65[ՐՏidx65];
                    if (!isAssignable(element)) {
                        return false;
                    }
                }
                return true;
            }
            if (expr instanceof ast.Seq) {
                if (isAssignable(expr.car) && isAssignable(expr.cdr)) {
                    return true;
                }
            }
            return false;
        }
        function maybe_assign(no_in) {
            var ՐՏ_171, ՐՏ_172, ՐՏ_173, ՐՏ_174;
            var start, left, val, right;
            start = S.token;
            left = maybe_conditional(no_in);
            val = S.token.value;
            if (is_("operator") && ASSIGNMENT(val)) {
                if (isAssignable(left)) {
                    if (left instanceof ast.SymbolRef && val !== "=" && !(ՐՏ_in(left.name, (ՐՏ_171 = S.in_scope)[ՐՏ_171.length-1].vars)) && (!(ՐՏ_172 = S.in_scope)[ՐՏ_172.length-1].args || !(ՐՏ_in(left.name, (ՐՏ_173 = S.in_scope)[ՐՏ_173.length-1].args))) && !(ՐՏ_in(left.name, (ՐՏ_174 = S.in_scope)[ՐՏ_174.length-1].nonlocal))) {
                        croak("Attempting to increment/modify uninitialized variable '" + left.name + "', this can also occur if you're trying to shadow without initializing the variable in local scope.");
                    }
                    next();
                    right = maybe_assign(no_in);
                    if (!S.in_seq) {
                        mark_local_assignment(left, right);
                    }
                    return validateBinary(new ast.Assign({
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
            var ՐՏitr66, ՐՏidx66, ՐՏupk6, ՐՏitr67, ՐՏidx67, ՐՏupk7;
            var start, expr, left, leftAst, right, index, element, seq;
            start = S.token;
            expr = maybe_assign(no_in);
            if (commas) {
                left = [ expr ];
                while (is_("punc", ",") && !peek().newline_before) {
                    S.in_seq = true;
                    next();
                    if (expr instanceof ast.Assign) {
                        left[left.length-1] = left[left.length-1].left;
                        if (left.length === 1) {
                            if (left[0] instanceof ast.Seq) {
                                leftAst = seq_to_array(left[0]);
                            } else {
                                leftAst = left[0];
                            }
                        } else {
                            leftAst = new ast.Array({
                                elements: left
                            });
                        }
                        right = seq_to_array(new ast.Seq({
                            car: expr.right,
                            cdr: expression(true, no_in)
                        }));
                        ՐՏitr66 = ՐՏ_Iterable(enumerate(leftAst.elements));
                        for (ՐՏidx66 = 0; ՐՏidx66 < ՐՏitr66.length; ՐՏidx66++) {
                            ՐՏupk6 = ՐՏitr66[ՐՏidx66];
                            index = ՐՏupk6[0];
                            element = ՐՏupk6[1];
                            mark_local_assignment(element, right.elements[index]);
                        }
                        return new ast.Assign({
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
                if (expr instanceof ast.Assign && expr.left instanceof ast.Seq) {
                    expr.left = seq_to_array(expr.left);
                }
                if (left.length > 1 && left[left.length-1] instanceof ast.Assign) {
                    left[left.length-1] = left[left.length-1].left;
                    ՐՏitr67 = ՐՏ_Iterable(enumerate(left));
                    for (ՐՏidx67 = 0; ՐՏidx67 < ՐՏitr67.length; ՐՏidx67++) {
                        ՐՏupk7 = ՐՏitr67[ՐՏidx67];
                        index = ՐՏupk7[0];
                        element = ՐՏupk7[1];
                        mark_local_assignment(element, expr.right instanceof ast.Array ? expr.right.elements[index] : null);
                    }
                    return new ast.Assign({
                        start: start,
                        left: new ast.Array({
                            elements: left
                        }),
                        operator: expr.operator,
                        right: expr.right,
                        end: peek()
                    });
                }
                seq = function build_seq(a) {
                    var ՐՏitr68, ՐՏidx68, ՐՏupk8;
                    var first, index, element;
                    first = a.shift();
                    if (first instanceof ast.Assign) {
                        if (first.left instanceof ast.Array) {
                            ՐՏitr68 = ՐՏ_Iterable(enumerate(first.left.elements));
                            for (ՐՏidx68 = 0; ՐՏidx68 < ՐՏitr68.length; ՐՏidx68++) {
                                ՐՏupk8 = ՐՏitr68[ՐՏidx68];
                                index = ՐՏupk8[0];
                                element = ՐՏupk8[1];
                                mark_local_assignment(element, first.right instanceof ast.Array ? first.right.elements[index] : null);
                            }
                        }
                    }
                    if (!a.length) {
                        return first;
                    }
                    return new ast.Seq({
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
            var ՐՏ_175, ՐՏ_176, ՐՏitr69, ՐՏidx69;
            var start, body, docstring, first_token, element, shebang, end, toplevel, assignments, callables, imports, item;
            start = S.token;
            body = [];
            docstring = null;
            first_token = true;
            while (!is_("eof")) {
                element = statement();
                if (first_token && element instanceof ast.Directive && element.value.indexOf("#!") === 0) {
                    shebang = element.value;
                } else if (!body.length && is_docstring(element)) {
                    if (!options.dropDocstrings) {
                        docstring = format_docstring(element.value);
                    }
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
                toplevel = new ast.TopLevel({
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
            toplevel.filename = options.filename;
            toplevel.nonlocalvars = Object.keys((ՐՏ_175 = S.in_scope)[ՐՏ_175.length-1].nonlocal);
            assignments = Object.keys((ՐՏ_176 = S.in_scope)[ՐՏ_176.length-1].vars);
            callables = scan_for_top_level_callables(toplevel.body).filter(uniq);
            imports = scan_for_top_level_imports(toplevel.body);
            toplevel.localvars = [];
            ՐՏitr69 = ՐՏ_Iterable(assignments);
            for (ՐՏidx69 = 0; ՐՏidx69 < ՐՏitr69.length; ՐՏidx69++) {
                item = ՐՏitr69[ՐՏidx69];
                if (!(ՐՏ_in(item, toplevel.nonlocalvars))) {
                    toplevel.localvars.push(new_symbol(ast.SymbolVar, item));
                }
            }
            toplevel.exports = toplevel.localvars.concat(callables).concat(imports).filter(uniq);
            toplevel.depends_on = depends_on;
            toplevel.submodules = [];
            toplevel.classes = class_map;
            toplevel.top_classes = function(key) {
                var ՐՏitr70, ՐՏidx70;
                var ret, cn, obj, sub_id, sub_key, sub;
                ret = {};
                key = key || "";
                cn = "";
                for (cn in this.classes) {
                    obj = this.classes[cn];
                    ret[key ? key + "." + cn : cn] = {
                        "static": obj.static,
                        "bound": obj.bound
                    };
                }
                ՐՏitr70 = ՐՏ_Iterable(this.submodules);
                for (ՐՏidx70 = 0; ՐՏidx70 < ՐՏitr70.length; ՐՏidx70++) {
                    sub_id = ՐՏitr70[ՐՏidx70];
                    sub_key = sub_id.replace(new RegExp("^" + this.module_id.replace(/\./g, "\\.")), key);
                    sub = IMPORTED[sub_id];
                    Object.assign(ret, sub.top_classes(sub_key));
                }
                return ret;
            };
            toplevel.import_order = Object.keys(IMPORTED).length;
            toplevel.module_id = module_id;
            toplevel.is_package = (toplevel.filename || "").endsWith("/__init__.pyj");
            IMPORTED[module_id] = toplevel;
            toplevel.imports = IMPORTED;
            toplevel.baselib = BASELIB;
            IMPORTING[module_id] = false;
            if (PRE_IMPORTED[module_id]) {
                IMPORTED[module_id].submodules = PRE_IMPORTED[module_id].submodules;
                delete PRE_IMPORTED[module_id];
            }
            return toplevel;
        }();
    }
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:parser"];
    ՐՏ_mod.export("NATIVE_CLASSES", function(){return NATIVE_CLASSES;}, function(ՐՏ_v){if (typeof NATIVE_CLASSES !== "undefined") {NATIVE_CLASSES = ՐՏ_v;};});
    ՐՏ_mod.export("COMMON_STATIC", function(){return COMMON_STATIC;}, function(ՐՏ_v){if (typeof COMMON_STATIC !== "undefined") {COMMON_STATIC = ՐՏ_v;};});
    ՐՏ_mod.export("CLASS_MAP", function(){return CLASS_MAP;}, function(ՐՏ_v){if (typeof CLASS_MAP !== "undefined") {CLASS_MAP = ՐՏ_v;};});
    ՐՏ_mod.export("BASELIB", function(){return BASELIB;}, function(ՐՏ_v){if (typeof BASELIB !== "undefined") {BASELIB = ՐՏ_v;};});
    ՐՏ_mod.export("STDLIB", function(){return STDLIB;}, function(ՐՏ_v){if (typeof STDLIB !== "undefined") {STDLIB = ՐՏ_v;};});
    ՐՏ_mod.export("UNARY_PREFIX", function(){return UNARY_PREFIX;}, function(ՐՏ_v){if (typeof UNARY_PREFIX !== "undefined") {UNARY_PREFIX = ՐՏ_v;};});
    ՐՏ_mod.export("ASSIGNMENT", function(){return ASSIGNMENT;}, function(ՐՏ_v){if (typeof ASSIGNMENT !== "undefined") {ASSIGNMENT = ՐՏ_v;};});
    ՐՏ_mod.export("STATEMENTS_WITH_LABELS", function(){return STATEMENTS_WITH_LABELS;}, function(ՐՏ_v){if (typeof STATEMENTS_WITH_LABELS !== "undefined") {STATEMENTS_WITH_LABELS = ՐՏ_v;};});
    ՐՏ_mod.export("ATOMIC_START_TOKEN", function(){return ATOMIC_START_TOKEN;}, function(ՐՏ_v){if (typeof ATOMIC_START_TOKEN !== "undefined") {ATOMIC_START_TOKEN = ՐՏ_v;};});
    ՐՏ_mod.export("array_to_hash", function(){return array_to_hash;}, function(ՐՏ_v){if (typeof array_to_hash !== "undefined") {array_to_hash = ՐՏ_v;};});
    ՐՏ_mod.export("init_mod", function(){return init_mod;}, function(ՐՏ_v){if (typeof init_mod !== "undefined") {init_mod = ՐՏ_v;};});
    ՐՏ_mod.export("has_simple_decorator", function(){return has_simple_decorator;}, function(ՐՏ_v){if (typeof has_simple_decorator !== "undefined") {has_simple_decorator = ՐՏ_v;};});
    ՐՏ_mod.export("parse", function(){return parse;}, function(ՐՏ_v){if (typeof parse !== "undefined") {parse = ՐՏ_v;};});
    ՐՏ_mod.export("find_if", function(){return find_if;}, function(ՐՏ_v){if (typeof find_if !== "undefined") {find_if = ՐՏ_v;};});
    ՐՏ_mod.export("ast", function(){return ast;}, function(ՐՏ_v){if (typeof ast !== "undefined") {ast = ՐՏ_v;};});
    ՐՏ_mod.export("tokenizer", function(){return tokenizer;}, function(ՐՏ_v){if (typeof tokenizer !== "undefined") {tokenizer = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

ՐՏ_modules["ՐՏ:_baselib"].body = function(){
    var __name__ = "_baselib";

    var BASELIB;
    BASELIB = '"""\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under BSD license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n **********************************************************************\n"""\n\n\n# for convenience we\'ll use a convention here that will work as follows:\n#\n#   if function is named, assume we\'ll be outputting the function itself\n#   if the given baselib chunk is triggered\n#\n#   if function is unnamed, assume the function is a container for the logic\n#   to be output. We\'re basically ignoring the wrapper and dumping what\'s inside\n\n{\n"abs": def abs(n):\n    return Math.abs(n)\n,\n"all": def all(a):\n    for e in a:\n        if not e: return False\n    return True\n,\n"any": def any(a):\n    for e in a:\n        if e: return True\n    return False\n,\n"bin": def bin(a): return \'0b\' + (a >>> 0).toString(2)\n,\n"bind": def ՐՏ_bind(fn, thisArg):\n    if fn.orig: fn = fn.orig\n    if thisArg is False: return fn\n    ret = def():\n        return fn.apply(thisArg, arguments)\n    ret.orig = fn\n    return ret\n,\n"rebind_all": def ՐՏ_rebindAll(thisArg, rebind):\n    if rebind is undefined: rebind = True\n    for v\'var p in thisArg\':\n        if thisArg[p] and thisArg[p].orig:\n            if rebind: thisArg[p] = bind(thisArg[p], thisArg)\n            else: thisArg[p] = thisArg[p].orig\n,\n"with__name__": def ՐՏ_with__name__(fn, name):\n    fn.__name__ = name\n    return fn\n,\n"def_modules": def ՐՏ_def_modules():\n    modules = {}\n    def mounter(mod_id):\n        rs_mod_id = "ՐՏ:"+ mod_id\n        rs_mod = modules[rs_mod_id] = {\n            "body": None,\n            "exports":None,\n        }\n        rs_mod["export"] = def(prop, get, set):\n            if not rs_mod["exports"]: rs_mod["exports"] = {}\n            Object.defineProperty( rs_mod["exports"], prop, {\n                configurable: True,\n                enumerable: True,\n                get: get,\n                set: set,\n            })\n        Object.defineProperty( modules,  mod_id, {\n            enumerable: True,\n            get: def():\n                return (mod = modules[rs_mod_id])["exports"] or mod["body"]()\n            , set: def(v):\n                modules[rs_mod_id]["exports"] = v\n        })\n        return rs_mod\n\n    Object.defineProperty( modules, \'ՐՏ_def\', {\n        configurable: False,\n        enumerable: False,\n        value: mounter\n    })\n    return modules\n,\n"cmp": def cmp(a, b): return a < b ? -1 : a > b ? 1 : 0\n,\n"chr": def(): v\'var chr = String.fromCharCode\'\n,\n"dir": def dir(item):\n    # TODO: this isn\'t really representative of real Python\'s dir(), nor is it\n    # an intuitive replacement for "for ... in" loop, need to update this logic\n    # and introduce a different way of achieving "for ... in"\n    arr = []\n    for v\'var i in item\': arr.push(i)\n    return arr\n,\n"enumerate": def enumerate(item):\n    arr = []\n    iter = ՐՏ_Iterable(item)\n    for i in range(iter.length):\n        arr[arr.length] = [i, item[i]]\n    return arr\n,\n"eslice": def ՐՏ_eslice(arr, step, start, end):\n    arr = arr[:]\n    if v\'typeof arr\' is \'string\' or isinstance(arr, String):\n        isString = True\n        arr = arr.split(\'\')\n\n    if step < 0:\n        step = -step\n        arr.reverse()\n        if v\'typeof start\' is not "undefined": start = arr.length - start - 1\n        if v\'typeof end\' is not "undefined": end = arr.length - end - 1\n    if v\'typeof start\' is "undefined": start = 0\n    if v\'typeof end\' is "undefined": end = arr.length\n\n    arr = arr.slice(start, end).filter(def(e, i): return i % step is 0;)\n    return isString ? arr.join(\'\') : arr\n,\n"extends": def ՐՏ_extends(child, parent):\n    child.prototype = Object.create(parent.prototype)\n    child.prototype.__base__ = parent     # since we don\'t support multiple inheritance, __base__ seemed more appropriate than __bases__ array of 1\n    child.prototype.constructor = child\n,\n"filter": def filter(oper, arr):\n    return arr.filter(oper)\n,\n"hex": def hex(a): return \'0x\' + (a >>> 0).toString(16)\n,\n"in": def ՐՏ_in(val, arr):\n    if v\'typeof arr.indexOf\' is \'function\': return arr.indexOf(val) is not -1\n    elif v\'typeof arr.has\' is \'function\': return arr.has(val)\n    return arr.hasOwnProperty(val)\n,\n"iterable": def ՐՏ_Iterable(iterable):\n    # can\'t use Symbol.iterator yet since it\'s not supported on all platforms until ES6 (i.e. mobile browsers don\'t have it)\n    if iterable.constructor is [].constructor\n    or iterable.constructor is \'\'.constructor\n    or (tmp = Array.prototype.slice.call(iterable)).length:\n        return tmp or iterable\n    if Set and iterable.constructor is Set:\n        return Array.from(iterable)\n    return Object.keys(iterable)    # so we can use \'for ... in\' syntax with hashes\n,\n"len": def len(obj):\n    # can\'t use Symbol.iterator yet since it\'s not supported on all platforms until ES6 (i.e. mobile browsers don\'t have it)\n    if obj.constructor is [].constructor\n    or obj.constructor is \'\'.constructor\n    or (tmp = Array.prototype.slice.call(obj)).length:\n        return (tmp or obj).length\n    if Set and obj.constructor is Set:\n        return obj.size\n    return Object.keys(obj).length\n,\n"map": def map(oper, arr):\n    return arr.map(oper)\n,\n"max": def max(a):\n    return Math.max.apply(None, Array.isArray(a) ? a : arguments)\n,\n"min": def min(a):\n    return Math.min.apply(None, Array.isArray(a) ? a : arguments)\n,\n"merge": def ՐՏ_merge(target, source, overwrite):\n    for v\'var i in source\':\n        # instance variables\n        if source.hasOwnProperty(i) and (overwrite or v\'typeof target[i]\' is \'undefined\'): target[i] = source[i]\n    for prop in Object.getOwnPropertyNames(source.prototype):\n        # methods\n        if overwrite or v\'typeof target.prototype[prop]\' is \'undefined\':\n            Object.defineProperty(target.prototype, prop, Object.getOwnPropertyDescriptor(source.prototype, prop))\n,\n"mixin": def ՐՏ_mixin(*classes):\n    return def(baseClass):\n        for cls in classes:\n            for key in Object.getOwnPropertyNames(cls.prototype):\n                if key not in baseClass.prototype:\n                    Object.defineProperty(baseClass.prototype, key, Object.getOwnPropertyDescriptor(cls.prototype, key))\n        return baseClass\n\n,\n"print": def ՐՏ_print():\n    if v\'typeof console\' is \'object\': console.log.apply(console, arguments)\n,\n"range": def range(start, stop, step):\n    if arguments.length <= 1:\n        stop = start or 0\n        start = 0\n    step = arguments[2] or 1\n\n    length = Math.max(Math.ceil((stop - start) / step), 0)\n    idx = 0\n    range = Array(length)\n\n    while idx < length:\n        range[v\'idx++\'] = start\n        start += step\n    return range\n,\n"reduce": def reduce(f, a): return Array.reduce(a, f)\n,\n"reversed": def reversed(arr):\n    tmp = arr[:]\n    return tmp.reverse()\n,\n"sorted": def sorted(arr):\n    tmp = arr[:]\n    return tmp.sort()\n,\n"sum": def sum(arr, start=0):\n    return arr.reduce(\n        def(prev, cur): return prev+cur\n        ,\n        start\n    )\n,\n"type": def ՐՏ_type(obj):\n    return obj and obj.constructor and obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1)\n,\n"zip": def zip(a, b):\n    return [[a[i], b[i]] for i in range(Math.min(a.length, b.length))]\n,\n"getattr": def getattr(obj, name):\n    return obj[name]\n,\n"setattr": def setattr(obj, name, value):\n    obj[name] = value\n,\n"hasattr": def hasattr(obj, name):\n    return v\'name in obj\'\n,\n"eq": def ՐՏ_eq(a, b):\n    """\n    Equality comparison that works with all data types, returns true if structure and\n    contents of first object equal to those of second object\n\n    Arguments:\n        a: first object\n        b: second object\n    """\n    if a is b:\n        # simple object\n        return True\n\n    if a is undefined or b is undefined or a is None or b is None:\n        return False\n\n    if a.constructor is not b.constructor:\n        # object type mismatch\n        return False\n\n    if Array.isArray(a):\n        # arrays\n        if a.length is not b.length: return False\n        for i in range(a.length):\n            if not ՐՏ_eq(a[i], b[i]):\n                return False\n        return True\n    elif a.constructor is Object:\n        # hashes\n        # compare individual properties (order doesn\'t matter if it\'s a hash)\n        if Object.keys(a).length is not Object.keys(b).length: return False\n        for i in a:\n            # recursively test equality of object children\n            if not ՐՏ_eq(a[i], b[i]):\n                return False\n        return True\n    elif (Set and a.constructor is Set) or (Map and a.constructor is Map):\n        # sets and maps\n        if a.size is not b.size: return False\n        for v\'i of a\':\n            if not b.has(i):\n                return False\n        return True\n    elif (a.constructor is Date):\n        # dates\n        return a.getTime() is b.getTime()\n    elif v\'typeof a.__eq__\' is \'function\':\n        # everything else that implements __eq__ method\n        return a.__eq__(b)\n    return False\n,\n"kwargs": def():\n    # WARNING: when using this function decorator, you will not be able to use obfuscators that rename local variables\n    def kwargs(f):\n        argNames = f.toString().match(/\\(([^\\)]+)/)[1]\n        if not kwargs.memo[argNames]:\n            kwargs.memo[argNames] = argNames ? argNames.split(\',\').map(def(s): return s.trim();) : []\n        argNames = kwargs.memo[argNames]\n        return def():\n            args = [].slice.call(arguments)\n            if args.length:\n                kw = args[-1]\n                if v\'typeof kw\' is \'object\':\n                    for i in range(argNames.length):\n                        if argNames[i] in kw:\n                            args[i] = kw[argNames[i]]\n                else:\n                    args.push(kw)\n\n            # This logic is very fragile and very subtle, it needs to work both in ES6 and ES5, don\'t try to optimize the\n            # apply away into *args because having it in this format ensures correct \'this\' context, otherwise the function\n            # ends up unbound. Similarly, the fallthrough to except handles class creation in ES6.\n            try:\n                return f.apply(this, args)\n            except as e:\n                if /Class constructor \\w+ cannot be invoked without \'new\'/.test(e):\n                    return new f(*args)\n                raise\n    kwargs.memo = {}\n,\n\n# Errors\n# temporarily implemented via a wrapper pattern since there is no mechanism for assigning\n# classes to dictionary keys yet\n"AssertionError": def():\n    class AssertionError(Error):\n        def __init__(self, message):\n            self.name = "AssertionError"\n            self.message = message\n,\n"IndexError": def():\n    class IndexError(Error):\n        def __init__(self, message):\n            self.name = "IndexError"\n            self.message = message\n,\n"KeyError": def():\n    class KeyError(Error):\n        def __init__(self, message):\n            self.name = "KeyError"\n            self.message = message\n,\n"TypeError": def():\n    class TypeError(Error):\n        def __init__(self, message):\n            self.name = "TypeError"\n            self.message = message\n,\n"ValueError": def():\n    class ValueError(Error):\n        def __init__(self, message):\n            self.name = "ValueError"\n            self.message = message\n,\n}\n';
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:_baselib"];
    ՐՏ_mod.export("BASELIB", function(){return BASELIB;}, function(ՐՏ_v){if (typeof BASELIB !== "undefined") {BASELIB = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

ՐՏ_modules["ՐՏ:stream"].body = function(){
    var __name__ = "stream";

    var makePredicate = ՐՏ_modules["utils"].makePredicate;var noop = ՐՏ_modules["utils"].noop;var defaults = ՐՏ_modules["utils"].defaults;var repeat_string = ՐՏ_modules["utils"].repeat_string;var RAPYD_PREFIX = ՐՏ_modules["utils"].RAPYD_PREFIX;
    var is_identifier_char = ՐՏ_modules["tokenizer"].is_identifier_char;
    var ast = ՐՏ_modules["ast"];
    var _baselib = ՐՏ_modules["_baselib"];
    var parser = ՐՏ_modules["parser"];
    function Stream(options) {
        var indentation, current_col, current_line, current_pos, BUFFERS, IMPORTED, might_need_space, might_need_semicolon, last, requireSemicolonChars, space, indent, with_indent, newline, semicolon, add_mapping, tmpIndex, stack, baselibCache;
        options = defaults(options, {
            indent_start: 0,
            indent_level: 4,
            quote_keys: false,
            space_colon: true,
            ascii_only: false,
            inline_script: false,
            width: 80,
            max_line_len: 32e3,
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
        });
        indentation = 0;
        current_col = 0;
        current_line = 1;
        current_pos = 0;
        BUFFERS = [ {
            vars: [],
            output: "",
            baselib: {}
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
            var dq, sq;
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
        function spaced() {
            var ՐՏitr71, ՐՏidx71, ՐՏupk9;
            var i, x;
            ՐՏitr71 = ՐՏ_Iterable(enumerate(arguments));
            for (ՐՏidx71 = 0; ՐՏidx71 < ՐՏitr71.length; ՐՏidx71++) {
                ՐՏupk9 = ՐՏitr71[ՐՏidx71];
                i = ՐՏupk9[0];
                x = ՐՏupk9[1];
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
                        var ՐՏitr72, ՐՏidx72;
                        var print_name, prop_keys, prop_attrs, k;
                        print_name = function() {
                            output.print(key);
                        };
                        prop_keys = {};
                        if (typeof props[key] === "function") {
                            prop_attrs = {
                                "enumerable": "true",
                                "writable": "true"
                            };
                            prop_keys["value"] = props[key];
                        } else {
                            ՐՏitr72 = ՐՏ_Iterable([ "get", "set", "value" ]);
                            for (ՐՏidx72 = 0; ՐՏidx72 < ՐՏitr72.length; ՐՏidx72++) {
                                k = ՐՏitr72[ՐՏidx72];
                                if (props[key][k]) {
                                    prop_keys[k] = props[key][k];
                                }
                            }
                            prop_attrs = props[key].attrs || {};
                            print_name = props[key].name && props[key].name.print ? function() {
                                props[key].name.print(output);
                            } : print_name;
                        }
                        if (i) {
                            output.print(",");
                            output.newline();
                        }
                        output.indent();
                        print_name();
                        output.colon();
                        output.with_block(function() {
                            var ՐՏitr73, ՐՏidx73, ՐՏitr74, ՐՏidx74;
                            var attr, i, k;
                            ՐՏitr73 = ՐՏ_Iterable(prop_keys.value ? [ "enumerable", "writable" ] : [ "enumerable", "configurable" ]);
                            for (ՐՏidx73 = 0; ՐՏidx73 < ՐՏitr73.length; ՐՏidx73++) {
                                attr = ՐՏitr73[ՐՏidx73];
                                output.indent();
                                output.print(attr);
                                output.colon();
                                output.print(prop_attrs[attr] || "true");
                                output.comma();
                                output.newline();
                            }
                            i = 0;
                            ՐՏitr74 = ՐՏ_Iterable(prop_keys);
                            for (ՐՏidx74 = 0; ՐՏidx74 < ՐՏitr74.length; ՐՏidx74++) {
                                k = ՐՏitr74[ՐՏidx74];
                                if (i) {
                                    output.comma();
                                    output.newline();
                                }
                                ++i;
                                output.indent();
                                output.print(k);
                                output.colon();
                                prop_keys[k](output);
                            }
                            output.newline();
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
        function with_class_vars_init(vars, def_prop) {
            return function(obj) {
                var output;
                output = this;
                output.with_parens(function() {
                    output.print("function()");
                    output.with_block(function() {
                        vars.forEach(function(v, i) {
                            output.indent();
                            output.assign("var " + v.name);
                            v.value(output);
                            output.end_statement();
                        });
                        output.indent();
                        def_prop.call(output, obj);
                    });
                });
                output.print("()");
            };
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
                ast.Node.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]", {
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
            var output, out;
            if (BUFFERS.len > 1) {
                throw new Error("Something went wrong, output generator didn't exit all of its scopes properly.");
            }
            output = this;
            if (BUFFERS[0].vars.length) {
                BUFFERS.unshift({
                    vars: [],
                    output: ""
                });
                endLocalBuffer();
            }
            out = BUFFERS[0].output;
            BUFFERS[0].output = "";
            if (options.private_scope) {
                output.with_parens(function() {
                    output.print("function()");
                    output.with_block(function() {
                        output.print('"use strict"');
                        output.end_statement();
                        output.print(out);
                    });
                });
                output.print("();");
                output.newline();
            } else {
                output.print(out);
            }
            return BUFFERS[BUFFERS.length-1].output;
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
        function endLocalBuffer(baselib) {
            baselib = baselib === void 0 ? false : baselib;
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
                force_semicolon();
                newline();
            }
            if (baselib) {
                BUFFERS[BUFFERS.length-1].output = localBuffer.output + BUFFERS[BUFFERS.length-1].output;
            } else {
                BUFFERS[BUFFERS.length-1].output += localBuffer.output;
            }
        }
        stack = [];
        baselibCache = {};
        function print_baselib(key) {
            var ՐՏ_177, ՐՏitr75, ՐՏidx75;
            var baselibAst, hash, data, item, key_, value;
            if (!options.omit_baselib) {
                if (!Object.keys(baselibCache).length) {
                    baselibAst = parser.parse(_baselib.BASELIB, {
                        readfile: null,
                        dropDocstrings: true,
                        filename: "_baselib.pyj"
                    });
                    hash = (ՐՏ_177 = baselibAst.body)[ՐՏ_177.length-1];
                    data = hash.body.properties;
                    ՐՏitr75 = ՐՏ_Iterable(data);
                    for (ՐՏidx75 = 0; ՐՏidx75 < ՐՏitr75.length; ՐՏidx75++) {
                        item = ՐՏitr75[ՐՏidx75];
                        key_ = item.key.value;
                        value = item.value.name ? [ item.value ] : item.value.body;
                        baselibCache[key_] = splatBaselib(key_, value);
                    }
                }
                baselibCache[key].print(this);
            }
            return null;
        }
        function import_(key) {
            if (!IMPORTED.hasOwnProperty(key)) {
                IMPORTED[key] = key;
                return true;
            }
            return false;
        }
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
            encode_string: encode_string,
            next_indent: next_indent,
            with_indent: with_indent,
            with_block: with_block,
            with_parens: with_parens,
            with_class_vars_init: with_class_vars_init,
            spaced: spaced,
            end_statement: end_statement,
            addProperty: addProperty,
            startLocalBuffer: startLocalBuffer,
            endLocalBuffer: endLocalBuffer,
            addProperties: addProperties,
            with_square: with_square,
            add_mapping: add_mapping,
            assign: assign_var,
            print_baselib: print_baselib,
            import: import_,
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
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:stream"];
    ՐՏ_mod.export("Stream", function(){return Stream;}, function(ՐՏ_v){if (typeof Stream !== "undefined") {Stream = ՐՏ_v;};});
    ՐՏ_mod.export("RAPYD_PREFIX", function(){return RAPYD_PREFIX;}, function(ՐՏ_v){if (typeof RAPYD_PREFIX !== "undefined") {RAPYD_PREFIX = ՐՏ_v;};});
    ՐՏ_mod.export("is_identifier_char", function(){return is_identifier_char;}, function(ՐՏ_v){if (typeof is_identifier_char !== "undefined") {is_identifier_char = ՐՏ_v;};});
    ՐՏ_mod.export("ast", function(){return ast;}, function(ՐՏ_v){if (typeof ast !== "undefined") {ast = ՐՏ_v;};});
    ՐՏ_mod.export("_baselib", function(){return _baselib;}, function(ՐՏ_v){if (typeof _baselib !== "undefined") {_baselib = ՐՏ_v;};});
    ՐՏ_mod.export("parser", function(){return parser;}, function(ՐՏ_v){if (typeof parser !== "undefined") {parser = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

ՐՏ_modules["ՐՏ:output"].body = function(){
    var __name__ = "output";

    var Stream;
    var noop = ՐՏ_modules["utils"].noop;var RAPYD_PREFIX = ՐՏ_modules["utils"].RAPYD_PREFIX;
    var PRECEDENCE = ՐՏ_modules["tokenizer"].PRECEDENCE;
    var stream = ՐՏ_modules["stream"];
    var ast = ՐՏ_modules["ast"];
    Stream = stream.Stream;
    (function() {
        var SPECIAL_METHODS, BASELIB, CREATION;
        SPECIAL_METHODS = {
            "bind": "ՐՏ_bind",
            "rebind_all": "ՐՏ_rebindAll",
            "bool": "!!",
            "float": "parseFloat",
            "int": "parseInt",
            "mixin": "ՐՏ_mixin",
            "merge": "ՐՏ_merge",
            "print": "ՐՏ_print",
            "eslice": "ՐՏ_eslice",
            "type": "ՐՏ_type"
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
                            var ՐՏitr76, ՐՏidx76;
                            var arg;
                            output.assign(tmp);
                            baseFn();
                            output.comma();
                            ՐՏitr76 = ՐՏ_Iterable(args);
                            for (ՐՏidx76 = 0; ՐՏidx76 < ՐՏitr76.length; ՐՏidx76++) {
                                arg = ՐՏitr76[ՐՏidx76];
                                if (!(ՐՏ_in(arg, [ null, void 0 ]))) {
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
            nodetype.prototype._codegen = generator;
        }
        ast.Node.prototype.print = function(stream, force_parens) {
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
        };
        ast.Node.prototype.print_to_string = function(options) {
            var s;
            s = Stream(options);
            this.print(s);
            return s.get();
        };
        ast.Node.prototype.add_comments = function(output) {
            var ՐՏitr77, ՐՏidx77;
            var c, self, start, comments;
            c = output.option("comments");
            self = this;
            if (c) {
                start = self.start;
                if (start && !start._comments_dumped) {
                    start._comments_dumped = true;
                    comments = start.comments_before;
                    if (self instanceof ast.Exit && self.value && self.value.start.comments_before && self.value.start.comments_before.length > 0) {
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
                    ՐՏitr77 = ՐՏ_Iterable(comments);
                    for (ՐՏidx77 = 0; ՐՏidx77 < ՐՏitr77.length; ՐՏidx77++) {
                        c = ՐՏitr77[ՐՏidx77];
                        if (c.subtype === "line") {
                            output.print("//" + c.value + "\n");
                            output.indent();
                        } else if (c.subtype === "multiline") {
                            output.print("/*" + c.value + "*/");
                            if (start.newline_before) {
                                output.print("\n");
                                output.indent();
                            } else {
                                output.space();
                            }
                        }
                    }
                }
            }
        };
        function PARENS(nodetype, func) {
            nodetype.prototype.needs_parens = func;
        }
        PARENS(ast.Node, function() {
            return false;
        });
        PARENS(ast.Function, function(output) {
            return first_in_statement(output);
        });
        PARENS(ast.ObjectLiteral, function(output) {
            return first_in_statement(output);
        });
        PARENS(ast.Unary, function(output) {
            var p;
            p = output.parent();
            return p instanceof ast.PropAccess && p.expression === this;
        });
        PARENS(ast.Seq, function(output) {
            var p;
            p = output.parent();
            return p instanceof ast.Unary || p instanceof ast.VarDef || p instanceof ast.Dot || p instanceof ast.ObjectProperty || p instanceof ast.Conditional;
        });
        PARENS(ast.Range, function(output) {
            return false;
        });
        PARENS(ast.Binary, function(output) {
            var p, po, pp, so, sp;
            p = output.parent();
            if (p instanceof ast.BaseCall && p.expression === this) {
                return true;
            }
            if (p instanceof ast.Unary) {
                return true;
            }
            if (p instanceof ast.PropAccess && p.expression === this) {
                return true;
            }
            if (p instanceof ast.Binary) {
                po = p.operator;
                pp = PRECEDENCE[po];
                so = this.operator;
                sp = PRECEDENCE[so];
                if (pp > sp || pp === sp && this === p.right && !(so === po && (so === "*" || so === "&&" || so === "||"))) {
                    return true;
                }
            }
        });
        PARENS(ast.PropAccess, function(output) {
            var p;
            p = output.parent();
            if (p instanceof ast.New && p.expression === this) {
                try {
                    this.walk(new ast.TreeWalker(function(node) {
                        if (node instanceof ast.BaseCall) {
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
        PARENS(ast.BaseCall, function(output) {
            var p;
            p = output.parent();
            return p instanceof ast.New && p.expression === this;
        });
        PARENS(ast.New, function(output) {
            var p;
            p = output.parent();
            if (no_constructor_parens(this, output) && (p instanceof ast.PropAccess || p instanceof ast.BaseCall && p.expression === this)) {
                return true;
            }
        });
        PARENS(ast.Yield, function(output) {
            return this.parens;
        });
        PARENS(ast.Number, function(output) {
            var p;
            p = output.parent();
            if (this.getValue() < 0 && p instanceof ast.PropAccess && p.expression === this) {
                return true;
            }
        });
        PARENS(ast.NotANumber, function(output) {
            var p;
            p = output.parent();
            if (p instanceof ast.PropAccess && p.expression === this) {
                return true;
            }
        });
        function assign_and_conditional_paren_rules(output) {
            var p;
            p = output.parent();
            if (p instanceof ast.Unary) {
                return true;
            }
            if (p instanceof ast.Binary && !(p instanceof ast.Assign)) {
                return true;
            }
            if (p instanceof ast.BaseCall && p.expression === this) {
                return true;
            }
            if (p instanceof ast.Conditional && p.condition === this) {
                return true;
            }
            if (p instanceof ast.PropAccess && p.expression === this) {
                return true;
            }
        }
        PARENS(ast.Assign, assign_and_conditional_paren_rules);
        PARENS(ast.Conditional, assign_and_conditional_paren_rules);
        DEFPRINT(ast.Directive, function(self, output) {
            output.print_string(self.value);
            output.semicolon();
        });
        DEFPRINT(ast.Debugger, function(self, output) {
            output.print("debugger");
            output.semicolon();
        });
        function display_body(body, is_toplevel, output, with_return) {
            var last;
            if (with_return) {
                output.indent();
                output.print("return");
                output.space();
                body[0].print(output);
                output.newline();
                return;
            }
            last = body.length - 1;
            body.forEach(function(stmt, i) {
                if (!(stmt instanceof ast.EmptyStatement) && !(stmt instanceof ast.Definitions)) {
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
            var ՐՏitr78, ՐՏidx78, ՐՏitr79, ՐՏidx79, ՐՏitr80, ՐՏidx80, ՐՏitr81, ՐՏidx81;
            var imports, nonlocalvars, name;
            function sort_imports(mod, imp_sorted, importing, done) {
                var imp_keys;
                if (mod.async) {
                    return imp_sorted;
                }
                imp_sorted = imp_sorted || [];
                importing = importing || {};
                done = done || {};
                function push_key(k) {
                    if (!done[k]) {
                        imp_sorted.push(k);
                        done[k] = true;
                    }
                }
                function sort_imp(a, b) {
                    a = module_.imports[a].import_order;
                    b = module_.imports[b].import_order;
                    return a < b ? -1 : a > b ? 1 : 0;
                }
                if (importing[mod.module_id] || done[mod.module_id]) {
                    return;
                }
                importing[mod.module_id] = true;
                imp_keys = Object.keys(mod.depends_on).sort(sort_imp);
                imp_keys.forEach(function(mod_id) {
                    var ՐՏ_178;
                    var pack_id;
                    pack_id = mod_id.split(".")[0];
                    if ((pack_id !== (ՐՏ_178 = mod.module_id) && (typeof pack_id !== "object" || !ՐՏ_eq(pack_id, ՐՏ_178)))) {
                        sort_imports(module_.imports[pack_id], imp_sorted, importing, done);
                        push_key(mod_id);
                    }
                });
                if (mod.submodules.length) {
                    mod.submodules.sort(sort_imp);
                    mod.submodules.forEach(function(sub_key) {
                        sort_imports(module_.imports[sub_key], imp_sorted, importing, done);
                        push_key(sub_key);
                    });
                    push_key(mod.module_id);
                }
                return imp_sorted;
            }
            imports = sort_imports(module_).map(function(mid) {
                return module_.imports[mid];
            });
            imports.push(module_.imports["__main__"]);
            if (imports.length > 1) {
                output.indent();
                output.spaced("var ՐՏ_modules", "=", "ՐՏ_def_modules();");
                output.newline();
            }
            nonlocalvars = {};
            ՐՏitr78 = ՐՏ_Iterable(imports);
            for (ՐՏidx78 = 0; ՐՏidx78 < ՐՏitr78.length; ՐՏidx78++) {
                module_ = ՐՏitr78[ՐՏidx78];
                if (module_.async) {
                    continue;
                }
                ՐՏitr79 = ՐՏ_Iterable(module_.nonlocalvars);
                for (ՐՏidx79 = 0; ՐՏidx79 < ՐՏitr79.length; ՐՏidx79++) {
                    name = ՐՏitr79[ՐՏidx79];
                    nonlocalvars[name] = true;
                }
            }
            nonlocalvars = Object.getOwnPropertyNames(nonlocalvars).join(", ");
            if (nonlocalvars.length) {
                output.indent();
                output.print("var " + nonlocalvars);
                output.end_statement();
            }
            ՐՏitr80 = ՐՏ_Iterable(imports);
            for (ՐՏidx80 = 0; ՐՏidx80 < ՐՏitr80.length; ՐՏidx80++) {
                module_ = ՐՏitr80[ՐՏidx80];
                if (module_.module_id !== "__main__") {
                    output.indent();
                    output.print('ՐՏ_modules.ՐՏ_def("' + module_.module_id + '")');
                    output.end_statement();
                }
            }
            ՐՏitr81 = ՐՏ_Iterable(imports);
            for (ՐՏidx81 = 0; ՐՏidx81 < ՐՏitr81.length; ՐՏidx81++) {
                module_ = ՐՏitr81[ՐՏidx81];
                if (!module_.async && module_.module_id !== "__main__") {
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
            var offset, needsSuper, delaySelfAssignment, arg, stmt, with_return;
            output.startLocalBuffer();
            offset = 0;
            needsSuper = false;
            delaySelfAssignment = false;
            if (output.option("es6") && node instanceof ast.Constructor && node.parent) {
                if (node.callsSuper) {
                    delaySelfAssignment = true;
                } else {
                    needsSuper = true;
                }
            }
            if ((node instanceof ast.Method || node instanceof ast.ObjectGetter || node instanceof ast.ObjectSetter) && !node.static) {
                ++offset;
                if (!delaySelfAssignment) {
                    if (needsSuper) {
                        output.indent();
                        output.print("super()");
                        output.end_statement();
                    }
                    output.indent();
                    output.spaced("var", node.argnames[0], "=", "this");
                    output.end_statement();
                }
            }
            if (node instanceof ast.Scope) {
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
            } else if (node instanceof ast.Except) {
                if (node.argname) {
                    output.indent();
                    output.print("var ");
                    output.assign(node.argname);
                    output.print("ՐՏ_Exception");
                    output.end_statement();
                }
            }
            stmt = node instanceof ast.Lambda && node.body.length === 1 && !node.body[0].start.newline_before && node.body[0] instanceof ast.SimpleStatement && node.body[0].body;
            with_return = stmt && (node.body[0].start.value === "(" || node.body[0].body instanceof ast.Array || node.body[0].body instanceof ast.ObjectLiteral || node.body[0].body instanceof ast.Dot || node.body[0].body instanceof ast.PropAccess);
            display_body(node.body, is_toplevel, output, with_return);
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
        function declare_submodules(module_id, submodules, output) {
            var ՐՏitr82, ՐՏidx82, ՐՏ_179;
            var seen, sub_module_id, key, sub_mod;
            seen = {};
            output.newline();
            ՐՏitr82 = ՐՏ_Iterable(submodules);
            for (ՐՏidx82 = 0; ՐՏidx82 < ՐՏitr82.length; ՐՏidx82++) {
                sub_module_id = ՐՏitr82[ՐՏidx82];
                if (!seen.hasOwnProperty(sub_module_id)) {
                    seen[sub_module_id] = true;
                    key = (ՐՏ_179 = sub_module_id.split("."))[ՐՏ_179.length-1];
                    output.indent();
                    sub_mod = 'ՐՏ_modules["' + sub_module_id + '"]';
                    output.print('ՐՏ_modules["ՐՏ:' + module_id + '"].export("' + key + '", function(){return ' + sub_mod + ';}, function(){throw new Error("use Object.defineProperty!");})');
                    output.end_statement();
                }
            }
        }
        function declare_exports(module_id, exports, output) {
            var ՐՏitr83, ՐՏidx83;
            var seen, rs_mod, symbol;
            output.newline();
            seen = {};
            output.indent();
            rs_mod = 'ՐՏ_modules["ՐՏ:' + module_id + '"]';
            output.print('var ՐՏ_mod = ՐՏ_modules["ՐՏ:' + module_id + '"]');
            output.end_statement();
            ՐՏitr83 = ՐՏ_Iterable(exports);
            for (ՐՏidx83 = 0; ՐՏidx83 < ՐՏitr83.length; ՐՏidx83++) {
                symbol = ՐՏitr83[ՐՏidx83];
                if (!seen[symbol.name]) {
                    seen[symbol.name] = true;
                    output.indent();
                    output.print('ՐՏ_mod.export("' + symbol.name + '", function(){return ' + symbol.name + ";}, function(ՐՏ_v){if (typeof " + symbol.name + ' !== "undefined") {' + symbol.name + " = ՐՏ_v;};})");
                    output.end_statement();
                }
            }
            output.indent();
            output.print('return ՐՏ_mod["exports"]');
            output.end_statement();
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
        function cacheBubble(operand, output) {
            var tmp;
            if (!(operand instanceof ast.SymbolRef || operand instanceof ast.SymbolClassRef)) {
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
        ast.StatementWithBody.prototype._do_print_body = function(output) {
            force_statement(this.body, output);
        };
        DEFPRINT(ast.Statement, function(self, output) {
            self.body.print(output);
            output.semicolon();
        });
        BASELIB = {};
        DEFPRINT(ast.TopLevel, function(self, output) {
            var is_main;
            is_main = output.is_main();
            BASELIB = self.baselib;
            if (output.option("private_scope") && is_main) {
                write_imports(self, output);
                output.newline();
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
            } else {
                if (is_main) {
                    write_imports(self, output);
                    write_main_name(output);
                }
                if (self.strict) {
                    declare_vars(self.localvars, output);
                }
                display_body(self.body, true, output);
            }
            if (is_main) {
                output.startLocalBuffer();
                Object.keys(BASELIB).filter(function(a) {
                    return self.baselib[a] > 0;
                }).forEach(function(key) {
                    output.print_baselib(key);
                });
                if (Object.keys(self.imports).length > 1) {
                    output.print_baselib("def_modules");
                }
                output.endLocalBuffer(true);
            }
        });
        function print_module(self, output) {
            output.newline();
            output.indent();
            output.assign('ՐՏ_modules["ՐՏ:' + self.module_id + '"].body');
            output.print("function()");
            output.with_block(function() {
                output.indent();
                output.assign("var __name__");
                output.print('"' + self.module_id + '"');
                output.end_statement();
                declare_submodules(self.module_id, self.submodules, output);
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
                declare_exports(self.module_id, self.exports, output);
            });
            output.end_statement();
        }
        DEFPRINT(ast.Splat, function(self, output) {
            if (output.import(self.module.name)) {
                display_body(self.body.body, true, output);
                output.newline();
            }
        });
        DEFPRINT(ast.Imports, function(container, output) {
            var ՐՏitr84, ՐՏidx84, ՐՏitr85, ՐՏidx85;
            var seen, i, self, argname, alias, bound_name;
            seen = {};
            i = 0;
            function add_aname(aname, key, from_import) {
                var ՐՏ_180;
                var seen_key, tmp;
                seen_key = key + (from_import ? "." + from_import : "");
                if (seen[aname]) {
                    if (((ՐՏ_180 = seen[aname]) === seen_key || typeof ՐՏ_180 === "object" && ՐՏ_eq(ՐՏ_180, seen_key))) {
                        return;
                    } else {
                        tmp = aname + " : " + [ seen[aname], seen_key ].join(", ");
                        throw new Error("Something went wrong, 2 imports with the same name detected: " + tmp);
                    }
                }
                seen[aname] = seen_key;
                if (i) {
                    output.newline();
                    output.indent();
                    ++i;
                }
                output.assign("var " + aname);
                output.print('ՐՏ_modules["' + key + '"]');
                if (from_import) {
                    output.print("." + from_import);
                }
                output.semicolon();
            }
            ՐՏitr84 = ՐՏ_Iterable(container.imports);
            for (ՐՏidx84 = 0; ՐՏidx84 < ՐՏitr84.length; ՐՏidx84++) {
                self = ՐՏitr84[ՐՏidx84];
                if (self instanceof ast.Splat) {
                    output.import(self.module.name);
                }
                if (self.argnames) {
                    ՐՏitr85 = ՐՏ_Iterable(self.argnames);
                    for (ՐՏidx85 = 0; ՐՏidx85 < ՐՏitr85.length; ՐՏidx85++) {
                        argname = ՐՏitr85[ՐՏidx85];
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
        DEFPRINT(ast.LabeledStatement, function(self, output) {
            self.label.print(output);
            output.colon();
            self.body.print(output);
        });
        DEFPRINT(ast.SimpleStatement, function(self, output) {
            if (!(self.body instanceof ast.EmptyStatement)) {
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
        DEFPRINT(ast.BlockStatement, function(self, output) {
            print_bracketed(self, output);
        });
        DEFPRINT(ast.EmptyStatement, function(self, output) {
        });
        DEFPRINT(ast.Do, function(self, output) {
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
        DEFPRINT(ast.While, function(self, output) {
            output.print("while");
            output.space();
            output.with_parens(function() {
                self.condition.print(output);
            });
            output.space();
            self._do_print_body(output);
        });
        function is_simple_for_in(self) {
            if (self.object instanceof ast.BaseCall && self.object.expression instanceof ast.SymbolRef && self.object.expression.name === "dir" && self.object.args.length === 1) {
                return true;
            }
            return false;
        }
        function is_simple_for(self) {
            var ՐՏ_181, ՐՏ_182, ՐՏ_183, ՐՏ_184;
            if (self.object instanceof ast.BaseCall && self.object.expression instanceof ast.SymbolRef && self.object.expression.name === "range" && !(self.init instanceof ast.Array) && (self.object.args.length < 3 || (ՐՏ_181 = self.object.args)[ՐՏ_181.length-1][0] instanceof ast.Number || (ՐՏ_182 = self.object.args)[ՐՏ_182.length-1][0] instanceof ast.Unary && (ՐՏ_183 = self.object.args)[ՐՏ_183.length-1][0].operator === "-" && (ՐՏ_184 = self.object.args)[ՐՏ_184.length-1][0].expression instanceof ast.Number)) {
                return true;
            }
            return false;
        }
        ast.ForIn.prototype._do_print_body = function(output) {
            var self;
            self = this;
            output.with_block(function() {
                var iterator, index, unpack;
                if (!(is_simple_for(self) || is_simple_for_in(self))) {
                    output.indent();
                    iterator = output.prevTemp("itr");
                    index = output.prevTemp("idx");
                    if (self.init instanceof ast.Array) {
                        if (output.option("es6")) {
                            output.with_square(function() {
                                self.init.elements.forEach(function(element, index) {
                                    if (index) {
                                        output.comma();
                                    }
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
        };
        DEFPRINT(ast.ForIn, function(self, output) {
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
                    increment instanceof ast.Unary ? output.print(">") : output.print("<");
                    output.space();
                    end.print(output);
                    output.semicolon();
                    output.space();
                    self.init.print(output);
                    if (increment && (!(increment instanceof ast.Unary) || increment.expression.value !== "1")) {
                        if (increment instanceof ast.Unary) {
                            output.print("-=");
                            increment.expression.print(output);
                        } else {
                            output.print("+=");
                            increment.print(output);
                        }
                    } else {
                        if (increment instanceof ast.Unary) {
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
        ast.ForJS.prototype._do_print_body = function(output) {
            var self;
            self = this;
            output.with_block(function() {
                self.body.body.forEach(function(stmt, i) {
                    output.indent();
                    stmt.print(output);
                    output.newline();
                });
            });
        };
        DEFPRINT(ast.ForJS, function(self, output) {
            output.print("for");
            output.space();
            output.with_parens(function() {
                self.condition.print(output);
            });
            output.space();
            self._do_print_body(output);
        });
        DEFPRINT(ast.ListComprehension, function(self, output) {
            var constructor, iterator, index, result, add_entry;
            constructor = {
                ListComprehension: "[]",
                DictComprehension: "{}"
            }[ՐՏ_type(self)];
            iterator = output.newTemp("itr", false);
            index = output.newTemp("idx", false);
            result = RAPYD_PREFIX + "res";
            if (self instanceof ast.DictComprehension) {
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
                    if (self.init instanceof ast.Array) {
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
                        if (self.init instanceof ast.Array) {
                            if (output.option("es6")) {
                                output.with_square(function() {
                                    self.init.elements.forEach(function(element, index) {
                                        if (index) {
                                            output.comma();
                                        }
                                        element.print(output);
                                    });
                                });
                                output.space();
                                output.print("=");
                                output.space();
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
        DEFPRINT(ast.With, function(self, output) {
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
        ast.Lambda.prototype._do_print = function(output) {
            var ՐՏ_185;
            var self, name, is_like_method;
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
            is_like_method = self instanceof ast.Method || self instanceof ast.ObjectGetter || self instanceof ast.ObjectSetter;
            if (self.name && !is_like_method) {
                name = "var " + self.name.name;
            }
            function maybe_weird_name(internalsub) {
                var name;
                if (self.name && (self.name.js_reserved || ՐՏ_in(self.name.start.type, [ "string", "num" ]))) {
                    name = self.name.name;
                    return function() {
                        output.print("ՐՏ_with__name__");
                        output.with_parens(function() {
                            internalsub(false);
                            output.comma();
                            output.print_string(name);
                        });
                    };
                } else {
                    return internalsub;
                }
            }
            
            
            var internalsub = (ՐՏ_185 = function internalsub(print_name) {
                print_name = print_name === void 0 ? true : print_name;
                output.print("function");
                if (self.generator) {
                    output.print("*");
                }
                if (print_name && self.name) {
                    output.space();
                    self.name.print(output);
                }
                output.with_parens(function() {
                    self.argnames.forEach(function(arg, i) {
                        if (is_like_method) {
                            if (i === 0) {
                                return;
                            }
                            --i;
                        }
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
            }, ՐՏ_185 = unify(output, name, addDecorators(), addDocstring())(maybe_weird_name(ՐՏ_185)), ՐՏ_185);
            internalsub();
        };
        DEFPRINT(ast.Lambda, function(self, output) {
            self._do_print(output);
        });
        ast.Class.prototype._do_print = function(output) {
            var self, name, generateClass;
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
            function getES6DecoratedMethods() {
                var ՐՏitr86, ՐՏidx86;
                var decorated_methods, stmt;
                decorated_methods = [];
                ՐՏitr86 = ՐՏ_Iterable(self.body);
                for (ՐՏidx86 = 0; ՐՏidx86 < ՐՏitr86.length; ՐՏidx86++) {
                    stmt = ՐՏitr86[ՐՏidx86];
                    if (stmt instanceof ast.Lambda && stmt.decorators && stmt.decorators.length) {
                        decorated_methods.push(stmt);
                    }
                }
                if (decorated_methods.length) {
                    return decorated_methods;
                }
                return null;
            }
            name = null;
            if (self.name) {
                name = "var " + self.name.name;
            }
            function outputEs6() {
                var ՐՏ_186;
                function addClassVariablesAndMethDecorators(decorated_methods) {
                    var properties, class_vars, def_class_vars_and_decorators;
                    properties = {};
                    class_vars = [];
                    if (self.docstring) {
                        properties["__doc__"] = function(output) {
                            output.print_string(self.docstring);
                        };
                    }
                    self.body.forEach(function(stmt, i) {
                        if (stmt instanceof ast.SimpleStatement && stmt.body instanceof ast.Assign && stmt.body.operator === "=") {
                            properties[stmt.body.left.name] = function(output) {
                                output.print(stmt.body.left.name);
                                output.newline();
                            };
                            class_vars.push({
                                name: stmt.body.left.name,
                                value: function(output) {
                                    stmt.body.right.print(output);
                                }
                            });
                        }
                    });
                    if (Object.keys(properties).length || decorated_methods && decorated_methods.length) {
                        def_class_vars_and_decorators = function(obj) {
                            var ՐՏitr87, ՐՏidx87;
                            var output, static_decorations, stmt, decoration;
                            output = this;
                            static_decorations = {};
                            if (decorated_methods) {
                                ՐՏitr87 = ՐՏ_Iterable(decorated_methods);
                                for (ՐՏidx87 = 0; ՐՏidx87 < ՐՏitr87.length; ՐՏidx87++) {
                                    stmt = ՐՏitr87[ՐՏidx87];
                                    function print_name(output, stmt_) {
                                        var pref;
                                        pref = obj + (stmt_.static ? "" : ".prototype");
                                        output.print(pref);
                                        if (ՐՏ_in(stmt_.name.start.type, [ "string", "num" ])) {
                                            output.with_square(function() {
                                                stmt_.name.print(output);
                                            });
                                        } else {
                                            output.print("." + stmt_.name.name);
                                        }
                                    }
                                    decoration = {
                                        "value": function(_stmt) {
                                            return function(output) {
                                                decorate(_stmt.decorators, output, function() {
                                                    print_name(output, _stmt);
                                                });
                                            };
                                        }(stmt),
                                        "attrs": {
                                            "enumerable": "false"
                                        },
                                        "name": stmt.name
                                    };
                                    if (stmt.static) {
                                        static_decorations[stmt.name.name] = decoration;
                                    } else {
                                        properties[stmt.name.name] = decoration;
                                    }
                                }
                            }
                            if (Object.keys(properties).length) {
                                output.addProperties("prototype", properties).call(output, obj);
                                output.end_statement();
                            }
                            if (Object.keys(static_decorations).length) {
                                output.indent();
                                output.addProperties(null, static_decorations).call(output, obj);
                                output.end_statement();
                            }
                        };
                        def_class_vars_and_decorators = output.with_class_vars_init(class_vars, def_class_vars_and_decorators);
                        return def_class_vars_and_decorators;
                    }
                    return null;
                }
                
                var generateClass = (ՐՏ_186 = function generateClass() {
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
                            if (stmt instanceof ast.Lambda) {
                                output.indent();
                                stmt.add_comments(output);
                                if (stmt.static) {
                                    output.print("static");
                                    output.space();
                                }
                                if (stmt.name.name === "__init__") {
                                    output.print("constructor");
                                } else {
                                    if (stmt instanceof ast.ObjectGetter) {
                                        output.print("get ");
                                    } else if (stmt instanceof ast.ObjectSetter) {
                                        output.print("set ");
                                    } else if (stmt.generator) {
                                        output.print("*");
                                    }
                                    stmt.name.print(output);
                                }
                                output.space();
                                output.with_parens(function() {
                                    stmt.argnames.forEach(function(arg, i) {
                                        if (ՐՏ_in(stmt.name.name, self.static)) {
                                            ++i;
                                        }
                                        if (i > 1) {
                                            output.comma();
                                        }
                                        if (i) {
                                            arg.print(output);
                                        }
                                        if (stmt.argnames.defaults[arg.name]) {
                                            output.print("=");
                                            stmt.argnames.defaults[arg.name].print(output);
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
                }, ՐՏ_186 = unify(output, name, addDecorators(), addClassVariablesAndMethDecorators(getES6DecoratedMethods()))(ՐՏ_186), ՐՏ_186);
                return generateClass;
            }
            function outputEs5() {
                var ՐՏupk10, ՐՏ_187;
                var methodsAndVars, staticmethods;
                function define_method(stmt) {
                    return function(output) {
                        var name, fn_def, internalsub;
                        name = stmt.name.name;
                        function internalsub(print_meth_name) {
                            print_meth_name = print_meth_name === void 0 ? true : print_meth_name;
                            output.print("function");
                            if (print_meth_name) {
                                output.space();
                                output.print(name);
                            }
                            output.with_parens(function() {
                                stmt.argnames.forEach(function(arg, i) {
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
                        if (stmt.name.js_reserved || ՐՏ_in(stmt.name.start.type, [ "string", "num" ])) {
                            fn_def = internalsub;
                            internalsub = function() {
                                output.print("ՐՏ_with__name__");
                                output.with_parens(function() {
                                    fn_def(false);
                                    output.comma();
                                    output.print_string(name);
                                });
                            };
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
                    var methodsAndVars, staticMethods, class_vars, methodAndOutput, methodAndVarOutput, staticMethodOutput;
                    methodsAndVars = {};
                    staticMethods = {};
                    class_vars = [];
                    if (self.docstring) {
                        methodsAndVars["__doc__"] = function(output) {
                            output.print_string(self.docstring);
                        };
                    }
                    self.body.forEach(function(stmt, i) {
                        var meth_hash;
                        if (stmt instanceof ast.Method) {
                            meth_hash = stmt.static ? staticMethods : methodsAndVars;
                            meth_hash[stmt.name.name] = {
                                value: define_method(stmt),
                                name: stmt.name
                            };
                        } else if (stmt instanceof ast.SimpleStatement && stmt.body instanceof ast.Assign && stmt.body.operator === "=") {
                            methodsAndVars[stmt.body.left.name] = function(output) {
                                output.print(stmt.body.left.name);
                            };
                            class_vars.push({
                                name: stmt.body.left.name,
                                value: function(output) {
                                    stmt.body.right.print(output);
                                }
                            });
                        } else if (stmt instanceof ast.Class) {
                            console.error("Nested classes aren't supported yet");
                        }
                    });
                    methodAndOutput = null;
                    if (Object.keys(methodsAndVars).length) {
                        methodAndVarOutput = output.addProperties("prototype", methodsAndVars);
                        if (class_vars.length) {
                            methodAndVarOutput = output.with_class_vars_init(class_vars, methodAndVarOutput);
                        }
                    }
                    staticMethodOutput = null;
                    if (Object.keys(staticMethods).length) {
                        staticMethodOutput = output.addProperties(null, staticMethods);
                    }
                    return [methodAndVarOutput, staticMethodOutput];
                }
                ՐՏupk10 = addMethods();
                methodsAndVars = ՐՏupk10[0];
                staticmethods = ՐՏupk10[1];
                
                var generateClass = (ՐՏ_187 = function generateClass() {
                    if (self.init || self.parent || self.statements.length) {
                        output.print("function");
                        output.space();
                        self.name.print(output);
                        output.print("()");
                        output.space();
                        output.with_block(function() {
                            var cname;
                            bind_methods(self.bound, output);
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
                }, ՐՏ_187 = unify(output, name, addInheritance(), addDecorators(), methodsAndVars, staticmethods)(ՐՏ_187), ՐՏ_187);
                return generateClass;
            }
            if (output.option("es6")) {
                generateClass = outputEs6();
            } else {
                generateClass = outputEs5();
            }
            generateClass();
        };
        DEFPRINT(ast.Class, function(self, output) {
            self._do_print(output);
        });
        DEFPRINT(ast.SymbolClassRef, function(self, output) {
            self.class.print(output);
            output.print(".prototype." + self.name);
        });
        ast.Exit.prototype._do_print = function(output, kind) {
            var self;
            self = this;
            output.print(kind);
            if (self.value) {
                output.space();
                self.value.print(output);
            }
            if (!self.yield_request) {
                output.semicolon();
            }
        };
        DEFPRINT(ast.Return, function(self, output) {
            self._do_print(output, "return");
        });
        DEFPRINT(ast.Yield, function(self, output) {
            var kind;
            kind = "yield";
            if (self.yield_from) {
                kind = "yield*";
            }
            self._do_print(output, kind);
        });
        DEFPRINT(ast.Throw, function(self, output) {
            self._do_print(output, "throw");
        });
        ast.LoopControl.prototype._do_print = function(output, kind) {
            output.print(kind);
            if (this.label) {
                output.space();
                this.label.print(output);
            }
            output.semicolon();
        };
        DEFPRINT(ast.Break, function(self, output) {
            self._do_print(output, "break");
        });
        DEFPRINT(ast.Continue, function(self, output) {
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
            body = self.body;
            while (true) {
                if (body instanceof ast.If) {
                    if (!body.alternative) {
                        make_block(self.body, output);
                        return;
                    }
                    body = body.alternative;
                } else if (body instanceof ast.StatementWithBody) {
                    body = body.body;
                } else {
                    break;
                }
            }
            force_statement(self.body, output);
        }
        DEFPRINT(ast.If, function(self, output) {
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
        DEFPRINT(ast.Switch, function(self, output) {
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
        ast.SwitchBranch.prototype._do_print_body = function(output) {
            if (this.body.length > 0) {
                output.newline();
                this.body.forEach(function(stmt) {
                    output.indent();
                    stmt.print(output);
                    output.newline();
                });
            }
        };
        DEFPRINT(ast.Default, function(self, output) {
            output.print("default:");
            self._do_print_body(output);
        });
        DEFPRINT(ast.Case, function(self, output) {
            output.print("case");
            output.space();
            self.expression.print(output);
            output.print(":");
            self._do_print_body(output);
        });
        DEFPRINT(ast.Try, function(self, output) {
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
        DEFPRINT(ast.Catch, function(self, output) {
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
        DEFPRINT(ast.Finally, function(self, output) {
            output.print("finally");
            output.space();
            print_bracketed(self, output);
        });
        ast.Definitions.prototype._do_print = function(output, kind) {
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
            in_for = p instanceof ast.ForIn;
            avoid_semicolon = in_for && p.init === this;
            if (!avoid_semicolon) {
                output.semicolon();
            }
        };
        DEFPRINT(ast.Var, function(self, output) {
            self._do_print(output, "var");
        });
        DEFPRINT(ast.Const, function(self, output) {
            self._do_print(output, "const");
        });
        function parenthesize_for_noin(node, output, noin) {
            if (!noin) {
                node.print(output);
            } else {
                try {
                    node.walk(new ast.TreeWalker(function(node) {
                        if (node instanceof ast.Binary && node.operator === "in") {
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
        DEFPRINT(ast.VarDef, function(self, output) {
            self.name.print(output);
            if (self.value) {
                output.assign("");
                parenthesize_for_noin(self.value, output, output.parent(1) instanceof ast.ForIn);
            }
        });
        CREATION = [];
        DEFPRINT(ast.BaseCall, function(self, output) {
            var selfArg, object, has_kwarg_items, has_kwarg_formals, has_kwargs, obj, output_kwargs;
            selfArg = null;
            function call_format() {
                var rename;
                if (self instanceof ast.ClassCall) {
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
            if (self instanceof ast.New) {
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
                obj = self instanceof ast.New ? object : self.expression.expression ? self.expression.expression : new ast.This();
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
                    if (self instanceof ast.New) {
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
                            var ՐՏ_188;
                            if (self.args.length > 1) {
                                (ՐՏ_188 = self.args)[ՐՏ_188.length-1].print(output);
                                if (has_kwargs) {
                                    output.comma();
                                }
                            }
                            output_kwargs();
                        });
                    }
                });
            } else if (has_kwargs && (self instanceof ast.New || self.expression && self.expression.expression)) {
                output.print(".call");
                output.with_parens(function() {
                    var ՐՏitr88, ՐՏidx88;
                    var arg;
                    obj.print(output);
                    ՐՏitr88 = ՐՏ_Iterable(self.args);
                    for (ՐՏidx88 = 0; ՐՏidx88 < ՐՏitr88.length; ՐՏidx88++) {
                        arg = ՐՏitr88[ՐՏidx88];
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
            if (output.option("es6") && (self instanceof ast.ClassCall && self.super || self instanceof ast.Call && self.expression.name === "super")) {
                output.end_statement();
                output.indent();
                output.spaced("var", selfArg || self.expression.selfArg, "=", "this");
            }
        });
        DEFPRINT(ast.New, function(self, output) {
            output.print("new");
            output.space();
            ast.BaseCall.prototype._codegen(self, output);
        });
        ast.Seq.prototype._do_print = function(output) {
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
            if (p instanceof ast.Binary || p instanceof ast.Return || p instanceof ast.Yield && !p.yield_request || p instanceof ast.Array || p instanceof ast.BaseCall || p instanceof ast.SimpleStatement) {
                output.with_square(print_seq);
            } else {
                print_seq();
            }
        };
        DEFPRINT(ast.Seq, function(self, output) {
            self._do_print(output);
        });
        DEFPRINT(ast.Dot, function(self, output) {
            var expr;
            expr = self.expression;
            expr.print(output);
            if (expr instanceof ast.Number && expr.getValue() >= 0) {
                if (!/[xa-f.]/i.test(output.last())) {
                    output.print(".");
                }
            }
            output.print(".");
            output.add_mapping(self.end);
            output.print_name(self.property);
        });
        DEFPRINT(ast.Sub, function(self, output) {
            var is_neg, exp_print, tmp;
            is_neg = self.property instanceof ast.Unary && self.property.operator === "-" && self.property.expression instanceof ast.Number;
            if (self.expression instanceof ast.SymbolRef || self.expression instanceof ast.This) {
                self.expression.print(output);
                exp_print = function() {
                    self.expression.print(output);
                };
            } else if (is_neg) {
                tmp = null;
                output.with_parens(function() {
                    tmp = output.newTemp();
                    output.assign(tmp);
                    self.expression.print(output);
                });
                exp_print = function() {
                    output.print(tmp);
                };
            } else {
                self.expression.print(output);
            }
            output.print("[");
            if (is_neg) {
                exp_print();
                output.print(".length");
            }
            self.property.print(output);
            output.print("]");
        });
        DEFPRINT(ast.Slice, function(self, output) {
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
        DEFPRINT(ast.UnaryPrefix, function(self, output) {
            var op;
            op = self.operator;
            if (op === "*") {
                if (output.option("es6")) {
                    op = "...";
                } else {
                    op = "";
                }
            }
            output.print(op);
            if (/^[a-z]/i.test(op)) {
                output.space();
            }
            self.expression.print(output);
        });
        DEFPRINT(ast.UnaryPostfix, function(self, output) {
            self.expression.print(output);
            output.print(self.operator);
        });
        DEFPRINT(ast.Binary, function(self, output) {
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
            } else if (comparators[self.operator] && self.left instanceof ast.Binary && comparators[self.left.operator]) {
                operator = normalize(self.operator);
                if (self.left.right instanceof ast.Symbol) {
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
        DEFPRINT(ast.DeepEquality, function(self, output) {
            var primitives;
            primitives = [ "Boolean", "String", "Number" ];
            if (ՐՏ_in(self.left.computedType, primitives) || ՐՏ_in(self.right.computedType, primitives)) {
                self.left.print(output);
                output.space();
                self.operator === "==" ? output.print("===") : output.print("!==");
                output.space();
                self.right.print(output);
            } else {
                output.with_parens(function() {
                    var left, right;
                    left = cacheBubble(self.left, output);
                    if (self.operator === "==") {
                        output.space();
                        output.spaced("===");
                        output.space();
                        right = cacheBubble(self.right, output);
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
                        right = cacheBubble(self.right, output);
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
        DEFPRINT(ast.Assign, function(self, output) {
            if (self.right instanceof ast.Number && self.right.value === 1 && ՐՏ_in(self.operator, [ "+=", "-=" ])) {
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
                if (self.left instanceof ast.Array) {
                    if (output.option("es6")) {
                        output.with_square(function() {
                            self.left.elements.forEach(function(element, index) {
                                if (index) {
                                    output.comma();
                                }
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
                if (self.right instanceof ast.New) {
                    CREATION.push(self.left);
                }
                self.right.print(output);
                if (self.left instanceof ast.Array) {
                    if (!output.option("es6")) {
                        output.end_statement();
                        unpack_tuple(self.left, output, true);
                    }
                }
            }
        });
        DEFPRINT(ast.Conditional, function(self, output) {
            self.condition.print(output);
            output.space();
            output.print("?");
            output.space();
            self.consequent.print(output);
            output.space();
            output.colon();
            self.alternative.print(output);
        });
        DEFPRINT(ast.Array, function(self, output) {
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
        DEFPRINT(ast.Range, function(self, output) {
            var ՐՏitr89, ՐՏidx89;
            var indexes, element, start, end, step;
            indexes = [];
            ՐՏitr89 = ՐՏ_Iterable([ self.left, self.right ]);
            for (ՐՏidx89 = 0; ՐՏidx89 < ՐՏitr89.length; ՐՏidx89++) {
                element = ՐՏitr89[ՐՏidx89];
                if (element instanceof ast.UnaryPrefix && element.operator === "-" && element.expression instanceof ast.Number) {
                    indexes.push(parseFloat("-" + element.expression.value));
                } else if (element instanceof ast.Number) {
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
                    var ՐՏitr90, ՐՏidx90;
                    var i;
                    ՐՏitr90 = ՐՏ_Iterable(range(start, end, step));
                    for (ՐՏidx90 = 0; ՐՏidx90 < ՐՏitr90.length; ՐՏidx90++) {
                        i = ՐՏitr90[ՐՏidx90];
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
        DEFPRINT(ast.ObjectLiteral, function(self, output) {
            var ՐՏitr91, ՐՏidx91, ՐՏ_189;
            var properties, p, v, key, v_key, h_, props, add_props;
            if (self.properties.length > 0) {
                properties = {};
                ՐՏitr91 = ՐՏ_Iterable(self.properties);
                for (ՐՏidx91 = 0; ՐՏidx91 < ՐՏitr91.length; ՐՏidx91++) {
                    p = ՐՏitr91[ՐՏidx91];
                    v = p.value;
                    key = p.key;
                    if (v_key = v instanceof ast.ObjectGetter ? "get" : v instanceof ast.ObjectSetter ? "set" : false) {
                        h_ = function(v) {
                            return function(output) {
                                v.print(output);
                            };
                        };
                        if (!(props = properties[key.name])) {
                            props = properties[key.name] = {
                                "name": key,
                                "attrs": {
                                    "enumerable": "true"
                                }
                            };
                        }
                        props[v_key] = h_(v);
                    }
                }
                add_props = null;
                if (Object.keys(properties).length) {
                    add_props = function(obj) {
                        output.addProperties(null, properties).call(output, obj);
                        output.end_statement();
                    };
                    add_props = output.with_class_vars_init([], add_props);
                }
                
                var inner = (ՐՏ_189 = function inner() {
                    output.with_block(function() {
                        var j;
                        j = 0;
                        self.properties.forEach(function(prop, i) {
                            if (!(prop.value instanceof ast.ObjectGetter || prop.value instanceof ast.ObjectSetter)) {
                                if (j) {
                                    output.print(",");
                                    output.newline();
                                }
                                ++j;
                                output.indent();
                                prop.print(output);
                            }
                        });
                        output.newline();
                    });
                }, ՐՏ_189 = unify(output, null, add_props)(ՐՏ_189), ՐՏ_189);
                inner();
            } else {
                output.print("{}");
            }
        });
        DEFPRINT(ast.ObjectKeyVal, function(self, output) {
            if (self.key instanceof ast.Identifier || self.key instanceof ast.String || self.key instanceof ast.Number || self.key instanceof ast.Boolean || self.key instanceof ast.SymbolDefun) {
                self.key.print(output);
            } else {
                output.with_square(function() {
                    self.key.print(output);
                });
            }
            output.colon();
            self.value.print(output);
        });
        ast.Symbol.prototype.definition = function() {
            return this.thedef;
        };
        DEFPRINT(ast.Symbol, function(self, output) {
            var def_;
            if (self.start && self.start.type === "string") {
                output.print_string(self.name);
                return;
            }
            def_ = self.definition();
            output.print_name(def_ ? def_.mangled_name || def_.name : self.name);
        });
        DEFPRINT(ast.Undefined, function(self, output) {
            output.print("void 0");
        });
        DEFPRINT(ast.Hole, noop);
        DEFPRINT(ast.Infinity, function(self, output) {
            output.print("1/0");
        });
        DEFPRINT(ast.NotANumber, function(self, output) {
            output.print("0/0");
        });
        DEFPRINT(ast.This, function(self, output) {
            output.print("this");
        });
        DEFPRINT(ast.Constant, function(self, output) {
            output.print(self.getValue());
        });
        DEFPRINT(ast.String, function(self, output) {
            if (ՐՏ_in(self.modifier, "fF")) {
                output.print("`");
                output.print_string(self.getValue(), false);
                output.print("`");
            } else {
                output.print_string(self.getValue());
            }
        });
        DEFPRINT(ast.Verbatim, function(self, output) {
            output.print(self.getValue());
        });
        DEFPRINT(ast.Number, function(self, output) {
            output.print(make_num(self.getValue()));
        });
        DEFPRINT(ast.RegExp, function(self, output) {
            var str_, p;
            str_ = self.getValue().toString();
            if (output.option("ascii_only")) {
                str_ = output.to_ascii(str_);
            }
            output.print(str_);
            p = output.parent();
            if (p instanceof ast.Binary && /^in/.test(p.operator) && p.left === self) {
                output.print(" ");
            }
        });
        function force_statement(stat, output) {
            if (output.option("bracketize")) {
                if (!stat || stat instanceof ast.EmptyStatement) {
                    output.print("{}");
                } else if (stat instanceof ast.BlockStatement) {
                    stat.print(output);
                } else {
                    output.with_block(function() {
                        output.indent();
                        stat.print(output);
                        output.newline();
                    });
                }
            } else {
                if (!stat || stat instanceof ast.EmptyStatement) {
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
                if (prev instanceof ast.Statement && prev.body === node) {
                    return true;
                }
                if (prev instanceof ast.Seq && prev.car === node || prev instanceof ast.BaseCall && prev.expression === node || prev instanceof ast.Dot && prev.expression === node || prev instanceof ast.Sub && prev.expression === node || prev instanceof ast.Conditional && prev.condition === node || prev instanceof ast.Binary && prev.left === node || prev instanceof ast.UnaryPostfix && prev.expression === node) {
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
            if (stmt instanceof ast.BlockStatement) {
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
            nodetype.prototype.add_source_map = function(stream) {
                generator(this, stream);
            };
        }
        DEFMAP(ast.Node, noop);
        function basic_sourcemap_gen(self, output) {
            output.add_mapping(self.start);
        }
        DEFMAP(ast.Directive, basic_sourcemap_gen);
        DEFMAP(ast.Debugger, basic_sourcemap_gen);
        DEFMAP(ast.Symbol, basic_sourcemap_gen);
        DEFMAP(ast.Jump, basic_sourcemap_gen);
        DEFMAP(ast.StatementWithBody, basic_sourcemap_gen);
        DEFMAP(ast.LabeledStatement, noop);
        DEFMAP(ast.Lambda, basic_sourcemap_gen);
        DEFMAP(ast.Switch, basic_sourcemap_gen);
        DEFMAP(ast.SwitchBranch, basic_sourcemap_gen);
        DEFMAP(ast.BlockStatement, basic_sourcemap_gen);
        DEFMAP(ast.TopLevel, noop);
        DEFMAP(ast.New, basic_sourcemap_gen);
        DEFMAP(ast.Try, basic_sourcemap_gen);
        DEFMAP(ast.Catch, basic_sourcemap_gen);
        DEFMAP(ast.Finally, basic_sourcemap_gen);
        DEFMAP(ast.Definitions, basic_sourcemap_gen);
        DEFMAP(ast.Constant, basic_sourcemap_gen);
        DEFMAP(ast.ObjectProperty, function(self, output) {
            output.add_mapping(self.start, self.key);
        });
    })();
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:output"];
    ՐՏ_mod.export("Stream", function(){return Stream;}, function(ՐՏ_v){if (typeof Stream !== "undefined") {Stream = ՐՏ_v;};});
    ՐՏ_mod.export("RAPYD_PREFIX", function(){return RAPYD_PREFIX;}, function(ՐՏ_v){if (typeof RAPYD_PREFIX !== "undefined") {RAPYD_PREFIX = ՐՏ_v;};});
    ՐՏ_mod.export("PRECEDENCE", function(){return PRECEDENCE;}, function(ՐՏ_v){if (typeof PRECEDENCE !== "undefined") {PRECEDENCE = ՐՏ_v;};});
    ՐՏ_mod.export("stream", function(){return stream;}, function(ՐՏ_v){if (typeof stream !== "undefined") {stream = ՐՏ_v;};});
    ՐՏ_mod.export("ast", function(){return ast;}, function(ՐՏ_v){if (typeof ast !== "undefined") {ast = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};
var browser_env, exports, rapydscript, compile;
var utils = ՐՏ_modules["utils"];
var ast = ՐՏ_modules["ast"];
var tokenizer = ՐՏ_modules["tokenizer"];
var parser = ՐՏ_modules["parser"];
var output = ՐՏ_modules["output"];
ast.Node.warn_function = function(txt) {
    console.error(txt);
};
function splatBaselib(key, value) {
    return new ast.Splat({
        module: new ast.SymbolVar({
            name: key
        }),
        body: new ast.TopLevel({
            start: value[0].start,
            body: value,
            strict: true,
            end: value[value.length-1].end
        })
    });
}
browser_env = !exports;
if (browser_env) {
    rapydscript = exports = {};
}
exports.parse_baselib = exports.parseBaselib = function(srcPath, es6) {
    var ՐՏ_190, ՐՏitr92, ՐՏidx92;
    var fs, baselibPath, baselibAst, hash, data, baselibList, item, key, value;
    try {
        fs = require("fs");
        baselibPath = require("path").join(srcPath, "baselib.pyj");
        baselibAst = parser.parse(fs.readFileSync(baselibPath, "utf8"), {
            readfile: fs.readFileSync,
            dropDocstrings: true,
            filename: "baselib.pyj",
            es6: es6
        });
    } catch (ՐՏ_Exception) {
        var e = ՐՏ_Exception;
        if (e.code === "ENOENT") {
            throw "Failed to localte baselib module.";
        } else {
            throw ՐՏ_Exception;
        }
    }
    hash = (ՐՏ_190 = baselibAst.body)[ՐՏ_190.length-1];
    data = hash.body.properties;
    baselibList = {};
    ՐՏitr92 = ՐՏ_Iterable(data);
    for (ՐՏidx92 = 0; ՐՏidx92 < ՐՏitr92.length; ՐՏidx92++) {
        item = ՐՏitr92[ՐՏidx92];
        key = item.key.value;
        value = item.value.name ? [ item.value ] : item.value.body;
        baselibList[key] = splatBaselib(key, value);
    }
    return baselibList;
};
exports.get_import_dirs = function(paths_string, ignore_env) {
    var paths, path;
    paths = [];
    path = require("path");
    function merge(new_path) {
        if (!(ՐՏ_in(new_path, paths))) {
            paths.push(new_path);
        }
    }
    if (!ignore_env && process && process.env && process.env.RAPYDSCRIPT_PATH) {
        process.env.RAPYDSCRIPT_PATH.split(path.delimiter).forEach(merge);
    }
    if (paths_string) {
        paths_string.split(path.delimiter).forEach(merge);
    }
    return paths;
};
exports.compile = compile = function(code, options) {
    var ՐՏitr93, ՐՏidx93, ՐՏitr94, ՐՏidx94;
    var toplevel, baselib_dep_map, fun, rex_key, rex, stream;
    parser.init_mod();
    toplevel = parser.parse(code, utils.defaults(options, {
        toplevel: toplevel,
        output: {}
    }));
    if (!options.omit_baselib) {
        baselib_dep_map = {
            ".+Error": [ "extends" ],
            "all|any|zip|iterable|kwargs|eq|merge|mixin|enumerate": [ "iterable" ],
            "kwargs": [ "in", "range", "merge", "dir" ],
            "eq": [ "range" ],
            "mixin": [ "in" ],
            "zip": [ "range" ],
            "rebind_all": [ "bind" ]
        };
        ՐՏitr93 = ՐՏ_Iterable(Object.keys(toplevel.baselib).filter(function(f) {
            return toplevel.baselib[f];
        }));
        for (ՐՏidx93 = 0; ՐՏidx93 < ՐՏitr93.length; ՐՏidx93++) {
            fun = ՐՏitr93[ՐՏidx93];
            ՐՏitr94 = ՐՏ_Iterable(baselib_dep_map);
            for (ՐՏidx94 = 0; ՐՏidx94 < ՐՏitr94.length; ՐՏidx94++) {
                rex_key = ՐՏitr94[ՐՏidx94];
                rex = new RegExp("^(" + rex_key + ")$");
                if (rex.test(fun)) {
                    baselib_dep_map[rex_key].forEach(function(k) {
                        toplevel.baselib[k] = 1;
                    });
                }
            }
        }
    }
    stream = output.Stream(options);
    toplevel.print(stream);
    return stream.toString();
};
exports.minify = function(files, options) {
    var ՐՏitr95, ՐՏidx95;
    var file, code;
    options = utils.defaults(options, {
        fromString: false,
        warnings: false
    });
    if (typeof files === "string") {
        files = [ files ];
    }
    ՐՏitr95 = ՐՏ_Iterable(files);
    for (ՐՏidx95 = 0; ՐՏidx95 < ՐՏitr95.length; ՐՏidx95++) {
        file = ՐՏitr95[ՐՏidx95];
        options.filename = options.fromString ? "?" : file;
        code = options.fromString ? file : require("fs").readFileSync(file, "utf8");
        return {
            code: compile(code, options)
        };
    }
};
exports.parse = parser.parse;
exports.output = function(ast, options) {
    var stream;
    stream = output.Stream(options);
    ast.print(stream);
    return stream.toString();
};
exports.string_template = utils.string_template;
exports.ast = ast;
exports.tokenizer = tokenizer;
exports.NATIVE_CLASSES = parser.NATIVE_CLASSES;
exports.ParseError = utils.ParseError;
exports.ImportError = utils.ImportError;
exports.ALL_KEYWORDS = tokenizer.ALL_KEYWORDS;
exports.IDENTIFIER_PAT = tokenizer.IDENTIFIER_PAT;
exports.colored = utils.colored;
        exports.factory = factory;
        return exports;
    };
    if ((typeof define == "function") && define.amd) define([], factory)
    else window.rapydscript = factory();
    
})();