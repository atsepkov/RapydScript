function abs(n) {
    return Math.abs(n);
}
function all(a) {
    var ՐՏitr4, ՐՏidx4;
    var e;
    ՐՏitr4 = ՐՏ_Iterable(a);
    for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
        e = ՐՏitr4[ՐՏidx4];
        if (!e) {
            return false;
        }
    }
    return true;
}
function any(a) {
    var ՐՏitr5, ՐՏidx5;
    var e;
    ՐՏitr5 = ՐՏ_Iterable(a);
    for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
        e = ՐՏitr5[ՐՏidx5];
        if (e) {
            return true;
        }
    }
    return false;
}
function bin(a) {
    return "0b" + (a >>> 0).toString(2);
}
function ՐՏ_bind(fn, thisArg) {
    var ret;
    if (fn.orig) {
        fn = fn.orig;
    }
    if (thisArg === false) {
        return fn;
    }
    ret = function() {
        return fn.apply(thisArg, arguments);
    };
    ret.orig = fn;
    return ret;
}
function ՐՏ_rebindAll(thisArg, rebind) {
    if (rebind === void 0) {
        rebind = true;
    }
    for (var p in thisArg) {
        if (thisArg[p] && thisArg[p].orig) {
            if (rebind) {
                thisArg[p] = ՐՏ_bind(thisArg[p], thisArg);
            } else {
                thisArg[p] = thisArg[p].orig;
            }
        }
    }
}
function cmp(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
chr = String.fromCharCode;
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
function ՐՏ_eslice(arr, step, start, end) {
    var isString;
    arr = arr.slice(0);
    if (typeof arr === "string" || arr instanceof String) {
        isString = true;
        arr = arr.split("");
    }
    if (step < 0) {
        step = -step;
        arr.reverse();
        if (typeof start !== "undefined") {
            start = arr.length - start - 1;
        }
        if (typeof end !== "undefined") {
            end = arr.length - end - 1;
        }
    }
    if (typeof start === "undefined") {
        start = 0;
    }
    if (typeof end === "undefined") {
        end = arr.length;
    }
    arr = arr.slice(start, end).filter(function(e, i) {
        return i % step === 0;
    });
    return isString ? arr.join("") : arr;
}
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
}
function filter(oper, arr) {
    return arr.filter(oper);
}
function hex(a) {
    return "0x" + (a >>> 0).toString(16);
}
function ՐՏ_in(val, arr) {
    if (typeof arr.indexOf === "function") {
        return arr.indexOf(val) !== -1;
    }
    return arr.hasOwnProperty(val);
}
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    return Object.keys(iterable);
}
function len(obj) {
    var tmp;
    if (obj.constructor === [].constructor || obj.constructor === "".constructor || (tmp = Array.prototype.slice.call(obj)).length) {
        return (tmp || obj).length;
    }
    return Object.keys(obj).length;
}
function map(oper, arr) {
    return arr.map(oper);
}
function max(a) {
    return Math.max.apply(null, Array.isArray(a) ? a : arguments);
}
function min(a) {
    return Math.min.apply(null, Array.isArray(a) ? a : arguments);
}
function ՐՏ_merge(target, source, overwrite) {
    var ՐՏitr6, ՐՏidx6;
    var prop;
    for (var i in source) {
        if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) {
            target[i] = source[i];
        }
    }
    ՐՏitr6 = ՐՏ_Iterable(Object.getOwnPropertyNames(source.prototype));
    for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
        prop = ՐՏitr6[ՐՏidx6];
        if (overwrite || typeof target.prototype[prop] === "undefined") {
            target.prototype[prop] = source.prototype[prop];
        }
    }
}
function ՐՏ_mixin() {
    var classes = [].slice.call(arguments, 0);
    return function(baseClass) {
        var ՐՏitr7, ՐՏidx7, ՐՏitr8, ՐՏidx8;
        var cls, key;
        ՐՏitr7 = ՐՏ_Iterable(classes);
        for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
            cls = ՐՏitr7[ՐՏidx7];
            ՐՏitr8 = ՐՏ_Iterable(Object.getOwnPropertyNames(cls.prototype));
            for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                key = ՐՏitr8[ՐՏidx8];
                if (!(ՐՏ_in(key, baseClass.prototype))) {
                    baseClass.prototype[key] = cls.prototype[key];
                }
            }
        }
        return baseClass;
    };
}
function ՐՏ_print() {
    if (typeof console === "object") {
        console.log.apply(console, arguments);
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
function reduce(f, a) {
    return Array.prototype.reduce.call(a, f);
}
function reversed(arr) {
    var tmp;
    tmp = arr.slice(0);
    return tmp.reverse();
}
function sorted(arr) {
    var tmp;
    tmp = arr.slice(0);
    return tmp.sort();
}
function sum(arr, start) {
    start = start === void 0 ? 0 : start;
    return arr.reduce(function(prev, cur) {
        return prev + cur;
    }, start);
}
function ՐՏ_type(obj) {
    return obj && obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1);
}
function zip(a, b) {
    var i;
    return (function() {
        var ՐՏidx9, ՐՏitr9 = ՐՏ_Iterable(range(Math.min(a.length, b.length))), ՐՏres = [], i;
        for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
            i = ՐՏitr9[ՐՏidx9];
            ՐՏres.push([ a[i], b[i] ]);
        }
        return ՐՏres;
    })();
}
function getattr(obj, name) {
    return obj[name];
}
function setattr(obj, name, value) {
    obj[name] = value;
}
function hasattr(obj, name) {
    return name in obj;
}
function ՐՏ_eq(a, b) {
    var ՐՏitr10, ՐՏidx10;
    var i;
    if (a === b) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b) || a instanceof Object && b instanceof Object) {
        if (a.constructor !== b.constructor || a.length !== b.length) {
            return false;
        }
        if (Array.isArray(a)) {
            for (i = 0; i < a.length; i++) {
                if (!ՐՏ_eq(a[i], b[i])) {
                    return false;
                }
            }
        } else {
            if (Object.keys(a).length !== Object.keys(b).length) {
                return false;
            }
            ՐՏitr10 = ՐՏ_Iterable(a);
            for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
                i = ՐՏitr10[ՐՏidx10];
                if (!ՐՏ_eq(a[i], b[i])) {
                    return false;
                }
            }
        }
        return true;
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
var AssertionError = (ՐՏ_1 = function AssertionError() {
    AssertionError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_1, Error), Object.defineProperties(ՐՏ_1.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "AssertionError";
            self.message = message;
        }
    }
}), ՐՏ_1);
var IndexError = (ՐՏ_2 = function IndexError() {
    IndexError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_2, Error), Object.defineProperties(ՐՏ_2.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "IndexError";
            self.message = message;
        }
    }
}), ՐՏ_2);
var KeyError = (ՐՏ_3 = function KeyError() {
    KeyError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_3, Error), Object.defineProperties(ՐՏ_3.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "KeyError";
            self.message = message;
        }
    }
}), ՐՏ_3);
var TypeError = (ՐՏ_4 = function TypeError() {
    TypeError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_4, Error), Object.defineProperties(ՐՏ_4.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "TypeError";
            self.message = message;
        }
    }
}), ՐՏ_4);
var ValueError = (ՐՏ_5 = function ValueError() {
    ValueError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_5, Error), Object.defineProperties(ՐՏ_5.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "ValueError";
            self.message = message;
        }
    }
}), ՐՏ_5);
var path, fs, rapydscript;
path = require("path");
fs = require("fs");
rapydscript = require("../lib/rapydscript");
module.exports = function compile_self(base_path, src_path, lib_path, start_time) {
    var ՐՏitr1, ՐՏidx1, ՐՏitr2, ՐՏidx2, ՐՏitr3, ՐՏidx3;
    var compiled, baselib, options, src, ast, key, output, file, filename;
    compiled = {};
    baselib = rapydscript.parse_baselib(src_path, true);
    options = {
        beautify: true,
        private_scope: false,
        omit_baselib: false,
        write_name: false,
        readfile: fs.readFileSync,
        basedir: src_path,
        dropDocstrings: true,
        auto_bind: false,
        libdir: path.join(src_path, "lib"),
        baselib: baselib
    };
    src = fs.readFileSync(path.join(src_path, "baselib.pyj"), "utf8");
    ast = rapydscript.parse(src, options);
    ՐՏitr1 = ՐՏ_Iterable(baselib);
    for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
        key = ՐՏitr1[ՐՏidx1];
        ++ast.baselib[key];
    }
    output = rapydscript.output(ast, options);
    compiled.baselib = output.toString();
    fs.writeFileSync(path.join(src_path, "_baselib.pyj"), "BASELIB = '''" + src.replace(/\\/g, "\\\\") + "'''", "utf8");
    function compile(file) {
        var filepath;
        filepath = path.join(src_path, file + ".pyj");
        options.filename = file + ".pyj";
        compiled[file] = rapydscript.compile(fs.readFileSync(filepath, "utf8"), options);
    }
    ՐՏitr2 = ՐՏ_Iterable([ "rapydscript", "self", "compile", "test" ]);
    for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
        file = ՐՏitr2[ՐՏidx2];
        compile(file);
    }
    fs.unlinkSync(path.join(src_path, "_baselib.pyj"));
    console.log("Compiling RapydScript succeeded (", (new Date().getTime() - start_time) / 1e3, "seconds ), writing output...");
    ՐՏitr3 = ՐՏ_Iterable(compiled);
    for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
        filename = ՐՏitr3[ՐՏidx3];
        fs.writeFileSync(path.join(lib_path, filename + ".js"), compiled[filename], "utf8");
    }
};var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5;
