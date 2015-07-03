/*
 * cli.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict;";

var path = require('path');

function OptionGroup(name) {
    this.name = name;
    this.description = undefined;
    this.options = {
        'string': {},
        'boolean': {},
        'alias': {},
        'default': {},
        'unknown': function(opt) {
            print_usage();
            console.error('\n', opt, 'is not a recognized option');
            process.exit(1);
        }
    };

    this.help = {};
    this.seen = {};
}

var groups = {}, group;

function create_group(name, usage, description) {
    group = new OptionGroup(name);
    var match = comment_contents.exec(description.toString());
    if (!match) {
        throw new TypeError('Multiline comment missing for: ' + name);
    }
    group.description = match[1];
    group.usage = name + ' [options] ' + usage;
    groups[name] = group;

opt('help', 'h', 'bool', false, function(){/*
show this help message and exit
*/});

opt('version', 'V', 'bool', false, function(){/*
show the version and exit
*/});


}

// Utilities {{{
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
}  // }}}

function print_usage(group) {  // {{{
	var COL_WIDTH = 79;
	var OPT_WIDTH = 23;

    usage = (group) ? group.usage :  "[sub-command] ...";
	console.log('Usage:', path.basename(process.argv[1]), usage, '\n');
    if (!group) {
        // Overall usage
        help = ('RapydScript can perform many actions, depending on which' + 
                '\nsub-command is invoked. With no arguments, it will start a REPL,' +
                '\nunless STDIN is a pipe, in which case it will compile whatever' + 
                '\nyou pass on STDIN and write the output to STDOUT. See the full' +
                '\nlist of sub-commands below.');
        console.log(help, '\n');
        console.log('Sub-commands:');
        Object.keys(groups).forEach(function (name) {
            console.log();
            var dt = wrap(groups[name].description.split('\n'), COL_WIDTH - OPT_WIDTH);
            console.log((name + repeat(' ', OPT_WIDTH)).slice(0, OPT_WIDTH), dt[0]);
            dt.slice(1).forEach(function (line) {
                console.log(repeat(' ', OPT_WIDTH), line);
            });
        });
        return;
    }

    // Group specific usage

    console.log(group.description);
	console.log('\nOptions:');
    var options = group.options;
    var help = group.help;

	Object.getOwnPropertyNames(options.alias).forEach(function (name) {
		var optstr = '  --' + name.replace('_', '-');
		options.alias[name].forEach(function (alias) {
			optstr += ', ' + ((alias.length > 1) ? '--' : '-') + alias.replace('_', '-');
		});
		var ht = wrap(help[name].split('\n'), COL_WIDTH - OPT_WIDTH);

		if (optstr.length > OPT_WIDTH) console.log(optstr);
		else {
			console.log((optstr + repeat(' ', OPT_WIDTH)).slice(0, OPT_WIDTH), ht[0]);
			ht = ht.splice(1);
		}
		ht.forEach(function (line) {
			console.log(repeat(' ', OPT_WIDTH), line);
		});
		console.log();
	});

}  // }}}

// Process options {{{

function opt(name, aliases, type, default_val, help_text) {
	var match = comment_contents.exec(help_text.toString());
    var options = group.options;
    var seen = group.seen;
    var help = group.help;

	if (!match) {
		throw new TypeError('Multiline comment missing for: ' + name);
	}
	help_text = match[1];

	if (!type || type == 'bool') options.boolean[name] = true;
	else if (type == 'string') options.string[name] = true;
	
	if (default_val !== undefined) options.default[name] = default_val;

	if (aliases && aliases.length) {
		aliases.split(',').forEach(function(alias) {
			if (seen.hasOwnProperty(alias)) throw "The option name:" + alias + " has already been used.";
			seen[alias] = true;
		});
		options.alias[name] = aliases.split(',');
	} else options.alias[name] = [];

	if (seen.hasOwnProperty(name)) throw "The option name:" + name + " has already been used.";
	seen[name] = true;

	help[name] = help_text;
}
// }}}

function parse_args() {  // {{{
	var ans = {'files':[]};
	var name_map = {};
	var state, options, group;

	function plain_arg(arg) {
		if (state !== undefined) ans[state] = arg;
		else ans.files.push(arg);
		state = undefined;
	}

	function handle_opt(arg) {
		var oarg = arg;
        var is_long_opt = (arg[0] === '-') ? true : false;
		if (is_long_opt) arg = arg.substr(1);
		if (state !== undefined) ans[state] = '';
		state = undefined;
        if (!is_long_opt && arg.length > 1) {
            arg.split('').forEach(handle_opt);
            return;
        }
		var val = arg.indexOf('=');
		if (val > -1) {
			var t = arg.substr(val + 1);
			arg = arg.substr(0, val);
			val = t;
		} else val = undefined;

		name = name_map[arg.replace('-', '_')];
		if (!name) {
			print_usage(group);
			console.error('The option:', '-' + oarg, 'is not recognized');
			process.exit(1);
		}
		if (options.boolean.hasOwnProperty(name)) {
			if (!val) val = 'true';
			if (val === 'true' || val === '1') val = true;
			else if (val === 'false' || val === '0') val = false;
			else { console.error('The value:', val, 'is invalid for the boolean option:', name); process.exit(1); }
			ans[name] = val;
		} else {
			if (val !== undefined) ans[name] = val;
			else state = name;
		}
	}

    var all_args = process.argv.slice(2);
    ans.auto_mode = false;
    if (groups.hasOwnProperty(all_args[0])) {
        ans.mode = all_args[0];
        all_args = all_args.slice(1);
    } else {
        // this check is not robust, but, it will only fail if the repl mode takes any non-boolean options
        var has_files = all_args.filter(function (a) { return a[0] !== '-'; }).length > 0;
        ans.mode = (!has_files && process.stdin.isTTY) ? 'repl' : 'compile';
        ans.auto_mode = true;
    }
    options = groups[ans.mode].options;

	Object.getOwnPropertyNames(options.default).forEach(function(name) { ans[name] = options['default'][name]; });

	Object.getOwnPropertyNames(options.alias).forEach(function(name) { 
		name_map[name] = name;
		options.alias[name].forEach(function (alias) { name_map[alias] = name; });
	});

    var options_ended = false;

	all_args.forEach(function(arg) {
        if (options_ended) plain_arg(arg);
        else if (arg === '--') options_ended = true;
		else if (arg === '-') plain_arg(arg);

		else if (arg[0] === '-') handle_opt(arg.substr(1));

		else plain_arg(arg);
	});
	if (state !== undefined) plain_arg('');
	return ans;
} // }}}

create_group('compile', "[input1.pyj input2.pyj ...]", function(){/*
Compile RapydScript source code into JavaScript
output.
*/});

opt("output", 'o', 'string', '', function(){/*
Output file (default STDOUT)
*/});

opt("bare", 'b', 'bool', false, function(){/*
Remove the module wrapper that prevents RapydScript 
scope from bleeding into other JavaScript logic 
*/});

opt("auto_bind", 'i', 'bool', false, function(){/*
Automatically bind function methods to functions 
themselves instead of using @bound decorator 
[experimental].
*/});

opt("beautify", 'p,prettify', 'bool', false, function(){/*
Pretty print the generated javascript instead of 
minifying it.
*/});

opt("omit_baselib", 'm', 'bool', false, function(){/*
Omit baselib functions. Use this if you have a 
different way of ensuring they're imported. Note
that simply including baselib.js is no longer
sufficient, as the polyfill functions have to be
executed and their result assigned to an appropriately
named variable.
*/});

opt("comments", undefined, 'string', '', function(){/*
Preserve copyright comments in the output.
By default this works like Google Closure, keeping 
JSDoc-style comments that contain "@license" or 
"@preserve". You can optionally pass one of the 
following arguments to this flag:
- "all" to keep all comments
- a valid JS regexp (needs to start with a slash) to 
keep only comments that match.

Note that currently not *all* comments can be kept 
when compression is on, because of dead code removal 
or cascading statements into sequences.
*/});

opt("stats", undefined, 'bool', false, function(){/*
Display operations run time on STDERR.
*/});

opt("execute", 'x,exec', 'bool', false, function(){/*
When compiling RapydScript code, after outputting
it, execute it in node itself. This acts as a poor
man's REPL :)
*/});

create_group('repl', '', function(){/*
Run a Read-Eval-Print-Loop (REPL). This allows
you to type and run RapydScript at a live
command prompt.
*/});

opt("no_js", '', 'bool', false, function(){/*
Do not display the compiled JavaScript before executing
it.
*/});

create_group('lint', "[input1.pyj input2.pyj ...]", function(){/*
Run the RapydScript linter. This will find various 
possible problems in the .pyj files you specify and 
write messages about them to stdout.
The main check it performs is for unused/undefined 
symbols, like pyflakes does for python.
*/});

create_group('test', '[test1 test2...]', function(){/*
Run RapydScript tests. You can specify the name of 
individual test files to only run tests from those 
files. For example:
test baselib functions
*/});

create_group('self', '', function(){/*
Compile the compiler itself. It will only actually 
compile if something has changed since the last time 
it was called. To force a recompilation, simply 
delete lib/signatures.json
*/});

var argv = module.exports.argv = parse_args();

if (argv.help) {
	print_usage((!argv.auto_mode) ? groups[argv.mode]: undefined);
	process.exit(0);
}

if (argv.version) {
    var json = require("../package.json");
    console.log(json.name + ' ' + json.version);
    process.exit(0);
}
