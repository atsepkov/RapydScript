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

function create_ctx(baselib, show_js, console) {
    var ctx = vm.createContext({'console':console, 'show_js': !!show_js, 'RapydScript':RapydScript});
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

function defaults(options) {
    options = options || {};
    if (!options.input) options.input = process.stdin;
    if (!options.output) options.output = process.stdout;
    if (!options.show_js) options.show_js = true;
    if (!options.ps1) options.ps1 = '>>> ';
    if (!options.ps2) options.ps2 = '... ';
    if (!options.console) options.console = console;
    if (!options.readline) options.readline = readline;
    return options;
}

module.exports = function(lib_path, options) {
	var output_options = {'omit_baselib':true, 'write_name':false, 'private_scope':false, 'beautify':true};
    options = defaults(options);
    var rl = options.readline.createInterface(options);
	var baselib = fs.readFileSync(path.join(lib_path, 'baselib.js'), 'utf-8');
	ps1 = colored(options.ps1, 'green');
	ps2 = colored(options.ps2, 'yellow');
	var ctx = create_ctx(baselib, options.show_js, options.console);
    var buffer = [];
    var more = false;
    var LINE_CONTINUATION_CHARS = ':\\';

    options.console.log(colored('Welcome to the RapydScript REPL! Press Ctrl+C then Ctrl+D to quit.', 'green', true));
    if (options.show_js)
        options.console.log(colored('Use show_js=False to stop the REPL from showing the compiled JavaScript.', 'green', true));
    else
        options.console.log(colored('Use show_js=True to have the REPL show the compiled JavaScript before executing it.', 'green', true));
    options.console.log();

    function resetbuffer() { buffer = []; }

    function prompt() {
        var lw = '';
        if (more && buffer.length) {
            var prev_line = buffer[buffer.length - 1];
            if (prev_line.trimRight().substr(prev_line.length - 1) == ':') lw = '    ';
            prev_line = prev_line.match(/^\s+/);
            if (prev_line) lw += prev_line;
        }
        rl.setPrompt((more) ? ps2 : ps1);
        rl.prompt();
        if (lw) rl.write(lw);
    }

    function runjs(js) {
        var result;
        if (vm.runInContext('show_js', ctx)) {
            options.console.log(colored('---------- Compiled JavaScript ---------', 'green', true));
            options.console.log(js);
            options.console.log(colored('---------- Running JavaScript ---------', 'green', true));
        }
        try {
            // Despite what the docs say node does not actually output any errors by itself
            // so, in case this bug is fixed alter, we turn it off explicitly.
            result = vm.runInContext(js, ctx, {'filename':'<repl>', 'displayErrors':false});
        } catch(e) {
            if (e.stack) options.console.error(e.stack);
            else options.console.error(e.toString());
        }

        if (result !== undefined) {
            options.console.log(util.inspect(result, {'colors':true}));
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
            if (e.is_eof && e.line == buffer.length && e.col > 0) return true;
            if (e.message && e.line !== undefined) options.console.log(e.line + ':' + e.col + ':' + e.message);
            else options.console.log(e.toString());
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

	rl.on('line', function(line) {
        if (more) {
            // We are in a block 
            var line_is_empty = !line.trimLeft();
            if (line_is_empty && buffer.length && !buffer[buffer.length - 1].trimLeft()) {
                // We have two empty lines, evaluate the block
                more = push(line.trimLeft());
            } else buffer.push(line);
        } else more = push(line);  // Not in a block, evaluate line
		prompt();
	})
	
	.on('close', function() {
		options.console.log('Bye!');
		process.exit(0);
	})

	.on('SIGINT', function() {
        rl.clearLine();
		options.console.log('Keyboard Interrupt');
        resetbuffer();
        more = false;
		prompt();
	})

	.on('SIGCONT', function() {
		prompt();
	});

	prompt();
};
