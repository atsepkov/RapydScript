function _$rapyd$_extends(child, parent) {
    child.prototype = new parent;
    child.prototype.constructor = child;
}
function _$rapyd$_in(val, arr) {
    if (arr instanceof Array || typeof arr === "string") return arr.indexOf(val) != -1;
    else {
        for (i in arr) {
            if (arr.hasOwnProperty(i) && i === val) return true;
        }
        return false;
    }
}
function abs(n) {
    return Math.abs(n);
}
function dir(item) {
    var arr = [];
    for (var i in item) {
        arr.push(i);
    }
    return arr;
}
function len(obj) {
    if (obj instanceof Array || typeof obj === "string") return obj.length;
    else {
        var count = 0;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) count++;
        }
        return count;
    }
}
function range(start, stop, step) {
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    var length = Math.max (Math.ceil ((stop - start) / step) , 0);
    var idx = 0;
    var range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function _$rapyd$_mixin(target, source, overwrite) {
    for (var i in source) {
        if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) target[i] = source[i];
    }
}
function _$rapyd$_bind(fn, thisArg) {
    if (fn._orig) fn = fn._orig;
    if (thisArg === false) return fn;
    var ret = fn.bind(thisArg);
    ret._orig = fn;
    return ret;
}
function enumerate(item) {
    var arr = [];
    for (var i = 0; i < item.length; i++) {
        arr[arr.length] = [i, item[i]];
    }
    return arr;
}
function _$rapyd$_print() {
    var args, output;
    args = [].slice.call(arguments, 0);
    output = JSON.stringify(args);
    if ("console" in window) console.log(output.substr(1, output.length-2));
}
function reversed(arr) {
    var tmp = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        tmp.push(arr[i]);
    }
    return tmp;
}
function getattr(obj, name) {
    return obj[name];
}
function setattr(obj, name, value) {
    obj[name] = value;
}
function hasattr(obj, name) {
    return name in obj;
}

