/*
 * test.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the MIT license.
 */
"use strict;"
var path = require('path');
var fs = require('fs');

module.exports = function(RapydScript, argv, base_path, src_path, baselib) {
    // run all tests and exit
    var assert = require("assert");
    var os = require('os');
    var all_ok = true;
    var vm = require('vm');
    var test_dir = path.join(base_path, 'test');

    if (argv.test)
        var files = [argv.test + '.pyj'];
    else
        var files = fs.readdirSync(test_dir).filter(function(name){
            return /^[^_].*\.pyj$/.test(name);
        });
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
            sys.print(file + ":\t" + ex + "\n");
            return;
        }
        // generate output
        var output = RapydScript.OutputStream({
            baselib: baselib,
            beautify: true
        });
        ast.print(output);

        // test that output performs correct JS operations
        var testcontent = "exports.run = function(){" + output.toString() + "};";
        var jsfile = path.join(os.tmpdir(), file + '.js');
        var code = output.toString();
        fs.writeFileSync(jsfile, code);
        try {
            vm.runInNewContext(code, {'assert':require('assert'), 'RapydScript':RapydScript, 'console':console}, {'filename':jsfile});
			var ok = true;
            fs.unlinkSync(jsfile);
        } catch (e) {
            if (e.stack) {
                sys.print(file + ":\t" + e.stack + "\n\n");
            } else {
                sys.print(file + ":\t" + e + "\n\n");
            }
        }
		if (ok) sys.print(file + ":\ttest completed successfully\n");
        else { all_ok = false; sys.print(file + ":\ttest failed\n"); }
    });
    if (!all_ok) sys.print('There were some test failures!!');
    process.exit((all_ok) ? 0 : 1);
}
