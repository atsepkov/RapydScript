function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    if (Set && iterable.constructor === Set) {
        return Array.from(iterable);
    }
    return Object.keys(iterable);
}
var path, fs, rapydscript;
path = require("path");
fs = require("fs");
rapydscript = require("../lib/rapydscript");
module.exports = function compile_self(base_path, src_path, lib_path, start_time) {
    var ՐՏitr1, ՐՏidx1, ՐՏ_1, ՐՏitr2, ՐՏidx2, ՐՏitr3, ՐՏidx3, ՐՏ_3, ՐՏ_4;
    var compiled, baselib, options, src, ast, key, output, file, filename, factory, wrapped;
    compiled = {};
    baselib = rapydscript.parse_baselib(src_path, true);
    options = {
        beautify: true,
        private_scope: false,
        omit_baselib: false,
        write_name: false,
        readfile: fs.readFileSync,
        basedir: src_path,
        dropDocstrings: true,
        auto_bind: false,
        libdir: path.join(src_path, "lib"),
        baselib: baselib,
        strict_names: true
    };
    src = fs.readFileSync(path.join(src_path, "baselib.pyj"), "utf8");
    ast = rapydscript.parse(src, options);
    ՐՏitr1 = ՐՏ_Iterable(baselib);
    for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
        key = ՐՏitr1[ՐՏidx1];
        ++(ՐՏ_1 = ast.baselib)[key];
    }
    output = rapydscript.output(ast, options);
    compiled.baselib = output.toString();
    fs.writeFileSync(path.join(src_path, "_baselib.pyj"), "BASELIB = '''" + src.replace(/\\/g, "\\\\") + "'''", "utf8");
    function compile(file) {
        var ՐՏ_2;
        var filepath;
        filepath = path.join(src_path, file + ".pyj");
        options.filename = file + ".pyj";
        (ՐՏ_2 = compiled)[file] = rapydscript.compile(fs.readFileSync(filepath, "utf8"), options);
    }
    ՐՏitr2 = ՐՏ_Iterable([ "rapydscript", "self", "compile", "test" ]);
    for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
        file = ՐՏitr2[ՐՏidx2];
        compile(file);
    }
    fs.unlinkSync(path.join(src_path, "_baselib.pyj"));
    console.log("Compiling RapydScript succeeded (", (new Date().getTime() - start_time) / 1e3, "seconds ), writing output...");
    ՐՏitr3 = ՐՏ_Iterable(compiled);
    for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
        filename = ՐՏitr3[ՐՏidx3];
        fs.writeFileSync(path.join(lib_path, filename + ".js"), (ՐՏ_3 = compiled)[filename], "utf8");
    }
    factory = '\n    function factory(){\n        "use strict";\n        <compiled_rapydscript>\n        exports.factory = factory;\n        return exports;\n    };\n    if ((typeof define == "function") && define.amd) define([], factory)\n    else window.rapydscript = factory();\n    ';
    factory = factory.replace("<compiled_rapydscript>", (ՐՏ_4 = compiled)["rapydscript"]);
    wrapped = '(function(){\n"use strict";\n' + factory + "\n})();";
    fs.writeFileSync(path.join(lib_path, "rapydscript_web.js"), wrapped, "utf8");
};