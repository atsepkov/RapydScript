/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict;";

var comment_contents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//;

function repeat(str, num) {
    return new Array( num + 1 ).join( str );
}

function wrap(lines, width) {
	var ans = [];
	var prev = '';
	lines.forEach(function (line) {
		line = prev + line;
		prev = '';
		if (line.length > width) {
			prev = line.substr(width);
			line = line.substr(0, width - 1);
			if (line.substr(line.length - 1 !== ' ')) line += '-';
		} 
		ans.push(line);
	});
	if (prev) ans = ans.concat(wrap([prev]));
	return ans;
}

function merge() {
    // Simple merge of properties from all objects
    var ans = {};
    Array.prototype.slice.call(arguments).forEach(function (arg) {
        Object.keys(arg).forEach(function(key) {
            ans[key] = arg[key];
        });
    });
    return ans;
}

exports.comment_contents = comment_contents;
exports.repeat = repeat;
exports.wrap = wrap;
exports.merge = merge;
