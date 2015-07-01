/*
 * test.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict;";
var path = require('path');
var fs = require('fs');
var RapydScript = require('./compiler');

module.exports = function(argv, base_path, src_path, lib_path) {
    // run all tests and exit
    var assert = require("assert");
    var os = require('os');
    var all_ok = true;
    var vm = require('vm');
    var test_dir = path.join(base_path, 'test');
	var baselib = RapydScript.parse_baselib(src_path, true);
    var files, ok;

    if (argv.files.length) {
        files = [];
		argv.files.forEach(function(fname) { files.push(fname + '.pyj'); });
	} else {
        files = fs.readdirSync(test_dir).filter(function(name){
            return /^[^_].*\.pyj$/.test(name);
        });
	}
    files.forEach(function(file){
        var ast;
        var filepath = path.join(test_dir, file);
        try {
            ast = RapydScript.parse(fs.readFileSync(filepath, "utf-8"), {
                filename: file,
                toplevel: ast,
                basedir: test_dir,
                libdir: path.join(src_path, 'lib'),
            });
        } catch(e) {
            if (e.stack) 
                console.log(file + ":\n" + e.stack + "\n\n");
             else 
                console.log(file + ": " + e + "\n\n");
            return;
        }
        // generate output
        var output = RapydScript.OutputStream({
            baselib: baselib,
            beautify: true
        });
        ast.print(output);

        // test that output performs correct JS operations
        var jsfile = path.join(os.tmpdir(), file + '.js');
        var code = output.toString();
        fs.writeFileSync(jsfile, code);
        try {
            vm.runInNewContext(code, {
                'assert':require('assert'), 
                'require':require, 
                'fs':fs,
                'RapydScript':RapydScript, 
                'console':console,
                'base_path': base_path
            }, {'filename':jsfile});
            fs.unlinkSync(jsfile);
            ok = true;
        } catch (e) {
            ok = false;
            if (e.stack) 
                console.log(file + ":\n" + e.stack + "\n\n");
             else 
                console.log(file + ": " + e + "\n\n");
        }
		if (ok) console.log(file + ": test completed successfully\n");
        else { all_ok = false; console.log(file + ":\ttest failed\n"); }
    });
    if (!all_ok) console.log('There were some test failures!!');
    process.exit((all_ok) ? 0 : 1);
};
