/*
 * repl.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */


function repl(RapydScript, baselib, ps1, ps2) {
    var readline = require('readline');
    var vm = require('vm');
	var util = require('util');
	var ctx = vm.createContext();
	var output_options = {'baselib':baselib, 'write_name':false, 'private_scope':false, 'beautify':true};
	var output = RapydScript.OutputStream(output_options);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
		terminal: true,
    });
	RapydScript.AST_Node.warn_function = function() {}

	rl.setPrompt(ps1 || '>>> ');
	rl.prompt();

	rl.on('line', function(cmd) {
		console.log('line', cmd);
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

module.exports.repl = repl;

