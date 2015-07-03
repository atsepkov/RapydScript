function abs(n) {
        return Math.abs(n);
    }

function _$rapyd$_bind(fn, thisArg) {
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

function _$rapyd$_rebindAll(thisArg, rebind) {
        if (typeof rebind === "undefined") {
            rebind = true;
        }
        for (var p in thisArg) {
            if (thisArg[p] && thisArg[p].orig) {
                if (rebind) {
                    thisArg[p] = _$rapyd$_bind(thisArg[p], thisArg);
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

function _$rapyd$_eslice(arr, step, start, end) {
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

function _$rapyd$_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    }

function _$rapyd$_in(val, arr) {
        if (Array.isArray(arr) || typeof arr === "string") {
            return arr.indexOf(val) !== -1;
        } else {
            if (arr.hasOwnProperty(val)) {
                return true;
            }
            return false;
        }
    }

function _$rapyd$_Iterable(iterable) {
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

function _$rapyd$_mixin(target, source, overwrite) {
        for (var i in source) {
            if (source.hasOwnProperty(i) && overwrite || typeof target[i] === "undefined") {
                target[i] = source[i];
            }
        }
    }

function _$rapyd$_print() {
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
        var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
        if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [symbolfor("_$rapyd$_kwargs_obj")] !== true) _$rapyd$_kwargs_obj = {};
        if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "start")){
            start = _$rapyd$_kwargs_obj.start;
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

function _$rapyd$_symbolfor_polyfill() {
        if (typeof Symbol === "function" && typeof Symbol.for === "function") {
            return Symbol.for;
        }
        return function(name) {
            return name + "-Symbol-" + "5d0927e5554349048cf0e3762a228256";
        };
    }

function _$rapyd$_desugar_kwargs() {
        if (Object.assign) {
            return function() {
                var ans;
                ans = {};
                ans[symbolfor("_$rapyd$_kwargs_obj")] = true;
                return Object.assign.apply(ans, arguments);
            };
        }
        return function() {
            var ans, prop;
            ans = {};
            ans[symbolfor("_$rapyd$_kwargs_obj")] = true;
            for (var i = 0; i < arguments.length; i++) {
                var _$rapyd$_Iter0 = _$rapyd$_Iterable(Object.keys(arguments[i]));
                for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                    prop = _$rapyd$_Iter0[_$rapyd$_Index0];
                    ans[prop] = arguments[i][prop];
                }
            }
            return ans;
        };
    }

