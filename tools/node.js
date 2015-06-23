var path = require("path");
var fs = require("fs");
var vm = require("vm");
var sys = require("util");

if (typeof console == 'object' && typeof console.error == 'function') {
	sys.print = console.log;
	sys.puts = console.log;
	sys.error = console.error;
	sys.debug = console.error;
}

var RapydScript = vm.createContext({
    sys           : sys,
    console       : console,
});

function load_global(file) {
    file = path.resolve(path.dirname(module.filename), file);
    try {
        var code = fs.readFileSync(file, "utf8");
        return vm.runInContext(code, RapydScript, file);
    } catch(ex) {
        // XXX: in case of a syntax error, the message is kinda
        // useless. (no location information).
        sys.debug("ERROR in file: " + file + " / " + ex);
        process.exit(1);
    }
};

var FILES = exports.FILES = [
    "../lib/baselib.js",
    "../lib/utils.js",
    "../lib/ast.js",
    "../lib/parse.js",
    "../lib/output.js",
].map(function(file){
    return path.join(path.dirname(fs.realpathSync(__filename)), file);
});

FILES.forEach(load_global);

RapydScript.AST_Node.warn_function = function(txt) {
    sys.error("WARN: " + txt);
};

// XXX: perhaps we shouldn't export everything but heck, I'm lazy.
for (var i in RapydScript) {
    if (RapydScript.hasOwnProperty(i)) {
        exports[i] = RapydScript[i];
    }
}

exports.minify = function(files, options) {
    options = RapydScript.defaults(options, {
        fromString   : false,
        warnings     : false,
        output       : null,
    });
    if (typeof files == "string")
        files = [ files ];

    // 1. parse
    var toplevel = null;
    files.forEach(function(file){
        var code = options.fromString
            ? file
            : fs.readFileSync(file, "utf8");
        toplevel = RapydScript.parse(code, {
            filename: options.fromString ? "?" : file,
            toplevel: toplevel
        });
    });

    // 4. output
    var output = {};
    if (options.output) {
        RapydScript.merge(output, options.output);
    }
    var stream = RapydScript.OutputStream(output);
    toplevel.print(stream);
    return {
        code : stream + "",
    };
};

// exports.describe_ast = function() {
//     function doitem(ctor) {
//         var sub = {};
//         ctor.SUBCLASSES.forEach(function(ctor){
//             sub[ctor.TYPE] = doitem(ctor);
//         });
//         var ret = {};
//         if (ctor.SELF_PROPS.length > 0) ret.props = ctor.SELF_PROPS;
//         if (ctor.SUBCLASSES.length > 0) ret.sub = sub;
//         return ret;
//     }
//     return doitem(RapydScript.AST_Node).sub;
// }

exports.describe_ast = function() {
    var out = RapydScript.OutputStream({ beautify: true });
    function doitem(ctor) {
        out.print("AST_" + ctor.TYPE);
        var props = ctor.SELF_PROPS.filter(function(prop){
            return !/^\$/.test(prop);
        });
        if (props.length > 0) {
            out.space();
            out.with_parens(function(){
                props.forEach(function(prop, i){
                    if (i) out.space();
                    out.print(prop);
                });
            });
        }
        if (ctor.documentation) {
            out.space();
            out.print_string(ctor.documentation);
        }
        if (ctor.SUBCLASSES.length > 0) {
            out.space();
            out.with_block(function(){
                ctor.SUBCLASSES.forEach(function(ctor, i){
                    out.indent();
                    doitem(ctor);
                    out.newline();
                });
            });
        }
    };
    doitem(RapydScript.AST_Node);
    return out + "";
};
