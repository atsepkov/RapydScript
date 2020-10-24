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
var path, fs, rapydscript;
path = require("path");
fs = require("fs");
rapydscript = require("../lib/rapydscript");
module.exports = function(argv, base_path, src_path, lib_path, test_type) {
    var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏitr1, ՐՏidx1, ՐՏitr2, ՐՏidx2, ՐՏitr3, ՐՏidx3, ՐՏitr4, ՐՏidx4;
    var assert, os, all_ok, vm, test_dir, error_dir, web_dir, perf_dir, baselib, v8Version, files, fname, file, output, code, jsfile, ok, filepath, Browser, browser, Benchmark;
    assert = require("assert");
    os = require("os");
    all_ok = true;
    vm = require("vm");
    test_dir = path.join(base_path, "test/basic");
    error_dir = path.join(base_path, "test/error");
    web_dir = path.join(base_path, "test/web");
    perf_dir = path.join(base_path, "test/perf");
    baselib = rapydscript.parse_baselib(src_path, true);
    [files, ok];
    if (argv.ecmascript6) {
        console.log("Running in ES6 mode!\n");
        v8Version = process.versions.v8.split(".");
        if (parseInt((ՐՏ_1 = v8Version)[0]) < 4 || parseInt((ՐՏ_2 = v8Version)[0]) <= 4 && parseInt((ՐՏ_3 = v8Version)[1]) <= 9) {
            console.log("Your V8 engine is too old to support ES6 features, skipping ES6 tests...");
            return;
        }
    }
    function compileFile(file, basepath) {
        var filepath;
        filepath = path.join(basepath || test_dir, file);
        try {
            return rapydscript.compile(fs.readFileSync(filepath, "utf-8"), {
                filename: file,
                es6: argv.ecmascript6,
                readfile: fs.readFileSync,
                basedir: test_dir,
                libdir: path.join(src_path, "lib"),
                baselib: baselib,
                beautify: true
            });
        } catch (ՐՏ_Exception) {
            var ex = ՐՏ_Exception;
            console.log(file + ":\t" + ex + "\n");
            return;
        }
    }
    if (test_type !== "bench") {
        console.log("\nBASIC TESTS\n");
        if (argv.files.length) {
            files = [];
            ՐՏitr1 = ՐՏ_Iterable(argv.files);
            for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
                fname = ՐՏitr1[ՐՏidx1];
                files.push(fname + ".pyj");
            }
        } else {
            files = fs.readdirSync(test_dir).filter(function(name) {
                return /^[^_].*\.pyj$/.test(name);
            });
        }
        ՐՏitr2 = ՐՏ_Iterable(files);
        for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
            file = ՐՏitr2[ՐՏidx2];
            if (/^.+?_es6\.pyj$/.test(file) && !argv.ecmascript6) {
                continue;
            }
            output = compileFile(file);
            code = output.toString();
            jsfile = path.join(os.tmpdir(), file + ".js");
            fs.writeFileSync(jsfile, code);
            try {
                vm.runInNewContext(code, {
                    "assert": assert,
                    "require": require,
                    "rapydscript": rapydscript,
                    "console": console,
                    "base_path": base_path
                }, {
                    "filename": jsfile
                });
                ok = true;
                fs.unlinkSync(jsfile);
            } catch (ՐՏ_Exception) {
                var e = ՐՏ_Exception;
                ok = false;
                if (e.stack) {
                    console.log(file + ":\t" + e.stack + "\n\n");
                } else {
                    console.log(file + ":\t" + e + "\n\n");
                }
            }
            if (ok) {
                console.log(file + ":\ttest completed successfully\n");
            } else {
                all_ok = false;
                console.log(file + ":\ttest failed\n");
            }
        }
        console.log("\nCOMPILATION ERROR TESTS\n");
        if (!argv.files.length) {
            files = fs.readdirSync(error_dir).filter(function(name) {
                return /^[^_].*\.pyj$/.test(name);
            });
        }
        ՐՏitr3 = ՐՏ_Iterable(files);
        for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
            file = ՐՏitr3[ՐՏidx3];
            filepath = path.join(error_dir, file);
            code = fs.readFileSync(filepath, "utf-8").split("\n");
            ok = true;
            code.forEach(function(line) {
                var ՐՏ_4;
                var ast, ok;
                if ((ՐՏ_4 = line)[0] === "#" || !line.trim().length) {
                    return;
                }
                try {
                    ast;
                    ast = rapydscript.parse(line, {
                        filename: file,
                        es6: argv.ecmascript6,
                        toplevel: ast,
                        readfile: fs.readFileSync,
                        basedir: error_dir,
                        libdir: path.join(src_path, "lib")
                    });
                    ok = false;
                    console.log(file + ":\t`" + line + "` did not throw an error\n");
                } catch (ՐՏ_Exception) {
                    return;
                }
            });
            if (ok) {
                console.log(file + ":\ttest completed successfully\n");
            } else {
                all_ok = false;
                console.log(file + ":\ttest failed\n");
            }
        }
    }
    if (test_type === "full") {
        console.log("\nDOM TESTS\n");
        output = compileFile("tests.pyj", web_dir);
        code = output.toString();
        Browser = require("zombie");
        browser = new Browser();
        before(function(done) {
            browser.visit("file:/" + path.resolve(web_dir, "index.html"), done);
            describe("starting headless browser tests", function() {
                eval(code);
            });
        });
    }
    if (test_type === "full" || test_type === "bench") {
        console.log("\nBENCHMARK TESTS\n");
        Benchmark = require("benchmark");
        if (argv.files.length) {
            files = [];
            ՐՏitr4 = ՐՏ_Iterable(argv.files);
            for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
                fname = ՐՏitr4[ՐՏidx4];
                files.push(fname + ".pyj");
            }
        } else {
            files = fs.readdirSync(perf_dir).filter(function(name) {
                return /^[^_].*\.pyj$/.test(name);
            });
        }
        files.forEach(function(file) {
            var bench, output, code;
            bench = new Benchmark.Suite();
            output = compileFile(file, perf_dir);
            code = output.toString();
            eval(code);
            bench.on("complete", function() {
                var ՐՏ_5;
                var baseline, s;
                baseline = (ՐՏ_5 = this)[0].hz;
                console.log(file + ":");
                s = function(num) {
                    if (num > 1e3) {
                        return parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    return num.toPrecision(4);
                };
                this.forEach(function(item) {
                    var normalized;
                    normalized = item.hz / baseline * 100;
                    console.log("  " + item.name + ":");
                    console.log("    " + s(item.hz) + " ops/s, " + s(item.stats.mean) + " +/- " + s(item.stats.deviation) + " s/op (" + s(normalized) + "%)");
                });
            }).run();
        });
    }
    if (!all_ok) {
        console.log("There were some test failures!");
    }
    process.exit(all_ok ? 0 : 1);
};