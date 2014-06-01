var KEYWORDS, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, KEYWORDS_ATOM, NATIVE_CLASSES, OPERATOR_CHARS, RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, REGEXP_MODIFIERS, UNICODE, IMPORTED, BASELIB, EX_EOF, UNARY_PREFIX, UNARY_POSTFIX, ASSIGNMENT, PRECEDENCE, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN;
"\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript2\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under Apache 2.0 license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n  RapydScript source code is originally based on UglifyJS2 (covered\n  by BSD license). UglifyJS2 was written by Mihai Bazon\n  <mihai.bazon@gmail.com>, who is its respective copyright holder.\n\n    Redistribution and use in source and binary forms, with or without\n    modification, are permitted provided that the following conditions\n    are met:\n\n        * Redistributions of source code must retain the above\n          copyright notice, this list of conditions and the following\n          disclaimer.\n\n        * Redistributions in binary form must reproduce the above\n          copyright notice, this list of conditions and the following\n          disclaimer in the documentation and/or other materials\n          provided with the distribution.\n\n    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY\n    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE\n    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,\n    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF\n    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF\n    SUCH DAMAGE.\n\n**********************************************************************\n";
"use strict";
KEYWORDS = "as break case class const continue debugger default def del do elif else except finally for from if import require in instanceof is module new nonlocal pass raise return switch til to try typeof var void while with or and not";
KEYWORDS_ATOM = "False None True";
RESERVED_WORDS = "abstract boolean byte char double enum export extends final float goto implements int interface long native package private protected public short static super synchronized this throws transient volatile" + " " + KEYWORDS_ATOM + " " + KEYWORDS;
KEYWORDS_BEFORE_EXPRESSION = "return new del raise elif else if";
KEYWORDS = makePredicate(KEYWORDS);
RESERVED_WORDS = makePredicate(RESERVED_WORDS);
KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
KEYWORDS_ATOM = makePredicate(KEYWORDS_ATOM);
NATIVE_CLASSES = {
    "Image": {},
    "RegExp": {},
    "Error": {},
    "Object": {
        "static": [ "getOwnPropertyNames", "keys", "create" ]
    },
    "String": {
        "static": [ "fromCharCode" ]
    },
    "Array": {
        "static": [ "isArray", "from", "of" ]
    },
    "Number": {
        "static": [ "isFinite", "isNaN" ]
    },
    "Function": {},
    "Date": {
        "static": [ "UTC", "now", "parse" ]
    },
    "Boolean": {},
    "ArrayBuffer": {},
    "DataView": {},
    "Float32Array": {},
    "Float64Array": {},
    "Int16Array": {},
    "Int32Array": {},
    "Int8Array": {},
    "Uint16Array": {},
    "Uint32Array": {},
    "Uint8Array": {},
    "Uint8ClampedArray": {}
};
OPERATOR_CHARS = makePredicate(characters("+-*&%=<>!?|~^@"));
RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
RE_OCT_NUMBER = /^0[0-7]+$/;
RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
OPERATORS = makePredicate([ "in", "instanceof", "typeof", "new", "void", "del", "++", "--", "+", "-", "not", "~", "&", "|", "^", "*", "/", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "is", "!=", "!==", "?", "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "and", "or", "til", "to", "@" ]);
OP_MAP = {
    "or": "||",
    "and": "&&",
    "not": "!",
    "del": "delete",
    "None": "null",
    "is": "==="
};
WHITESPACE_CHARS = makePredicate(characters("  \n\r\t\f​᠎             　"));
PUNC_BEFORE_EXPRESSION = makePredicate(characters("[{(,.;:"));
PUNC_CHARS = makePredicate(characters("[]{}(),;:"));
REGEXP_MODIFIERS = makePredicate(characters("gmsiy"));
UNICODE = {
    letter: new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
    non_spacing_mark: new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
    space_combining_mark: new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
    connector_punctuation: new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
};
IMPORTED = {};
BASELIB = {};
function is_letter(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 170 && UNICODE.letter.test(String.fromCharCode(code));
}
function is_digit(code) {
    return code >= 48 && code <= 57;
}
function is_alphanumeric_char(code) {
    return is_digit(code) || is_letter(code);
}
function is_unicode_combining_mark(ch) {
    return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
}
function is_unicode_connector_punctuation(ch) {
    return UNICODE.connector_punctuation.test(ch);
}
function is_identifier(name) {
    return !RESERVED_WORDS(name) && /^[a-z_$][a-z0-9_$]*$/i.test(name);
}
function is_identifier_start(code) {
    return code == 36 || code == 95 || is_letter(code);
}
function is_identifier_char(ch) {
    var code;
    code = ch.charCodeAt(0);
    return is_identifier_start(code) || is_digit(code) || code == 8204 || code == 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
}
function parse_js_number(num) {
    if (RE_HEX_NUMBER.test(num)) {
        return parseInt(num.substr(2), 16);
    } else if (RE_OCT_NUMBER.test(num)) {
        return parseInt(num.substr(1), 8);
    } else if (RE_DEC_NUMBER.test(num)) {
        return parseFloat(num);
    }
}
function JS_Parse_Error(message, line, col, pos) {
    this.message = message;
    this.line = line;
    this.col = col;
    this.pos = pos;
    this.stack = new Error().stack;
}
JS_Parse_Error.prototype.toString = function() {
    return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
};
function js_error(message, filename, line, col, pos) {
    AST_Node.warn("ERROR: {message} [{file}:{line},{col}]", {
        message: message,
        file: filename,
        line: line,
        col: col
    });
    throw new JS_Parse_Error(message, line, col, pos);
}
function is_token(token, type, val) {
    return token.type == type && (val == null || token.value == val);
}
function reserved_decorator(s, decorator) {
    var index, found;
    if (!s.decorators) {
        return false;
    }
    index = s.decorators.indexOf(decorator);
    found = index != -1;
    if (found) {
        s.decorators.splice(index, 1);
    }
    return found;
}
function dirname(path) {
    var length, i;
    length = path.length;
    if (path[length - 1] == "/") {
        length -= 1;
    }
    i = path.lastIndexOf("/", length);
    return i > 0 ? path.slice(0, i) : "";
}
EX_EOF = {};
function tokenizer($TEXT, filename) {
    var S, read_string, read_multiline_comment, read_regexp;
    S = {
        text: $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, ""),
        filename: filename,
        pos: 0,
        tokpos: 0,
        line: 1,
        tokline: 0,
        col: 0,
        tokcol: 0,
        newline_before: false,
        regex_allowed: false,
        comments_before: [],
        whitespace_before: [],
        newblock: false,
        endblock: false,
        indentation_matters: [ true ],
        cached_whitespace: "",
        prev: undefined,
        index_or_slice: [ false ]
    };
    function peek() {
        return S.text.charAt(S.pos);
    }
    function prevChar() {
        return S.text.charAt(S.tokpos - 1);
    }
    function next(signal_eof, in_string) {
        var ch;
        ch = S.text.charAt(S.pos);
        S.pos += 1;
        if (signal_eof && !ch) {
            throw EX_EOF;
        }
        if (ch == "\n") {
            S.newline_before = S.newline_before || !in_string;
            S.line += 1;
            S.col = 0;
        } else {
            S.col += 1;
        }
        return ch;
    }
    function find(what, signal_eof) {
        var pos;
        pos = S.text.indexOf(what, S.pos);
        if (signal_eof && pos == -1) {
            throw EX_EOF;
        }
        return pos;
    }
    function start_token() {
        S.tokline = S.line;
        S.tokcol = S.col;
        S.tokpos = S.pos;
    }
    function token(type, value, is_comment, keep_newline) {
        var ret, i;
        S.regex_allowed = type == "operator" && !UNARY_POSTFIX[value] || type == "keyword" && KEYWORDS_BEFORE_EXPRESSION(value) || type == "punc" && PUNC_BEFORE_EXPRESSION(value);
        if (type == "operator" && value == "is" && S.text.substr(S.pos).trimLeft().substr(0, 4).trimRight() == "not") {
            next_token();
            value = "!==";
        }
        if (type == "operator" && OP_MAP[value]) {
            value = OP_MAP[value];
        }
        ret = {
            type: type,
            value: value,
            line: S.tokline,
            col: S.tokcol,
            pos: S.tokpos,
            endpos: S.pos,
            nlb: S.newline_before,
            file: filename
        };
        if (!is_comment) {
            ret.comments_before = S.comments_before;
            S.comments_before = [];
            for (i = 0; i < len(ret.comments_before); i++) {
                ret.nlb = ret.nlb || ret.comments_before[i].nlb;
            }
        }
        if (!keep_newline) {
            S.newline_before = false;
        }
        if (type == "punc") {
            if (value == ":" && !S.index_or_slice.slice(-1)[0] && (!S.text.substring(S.pos + 1, find("\n")).trim() || !S.text.substring(S.pos + 1, find("#")).trim())) {
                S.newblock = true;
                S.indentation_matters.push(true);
            }
            if (value == "[") {
                if (S.prev && S.prev.type == "name") {
                    S.index_or_slice.push(true);
                } else {
                    S.index_or_slice.push(false);
                }
                S.indentation_matters.push(false);
            } else if (value == "{" || value == "(") {
                S.indentation_matters.push(false);
            } else if (value == "]") {
                S.index_or_slice.pop();
                S.indentation_matters.pop();
            } else if (value == "}" || value == ")") {
                S.indentation_matters.pop();
            }
        }
        S.prev = new AST_Token(ret);
        return S.prev;
    }
    function parse_whitespace() {
        var whitespace_exists, ch, leading_whitespace;
        leading_whitespace = "";
        whitespace_exists = false;
        while (WHITESPACE_CHARS(peek())) {
            whitespace_exists = true;
            ch = next();
            if (ch == "\n") {
                leading_whitespace = "";
            } else {
                leading_whitespace += ch;
            }
        }
        if (peek() != "#") {
            if (!whitespace_exists) {
                leading_whitespace = S.cached_whitespace;
            } else {
                S.cached_whitespace = leading_whitespace;
            }
            if (S.newline_before || S.endblock) {
                return test_indent_token(leading_whitespace);
            }
        }
    }
    function test_indent_token(leading_whitespace) {
        var most_recent;
        most_recent = S.whitespace_before[S.whitespace_before.length - 1] || "";
        S.endblock = false;
        if (S.indentation_matters.slice(-1)[0] && leading_whitespace != most_recent) {
            if (S.newblock && leading_whitespace && leading_whitespace.indexOf(most_recent) == 0) {
                S.newblock = false;
                S.whitespace_before.push(leading_whitespace);
                return 1;
            } else if (most_recent && most_recent.indexOf(leading_whitespace) == 0) {
                S.endblock = true;
                S.whitespace_before.pop();
                return -1;
            } else {
                parse_error("Inconsistent indentation");
            }
        } else {
            return 0;
        }
    }
    function read_while(pred) {
        var i, ret;
        ret = "";
        i = 0;
        while ((ch = peek()) && pred(ch, i)) {
            i += 1;
            ret += next();
        }
        return ret;
    }
    function parse_error(err) {
        js_error(err, filename, S.tokline, S.tokcol, S.tokpos);
    }
    function read_num(prefix) {
        var has_e, after_e, has_x, has_dot, num, valid;
        has_e = false;
        after_e = false;
        has_x = false;
        has_dot = prefix == ".";
        num = read_while(function(ch, i) {
            var code, tmp_;
            code = ch.charCodeAt(0);
            tmp_ = code;
            if (tmp_ == 120 || tmp_ == 88) {
                return has_x ? false : has_x = true;
            } else if (tmp_ == 101 || tmp_ == 69) {
                return has_x ? true : has_e ? false : has_e = after_e = true;
            } else if (tmp_ == 45) {
                return after_e || i == 0 && !prefix;
            } else if (tmp_ == 43) {
                return after_e;
            } else if (tmp_ == 46) {
                after_e = false;
                return !has_dot && !has_x && !has_e ? has_dot = true : false;
            }
            return is_alphanumeric_char(code);
        });
        if (prefix) {
            num = prefix + num;
        }
        valid = parse_js_number(num);
        if (!isNaN(valid)) {
            return token("num", valid);
        } else {
            parse_error("Invalid syntax: " + num);
        }
    }
    function read_escaped_char(in_string, digester) {
        var ch, tmp_;
        digester = digester || function(in_str) {
            return next(true, in_str);
        };
        ch = digester(in_string);
        tmp_ = ch.charCodeAt(0);
        if (tmp_ == 110) {
            return "\n";
        } else if (tmp_ == 114) {
            return "\r";
        } else if (tmp_ == 116) {
            return "\t";
        } else if (tmp_ == 98) {
            return "\b";
        } else if (tmp_ == 118) {
            return "";
        } else if (tmp_ == 102) {
            return "\f";
        } else if (tmp_ == 48) {
            return "\0";
        } else if (tmp_ == 120) {
            return String.fromCharCode(hex_bytes(2, digester));
        } else if (tmp_ == 117) {
            return String.fromCharCode(hex_bytes(4, digester));
        } else if (tmp_ == 10) {
            return "";
        } else {
            return ch;
        }
    }
    function hex_bytes(n, digester) {
        var digit, num, i;
        num = 0;
        for (i = 0; i < n; i++) {
            digit = parseInt(digester(), 16);
            if (isNaN(digit)) {
                parse_error("Invalid hex-character pattern in string");
            }
            num = num << 4 | digit;
        }
        return num;
    }
    read_string = with_eof_error("Unterminated string constant", function() {
        var quote, i, tmp, octal_len, first, ch, ret;
        quote = next();
        ret = "";
        if (peek() == quote) {
            next(true);
            if (peek() == quote) {
                next(true);
                i = find(quote + quote + quote, true);
                if (i != -1) {
                    tmp = S.text.substring(S.pos, i);
                    S.pos = i + 3;
                    while (tmp.length) {
                        if (tmp[0] == "\\") {
                            tmp = tmp.substr(1);
                            ret += read_escaped_char(true, function() {
                                var ch;
                                ch = tmp[0];
                                tmp = tmp.substr(1);
                                return ch;
                            });
                        } else {
                            ret += tmp[0];
                            tmp = tmp.substr(1);
                        }
                    }
                    S.line += ret.match(/\n/g).length;
                    return token("string", ret);
                }
            } else {
                return token("string", "");
            }
        }
        while (true) {
            ch = next(true);
            if (ch == "\n") {
                parse_error("End of line while scanning string literal.");
            }
            if (ch == "\\") {
                octal_len = 0;
                first = null;
                ch = read_while(function(ch) {
                    if (ch >= "0" && ch <= "7") {
                        if (!first) {
                            first = ch;
                            return octal_len += 1;
                        } else if (first <= "3" && octal_len <= 2) {
                            return octal_len += 1;
                        } else if (first >= "4" && octal_len <= 1) {
                            return octal_len += 1;
                        }
                    }
                    return false;
                });
                if (octal_len > 0) {
                    ch = String.fromCharCode(parseInt(ch, 8));
                } else if (peek() == "\n") {
                    next(true);
                    continue;
                } else {
                    ch = read_escaped_char(true);
                }
            } else if (ch == quote) {
                break;
            }
            ret += ch;
        }
        return token("string", ret);
    });
    function read_line_comment() {
        var i, ret;
        next();
        i = find("\n");
        if (i == -1) {
            ret = S.text.substr(S.pos);
            S.pos = S.text.length;
        } else {
            ret = S.text.substring(S.pos, i);
            S.pos = i;
        }
        return token("comment1", ret, true);
    }
    read_multiline_comment = with_eof_error("Unterminated multiline comment", function() {
        var i, text, a, n;
        next();
        i = find("*/", true);
        text = S.text.substring(S.pos, i);
        a = text.split("\n");
        n = a.length;
        S.pos = i + 2;
        S.line += n - 1;
        if (n > 1) {
            S.col = a[n - 1].length;
        } else {
            S.col += a[n - 1].length;
        }
        S.col += 2;
        S.newline_before = S.newline_before || text.indexOf("\n") >= 0;
        return token("comment2", text, true);
    });
    function read_name() {
        var escaped, ch, backslash, hex, name;
        backslash = false;
        name = "";
        escaped = false;
        while ((ch = peek()) != null) {
            if (!backslash) {
                if (ch == "\\") {
                    if (S.text.charAt(S.pos + 1) == "\n") {
                        S.pos += 2;
                        continue;
                    } else {
                        escaped = [backslash = true, next()];
                    }
                } else if (is_identifier_char(ch)) {
                    name += next();
                } else {
                    break;
                }
            } else {
                if (ch != "u") {
                    parse_error("Expecting UnicodeEscapeSequence -- uXXXX");
                }
                ch = read_escaped_char();
                if (!is_identifier_char(ch)) {
                    parse_error("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                }
                name += ch;
                backslash = false;
            }
        }
        if (KEYWORDS(name) && escaped) {
            hex = name.charCodeAt(0).toString(16).toUpperCase();
            name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
        }
        return name;
    }
    read_regexp = with_eof_error("Unterminated regular expression", function(regexp) {
        var in_class, prev_backslash, mods;
        prev_backslash = false;
        in_class = false;
        while (ch = next(true)) {
            if (prev_backslash) {
                regexp += "\\" + ch;
                prev_backslash = false;
            } else if (ch == "[") {
                in_class = true;
                regexp += ch;
            } else if (ch == "]" && in_class) {
                in_class = false;
                regexp += ch;
            } else if (ch == "/" && !in_class) {
                break;
            } else if (ch == "\\") {
                prev_backslash = true;
            } else {
                regexp += ch;
            }
        }
        mods = read_name();
        return token("regexp", new RegExp(regexp, mods));
    });
    function read_operator(prefix) {
        function grow(op) {
            var bigger;
            if (!peek()) {
                return op;
            }
            bigger = op + peek();
            if (OPERATORS(bigger)) {
                next();
                return grow(bigger);
            } else {
                return op;
            }
        }
        return token("operator", grow(prefix || next()));
    }
    function handle_slash() {
        var regex_allowed, tmp_;
        next();
        regex_allowed = S.regex_allowed;
        tmp_ = peek();
        if (tmp_ == "/") {
            S.comments_before.push(read_line_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
        } else if (tmp_ == "*") {
            S.comments_before.push(read_multiline_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
        }
        return S.regex_allowed ? read_regexp("") : read_operator("/");
    }
    function handle_dot() {
        next();
        return is_digit(peek().charCodeAt(0)) ? read_num(".") : token("punc", ".");
    }
    function read_word() {
        var word;
        word = read_name();
        return KEYWORDS_ATOM(word) ? token("atom", word) : !KEYWORDS(word) ? token("name", word) : OPERATORS(word) && prevChar() != "." ? token("operator", word) : token("keyword", word);
    }
    function with_eof_error(eof_error, cont) {
        return function(x) {
            try {
                return cont(x);
            } catch (_$rapyd$_Exception) {
                var ex = _$rapyd$_Exception;
                if (ex === EX_EOF) {
                    parse_error(eof_error);
                } else {
                    throw _$rapyd$_Exception;
                }
            }
        };
    }
    function next_token(force_regexp) {
        var indent, ch, code, tmp_, regex_allowed;
        if (force_regexp != null) {
            return read_regexp(force_regexp);
        }
        indent = parse_whitespace();
        if (indent == -1) {
            return token("punc", "}", false, true);
        }
        start_token();
        ch = peek();
        if (!ch) {
            return token("eof");
        }
        code = ch.charCodeAt(0);
        tmp_ = code;
        if (tmp_ == 34 || tmp_ == 39) {
            return read_string();
        } else if (tmp_ == 35) {
            regex_allowed = S.regex_allowed;
            S.comments_before.push(read_line_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
        } else if (tmp_ == 46) {
            return handle_dot();
        } else if (tmp_ == 47) {
            return handle_slash();
        }
        if (is_digit(code)) {
            return read_num();
        }
        if (PUNC_CHARS(ch)) {
            return token("punc", next());
        }
        if (OPERATOR_CHARS(ch)) {
            return read_operator();
        }
        if (code == 92 && S.text.charAt(S.pos + 1) == "\n") {
            next();
            next();
            S.newline_before = false;
            return next_token();
        }
        if (code == 92 || is_identifier_start(code)) {
            return read_word();
        }
        parse_error("Unexpected character «" + ch + "»");
    }
    next_token.context = function(nc) {
        if (nc) {
            S = nc;
        }
        return S;
    };
    return next_token;
}
UNARY_PREFIX = makePredicate([ "typeof", "void", "delete", "--", "++", "!", "~", "-", "+", "@" ]);
UNARY_POSTFIX = makePredicate([ "--", "++" ]);
ASSIGNMENT = makePredicate([ "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);
PRECEDENCE = function(a, ret) {
    var b, j, i;
    for (i = 0; i < a.length; i++) {
        b = a[i];
        for (j = 0; j < b.length; j++) {
            ret[b[j]] = i + 1;
        }
    }
    return ret;
}.call(this, [ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "%" ] ], {});
STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);
ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);
function parse($TEXT, options) {
    var S, statement, find_module_realpath, read_module_contents, import_, from_import_, require_, ModuleTreeNode, module_, class_, function_, nonlocal_, const_, new_, expr_atom, array_, object_, subscripts, maybe_unary, expr_op, maybe_conditional, maybe_assign, expression;
    options = defaults(options, {
        strict: false,
        filename: null,
        auto_bind: false,
        toplevel: null
    });
    S = {
        input: typeof $TEXT == "string" ? tokenizer($TEXT, options.filename) : $TEXT,
        token: null,
        prev: null,
        peeked: null,
        in_function: 0,
        in_directives: true,
        in_loop: 0,
        in_class: [ false ],
        classes: [ {} ],
        labels: [],
        decorators: [],
        module_tree: {},
        module_stack: []
    };
    S.token = next();
    function is_(type, value) {
        return is_token(S.token, type, value);
    }
    function peek() {
        return S.peeked || (S.peeked = S.input());
    }
    function next() {
        S.prev = S.token;
        if (S.peeked) {
            S.token = S.peeked;
            S.peeked = null;
        } else {
            S.token = S.input();
        }
        S.in_directives = S.in_directives && (S.token.type == "string" || is_("punc", ";"));
        return S.token;
    }
    function prev() {
        return S.prev;
    }
    function croak(msg, line, col, pos) {
        var ctx;
        ctx = S.input.context();
        js_error(msg, ctx.filename, line != null ? line : ctx.tokline, col != null ? col : ctx.tokcol, pos != null ? pos : ctx.tokpos);
    }
    function token_error(token, msg) {
        croak(msg, token.line, token.col);
    }
    function unexpected(token) {
        if (token == null) {
            token = S.token;
        }
        token_error(token, "Unexpected token: " + token.type + " «" + token.value + "»");
    }
    function expect_token(type, val) {
        if (is_(type, val)) {
            return next();
        }
        token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
    }
    function expect(punc) {
        return expect_token("punc", punc);
    }
    function can_insert_semicolon() {
        return !options.strict && (S.token.nlb || is_("eof") || is_("punc", "}"));
    }
    function semicolon() {
        if (is_("punc", ";")) {
            next();
            S.token.nlb = true;
        }
    }
    function parenthesised() {
        var exp;
        expect("(");
        exp = expression(true);
        expect(")");
        return exp;
    }
    function embed_tokens(parser) {
        return function() {
            var start, expr, end;
            start = S.token;
            expr = parser();
            end = prev();
            expr.start = start;
            expr.end = end;
            return expr;
        };
    }
    function scan_for_local_vars(body, is_module) {
        var stmt, vars;
        vars = [];
        if (body instanceof Array) {
            for (stmt in body) {
                if (body[stmt] instanceof AST_Scope) {
                    if (is_module && body[stmt].name) {
                        vars.push(body[stmt].name);
                    }
                    continue;
                }
                [ "body", "alternative" ].forEach(function(option) {
                    var opt;
                    opt = body[stmt][option];
                    if (opt) {
                        vars = vars.concat(scan_for_local_vars(opt, is_module));
                    }
                    if (opt && opt.operator == "=" && !(opt.right instanceof AST_Scope)) {
                        vars = vars.concat(scan_for_local_vars(opt.right, is_module));
                    }
                });
                if (!is_module) {
                    if (body[stmt] instanceof AST_ForIn) {
                        if (body[stmt].init instanceof AST_Array) {
                            vars.push("_$rapyd$_Unpack");
                            body[stmt].init.elements.forEach(function(elem) {
                                if (vars.indexOf(elem.name) == -1) {
                                    vars.push(elem.name);
                                }
                            });
                        } else if (vars.indexOf(body[stmt].init.name) == -1) {
                            vars.push(body[stmt].init.name);
                        }
                    } else if (body[stmt] instanceof AST_DWLoop) {
                        vars = vars.concat(scan_for_local_vars(body[stmt], is_module));
                    }
                }
            }
        } else if (body && body.body) {
            vars = vars.concat(scan_for_local_vars(body.body, is_module));
            if (body.alternative) {
                vars = vars.concat(scan_for_local_vars(body.alternative, is_module));
            }
        } else if (body instanceof AST_Assign) {
            if (body.left instanceof AST_Array) {
                vars.push("_$rapyd$_Unpack");
                body.left.elements.forEach(function(elem) {
                    if (!(elem instanceof AST_PropAccess) && vars.indexOf(elem.name) == -1) {
                        vars.push(elem.name);
                    }
                });
            } else if (body.left.name && vars.indexOf(body.left.name) == -1) {
                vars.push(body.left.name);
            }
        }
        return vars;
    }
    function scan_for_nonlocal_defs(body) {
        var stmt, vars;
        vars = [];
        if (body instanceof Array) {
            for (stmt in body) {
                if (body[stmt] instanceof AST_Scope) {
                    continue;
                }
                if (body[stmt] instanceof AST_Definitions) {
                    body[stmt].definitions.forEach(function(vardef) {
                        vars.push(vardef.name.name);
                    });
                }
                [ "body", "alternative" ].forEach(function(option) {
                    var opt;
                    opt = body[stmt][option];
                    if (opt) {
                        vars = vars.concat(scan_for_nonlocal_defs(opt));
                    }
                });
            }
        } else if (body.body) {
            vars = vars.concat(scan_for_nonlocal_defs(body.body));
            if (body.alternative) {
                vars = vars.concat(scan_for_nonlocal_defs(body.alternative));
            }
        }
        return vars;
    }
    function finalize_import(imp) {
        var classes, c, key;
        if (imp.body) {
            classes = scan_for_classes(imp.body.body);
            for (c in classes) {
                if (classes[c] instanceof ModuleTreeNode) {
                    S.module_tree[c] = classes[c];
                } else {
                    S.classes[0][c] = classes[c];
                }
            }
        }
        key = "";
        while (imp instanceof AST_Dot) {
            key = "." + imp.property + key;
            imp = imp.expression;
        }
        key = imp.name + key;
        IMPORTED[key] = true;
        return imp;
    }
    statement = embed_tokens(function() {
        var dir, stat, tmp_, start, func, chain, tmp;
        if (is_("operator", "/") || is_("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.substr(1));
        }
        tmp_ = S.token.type;
        if (tmp_ == "string") {
            dir = S.in_directives;
            stat = simple_statement();
            if (dir && stat.body instanceof AST_String && !is_("punc", ",")) {
                return new AST_Directive({
                    value: stat.body.value
                });
            }
            return stat;
        } else if (tmp_ == "num" || tmp_ == "regexp" || tmp_ == "operator" || tmp_ == "atom") {
            return simple_statement();
        } else if (tmp_ == "punc") {
            tmp_ = S.token.value;
            if (tmp_ == ":") {
                return new AST_BlockStatement({
                    start: S.token,
                    body: block_(),
                    end: prev()
                });
            } else if (tmp_ == "{" || tmp_ == "[" || tmp_ == "(") {
                return simple_statement();
            } else if (tmp_ == ";") {
                next();
                return new AST_EmptyStatement();
            } else {
                unexpected();
            }
        } else if (tmp_ == "name") {
            return is_token(peek(), "punc", ":") ? labeled_statement() : simple_statement();
        } else if (tmp_ == "keyword") {
            tmp_ = S.token.value;
            next();
            if (tmp_ == "break") {
                return break_cont(AST_Break);
            } else if (tmp_ == "continue") {
                return break_cont(AST_Continue);
            } else if (tmp_ == "debugger") {
                semicolon();
                return new AST_Debugger();
            } else if (tmp_ == "do") {
                return new AST_Do({
                    body: in_loop(statement),
                    condition: function() {
                        var tmp;
                        expect(".");
                        expect_token("keyword", "while");
                        tmp = expression(true);
                        semicolon();
                        return tmp;
                    }.call(this)
                });
            } else if (tmp_ == "while") {
                return new AST_While({
                    condition: expression(true),
                    body: in_loop(statement)
                });
            } else if (tmp_ == "for") {
                return for_();
            } else if (tmp_ == "from") {
                return finalize_import(from_import_());
            } else if (tmp_ == "import") {
                return finalize_import(import_());
            } else if (tmp_ == "require") {
                return require_();
            } else if (tmp_ == "class") {
                BASELIB["extends"] = true;
                if (options.auto_bind) {
                    BASELIB["rebind_all"] = true;
                }
                return class_();
            } else if (tmp_ == "module") {
                return module_();
            } else if (tmp_ == "def") {
                start = prev();
                func = function_(S.in_class.slice(-1)[0]);
                func.start = start;
                func.end = prev();
                chain = subscripts(func, true);
                if (chain == func) {
                    return func;
                } else {
                    return new AST_SimpleStatement({
                        start: start,
                        body: chain,
                        end: prev()
                    });
                }
            } else if (tmp_ == "if") {
                return if_();
            } else if (tmp_ == "pass") {
                semicolon();
                return new AST_EmptyStatement();
            } else if (tmp_ == "return") {
                if (S.in_function == 0) {
                    croak("'return' outside of function");
                }
                return new AST_Return({
                    value: is_("punc", ";") ? function() {
                        semicolon();
                        return null;
                    }.call(this) : can_insert_semicolon() ? null : function() {
                        var tmp;
                        tmp = expression(true);
                        semicolon();
                        return tmp;
                    }.call(this)
                });
            } else if (tmp_ == "switch") {
                return new AST_Switch({
                    expression: parenthesised(),
                    body: in_loop(switch_body_)
                });
            } else if (tmp_ == "raise") {
                if (S.token.nlb) {
                    return new AST_Throw({
                        value: new AST_SymbolCatch({
                            name: "_$rapyd$_Exception"
                        })
                    });
                }
                tmp = expression(true);
                semicolon();
                return new AST_Throw({
                    value: tmp
                });
            } else if (tmp_ == "try") {
                return try_();
            } else if (tmp_ == "nonlocal") {
                tmp = nonlocal_();
                semicolon();
                return tmp;
            } else if (tmp_ == "const") {
                tmp = const_();
                semicolon();
                return tmp;
            } else if (tmp_ == "with") {
                return new AST_With({
                    expression: parenthesised(),
                    body: statement()
                });
            } else {
                unexpected();
            }
        }
    });
    function labeled_statement() {
        var label, stat;
        label = as_symbol(AST_Label);
        if (find_if(function(l) {
            return l.name == label.name;
        }, S.labels)) {
            croak("Label " + label.name + " defined twice");
        }
        expect(":");
        S.labels.push(label);
        stat = statement();
        S.labels.pop();
        return new AST_LabeledStatement({
            body: stat,
            label: label
        });
    }
    function simple_statement(tmp) {
        tmp = expression(true);
        semicolon();
        return new AST_SimpleStatement({
            body: tmp
        });
    }
    function break_cont(type) {
        var label;
        label = null;
        if (!can_insert_semicolon()) {
            label = as_symbol(AST_LabelRef, true);
        }
        if (label != null) {
            if (!find_if(function(l) {
                return l.name == label.name;
            }, S.labels)) {
                croak("Undefined label " + label.name);
            }
        } else if (S.in_loop == 0) {
            croak(type.TYPE + " not inside a loop or switch");
        }
        semicolon();
        return new type({
            label: label
        });
    }
    function for_(list_comp) {
        var tmp, iter, init;
        init = null;
        if (!is_("punc", ";")) {
            init = expression(true, true);
            if (init instanceof AST_Seq) {
                tmp = [];
                iter = init;
                while (iter && iter.car) {
                    tmp.push(iter.car);
                    iter = iter.cdr;
                }
                tmp.push(iter);
                init = new AST_Array({
                    start: init.start,
                    elements: tmp,
                    end: init.end
                });
            }
            if (is_("operator", "in")) {
                if (init instanceof AST_Var && init.definitions.length > 1) {
                    croak("Only one variable declaration allowed in for..in loop");
                }
                next();
                return for_in(init, list_comp);
            }
        }
        unexpected();
    }
    function for_in(init, list_comp) {
        var lhs, obj;
        lhs = init instanceof AST_Var ? init.definitions[0].name : null;
        obj = expression(true);
        if (list_comp) {
            return {
                init: init,
                name: lhs,
                object: obj
            };
        }
        return new AST_ForIn({
            init: init,
            name: lhs,
            object: obj,
            body: in_loop(statement)
        });
    }
    function scan_for_classes(body) {
        var classes, stmt, i;
        classes = new ModuleTreeNode();
        for (i in body) {
            stmt = body[i];
            if (stmt instanceof AST_Class) {
                classes[stmt.name.name] = {
                    "static": stmt.static,
                    bound: stmt.bound
                };
            } else if (stmt instanceof AST_Module) {
                classes[stmt.name.name] = scan_for_classes(stmt.body);
            }
        }
        return classes;
    }
    function get_class_in_scope(expr) {
        var s, referenced_path, current_scope, traversed_path, visible_scope;
        if (expr instanceof AST_SymbolRef) {
            if (NATIVE_CLASSES.hasOwnProperty(expr.name)) {
                return NATIVE_CLASSES[expr.name];
            }
            for (s = S.classes.length - 1; s > -1; s--) {
                if (S.classes[s].hasOwnProperty(expr.name)) {
                    return S.classes[s][expr.name];
                }
            }
        } else if (expr instanceof AST_Dot) {
            referenced_path = [];
            while (expr instanceof AST_Dot) {
                referenced_path.unshift(expr.property);
                expr = expr.expression;
            }
            if (expr instanceof AST_SymbolRef) {
                referenced_path.unshift(expr.name);
                current_scope = S.module_stack.slice();
                current_scope.unshift("");
                while (current_scope.length) {
                    visible_scope = S.module_tree;
                    current_scope.forEach(function(module__) {
                        if (_$rapyd$_in(module__, visible_scope)) {
                            visible_scope = visible_scope[module__];
                        }
                    });
                    traversed_path = referenced_path.slice();
                    while (traversed_path && visible_scope[traversed_path[0]]) {
                        visible_scope = visible_scope[traversed_path[0]];
                        traversed_path.shift();
                    }
                    if (!traversed_path.length) {
                        if (!(visible_scope instanceof ModuleTreeNode)) {
                            return visible_scope;
                        } else {
                            return false;
                        }
                    }
                    current_scope.pop();
                }
            }
        }
        return false;
    }
    function module_pathname(name) {
        var is_rel_path, file_, path;
        file_ = "";
        is_rel_path = false;
        if (name instanceof AST_Dot && name.property == ".") {
            is_rel_path = true;
            name = name.expression;
        }
        while (name instanceof AST_Dot) {
            file_ = "/" + name.property + file_;
            name = name.expression;
        }
        path = name.name + file_;
        return is_rel_path ? "./" + path : path;
    }
    find_module_realpath = function(name) {
        var module_dir, path, search_paths, stats, init_file, fullpath;
        if (_$rapyd$_in(name, options.js_imports)) {
            return {
                "dirname": "",
                "path": name
            };
        }
        if (name.indexOf("./") == 0) {
            module_dir = dirname(options.filename);
            path = name.replace("./", module_dir + "/");
            return {
                "dirname": "",
                "path": path
            };
        }
        search_paths = options.search_paths;
        var _$rapyd$_Iter0 = search_paths;
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            path = _$rapyd$_Iter0[_$rapyd$_Index0];
            fullpath = path + "/" + name;
            if (options.fs.existsSync(fullpath + options.ext)) {
                return {
                    "dirname": path,
                    "path": name
                };
            }
            if (!options.fs.existsSync(fullpath)) {
                continue;
            }
            stats = options.fs.statSync(fullpath);
            init_file = fullpath + "/__init__";
            if (stats.isDirectory && options.fs.existsSync(init_file + options.ext)) {
                return {
                    "dirname": path,
                    "path": name + "/__init__"
                };
            } else {
                throw new Error("Cannot import __init__ for package: " + name);
            }
        }
        if (!options.amd) {
            fullpath = options.basedir + "/" + name;
            if (options.fs.existsSync(fullpath + options.ext)) {
                return {
                    "dirname": options.basedir,
                    "path": name
                };
            }
        }
        throw new Error("Cannot import: " + name);
    };
    read_module_contents = function(fullpath) {
        var options_;
        fullpath = fullpath["dirname"] + "/" + fullpath["path"];
        options_ = {
            filename: fullpath,
            toplevel: null,
            readfile: options.readfile,
            fs: options.fs,
            basedir: options.basedir,
            ext: options.ext,
            amd: options.amd,
            js_imports: options.js_imports,
            search_paths: options.search_paths
        };
        return parse(options.readfile(fullpath + options.ext, "utf-8"), options_);
    };
    import_ = function() {
        var name, path, fullpath, contents;
        name = expression(false);
        path = module_pathname(name);
        contents = null;
        fullpath = find_module_realpath(path);
        if (!options.amd) {
            contents = read_module_contents(fullpath);
        }
        return new AST_Import({
            "module": name,
            dirname: fullpath["dirname"],
            path: fullpath["path"],
            argnames: null,
            body: contents,
            variables: function() {
                return scan_for_local_vars(contents, true).filter(function(element, index, arr) {
                    return arr.lastIndexOf(element) === index;
                });
            }.call(this)
        });
    };
    from_import_ = function() {
        var name, path, fullpath, body;
        name = expression(false);
        expect_token("keyword", "import");
        path = module_pathname(name);
        body = null;
        fullpath = find_module_realpath(path);
        if (!options.amd) {
            body = read_module_contents(fullpath);
        }
        return new AST_Import({
            "module": name,
            dirname: fullpath["dirname"],
            path: fullpath["path"],
            body: body,
            argnames: function(a) {
                a.push(as_symbol(AST_SymbolVar));
                while (is_("punc", ",")) {
                    next();
                    a.push(as_symbol(AST_SymbolVar));
                }
                return a;
            }.call(this, [])
        });
    };
    require_ = function() {
        var next_node, node, as_name, path;
        next_node = peek();
        node = expression(false);
        if (!(node instanceof AST_String)) {
            unexpected(node);
        }
        as_name = null;
        if (next_node.type === "keyword" && next_node.value === "as") {
            next();
            as_name = as_symbol(AST_SymbolVar);
        }
        path = node.value;
        return new AST_Import({
            "module": node,
            path: path,
            "as": as_name ? as_name : node
        });
    };
    ModuleTreeNode = function() {
    };
    module_ = function(use_name) {
        var name, definition;
        name = use_name ? use_name : as_symbol(AST_SymbolDefun);
        if (!name) {
            unexpected();
        }
        definition = new AST_Module({
            name: name,
            body: function() {
                var module_tree, a;
                module_tree = S.module_tree;
                S.module_stack.forEach(function(module__) {
                    module_tree = module_tree[module__];
                });
                module_tree[name.name] = new ModuleTreeNode();
                S.module_stack.push(name.name);
                a = block_();
                S.module_stack.pop();
                return a;
            }.call(this),
            external: reserved_decorator(S, "external"),
            decorators: function() {
                var d;
                d = [];
                S.decorators.forEach(function(decorator) {
                    d.push(new AST_Decorator({
                        name: decorator
                    }));
                });
                S.decorators = [];
                return d;
            }.call(this),
            variables: [],
            localvars: []
        });
        definition.variables = scan_for_local_vars(definition.body, true).filter(function(element, index, arr) {
            return arr.lastIndexOf(element) === index;
        });
        definition.localvars = scan_for_local_vars(definition.body, false).filter(function(element, index, arr) {
            return arr.lastIndexOf(element) === index;
        }).map(function(element) {
            return new_symbol(AST_SymbolVar, element);
        });
        return definition;
    };
    class_ = function() {
        var name, class_details, definition, stmt, i;
        name = as_symbol(AST_SymbolDefun);
        if (!name) {
            unexpected();
        }
        class_details = {
            "static": [],
            bound: {}
        };
        definition = new AST_Class({
            name: name,
            parent: function() {
                var a;
                if (is_("punc", "(")) {
                    next();
                    a = expr_atom(false);
                    expect(")");
                    return a;
                } else {
                    return null;
                }
            }.call(this),
            modules: S.module_stack.slice(),
            localvars: [],
            "static": class_details.static,
            external: reserved_decorator(S, "external"),
            "public": reserved_decorator(S, "public"),
            bound: class_details.bound,
            decorators: function() {
                var d;
                d = [];
                S.decorators.forEach(function(decorator) {
                    d.push(new AST_Decorator({
                        name: decorator
                    }));
                });
                S.decorators = [];
                return d;
            }.call(this),
            body: function(loop, labels) {
                var module_tree, a;
                module_tree = S.module_tree;
                S.module_stack.forEach(function(module__) {
                    module_tree = module_tree[module__];
                });
                module_tree[name.name] = class_details;
                S.in_class.push(name.name);
                S.classes[S.classes.length - 1][name.name] = class_details;
                S.classes.push({});
                S.in_function += 1;
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                a = block_();
                S.in_function -= 1;
                S.classes.pop();
                S.in_class.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            }.call(this, S.in_loop, S.labels)
        });
        for (i in definition.body) {
            stmt = definition.body[i];
            if (stmt instanceof AST_Method && stmt.name.name == "__init__") {
                definition.init = stmt;
                break;
            }
        }
        return definition;
    };
    function_ = function(in_class, ctor) {
        var is_accessor, name, is_public, staticmethod, definition, assignments, j, i, nonlocals;
        is_accessor = ctor === AST_Accessor;
        name = is_("name") ? as_symbol(in_class ? AST_SymbolDefun : is_accessor ? AST_SymbolAccessor : AST_SymbolLambda) : is_accessor && (is_("string") || is_("num")) ? as_atom_node() : null;
        if (in_class && !name) {
            unexpected();
        }
        staticmethod = false;
        is_public = reserved_decorator(S, "public");
        if (in_class) {
            staticmethod = reserved_decorator(S, "staticmethod");
            if (staticmethod) {
                S.classes[S.classes.length - 2][in_class].static.push(name.name);
            } else if (name.name != "__init__" && options.auto_bind) {
                BASELIB["bind"] = true;
                S.classes[S.classes.length - 2][in_class].bound[name.name] = true;
            }
        }
        expect("(");
        if (!ctor) {
            ctor = in_class ? AST_Method : AST_Function;
        }
        definition = new ctor({
            name: name,
            argnames: function(a) {
                var defaults, first, val;
                defaults = {};
                first = true;
                while (!is_("punc", ")")) {
                    if (first) {
                        first = false;
                    } else {
                        expect(",");
                    }
                    if (a.starargs) {
                        token_error(prev(), "Can't define multiple *args in function definition");
                    } else if (is_("operator", "*")) {
                        next();
                        a.starargs = as_symbol(AST_SymbolFunarg);
                    } else {
                        a.push(as_symbol(AST_SymbolFunarg));
                        if (is_("operator", "=")) {
                            val = prev().value;
                            next();
                            defaults[val] = expression(false);
                        }
                    }
                }
                next();
                a.defaults = defaults;
                return a;
            }.call(this, []),
            localvars: [],
            decorators: function() {
                var d;
                d = [];
                S.decorators.forEach(function(decorator) {
                    d.push(new AST_Decorator({
                        name: decorator
                    }));
                });
                S.decorators = [];
                return d;
            }.call(this),
            body: function(loop, labels) {
                var a;
                S.in_class.push(false);
                S.classes.push({});
                S.in_function += 1;
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                a = block_();
                S.in_function -= 1;
                S.classes.pop();
                S.in_class.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            }.call(this, S.in_loop, S.labels)
        });
        if (definition instanceof AST_Method) {
            definition.static = staticmethod;
        }
        if (definition instanceof AST_Function) {
            definition.public = is_public;
        }
        assignments = scan_for_local_vars(definition.body, false).filter(function(element, index, arr) {
            return arr.lastIndexOf(element) === index;
        });
        for (i = 0; i < assignments.length; i++) {
            for (j = 0; j < definition.argnames.length + 1; j++) {
                if (j == definition.argnames.length) {
                    definition.localvars.push(new_symbol(AST_SymbolVar, assignments[i]));
                } else if (j < definition.argnames.length && assignments[i] == definition.argnames[j].name) {
                    break;
                }
            }
        }
        nonlocals = scan_for_nonlocal_defs(definition.body);
        nonlocals.forEach(function(variable) {
            var i;
            var _$rapyd$_Iter1 = dir(definition.localvars).reverse();
            for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
                i = _$rapyd$_Iter1[_$rapyd$_Index1];
                if (definition.localvars[i].name == variable) {
                    definition.localvars.splice(i, 1);
                }
            }
        });
        return definition;
    };
    function if_() {
        var cond, body, belse;
        cond = expression(true);
        body = statement();
        belse = null;
        if (is_("keyword", "elif") || is_("keyword", "else")) {
            if (is_("keyword", "else")) {
                next();
            } else {
                S.token.value = "if";
            }
            belse = statement();
        }
        return new AST_If({
            condition: cond,
            body: body,
            alternative: belse
        });
    }
    function block_() {
        var a;
        expect(":");
        a = [];
        if (!S.token.nlb) {
            while (!S.token.nlb) {
                if (is_("eof")) {
                    unexpected();
                }
                a.push(statement());
            }
        } else {
            while (!is_("punc", "}")) {
                if (is_("eof")) {
                    return a;
                }
                a.push(statement());
            }
            next();
        }
        return a;
    }
    function switch_body_() {
        var a, cur, branch;
        expect("{");
        a = [];
        cur = null;
        branch = null;
        while (!is_("punc", "}")) {
            if (is_("eof")) {
                unexpected();
            }
            if (is_("keyword", "case")) {
                if (branch) {
                    branch.end = prev();
                }
                cur = [];
                branch = new AST_Case({
                    start: tmp = [S.token, next(), tmp],
                    expression: expression(true),
                    body: cur
                });
                a.push(branch);
                expect(":");
            } else if (is_("keyword", "default")) {
                if (branch) {
                    branch.end = prev();
                }
                cur = [];
                branch = new AST_Default({
                    start: tmp = [S.token, next(), expect(":"), tmp],
                    body: cur
                });
                a.push(branch);
            } else {
                if (!cur) {
                    unexpected();
                }
                cur.push(statement());
            }
        }
        if (branch) {
            branch.end = prev();
        }
        next();
        return a;
    }
    function try_() {
        var body, bcatch, exceptions, name, start, bfinally;
        body = block_();
        bcatch = [];
        bfinally = null;
        while (is_("keyword", "except")) {
            start = S.token;
            next();
            exceptions = [];
            if (!is_("punc", ":") && !is_("keyword", "as")) {
                exceptions.push(as_symbol(AST_SymbolVar));
                while (is_("punc", ",")) {
                    next();
                    exceptions.push(as_symbol(AST_SymbolVar));
                }
            }
            name = null;
            if (is_("keyword", "as")) {
                next();
                name = as_symbol(AST_SymbolCatch);
            }
            bcatch.push(new AST_Except({
                start: start,
                argname: name,
                errors: exceptions,
                body: block_(),
                end: prev()
            }));
        }
        if (is_("keyword", "finally")) {
            start = S.token;
            next();
            bfinally = new AST_Finally({
                start: start,
                body: block_(),
                end: prev()
            });
        }
        if (!bcatch.length && !bfinally) {
            croak("Missing except/finally blocks");
        }
        return new AST_Try({
            body: body,
            bcatch: bcatch.length ? new AST_Catch({
                body: bcatch
            }) : null,
            bfinally: bfinally
        });
    }
    function vardefs(no_in, in_const) {
        var a;
        a = [];
        while (true) {
            a.push(new AST_VarDef({
                start: S.token,
                name: as_symbol(in_const ? AST_SymbolConst : AST_SymbolVar),
                value: is_("operator", "=") ? (next(), expression(false, no_in)) : null,
                end: prev()
            }));
            if (!is_("punc", ",")) {
                break;
            }
            next();
        }
        return a;
    }
    function new_vardefs(no_in, in_const) {
        var a;
        a = [];
        while (true) {
            a.push(new AST_VarDef({
                start: S.token,
                name: new_symbol(in_const ? AST_SymbolConst : AST_SymbolVar),
                value: is_("operator", "=") ? (next(), expression(false, no_in)) : null,
                end: prev()
            }));
            if (!is_("punc", ",")) {
                break;
            }
            next();
        }
        return a;
    }
    nonlocal_ = function(no_in) {
        return new AST_Var({
            start: prev(),
            definitions: vardefs(no_in, false),
            end: prev()
        });
    };
    const_ = function() {
        return new AST_Const({
            start: prev(),
            definitions: vardefs(false, true),
            end: prev()
        });
    };
    new_ = function() {
        var start, newexp, args;
        start = S.token;
        expect_token("operator", "new");
        newexp = expr_atom(false);
        if (is_("punc", "(")) {
            next();
            args = expr_list(")");
        } else {
            args = [];
        }
        return subscripts(new AST_New({
            start: start,
            expression: newexp,
            args: args,
            end: prev()
        }), true);
    };
    function as_atom_node() {
        var tok, tmp_, tmp__, ret;
        tok = S.token;
        tmp_ = tok.type;
        if (tmp_ == "name") {
            return as_symbol(AST_SymbolRef);
        } else if (tmp_ == "num") {
            ret = new AST_Number({
                start: tok,
                end: tok,
                value: tok.value
            });
        } else if (tmp_ == "string") {
            ret = new AST_String({
                start: tok,
                end: tok,
                value: tok.value
            });
        } else if (tmp_ == "regexp") {
            ret = new AST_RegExp({
                start: tok,
                end: tok,
                value: tok.value
            });
        } else if (tmp_ == "atom") {
            tmp__ = tok.value;
            if (tmp__ == "False") {
                ret = new AST_False({
                    start: tok,
                    end: tok
                });
            } else if (tmp__ == "True") {
                ret = new AST_True({
                    start: tok,
                    end: tok
                });
            } else if (tmp__ == "None") {
                ret = new AST_Null({
                    start: tok,
                    end: tok
                });
            }
        }
        next();
        return ret;
    }
    expr_atom = function(allow_calls) {
        var start, tmp_, ex, dot, cls, func;
        if (is_("operator", "new")) {
            return new_();
        }
        start = S.token;
        if (is_("punc")) {
            tmp_ = start.value;
            if (tmp_ == "(") {
                next();
                ex = expression(true);
                ex.start = start;
                ex.end = S.token;
                expect(")");
                return subscripts(ex, allow_calls);
            } else if (tmp_ == "[") {
                return subscripts(array_(), allow_calls);
            } else if (tmp_ == "{") {
                return subscripts(object_(), allow_calls);
            } else if (tmp_ == "." && (S.prev.value == "from" || S.prev.value == "import")) {
                next();
                ex = expression(false);
                dot = new AST_Dot({
                    start: start,
                    expression: ex,
                    property: ".",
                    end: S.token
                });
                return dot;
            }
            unexpected();
        }
        if (is_("keyword", "class")) {
            next();
            cls = class_();
            cls.start = start;
            cls.end = prev();
            return subscripts(cls, allow_calls);
        }
        if (is_("keyword", "def")) {
            next();
            func = function_(false);
            func.start = start;
            func.end = prev();
            return subscripts(func, allow_calls);
        }
        if (ATOMIC_START_TOKEN[S.token.type]) {
            return subscripts(as_atom_node(), allow_calls);
        }
        unexpected();
    };
    function expr_list(closing, allow_trailing_comma, allow_empty, func_call) {
        var first, saw_starargs, tmp, _$rapyd$_Unpack, i, arg, a;
        first = true;
        a = [];
        saw_starargs = false;
        while (!is_("punc", closing)) {
            if (saw_starargs) {
                token_error(prev(), "*args must be the last argument in a function call");
            }
            if (first) {
                first = false;
            } else {
                expect(",");
            }
            if (allow_trailing_comma && is_("punc", closing)) {
                break;
            }
            if (is_("operator", "*") && func_call) {
                saw_starargs = true;
                next();
            }
            if (is_("punc", ",") && allow_empty) {
                a.push(new AST_Hole({
                    start: S.token,
                    end: S.token
                }));
            } else {
                a.push(expression(false));
            }
        }
        if (func_call) {
            tmp = [];
            tmp.kwargs = [];
            var _$rapyd$_Iter2 = enumerate(a);
            for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
                _$rapyd$_Unpack = _$rapyd$_Iter2[_$rapyd$_Index2];
                i = _$rapyd$_Unpack[0];
                arg = _$rapyd$_Unpack[1];
                if (arg instanceof AST_Assign) {
                    tmp.kwargs.push([ arg.left, arg.right ]);
                } else {
                    tmp.push(arg);
                }
            }
            a = tmp;
        }
        next();
        if (saw_starargs) {
            a.starargs = true;
        }
        return a;
    }
    function func_call_list() {
        return expr_list(")", false, false, true);
    }
    array_ = embed_tokens(function() {
        var expr, forloop, ret;
        expect("[");
        expr = [];
        if (!is_("punc", "]")) {
            expr.push(expression(false));
            if (is_("keyword", "for")) {
                next();
                forloop = for_(true);
                ret = new AST_ListComprehension({
                    statement: expr[0],
                    init: forloop.init,
                    name: forloop.name,
                    object: forloop.object,
                    condition: is_("punc", "]") ? null : (expect_token("keyword", "if"), expression(true))
                });
                expect("]");
                return ret;
            }
            if (is_("operator", "til")) {
                next();
                expr.push(expression(false));
                ret = subscripts(new AST_Call({
                    start: S.token,
                    expression: new AST_SymbolRef({
                        name: "range"
                    }),
                    args: expr,
                    end: prev()
                }), true);
                expect("]");
                return ret;
            } else if (is_("operator", "to")) {
                next();
                expr.push(new AST_Binary({
                    left: expression(false),
                    operator: "+",
                    right: new AST_Number({
                        value: 1
                    })
                }));
                ret = subscripts(new AST_Call({
                    start: S.token,
                    expression: new AST_SymbolRef({
                        name: "range"
                    }),
                    args: expr,
                    end: prev()
                }), true);
                expect("]");
                return ret;
            } else if (!is_("punc", "]")) {
                expect(",");
            }
        }
        return new AST_Array({
            elements: expr.concat(expr_list("]", !options.strict, true))
        });
    });
    object_ = embed_tokens(function() {
        var a, first, start, type, key, name, quoted;
        expect("{");
        first = true;
        a = [];
        while (!is_("punc", "}")) {
            if (first) {
                first = false;
            } else {
                expect(",");
            }
            if (!options.strict && is_("punc", "}")) {
                break;
            }
            start = S.token;
            type = start.type;
            key = as_property_name();
            name = key.value;
            quoted = key.type == "string" ? true : false;
            if (type == "name" && !is_("punc", ":")) {
                if (name == "get") {
                    a.push(new AST_ObjectGetter({
                        start: start,
                        key: name,
                        quoted: quoted,
                        value: function_(false, AST_Accessor),
                        end: prev()
                    }));
                    continue;
                }
                if (name == "set") {
                    a.push(new AST_ObjectSetter({
                        start: start,
                        key: name,
                        quoted: quoted,
                        value: function_(false, AST_Accessor),
                        end: prev()
                    }));
                    continue;
                }
            }
            expect(":");
            a.push(new AST_ObjectKeyVal({
                start: start,
                key: name,
                quoted: quoted,
                value: expression(false),
                end: prev()
            }));
        }
        next();
        return new AST_Object({
            properties: a
        });
    });
    function as_property_name() {
        var tmp, tmp_;
        tmp = S.token;
        next();
        tmp_ = tmp.type;
        if (tmp_ == "num" || tmp_ == "string" || tmp_ == "name" || tmp_ == "operator" || tmp_ == "keyword" || tmp_ == "atom") {
            return tmp;
        } else {
            unexpected();
        }
    }
    function as_name() {
        var tmp, tmp_;
        tmp = S.token;
        next();
        tmp_ = tmp.type;
        if (tmp_ == "name" || tmp_ == "operator" || tmp_ == "keyword" || tmp_ == "atom") {
            return tmp.value;
        } else {
            unexpected();
        }
    }
    function as_symbol(type, noerror) {
        var name, sym;
        if (!is_("name")) {
            if (!noerror) {
                croak("Name expected");
            }
            return null;
        }
        name = S.token.value;
        sym = new (name == "this" ? AST_This : type)({
            name: String(S.token.value),
            start: S.token,
            end: S.token
        });
        next();
        return sym;
    }
    function new_symbol(type, name) {
        var sym;
        sym = new (name == "this" ? AST_This : type)({
            name: String(name),
            start: null,
            end: null
        });
        return sym;
    }
    function is_static_method(cls, method) {
        if (cls.static && cls.static.indexOf(method) != -1) {
            return true;
        } else {
            return false;
        }
    }
    subscripts = function(expr, allow_calls) {
        var start, slice_bounds, is_slice, str_, ret, c, funcname, tmp_, args;
        start = expr.start;
        if (is_("punc", ".")) {
            next();
            return subscripts(new AST_Dot({
                start: start,
                expression: expr,
                property: as_name(),
                end: prev()
            }), allow_calls);
        }
        if (is_("punc", "[") && !S.token.nlb) {
            next();
            slice_bounds = [];
            is_slice = false;
            if (is_("punc", ":")) {
                slice_bounds.push(new AST_Number({
                    value: 0
                }));
            } else {
                slice_bounds.push(expression(false));
            }
            if (is_("punc", ":")) {
                is_slice = true;
                next();
                if (!is_("punc", "]")) {
                    slice_bounds.push(expression(false));
                }
            }
            expect("]");
            if (is_slice) {
                return subscripts(new AST_Call({
                    start: start,
                    expression: new AST_Dot({
                        start: start,
                        expression: expr,
                        property: "slice",
                        end: prev()
                    }),
                    args: slice_bounds,
                    end: prev()
                }), allow_calls);
            } else {
                return subscripts(new AST_Sub({
                    start: start,
                    expression: expr,
                    property: slice_bounds[0],
                    end: prev()
                }), allow_calls);
            }
        }
        if (allow_calls && is_("punc", "(") && !S.token.nlb) {
            next();
            if (expr instanceof AST_SymbolRef && expr.name == "JS") {
                str_ = expression(false);
                if (!(str_ instanceof AST_String)) {
                    token_error(prev(), "Compile-time function JS() can't process variables or expressions");
                }
                ret = new AST_Verbatim({
                    start: start,
                    value: str_.value,
                    end: prev()
                });
                expect(")");
                return ret;
            } else if (get_class_in_scope(expr)) {
                return subscripts(new AST_New({
                    start: start,
                    expression: expr,
                    args: func_call_list(),
                    end: prev()
                }), true);
            } else {
                if (expr instanceof AST_Dot) {
                    c = get_class_in_scope(expr.expression);
                }
                if (c) {
                    funcname = expr;
                    if (funcname.property == "__init__") {
                        funcname.property = "constructor";
                    }
                    return subscripts(new AST_ClassCall({
                        start: start,
                        "class": expr.expression,
                        method: funcname.property,
                        "static": is_static_method(c, funcname.property),
                        args: func_call_list(),
                        end: prev()
                    }), true);
                } else if (expr instanceof AST_SymbolRef) {
                    tmp_ = expr.name;
                    if (tmp_ == "abs" || tmp_ == "bind" || tmp_ == "rebind_all" || tmp_ == "dir" || tmp_ == "enumerate" || tmp_ == "len" || tmp_ == "mixin" || tmp_ == "print" || tmp_ == "range" || tmp_ == "reversed" || tmp_ == "getattr" || tmp_ == "setattr" || tmp_ == "hasattr") {
                        BASELIB[expr.name] = true;
                    } else if (tmp_ == "type") {
                        return new AST_UnaryPrefix({
                            start: start,
                            operator: "typeof",
                            expression: func_call_list()[0],
                            end: prev()
                        });
                    } else if (tmp_ == "isinstance") {
                        args = func_call_list();
                        return new AST_Binary({
                            start: start,
                            operator: "instanceof",
                            left: args[0],
                            right: args[1],
                            end: prev()
                        });
                    }
                }
                return subscripts(new AST_Call({
                    start: start,
                    expression: expr,
                    args: func_call_list(),
                    end: prev()
                }), true);
            }
        }
        return expr;
    };
    maybe_unary = function(allow_calls) {
        var start, t, ex, val;
        start = S.token;
        if (is_("operator") && UNARY_PREFIX(start.value)) {
            t = peek();
            next();
            if (start.value == "@") {
                if (is_("name") && (peek().value == "@" || peek().value == "def" || peek().value == "class" || peek().value == "module" || t.value == "public")) {
                    S.decorators.push(S.token.value);
                    next();
                    return new AST_EmptyStatement();
                } else {
                    unexpected();
                }
            }
            ex = make_unary(AST_UnaryPrefix, start.value, maybe_unary(allow_calls));
            ex.start = start;
            ex.end = prev();
            return ex;
        }
        val = expr_atom(allow_calls);
        while (is_("operator") && UNARY_POSTFIX(S.token.value) && !S.token.nlb) {
            val = make_unary(AST_UnaryPostfix, S.token.value, val);
            val.start = start;
            val.end = S.token;
            next();
        }
        return val;
    };
    function make_unary(ctor, op, expr) {
        if (op == "++" || op == "--") {
            croak("Invalid operator «" + op + "»");
        }
        return new ctor({
            operator: op,
            expression: expr
        });
    }
    expr_op = function(left, min_prec, no_in) {
        var not_in, op, prec, right, ret;
        op = is_("operator") ? S.token.value : null;
        not_in = false;
        if (op == "!" && peek().type == "operator" && peek().value == "in") {
            next();
            op = "in";
            not_in = true;
        }
        if (op == "in") {
            if (no_in) {
                op = null;
            } else {
                BASELIB[op] = true;
            }
        }
        prec = op != null ? PRECEDENCE[op] : null;
        if (prec != null && prec > min_prec) {
            next();
            right = expr_op(maybe_unary(true), prec, no_in);
            ret = new AST_Binary({
                start: left.start,
                left: left,
                operator: op,
                right: right,
                end: right.end
            });
            if (not_in) {
                ret = new AST_UnaryPrefix({
                    start: left.start,
                    operator: "!",
                    expression: ret,
                    end: right.end
                });
            }
            return expr_op(ret, min_prec, no_in);
        }
        return left;
    };
    function expr_ops(no_in) {
        return expr_op(maybe_unary(true), 0, no_in);
    }
    maybe_conditional = function(no_in) {
        var start, expr, yes;
        start = S.token;
        expr = expr_ops(no_in);
        if (is_("operator", "?")) {
            next();
            yes = expression(false);
            expect(":");
            return new AST_Conditional({
                start: start,
                condition: expr,
                consequent: yes,
                alternative: expression(false, no_in),
                end: peek()
            });
        }
        return expr;
    };
    function is_assignable(expr) {
        var tmp_;
        if (!options.strict) {
            return true;
        }
        tmp_ = expr[0] + "";
        if (tmp_ == "dot" || tmp_ == "sub" || tmp_ == "new" || tmp_ == "call") {
            return true;
        } else if (tmp_ == "name") {
            return expr[1] != "this";
        }
    }
    maybe_assign = function(no_in) {
        var start, is_public, left, val;
        start = S.token;
        is_public = reserved_decorator(S, "public");
        left = maybe_conditional(no_in);
        left.public = is_public;
        val = S.token.value;
        if (is_("operator") && ASSIGNMENT(val)) {
            if (is_assignable(left)) {
                next();
                return new AST_Assign({
                    start: start,
                    left: left,
                    operator: val,
                    right: maybe_assign(no_in),
                    end: prev()
                });
            }
            croak("Invalid assignment");
        }
        return left;
    };
    expression = function(commas, no_in) {
        var start, left, right, expr;
        start = S.token;
        expr = maybe_assign(no_in);
        if (commas) {
            left = [ expr ];
            right = [];
            while (is_("punc", ",") && !peek().nlb) {
                next();
                if (expr instanceof AST_Assign) {
                    left[left.length - 1] = left.slice(-1)[0].left;
                    return new AST_Assign({
                        start: start,
                        left: left.length == 1 ? left[0] : new AST_Array({
                            elements: left
                        }),
                        operator: expr.operator,
                        right: new AST_Seq({
                            car: expr.right,
                            cdr: expression(true, no_in)
                        }),
                        end: peek()
                    });
                }
                expr = maybe_assign(no_in);
                left.push(expr);
            }
            if (left.length > 1 && left.slice(-1)[0] instanceof AST_Assign) {
                left[left.length - 1] = left.slice(-1)[0].left;
                return new AST_Assign({
                    start: start,
                    left: new AST_Array({
                        elements: left
                    }),
                    operator: expr.operator,
                    right: expr.right,
                    end: peek()
                });
            }
            return function build_seq(a) {
                if (a.length == 1) {
                    return a[0];
                }
                return new AST_Seq({
                    start: start,
                    car: a.shift(),
                    cdr: build_seq(a),
                    end: peek()
                });
            }.call(this, left);
        }
        return expr;
    };
    function in_loop(cont) {
        var ret;
        S.in_loop += 1;
        ret = cont();
        S.in_loop -= 1;
        return ret;
    }
    return function() {
        var start, body, end, toplevel, assignments;
        start = S.token;
        body = [];
        while (!is_("eof")) {
            body.push(statement());
        }
        end = prev();
        toplevel = options.toplevel;
        if (toplevel) {
            toplevel.body = toplevel.body.concat(body);
            toplevel.end = end;
        } else {
            toplevel = new AST_Toplevel({
                start: start,
                body: body,
                strict: function() {
                    var stmt;
                    var _$rapyd$_Iter3 = body;
                    for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
                        stmt = _$rapyd$_Iter3[_$rapyd$_Index3];
                        if (stmt instanceof AST_Directive && stmt.value == "use strict") {
                            return true;
                        }
                    }
                    return false;
                }.call(this),
                end: end
            });
        }
        assignments = scan_for_local_vars(toplevel.body, false).filter(function(element, index, arr) {
            return arr.lastIndexOf(element) === index;
        });
        toplevel.localvars = [];
        assignments.forEach(function(item) {
            toplevel.localvars.push(new_symbol(AST_SymbolVar, item));
        });
        toplevel.imports = IMPORTED;
        toplevel.baselib = BASELIB;
        return toplevel;
    }.call(this);
}
function read_module_contents1(fullpath, options) {
    var path, options_;
    path = fullpath;
    if (!options.fs.existsSync(fullpath + options.ext)) {
        fullpath = options.basedir + "/" + fullpath;
        if (!options.fs.existsSync(fullpath + options.ext)) {
            return;
        }
    }
    options_ = {
        filename: fullpath,
        toplevel: null,
        readfile: options.readfile,
        fs: options.fs,
        basedir: options.basedir,
        ext: options.ext,
        amd: options.amd,
        js_imports: options.js_imports,
        search_paths: options.search_paths
    };
    return {
        "path": path + ".js",
        "ast": parse(options.readfile(fullpath + options.ext, "utf-8"), options_)
    };
}
function get_import_ast(ast, options) {
    var imports, import_paths, asts, import_ast, path;
    imports = {};
    import_paths = [];
    ast.body.forEach(function(node) {
        node.walk(new TreeWalker(function(node) {
            var path;
            if (node.TYPE !== "Import") {
                return;
            }
            if (_$rapyd$_in(node.path, imports)) {
                return;
            }
            path = node.dirname ? node.dirname + "/" + node.path : node.path;
            imports[node.path] = node;
            import_paths.push(path);
        }));
    });
    asts = [];
    var _$rapyd$_Iter4 = import_paths;
    for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
        path = _$rapyd$_Iter4[_$rapyd$_Index4];
        import_ast = read_module_contents1(path, options);
        if (import_ast) {
            asts.push(import_ast);
        }
    }
    return asts;
}