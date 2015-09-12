var path = require("path");
var fs = require("fs");
var vm = require("vm");

var RapydScript = vm.createContext({
    console       : console,
});

exports.create_compiler = function() {
    var compiler_exports = {};
    var compiler_context = vm.createContext({
        console       : console,
        readfile      : fs.readFileSync,
        writefile     : fs.writeFileSync,
        require       : require,
        exports       : compiler_exports,
    });

    console.log(module.filename);
    var compilerjs = fs.readFileSync(
        path.join(
            path.dirname(path.dirname(module.filename)),
            'tools',
            'compiler.js'
        ),
        'utf-8'
    );
    console.log(compilerjs);
    vm.runInContext(compilerjs, compiler_context, 'tools/compiler.js');
    return compiler_exports;
};

// prepare a splat to be injected into the code
function splat_baselib(name, body) {
    return new RapydScript.AST_Splat({
        module: new RapydScript.AST_SymbolVar({
            name: name
        }),
        body: new RapydScript.AST_Toplevel({
            start: body[0].start,
            body: body,
            strict: true,
            end: body[body.length-1].end
        })
    });
}

exports.parse_baselib = function(src_path, beautify) {
    var baselibAst;
    try {
        var baselibPath = path.join(src_path, 'baselib.pyj');
        baselibAst = RapydScript.parse(fs.readFileSync(baselibPath, "utf-8"), {
            readfile: fs.readFileSync,
        });
    } catch(e) {
        if (e.code == "ENOENT") {
            throw "Failed to locate baselib module.";
        }
        else {
            throw e;
        }
    }

    // we don't want to dump the baselib yet, we want to process it in pieces and splat
    // them as needed
    var hash = baselibAst.body[baselibAst.body.length-1];
    var data = hash.body.properties;
    var baselibList = {};
    data.forEach(function(item) {
//        item.dump(1, ['start', 'end'], false);
//        item.dump(9, ['start', 'end'], true);
        var key = item.key;
        // if this is named a function, use it as a whole, if it's anonymous assume a scope
        var value = item.value.name ? [item.value] : item.value.body;
        baselibList[key] = splat_baselib(key, value);
    });

    // GET RID OF THIS, we just want to return a list of splats
//    var outputStream = RapydScript.OutputStream({
//        private_scope: false,
//        beautify: beautify,
//        write_name: false,
//        omit_baselib: true,  // We are generating baselib here, cannot depend on it
//    });
//    baselibAst.print(outputStream);
//    return eval(outputStream.toString());  // jshint ignore:line
    return baselibList;
};

function load_global(file) {
    try {
        var code = fs.readFileSync(file, "utf8");
        return vm.runInContext(code, RapydScript, file);
    } catch(ex) {
        // XXX: in case of a syntax error, the message is kinda
        // useless. (no location information).
        console.error("ERROR in file: " + file + " / " + ex);
        process.exit(1);
    }
}

var FILENAMES = exports.FILENAMES = [
    "baselib",
    "utils",
    "ast",
    "parse",
    "output",
];

var FILES = exports.FILES = FILENAMES.map(function(file){
    return path.join(path.dirname(module.filename), '..', 'lib', file + '.js');
});

FILES.forEach(load_global);

RapydScript.AST_Node.warn_function = function(txt) {
    console.error(txt);
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
        var code = (options.fromString) ? file : fs.readFileSync(file, "utf8");
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
    }
    doitem(RapydScript.AST_Node);
    return out + "";
};
