function abs(n) {
        return Math.abs(n);
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
        if (typeof rebind === "undefined") {
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

function dir(item) {
        var arr;
        arr = [];
        for (var i in item) {
            arr.push(i);
        }
        return arr;
    }

function enumerate(item) {
        var arr;
        arr = [];
        for (var i=0;i<item.length;i++) {
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
        child.prototype.constructor = child;
    }

function ՐՏ_in(val, arr) {
        if (Array.isArray(arr) || typeof arr === "string") {
            return arr.indexOf(val) !== -1;
        } else {
            if (arr.hasOwnProperty(val)) {
                return true;
            }
            return false;
        }
    }

function ՐՏ_Iterable(iterable) {
        if (Array.isArray(iterable) || iterable instanceof String || typeof iterable === "string") {
            return iterable;
        }
        return Object.keys(iterable);
    }

function len(obj) {
        if (Array.isArray(obj) || typeof obj === "string") {
            return obj.length;
        }
        return Object.keys(obj).length;
    }

function ՐՏ_mixin(target, source, overwrite) {
        for (var i in source) {
            if (source.hasOwnProperty(i) && overwrite || typeof target[i] === "undefined") {
                target[i] = source[i];
            }
        }
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

function reversed(arr) {
        var tmp;
        tmp = arr.slice(0);
        return tmp.reverse();
    }

function sum() {
        var arr = arguments[0];
        var start = (arguments[1] === undefined) ? (0) : arguments[1];
        var ՐՏ_kwargs_obj = arguments[arguments.length-1];
        if (typeof ՐՏ_kwargs_obj !== "object" || ՐՏ_kwargs_obj [symbolfor("ՐՏ_kwargs_obj")] !== true) ՐՏ_kwargs_obj = {};
        if (Object.prototype.hasOwnProperty.call(ՐՏ_kwargs_obj, "start")){
            start = ՐՏ_kwargs_obj.start;
        }
        return arr.reduce(function(prev, cur) {
            return prev + cur;
        }, start);
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

function ՐՏ_symbolfor_polyfill() {
        if (typeof Symbol === "function" && typeof Symbol.for === "function") {
            return Symbol.for;
        }
        return function(name) {
            return name + "-Symbol-" + "5d0927e5554349048cf0e3762a228256";
        };
    }

function ՐՏ_desugar_kwargs() {
        if (Object.assign) {
            return function() {
                var ans;
                ans = {};
                ans[symbolfor("ՐՏ_kwargs_obj")] = true;
                return Object.assign.apply(ans, arguments);
            };
        }
        return function() {
            var ans, prop;
            ans = {};
            ans[symbolfor("ՐՏ_kwargs_obj")] = true;
            for (var i = 0; i < arguments.length; i++) {
                var ՐՏ_Iter0 = ՐՏ_Iterable(Object.keys(arguments[i]));
                for (var ՐՏ_Index0 = 0; ՐՏ_Index0 < ՐՏ_Iter0.length; ՐՏ_Index0++) {
                    prop = ՐՏ_Iter0[ՐՏ_Index0];
                    ans[prop] = arguments[i][prop];
                }
            }
            return ans;
        };
    }

