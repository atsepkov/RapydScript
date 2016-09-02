(function(){
    "use strict";
    var ՐՏ_Temp;
    function ՐՏ_Iterable(iterable) {
        if (Array.isArray(iterable) || iterable instanceof String || typeof iterable === "string") {
            return iterable;
        }
        return Object.keys(iterable);
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
    function len(obj) {
        if (Array.isArray(obj) || typeof obj === "string") {
            return obj.length;
        }
        return Object.keys(obj).length;
    }
    function eq(a, b) {
        var i;
        "\n    Equality comparison that works with all data types, returns true if structure and\n    contents of first object equal to those of second object\n\n    Arguments:\n        a: first object\n        b: second object\n    ";
        if (a === b) {
            return true;
        }
        if (Array.isArray(a) && Array.isArray(b) || a instanceof Object && b instanceof Object) {
            if (a.constructor !== b.constructor || a.length !== b.length) {
                return false;
            }
            if (Array.isArray(a)) {
                for (i = 0; i < len(a); i++) {
                    if (!eq(a[i], b[i])) {
                        return false;
                    }
                }
            } else {
                if (Object.keys(a).length !== Object.keys(b).length) {
                    return false;
                }
                var ՐՏ_Iter0 = ՐՏ_Iterable(a);
                for (var ՐՏ_Index0 = 0; ՐՏ_Index0 < ՐՏ_Iter0.length; ՐՏ_Index0++) {
                    i = ՐՏ_Iter0[ՐՏ_Index0];
                    if (!eq(a[i], b[i])) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
    function ՐՏ_in(val, arr) {
        if (Array.isArray(arr) || typeof arr === "string") {
            return arr.indexOf(val) !== -1;
        }
        return arr.hasOwnProperty(val) ? true : false;
    }
    function dir(item) {
        var arr;
        arr = [];
        for (var i in item) {
            arr.push(i);
        }
        return arr;
    }
    function ՐՏ_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    }

    (function(){

        var __name__ = "__main__";


        var Benchmark, suite;
        Benchmark = require("benchmark");
        suite = new Benchmark.Suite;
        suite.add("deep equality", function() {
            1 === 1;
        }).add("dumb equality", function() {
            1 == 1;
        }).on('complete', function() {
            var s = function(num) {
                if (num > 1e3) return parseInt(num);
                return Math.round(num * 100) / 100;
            };
            this.forEach(function(item) {
                console.log(item.name + ":");
                console.log("  " + s(item.hz) + " ops/s, " + s(item.stats.mean) + "+/-" + s(item.stats.deviation) + "s/op");
            });

//            console.log( 'Fastest is ' + this.filter( 'fastest' ) );
//              function compare(a, b) {
//                if (a > b)
//                  return ( a / b * 100).toFixed() + '% faster';
//                if (a == b)
//                  return "the same";
//                return ( b / a * 100).toFixed() + '% slower';
//              }
//
//              // Benchmark object. name: emscript
//              // this[0] : emscript
//              // this[1] : pagedown
//              // this[2] : markdown deep
//              console.log('dumb equality is ' + compare(this[0].hz, this[1].hz) + ' than deep equality');
        }).run({ 'async': true });
    })();
})();
