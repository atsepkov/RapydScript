/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict;";

var fs = require('fs');
var RapydScript = require("./compiler");
var path = require('path');

function parse_file(code, filename) {
    return RapydScript.parse(code, {
        filename: filename,
        basedir: path.dirname(filename),
        libdir: path.dirname(filename),
        for_linting: true,
    });
}


function lint_code(code, options) {
    options = options || {};
    var reportcb = options.report || cli_report;
    var filename = options.filename || '<eval>';
    var toplevel = parse_file(code, filename);

    function report(line_number, col_number, msg) {
        return reportcb(filename, line_number, col_number, msg);
    }
}

// CLI {{{

function read_whole_file(filename, cb) {
    if (!filename) {
        var chunks = [];
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function () {
            cb(null, chunks.join(""));
        });
        process.openStdin();
    } else {
        fs.readFile(filename, "utf-8", cb);
    }
}

function cli_report(filename, line_number, col_number, message) {
    if (col_number === undefined) col_number = '';
    console.log(String(filename) + ':' + String(line_number) + ':' + String(col_number) + ':' + String(message));
}

module.exports.cli = function(argv, base_path, src_path, lib_path) {
    var files = argv.files.slice();
    var num_of_files = files.length || 1;

    if (files.filter(function(el){ return el == "-"; }).length > 1) {
        console.error("ERROR: Can read a single file from STDIN (two or more dashes specified)");
        process.exit(1);
    }

    function lint_single_file(err, code) {
        var output;
        if (err) {
            console.error("ERROR: can't read file: " + file);
            process.exit(1);
        }
        lint_code(code, {filename:files[0]});

        files = files.slice(1);
        if (files.length) {
            setImmediate(read_whole_file, files[0], lint_single_file);
            return;
        }
    }
 
    setImmediate(read_whole_file, files[0], lint_single_file);

};

module.exports.lint_code = lint_code;
// }}}
