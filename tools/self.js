/*
 * self.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the MIT license.
 */
"use strict;";

var path = require('path');
var crypto = require('crypto');
var fs = require('fs');
var RapydScript = require('./compiler');

module.exports = function compile_self(base_path, src_path, lib_path, start_time) {
    var output_options = {'beautify': true, 'private_scope': false, 'omit_baselib': true, 'write_name': false};
	var baselib = RapydScript.parse_baselib(src_path, true);

    function timed(name, cont) {
        var t1 = new Date().getTime();
        console.log('Compiling', name, '...');
        var ret = cont();
        console.log('Compiled in', (new Date().getTime() - t1)/1000, 'seconds\n');
        return ret;
    }

	function parse_file(code, file) {
		return RapydScript.parse(code, {
			filename: file,
			readfile: fs.readFileSync,
			basedir: path.dirname(file),
			auto_bind: false,
			libdir: path.join(src_path, 'lib'),
		});
	}


    var saved_hashes = {}, hashes = {}, compiled = {};
    var compiler_changed = false, sha1sum;
    var signatures = path.join(lib_path, 'signatures.json');
    try {
        saved_hashes = JSON.parse(fs.readFileSync(signatures, 'utf-8'));
    } catch (e) {
        if (e.code != 'ENOENT') throw (e);
    }

    sha1sum = crypto.createHash('sha1');
    RapydScript.FILES.concat([module.filename, path.join(base_path, 'tools', 'compiler.js')]).forEach(function (fpath) {
        sha1sum.update(fs.readFileSync(fpath));
    });
    hashes['#compiler#'] = sha1sum.digest('hex');
    RapydScript.FILENAMES.forEach(function (fname) {
        var src = path.join(src_path, fname + '.pyj');
        var h = crypto.createHash('sha1');
        h.update(fs.readFileSync(src));
        hashes[fname] = h.digest('hex');
    });
    compiler_changed = (hashes['#compiler#'] != saved_hashes['#compiler#']) ? true : false;
    function changed(name) {
        return compiler_changed || hashes[name] != saved_hashes[name];
    }

    function generate_baselib() {
//        var output = '';
//        Object.keys(baselib).forEach(function(key) {
//            output += String(baselib[key]) + '\n\n';
//        });
//        return output;
        timed('baselib', function() {
            var src = path.join(src_path, 'baselib.pyj');
            var toplevel = parse_file('', src);
            Object.keys(baselib).forEach(function(key){
                toplevel.baselib[key] = true;
            });
            var output = RapydScript.OutputStream({
                'beautify': true,
                'private_scope': false,
                'omit_baselib': false,
                'write_name': false,
                'baselib': baselib
            });
            toplevel.print(output);
            compiled['baselib'] = output.get();
        });
    }

//    if (changed('baselib')) compiled.baselib = timed('baselib', generate_baselib);
    generate_baselib();
    if (changed('baselib')) generate_baselib();
    RapydScript.FILENAMES.slice(1).forEach(function (fname) {
        if (changed(fname)) {
            var src = path.join(src_path, fname + '.pyj');
            timed(fname, function() {
                var toplevel = parse_file(fs.readFileSync(src, "utf-8"), src);
                var output = RapydScript.OutputStream(output_options);
                toplevel.print(output);
                compiled[fname] = output.get();
            });
        }
    });
    console.log('Compiling RapydScript succeeded (', (new Date().getTime() - start_time)/1000, 'seconds ), writing output...');
    Object.keys(compiled).forEach(function (fname) {
        fs.writeFileSync(path.join(lib_path, fname + '.js'), compiled[fname], "utf8");
    });
    fs.writeFileSync(signatures, JSON.stringify(hashes, null, 4));
};
