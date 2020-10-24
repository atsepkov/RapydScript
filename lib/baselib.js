function abs(n) {
    return Math.abs(n);
}
function all(a) {
    var ՐՏitr8, ՐՏidx8;
    var e;
    ՐՏitr8 = ՐՏ_Iterable(a);
    for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
        e = ՐՏitr8[ՐՏidx8];
        if (!e) {
            return false;
        }
    }
    return true;
}
function any(a) {
    var ՐՏitr9, ՐՏidx9;
    var e;
    ՐՏitr9 = ՐՏ_Iterable(a);
    for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
        e = ՐՏitr9[ՐՏidx9];
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
    var ՐՏ_45, ՐՏ_46, ՐՏ_47, ՐՏ_48, ՐՏ_49, ՐՏ_50;
    if (rebind === void 0) {
        rebind = true;
    }
    for (var p in thisArg) {
        if ((ՐՏ_45 = thisArg)[p] && (ՐՏ_46 = thisArg)[p].orig) {
            if (rebind) {
                (ՐՏ_47 = thisArg)[p] = ՐՏ_bind((ՐՏ_48 = thisArg)[p], thisArg);
            } else {
                (ՐՏ_49 = thisArg)[p] = (ՐՏ_50 = thisArg)[p].orig;
            }
        }
    }
}
function ՐՏ_with__name__(fn, name) {
    fn.__name__ = name;
    return fn;
}
function ՐՏ_def_modules() {
    var modules;
    modules = {};
    function mounter(mod_id) {
        var ՐՏ_51, ՐՏ_52;
        var rs_mod_id, rs_mod;
        rs_mod_id = "ՐՏ:" + mod_id;
        rs_mod = (ՐՏ_51 = modules)[rs_mod_id] = {
            "body": null,
            "exports": null
        };
        (ՐՏ_52 = rs_mod)["export"] = function(prop, get, set) {
            var ՐՏ_53, ՐՏ_54, ՐՏ_55;
            if (!(ՐՏ_53 = rs_mod)["exports"]) {
                (ՐՏ_54 = rs_mod)["exports"] = {};
            }
            Object.defineProperty((ՐՏ_55 = rs_mod)["exports"], prop, {
                configurable: true,
                enumerable: true,
                get: get,
                set: set
            });
        };
        Object.defineProperty(modules, mod_id, {
            enumerable: true,
            get: function() {
                var ՐՏ_56, ՐՏ_57, ՐՏ_58;
                var mod;
                return (ՐՏ_56 = (mod = (ՐՏ_57 = modules)[rs_mod_id]))["exports"] || (ՐՏ_58 = mod)["body"]();
            },
            set: function(v) {
                var ՐՏ_59, ՐՏ_60;
                (ՐՏ_59 = (ՐՏ_60 = modules)[rs_mod_id])["exports"] = v;
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
function cmp(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
var chr = String.fromCharCode;
function dir(item) {
    var arr;
    arr = [];
    for (var i in item) {
        arr.push(i);
    }
    return arr;
}
function enumerate(item) {
    var ՐՏ_61, ՐՏ_62;
    var arr, iter, i;
    arr = [];
    iter = ՐՏ_Iterable(item);
    for (i = 0; i < iter.length; i++) {
        (ՐՏ_61 = arr)[arr.length] = [ i, (ՐՏ_62 = item)[i] ];
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
    var ՐՏ_63, ՐՏ_64, ՐՏitr10, ՐՏidx10;
    var prop;
    for (var i in source) {
        if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) {
            (ՐՏ_63 = target)[i] = (ՐՏ_64 = source)[i];
        }
    }
    ՐՏitr10 = ՐՏ_Iterable(Object.getOwnPropertyNames(source.prototype));
    for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
        prop = ՐՏitr10[ՐՏidx10];
        if (overwrite || typeof target.prototype[prop] === "undefined") {
            Object.defineProperty(target.prototype, prop, Object.getOwnPropertyDescriptor(source.prototype, prop));
        }
    }
}
function ՐՏ_mixin() {
    var classes = [].slice.call(arguments, 0);
    return function(baseClass) {
        var ՐՏitr11, ՐՏidx11, ՐՏitr12, ՐՏidx12;
        var cls, key;
        ՐՏitr11 = ՐՏ_Iterable(classes);
        for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
            cls = ՐՏitr11[ՐՏidx11];
            ՐՏitr12 = ՐՏ_Iterable(Object.getOwnPropertyNames(cls.prototype));
            for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
                key = ՐՏitr12[ՐՏidx12];
                if (!(ՐՏ_in(key, baseClass.prototype))) {
                    Object.defineProperty(baseClass.prototype, key, Object.getOwnPropertyDescriptor(cls.prototype, key));
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
    var ՐՏ_65, ՐՏ_66;
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = (ՐՏ_65 = arguments)[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        (ՐՏ_66 = range)[idx++] = start;
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
    var ՐՏ_67, ՐՏ_68;
    var i;
    return (function() {
        var ՐՏidx13, ՐՏitr13 = ՐՏ_Iterable(range(Math.min(a.length, b.length))), ՐՏres = [], i;
        for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
            i = ՐՏitr13[ՐՏidx13];
            ՐՏres.push([ (ՐՏ_67 = a)[i], (ՐՏ_68 = b)[i] ]);
        }
        return ՐՏres;
    })();
}
function getattr(obj, name) {
    var ՐՏ_69;
    return (ՐՏ_69 = obj)[name];
}
function setattr(obj, name, value) {
    var ՐՏ_70;
    (ՐՏ_70 = obj)[name] = value;
}
function hasattr(obj, name) {
    return name in obj;
}
function ՐՏ_eq(a, b) {
    var ՐՏ_71, ՐՏ_72, ՐՏitr14, ՐՏidx14, ՐՏ_73, ՐՏ_74;
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
            if (!ՐՏ_eq((ՐՏ_71 = a)[i], (ՐՏ_72 = b)[i])) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        ՐՏitr14 = ՐՏ_Iterable(a);
        for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
            i = ՐՏitr14[ՐՏidx14];
            if (!ՐՏ_eq((ՐՏ_73 = a)[i], (ՐՏ_74 = b)[i])) {
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
    var ՐՏ_75, ՐՏ_76, ՐՏ_77, ՐՏ_78;
    var argNames;
    argNames = (ՐՏ_75 = f.toString().match(/\(([^\)]+)/))[1];
    if (!(ՐՏ_76 = kwargs.memo)[argNames]) {
        (ՐՏ_77 = kwargs.memo)[argNames] = argNames ? argNames.split(",").map(function(s) {
            return s.trim();
        }) : [];
    }
    argNames = (ՐՏ_78 = kwargs.memo)[argNames];
    return function() {
        var ՐՏ_79, ՐՏ_80, ՐՏ_81, ՐՏ_82, ՐՏ_83;
        var args, kw, i;
        args = [].slice.call(arguments);
        if (args.length) {
            kw = (ՐՏ_79 = args)[ՐՏ_79.length-1];
            if (typeof kw === "object") {
                for (i = 0; i < argNames.length; i++) {
                    if (ՐՏ_in((ՐՏ_80 = argNames)[i], kw)) {
                        (ՐՏ_81 = args)[i] = (ՐՏ_82 = kw)[(ՐՏ_83 = argNames)[i]];
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
var AssertionError = (ՐՏ_84 = function AssertionError() {
    AssertionError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_84, Error), Object.defineProperties(ՐՏ_84.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "AssertionError";
            self.message = message;
        }

    }
}), ՐՏ_84);
var IndexError = (ՐՏ_85 = function IndexError() {
    IndexError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_85, Error), Object.defineProperties(ՐՏ_85.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "IndexError";
            self.message = message;
        }

    }
}), ՐՏ_85);
var KeyError = (ՐՏ_86 = function KeyError() {
    KeyError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_86, Error), Object.defineProperties(ՐՏ_86.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "KeyError";
            self.message = message;
        }

    }
}), ՐՏ_86);
var TypeError = (ՐՏ_87 = function TypeError() {
    TypeError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_87, Error), Object.defineProperties(ՐՏ_87.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "TypeError";
            self.message = message;
        }

    }
}), ՐՏ_87);
var ValueError = (ՐՏ_88 = function ValueError() {
    ValueError.prototype.__init__.apply(this, arguments);
}, ՐՏ_extends(ՐՏ_88, Error), Object.defineProperties(ՐՏ_88.prototype, {
    __init__: {
        enumerable: true, 
        writable: true, 
        value: function __init__(message){
            var self = this;
            self.name = "ValueError";
            self.message = message;
        }

    }
}), ՐՏ_88);
({
    "abs": function abs(n) {
        return Math.abs(n);
    },
    "all": function all(a) {
        var ՐՏitr1, ՐՏidx1;
        var e;
        ՐՏitr1 = ՐՏ_Iterable(a);
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            e = ՐՏitr1[ՐՏidx1];
            if (!e) {
                return false;
            }
        }
        return true;
    },
    "any": function any(a) {
        var ՐՏitr2, ՐՏidx2;
        var e;
        ՐՏitr2 = ՐՏ_Iterable(a);
        for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
            e = ՐՏitr2[ՐՏidx2];
            if (e) {
                return true;
            }
        }
        return false;
    },
    "bin": function bin(a) {
        return "0b" + (a >>> 0).toString(2);
    },
    "bind": function ՐՏ_bind(fn, thisArg) {
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
    },
    "rebind_all": function ՐՏ_rebindAll(thisArg, rebind) {
        var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5, ՐՏ_6;
        if (rebind === void 0) {
            rebind = true;
        }
        for (var p in thisArg) {
            if ((ՐՏ_1 = thisArg)[p] && (ՐՏ_2 = thisArg)[p].orig) {
                if (rebind) {
                    (ՐՏ_3 = thisArg)[p] = ՐՏ_bind((ՐՏ_4 = thisArg)[p], thisArg);
                } else {
                    (ՐՏ_5 = thisArg)[p] = (ՐՏ_6 = thisArg)[p].orig;
                }
            }
        }
    },
    "with__name__": function ՐՏ_with__name__(fn, name) {
        fn.__name__ = name;
        return fn;
    },
    "def_modules": function ՐՏ_def_modules() {
        var modules;
        modules = {};
        function mounter(mod_id) {
            var ՐՏ_7, ՐՏ_8;
            var rs_mod_id, rs_mod;
            rs_mod_id = "ՐՏ:" + mod_id;
            rs_mod = (ՐՏ_7 = modules)[rs_mod_id] = {
                "body": null,
                "exports": null
            };
            (ՐՏ_8 = rs_mod)["export"] = function(prop, get, set) {
                var ՐՏ_9, ՐՏ_10, ՐՏ_11;
                if (!(ՐՏ_9 = rs_mod)["exports"]) {
                    (ՐՏ_10 = rs_mod)["exports"] = {};
                }
                Object.defineProperty((ՐՏ_11 = rs_mod)["exports"], prop, {
                    configurable: true,
                    enumerable: true,
                    get: get,
                    set: set
                });
            };
            Object.defineProperty(modules, mod_id, {
                enumerable: true,
                get: function() {
                    var ՐՏ_12, ՐՏ_13, ՐՏ_14;
                    var mod;
                    return (ՐՏ_12 = (mod = (ՐՏ_13 = modules)[rs_mod_id]))["exports"] || (ՐՏ_14 = mod)["body"]();
                },
                set: function(v) {
                    var ՐՏ_15, ՐՏ_16;
                    (ՐՏ_15 = (ՐՏ_16 = modules)[rs_mod_id])["exports"] = v;
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
    },
    "cmp": function cmp(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    },
    "chr": function() {
        var chr = String.fromCharCode;
    },
    "dir": function dir(item) {
        var arr;
        arr = [];
        for (var i in item) {
            arr.push(i);
        }
        return arr;
    },
    "enumerate": function enumerate(item) {
        var ՐՏ_17, ՐՏ_18;
        var arr, iter, i;
        arr = [];
        iter = ՐՏ_Iterable(item);
        for (i = 0; i < iter.length; i++) {
            (ՐՏ_17 = arr)[arr.length] = [ i, (ՐՏ_18 = item)[i] ];
        }
        return arr;
    },
    "eslice": function ՐՏ_eslice(arr, step, start, end) {
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
    },
    "extends": function ՐՏ_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.__base__ = parent;
        child.prototype.constructor = child;
    },
    "filter": function filter(oper, arr) {
        return arr.filter(oper);
    },
    "hex": function hex(a) {
        return "0x" + (a >>> 0).toString(16);
    },
    "in": function ՐՏ_in(val, arr) {
        if (typeof arr.indexOf === "function") {
            return arr.indexOf(val) !== -1;
        } else if (typeof arr.has === "function") {
            return arr.has(val);
        }
        return arr.hasOwnProperty(val);
    },
    "iterable": function ՐՏ_Iterable(iterable) {
        var tmp;
        if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
            return tmp || iterable;
        }
        if (Set && iterable.constructor === Set) {
            return Array.from(iterable);
        }
        return Object.keys(iterable);
    },
    "len": function len(obj) {
        var tmp;
        if (obj.constructor === [].constructor || obj.constructor === "".constructor || (tmp = Array.prototype.slice.call(obj)).length) {
            return (tmp || obj).length;
        }
        if (Set && obj.constructor === Set) {
            return obj.size;
        }
        return Object.keys(obj).length;
    },
    "map": function map(oper, arr) {
        return arr.map(oper);
    },
    "max": function max(a) {
        return Math.max.apply(null, Array.isArray(a) ? a : arguments);
    },
    "min": function min(a) {
        return Math.min.apply(null, Array.isArray(a) ? a : arguments);
    },
    "merge": function ՐՏ_merge(target, source, overwrite) {
        var ՐՏ_19, ՐՏ_20, ՐՏitr3, ՐՏidx3;
        var prop;
        for (var i in source) {
            if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) {
                (ՐՏ_19 = target)[i] = (ՐՏ_20 = source)[i];
            }
        }
        ՐՏitr3 = ՐՏ_Iterable(Object.getOwnPropertyNames(source.prototype));
        for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
            prop = ՐՏitr3[ՐՏidx3];
            if (overwrite || typeof target.prototype[prop] === "undefined") {
                Object.defineProperty(target.prototype, prop, Object.getOwnPropertyDescriptor(source.prototype, prop));
            }
        }
    },
    "mixin": function ՐՏ_mixin() {
        var classes = [].slice.call(arguments, 0);
        return function(baseClass) {
            var ՐՏitr4, ՐՏidx4, ՐՏitr5, ՐՏidx5;
            var cls, key;
            ՐՏitr4 = ՐՏ_Iterable(classes);
            for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
                cls = ՐՏitr4[ՐՏidx4];
                ՐՏitr5 = ՐՏ_Iterable(Object.getOwnPropertyNames(cls.prototype));
                for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                    key = ՐՏitr5[ՐՏidx5];
                    if (!(ՐՏ_in(key, baseClass.prototype))) {
                        Object.defineProperty(baseClass.prototype, key, Object.getOwnPropertyDescriptor(cls.prototype, key));
                    }
                }
            }
            return baseClass;
        };
    },
    "print": function ՐՏ_print() {
        if (typeof console === "object") {
            console.log.apply(console, arguments);
        }
    },
    "range": function range(start, stop, step) {
        var ՐՏ_21, ՐՏ_22;
        var length, idx, range;
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = (ՐՏ_21 = arguments)[2] || 1;
        length = Math.max(Math.ceil((stop - start) / step), 0);
        idx = 0;
        range = new Array(length);
        while (idx < length) {
            (ՐՏ_22 = range)[idx++] = start;
            start += step;
        }
        return range;
    },
    "reduce": function reduce(f, a) {
        return Array.prototype.reduce.call(a, f);
    },
    "reversed": function reversed(arr) {
        var tmp;
        tmp = arr.slice(0);
        return tmp.reverse();
    },
    "sorted": function sorted(arr) {
        var tmp;
        tmp = arr.slice(0);
        return tmp.sort();
    },
    "sum": function sum(arr, start) {
        start = start === void 0 ? 0 : start;
        return arr.reduce(function(prev, cur) {
            return prev + cur;
        }, start);
    },
    "type": function ՐՏ_type(obj) {
        return obj && obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1);
    },
    "zip": function zip(a, b) {
        var ՐՏ_23, ՐՏ_24;
        var i;
        return (function() {
            var ՐՏidx6, ՐՏitr6 = ՐՏ_Iterable(range(Math.min(a.length, b.length))), ՐՏres = [], i;
            for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                i = ՐՏitr6[ՐՏidx6];
                ՐՏres.push([ (ՐՏ_23 = a)[i], (ՐՏ_24 = b)[i] ]);
            }
            return ՐՏres;
        })();
    },
    "getattr": function getattr(obj, name) {
        var ՐՏ_25;
        return (ՐՏ_25 = obj)[name];
    },
    "setattr": function setattr(obj, name, value) {
        var ՐՏ_26;
        (ՐՏ_26 = obj)[name] = value;
    },
    "hasattr": function hasattr(obj, name) {
        return name in obj;
    },
    "eq": function ՐՏ_eq(a, b) {
        var ՐՏ_27, ՐՏ_28, ՐՏitr7, ՐՏidx7, ՐՏ_29, ՐՏ_30;
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
                if (!ՐՏ_eq((ՐՏ_27 = a)[i], (ՐՏ_28 = b)[i])) {
                    return false;
                }
            }
            return true;
        } else if (a.constructor === Object) {
            if (Object.keys(a).length !== Object.keys(b).length) {
                return false;
            }
            ՐՏitr7 = ՐՏ_Iterable(a);
            for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                i = ՐՏitr7[ՐՏidx7];
                if (!ՐՏ_eq((ՐՏ_29 = a)[i], (ՐՏ_30 = b)[i])) {
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
    },
    "kwargs": function() {
        function kwargs(f) {
            var ՐՏ_31, ՐՏ_32, ՐՏ_33, ՐՏ_34;
            var argNames;
            argNames = (ՐՏ_31 = f.toString().match(/\(([^\)]+)/))[1];
            if (!(ՐՏ_32 = kwargs.memo)[argNames]) {
                (ՐՏ_33 = kwargs.memo)[argNames] = argNames ? argNames.split(",").map(function(s) {
                    return s.trim();
                }) : [];
            }
            argNames = (ՐՏ_34 = kwargs.memo)[argNames];
            return function() {
                var ՐՏ_35, ՐՏ_36, ՐՏ_37, ՐՏ_38, ՐՏ_39;
                var args, kw, i;
                args = [].slice.call(arguments);
                if (args.length) {
                    kw = (ՐՏ_35 = args)[ՐՏ_35.length-1];
                    if (typeof kw === "object") {
                        for (i = 0; i < argNames.length; i++) {
                            if (ՐՏ_in((ՐՏ_36 = argNames)[i], kw)) {
                                (ՐՏ_37 = args)[i] = (ՐՏ_38 = kw)[(ՐՏ_39 = argNames)[i]];
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
    },
    "AssertionError": function() {
        var ՐՏ_40;
        var AssertionError = (ՐՏ_40 = function AssertionError() {
            AssertionError.prototype.__init__.apply(this, arguments);
        }, ՐՏ_extends(ՐՏ_40, Error), Object.defineProperties(ՐՏ_40.prototype, {
            __init__: {
                enumerable: true, 
                writable: true, 
                value: function __init__(message){
                    var self = this;
                    self.name = "AssertionError";
                    self.message = message;
                }

            }
        }), ՐՏ_40);
    },
    "IndexError": function() {
        var ՐՏ_41;
        var IndexError = (ՐՏ_41 = function IndexError() {
            IndexError.prototype.__init__.apply(this, arguments);
        }, ՐՏ_extends(ՐՏ_41, Error), Object.defineProperties(ՐՏ_41.prototype, {
            __init__: {
                enumerable: true, 
                writable: true, 
                value: function __init__(message){
                    var self = this;
                    self.name = "IndexError";
                    self.message = message;
                }

            }
        }), ՐՏ_41);
    },
    "KeyError": function() {
        var ՐՏ_42;
        var KeyError = (ՐՏ_42 = function KeyError() {
            KeyError.prototype.__init__.apply(this, arguments);
        }, ՐՏ_extends(ՐՏ_42, Error), Object.defineProperties(ՐՏ_42.prototype, {
            __init__: {
                enumerable: true, 
                writable: true, 
                value: function __init__(message){
                    var self = this;
                    self.name = "KeyError";
                    self.message = message;
                }

            }
        }), ՐՏ_42);
    },
    "TypeError": function() {
        var ՐՏ_43;
        var TypeError = (ՐՏ_43 = function TypeError() {
            TypeError.prototype.__init__.apply(this, arguments);
        }, ՐՏ_extends(ՐՏ_43, Error), Object.defineProperties(ՐՏ_43.prototype, {
            __init__: {
                enumerable: true, 
                writable: true, 
                value: function __init__(message){
                    var self = this;
                    self.name = "TypeError";
                    self.message = message;
                }

            }
        }), ՐՏ_43);
    },
    "ValueError": function() {
        var ՐՏ_44;
        var ValueError = (ՐՏ_44 = function ValueError() {
            ValueError.prototype.__init__.apply(this, arguments);
        }, ՐՏ_extends(ՐՏ_44, Error), Object.defineProperties(ՐՏ_44.prototype, {
            __init__: {
                enumerable: true, 
                writable: true, 
                value: function __init__(message){
                    var self = this;
                    self.name = "ValueError";
                    self.message = message;
                }

            }
        }), ՐՏ_44);
    }
});var ՐՏ_84, ՐՏ_85, ՐՏ_86, ՐՏ_87, ՐՏ_88;
