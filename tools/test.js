/*
 * test.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the MIT license.
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
            // omit files that start with underscores
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

        // test that output performs correct JS operations
        var jsfile = path.join(os.tmpdir(), file + '.js');
        var code = output.toString();
        fs.writeFileSync(jsfile, code);
        try {
            vm.runInNewContext(code, {
                'assert':require('assert'), 
                'require':require, 
                'RapydScript':RapydScript, 
                'console':console,
                'base_path': base_path
            }, {'filename':jsfile});
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
    if (!all_ok) console.log('There were some test failures!!');
    process.exit((all_ok) ? 0 : 1);
};
