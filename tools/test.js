/*
 * test.js
 * Copyright (C) 2016 Alexander Tsepkov
 * originally based on work from Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the MIT license.
 */
"use strict;";
var path = require('path');
var fs = require('fs');
var RapydScript = require('./compiler');

module.exports = function(argv, base_path, src_path, lib_path, test_type) {
    // run all tests and exit
    var assert = require("assert");
    var os = require('os');
    var all_ok = true;
    var vm = require('vm');
    var test_dir = path.join(base_path, 'test/basic');
    var error_dir = path.join(base_path, 'test/error');
    var web_dir = path.join(base_path, 'test/web');
    var perf_dir = path.join(base_path, 'test/perf');
	var baselib = RapydScript.parse_baselib(src_path, true);
    var files, ok;

    // visual indicator of version
    if (argv.ecmascript6) console.log('Running in ES6 mode!\n');

    // this function is the actual transcompiler, the rest of the code in this module is
    // just a test harness
    function compileFile(file, basepath) {
        var filepath = path.join(basepath || test_dir, file);
        var ast;
        try {
            ast = RapydScript.parse(fs.readFileSync(filepath, "utf-8"), {
                filename: file,
                es6: argv.ecmascript6,
                toplevel: ast,
                readfile: fs.readFileSync,
                basedir: test_dir,
                libdir: path.join(src_path, 'lib'),
            });
        } catch(ex) {
            console.log(file + ":\t" + ex + "\n");
            return;
        }
        // generate output
        var output = RapydScript.OutputStream({
            baselib: baselib,
            beautify: true
        });
        ast.print(output);
        return output;
    }

    if (test_type !== 'bench') {
        // basic test cases
        console.log('\nBASIC TESTS\n');
        if (argv.files.length) {
            files = [];
            argv.files.forEach(function(fname) { files.push(fname + '.pyj'); });
        } else {
            files = fs.readdirSync(test_dir).filter(function(name){
                // omit files that start with underscores
                return /^[^_].*\.pyj$/.test(name);
            });
        }
        files.forEach(function(file) {
            var output = compileFile(file);
            var code = output.toString();

            // test that output performs correct JS operations
            var jsfile = path.join(os.tmpdir(), file + '.js');
            fs.writeFileSync(jsfile, code);
            try {
                vm.runInNewContext(code, {
                    'assert': assert,
                    'require': require,
                    'RapydScript': RapydScript,
                    'console': console,
                    'base_path': base_path
                }, {'filename': jsfile});
                ok = true;
                fs.unlinkSync(jsfile);
            } catch (e) {
                ok = false;
                if (e.stack) {
                    console.log(file + ":\t" + e.stack + "\n\n");
                } else {
                    console.log(file + ":\t" + e + "\n\n");
                }
            }
            if (ok) console.log(file + ":\ttest completed successfully\n");
            else { all_ok = false; console.log(file + ":\ttest failed\n"); }
        });

        // tests that cause compile time errors
        console.log('\nCOMPILATION ERROR TESTS\n');
        if (!argv.files.length) {
            files = fs.readdirSync(error_dir).filter(function(name){
                // omit files that start with underscores
                return /^[^_].*\.pyj$/.test(name);
            });
        }
        files.forEach(function(file) {
            var filepath = path.join(error_dir, file);
            var code = fs.readFileSync(filepath, "utf-8").split('\n');
            ok = true;
            code.forEach(function(line) {
                if (line[0] === '#' || !line.trim().length) {
                    return; // blank line, no test here
                }
                try {
                    var ast;
                    ast = RapydScript.parse(line, {
                        filename: file,
                        es6: argv.ecmascript6,
                        toplevel: ast,
                        readfile: fs.readFileSync,
                        basedir: error_dir,
                        libdir: path.join(src_path, 'lib'),
                    });
                    // we want EVERY line to throw an exception
                    ok = false;
                    console.log(file + ":\t`" + line + "` did not throw an error\n");
                } catch(ex) {
                    return;
                }
            });
            if (ok) console.log(file + ":\ttest completed successfully\n");
            else { all_ok = false; console.log(file + ":\ttest failed\n"); }
        });
    }

    // DOM/web tests
    if (test_type === 'full') {
        console.log('\nDOM TESTS\n');
        var output = compileFile('tests.pyj', web_dir);
        var code = output.toString();
        //fs.writeFileSync(path.join(web_dir, 'tests.js'), code);

        var Browser = require("zombie");
        var browser = new Browser();
        before(function(done) {
            browser.visit("file:/" + path.resolve(web_dir, 'index.html'), done);

            describe('starting headless browser tests', function() {
                eval(code);
            });
        });
    }

    // performance benchmarks
    if (test_type === 'full' || test_type === 'bench') {
        console.log('\nBENCHMARK TESTS\n');
        var Benchmark = require('benchmark');
        if (argv.files.length) {
            files = [];
            argv.files.forEach(function(fname) { files.push(fname + '.pyj'); });
        } else {
            files = fs.readdirSync(perf_dir).filter(function(name){
                // omit files that start with underscores
                return /^[^_].*\.pyj$/.test(name);
            });
        }
        files.forEach(function(file) {
            var bench = new Benchmark.Suite();
            var output = compileFile(file, perf_dir);
            var code = output.toString();

            // add test cases
            eval(code);

            bench.on('complete', function() {
                var baseline = this[0].hz;
                console.log(file + ':');
                var s = function(num) {
                    if (num > 1e3) return parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return num.toPrecision(4);
                };
                this.forEach(function(item) {
                    var normalized = item.hz/baseline * 100;
                    console.log("  " + item.name + ":");
                    console.log("    " + s(item.hz) + " ops/s, " + s(item.stats.mean) + " +/- " + s(item.stats.deviation) + " s/op (" + s(normalized) + "%)");
                });
            }).run();
        });
    }

    if (!all_ok) console.log('There were some test failures!');
    process.exit((all_ok) ? 0 : 1);
};
