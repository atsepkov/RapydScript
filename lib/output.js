var ՐՏ_modules = {};
ՐՏ_modules["tokenizer"] = {};

(function(){
    var __name__ = "tokenizer";
    var ALL_KEYWORDS, KEYWORDS, ES6_KEYWORDS, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, KEYWORDS_ATOM, OPERATOR_CHARS, RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, REGEXP_MODIFIERS, UNICODE, IDENTIFIER_PAT, STRING_MODIFIERS, UNARY_POSTFIX, EX_EOF;
    "\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under Apache 2.0 license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n  RapydScript source code is originally based on UglifyJS2 (covered\n  by BSD license). UglifyJS2 was written by Mihai Bazon\n  <mihai.bazon@gmail.com>, who is its respective copyright holder.\n\n    Redistribution and use in source and binary forms, with or without\n    modification, are permitted provided that the following conditions\n    are met:\n\n        * Redistributions of source code must retain the above\n          copyright notice, this list of conditions and the following\n          disclaimer.\n\n        * Redistributions in binary form must reproduce the above\n          copyright notice, this list of conditions and the following\n          disclaimer in the documentation and/or other materials\n          provided with the distribution.\n\n    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY\n    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE\n    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,\n    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF\n    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF\n    SUCH DAMAGE.\n\n**********************************************************************\n";
    "use strict";
    ES6_KEYWORDS = "async await yield";
    KEYWORDS = "as break case class const continue debugger default def del do elif else except " + "finally for from if import in instanceof is new nonlocal pass raise return switch til to " + "try typeof var void while with or and not " + ES6_KEYWORDS;
    KEYWORDS_ATOM = "False None True";
    RESERVED_WORDS = "abstract boolean byte char double enum export extends final float goto " + "implements int interface long native package private protected public short static super " + "synchronized this throws transient volatile " + KEYWORDS_ATOM + " " + KEYWORDS;
    KEYWORDS_BEFORE_EXPRESSION = "return new del raise elif else if";
    ALL_KEYWORDS = RESERVED_WORDS + " " + KEYWORDS_BEFORE_EXPRESSION;
    KEYWORDS = makePredicate(KEYWORDS);
    ES6_KEYWORDS = makePredicate(ES6_KEYWORDS);
    RESERVED_WORDS = makePredicate(RESERVED_WORDS);
    KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
    KEYWORDS_ATOM = makePredicate(KEYWORDS_ATOM);
    OPERATOR_CHARS = makePredicate(characters("+-*&%=<>!?|~^@"));
    RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
    RE_OCT_NUMBER = /^0[0-7]+$/;
    RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
    OPERATORS = makePredicate([ "in", "instanceof", "typeof", "new", "void", "del", "++", "--", "+", "-", "not", "~", "&", "|", "^", "**", "*", "/", "//", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "is", "!=", "!==", "?", "=", "+=", "-=", "/=", "//=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "and", "or", "til", "to", "@" ]);
    OP_MAP = {
        "or": "||",
        "and": "&&",
        "not": "!",
        "del": "delete",
        "None": "null",
        "is": "===",
        "==": "==",
        "!=": "!="
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
    IDENTIFIER_PAT = /^[a-z_$][_a-z0-9$]*$/i;
    STRING_MODIFIERS = "urUR";
    UNARY_POSTFIX = makePredicate([ "--", "++" ]);
    function ImportError() {
        ImportError.prototype.__init__.apply(this, arguments);
    }
    ՐՏ_extends(ImportError, Error);
    ImportError.prototype.__init__ = function __init__(message){
        var self = this;
        self.message = message;
    };

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
    function is_string_modifier(val) {
        var ch;
        var ՐՏ_Iter22 = ՐՏ_Iterable(val);
        for (var ՐՏ_Index22 = 0; ՐՏ_Index22 < ՐՏ_Iter22.length; ՐՏ_Index22++) {
            ch = ՐՏ_Iter22[ՐՏ_Index22];
            if (ՐՏ_in(ch, STRING_MODIFIERS)) {
                return true;
            }
        }
        return false;
    }
    function is_identifier(name) {
        return !RESERVED_WORDS(name) && IDENTIFIER_PAT.test(name);
    }
    function is_identifier_start(code) {
        return code === 36 || code === 95 || is_letter(code);
    }
    function is_identifier_char(ch) {
        var code;
        code = ch.charCodeAt(0);
        return is_identifier_start(code) || is_digit(code) || code === 8204 || code === 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
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
    function JS_Parse_Error(message, line, col, pos, is_eof) {
        this.message = message;
        this.line = line;
        this.col = col;
        this.pos = pos;
        this.stack = new Error().stack;
        this.is_eof = is_eof;
    }
    JS_Parse_Error.prototype.toString = function() {
        return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
    };
    function js_error(message, filename, line, col, pos, is_eof) {
        AST_Node.warn("ERROR: {message} [{file}:{line},{col}]", {
            message: message,
            file: filename,
            line: line,
            col: col
        });
        throw new JS_Parse_Error(message, line, col, pos, is_eof);
    }
    function is_token(token, type, val) {
        return token.type === type && (val === null || val === undefined || token.value === val);
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
            if (ch === "\n") {
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
            if (signal_eof && pos === -1) {
                throw EX_EOF;
            }
            return pos;
        }
        function start_token() {
            S.tokline = S.line;
            S.tokcol = S.col;
            S.tokpos = S.pos;
        }
        function token(full_type, value, is_comment, keep_newline) {
            var type, subtype, ret, i;
            full_type = full_type.split(":");
            type = full_type[0];
            subtype = full_type[1];
            S.regex_allowed = type === "operator" && !UNARY_POSTFIX[value] || type === "keyword" && KEYWORDS_BEFORE_EXPRESSION(value) || type === "punc" && PUNC_BEFORE_EXPRESSION(value);
            if (type === "operator" && value === "is" && S.text.substr(S.pos).trimLeft().substr(0, 4).trimRight() === "not") {
                next_token();
                value = "!==";
            }
            if (type === "operator" && OP_MAP[value]) {
                value = OP_MAP[value];
            }
            ret = {
                type: type,
                subtype: subtype,
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
            if (type === "punc") {
                if (value === ":" && !S.index_or_slice[S.index_or_slice.length-1] && (!S.text.substring(S.pos + 1, find("\n")).trim() || !S.text.substring(S.pos + 1, find("#")).trim())) {
                    S.newblock = true;
                    S.indentation_matters.push(true);
                }
                if (value === "[") {
                    if (S.prev && S.prev.type === "name") {
                        S.index_or_slice.push(true);
                    } else {
                        S.index_or_slice.push(false);
                    }
                    S.indentation_matters.push(false);
                } else if (value === "{" || value === "(") {
                    S.indentation_matters.push(false);
                } else if (value === "]") {
                    S.index_or_slice.pop();
                    S.indentation_matters.pop();
                } else if (value === "}" || value === ")") {
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
                if (ch === "\n") {
                    leading_whitespace = "";
                } else {
                    leading_whitespace += ch;
                }
            }
            if (peek() !== "#") {
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
            if (S.indentation_matters[S.indentation_matters.length-1] && leading_whitespace !== most_recent) {
                if (S.newblock && leading_whitespace && leading_whitespace.indexOf(most_recent) === 0) {
                    S.newblock = false;
                    S.whitespace_before.push(leading_whitespace);
                    return 1;
                } else if (most_recent && most_recent.indexOf(leading_whitespace) === 0) {
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
        function parse_error(err, is_eof) {
            js_error(err, filename, S.tokline, S.tokcol, S.tokpos, is_eof);
        }
        function read_num(prefix) {
            var has_e, after_e, has_x, has_dot, num, valid;
            has_e = false;
            after_e = false;
            has_x = false;
            has_dot = prefix === ".";
            num = read_while(function(ch, i) {
                var code, tmp_;
                code = ch.charCodeAt(0);
                tmp_ = code;
                if (tmp_ === 120 || tmp_ === 88) {
                    return has_x ? false : has_x = true;
                } else if (tmp_ === 101 || tmp_ === 69) {
                    return has_x ? true : has_e ? false : has_e = after_e = true;
                } else if (tmp_ === 45) {
                    return after_e || i === 0 && !prefix;
                } else if (tmp_ === 43) {
                    return after_e;
                } else if (tmp_ === 46) {
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
            if (tmp_ === 110) {
                return "\n";
            } else if (tmp_ === 114) {
                return "\r";
            } else if (tmp_ === 116) {
                return "\t";
            } else if (tmp_ === 98) {
                return "\b";
            } else if (tmp_ === 118) {
                return "";
            } else if (tmp_ === 102) {
                return "\f";
            } else if (tmp_ === 48) {
                return "\0";
            } else if (tmp_ === 120) {
                return String.fromCharCode(hex_bytes(2, digester));
            } else if (tmp_ === 117) {
                return String.fromCharCode(hex_bytes(4, digester));
            } else if (tmp_ === 10) {
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
        read_string = with_eof_error("Unterminated string constant", function(modifier) {
            var token_type, quote, i, tmp, find_newlines, ch, ret;
            token_type = "string";
            if (modifier) {
                token_type += ":" + modifier;
            }
            quote = next();
            ret = "";
            if (peek() === quote) {
                next(true);
                if (peek() === quote) {
                    next(true);
                    i = find(quote + quote + quote, true);
                    if (i !== -1) {
                        tmp = S.text.substring(S.pos, i);
                        S.pos = i + 3;
                        while (tmp.length) {
                            if (tmp[0] === "\\") {
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
                        find_newlines = ret.match(/\n/g);
                        if (find_newlines) {
                            S.line += find_newlines.length;
                        }
                        return token(token_type, ret);
                    }
                } else {
                    return token(token_type, "");
                }
            }
            while (true) {
                ch = next(true);
                if (ch === "\n") {
                    parse_error("End of line while scanning string literal.");
                }
                if (ch === "\\") {
                    if (peek() === "\n") {
                        next(true);
                        continue;
                    } else {
                        ch = read_escaped_char(true);
                    }
                } else if (ch === quote) {
                    break;
                }
                ret += ch;
            }
            return token(token_type, ret);
        });
        function read_line_comment(shebang) {
            if (typeof shebang === "undefined") shebang = false;
            var i, ret;
            if (!shebang) {
                next();
            }
            i = find("\n");
            if (i === -1) {
                ret = S.text.substr(S.pos);
                S.pos = S.text.length;
            } else {
                ret = S.text.substring(S.pos, i);
                S.pos = i;
            }
            return token(shebang ? "shebang" : "comment:line", ret, true);
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
            S.newline_before = S.newline_before || ՐՏ_in("\n", text);
            return token("comment:multiline", text, true);
        });
        function read_name() {
            var escaped, ch, backslash, hex, name;
            backslash = false;
            name = "";
            escaped = false;
            while ((ch = peek()) !== null) {
                if (!backslash) {
                    if (ch === "\\") {
                        if (S.text.charAt(S.pos + 1) === "\n") {
                            S.pos += 2;
                            continue;
                        } else {
                            escaped = backslash = true;
                            next();
                        }
                    } else if (is_identifier_char(ch)) {
                        name += next();
                    } else {
                        break;
                    }
                } else {
                    if (ch !== "u") {
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
            var verbose_regexp, in_class, prev_backslash, in_comment, mods;
            prev_backslash = false;
            in_class = false;
            verbose_regexp = false;
            in_comment = false;
            if (peek() === "/") {
                next(true);
                if (peek() === "/") {
                    verbose_regexp = true;
                    next(true);
                } else {
                    mods = read_name();
                    return token("regexp", new RegExp(regexp, mods));
                }
            }
            while (ch = next(true)) {
                if (in_comment) {
                    if (ch === "\n") {
                        in_comment = false;
                    }
                    continue;
                }
                if (prev_backslash) {
                    regexp += "\\" + ch;
                    prev_backslash = false;
                } else if (ch === "[") {
                    in_class = true;
                    regexp += ch;
                } else if (ch === "]" && in_class) {
                    in_class = false;
                    regexp += ch;
                } else if (ch === "/" && !in_class) {
                    if (verbose_regexp) {
                        if (peek() !== "/") {
                            regexp += "\\/";
                            continue;
                        }
                        next(true);
                        if (peek() !== "/") {
                            regexp += "\\/\\/";
                            continue;
                        }
                        next(true);
                    }
                    break;
                } else if (ch === "\\") {
                    prev_backslash = true;
                } else if (verbose_regexp && !in_class && ՐՏ_in(ch, " \n\r\t")) {
                } else if (verbose_regexp && !in_class && ch === "#") {
                    in_comment = true;
                } else {
                    regexp += ch;
                }
            }
            mods = read_name();
            return token("regexp", new RegExp(regexp, mods));
        });
        function read_operator(prefix) {
            var op;
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
            op = grow(prefix || next());
            if (ՐՏ_in(op, [ "++", "--", "===", "!==" ])) {
                parse_error("Invalid operator «" + op + "»");
            }
            return token("operator", op);
        }
        function handle_slash() {
            next();
            return S.regex_allowed ? read_regexp("") : read_operator("/");
        }
        function handle_dot() {
            next();
            return is_digit(peek().charCodeAt(0)) ? read_num(".") : token("punc", ".");
        }
        function read_word() {
            var word;
            word = read_name();
            return KEYWORDS_ATOM(word) ? token("atom", word) : !KEYWORDS(word) ? token("name", word) : OPERATORS(word) && prevChar() !== "." ? token("operator", word) : token("keyword", word);
        }
        function with_eof_error(eof_error, cont) {
            return function(x) {
                try {
                    return cont(x);
                } catch (ՐՏ_Exception) {
                    var ex = ՐՏ_Exception;
                    if (ex === EX_EOF) {
                        parse_error(eof_error, true);
                    } else {
                        throw ՐՏ_Exception;
                    }
                }
            };
        }
        function next_token(force_regexp) {
            var indent, ch, code, tmp_, regex_allowed, tok, mods, string_tok;
            if (!(ՐՏ_in(force_regexp, [null, undefined]))) {
                return read_regexp(force_regexp);
            }
            indent = parse_whitespace();
            if (indent === -1) {
                return token("punc", "}", false, true);
            }
            start_token();
            ch = peek();
            if (!ch) {
                return token("eof");
            }
            code = ch.charCodeAt(0);
            tmp_ = code;
            if (tmp_ === 34 || tmp_ === 39) {
                return read_string();
            } else if (tmp_ === 35) {
                if (S.pos === 0 && S.text.charAt(1) === "!") {
                    return read_line_comment(true);
                }
                regex_allowed = S.regex_allowed;
                S.comments_before.push(read_line_comment());
                S.regex_allowed = regex_allowed;
                return next_token();
            } else if (tmp_ === 46) {
                return handle_dot();
            } else if (tmp_ === 47) {
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
            if (code === 92 && S.text.charAt(S.pos + 1) === "\n") {
                next();
                next();
                S.newline_before = false;
                return next_token();
            }
            if (code === 92 || is_identifier_start(code)) {
                tok = read_word();
                if (ՐՏ_in(peek(), "'\"") && is_string_modifier(tok.value)) {
                    mods = tok.value.toLowerCase();
                    string_tok = read_string(mods);
                    tok.endpos = string_tok.endpos;
                    tok.value = string_tok.value;
                    tok.subtype = string_tok.subtype;
                    tok.type = string_tok.type;
                }
                return tok;
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
    ՐՏ_modules["tokenizer"]["ALL_KEYWORDS"] = ALL_KEYWORDS;

    ՐՏ_modules["tokenizer"]["KEYWORDS"] = KEYWORDS;

    ՐՏ_modules["tokenizer"]["ES6_KEYWORDS"] = ES6_KEYWORDS;

    ՐՏ_modules["tokenizer"]["RESERVED_WORDS"] = RESERVED_WORDS;

    ՐՏ_modules["tokenizer"]["KEYWORDS_BEFORE_EXPRESSION"] = KEYWORDS_BEFORE_EXPRESSION;

    ՐՏ_modules["tokenizer"]["KEYWORDS_ATOM"] = KEYWORDS_ATOM;

    ՐՏ_modules["tokenizer"]["OPERATOR_CHARS"] = OPERATOR_CHARS;

    ՐՏ_modules["tokenizer"]["RE_HEX_NUMBER"] = RE_HEX_NUMBER;

    ՐՏ_modules["tokenizer"]["RE_OCT_NUMBER"] = RE_OCT_NUMBER;

    ՐՏ_modules["tokenizer"]["RE_DEC_NUMBER"] = RE_DEC_NUMBER;

    ՐՏ_modules["tokenizer"]["OPERATORS"] = OPERATORS;

    ՐՏ_modules["tokenizer"]["OP_MAP"] = OP_MAP;

    ՐՏ_modules["tokenizer"]["WHITESPACE_CHARS"] = WHITESPACE_CHARS;

    ՐՏ_modules["tokenizer"]["PUNC_BEFORE_EXPRESSION"] = PUNC_BEFORE_EXPRESSION;

    ՐՏ_modules["tokenizer"]["PUNC_CHARS"] = PUNC_CHARS;

    ՐՏ_modules["tokenizer"]["REGEXP_MODIFIERS"] = REGEXP_MODIFIERS;

    ՐՏ_modules["tokenizer"]["UNICODE"] = UNICODE;

    ՐՏ_modules["tokenizer"]["IDENTIFIER_PAT"] = IDENTIFIER_PAT;

    ՐՏ_modules["tokenizer"]["STRING_MODIFIERS"] = STRING_MODIFIERS;

    ՐՏ_modules["tokenizer"]["UNARY_POSTFIX"] = UNARY_POSTFIX;

    ՐՏ_modules["tokenizer"]["EX_EOF"] = EX_EOF;

    ՐՏ_modules["tokenizer"]["ImportError"] = ImportError;

    ՐՏ_modules["tokenizer"]["is_letter"] = is_letter;

    ՐՏ_modules["tokenizer"]["is_digit"] = is_digit;

    ՐՏ_modules["tokenizer"]["is_alphanumeric_char"] = is_alphanumeric_char;

    ՐՏ_modules["tokenizer"]["is_unicode_combining_mark"] = is_unicode_combining_mark;

    ՐՏ_modules["tokenizer"]["is_unicode_connector_punctuation"] = is_unicode_connector_punctuation;

    ՐՏ_modules["tokenizer"]["is_string_modifier"] = is_string_modifier;

    ՐՏ_modules["tokenizer"]["is_identifier"] = is_identifier;

    ՐՏ_modules["tokenizer"]["is_identifier_start"] = is_identifier_start;

    ՐՏ_modules["tokenizer"]["is_identifier_char"] = is_identifier_char;

    ՐՏ_modules["tokenizer"]["parse_js_number"] = parse_js_number;

    ՐՏ_modules["tokenizer"]["JS_Parse_Error"] = JS_Parse_Error;

    ՐՏ_modules["tokenizer"]["js_error"] = js_error;

    ՐՏ_modules["tokenizer"]["is_token"] = is_token;

    ՐՏ_modules["tokenizer"]["tokenizer"] = tokenizer;
})();
"\n**********************************************************************\n\n  A RapydScript to JavaScript compiler.\n  https://github.com/atsepkov/RapydScript\n\n  -------------------------------- (C) ---------------------------------\n\n                       Author: Alexander Tsepkov\n                         <atsepkov@pyjeon.com>\n                         http://www.pyjeon.com\n\n  Distributed under Apache 2.0 license:\n    Copyright 2013 (c) Alexander Tsepkov <atsepkov@pyjeon.com>\n\n  RapydScript source code is originally based on UglifyJS2 (covered\n  by BSD license). UglifyJS2 was written by Mihai Bazon\n  <mihai.bazon@gmail.com>, who is its respective copyright holder.\n\n    Redistribution and use in source and binary forms, with or without\n    modification, are permitted provided that the following conditions\n    are met:\n\n        * Redistributions of source code must retain the above\n          copyright notice, this list of conditions and the following\n          disclaimer.\n\n        * Redistributions in binary form must reproduce the above\n          copyright notice, this list of conditions and the following\n          disclaimer in the documentation and/or other materials\n          provided with the distribution.\n\n    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY\n    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE\n    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,\n    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF\n    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF\n    SUCH DAMAGE.\n\n **********************************************************************\n";
"use strict";
var is_identifier = ՐՏ_modules["tokenizer"].is_identifier;
var is_identifier_char = ՐՏ_modules["tokenizer"].is_identifier_char;

function OutputStream(options) {
    var indentation, current_col, current_line, current_pos, OUTPUT, IMPORTED, might_need_space, might_need_semicolon, last, requireSemicolonChars, space, indent, with_indent, newline, semicolon, add_mapping, stack;
    options = defaults(options, {
        indent_start: 0,
        indent_level: 4,
        quote_keys: false,
        space_colon: true,
        ascii_only: false,
        inline_script: false,
        width: 80,
        max_line_len: 32e3,
        ie_proof: true,
        beautify: false,
        source_map: null,
        bracketize: false,
        semicolons: true,
        comments: false,
        preserve_line: false,
        omit_baselib: false,
        baselib: null,
        private_scope: true,
        auto_bind: false,
        write_name: true
    }, true);
    indentation = 0;
    current_col = 0;
    current_line = 1;
    current_pos = 0;
    OUTPUT = "";
    IMPORTED = {};
    function to_ascii(str_, identifier) {
        return str_.replace(/[\u0080-\uffff]/g, function(ch) {
            var code;
            code = ch.charCodeAt(0).toString(16);
            if (code.length <= 2 && !identifier) {
                while (code.length < 2) {
                    code = "0" + code;
                }
                return "\\x" + code;
            } else {
                while (code.length < 4) {
                    code = "0" + code;
                }
                return "\\u" + code;
            }
        });
    }
    function make_string(str_) {
        var dq, sq;
        dq = 0;
        sq = 0;
        str_ = str_.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function(s) {
            var tmp_, dq, sq;
            tmp_ = s;
            if (tmp_ === "\\") {
                return "\\\\";
            } else if (tmp_ === "\b") {
                return "\\b";
            } else if (tmp_ === "\f") {
                return "\\f";
            } else if (tmp_ === "\n") {
                return "\\n";
            } else if (tmp_ === "\t") {
                return "\\t";
            } else if (tmp_ === "\r") {
                return "\\r";
            } else if (tmp_ === "\u2028") {
                return "\\u2028";
            } else if (tmp_ === "\u2029") {
                return "\\u2029";
            } else if (tmp_ === "\"") {
                dq += 1;
                return "\"";
            } else if (tmp_ === "'") {
                sq += 1;
                return "'";
            } else if (tmp_ === "\0") {
                return "\\0";
            }
            return s;
        });
        if (options.ascii_only) {
            str_ = to_ascii(str_);
        }
        if (dq > sq) {
            return "'" + str_.replace(/\x27/g, "\\'") + "'";
        } else {
            return "\"" + str_.replace(/\x22/g, "\\\"") + "\"";
        }
    }
    function encode_string(str_) {
        var ret;
        ret = make_string(str_);
        if (options.inline_script) {
            ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
        }
        return ret;
    }
    function make_name(name) {
        name = name.toString();
        if (options.ascii_only) {
            name = to_ascii(name, true);
        }
        return name;
    }
    function make_indent(back) {
        return repeat_string(" ", options.indent_start + indentation - back * options.indent_level);
    }
    might_need_space = false;
    might_need_semicolon = false;
    last = null;
    function last_char() {
        return last.charAt(last.length - 1);
    }
    function maybe_newline() {
        if (options.max_line_len && current_col > options.max_line_len) {
            print_("\n");
        }
    }
    requireSemicolonChars = makePredicate("( [ + * / - , .");
    function print_(str_) {
        var ch, target_line, prev, a, n;
        str_ = String(str_);
        ch = str_.charAt(0);
        if (might_need_semicolon) {
            if ((!ch || !(ՐՏ_in(ch, ";}"))) && !/[;]$/.test(last)) {
                if (options.semicolons || requireSemicolonChars(ch)) {
                    OUTPUT += ";";
                    current_col += 1;
                    current_pos += 1;
                } else {
                    OUTPUT += "\n";
                    current_pos += 1;
                    current_line += 1;
                    current_col = 0;
                }
                if (!options.beautify) {
                    might_need_space = false;
                }
            }
            might_need_semicolon = false;
            maybe_newline();
        }
        if (!options.beautify && options.preserve_line && stack[stack.length - 1]) {
            target_line = stack[stack.length - 1].start.line;
            while (current_line < target_line) {
                OUTPUT += "\n";
                current_pos += 1;
                current_line += 1;
                current_col = 0;
                might_need_space = false;
            }
        }
        if (might_need_space) {
            prev = last_char();
            if (is_identifier_char(prev) && (is_identifier_char(ch) || ch === "\\") || /^[\+\-\/]$/.test(ch) && ch === prev) {
                OUTPUT += " ";
                current_col += 1;
                current_pos += 1;
            }
            might_need_space = false;
        }
        a = str_.split(/\r?\n/);
        n = a.length - 1;
        current_line += n;
        if (n === 0) {
            current_col += a[n].length;
        } else {
            current_col = a[n].length;
        }
        current_pos += str_.length;
        last = str_;
        OUTPUT += str_;
    }
    space = options.beautify ? function() {
        print_(" ");
    } : function() {
        might_need_space = true;
    };
    indent = options.beautify ? function(half) {
        if (options.beautify) {
            print_(make_indent(half ? .5 : 0));
        }
    } : noop;
    with_indent = options.beautify ? function(col, cont) {
        var save_indentation, ret;
        if (col === true) {
            col = next_indent();
        }
        save_indentation = indentation;
        indentation = col;
        ret = cont();
        indentation = save_indentation;
        return ret;
    } : function(col, cont) {
        return cont();
    };
    newline = options.beautify ? function() {
        print_("\n");
    } : noop;
    semicolon = options.beautify ? function() {
        print_(";");
    } : function() {
        might_need_semicolon = true;
    };
    function force_semicolon() {
        might_need_semicolon = false;
        print_(";");
    }
    function next_indent() {
        return indentation + options.indent_level;
    }
    function spaced() {
        var ՐՏ_Unpack, i, x;
        var ՐՏ_Iter23 = ՐՏ_Iterable(enumerate(arguments));
        for (var ՐՏ_Index23 = 0; ՐՏ_Index23 < ՐՏ_Iter23.length; ՐՏ_Index23++) {
            ՐՏ_Unpack = ՐՏ_Iter23[ՐՏ_Index23];
            i = ՐՏ_Unpack[0];
            x = ՐՏ_Unpack[1];
            if (i > 0) {
                space();
            }
            print_(x);
        }
    }
    function end_statement() {
        semicolon();
        newline();
    }
    function with_block(cont) {
        var ret;
        ret = null;
        print_("{");
        newline();
        with_indent(next_indent(), function() {
            ret = cont();
        });
        indent();
        print_("}");
        return ret;
    }
    function with_parens(cont) {
        var ret;
        print_("(");
        ret = cont();
        print_(")");
        return ret;
    }
    function with_square(cont) {
        var ret;
        print_("[");
        ret = cont();
        print_("]");
        return ret;
    }
    function comma() {
        print_(",");
        space();
    }
    function colon() {
        print_(":");
        if (options.space_colon) {
            space();
        }
    }
    add_mapping = options.source_map ? function(token, name) {
        try {
            if (token) {
                options.source_map.add(token.file || "?", current_line, current_col, token.line, token.col, !name && token.type === "name" ? token.value : name);
            }
        } catch (ՐՏ_Exception) {
            var ex = ՐՏ_Exception;
            AST_Node.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]", {
                file: token.file,
                line: token.line,
                col: token.col,
                cline: current_line,
                ccol: current_col,
                name: name || ""
            });
        }
    } : noop;
    function get() {
        return OUTPUT;
    }
    function assign_var(name) {
        if (typeof name === "string") {
            print_(name);
        } else {
            name.print(this);
        }
        space();
        print_("=");
        space();
    }
    stack = [];
    return {
        get: get,
        toString: get,
        indent: indent,
        indentation: function() {
            return indentation;
        },
        current_width: function() {
            return current_col - indentation;
        },
        should_break: function() {
            return options.width && this.current_width() >= options.width;
        },
        newline: newline,
        print: print_,
        space: space,
        comma: comma,
        colon: colon,
        last: function() {
            return last;
        },
        semicolon: semicolon,
        force_semicolon: force_semicolon,
        to_ascii: to_ascii,
        print_name: function(name) {
            print_(make_name(name));
        },
        print_string: function(str_) {
            print_(encode_string(str_));
        },
        next_indent: next_indent,
        with_indent: with_indent,
        with_block: with_block,
        with_parens: with_parens,
        spaced: spaced,
        end_statement: end_statement,
        with_square: with_square,
        add_mapping: add_mapping,
        assign: assign_var,
        get_baselib: function(key) {
            if (!options.omit_baselib) {
                return options.baselib[key];
            }
            return null;
        },
        "import": function(key) {
            if (!IMPORTED.hasOwnProperty(key)) {
                IMPORTED[key] = key;
                return true;
            }
            return false;
        },
        is_main: function() {
            return OUTPUT.length === 0;
        },
        option: function(opt) {
            return options[opt];
        },
        line: function() {
            return current_line;
        },
        col: function() {
            return current_col;
        },
        pos: function() {
            return current_pos;
        },
        push_node: function(node) {
            stack.push(node);
        },
        pop_node: function() {
            return stack.pop();
        },
        stack: function() {
            return stack;
        },
        parent: function(n) {
            return stack[stack.length - 2 - (n || 0)];
        }
    };
}
(function() {
    var SPECIAL_METHODS, INDEX_COUNTER, CREATION;
    SPECIAL_METHODS = {
        bind: "ՐՏ_bind",
        rebind_all: "ՐՏ_rebindAll",
        bool: "!!",
        "float": "parseFloat",
        "int": "parseInt",
        mixin: "ՐՏ_mixin",
        print: "ՐՏ_print",
        eslice: "ՐՏ_eslice"
    };
    INDEX_COUNTER = 0;
    function DEFPRINT(nodetype, generator) {
        nodetype.DEFMETHOD("_codegen", generator);
    }
    AST_Node.DEFMETHOD("print", function(stream, force_parens) {
        var self, generator;
        self = this;
        generator = self._codegen;
        stream.push_node(self);
        if (force_parens || self.needs_parens(stream)) {
            stream.with_parens(function() {
                self.add_comments(stream);
                self.add_source_map(stream);
                generator(self, stream);
            });
        } else {
            self.add_comments(stream);
            self.add_source_map(stream);
            generator(self, stream);
        }
        stream.pop_node();
    });
    AST_Node.DEFMETHOD("print_to_string", function(options) {
        var s;
        s = OutputStream(options);
        this.print(s);
        return s.get();
    });
    AST_Node.DEFMETHOD("add_comments", function(output) {
        var c, self, start, comments;
        c = output.option("comments");
        self = this;
        if (c) {
            start = self.start;
            if (start && !start._comments_dumped) {
                start._comments_dumped = true;
                comments = start.comments_before;
                if (self instanceof AST_Exit && self.value && self.value.start.comments_before.length > 0) {
                    comments = (comments || []).concat(self.value.start.comments_before);
                    self.value.start.comments_before = [];
                }
                if (c.test) {
                    comments = comments.filter(function(comment) {
                        return c.test(comment.value);
                    });
                } else if (typeof c === "function") {
                    comments = comments.filter(function(comment) {
                        return c(self, comment);
                    });
                }
                comments.forEach(function(c) {
                    if (c.type === "comment:line") {
                        output.print("//" + c.value + "\n");
                        output.indent();
                    } else if (c.type === "comment:multiline") {
                        output.print("/*" + c.value + "*/");
                        if (start.nlb) {
                            output.print("\n");
                            output.indent();
                        } else {
                            output.space();
                        }
                    }
                });
            }
        }
    });
    function PARENS(nodetype, func) {
        nodetype.DEFMETHOD("needs_parens", func);
    }
    PARENS(AST_Node, function() {
        return false;
    });
    PARENS(AST_Function, function(output) {
        return first_in_statement(output);
    });
    PARENS(AST_Object, function(output) {
        return first_in_statement(output);
    });
    PARENS(AST_Unary, function(output) {
        var p;
        p = output.parent();
        return p instanceof AST_PropAccess && p.expression === this;
    });
    PARENS(AST_Seq, function(output) {
        var p;
        p = output.parent();
        return p instanceof AST_Unary || p instanceof AST_VarDef || p instanceof AST_Dot || p instanceof AST_ObjectProperty || p instanceof AST_Conditional;
    });
    PARENS(AST_Binary, function(output) {
        var p, po, pp, so, sp;
        p = output.parent();
        if (p instanceof AST_BaseCall && p.expression === this) {
            return true;
        }
        if (p instanceof AST_Unary) {
            return true;
        }
        if (p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
        if (p instanceof AST_Binary) {
            po = p.operator;
            pp = PRECEDENCE[po];
            so = this.operator;
            sp = PRECEDENCE[so];
            if (pp > sp || pp === sp && this === p.right && !(so === po && (so === "*" || so === "&&" || so === "||"))) {
                return true;
            }
        }
    });
    PARENS(AST_PropAccess, function(output) {
        var p;
        p = output.parent();
        if (p instanceof AST_New && p.expression === this) {
            try {
                this.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_BaseCall) {
                        throw p;
                    }
                }));
            } catch (ՐՏ_Exception) {
                var ex = ՐՏ_Exception;
                if (ex !== p) {
                    throw ex;
                }
                return true;
            }
        }
    });
    PARENS(AST_BaseCall, function(output) {
        var p;
        p = output.parent();
        return p instanceof AST_New && p.expression === this;
    });
    PARENS(AST_New, function(output) {
        var p;
        p = output.parent();
        if (no_constructor_parens(this, output) && (p instanceof AST_PropAccess || p instanceof AST_BaseCall && p.expression === this)) {
            return true;
        }
    });
    PARENS(AST_Number, function(output) {
        var p;
        p = output.parent();
        if (this.getValue() < 0 && p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    });
    PARENS(AST_NaN, function(output) {
        var p;
        p = output.parent();
        if (p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    });
    function assign_and_conditional_paren_rules(output) {
        var p;
        p = output.parent();
        if (p instanceof AST_Unary) {
            return true;
        }
        if (p instanceof AST_Binary && !(p instanceof AST_Assign)) {
            return true;
        }
        if (p instanceof AST_BaseCall && p.expression === this) {
            return true;
        }
        if (p instanceof AST_Conditional && p.condition === this) {
            return true;
        }
        if (p instanceof AST_PropAccess && p.expression === this) {
            return true;
        }
    }
    PARENS(AST_Assign, assign_and_conditional_paren_rules);
    PARENS(AST_Conditional, assign_and_conditional_paren_rules);
    DEFPRINT(AST_Directive, function(self, output) {
        output.print_string(self.value);
        output.semicolon();
    });
    DEFPRINT(AST_Debugger, function(self, output) {
        output.print("debugger");
        output.semicolon();
    });
    function display_body(body, is_toplevel, output) {
        var last;
        last = body.length - 1;
        body.forEach(function(stmt, i) {
            if (!(stmt instanceof AST_EmptyStatement) && !(stmt instanceof AST_Definitions)) {
                output.indent();
                stmt.print(output);
                if (!(i === last && is_toplevel)) {
                    output.newline();
                }
            }
        });
    }
    function bind_methods(methods, output) {
        var arg;
        for (arg in methods) {
            output.indent();
            output.print("this.");
            output.assign(arg);
            output.print("ՐՏ_bind");
            output.with_parens(function() {
                output.print("this.");
                output.print(arg);
                output.comma();
                output.print("this");
            });
            output.semicolon();
            output.newline();
        }
    }
    function write_imports(module_, output) {
        var imports, import_id, name, nonlocalvars;
        imports = [];
        var ՐՏ_Iter24 = ՐՏ_Iterable(Object.keys(module_.imports));
        for (var ՐՏ_Index24 = 0; ՐՏ_Index24 < ՐՏ_Iter24.length; ՐՏ_Index24++) {
            import_id = ՐՏ_Iter24[ՐՏ_Index24];
            imports.push(module_.imports[import_id]);
        }
        imports.sort(function(a, b) {
            var ՐՏ_Unpack;
            ՐՏ_Unpack = [a.import_order, b.import_order];
            a = ՐՏ_Unpack[0];
            b = ՐՏ_Unpack[1];
            return a < b ? -1 : a > b ? 1 : 0;
        });
        if (imports.length > 1) {
            output.indent();
            output.print("var ՐՏ_modules = {};");
            output.newline();
        }
        nonlocalvars = {};
        var ՐՏ_Iter25 = ՐՏ_Iterable(imports);
        for (var ՐՏ_Index25 = 0; ՐՏ_Index25 < ՐՏ_Iter25.length; ՐՏ_Index25++) {
            module_ = ՐՏ_Iter25[ՐՏ_Index25];
            var ՐՏ_Iter26 = ՐՏ_Iterable(module_.nonlocalvars);
            for (var ՐՏ_Index26 = 0; ՐՏ_Index26 < ՐՏ_Iter26.length; ՐՏ_Index26++) {
                name = ՐՏ_Iter26[ՐՏ_Index26];
                nonlocalvars[name] = true;
            }
        }
        nonlocalvars = Object.getOwnPropertyNames(nonlocalvars).join(", ");
        if (nonlocalvars.length) {
            output.indent();
            output.print("var " + nonlocalvars);
            output.semicolon();
            output.newline();
        }
        var ՐՏ_Iter27 = ՐՏ_Iterable(imports);
        for (var ՐՏ_Index27 = 0; ՐՏ_Index27 < ՐՏ_Iter27.length; ՐՏ_Index27++) {
            module_ = ՐՏ_Iter27[ՐՏ_Index27];
            if (module_.module_id !== "__main__") {
                output.indent();
                output.print("ՐՏ_modules[\"");
                output.print(module_.module_id);
                output.print("\"] = {}");
                output.semicolon();
                output.newline();
            }
        }
        var ՐՏ_Iter28 = ՐՏ_Iterable(imports);
        for (var ՐՏ_Index28 = 0; ՐՏ_Index28 < ՐՏ_Iter28.length; ՐՏ_Index28++) {
            module_ = ՐՏ_Iter28[ՐՏ_Index28];
            if (module_.module_id !== "__main__") {
                print_module(module_, output);
            }
        }
    }
    function write_main_name(output) {
        if (output.option("write_name")) {
            output.newline();
            output.indent();
            output.print("var __name__ = \"__main__\"");
            output.semicolon();
            output.newline();
            output.newline();
        }
    }
    function display_complex_body(node, is_toplevel, output) {
        var offset, arg;
        offset = 0;
        if (node instanceof AST_Method && !node.static) {
            output.indent();
            output.print("var");
            output.space();
            output.assign(node.argnames[0]);
            output.print("this");
            output.semicolon();
            output.newline();
            offset += 1;
        }
        if (node instanceof AST_Scope) {
            if (node.argnames) {
                if (node.argnames.starargs) {
                    output.indent();
                    output.print("var");
                    output.space();
                    output.assign(node.argnames.starargs);
                    output.print("[].slice.call");
                    output.with_parens(function() {
                        output.print("arguments");
                        output.comma();
                        output.print(node.argnames.length - offset);
                    });
                    output.semicolon();
                    output.newline();
                }
                for (arg in node.argnames.defaults) {
                    output.indent();
                    output.print("if");
                    output.space();
                    output.with_parens(function() {
                        output.print("typeof " + arg);
                        output.space();
                        output.print("===");
                        output.space();
                        output.print("\"undefined\"");
                    });
                    output.space();
                    output.assign(arg);
                    force_statement(node.argnames.defaults[arg], output);
                    output.semicolon();
                    output.newline();
                }
            }
            if (output.option("auto_bind") && node.name && node.name.name === "__init__") {
                output.indent();
                output.print("ՐՏ_rebindAll");
                output.with_parens(function() {
                    output.print("this");
                    output.comma();
                    output.print("true");
                });
                output.semicolon();
                output.newline();
                bind_methods(node.bound, output);
            }
            declare_vars(node.localvars, output);
        } else if (node instanceof AST_Except) {
            if (node.argname) {
                output.indent();
                output.print("var");
                output.space();
                output.assign(node.argname);
                output.print("ՐՏ_Exception");
                output.semicolon();
                output.newline();
            }
        }
        display_body(node.body, is_toplevel, output);
    }
    function declare_vars(vars, output) {
        if (vars.length) {
            output.indent();
            output.print("var");
            output.space();
            vars.forEach(function(arg, i) {
                if (i) {
                    output.comma();
                }
                arg.print(output);
            });
            output.semicolon();
            output.newline();
        }
    }
    function declare_exports(module_id, exports, submodules, output) {
        var seen, symbol, key, sub_module_id;
        seen = {};
        var ՐՏ_Iter29 = ՐՏ_Iterable(exports);
        for (var ՐՏ_Index29 = 0; ՐՏ_Index29 < ՐՏ_Iter29.length; ՐՏ_Index29++) {
            symbol = ՐՏ_Iter29[ՐՏ_Index29];
            output.newline();
            output.indent();
            output.print("ՐՏ_modules[\"" + module_id + "\"][\"" + symbol.name + "\"] = " + symbol.name);
            seen[symbol.name] = true;
            output.semicolon();
            output.newline();
        }
        var ՐՏ_Iter30 = ՐՏ_Iterable(submodules);
        for (var ՐՏ_Index30 = 0; ՐՏ_Index30 < ՐՏ_Iter30.length; ՐՏ_Index30++) {
            sub_module_id = ՐՏ_Iter30[ՐՏ_Index30];
            if (!seen.hasOwnProperty(module_id)) {
                key = sub_module_id.split(".")[sub_module_id.split(".").length-1];
                output.newline();
                output.indent();
                output.print("ՐՏ_modules[\"" + module_id + "\"][\"" + key + "\"] = ");
                output.print("ՐՏ_modules[\"" + sub_module_id + "\"]");
                output.semicolon();
                output.newline();
            }
        }
    }
    function unpack_tuple(tuple, output, in_statement) {
        tuple.elements.forEach(function(elem, i) {
            output.indent();
            output.assign(elem);
            output.print("ՐՏ_Unpack");
            output.with_square(function() {
                output.print(i);
            });
            if (!in_statement || i < tuple.elements.length - 1) {
                output.semicolon();
                output.newline();
            }
        });
    }
    AST_StatementWithBody.DEFMETHOD("_do_print_body", function(output) {
        force_statement(this.body, output);
    });
    DEFPRINT(AST_Statement, function(self, output) {
        self.body.print(output);
        output.semicolon();
    });
    DEFPRINT(AST_Toplevel, function(self, output) {
        var is_main;
        is_main = output.is_main();
        if (output.option("private_scope") && is_main) {
            output.with_parens(function() {
                output.print("function()");
                output.with_block(function() {
                    output.indent();
                    output.print("\"use strict\"");
                    output.semicolon();
                    output.newline();
                    output.indent();
                    output.print("var ՐՏ_Temp");
                    output.semicolon();
                    output.newline();
                    Object.keys(self.baselib).forEach(function(key) {
                        var splat;
                        splat = output.get_baselib(key);
                        if (splat) {
                            splat.print(output);
                        }
                    });
                    write_imports(self, output);
                    output.newline();
                    output.indent();
                    output.with_parens(function() {
                        output.print("function()");
                        output.with_block(function() {
                            write_main_name(output);
                            output.newline();
                            display_complex_body(self, true, output);
                            output.newline();
                        });
                    });
                    output.print("();");
                    output.newline();
                });
            });
            output.print("();");
            output.print("");
        } else {
            if (is_main) {
                Object.keys(self.baselib).forEach(function(key) {
                    var splat;
                    splat = output.get_baselib(key);
                    if (splat) {
                        splat.print(output);
                    }
                });
                write_imports(self, output);
                write_main_name(output);
            }
            if (self.strict) {
                declare_vars(self.localvars, output);
            }
            display_body(self.body, true, output);
        }
    });
    function print_module(self, output) {
        output.newline();
        output.indent();
        output.with_parens(function() {
            output.print("function()");
            output.with_block(function() {
                output.indent();
                output.print("var ");
                output.assign("__name__");
                output.print("\"" + self.module_id + "\"");
                output.semicolon();
                output.newline();
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
                declare_exports(self.module_id, self.exports, self.submodules, output);
            });
        });
        output.print("()");
        output.semicolon();
        output.newline();
    }
    DEFPRINT(AST_Splat, function(self, output) {
        if (output.import(self.module.name)) {
            display_body(self.body.body, true, output);
            output.newline();
        }
    });
    DEFPRINT(AST_Imports, function(container, output) {
        var alias, argname, bound_name, self;
        function add_aname(aname, key, from_import) {
            output.print("var ");
            output.assign(aname);
            output.print("ՐՏ_modules[\"");
            output.print(key);
            output.print("\"]");
            if (from_import) {
                output.print(".");
                output.print(from_import);
            }
            output.semicolon();
            output.newline();
            output.indent();
        }
        var ՐՏ_Iter31 = ՐՏ_Iterable(container.imports);
        for (var ՐՏ_Index31 = 0; ՐՏ_Index31 < ՐՏ_Iter31.length; ՐՏ_Index31++) {
            self = ՐՏ_Iter31[ՐՏ_Index31];
            output.import(self.module.name);
            if (self.argnames) {
                var ՐՏ_Iter32 = ՐՏ_Iterable(self.argnames);
                for (var ՐՏ_Index32 = 0; ՐՏ_Index32 < ՐՏ_Iter32.length; ՐՏ_Index32++) {
                    argname = ՐՏ_Iter32[ՐՏ_Index32];
                    alias = argname.alias ? argname.alias.name : argname.name;
                    add_aname(alias, self.key, argname.name);
                }
            } else {
                if (self.alias) {
                    add_aname(self.alias.name, self.key, false);
                } else {
                    bound_name = self.key.split(".", 1)[0];
                    add_aname(bound_name, bound_name, false);
                }
            }
        }
    });
    DEFPRINT(AST_LabeledStatement, function(self, output) {
        self.label.print(output);
        output.colon();
        self.body.print(output);
    });
    DEFPRINT(AST_SimpleStatement, function(self, output) {
        if (!(self.body instanceof AST_EmptyStatement)) {
            self.body.print(output);
            output.semicolon();
        }
    });
    function print_bracketed(node, output, complex) {
        if (node.body.length > 0) {
            output.with_block(function() {
                if (complex) {
                    display_complex_body(node, false, output);
                } else {
                    display_body(node.body, false, output);
                }
            });
        } else {
            output.print("{}");
        }
    }
    DEFPRINT(AST_BlockStatement, function(self, output) {
        print_bracketed(self, output);
    });
    DEFPRINT(AST_EmptyStatement, function(self, output) {
    });
    DEFPRINT(AST_Do, function(self, output) {
        output.print("do");
        output.space();
        self._do_print_body(output);
        output.space();
        output.print("while");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.semicolon();
    });
    DEFPRINT(AST_While, function(self, output) {
        output.print("while");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    function is_simple_for_in(self) {
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "dir" && self.object.args.length === 1) {
            return true;
        }
        return false;
    }
    function is_simple_for(self) {
        if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "range" && !(self.init instanceof AST_Array) && (self.object.args.length < 3 || self.object.args.slice(-1)[0] instanceof AST_Number || self.object.args.slice(-1)[0] instanceof AST_Unary && self.object.args.slice(-1)[0].operator === "-" && self.object.args.slice(-1)[0].expression instanceof AST_Number)) {
            return true;
        }
        return false;
    }
    AST_ForIn.DEFMETHOD("_do_print_body", function(output) {
        var self;
        self = this;
        output.with_block(function() {
            if (!(is_simple_for(self) || is_simple_for_in(self))) {
                output.indent();
                if (self.init instanceof AST_Array) {
                    output.assign("ՐՏ_Unpack");
                    output.print("ՐՏ_Iter" + INDEX_COUNTER + "[ՐՏ_Index" + INDEX_COUNTER + "];");
                    output.newline();
                    unpack_tuple(self.init, output);
                } else {
                    output.assign(self.init);
                    output.print("ՐՏ_Iter" + INDEX_COUNTER + "[ՐՏ_Index" + INDEX_COUNTER + "];");
                    output.newline();
                }
                INDEX_COUNTER += 1;
            }
            self.body.body.forEach(function(stmt, i) {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        });
    });
    DEFPRINT(AST_ForIn, function(self, output) {
        var args, tmp_, start, end, increment;
        if (is_simple_for(self)) {
            increment = null;
            args = self.object.args;
            tmp_ = args.length;
            if (tmp_ === 1) {
                start = 0;
                end = args[0];
            } else if (tmp_ === 2) {
                start = args[0];
                end = args[1];
            } else if (tmp_ === 3) {
                start = args[0];
                end = args[1];
                increment = args[2];
            }
            output.print("for");
            output.space();
            output.with_parens(function() {
                output.assign(self.init);
                start.print ? start.print(output) : output.print(start);
                output.semicolon();
                output.space();
                self.init.print(output);
                output.space();
                increment instanceof AST_Unary ? output.print(">") : output.print("<");
                output.space();
                end.print(output);
                output.semicolon();
                output.space();
                self.init.print(output);
                if (increment && (!(increment instanceof AST_Unary) || increment.expression.value !== "1")) {
                    if (increment instanceof AST_Unary) {
                        output.print("-=");
                        increment.expression.print(output);
                    } else {
                        output.print("+=");
                        increment.print(output);
                    }
                } else {
                    if (increment instanceof AST_Unary) {
                        output.print("--");
                    } else {
                        output.print("++");
                    }
                }
            });
        } else if (is_simple_for_in(self)) {
            output.print("for");
            output.space();
            output.with_parens(function() {
                self.init.print(output);
                output.space();
                output.print("in");
                output.space();
                self.object.args[0].print(output);
            });
        } else {
            output.assign("var ՐՏ_Iter" + INDEX_COUNTER);
            output.print("ՐՏ_Iterable");
            output.with_parens(function() {
                self.object.print(output);
            });
            output.semicolon();
            output.newline();
            output.indent();
            output.print("for");
            output.space();
            output.with_parens(function() {
                output.print("var");
                output.space();
                output.assign("ՐՏ_Index" + INDEX_COUNTER);
                output.print("0");
                output.semicolon();
                output.space();
                output.print("ՐՏ_Index" + INDEX_COUNTER);
                output.space();
                output.print("<");
                output.space();
                output.print("ՐՏ_Iter" + INDEX_COUNTER + ".length");
                output.semicolon();
                output.space();
                output.print("ՐՏ_Index" + INDEX_COUNTER + "++");
            });
        }
        output.space();
        self._do_print_body(output);
    });
    AST_ForJS.DEFMETHOD("_do_print_body", function(output) {
        var self;
        self = this;
        output.with_block(function() {
            self.body.body.forEach(function(stmt, i) {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        });
    });
    DEFPRINT(AST_ForJS, function(self, output) {
        output.print("for");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    DEFPRINT(AST_ListComprehension, function(self, output) {
        var constructor, add_entry;
        constructor = {
            "ListComprehension": "[]",
            "DictComprehension": "{}"
        }[self.TYPE];
        if (self instanceof AST_DictComprehension) {
            add_entry = function() {
                output.indent();
                output.print("ՐՏ_Result");
                output.with_square(function() {
                    self.statement.print(output);
                });
                output.space();
                output.print("=");
                output.space();
                self.value_statement.print(output);
                output.semicolon();
                output.newline();
            };
        } else {
            add_entry = function() {
                output.indent();
                output.print("ՐՏ_Result.push");
                output.with_parens(function() {
                    self.statement.print(output);
                });
                output.semicolon();
                output.newline();
            };
        }
        output.with_parens(function() {
            output.print("function");
            output.print("()");
            output.space();
            output.with_block(function() {
                output.indent();
                output.assign("var ՐՏ_Iter");
                output.print("ՐՏ_Iterable");
                output.with_parens(function() {
                    self.object.print(output);
                });
                output.comma();
                output.assign("ՐՏ_Result");
                output.print(constructor);
                if (self.init instanceof AST_Array) {
                    self.init.elements.forEach(function(i) {
                        output.comma();
                        i.print(output);
                    });
                } else {
                    output.comma();
                    self.init.print(output);
                }
                output.semicolon();
                output.newline();
                output.indent();
                output.print("for");
                output.space();
                output.with_parens(function() {
                    output.print("var");
                    output.space();
                    output.assign("ՐՏ_Index");
                    output.print("0");
                    output.semicolon();
                    output.space();
                    output.print("ՐՏ_Index");
                    output.space();
                    output.print("<");
                    output.space();
                    output.print("ՐՏ_Iter.length");
                    output.semicolon();
                    output.space();
                    output.print("ՐՏ_Index++");
                });
                output.space();
                output.with_block(function() {
                    output.indent();
                    if (self.init instanceof AST_Array) {
                        output.assign("var ՐՏ_Unpack");
                        output.print("ՐՏ_Iter[ՐՏ_Index];");
                        output.newline();
                        unpack_tuple(self.init, output);
                    } else {
                        output.assign(self.init);
                        output.print("ՐՏ_Iter[ՐՏ_Index];");
                        output.newline();
                    }
                    if (self.condition) {
                        output.indent();
                        output.print("if");
                        output.space();
                        output.with_parens(function() {
                            self.condition.print(output);
                        });
                        output.space();
                        output.with_block(function() {
                            add_entry();
                        });
                        output.newline();
                    } else {
                        add_entry();
                    }
                });
                output.newline();
                output.indent();
                output.print("return ՐՏ_Result");
                output.semicolon();
                output.newline();
            });
        });
        output.print("()");
    });
    DEFPRINT(AST_With, function(self, output) {
        output.print("with");
        output.space();
        output.with_parens(function() {
            self.expression.print(output);
        });
        output.space();
        self._do_print_body(output);
    });
    function decorate(node, output, internalsub) {
        var wrap;
        wrap = function(d) {
            if (d.length) {
                output.print(d.slice(0)[0].name);
                output.with_parens(function() {
                    wrap(d.slice(1));
                });
            } else {
                internalsub();
            }
        };
        wrap(node.decorators);
    }
    AST_Lambda.DEFMETHOD("_do_print", function(output, nokeyword) {
        var self;
        self = this;
        function internalsub() {
            if (!nokeyword) {
                output.print("function");
            }
            if (self.name) {
                output.space();
                self.name.print(output);
            }
            output.with_parens(function() {
                self.argnames.forEach(function(arg, i) {
                    if (i) {
                        output.comma();
                    }
                    arg.print(output);
                });
                if (self.kwargs) {
                    if (argnames.length) {
                        output.comma();
                    }
                    output.print("ՐՏ_kw");
                }
            });
            output.space();
            print_bracketed(self, output, true);
        }
        if (self.decorators && self.decorators.length) {
            output.print("var");
            output.space();
            output.assign(self.name.name);
            decorate(self, output, internalsub);
            output.semicolon();
        } else {
            internalsub();
        }
    });
    DEFPRINT(AST_Lambda, function(self, output) {
        self._do_print(output);
    });
    AST_Class.DEFMETHOD("_do_print", function(output) {
        var self, class_def, define_method;
        self = this;
        if (self.external) {
            return;
        }
        class_def = function(method) {
            output.indent();
            self.name.print(output);
            if (method && ՐՏ_in(method, self.static)) {
                output.assign("." + method);
            } else {
                output.assign(".prototype" + (method ? "." + method : ""));
            }
        };
        define_method = function(stmt) {
            var name;
            name = stmt.name.name;
            class_def(name);
            function internalsub() {
                output.print("function");
                output.space();
                output.print(name);
                output.with_parens(function() {
                    stmt.argnames.forEach(function(arg, i) {
                        if (ՐՏ_in(name, self.static)) {
                            i += 1;
                        }
                        if (i > 1) {
                            output.comma();
                        }
                        if (i) {
                            arg.print(output);
                        }
                    });
                    if (self.kwargs) {
                        if (argnames.length) {
                            output.comma();
                        }
                        output.print("ՐՏ_kw");
                    }
                });
                print_bracketed(stmt, output, true);
            }
            if (stmt.decorators && stmt.decorators.length) {
                decorate(stmt, output, internalsub);
            } else {
                internalsub();
            }
            output.semicolon();
            output.newline();
        };
        function internalsub() {
            if (self.init || self.parent) {
                output.print("function");
                output.space();
                self.name.print(output);
                output.print("()");
                output.space();
                output.with_block(function() {
                    var cname;
                    bind_methods(self.bound, output);
                    output.indent();
                    cname = self.name ? self.name : self.parent;
                    cname.print(output);
                    output.print(".prototype.__init__.apply");
                    output.with_parens(function() {
                        output.print("this");
                        output.comma();
                        output.print("arguments");
                    });
                    output.semicolon();
                    output.newline();
                });
            } else {
                output.print("function");
                output.space();
                self.name.print(output);
                output.print("()");
                output.space();
                output.with_block(function() {
                    bind_methods(self.bound, output);
                });
            }
        }
        if (self.decorators && self.decorators.length) {
            output.print("var ");
            output.assign(self.name);
            decorate(self, output, internalsub);
            output.semicolon();
        } else {
            internalsub();
        }
        output.newline();
        if (self.parent) {
            output.indent();
            output.print("ՐՏ_extends");
            output.with_parens(function() {
                self.name.print(output);
                output.comma();
                self.parent.print(output);
            });
            output.semicolon();
            output.newline();
        }
        self.statements.forEach(function(stmt) {
            output.indent();
            stmt.print(output);
            output.newline();
        });
        self.body.forEach(function(stmt, i) {
            if (stmt instanceof AST_Method) {
                define_method(stmt);
            } else if (stmt instanceof AST_Class) {
                console.error("Nested classes aren't supported yet");
            }
        });
    });
    DEFPRINT(AST_Class, function(self, output) {
        self._do_print(output);
    });
    DEFPRINT(AST_SymbolClassRef, function(self, output) {
        self.class.print(output);
        output.print(".prototype.");
        output.print(self.name);
    });
    AST_Exit.DEFMETHOD("_do_print", function(output, kind) {
        var self;
        self = this;
        output.print(kind);
        if (self.value) {
            output.space();
            self.value.print(output);
        }
        output.semicolon();
    });
    DEFPRINT(AST_Return, function(self, output) {
        self._do_print(output, "return");
    });
    DEFPRINT(AST_Throw, function(self, output) {
        self._do_print(output, "throw");
    });
    AST_LoopControl.DEFMETHOD("_do_print", function(output, kind) {
        output.print(kind);
        if (this.label) {
            output.space();
            this.label.print(output);
        }
        output.semicolon();
    });
    DEFPRINT(AST_Break, function(self, output) {
        self._do_print(output, "break");
    });
    DEFPRINT(AST_Continue, function(self, output) {
        self._do_print(output, "continue");
    });
    function make_then(self, output) {
        var b;
        if (output.option("bracketize")) {
            make_block(self.body, output);
            return;
        }
        if (!self.body) {
            return output.force_semicolon();
        }
        if (self.body instanceof AST_Do && output.option("ie_proof")) {
            make_block(self.body, output);
            return;
        }
        b = self.body;
        while (true) {
            if (b instanceof AST_If) {
                if (!b.alternative) {
                    make_block(self.body, output);
                    return;
                }
                b = b.alternative;
            } else if (b instanceof AST_StatementWithBody) {
                b = b.body;
            } else {
                break;
            }
        }
        force_statement(self.body, output);
    }
    DEFPRINT(AST_If, function(self, output) {
        output.print("if");
        output.space();
        output.with_parens(function() {
            self.condition.print(output);
        });
        output.space();
        if (self.alternative) {
            make_then(self, output);
            output.space();
            output.print("else");
            output.space();
            force_statement(self.alternative, output);
        } else {
            self._do_print_body(output);
        }
    });
    DEFPRINT(AST_Switch, function(self, output) {
        output.print("switch");
        output.space();
        output.with_parens(function() {
            self.expression.print(output);
        });
        output.space();
        if (self.body.length > 0) {
            output.with_block(function() {
                self.body.forEach(function(stmt, i) {
                    if (i) {
                        output.newline();
                    }
                    output.indent(true);
                    stmt.print(output);
                });
            });
        } else {
            output.print("{}");
        }
    });
    AST_SwitchBranch.DEFMETHOD("_do_print_body", function(output) {
        if (this.body.length > 0) {
            output.newline();
            this.body.forEach(function(stmt) {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        }
    });
    DEFPRINT(AST_Default, function(self, output) {
        output.print("default:");
        self._do_print_body(output);
    });
    DEFPRINT(AST_Case, function(self, output) {
        output.print("case");
        output.space();
        self.expression.print(output);
        output.print(":");
        self._do_print_body(output);
    });
    DEFPRINT(AST_Try, function(self, output) {
        output.print("try");
        output.space();
        print_bracketed(self, output);
        if (self.bcatch) {
            output.space();
            self.bcatch.print(output);
        }
        if (self.bfinally) {
            output.space();
            self.bfinally.print(output);
        }
    });
    DEFPRINT(AST_Catch, function(self, output) {
        output.print("catch");
        output.space();
        output.with_parens(function() {
            output.print("ՐՏ_Exception");
        });
        output.space();
        if (self.body.length > 1 || self.body[0].errors.length) {
            output.with_block(function() {
                var no_default;
                output.indent();
                no_default = true;
                self.body.forEach(function(exception, i) {
                    var no_default;
                    if (i) {
                        output.print("else ");
                    }
                    if (exception.errors.length) {
                        output.print("if");
                        output.space();
                        output.with_parens(function() {
                            exception.errors.forEach(function(err, i) {
                                if (i) {
                                    output.newline();
                                    output.indent();
                                    output.print("||");
                                    output.space();
                                }
                                output.print("ՐՏ_Exception");
                                output.space();
                                output.print("instanceof");
                                output.space();
                                err.print(output);
                            });
                        });
                        output.space();
                    } else {
                        no_default = false;
                    }
                    print_bracketed(exception, output, true);
                    output.space();
                });
                if (no_default) {
                    output.print("else");
                    output.space();
                    output.with_block(function() {
                        output.indent();
                        output.print("throw");
                        output.space();
                        output.print("ՐՏ_Exception");
                        output.semicolon();
                        output.newline();
                    });
                }
                output.newline();
            });
        } else {
            print_bracketed(self.body[0], output, true);
        }
    });
    DEFPRINT(AST_Finally, function(self, output) {
        output.print("finally");
        output.space();
        print_bracketed(self, output);
    });
    AST_Definitions.DEFMETHOD("_do_print", function(output, kind) {
        var p, in_for, avoid_semicolon;
        output.print(kind);
        output.space();
        this.definitions.forEach(function(def_, i) {
            if (i) {
                output.comma();
            }
            def_.print(output);
        });
        p = output.parent();
        in_for = p instanceof AST_ForIn;
        avoid_semicolon = in_for && p.init === this;
        if (!avoid_semicolon) {
            output.semicolon();
        }
    });
    DEFPRINT(AST_Var, function(self, output) {
        self._do_print(output, "var");
    });
    DEFPRINT(AST_Const, function(self, output) {
        self._do_print(output, "const");
    });
    function parenthesize_for_noin(node, output, noin) {
        if (!noin) {
            node.print(output);
        } else {
            try {
                node.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_Binary && node.operator === "in") {
                        throw output;
                    }
                }));
                node.print(output);
            } catch (ՐՏ_Exception) {
                var ex = ՐՏ_Exception;
                if (ex !== output) {
                    throw ex;
                }
                node.print(output, true);
            }
        }
    }
    DEFPRINT(AST_VarDef, function(self, output) {
        var p, noin;
        self.name.print(output);
        if (self.value) {
            output.assign("");
            p = output.parent(1);
            noin = p instanceof AST_ForIn;
            parenthesize_for_noin(self.value, output, noin);
        }
    });
    CREATION = [];
    DEFPRINT(AST_BaseCall, function(self, output) {
        var call_format, object, has_kwarg_items, has_kwarg_formals, has_kwargs, obj, output_kwargs;
        call_format = function() {
            var rename;
            if (self instanceof AST_ClassCall) {
                if (self.static) {
                    self.class.print(output);
                    output.print(".");
                    output.print(self.method);
                } else {
                    self.class.print(output);
                    output.print(".prototype.");
                    output.print(self.method);
                    output.print(".call");
                }
            } else {
                rename = SPECIAL_METHODS.hasOwnProperty(self.expression.name) ? SPECIAL_METHODS[self.expression.name] : undefined;
                if (rename) {
                    output.print(rename);
                } else {
                    self.expression.print(output);
                }
            }
        };
        if (self instanceof AST_New) {
            object = CREATION.pop();
            if (no_constructor_parens(self, output)) {
                call_format();
                return;
            }
        }
        has_kwarg_items = self.args.kwarg_items && self.args.kwarg_items.length;
        has_kwarg_formals = self.args.kwargs && self.args.kwargs.length;
        has_kwargs = has_kwarg_items || has_kwarg_formals;
        if (self.args.starargs || has_kwargs) {
            obj = self instanceof AST_New ? object : self.expression.expression ? self.expression.expression : new AST_This();
            if (self instanceof AST_New) {
                call_format();
                output.semicolon();
                output.newline();
                output.indent();
                if (has_kwargs) {
                    output.print("kwargs");
                    output.with_parens(function() {
                        object.print(output);
                        output.print(".__init__");
                    });
                } else {
                    object.print(output);
                    output.print(".__init__");
                }
            } else if (has_kwargs) {
                output.print("kwargs");
                output.with_parens(function() {
                    call_format();
                });
            } else {
                call_format();
            }
        } else {
            call_format();
        }
        output_kwargs = function() {
            if (has_kwarg_items) {
                self.args.kwarg_items.forEach(function(kwname, i) {
                    if (i > 0) {
                        output.print(",");
                        output.space();
                    }
                    kwname.print(output);
                });
                if (has_kwarg_formals) {
                    output.print(",");
                    output.space();
                }
            }
            if (has_kwarg_formals) {
                output.print("{");
                self.args.kwargs.forEach(function(pair, i) {
                    if (i) {
                        output.comma();
                    }
                    pair[0].print(output);
                    output.print(":");
                    output.space();
                    pair[1].print(output);
                });
                output.print("}");
            }
        };
        if (self.args.starargs) {
            output.print(".apply");
            output.with_parens(function() {
                obj.print(output);
                output.comma();
                if (self.args.length > 1) {
                    output.with_square(function() {
                        self.args.slice(0, -1).forEach(function(expr, i) {
                            if (i) {
                                output.comma();
                            }
                            expr.print(output);
                        });
                    });
                } else {
                    self.args[0].print(output);
                }
                if (has_kwargs || self.args.length > 1) {
                    output.print(".concat");
                    output.with_parens(function() {
                        if (self.args.length > 1) {
                            self.args[self.args.length-1].print(output);
                            if (has_kwargs) {
                                output.comma();
                            }
                        }
                        output_kwargs();
                    });
                }
            });
        } else if (has_kwargs && (self instanceof AST_New || self.expression && self.expression.expression)) {
            output.print(".call");
            output.with_parens(function() {
                var arg;
                obj.print(output);
                var ՐՏ_Iter33 = ՐՏ_Iterable(self.args);
                for (var ՐՏ_Index33 = 0; ՐՏ_Index33 < ՐՏ_Iter33.length; ՐՏ_Index33++) {
                    arg = ՐՏ_Iter33[ՐՏ_Index33];
                    output.comma();
                    arg.print(output);
                }
                output.comma();
                output_kwargs();
            });
        } else {
            output.with_parens(function() {
                self.args.forEach(function(expr, i) {
                    if (i) {
                        output.comma();
                    }
                    expr.print(output);
                });
                if (has_kwargs) {
                    if (self.args.length) {
                        output.comma();
                    }
                    output_kwargs();
                }
            });
        }
    });
    DEFPRINT(AST_New, function(self, output) {
        output.print("new");
        output.space();
        AST_BaseCall.prototype._codegen(self, output);
    });
    AST_Seq.DEFMETHOD("_do_print", function(output) {
        var self, p, print_seq;
        self = this;
        p = output.parent();
        print_seq = function() {
            self.car.print(output);
            if (self.cdr) {
                output.comma();
                if (output.should_break()) {
                    output.newline();
                    output.indent();
                }
                self.cdr.print(output);
            }
        };
        if (p instanceof AST_Binary || p instanceof AST_Return || p instanceof AST_Array || p instanceof AST_BaseCall || p instanceof AST_SimpleStatement) {
            output.with_square(print_seq);
        } else {
            print_seq();
        }
    });
    DEFPRINT(AST_Seq, function(self, output) {
        self._do_print(output);
    });
    DEFPRINT(AST_Dot, function(self, output) {
        var expr;
        expr = self.expression;
        expr.print(output);
        if (expr instanceof AST_Number && expr.getValue() >= 0) {
            if (!/[xa-f.]/i.test(output.last())) {
                output.print(".");
            }
        }
        output.print(".");
        output.add_mapping(self.end);
        output.print_name(self.property);
    });
    DEFPRINT(AST_Sub, function(self, output) {
        self.expression.print(output);
        output.print("[");
        if (self.property instanceof AST_Unary && self.property.operator === "-" && self.property.expression instanceof AST_Number) {
            self.expression.print(output);
            output.print(".length");
        }
        self.property.print(output);
        output.print("]");
    });
    DEFPRINT(AST_Splice, function(self, output) {
        output.print("[].splice.apply");
        output.with_parens(function() {
            self.expression.print(output);
            output.comma();
            output.with_square(function() {
                self.property.print(output);
                output.comma();
                self.property2.print(output);
                output.print("-");
                self.property.print(output);
            });
            output.print(".concat");
            output.with_parens(function() {
                self.assignment.print(output);
            });
        });
    });
    DEFPRINT(AST_UnaryPrefix, function(self, output) {
        var op;
        op = self.operator;
        output.print(op);
        if (/^[a-z]/i.test(op)) {
            output.space();
        }
        self.expression.print(output);
    });
    DEFPRINT(AST_UnaryPostfix, function(self, output) {
        self.expression.print(output);
        output.print(self.operator);
    });
    DEFPRINT(AST_Binary, function(self, output) {
        var comparators, function_ops, normalize, leftvar, operator;
        comparators = {
            "<": true,
            ">": true,
            "<=": true,
            ">=": true,
            "==": true,
            "!=": true
        };
        function_ops = {
            "in": "ՐՏ_in",
            "**": "Math.pow",
            "//": "Math.floor"
        };
        normalize = function(op) {
            if (op === "==") {
                return "===";
            } else if (op === "!=") {
                return "!==";
            }
            return op;
        };
        if (ՐՏ_in(self.operator, function_ops)) {
            output.print(function_ops[self.operator]);
            output.with_parens(function() {
                self.left.print(output);
                if (self.operator === "//") {
                    output.space();
                    output.print("/");
                    output.space();
                } else {
                    output.comma();
                }
                self.right.print(output);
            });
        } else if (comparators[self.operator] && self.left instanceof AST_Binary && comparators[self.left.operator]) {
            operator = normalize(self.operator);
            if (self.left.right instanceof AST_Symbol) {
                self.left.print(output);
                leftvar = self.left.right.name;
            } else {
                self.left.left.print(output);
                output.space();
                output.print(self.left.operator);
                output.space();
                output.with_parens(function() {
                    output.assign("ՐՏ_Temp");
                    self.left.right.print(output);
                    leftvar = "ՐՏ_Temp";
                });
            }
            output.space();
            output.print("&&");
            output.space();
            output.print(leftvar);
            output.space();
            output.print(operator);
            output.space();
            self.right.print(output);
        } else {
            operator = normalize(self.operator);
            self.left.print(output);
            output.space();
            output.print(operator);
            output.space();
            self.right.print(output);
        }
    });
    DEFPRINT(AST_DeepEquality, function(self, output) {
        if (self.operator === "==") {
            self.left.print(output);
            output.space();
            output.print("===");
            output.space();
            self.right.print(output);
            output.space();
            output.print("||");
            output.space();
            output.print("typeof ");
            self.left.print(output);
            output.space();
            output.print("===");
            output.space();
            output.print("\"object\"");
            output.space();
            output.print("&&");
            output.space();
            output.print("eq");
            output.with_parens(function() {
                self.left.print(output);
                output.comma();
                self.right.print(output);
            });
        } else {
            self.left.print(output);
            output.space();
            output.print("!==");
            output.space();
            self.right.print(output);
            output.space();
            output.print("&&");
            output.space();
            output.with_parens(function() {
                output.print("typeof ");
                self.left.print(output);
                output.space();
                output.print("!==");
                output.space();
                output.print("\"object\"");
                output.space();
                output.print("||");
                output.space();
                output.print("!eq");
                output.with_parens(function() {
                    self.left.print(output);
                    output.comma();
                    self.right.print(output);
                });
            });
        }
    });
    DEFPRINT(AST_Assign, function(self, output) {
        if (self.operator === "//=") {
            output.assign(self.left);
            output.print("Math.floor");
            output.with_parens(function() {
                self.left.print(output);
                output.space();
                output.print("/");
                output.space();
                self.right.print(output);
            });
            return;
        }
        if (self.left instanceof AST_Array) {
            output.print("ՐՏ_Unpack");
        } else {
            self.left.print(output);
        }
        output.space();
        output.print(self.operator);
        output.space();
        if (self.right instanceof AST_New) {
            CREATION.push(self.left);
        }
        self.right.print(output);
        if (self.left instanceof AST_Array) {
            output.semicolon();
            output.newline();
            unpack_tuple(self.left, output, true);
        }
    });
    DEFPRINT(AST_Conditional, function(self, output) {
        self.condition.print(output);
        output.space();
        output.print("?");
        output.space();
        self.consequent.print(output);
        output.space();
        output.colon();
        self.alternative.print(output);
    });
    DEFPRINT(AST_Array, function(self, output) {
        output.with_square(function() {
            var a, len_;
            a = self.elements;
            len_ = a.length;
            if (len_ > 0) {
                output.space();
            }
            a.forEach(function(exp, i) {
                if (i) {
                    output.comma();
                }
                exp.print(output);
            });
            if (len_ > 0) {
                output.space();
            }
        });
    });
    DEFPRINT(AST_Object, function(self, output) {
        if (self.properties.length > 0) {
            output.with_block(function() {
                self.properties.forEach(function(prop, i) {
                    if (i) {
                        output.print(",");
                        output.newline();
                    }
                    output.indent();
                    prop.print(output);
                });
                output.newline();
            });
        } else {
            output.print("{}");
        }
    });
    DEFPRINT(AST_ObjectKeyVal, function(self, output) {
        var key;
        key = self.key;
        if (self.quoted) {
            output.print_string(key + "");
        } else if ((typeof key === "number" || !output.option("beautify") && +key + "" === key) && parseFloat(key) >= 0) {
            output.print(make_num(key));
        } else if (!is_identifier(key)) {
            output.print_string(key);
        } else {
            output.print_name(key);
        }
        output.colon();
        self.value.print(output);
    });
    DEFPRINT(AST_ObjectSetter, function(self, output) {
        output.print("set");
        self.value._do_print(output, true);
    });
    DEFPRINT(AST_ObjectGetter, function(self, output) {
        output.print("get");
        self.value._do_print(output, true);
    });
    AST_Symbol.DEFMETHOD("definition", function() {
        return this.thedef;
    });
    DEFPRINT(AST_Symbol, function(self, output) {
        var def_;
        def_ = self.definition();
        output.print_name(def_ ? def_.mangled_name || def_.name : self.name);
    });
    DEFPRINT(AST_Undefined, function(self, output) {
        output.print("void 0");
    });
    DEFPRINT(AST_Hole, noop);
    DEFPRINT(AST_Infinity, function(self, output) {
        output.print("1/0");
    });
    DEFPRINT(AST_NaN, function(self, output) {
        output.print("0/0");
    });
    DEFPRINT(AST_This, function(self, output) {
        output.print("this");
    });
    DEFPRINT(AST_Constant, function(self, output) {
        output.print(self.getValue());
    });
    DEFPRINT(AST_String, function(self, output) {
        output.print_string(self.getValue());
    });
    DEFPRINT(AST_Verbatim, function(self, output) {
        output.print(self.getValue());
    });
    DEFPRINT(AST_Number, function(self, output) {
        output.print(make_num(self.getValue()));
    });
    DEFPRINT(AST_RegExp, function(self, output) {
        var str_, p;
        str_ = self.getValue().toString();
        if (output.option("ascii_only")) {
            str_ = output.to_ascii(str_);
        }
        output.print(str_);
        p = output.parent();
        if (p instanceof AST_Binary && /^in/.test(p.operator) && p.left === self) {
            output.print(" ");
        }
    });
    function force_statement(stat, output) {
        if (output.option("bracketize")) {
            if (!stat || stat instanceof AST_EmptyStatement) {
                output.print("{}");
            } else if (stat instanceof AST_BlockStatement) {
                stat.print(output);
            } else {
                output.with_block(function() {
                    output.indent();
                    stat.print(output);
                    output.newline();
                });
            }
        } else {
            if (!stat || stat instanceof AST_EmptyStatement) {
                output.force_semicolon();
            } else {
                stat.print(output);
            }
        }
    }
    function first_in_statement(output) {
        var a, i, node, p;
        a = output.stack();
        i = a.length;
        node = a[i -= 1];
        p = a[i -= 1];
        while (i > 0) {
            if (p instanceof AST_Statement && p.body === node) {
                return true;
            }
            if (p instanceof AST_Seq && p.car === node || p instanceof AST_BaseCall && p.expression === node || p instanceof AST_Dot && p.expression === node || p instanceof AST_Sub && p.expression === node || p instanceof AST_Conditional && p.condition === node || p instanceof AST_Binary && p.left === node || p instanceof AST_UnaryPostfix && p.expression === node) {
                node = p;
                p = a[i -= 1];
            } else {
                return false;
            }
        }
    }
    function no_constructor_parens(self, output) {
        return self.args.length === 0 && !output.option("beautify");
    }
    function best_of(a) {
        var best, len_, i;
        best = a[0];
        len_ = best.length;
        for (i = 1; i < a.length; i++) {
            if (a[i].length < len_) {
                best = a[i];
                len_ = best.length;
            }
        }
        return best;
    }
    function make_num(num) {
        var str_, a, m;
        str_ = num.toString(10);
        a = [ str_.replace(/^0\./, ".").replace("e+", "e") ];
        m = null;
        if (Math.floor(num) === num) {
            if (num >= 0) {
                a.push("0x" + num.toString(16).toLowerCase(), "0" + num.toString(8));
            } else {
                a.push("-0x" + (-num).toString(16).toLowerCase(), "-0" + (-num).toString(8));
            }
            if (m = /^(.*?)(0+)$/.exec(num)) {
                a.push(m[1] + "e" + m[2].length);
            }
        } else if (m = /^0?\.(0+)(.*)$/.exec(num)) {
            a.push(m[2] + "e-" + (m[1].length + m[2].length), str_.substr(str_.indexOf(".")));
        }
        return best_of(a);
    }
    function make_block(stmt, output) {
        if (stmt instanceof AST_BlockStatement) {
            stmt.print(output);
            return;
        }
        output.with_block(function() {
            output.indent();
            stmt.print(output);
            output.newline();
        });
    }
    function DEFMAP(nodetype, generator) {
        nodetype.DEFMETHOD("add_source_map", function(stream) {
            generator(this, stream);
        });
    }
    DEFMAP(AST_Node, noop);
    function basic_sourcemap_gen(self, output) {
        output.add_mapping(self.start);
    }
    DEFMAP(AST_Directive, basic_sourcemap_gen);
    DEFMAP(AST_Debugger, basic_sourcemap_gen);
    DEFMAP(AST_Symbol, basic_sourcemap_gen);
    DEFMAP(AST_Jump, basic_sourcemap_gen);
    DEFMAP(AST_StatementWithBody, basic_sourcemap_gen);
    DEFMAP(AST_LabeledStatement, noop);
    DEFMAP(AST_Lambda, basic_sourcemap_gen);
    DEFMAP(AST_Switch, basic_sourcemap_gen);
    DEFMAP(AST_SwitchBranch, basic_sourcemap_gen);
    DEFMAP(AST_BlockStatement, basic_sourcemap_gen);
    DEFMAP(AST_Toplevel, noop);
    DEFMAP(AST_New, basic_sourcemap_gen);
    DEFMAP(AST_Try, basic_sourcemap_gen);
    DEFMAP(AST_Catch, basic_sourcemap_gen);
    DEFMAP(AST_Finally, basic_sourcemap_gen);
    DEFMAP(AST_Definitions, basic_sourcemap_gen);
    DEFMAP(AST_Constant, basic_sourcemap_gen);
    DEFMAP(AST_ObjectProperty, function(self, output) {
        output.add_mapping(self.start, self.key);
    });
})();