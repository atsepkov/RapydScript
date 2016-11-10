function abs(n) {
    return Math.abs(n);
}
function all(a) {
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
}
function any(a) {
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
    var ՐՏitr3, ՐՏidx3;
    var prop;
    for (var i in source) {
        if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) {
            target[i] = source[i];
        }
    }
    ՐՏitr3 = ՐՏ_Iterable(Object.getOwnPropertyNames(source.prototype));
    for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
        prop = ՐՏitr3[ՐՏidx3];
        if (overwrite || typeof target.prototype[prop] === "undefined") {
            target.prototype[prop] = source.prototype[prop];
        }
    }
}
function ՐՏ_mixin() {
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
        var ՐՏidx6, ՐՏitr6 = ՐՏ_Iterable(range(Math.min(a.length, b.length))), ՐՏres = [], i;
        for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
            i = ՐՏitr6[ՐՏidx6];
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
    var ՐՏitr7, ՐՏidx7;
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
            ՐՏitr7 = ՐՏ_Iterable(a);
            for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                i = ՐՏitr7[ՐՏidx7];
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
var fs, path, rapydscript;
fs = require("fs");
path = require("path");
rapydscript = require("../lib/rapydscript");
function read_whole_file(filename, cb) {
    var chunks;
    if (!filename) {
        chunks = [];
        process.stdin.setEncoding("utf-8");
        process.stdin.on("data", function(chunk) {
            chunks.push(chunk);
        }).on("end", function() {
            cb(null, chunks.join(""));
        });
        process.openStdin();
    } else {
        fs.readFile(filename, "utf-8", cb);
    }
}
module.exports = function(start_time, argv, base_path, src_path, lib_path) {
    var files, metrics, num_of_files, dropDecorators, dropImports, parseOpts;
    files = argv.files.slice(0);
    metrics = {};
    num_of_files = files.length || 1;
    dropDecorators = argv.drop_decorators.split(/\s*,\s*/);
    dropImports = argv.drop_imports.split(/\s*,\s*/);
    parseOpts = {
        filename: "?",
        readfile: fs.readFileSync,
        auto_bind: argv.auto_bind,
        es6: argv.ecmascript6,
        libdir: path.join(src_path, "lib"),
        import_dirs: rapydscript.get_import_dirs(argv.import_path),
        dropDecorators: dropDecorators,
        dropImports: dropImports,
        dropDocstrings: argv.drop_docstrings,
        beautify: argv.beautify,
        private_scope: !argv.bare,
        omit_baselib: argv.omit_baselib
    };
    if (!argv.omit_baselib) {
        parseOpts.baselib = rapydscript.parse_baselib(src_path, parseOpts.beautify);
    }
    if (argv.comments) {
        if (/^\//.test(argv.comments)) {
            parseOpts.comments = new Function("return(" + argv.comments + ")")();
        } else if (argv.comments === "all") {
            parseOpts.comments = true;
        } else {
            parseOpts.comments = function(node, comment) {
                var text, type;
                text = comment.value;
                type = comment.type;
                if (type === "comment:multiline") {
                    return /@preserve|@license|@cc_on/i.test(text);
                }
            };
        }
    }
    function write_output(output) {
        if (argv.output) {
            fs.writeFileSync(argv.output, output, "utf8");
        } else if (argv.execute) {
            if (argv.beautify) {
                console.log("\n------------ Compilation -------------\n");
                console.log(output);
                console.log("\n------------ Execution -------------\n");
            }
            require("vm").runInNewContext(output, {
                "console": console,
                "process": process,
                "require": require,
                "root": typeof window === "object" ? window : global
            }, {
                "filename": files[0]
            });
        } else {
            console.log(output);
        }
    }
    function time_it(name, cont) {
        var t1, ret, spent;
        t1 = new Date().getTime();
        ret = cont();
        spent = new Date().getTime() - t1;
        if (metrics[name]) {
            metrics[name] += spent;
        } else {
            metrics[name] = spent;
        }
        return ret;
    }
    function compile_single_file(err, code) {
        var output, i;
        if (err) {
            console.error("ERROR: can't read file: " + files[0]);
            process.exit(1);
        }
        parseOpts.filename = files[0];
        parseOpts.basedir = path.dirname(files[0]);
        if (argv.stats) {
            time_it("parse", function() {
                var toplevel;
                toplevel = rapydscript.parse(code, parseOpts);
            });
            time_it("generate", function() {
                output = rapydscript.output(toplevel, parseOpts);
            });
        } else {
            output = rapydscript.compile(code, parseOpts);
        }
        write_output(output);
        files = files.slice(1);
        if (files.length) {
            setImmediate(read_whole_file, files[0], compile_single_file);
            return;
        }
        if (argv.stats) {
            console.error(rapydscript.string_template("Timing information (compressed {count} files):", {
                count: num_of_files
            }));
            for (i in metrics) {
                if (metrics.hasOwnProperty(i)) {
                    console.error(rapydscript.string_template("- {name}: {time}s", {
                        name: i,
                        time: (metrics[i] / 1e3).toFixed(3)
                    }));
                }
            }
        }
    }
    if (files.filter(function(el) {
        return el === "-";
    }).length > 1) {
        console.error("ERROR: Can read a single file from STDIN (two or more dashes specified)");
        process.exit(1);
    }
    setImmediate(read_whole_file, files[0], compile_single_file);
};var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5;
