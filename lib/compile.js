function dir(item) {
    var arr;
    arr = [];
    for (var i in item) {
        arr.push(i);
    }
    return arr;
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
function range(start, stop, step) {
    var ՐՏ_11, ՐՏ_12;
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = (ՐՏ_11 = arguments)[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        (ՐՏ_12 = range)[idx++] = start;
        start += step;
    }
    return range;
}
function ՐՏ_eq(a, b) {
    var ՐՏ_13, ՐՏ_14, ՐՏitr1, ՐՏidx1, ՐՏ_15, ՐՏ_16;
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
            if (!ՐՏ_eq((ՐՏ_13 = a)[i], (ՐՏ_14 = b)[i])) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        ՐՏitr1 = ՐՏ_Iterable(a);
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            i = ՐՏitr1[ՐՏidx1];
            if (!ՐՏ_eq((ՐՏ_15 = a)[i], (ՐՏ_16 = b)[i])) {
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
    var ՐՏ_10;
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
        omit_baselib: argv.omit_baselib,
        strict_names: argv.strict_names
    };
    if (!argv.omit_baselib) {
        parseOpts.baselib = rapydscript.parse_baselib(src_path, parseOpts.es6);
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
        var ՐՏ_1;
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
                "filename": (ՐՏ_1 = files)[0]
            });
        } else {
            console.log(output);
        }
    }
    function time_it(name, cont) {
        var ՐՏ_2, ՐՏ_3, ՐՏ_4;
        var t1, ret, spent;
        t1 = new Date().getTime();
        ret = cont();
        spent = new Date().getTime() - t1;
        if ((ՐՏ_2 = metrics)[name]) {
            (ՐՏ_3 = metrics)[name] += spent;
        } else {
            (ՐՏ_4 = metrics)[name] = spent;
        }
        return ret;
    }
    function compile_single_file(err, code) {
        var ՐՏ_5, ՐՏ_6, ՐՏ_7, ՐՏ_8, ՐՏ_9;
        var output, i;
        if (err) {
            console.error("ERROR: can't read file: " + (ՐՏ_5 = files)[0]);
            process.exit(1);
        }
        parseOpts.filename = (ՐՏ_6 = files)[0];
        parseOpts.basedir = path.dirname((ՐՏ_7 = files)[0]);
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
            setImmediate(read_whole_file, (ՐՏ_8 = files)[0], compile_single_file);
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
                        time: ((ՐՏ_9 = metrics)[i] / 1e3).toFixed(3)
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
    setImmediate(read_whole_file, (ՐՏ_10 = files)[0], compile_single_file);
};