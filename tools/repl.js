/*
 * repl.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

"use strict;"

var fs = require('fs');
var path = require('path');
var RapydScript = require('./compiler');

function init_ctx(RapydScript, vm, ctx, baselib) {
	vm.runInContext(baselib, ctx, {'filename':'baselib.js'});
	var b = vm.runInContext('this', ctx);
	for (key in b) {
		if (key.substr(0, 9) == '_$rapyd$_' && key.substr(key.length - 9) == '_polyfill') {
			var symname = key.substr(9, key.length - 18);
			vm.runInContext('var ' +  symname + ' = ' + key + '();', ctx);
		}
	}
	RapydScript.AST_Node.warn_function = function() {}
}


module.exports = function(lib_path, ps1, ps2) {
    var readline = require('readline');
    var vm = require('vm');
	var util = require('util');
	var ctx = vm.createContext();
	var output_options = {'baselib':baselib, 'write_name':false, 'private_scope':false, 'beautify':true};
	var output = RapydScript.OutputStream(output_options);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
	var baselib = fs.readFileSync(path.join(lib_path, 'baselib.js'), 'utf-8');
	ps1 = ps1 || '>>> ';
	ps2 = ps2 || '... ';
	init_ctx(RapydScript, vm, ctx, baselib);
	rl.setPrompt(ps1);
	rl.prompt();

	rl.on('line', function(cmd) {
		console.log('line', cmd);
		rl.prompt();
	})
	
	.on('close', function() {
		console.log('Bye!')
		process.exit(0);
	})

	.on('SIGINT', function() {
		// `prompt` will automatically resume the stream
		console.log('Keyboard Interrupt');
		rl.prompt();
	})

	.on('SIGCONT', function() {
		// `prompt` will automatically resume the stream
		rl.prompt();
	});

}
