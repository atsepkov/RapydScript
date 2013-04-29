/* This file was auto-generated using RapydScript */
JSON = (JSON || {
  
});
if ((!JSON.stringify)) {
  
	JSON.stringify = function(obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string")
				obj = '"' + obj + '"';
			if (t == "function")
				return; // return undefined
			else
				return String(obj);
		} else {
			// recurse array or object
			var n, v, json = []
			var arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n];
				t = typeof (v);
				if (t != "function" && t != "undefined") {
					if (t == "string")
						v = '"' + v + '"';
					else if ((t == "object" || t == "function") && v !== null)
						v = JSON.stringify(v);
					json.push((arr ? "" : '"' + n + '":') + String(v));
				}
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	
}

str = JSON.stringify;
len = function(item) {
  return item.length;
};

range = function(a, b, step) {
  var A;
  A = [];
  if ((typeof(b) === "undefined")) {
    b = a;
    a = 0;
  }

  A[0] = a;
  step = (step || 1);
  if ((step > 0)) {
    while (((a + step) < b)) {
      a += step;
      A[A.length] = a;
    }

  } else {
    while (((a + step) > b)) {
      a += step;
      A[A.length] = a;
    }

  }

  return A;
};

enumerate = function(item) {
  var A;
  A = [];
  for (var i = 0; i < item.length; i++){A[A.length] = [i, item[i]];}
  return A;
};

reversed = function(arr) {
  var temp;
  temp = [];
  for (var i = arr.length - 1; i >= 0; i--) {temp.push(arr[i]);}
  return temp;
};

print = function() {
  var args, output;
  args = [].slice.call(arguments, 0);
  output = str(args);
  console.log(output.substr(1, (output.length - 2)));
};


isinstance = function(item, cls) {
	var cls_item, isnumber;
	if (cls instanceof Array) {
		var _$tmp13_data = _$rapyd$_iter(cls);
		var _$tmp14_len = _$tmp13_data.length;
		for (var _$tmp15_index = 0; _$tmp15_index < _$tmp14_len; _$tmp15_index++) {
			cls_item = _$tmp13_data[_$tmp15_index];

			if (isinstance(item, cls_item)) {
				return true;
			}

		}

		return false;
	}

	if ((cls === list)) {
		cls = Array;
	} else if ((cls === dict)) {
		cls = Object;
	} else if ((cls === str)) {
		cls = String;
	} else {
		return item instanceof cls;
	}

	return (item.constructor === cls.prototype.constructor);
};
_$rapyd$_iter = function(iter_object) {
	var key_list;
	if (((iter_object.callee && (typeof iter_object['length'] != "undefined")) || isinstance(iter_object, list))) {
		return iter_object;
	}

	key_list = [];
	for (var key in iter_object)
	key_list.append(key);
	return key_list;
};
Function.prototype.bind = (function(owner) {
	var bound, func;
	func = this;
	bound = function() {
		return func.apply(owner, arguments);
	};

	return bound;
});

ValueError = function(message) {
  this.name = "ValueError";
  this.message = message;
};

ValueError.prototype = new Error();
ValueError.prototype.constructor = ValueError;
String.prototype.strip = String.prototype.trim;
String.prototype.lstrip = String.prototype.trimLeft;
String.prototype.rstrip = String.prototype.trimRight;
String.prototype.join = (function(iterable) {
  return iterable.join(this);
});
String.prototype.zfill = (function(size) {
  var s;
  s = this;
  while ((s.length < size)) {
    s = ("0" + s);
  }

  return s;
});
list = function(iterable) {
  var i, result;
  result = [];
  var _$tmp1_data = _$rapyd$_iter(iterable);
  var _$tmp2_len = _$tmp1_data.length;
  for (var _$tmp3_index = 0; _$tmp3_index < _$tmp2_len; _$tmp3_index++) {
    i = _$tmp1_data[_$tmp3_index];

    result.append(i);
  }

  return result;
};

Array.prototype.append = Array.prototype.push;
Array.prototype.find = Array.prototype.indexOf;
Array.prototype.index = (function(index) {
  var val;
  val = this.find(index);
  if ((val == (-1))) {
    throw new ValueError((str(index) + " is not in list"));
  }

  return val;
});
Array.prototype.insert = (function(index, item) {
  this.splice(index, 0, item);
});
Array.prototype.pop = (function(index) {
  if ((!arguments.length)) {
    index = (this.length - 1);
  }

  return this.splice(index, 1)[0];
});
Array.prototype.extend = (function(array2) {
  this.push.apply(this, array2);
});
Array.prototype.remove = (function(item) {
  var index;
  index = this.find(item);
  this.splice(index, 1);
});
Array.prototype.copy = (function() {
  return this.slice(0);
});
if ((!Array.prototype.map)) {
  
	Array.prototype.map = function(callback, thisArg) {
		var T, A, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ({}.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		A = new Array(len);
		for (var k = 0; k < len; k++) {
			var kValue, mappedValue;
			if (k in O) {
				kValue = O[k];
				mappedValue = callback.call(T, kValue);
				A[k] = mappedValue;
			}
		}
		return A;
	};
	
}

map = function(oper, arr) {
  return arr.map(oper);
};

if ((!Array.prototype.filter)) {
  
	Array.prototype.filter = function(filterfun, thisArg) {
		"use strict";
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ({}.toString.call(filterfun) != "[object Function]") {
			throw new TypeError(filterfun + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		var A = [];
		var thisp = arguments[1];
		for (var k = 0; k < len; k++) {
			if (k in O) {
				var val = O[k]; // in case fun mutates this
				if (filterfun.call(T, val))
					A.push(val);
			}
		}
		return A;
	};
	
}

filter = function(oper, arr) {
  return arr.filter(oper);
};

dict = function(iterable) {
  var key, result;
  result = {
    
  };
  var _$tmp4_data = _$rapyd$_iter(iterable);
  var _$tmp5_len = _$tmp4_data.length;
  for (var _$tmp6_index = 0; _$tmp6_index < _$tmp5_len; _$tmp6_index++) {
    key = _$tmp4_data[_$tmp6_index];

    result[key] = iterable[key];
  }

  return result;
};

if ((typeof(Object.getOwnPropertyNames) !== "function")) {
  dict.keys = (function(hash) {
    var keys;
    keys = [];
    
		for (var x in hash) {
			// A for in will iterate over members on the prototype
			// chain as well, but Object.getOwnPropertyNames returns
			// only those directly on the object, so use hasOwnProperty.
			if (hash.hasOwnProperty(x)) {
				keys.push(x);
			}
		}
		
    return keys;
  });
} else {
  dict.keys = (function(hash) {
    return Object.getOwnPropertyNames(hash);
  });
}

dict.values = (function(hash) {
  var key, vals;
  vals = [];
  var _$tmp7_data = _$rapyd$_iter(dict.keys(hash));
  var _$tmp8_len = _$tmp7_data.length;
  for (var _$tmp9_index = 0; _$tmp9_index < _$tmp8_len; _$tmp9_index++) {
    key = _$tmp7_data[_$tmp9_index];

    vals.append(hash[key]);
  }

  return vals;
});
dict.items = (function(hash) {
  var items, key;
  items = [];
  var _$tmp10_data = _$rapyd$_iter(dict.keys(hash));
  var _$tmp11_len = _$tmp10_data.length;
  for (var _$tmp12_index = 0; _$tmp12_index < _$tmp11_len; _$tmp12_index++) {
    key = _$tmp10_data[_$tmp12_index];

    items.append([key, hash[key]]);
  }

  return items;
});
dict.copy = dict;
dict.clear = (function(hash) {
  var key;
  var _$tmp13_data = _$rapyd$_iter(dict.keys(hash));
  var _$tmp14_len = _$tmp13_data.length;
  for (var _$tmp15_index = 0; _$tmp15_index < _$tmp14_len; _$tmp15_index++) {
    key = _$tmp13_data[_$tmp15_index];

    delete hash[key];
  }

});
