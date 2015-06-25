"use strict;";
/*
 * repl.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */


var fs = require('fs');
var path = require('path');
var vm = require('vm');
var readline = require('readline');
var util = require('util');
var RapydScript = require('./compiler');

function create_ctx(baselib, show_js) {
    var ctx = vm.createContext({'console':console, 'show_js': !!show_js});
	vm.runInContext(baselib, ctx, {'filename':'baselib.js'});
	var b = vm.runInContext('this', ctx);
	for (var key in b) {
		if (key.substr(0, 9) == '_$rapyd$_' && key.substr(key.length - 9) == '_polyfill') {
			var symname = key.substr(9, key.length - 18);
			vm.runInContext('var ' +  symname + ' = ' + key + '();', ctx);
		}
	}
	RapydScript.AST_Node.warn_function = function() {};
    return ctx;
}

function ansi(code) {
    code = code || 0;
    return '\033[' + code + 'm';
}

var colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

function colored(string, color, bold) {
    var prefix = [];
    if (bold) prefix.push(ansi(1));
    if (color) prefix.push(ansi(colors.indexOf(color) + 31));
    return prefix.join('') + string + ansi(0);
}

module.exports = function(lib_path, ps1, ps2, show_js) {
	var output_options = {'omit_baselib':true, 'write_name':false, 'private_scope':false, 'beautify':true};
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
	var baselib = fs.readFileSync(path.join(lib_path, 'baselib.js'), 'utf-8');
	ps1 = colored(ps1 || '>>> ', 'green');
	ps2 = colored(ps2 || '... ', 'yellow');
    if (show_js === undefined) show_js = true;
	var ctx = create_ctx(baselib, show_js);
    var buffer = [];
    var more = false;
    var LINE_CONTINUATION_CHARS = ':\\';

    console.log(colored('Welcome to the RapydScript REPL! Press Ctrl+D to quit.', 'green', true));
    if (show_js)
        console.log(colored('Use show_js=False to stop the REPL from showing the compiled JavaScript.', 'green', true));
    else
        console.log(colored('Use show_js=True to have the REPL show the compiled JavaScript before executing it.', 'green', true));
    console.log();

    function resetbuffer() { buffer = []; }

    function runjs(js) {
        var result;
        if (vm.runInContext('show_js', ctx)) {
            console.log(colored('---------- Compiled JavaScript ---------', 'green', true));
            console.log(js);
            console.log(colored('---------- Running JavaScript ---------', 'green', true));
        }
        try {
            // Despite what the docs say node does not actually output any errors by itself
            // so, in case this bug is fixed alter, we turn it off explicitly.
            result = vm.runInContext(js, ctx, {'filename':'<repl>', 'displayErrors':false});
        } catch(e) {
            if (e.stack) console.error(e.stack);
            else console.error(e.toString());
        }

        if (result !== undefined) {
            console.log(util.inspect(result, {'colors':true}));
        }
    }

    function compile_source(source, output_options) {
        var toplevel;
        try {
            toplevel = RapydScript.parse(source, {
                'filename':'<repl>',
                'readfile': fs.readFileSync,
                'basedir': process.cwd(),
                'libdir': lib_path,
            });
        } catch(e) {
            if (e.is_eof) return true;
            console.log(e.toString());
            return false;
        }
        var output = RapydScript.OutputStream(output_options);
        toplevel.print(output);
        output = output.toString();
        runjs(output);
        return false;
    }

    function push(line) {
        buffer.push(line);
        var rl = line.trimRight();

        if (rl && LINE_CONTINUATION_CHARS.indexOf(rl.substr(rl.length - 1)) > -1)
            return true;
        var source = buffer.join('\n');
        if (!source.trim()) { resetbuffer(); return false; }
        var incomplete = compile_source(source, output_options);
        if (!incomplete) resetbuffer();
        return incomplete;
    }

    function prompt() {
        rl.setPrompt((more) ? ps2 : ps1);
        rl.prompt();
    }

	rl.on('line', function(line) {
        if (more && line.trimLeft()) buffer.push(line);
        else {
            if (more && !line.trimLeft()) line = line.trimLeft();
            more = push(line);
        }
		prompt();
	})
	
	.on('close', function() {
		console.log('Bye!');
		process.exit(0);
	})

	.on('SIGINT', function() {
        rl.clearLine();
		console.log('Keyboard Interrupt');
        resetbuffer();
        more = false;
		prompt();
	})

	.on('SIGCONT', function() {
		prompt();
	});

	prompt();
};
