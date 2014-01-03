function abs(n) {
    return Math.abs(n);
}
function enumerate(item) {
    var arr = [];
    for (var i = 0; i < item.length; i++) {
        arr[arr.length] = [i, item[i]];
    }
    return arr;
}
function _$rapyd$_bind(fn, thisArg){
    if (fn.orig) fn = fn.orig;
    var ret = function(){
        return fn.apply(thisArg, arguments);
    };
    ret.orig = fn;
    return ret;
};
function _$rapyd$_rebindAll(thisArg, rebind) {
    for (var p in thisArg) {
        if (thisArg[p] && thisArg[p].orig) {
            if (rebind) thisArg[p] = _$rapyd$_bind(thisArg[p], thisArg);
            else thisArg[p] = thisArg[p].orig;
        }
    }
}
function _$rapyd$_in(val, arr) {
    if (arr instanceof Array || typeof arr === "string") return arr.indexOf(val) != -1;
    else return val in arr;
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
function _$rapyd$_print() {
    var args, output;
    args = [].slice.call(arguments, 0);
    output = JSON.stringify(args);
    if ("console" in window) console.log(output.substr(1, output.length-2));
}
function range(a, b, step) {
    var arr = [];
    if (typeof b === "undefined") {
        b = a;
        a = 0;
    }
    arr[0] = a;
    step = step || 1;
    if (step > 0) {
        while (a + step < b) {
            a += step;
            arr[arr.length] = a;
        }
    }
    else {
        while (a + step > b) {
            a += step;
            arr[arr.length] = a;
        }
    }
    return arr;
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
