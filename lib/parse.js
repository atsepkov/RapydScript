/***********************************************************************

  A RapydScript to JavaScript compiler.
  https://github.com/atsepkov/RapydScript2

  -------------------------------- (C) ---------------------------------

                       Author: Alexander Tsepkov
                         <atsepkov@pyjeon.com>
                         http://www.pyjeon.com

  Distributed under Apache 2.0 license:
    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>

  RapydScript source code is originally based on UglifyJS2 (covered
  by BSD license). UglifyJS2 was written by Mihai Bazon
  <mihai.bazon@gmail.com>, who is its respective copyright holder.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/

"use strict";

var KEYWORDS = 'as break case class const continue debugger default def del do elif else except finally for from if import in instanceof is module new nonlocal pass raise return switch til to try typeof var void while with or and not';
var KEYWORDS_ATOM = 'False None True';
var RESERVED_WORDS = 'abstract boolean byte char double enum export extends final float goto implements int interface long native package private protected public short static super synchronized this throws transient volatile'
    + " " + KEYWORDS_ATOM + " " + KEYWORDS;
var KEYWORDS_BEFORE_EXPRESSION = 'return new del raise elif else case';

KEYWORDS = makePredicate(KEYWORDS);
RESERVED_WORDS = makePredicate(RESERVED_WORDS);
KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
KEYWORDS_ATOM = makePredicate(KEYWORDS_ATOM);

var NATIVE_CLASSES = {
    'Image': {},
    'RegExp': {},
    'Error': {},
    'Object': {static: ['getOwnPropertyNames', 'keys', 'create']},
    'String': {static: ['fromCharCode']},
    'Array': {static: ['isArray', 'from', 'of']},
    'Number': {static: ['isFinite', 'isNaN']},
    'Function': {},
    'Date': {static: ['UTC', 'now', 'parse']},
    'Boolean': {},
    'ArrayBuffer': {},
    'DataView': {},
    'Float32Array': {},
    'Float64Array': {},
    'Int16Array': {},
    'Int32Array': {},
    'Int8Array': {},
    'Uint16Array': {},
    'Uint32Array': {},
    'Uint8Array': {},
    'Uint8ClampedArray': {}
};

var OPERATOR_CHARS = makePredicate(characters("+-*&%=<>!?|~^@"));

var RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
var RE_OCT_NUMBER = /^0[0-7]+$/;
var RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;

var OPERATORS = makePredicate([
    "in",
    "instanceof",
    "typeof",
    "new",
    "void",
    "del",
    "++",
    "--",
    "+",
    "-",
    "not",
    "~",
    "&",
    "|",
    "^",
    "*",
    "/",
    "%",
    ">>",
    "<<",
    ">>>",
    "<",
    ">",
    "<=",
    ">=",
    "==",
    "is",
    "!=",
    "!==",
    "?",
    "=",
    "+=",
    "-=",
    "/=",
    "*=",
    "%=",
    ">>=",
    "<<=",
    ">>>=",
    "|=",
    "^=",
    "&=",
    "and",
    "or",
    "til",
    "to",
    "@"
]);

var OP_MAP = {
    "or": "||",
    "and": "&&",
    "not": "!",
    "del": "delete",
    "None": "null",
    "is": "==="
};

var WHITESPACE_CHARS = makePredicate(characters(" \u00a0\n\r\t\f\u000b\u200b\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000"));

var PUNC_BEFORE_EXPRESSION = makePredicate(characters("[{(,.;:"));

var PUNC_CHARS = makePredicate(characters("[]{}(),;:"));

var REGEXP_MODIFIERS = makePredicate(characters("gmsiy"));

/* -----[ Tokenizer ]----- */

// regexps adapted from http://xregexp.com/plugins/#unicode
var UNICODE = {
    letter: new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
    non_spacing_mark: new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
    space_combining_mark: new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
    connector_punctuation: new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
};

var IMPORTED = {};
var BASELIB = {};

function is_letter(code) {
    return (code >= 97 && code <= 122)
        || (code >= 65 && code <= 90)
        || (code >= 0xaa && UNICODE.letter.test(String.fromCharCode(code)));
};

function is_digit(code) {
    return code >= 48 && code <= 57; //XXX: find out if "UnicodeDigit" means something else than 0..9
};

function is_alphanumeric_char(code) {
    return is_digit(code) || is_letter(code);
};

function is_unicode_combining_mark(ch) {
    return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
};

function is_unicode_connector_punctuation(ch) {
    return UNICODE.connector_punctuation.test(ch);
};

function is_identifier(name) {
    return !RESERVED_WORDS(name) && /^[a-z_$][a-z0-9_$]*$/i.test(name);
};

function is_identifier_start(code) {
    return code == 36 || code == 95 || is_letter(code);
};

function is_identifier_char(ch) {
    var code = ch.charCodeAt(0);
    return is_identifier_start(code)
        || is_digit(code)
        || code == 8204 // \u200c: zero-width non-joiner <ZWNJ>
        || code == 8205 // \u200d: zero-width joiner <ZWJ> (in my ECMA-262 PDF, this is also 200c)
        || is_unicode_combining_mark(ch)
        || is_unicode_connector_punctuation(ch)
    ;
};

function parse_js_number(num) {
    if (RE_HEX_NUMBER.test(num)) {
        return parseInt(num.substr(2), 16);
    } else if (RE_OCT_NUMBER.test(num)) {
        return parseInt(num.substr(1), 8);
    } else if (RE_DEC_NUMBER.test(num)) {
        return parseFloat(num);
    }
};

function JS_Parse_Error(message, line, col, pos) {
    this.message = message;
    this.line = line;
    this.col = col;
    this.pos = pos;
    this.stack = new Error().stack;
};

JS_Parse_Error.prototype.toString = function() {
    return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
};

function js_error(message, filename, line, col, pos) {
    AST_Node.warn("ERROR: {message} [{file}:{line},{col}]", {
        message: message,
        file: filename,
        line: line,
        col: col
    });
    throw new JS_Parse_Error(message, line, col, pos);
};

function is_token(token, type, val) {
    return token.type == type && (val == null || token.value == val);
};

var EX_EOF = {};

function tokenizer($TEXT, filename) {

    var S = {
        text            : $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, ''),
        filename        : filename,
        pos             : 0,
        tokpos          : 0,
        line            : 1,
        tokline         : 0,
        col             : 0,
        tokcol          : 0,
        newline_before  : false,
        regex_allowed   : false,
        comments_before : [],
        whitespace_before: [],
        newblock        : false,
        endblock        : false,
        indentation_matters: [true],
        cached_whitespace: '',
        prev            : undefined,
        index_or_slice  : [false]
    };

    function peek() { return S.text.charAt(S.pos); };
    function prevChar() { return S.text.charAt(S.tokpos-1); };

    function next(signal_eof, in_string) {
        var ch = S.text.charAt(S.pos++);
        if (signal_eof && !ch)
            throw EX_EOF;
        if (ch == "\n") {
            S.newline_before = S.newline_before || !in_string;
            ++S.line;
            S.col = 0;
        } else {
            ++S.col;
        }
        return ch;
    };

    function find(what, signal_eof) {
        var pos = S.text.indexOf(what, S.pos);
        if (signal_eof && pos == -1) throw EX_EOF;
        return pos;
    };

    function start_token() {
        S.tokline = S.line;
        S.tokcol = S.col;
        S.tokpos = S.pos;
    };

    function token(type, value, is_comment, keep_newline) {
        S.regex_allowed = ((type == "operator" && !UNARY_POSTFIX[value]) ||
                           (type == "keyword" && KEYWORDS_BEFORE_EXPRESSION(value)) ||
                           (type == "punc" && PUNC_BEFORE_EXPRESSION(value)));
        if (type == "operator"
        && value == "is"
        && S.text.substr(S.pos).trimLeft().substr(0,4).trimRight() == "not") {
            next_token();
            value = "!==";
        }
        if (type == "operator" && OP_MAP[value]) value = OP_MAP[value];
        var ret = {
            type   : type,
            value  : value,
            line   : S.tokline,
            col    : S.tokcol,
            pos    : S.tokpos,
            endpos : S.pos,
            nlb    : S.newline_before,
            file   : filename
        };
        if (!is_comment) {
            ret.comments_before = S.comments_before;
            S.comments_before = [];
            // make note of any newlines in the comments that came before
            for (var i = 0, len = ret.comments_before.length; i < len; i++) {
                ret.nlb = ret.nlb || ret.comments_before[i].nlb;
            }
        }
        if (!keep_newline) S.newline_before = false;
//        if (type == "punc" && value == ":" && peek() == "\n") S.newblock = true;
        if (type == "punc") {
//            if (value == ":" && peek() == "\n") {
            if (value == ":"
            && !S.index_or_slice.slice(-1)[0]
            && (
                !S.text.substring(S.pos+1, find('\n')).trim()
                || !S.text.substring(S.pos+1,find('#')).trim())
            ) {
                S.newblock = true;
                S.indentation_matters.push(true);
            }
            switch (value) {
                case "[":
                    if (S.prev && S.prev.type == "name")
                        S.index_or_slice.push(true);
                    else
                        S.index_or_slice.push(false);
                case "{":
                case "(":
                    S.indentation_matters.push(false);
                    break;
                case "]":
                    S.index_or_slice.pop();
                case "}":
                case ")":
                    S.indentation_matters.pop();
                    break;
            }
        }
//        console.log(ret.type, ret.value);
//        return new AST_Token(ret);
        S.prev = new AST_Token(ret);
        return S.prev;
    };

    // this will transform leading whitespace to block tokens unless
    // part of array/hash, and skip non-leading whitespace
    function parse_whitespace() {
        var ch;
        var leading_whitespace = '';
        var whitespace_exists = false;
        while (WHITESPACE_CHARS(peek())) {
            whitespace_exists = true;
            ch = next();
            if (ch == "\n") leading_whitespace = '';
            else leading_whitespace += ch;
        }
        if (peek() != '#') {
            if (!whitespace_exists) leading_whitespace = S.cached_whitespace;
            else S.cached_whitespace = leading_whitespace;
            if (S.newline_before || S.endblock) return test_indent_token(leading_whitespace);
        }
    };

    function test_indent_token(leading_whitespace) {
        var most_recent = S.whitespace_before[S.whitespace_before.length-1] || '';
        S.endblock = false;
        if (S.indentation_matters.slice(-1)[0] && leading_whitespace != most_recent) {
            if (S.newblock && leading_whitespace && leading_whitespace.indexOf(most_recent) == 0) {
                // positive indent, new block
                S.newblock = false;
                S.whitespace_before.push(leading_whitespace);
                return 1;
            } else if (most_recent && most_recent.indexOf(leading_whitespace) == 0) {
                // negative indent, block is ending
                S.endblock = true;
                S.whitespace_before.pop();
                return -1;
            } else {
                // indent mismatch, inconsistent indentation
                parse_error("Inconsistent indentation");
            }
        } else {
            return 0;
        }
    }

    function read_while(pred) {
        var ret = "", ch, i = 0;
        while ((ch = peek()) && pred(ch, i++))
            ret += next();
        return ret;
    };

    function parse_error(err) {
        js_error(err, filename, S.tokline, S.tokcol, S.tokpos);
    };

    function read_num(prefix) {
        var has_e = false, after_e = false, has_x = false, has_dot = prefix == ".";
        var num = read_while(function(ch, i){
            var code = ch.charCodeAt(0);
            switch (code) {
              case 120: case 88: // xX
                return has_x ? false : (has_x = true);
              case 101: case 69: // eE
                return has_x ? true : has_e ? false : (has_e = after_e = true);
              case 45: // -
                return after_e || (i == 0 && !prefix);
              case 43: // +
                return after_e;
              case (after_e = false, 46): // .
                return (!has_dot && !has_x && !has_e) ? (has_dot = true) : false;
            }
            return is_alphanumeric_char(code);
        });
        if (prefix) num = prefix + num;
        var valid = parse_js_number(num);
        if (!isNaN(valid)) {
            return token("num", valid);
        } else {
            parse_error("Invalid syntax: " + num);
        }
    };

    function read_escaped_char(in_string, digester) {
        digester = digester || function(in_str){
            return next(true, in_str);
        };
        var ch = digester(in_string);
        switch (ch.charCodeAt(0)) {
          case 110 : return "\n";
          case 114 : return "\r";
          case 116 : return "\t";
          case 98  : return "\b";
          case 118 : return "\u000b"; // \v
          case 102 : return "\f";
          case 48  : return "\0";
          case 120 : return String.fromCharCode(hex_bytes(2, digester)); // \x
          case 117 : return String.fromCharCode(hex_bytes(4, digester)); // \u
          case 10  : return ""; // newline
          default  : return ch;
        }
    };

    function hex_bytes(n, digester) {
        var num = 0;
        for (; n > 0; --n) {
            var digit = parseInt(digester(), 16);
            if (isNaN(digit))
                parse_error("Invalid hex-character pattern in string");
            num = (num << 4) | digit;
        }
        return num;
    };

    var read_string = with_eof_error("Unterminated string constant", function(){
        var quote = next(), ret = "";
        if (peek() == quote) {
            next(true);
            if (peek() == quote) {
                // multiline string
                next(true);
                var i = find(quote + quote + quote, true);
                if (i != -1) {
                    var tmp = S.text.substring(S.pos, i);
                    S.pos = i + 3;
                    while (tmp.length) {
                        if (tmp[0] == "\\") {
                            tmp = tmp.substr(1);
                            ret += read_escaped_char(true, function(){
                                var ch = tmp[0];
                                tmp = tmp.substr(1);
                                return ch;
                            });
                        } else {
                            ret += tmp[0];
                            tmp = tmp.substr(1);
                        }
                    }
                    return token("string", ret);
                }
            } else {
                return token("string", "");
            }
        }
        for (;;) {
            var ch = next(true);
            if (ch == "\n")
                parse_error("End of line while scanning string literal.");
            if (ch == "\\") {
                // read OctalEscapeSequence (XXX: deprecated if "strict mode")
                // https://github.com/mishoo/RapydScript/issues/178
                var octal_len = 0, first = null;
                ch = read_while(function(ch){
                    if (ch >= "0" && ch <= "7") {
                        if (!first) {
                            first = ch;
                            return ++octal_len;
                        }
                        else if (first <= "3" && octal_len <= 2) return ++octal_len;
                        else if (first >= "4" && octal_len <= 1) return ++octal_len;
                    }
                    return false;
                });
                if (octal_len > 0) ch = String.fromCharCode(parseInt(ch, 8));
                else if (peek() == "\n") {
                    // skip newlines if escaped by backslash
                    next(true);
                    continue;
                }
                else ch = read_escaped_char(true);
            }
            else if (ch == quote) break;
            ret += ch;
        }
        return token("string", ret);
    });

    function read_line_comment() {
        next();
        var i = find("\n"), ret;
        if (i == -1) {
            ret = S.text.substr(S.pos);
            S.pos = S.text.length;
        } else {
            ret = S.text.substring(S.pos, i);
            S.pos = i;
        }
        return token("comment1", ret, true);
    };

    var read_multiline_comment = with_eof_error("Unterminated multiline comment", function(){
        next();
        var i = find("*/", true);
        var text = S.text.substring(S.pos, i);
        var a = text.split("\n"), n = a.length;
        // update stream position
        S.pos = i + 2;
        S.line += n - 1;
        if (n > 1) S.col = a[n - 1].length;
        else S.col += a[n - 1].length;
        S.col += 2;
        S.newline_before = S.newline_before || text.indexOf("\n") >= 0;
        return token("comment2", text, true);
    });

    function read_name() {
        var backslash = false, name = "", ch, escaped = false, hex;
        while ((ch = peek()) != null) {
            if (!backslash) {
                if (ch == "\\") {
                    if (S.text.charAt(S.pos+1) == "\n") {
                          S.pos+=2;
                          continue;
                    } else {
                        escaped = backslash = true, next();
                    }
                }
                else if (is_identifier_char(ch)) name += next();
                else break;
            } else {
                if (ch != "u") parse_error("Expecting UnicodeEscapeSequence -- uXXXX");
                ch = read_escaped_char();
                if (!is_identifier_char(ch)) parse_error("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                name += ch;
                backslash = false;
            }
        }
        if (KEYWORDS(name) && escaped) {
            hex = name.charCodeAt(0).toString(16).toUpperCase();
            name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
        }
        return name;
    };

    var read_regexp = with_eof_error("Unterminated regular expression", function(regexp){
        var prev_backslash = false, ch, in_class = false;
        while ((ch = next(true))) if (prev_backslash) {
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
        var mods = read_name();
        return token("regexp", new RegExp(regexp, mods));
    });

    function read_operator(prefix) {
        function grow(op) {
            if (!peek()) return op;
            var bigger = op + peek();
            if (OPERATORS(bigger)) {
                next();
                return grow(bigger);
            } else {
                return op;
            }
        };
        return token("operator", grow(prefix || next()));
    };

    function handle_slash() {
        next();
        var regex_allowed = S.regex_allowed;
        switch (peek()) {
          case "/":
            S.comments_before.push(read_line_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
          case "*":
            S.comments_before.push(read_multiline_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
        }
        return S.regex_allowed ? read_regexp("") : read_operator("/");
    };

    function handle_dot() {
        next();
        return is_digit(peek().charCodeAt(0))
            ? read_num(".")
            : token("punc", ".");
    };

    function read_word() {
        var word = read_name();
        return KEYWORDS_ATOM(word) ? token("atom", word)
            : !KEYWORDS(word) ? token("name", word)
            : OPERATORS(word) && prevChar() != '.' ? token("operator", word)
            : token("keyword", word);
    };

    function with_eof_error(eof_error, cont) {
        return function(x) {
            try {
                return cont(x);
            } catch(ex) {
                if (ex === EX_EOF) parse_error(eof_error);
                else throw ex;
            }
        };
    };

    function next_token(force_regexp) {
        if (force_regexp != null)
            return read_regexp(force_regexp);
        var indent = parse_whitespace();
//        if (indent == 1)
//            return token("punc", "{");
        if (indent == -1) {
            return token("punc", "}", false, true);
        }
        start_token();
        var ch = peek();
        if (!ch) return token("eof");
        var code = ch.charCodeAt(0);
        switch (code) {
          case 34: case 39: return read_string();
          case 35:
            var regex_allowed = S.regex_allowed;
            S.comments_before.push(read_line_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
          case 46: return handle_dot();
          case 47: return handle_slash();
        }
        if (is_digit(code)) return read_num();
        if (PUNC_CHARS(ch)) return token("punc", next());
        if (OPERATOR_CHARS(ch)) return read_operator();
        if (code == 92 && S.text.charAt(S.pos+1) == "\n") {
            // backslash will consume the newline character that follows
            next(); // backslash
            next(); // newline
            S.newline_before = false;
            return next_token();
        }
        if (code == 92 || is_identifier_start(code)) return read_word();
        parse_error("Unexpected character «" + ch + "»");
    };

    next_token.context = function(nc) {
        if (nc) S = nc;
        return S;
    };

    return next_token;

};

/* -----[ Parser (constants) ]----- */

var UNARY_PREFIX = makePredicate([
    "typeof",
    "void",
    "delete",
    "--",
    "++",
    "!",
    "~",
    "-",
    "+",
    "@"
]);

var UNARY_POSTFIX = makePredicate([ "--", "++" ]);

var ASSIGNMENT = makePredicate([ "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);

var PRECEDENCE = (function(a, ret){
    for (var i = 0, n = 1; i < a.length; ++i, ++n) {
        var b = a[i];
        for (var j = 0; j < b.length; ++j) {
            ret[b[j]] = n;
        }
    }
    return ret;
})(
    [
        ["||"],
        ["&&"],
        ["|"],
        ["^"],
        ["&"],
        ["==", "===", "!=", "!=="],
        ["<", ">", "<=", ">=", "in", "instanceof"],
        [">>", "<<", ">>>"],
        ["+", "-"],
        ["*", "/", "%"]
    ],
    {}
);

var STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);

var ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);

/* -----[ Parser ]----- */

function parse($TEXT, options) {

    options = defaults(options, {
        strict   : false,
        filename : null,
        auto_bind: false,
        toplevel : null
    });

    var S = {
        input         : typeof $TEXT == "string" ? tokenizer($TEXT, options.filename) : $TEXT,
        token         : null,
        prev          : null,
        peeked        : null,
        in_function   : 0,
        in_directives : true,
        in_loop       : 0,
        in_class      : [false],
        classes       : [{}],
        labels        : [],
        decorators    : [],
        module_tree   : {}, // tree describing the structure of modules and classes within them (module: {}, class: undefined)
        module_stack  : [] // current location in the module tree
    };

    S.token = next();

    function is(type, value) {
        return is_token(S.token, type, value);
    };

    function peek() { return S.peeked || (S.peeked = S.input()); };

    function next() {
        S.prev = S.token;
        if (S.peeked) {
            S.token = S.peeked;
            S.peeked = null;
        } else {
            S.token = S.input();
        }
        S.in_directives = S.in_directives && (
            S.token.type == "string" || is("punc", ";")
        );
        return S.token;
    };

    function prev() {
        return S.prev;
    };

    function croak(msg, line, col, pos) {
        var ctx = S.input.context();
        js_error(msg,
                 ctx.filename,
                 line != null ? line : ctx.tokline,
                 col != null ? col : ctx.tokcol,
                 pos != null ? pos : ctx.tokpos);
    };

    function token_error(token, msg) {
        croak(msg, token.line, token.col);
    };

    function unexpected(token) {
        if (token == null)
            token = S.token;
        token_error(token, "Unexpected token: " + token.type + " «" + token.value + "»");
    };

    function expect_token(type, val) {
        if (is(type, val)) {
            return next();
        }
        token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
    };

    function expect(punc) { return expect_token("punc", punc); };

    function can_insert_semicolon() {
        return !options.strict && (
            S.token.nlb || is("eof") || is("punc", "}")
        );
    };

    function semicolon() {
        if (is("punc", ";")) next(), S.token.nlb = true;
//        else if (!can_insert_semicolon()) unexpected();
    };

    function parenthesised() {
        expect("(");
        var exp = expression(true);
        expect(")");
        return exp;
    };

    function embed_tokens(parser) {
        return function() {
            var start = S.token;
            var expr = parser();
            var end = prev();
            expr.start = start;
            expr.end = end;
            return expr;
        };
    };

    function scan_for_local_vars(body, is_module) {
        var vars = [];
        if (body instanceof Array) {
            for (var stmt in body) {
                if (body[stmt] instanceof AST_Scope) {
                    if (is_module && body[stmt].name) vars.push(body[stmt].name);
                    continue; // don't invade nested scopes
                }

                ['body', 'alternative'].forEach(function(option) {
                    var opt = body[stmt][option];
                    if (opt) vars = vars.concat(scan_for_local_vars(opt, is_module));
                    if (opt && (opt.operator == "=") && !(opt.right instanceof AST_Scope))
                        vars = vars.concat(scan_for_local_vars(opt.right, is_module));
                });

                // pick up iterators from loops
                if (!is_module && body[stmt] instanceof AST_ForIn) {
//                    vars.push("_$rapyd$_Iter");
                    if (body[stmt].init instanceof AST_Array) {
                        vars.push('_$rapyd$_Unpack');
                        body[stmt].init.elements.forEach(function(elem){
                            if (vars.indexOf(elem.name) == -1) vars.push(elem.name);
                        });
                    } else if (vars.indexOf(body[stmt].init.name) == -1)
                        vars.push(body[stmt].init.name);
                }
            }
        } else if (body.body) {
            vars = vars.concat(scan_for_local_vars(body.body, is_module));
            if (body.alternative)
                vars = vars.concat(scan_for_local_vars(body.alternative, is_module));
        } else if (body instanceof AST_Assign) {
            if (body.left instanceof AST_Array) {
                vars.push('_$rapyd$_Unpack');
                body.left.elements.forEach(function(elem){
                    if (!(elem instanceof AST_PropAccess) && vars.indexOf(elem.name) == -1) vars.push(elem.name);
                });
            } else if (body.left.name && vars.indexOf(body.left.name) == -1)
                vars.push(body.left.name);
        }
        return vars;
    };

    function scan_for_nonlocal_defs(body) {
        var vars = [];
        if (body instanceof Array) {
            for (var stmt in body) {
                if (body[stmt] instanceof AST_Scope) continue; // don't invade nested scopes
                if (body[stmt] instanceof AST_Definitions) {
                    body[stmt].definitions.forEach(function(vardef) {
                        vars.push(vardef.name.name);
                    });
                }
                ['body', 'alternative'].forEach(function(option) {
                    var opt = body[stmt][option];
                    if (opt) vars = vars.concat(scan_for_nonlocal_defs(opt));
                });
            }
        } else if (body.body) {
            vars = vars.concat(scan_for_nonlocal_defs(body.body));
            if (body.alternative) vars = vars.concat(scan_for_nonlocal_defs(body.alternative));
        }
        return vars;
    }

    function finalize_import(imp) {
        var classes = scan_for_classes(imp.body.body);
        for (var c in classes) {
            if (classes[c] instanceof ModuleTreeNode) S.module_tree[c] = classes[c];
            else S.classes[0][c] = classes[c]; // append outer-most classes from imported module to outer scope
        }
        var key = "";
        while (imp instanceof AST_Dot) {
            key = '.' + imp.property + key;
            imp = imp.expression;
        }
        key = imp.name + key;
        IMPORTED[key] = true;
        return imp;
    }

    var statement = embed_tokens(function() {
        var tmp;
        if (is("operator", "/") || is("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.substr(1)); // force regexp
        }
        switch (S.token.type) {
          case "string":
            var dir = S.in_directives, stat = simple_statement();
            // XXXv2: decide how to fix directives
            if (dir && stat.body instanceof AST_String && !is("punc", ","))
                return new AST_Directive({ value: stat.body.value });
            return stat;
          case "num":
          case "regexp":
          case "operator":
          case "atom":
            return simple_statement();

          case "punc":
            switch (S.token.value) {
              case ":":
                return new AST_BlockStatement({
                    start : S.token,
                    body  : block_(),
                    end   : prev()
                });
              case "{":
              case "[":
              case "(":
                return simple_statement();
              case ";":
                next();
                return new AST_EmptyStatement();
              default:
                unexpected();
            }

          case "name":
            return is_token(peek(), "punc", ":")
                ? labeled_statement()
                : simple_statement();

          case "keyword":
            switch (tmp = S.token.value, next(), tmp) {
              case "break":
                return break_cont(AST_Break);

              case "continue":
                return break_cont(AST_Continue);

              case "debugger":
                semicolon();
                return new AST_Debugger();

              case "do":
                return new AST_Do({
                    body      : in_loop(statement),
                    condition : (expect("."), expect_token("keyword", "while"), tmp = expression(true), semicolon(), tmp)
                });

              case "while":
                return new AST_While({
                    condition : expression(true),
                    body      : in_loop(statement)
                });

              case "for":
                return for_();

              case "from":
                return finalize_import(from_import_());

              case "import":
                return finalize_import(import_());

              case "class":
                BASELIB["extends"] = true;
                if (options.auto_bind) BASELIB["rebind_all"] = true;
                return class_();

              case "module":
                return module_();

              case "def":
                var start = prev();
                var func = function_(S.in_class.slice(-1)[0]);
                func.start = start;
                func.end = prev();
                var chain = subscripts(func, true);
                if (chain == func)
                    return func;
                else
                    return new AST_SimpleStatement({
                        start   : start,
                        body    : chain,
                        end     : prev()
                    });

              case "if":
                return if_();

              case "pass":
                return new AST_EmptyStatement();

              case "return":
                if (S.in_function == 0)
                    croak("'return' outside of function");
                return new AST_Return({
                    value: ( is("punc", ";")
                             ? (next(), null)
                             : can_insert_semicolon()
                             ? null
                             : (tmp = expression(true), semicolon(), tmp) )
                });

              case "switch":
                return new AST_Switch({
                    expression : parenthesised(),
                    body       : in_loop(switch_body_)
                });

              case "raise":
                if (S.token.nlb)
                    return new AST_Throw({
                        value: new AST_SymbolCatch({
                            name: "_$rapyd$_Exception"
                        })
                    });
//                    croak("Illegal newline after 'raise'");
                return new AST_Throw({
                    value: (tmp = expression(true), semicolon(), tmp)
                });

              case "try":
                return try_();

              case "nonlocal":
                return tmp = nonlocal_(), semicolon(), tmp;

              case "const":
                return tmp = const_(), semicolon(), tmp;

              case "with":
                return new AST_With({
                    expression : parenthesised(),
                    body       : statement()
                });

              default:
                unexpected();
            }
        }
    });

    function labeled_statement() {
        var label = as_symbol(AST_Label);
        if (find_if(function(l){ return l.name == label.name }, S.labels)) {
            // ECMA-262, 12.12: An ECMAScript program is considered
            // syntactically incorrect if it contains a
            // LabelledStatement that is enclosed by a
            // LabelledStatement with the same Identifier as label.
            croak("Label " + label.name + " defined twice");
        }
        expect(":");
        S.labels.push(label);
        var stat = statement();
        S.labels.pop();
        return new AST_LabeledStatement({ body: stat, label: label });
    };

    function simple_statement(tmp) {
        return new AST_SimpleStatement({ body: (tmp = expression(true), semicolon(), tmp) });
    };

    function break_cont(type) {
        var label = null;
        if (!can_insert_semicolon()) {
            label = as_symbol(AST_LabelRef, true);
        }
        if (label != null) {
            if (!find_if(function(l){ return l.name == label.name }, S.labels))
                croak("Undefined label " + label.name);
        }
        else if (S.in_loop == 0)
            croak(type.TYPE + " not inside a loop or switch");
        semicolon();
        return new type({ label: label });
    };

    function for_(list_comp) {
//        expect("(");
        var init = null;
        if (!is("punc", ";")) {
            init = expression(true, true);
            // standardize AST_Seq into array now for consistency
            if (init instanceof AST_Seq) {
                var tmp = [];
                var iter = init;
                while (iter && iter.car) {
                    tmp.push(iter.car);
                    iter = iter.cdr;
                }
                tmp.push(iter);
                init = new AST_Array({
                    start    : init.start,
                    elements : tmp,
                    end      : init.end
                });
            }
            if (is("operator", "in")) {
                if (init instanceof AST_Var && init.definitions.length > 1)
                    croak("Only one variable declaration allowed in for..in loop");
                next();
                return for_in(init, list_comp);
            }
        }
        unexpected();
    };

    function for_in(init, list_comp) {
        var lhs = init instanceof AST_Var ? init.definitions[0].name : null;
        var obj = expression(true);
//        expect(")");
        if (list_comp) {
            return {
                init    : init,
                name    : lhs,
                object  : obj
            };
        }
        return new AST_ForIn({
            init   : init,
            name   : lhs,
            object : obj,
            body   : in_loop(statement)
        });
    };

    // scan function/class body for nested class declarations
    function scan_for_classes(body) {
//        var classes = {};
        var classes = new ModuleTreeNode();
        for (var i in body) {
            var stmt = body[i];
            if (stmt instanceof AST_Class) {
                classes[stmt.name.name] = {static: stmt.static, bound: stmt.bound};
            } else if (stmt instanceof AST_Module) {
                classes[stmt.name.name] = scan_for_classes(stmt.body);
            }
        }
        return classes;
    }

    function get_class_in_scope(expr) {
        if (expr instanceof AST_SymbolRef) {
            // check Native JS classes
            if (NATIVE_CLASSES.hasOwnProperty(expr.name)) return NATIVE_CLASSES[expr.name];
            // traverse in reverse to check local variables first
            for (var s=S.classes.length-1;s>=0;s--) {
                if (S.classes[s].hasOwnProperty(expr.name)) return S.classes[s][expr.name];
            }
        }
        else if (expr instanceof AST_Dot) {
            var referenced_path = [];
            // this one is for detecting classes inside modules and eventually nested classes
            while (expr instanceof AST_Dot) {
                referenced_path.unshift(expr.property);
                expr = expr.expression;
            }
            if (expr instanceof AST_SymbolRef) {
                referenced_path.unshift(expr.name); // now 'referenced_path' should contain the full path of potential class

                // Due to scoping that prefers local-most variables, there are multiple ways a class could be referenced.
                // To emulate this behavior, we'd need to travel into inner-most scope first and from there keep traveling
                // outward, while testing for existance of the given object chain in each scope level.
                var current_scope = S.module_stack.slice();
                current_scope.unshift(''); // global scope
                while (current_scope.length) {
                    // navigate to correct location in the module
                    var visible_scope = S.module_tree;
                    current_scope.forEach(function(module){
                        if (module in visible_scope) visible_scope = visible_scope[module];
                    });

                    // now try to find the given path in the tree
                    var traversed_path = referenced_path.slice();
                    while (traversed_path && visible_scope[traversed_path[0]]) {
                        visible_scope = visible_scope[traversed_path[0]];
                        traversed_path.shift();
                    }

                    // we arrived to the end of the path, if visible_scope points to a class, then this call is for a class
                    if (!traversed_path.length) {
                        if (!(visible_scope instanceof ModuleTreeNode)) return visible_scope;
                        else return false; // this call points to a module itself, maybe we should throw an error here
                    }

                    current_scope.pop();
                }
            }
        }
        return false;
    }

    var import_ = function() {
        var name, tmp;
        tmp = name = expression(false);
        var file = '.pyj';
        while (tmp instanceof AST_Dot) {
            file = '/' + tmp.property + file;
            tmp = tmp.expression;
        }
        file = tmp.name + file;
        var contents = null;
        try {
            contents = parse(options.readfile(options.basedir + "/" + file, "utf-8"), {
                filename: file,
                toplevel: contents,
                readfile: options.readfile,
                basedir: options.basedir,
                libdir: options.libdir
            });
        } catch (e) {
            if (!e.message.search('no such file or directory')) {
                throw e
            }
            try {
                contents = parse(options.readfile(options.libdir + "/" + file, "utf-8"), {
                    // didn't find it in local directory, check libs
                    filename: file,
                    toplevel: contents,
                    readfile: options.readfile,
                    basedir: options.libdir,
                    libdir: options.libdir
                });
            } catch (e) {
                if (e.message.search('no such file or directory')) {
                    throw "Failed Import: '" + tmp.name + "' module doesn't exist in either '" + options.basedir + "' or '" + options.libdir + "'"
                } else {
                    throw e
                }
            }
        }
        return new AST_Import({
            module: name,
            argnames: null,
            body: contents,
            variables: (function(){
                // detect publically-seen variables
                return scan_for_local_vars(contents, true).filter(function(element, index, arr) {
                    return arr.lastIndexOf(element) === index;
                });
            })()
        });
    }

    var from_import_ = function() {
        var name = expression(false);
        var file = '.pyj';
        while (name instanceof AST_Dot) {
            file = '/' + name.property + file;
            name = name.expression;
        }
        file = name.name + file;
        expect_token("keyword" ,"import");
        var contents = null;
        try {
            contents = parse(options.readfile(options.basedir + "/" + file, "utf-8"), {
                filename: file,
                toplevel: contents,
                readfile: options.readfile,
                basedir: options.basedir,
                libdir: options.libdir
            });
        } catch (e) {
            contents = parse(options.readfile(options.libdir + "/" + file, "utf-8"), {
                // didn't find it in local directory, check libs
                filename: file,
                toplevel: contents,
                readfile: options.readfile,
                basedir: options.libdir,
                libdir: options.libdir
            });
        }
        return new AST_Import({
            module: name,
            argnames: (function(a){
                a.push(as_symbol(AST_SymbolVar));
                while (is("punc", ",")) {
                    next();
                    a.push(as_symbol(AST_SymbolVar));
                }
                return a;
            })([]),
            body: contents
        });
    }

    var ModuleTreeNode = function() {}; // this exists to allow 'instanceof' check from within get_class_in_scope()

    var module_ = function(use_name) {
        var name = use_name ? use_name : as_symbol(AST_SymbolDefun);
        if (!name)
            unexpected();

        // detect external modules
        var externaldecorator = S.decorators.indexOf("external");
        if (externaldecorator != -1) {
            S.decorators.splice(externaldecorator, 1);
        }

        var definition = new AST_Module({
            name: name,
            body: (function(){
                // navigate to correct location in the module tree and append the module
                var module_tree = S.module_tree;
                S.module_stack.forEach(function(module){
                    module_tree = module_tree[module];
                });
                module_tree[name.name] = new ModuleTreeNode();

                S.module_stack.push(name.name);
                var a = block_();
                S.module_stack.pop();
                return a;
            })(),
            external: externaldecorator != -1,
            decorators: (function(){
                var d = [];
                S.decorators.forEach(function(decorator){
                    d.push(new AST_Decorator({name: decorator}));
                });
                S.decorators = [];
                return d;
            })(),
            variables: [],
            localvars: []
        });

        // detect publically-seen variables
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

    var class_ = function() {
        var name = as_symbol(AST_SymbolDefun);
        if (!name)
            unexpected();

        // detect external classes
        var externaldecorator = S.decorators.indexOf("external");
        if (externaldecorator != -1) {
            S.decorators.splice(externaldecorator, 1);
        }

        var class_details = {static: [], bound: {}};
        var definition = new AST_Class({
            name: name,
            parent: (function(){
                if (is("punc", "(")) {
                    next();
                    var a = expr_atom(false);
                    expect(")");
                    return a;
                } else {
                    return null;
                }
            })(),
            modules: S.module_stack.slice(),
            localvars: [],
            static: class_details.static,
            external: externaldecorator != -1,
            bound: class_details.bound,
            decorators: (function(){
                var d = [];
                S.decorators.forEach(function(decorator){
                    d.push(new AST_Decorator({name: decorator}));
                });
                S.decorators = [];
                return d;
            })(),
            body: (function(loop, labels){
                // navigate to correct location in the module tree and append the class
                var module_tree = S.module_tree;
                S.module_stack.forEach(function(module){
                    module_tree = module_tree[module];
                });
                module_tree[name.name] = class_details;

                S.in_class.push(name.name);
                S.classes[S.classes.length-1][name.name] = class_details;
                S.classes.push({});
                ++S.in_function;
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                var a = block_();
                --S.in_function;
                S.classes.pop();
                S.in_class.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            })(S.in_loop, S.labels)
        });
        // find the constructor
        for (var i in definition.body) {
            var stmt = definition.body[i];
            if (stmt instanceof AST_Defun && stmt.name.name == "__init__") {
                definition.init = stmt;
                break;
            }
        }
        return definition;
    };

    var function_ = function(in_class, ctor) {
        var is_accessor = ctor === AST_Accessor;
        var name = (is("name") ? as_symbol(in_class
                                           ? AST_SymbolDefun
                                           : is_accessor
                                           ? AST_SymbolAccessor
                                           : AST_SymbolLambda)
                    : is_accessor && (is("string") || is("num")) ? as_atom_node()
                    : null);
        if (in_class && !name)
            unexpected();
        var staticmethod = false;
        if (in_class) {
            var staticloc = S.decorators.indexOf("staticmethod");
            if (staticloc != -1) {
                S.decorators.splice(staticloc, 1);
                S.classes[S.classes.length-2][in_class].static.push(name.name);
                staticmethod = true;
            } else if (name.name != "__init__" && options.auto_bind) {
                BASELIB["bind"] = true;
                S.classes[S.classes.length-2][in_class].bound[name.name] = true;
            }
        }
        expect("(");
        if (!ctor) ctor = in_class ? AST_Defun : AST_Function;
        var definition = new ctor({
            name: name,
            argnames: (function(first, a){
                var defaults = {};
                while (!is("punc", ")")) {
                    if (first) first = false; else expect(",");
                    if (a.starargs) {
                        token_error(prev(), "Can't define multiple *args in function definition");
                    } else if (is("operator", "*")) {
                        next();
                        a.starargs = as_symbol(AST_SymbolFunarg);
                    } else {
                        a.push(as_symbol(AST_SymbolFunarg));
                        if (is("operator", "=")) {
                            var val = prev().value
                            next();
                            defaults[val] = expression(false);
                        }
                    }
                }
                next();
                a.defaults = defaults;
                return a;
            })(true, []),
            localvars: [],
            decorators: (function(){
                var d = [];
                S.decorators.forEach(function(decorator){
                    d.push(new AST_Decorator({name: decorator}));
                });
                S.decorators = [];
                return d;
            })(),
            body: (function(loop, labels){
                S.in_class.push(false);
                S.classes.push({});
                ++S.in_function;
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                var a = block_();
                --S.in_function;
                S.classes.pop();
                S.in_class.pop();
                S.in_loop = loop;
                S.labels = labels;
                return a;
            })(S.in_loop, S.labels)
        });
        if (definition instanceof AST_Defun) definition.static = staticmethod;

        // detect local variables, strip function arguments
        var assignments = scan_for_local_vars(definition.body, false).filter(function(element, index, arr) {
            return arr.lastIndexOf(element) === index;
        });
        for (var i=0; i < assignments.length; i++) {
            for (var j=0; j <= definition.argnames.length; j++) {
                if (j == definition.argnames.length)
                    definition.localvars.push(new_symbol(AST_SymbolVar, assignments[i]));
                else if (j < definition.argnames.length
                && assignments[i] == definition.argnames[j].name)
                    break;
            }
        }
        var nonlocals = scan_for_nonlocal_defs(definition.body);
        nonlocals.forEach(function(variable){
            for (var i in definition.localvars) {
                if (definition.localvars[i].name == variable) definition.localvars.splice(i, 1);
            }
        });
        return definition;
    };

    function if_() {
        var cond = expression(true), body = statement(), belse = null;
        if (is("keyword", "elif") || is("keyword", "else")) {
            if (is("keyword", "else")) next();
            else S.token.value = "if"; // effectively converts 'elif' to 'else if'
            belse = statement();
        }
        return new AST_If({
            condition   : cond,
            body        : body,
            alternative : belse
        });
    };

    function block_() {
        expect(":");
        var a = [];
        if (!S.token.nlb) {
            while (!S.token.nlb) {
                if (is("eof")) unexpected();
                a.push(statement());
            }
        } else {
            while (!is("punc", "}")) {
                if (is("eof")) unexpected();
                a.push(statement());
            }
            next();
        }
        return a;
    };

    function switch_body_() {
        expect("{");
        var a = [], cur = null, branch = null, tmp;
        while (!is("punc", "}")) {
            if (is("eof")) unexpected();
            if (is("keyword", "case")) {
                if (branch) branch.end = prev();
                cur = [];
                branch = new AST_Case({
                    start      : (tmp = S.token, next(), tmp),
                    expression : expression(true),
                    body       : cur
                });
                a.push(branch);
                expect(":");
            }
            else if (is("keyword", "default")) {
                if (branch) branch.end = prev();
                cur = [];
                branch = new AST_Default({
                    start : (tmp = S.token, next(), expect(":"), tmp),
                    body  : cur
                });
                a.push(branch);
            }
            else {
                if (!cur) unexpected();
                cur.push(statement());
            }
        }
        if (branch) branch.end = prev();
        next();
        return a;
    };

    function try_() {
        var body = block_(), bcatch = [], bfinally = null;
        while (is("keyword", "except")) {
            var start = S.token;
            next();
            var exceptions = [];
            if (!is("punc", ":") && !is("keyword", "as")) {
                exceptions.push(as_symbol(AST_SymbolVar));
                while (is("punc", ",")) {
                    next();
                    exceptions.push(as_symbol(AST_SymbolVar));
                }
            }
            var name = null;
            if (is("keyword", "as")) {
                next();
                name = as_symbol(AST_SymbolCatch);
            }
            bcatch.push(new AST_Except({
                start   : start,
                argname : name,
                errors  : exceptions,
                body    : block_(),
                end     : prev()
            }));
        }
        if (is("keyword", "finally")) {
            var start = S.token;
            next();
            bfinally = new AST_Finally({
                start : start,
                body  : block_(),
                end   : prev()
            });
        }
        if (!bcatch.length && !bfinally)
            croak("Missing catch/finally blocks");
        return new AST_Try({
            body     : body,
            bcatch   : (bcatch.length
                ? new AST_Catch({
                    body : bcatch
                })
                : null),
            bfinally : bfinally
        });
    };

    function vardefs(no_in, in_const) {
        var a = [];
        for (;;) {
            a.push(new AST_VarDef({
                start : S.token,
                name  : as_symbol(in_const ? AST_SymbolConst : AST_SymbolVar),
                value : is("operator", "=") ? (next(), expression(false, no_in)) : null,
                end   : prev()
            }));
            if (!is("punc", ","))
                break;
            next();
        }
        return a;
    };

    function new_vardefs(no_in, in_const) {
        var a = [];
        for (;;) {
            a.push(new AST_VarDef({
                start : S.token,
                name  : new_symbol(in_const ? AST_SymbolConst : AST_SymbolVar),
                value : is("operator", "=") ? (next(), expression(false, no_in)) : null,
                end   : prev()
            }));
            if (!is("punc", ","))
                break;
            next();
        }
        return a;
    };

    var nonlocal_ = function(no_in) {
        return new AST_Var({
            start       : prev(),
            definitions : vardefs(no_in, false),
            end         : prev()
        });
    };

    var const_ = function() {
        return new AST_Const({
            start       : prev(),
            definitions : vardefs(false, true),
            end         : prev()
        });
    };

    var new_ = function() {
        var start = S.token;
        expect_token("operator", "new");
        var newexp = expr_atom(false), args;
        if (is("punc", "(")) {
            next();
            args = expr_list(")");
        } else {
            args = [];
        }
        return subscripts(new AST_New({
            start      : start,
            expression : newexp,
            args       : args,
            end        : prev()
        }), true);
    };

    function as_atom_node() {
        var tok = S.token, ret;
        switch (tok.type) {
          case "name":
            return as_symbol(AST_SymbolRef);
          case "num":
            ret = new AST_Number({ start: tok, end: tok, value: tok.value });
            break;
          case "string":
            ret = new AST_String({ start: tok, end: tok, value: tok.value });
            break;
          case "regexp":
            ret = new AST_RegExp({ start: tok, end: tok, value: tok.value });
            break;
          case "atom":
            switch (tok.value) {
              case "False":
                ret = new AST_False({ start: tok, end: tok });
                break;
              case "True":
                ret = new AST_True({ start: tok, end: tok });
                break;
              case "None":
                ret = new AST_Null({ start: tok, end: tok });
                break;
            }
            break;
        }
        next();
        return ret;
    };

    var expr_atom = function(allow_calls) {
        if (is("operator", "new")) {
            return new_();
        }
        var start = S.token;
        if (is("punc")) {
            switch (start.value) {
              case "(":
                next();
                var ex = expression(true);
                ex.start = start;
                ex.end = S.token;
                expect(")");
                return subscripts(ex, allow_calls);
              case "[":
                return subscripts(array_(), allow_calls);
              case "{":
                return subscripts(object_(), allow_calls);
            }
            unexpected();
        }
        if (is("keyword", "class")) {
            next();
            var cls = class_();
            cls.start = start;
            cls.end = prev();
            return subscripts(cls, allow_calls);
        }
        if (is("keyword", "def")) {
            next();
            var func = function_(false);
            func.start = start;
            func.end = prev();
            return subscripts(func, allow_calls);
        }
        if (ATOMIC_START_TOKEN[S.token.type]) {
            return subscripts(as_atom_node(), allow_calls);
        }
        unexpected();
    };

    function expr_list(closing, allow_trailing_comma, allow_empty, allow_starargs) {
        var first = true, a = [];
        var saw_starargs = false;
        while (!is("punc", closing)) {
            if (saw_starargs) token_error(prev(), "*args must be the last argument in a function call")
            if (first) first = false; else expect(",");
            if (allow_trailing_comma && is("punc", closing)) break;
            if (is("operator", "*") && allow_starargs) {
                saw_starargs = true;
                next();
            }
            if (is("punc", ",") && allow_empty) {
                a.push(new AST_Hole({ start: S.token, end: S.token }));
            } else {
                a.push(expression(false));
            }
        }
        next();
        if (saw_starargs) a.starargs = true;
        return a;
    };

    function func_call_list() {
        return expr_list(')', false, false, true);
    }

    var array_ = embed_tokens(function() {
        expect("[");
        var expr = [];
        if (!is("punc", "]")) {
            expr.push(expression(false));
            if (is("keyword", "for")) {
                // list comprehension
                next();
                var forloop = for_(true);
                var ret = new AST_ListComprehension({
                    statement   : expr[0],
                    init        : forloop.init,
                    name        : forloop.name,
                    object      : forloop.object,
                    condition   : is("punc", "]")
                        ? null
                        : (expect_token("keyword", "if"), expression(true))
                });
                expect("]");
                return ret;
            }
            if (is("operator", "til")) {
                next();
                expr.push(expression(false));
                var ret = subscripts(new AST_Call({
                    start      : S.token,
                    expression : new AST_SymbolRef({ name: "range" }),
                    args       : expr,
                    end        : prev()
                }), true);
                expect("]");
                return ret;
            } else if (is("operator", "to")) {
                next();
                expr.push(new AST_Binary({
                    left: expression(false),
                    operator: '+',
                    right: new AST_Number({ value: 1 })
                }));
                var ret = subscripts(new AST_Call({
                    start      : S.token,
                    expression : new AST_SymbolRef({ name: "range" }),
                    args       : expr,
                    end        : prev()
                }), true);
                expect("]");
                return ret;
            } else if (!is("punc", "]")) expect(",");
        }
        return new AST_Array({
            elements: expr.concat(expr_list("]", !options.strict, true))
        });
    });

    var object_ = embed_tokens(function() {
        expect("{");
        var first = true, a = [];
        while (!is("punc", "}")) {
            if (first) first = false; else expect(",");
            if (!options.strict && is("punc", "}"))
                // allow trailing comma
                break;
            var start = S.token;
            var type = start.type;
            var key = as_property_name();
            var name = key.value;
            var quoted = (key.type == "string") ? true : false;
            if (type == "name" && !is("punc", ":")) {
                if (name == "get") {
                    a.push(new AST_ObjectGetter({
                        start : start,
                        key   : name,
                        quoted: quoted,
                        value : function_(false, AST_Accessor),
                        end   : prev()
                    }));
                    continue;
                }
                if (name == "set") {
                    a.push(new AST_ObjectSetter({
                        start : start,
                        key   : name,
                        quoted: quoted,
                        value : function_(false, AST_Accessor),
                        end   : prev()
                    }));
                    continue;
                }
            }
            expect(":");
            a.push(new AST_ObjectKeyVal({
                start : start,
                key   : name,
                quoted: quoted,
                value : expression(false),
                end   : prev()
            }));
        }
        next();
        return new AST_Object({ properties: a });
    });

    function as_property_name() {
        var tmp = S.token;
        next();
        switch (tmp.type) {
          case "num":
          case "string":
          case "name":
          case "operator":
          case "keyword":
          case "atom":
            return tmp;
          default:
            unexpected();
        }
    };

    function as_name() {
        var tmp = S.token;
        next();
        switch (tmp.type) {
          case "name":
          case "operator":
          case "keyword":
          case "atom":
            return tmp.value;
          default:
            unexpected();
        }
    };

    function as_symbol(type, noerror) {
        if (!is("name")) {
            if (!noerror) croak("Name expected");
            return null;
        }
        var name = S.token.value;
        var sym = new (name == "this" ? AST_This : type)({
            name  : String(S.token.value),
            start : S.token,
            end   : S.token
        });
        next();
        return sym;
    };

    // for generating/inserting a new symbol
    function new_symbol(type, name) {
        var sym = new (name == "this" ? AST_This : type)({
            name  : String(name),
            start : null,
            end   : null
        });
        return sym;
    };

    function is_static_method(cls, method) {
        if (cls.static && cls.static.indexOf(method) != -1)
            return true;
        else
            return false;
    };

    var subscripts = function(expr, allow_calls) {
        var start = expr.start;
        if (is("punc", ".")) {
            next();
            return subscripts(new AST_Dot({
                start      : start,
                expression : expr,
                property   : as_name(),
                end        : prev()
            }), allow_calls);
        }
        if (is("punc", "[") && !S.token.nlb) {
            next();
            var slice_bounds = [];
            var is_slice = false;
            
            if (is("punc", ":")) {
                // slice [:n]
                slice_bounds.push(new AST_Number({
                    value: 0
                }));
            } else {
                slice_bounds.push(expression(false));
            }

            if (is("punc", ":")) {
                // slice [n:m?]
                is_slice = true;
                next();
                if (!is("punc", "]"))
                    slice_bounds.push(expression(false));
            }

            expect("]");
            if (is_slice) {
                return subscripts(new AST_Call({
                    start       : start,
                    expression  : new AST_Dot({
                        start       : start,
                        expression  : expr,
                        property    : 'slice',
                        end         : prev()
                    }),
                    args        : slice_bounds,
                    end         : prev()
                }), allow_calls);
            } else {
                return subscripts(new AST_Sub({
                    start      : start,
                    expression : expr,
                    property   : slice_bounds[0],
                    end        : prev()
                }), allow_calls);
            }
        }
        if (allow_calls && is("punc", "(") && !S.token.nlb) {
            next();
            if (expr instanceof AST_SymbolRef && expr.name == "JS") {
                var str = expression(false);
                if (!(str instanceof AST_String))
                    token_error(prev(), "Compile-time function JS() can't process variables or expressions")
                var ret = new AST_Verbatim({
                    start      : start,
                    value      : str.value,
                    end        : prev()
                });
                expect(")");
                return ret;
            } else if (get_class_in_scope(expr)) {
                // this is an object being created using a class
                return subscripts(new AST_New({
                    start      : start,
                    expression : expr,
                    args       : func_call_list(),
                    end        : prev()
                }), true);
            } else {
                var c;
                if (expr instanceof AST_Dot)
                    c = get_class_in_scope(expr.expression);
                if (c) {
                    // generate class call
                    var funcname = expr;
                    if (funcname.property == "__init__")
                        funcname.property = "constructor";
                    return subscripts(new AST_ClassCall({
                        start      : start,
                        class      : expr.expression,
                        method     : funcname.property,
                        static     : is_static_method(c, funcname.property),
                        args       : func_call_list(),
                        end        : prev()
                    }), true);
                } else if (expr instanceof AST_SymbolRef) {
                    switch (expr.name) {
                        case "abs":
                        case "bind":
                        case "rebind_all":
                        case "enumerate":
                        case "len":
                        case "mixin":
                        case "print":
                        case "range":
                        case "reversed":
                        case "getattr":
                        case "setattr":
                        case "hasattr":
                          BASELIB[expr.name] = true;
                          break;
                        case "type":
                          return new AST_UnaryPrefix({
                              start     : start,
                              operator  : "typeof",
                              expression: func_call_list()[0],
                              end       : prev()
                          });
                        case "isinstance":
                          var args = func_call_list();
                          return new AST_Binary({
                              start     : start,
                              operator  : "instanceof",
                              left      : args[0],
                              right     : args[1],
                              end       : prev()
                          });
                    }
                }
                return subscripts(new AST_Call({
                    start      : start,
                    expression : expr,
                    args       : func_call_list(),
                    end        : prev()
                }), true);
            }
        }
        return expr;
    };

    var maybe_unary = function(allow_calls) {
        var start = S.token;
        if (is("operator") && UNARY_PREFIX(start.value)) {
            next();
            if (start.value == "@") {
                if (is("name") && (peek().value == "@" || peek().value == "def" || peek().value == "class" || peek().value == "module")) {
                    S.decorators.push(S.token.value);
                    next();
                    return new AST_EmptyStatement();
                } else unexpected();
            }
            var ex = make_unary(AST_UnaryPrefix, start.value, maybe_unary(allow_calls));
            ex.start = start;
            ex.end = prev();
            return ex;
        }
        var val = expr_atom(allow_calls);
        while (is("operator") && UNARY_POSTFIX(S.token.value) && !S.token.nlb) {
            val = make_unary(AST_UnaryPostfix, S.token.value, val);
            val.start = start;
            val.end = S.token;
            next();
        }
        return val;
    };

    function make_unary(ctor, op, expr) {
        if (op == "++" || op == "--")
            croak("Invalid operator «" + op + "»");
        return new ctor({ operator: op, expression: expr });
    };

    var expr_op = function(left, min_prec, no_in) {
        var op = is("operator") ? S.token.value : null;
        var not_in = false;
        if (op == "!" && peek().type == "operator" && peek().value == "in") {
            next();
            op = "in";
            not_in = true;
        }
        if (op == "in") {
            if (no_in) op = null;
            else BASELIB[op] = true;
        }
        var prec = op != null ? PRECEDENCE[op] : null;
        if (prec != null && prec > min_prec) {
            next();
            var right = expr_op(maybe_unary(true), prec, no_in);
            var ret = new AST_Binary({
                start    : left.start,
                left     : left,
                operator : op,
                right    : right,
                end      : right.end
            });
            if (not_in) ret = new AST_UnaryPrefix({
                start    : left.start,
                operator : "!",
                expression: ret,
                end      : right.end
            });
            return expr_op(ret, min_prec, no_in);
        }
        return left;
    };

    function expr_ops(no_in) {
        return expr_op(maybe_unary(true), 0, no_in);
    };

    var maybe_conditional = function(no_in) {
        var start = S.token;
        var expr = expr_ops(no_in);
        if (is("operator", "?")) {
            next();
            var yes = expression(false);
            expect(":");
            return new AST_Conditional({
                start       : start,
                condition   : expr,
                consequent  : yes,
                alternative : expression(false, no_in),
                end         : peek()
            });
        }
        return expr;
    };

    function is_assignable(expr) {
        if (!options.strict) return true;
        switch (expr[0]+"") {
          case "dot":
          case "sub":
          case "new":
          case "call":
            return true;
          case "name":
            return expr[1] != "this";
        }
    };

    var maybe_assign = function(no_in) {
        var start = S.token;
        var left = maybe_conditional(no_in), val = S.token.value;
        if (is("operator") && ASSIGNMENT(val)) {
            if (is_assignable(left)) {
                next();
                return new AST_Assign({
                    start    : start,
                    left     : left,
                    operator : val,
                    right    : maybe_assign(no_in),
                    end      : prev()
                });
            }
            croak("Invalid assignment");
        }
        return left;
    };

//    var expression = function(commas, no_in) {
//        // if there is an assignment, we want the sequences to pivot
//        // around it to allow for tuple packing/unpacking
//        var start = S.token;
//        var expr = maybe_assign(no_in);
//        if (commas && is("punc", ",")) {
//            next();
//            if (expr instanceof AST_Assign) {
//                // AST_Seq representation is ugly to decode for assignments
//                // let's convert data to array now to avoid dealing with it
//                var right = new AST_Array({
//                    start    : start,
//                    elements : (function(a){
//                        a.push(expression(false))
//                        while (is("punc", ",")) {
//                            next();
//                            a.push(expression(false));
//                        }
//                        return a;
//                    })([]),
//                    end      : peek()
//                });
//                right.elements.unshift(expr.right);
//                expr.right = right;
//                return expr;
//            }
//            return new AST_Seq({
//                start  : start,
//                car    : expr,
//                cdr    : expression(true, no_in),
//                end    : peek()
//            });
//        }
//        return expr;
//    };

    var expression = function(commas, no_in) {
        // if there is an assignment, we want the sequences to pivot
        // around it to allow for tuple packing/unpacking
        var start = S.token;
        var expr = maybe_assign(no_in);
        if (commas) {
            var left = [expr];
            var right = [];
            while (is("punc", ",") && !peek().nlb) {
                next();
                if (expr instanceof AST_Assign) {
                    // AST_Seq representation is ugly to decode for
                    // assignments, let's convert data to array now
                    // to avoid dealing with it
//                    return new AST_TupleUnpack({
//                        start    : start,
//                        elements : left,
//                        right    : expression(true, no_in),
//                        end      : peek()
//                    });
                    left[left.length-1] = left.slice(-1)[0].left;
                    return new AST_Assign({
                        start   : start,
                        left    : left.length == 1
                            ? left[0]
                            : new AST_Array({
                                elements: left
                            }),
                        operator: expr.operator,
                        right   : new AST_Seq({
                            car  : expr.right,
                            cdr  : expression(true, no_in)
                        }),
                        end     : peek()
                    });
                }
                expr = maybe_assign(no_in);
                left.push(expr);
            }

            // if last one was an assignment, fix it
            if (left.length > 1 && left.slice(-1)[0] instanceof AST_Assign) {
                left[left.length-1] = left.slice(-1)[0].left;
                return new AST_Assign({
                    start   : start,
                    left    : new AST_Array({
                        elements: left
                    }),
                    operator: expr.operator,
                    right   : expr.right,
                    end     : peek()
                });
            }

            return (function build_seq(a) {
                if (a.length == 1) return a[0];
                return new AST_Seq({
                    start  : start,
                    car    : a.shift(),
                    cdr    : build_seq(a),
                    end    : peek()
                });
            })(left);
        }
        return expr;
    };

    function in_loop(cont) {
        ++S.in_loop;
        var ret = cont();
        --S.in_loop;
        return ret;
    };

    return (function(){
        var start = S.token;
        var body = [];
        while (!is("eof"))
            body.push(statement());
        var end = prev();
        var toplevel = options.toplevel;
        if (toplevel) {
            toplevel.body = toplevel.body.concat(body);
            toplevel.end = end;
        } else {
            toplevel = new AST_Toplevel({ start: start, body: body, end: end });
        }
        var assignments = scan_for_local_vars(toplevel.body, false).filter(function(element, index, arr) {
            return arr.lastIndexOf(element) === index;
        });
        toplevel.localvars = [];
        assignments.forEach(function(item){
            toplevel.localvars.push(new_symbol(AST_SymbolVar, item));
        });
        toplevel.imports = IMPORTED;
        toplevel.baselib = BASELIB;
        return toplevel;
    })();

};
