/* This file was auto-generated using RapydScript */
(function(){
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

_$rapyd$_print = function() {
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
  if (typeof iterable === "undefined") {iterable = []};
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
YQLError = function(message) {
  this.name = "YQLError";
  this.message = message;
};

YQLError.prototype = new Error();
YQLError.prototype.constructor = YQLError;
YQL = function(query, callback, diagnostics) {
  var doNothing;
  if (typeof diagnostics === "undefined") {diagnostics = false};
  this.query = query;
  doNothing = (function() {
    
  });
  this.callback = (callback || doNothing);
  this.diagnostics = diagnostics;
};

YQL.prototype.fetch = (function() {
  var encodedQuery, main, scriptEl, uid, url;
  if ((!this.query)) {
    throw new YQLError("YQL.query attribute must be defined before invoking YQL.fetch()");
  } else if ((!this.callback)) {
    throw new YQLError("YQL.callback attribute must be defined before invoking YQL.fetch()");
  }

  scriptEl = document.createElement("script");
  uid = (("yql" + new Date().getTime()) + str(Math.floor((Math.random() * 1000))).zfill(3));
  encodedQuery = encodeURIComponent(this.query.toLowerCase());
  main = this;
  YQL[uid] = (function(json) {
    main.callback(json["query"]);
    delete YQL[uid];
    document.body.removeChild(scriptEl);
  });
  url = ("http://query.yahooapis.com/v1/public/yql?q=" + encodedQuery);
  if (this.diagnostics) {
    url += "&diagnostics=true";
  }

  scriptEl.src = ((url + "&format=json&callback=YQL.") + uid);
  document.body.appendChild(scriptEl);
});
Stock = function(symbols, callback) {
  var $end, $start, ENTER, main, onKeypress, onUpdate;
  if (typeof callback === "undefined") {callback = null};
  this.callback = callback;
  $start = $("#start-date");
  $end = $("#end-date");
  main = this;
  onUpdate = (function($event, ui) {
    var enddate, startdate;
    if (($event.type == "autocompleteselect")) {
      main.$widget.val(ui.item.value);
    }

    startdate = $start.val();
    enddate = $end.val();
    main.get(startdate, enddate);
  });
  this.$widget = $("<input></input>").autocomplete({
    "minLength": 2,
    "source": symbols,
    "select": onUpdate
  });
  this.data = null;
  this.$widget.blur(onUpdate);
  ENTER = 13;
  onKeypress = (function($event) {
    var code;
    code = ($event.keyCode || $event.which);
    if ((code == ENTER)) {
      onUpdate($event);
    }

  });
  this.$widget.keypress(onKeypress);
};

Stock.prototype.get = (function(startDate, endDate) {
  var format, main, name, onUpdate, url;
  name = this.$widget.val();
  if ((((this.symbol == name) && (this.startDate == startDate)) && (this.endDate == endDate))) {
    return;
  }

  this.symbol = name;
  this.startDate = startDate;
  this.endDate = endDate;
  format = (function(date) {
    var mmddyyyy;
    mmddyyyy = date.split("/");
    return "-".join([mmddyyyy[2], mmddyyyy[0], mmddyyyy[1]]);
  });
  main = this;
  onUpdate = (function(query) {
    if ((query["results"] === null)) {
      main.data = null;
      main.$widget.css("background", "#fdd");
    } else {
      main.data = query["results"]["row"];
      main.$widget.css("background", "");
    }

    if ((main.callback !== null)) {
      main.callback(name, main.data);
    }

  });
  if ((this.symbol != "")) {
    url = (((((("http://www.google.com/finance/historical?q=" + name) + "&startdate=") + format(startDate)) + "&enddate=") + format(endDate)) + "&output=csv");
    new YQL((("select * from csv where url=\"" + url) + "\""), onUpdate).fetch();
  } else {
    this.data = null;
    this.$widget.css("background", "");
    this.callback(name, main.data);
  }

});
StockChart = function() {
  var $options, _$rapyd_tuple$_, addFilter, fun, main, makeMovingAvg, name, normalize, rsi;
  $options = $("#chart-options");
  main = this;
  this._filters = {
    
  };
  this._filterLogic = {
    
  };
  addFilter = (function(name, callback) {
    var $button, setFilter;
    $button = $((((("<input type=\"checkbox\" value=\"" + name.replace(" ", "-")) + "\">") + name) + "</input>"));
    $options.append($button);
    main._filterLogic[name] = callback;
    setFilter = (function() {
      main._filters[name] = $(this).is(":checked");
      main.redraw();
    });
    $button.click(setFilter);
  });
  normalize = (function(cols, rows) {
    var _$rapyd_tuple$_, day, normalized, num, orig, row, stock;
    normalized = [];
    orig = rows[(rows.length - 1)];
    var _$tmp4_data = _$rapyd$_iter(enumerate(rows));
    var _$tmp5_len = _$tmp4_data.length;
    for (var _$tmp6_index = 0; _$tmp6_index < _$tmp5_len; _$tmp6_index++) {
      _$rapyd$_tuple = _$tmp4_data[_$tmp6_index];
      day = _$rapyd$_tuple[0];
      row = _$rapyd$_tuple[1];

      normalized.append([row[0]]);
      var _$tmp1_data = _$rapyd$_iter(enumerate(row.slice(1)));
      var _$tmp2_len = _$tmp1_data.length;
      for (var _$tmp3_index = 0; _$tmp3_index < _$tmp2_len; _$tmp3_index++) {
        _$rapyd$_tuple = _$tmp1_data[_$tmp3_index];
        num = _$rapyd$_tuple[0];
        stock = _$rapyd$_tuple[1];

        normalized[day].append((stock / orig[(num + 1)]));
      }

    }

    return [cols, normalized];
  });
  makeMovingAvg = (function(name, days, ema) {
    var sum;
    sum = (function(a, b) {
      return (a + b);
    });
    return [name, (function(cols, rows) {
        var _$rapyd_tuple$_, alpha, avgs, col, idx, moving, row;
        var _$tmp10_data = _$rapyd$_iter(enumerate(cols));
        var _$tmp11_len = _$tmp10_data.length;
        for (var _$tmp12_index = 0; _$tmp12_index < _$tmp11_len; _$tmp12_index++) {
          _$rapyd$_tuple = _$tmp10_data[_$tmp12_index];
          idx = _$rapyd$_tuple[0];
          col = _$rapyd$_tuple[1];

          if ((col[(col.length - 1)] != ")")) {
            avgs = [{
                
              }];
            moving = [];
            if (ema) {
              alpha = (2 / (days + 1));
              moving = rows[(rows.length - 1)][(idx + 1)];
            }

            var _$tmp7_data = _$rapyd$_iter(reversed(rows));
            var _$tmp8_len = _$tmp7_data.length;
            for (var _$tmp9_index = 0; _$tmp9_index < _$tmp8_len; _$tmp9_index++) {
              row = _$tmp7_data[_$tmp9_index];

              if (ema) {
                moving = ((alpha * row[(idx + 1)]) + ((1 - alpha) * moving));
                avgs.unshift({
                  "col4": moving
                });
              } else {
                moving.append(row[(idx + 1)]);
                avgs.unshift({
                  "col4": (moving.reduce(sum) / moving.length)
                });
                if ((moving.length >= days)) {
                  moving.shift();
                }

              }

            }

            main.add((((col + " (") + name) + ")"), avgs, cols, rows);
          }

        }

        return [cols, rows];
      })];
  });
  rsi = (function(cols, rows) {
    var DATE, _$rapyd_tuple$_, col, current, downs, ema15, idx, index, prev, row, rs, rsis, tmp, ups;
    _$rapyd_tuple$_ = makeMovingAvg("", 15, true);
    tmp = _$rapyd_tuple$_[0];
    ema15 = _$rapyd_tuple$_[1];
    var _$tmp17_data = _$rapyd$_iter(enumerate(cols));
    var _$tmp18_len = _$tmp17_data.length;
    for (var _$tmp19_index = 0; _$tmp19_index < _$tmp18_len; _$tmp19_index++) {
      _$rapyd$_tuple = _$tmp17_data[_$tmp19_index];
      idx = _$rapyd$_tuple[0];
      col = _$rapyd$_tuple[1];

      if ((col[(col.length - 1)] != ")")) {
        rsis = [{
            
          }];
        ups = [];
        downs = [];
        prev = rows[(rows.length - 1)][(idx + 1)];
        var _$tmp13_data = _$rapyd$_iter(reversed(rows));
        var _$tmp14_len = _$tmp13_data.length;
        for (var _$tmp15_index = 0; _$tmp15_index < _$tmp14_len; _$tmp15_index++) {
          row = _$tmp13_data[_$tmp15_index];

          current = row[(idx + 1)];
          DATE = 0;
          if ((current > prev)) {
            ups.unshift([DATE, (current - prev)]);
            downs.unshift([DATE, 0]);
          } else {
            ups.unshift([DATE, 0]);
            downs.unshift([DATE, (prev - current)]);
          }

          prev = current;
        }

        _$rapyd_tuple$_ = ema15(["up"], ups);
        tmp = _$rapyd_tuple$_[0];
        ups = _$rapyd_tuple$_[1];
        _$rapyd_tuple$_ = ema15(["down"], downs);
        tmp = _$rapyd_tuple$_[0];
        downs = _$rapyd_tuple$_[1];
        var _$tmp16_end = ups.length;
        for (index = 0; index < _$tmp16_end; index++) {
          if (downs[index][2]) {
            rs = (ups[index][2] / downs[index][2]);
          } else {
            rs = 100;
          }

          rsis.append({
            "col4": (100 - (100 / (1 + rs)))
          });
        }

        main.add((col + " (RSI)"), rsis, cols, rows);
      }

    }

    return [cols, rows];
  });
  var _$tmp20_data = _$rapyd$_iter([["Normalize", normalize], makeMovingAvg("15-Day SMA", 15, false), makeMovingAvg("50-Day SMA", 50, false), makeMovingAvg("15-Day EMA", 15, true), makeMovingAvg("50-Day EMA", 50, true), ["15-Day RSI", rsi]]);
  var _$tmp21_len = _$tmp20_data.length;
  for (var _$tmp22_index = 0; _$tmp22_index < _$tmp21_len; _$tmp22_index++) {
    _$rapyd$_tuple = _$tmp20_data[_$tmp22_index];
    name = _$rapyd$_tuple[0];
    fun = _$rapyd$_tuple[1];

    addFilter(name, fun);
  }

  this.annotatedTimeline = new google.visualization.AnnotatedTimeLine($("#chart").get(0));
  this.clear();
};

StockChart.prototype.clear = (function() {
  this._cols = [];
  this._rows = [];
});
StockChart.prototype.add = (function(symbol, data, cols, rows) {
  var _$rapyd_tuple$_, index, item;
  if (typeof cols === "undefined") {cols = this._cols};
  if (typeof rows === "undefined") {rows = this._rows};
  if ((data !== null)) {
    if ((!cols.length)) {
      var _$tmp23_data = _$rapyd$_iter(data.slice(1));
      var _$tmp24_len = _$tmp23_data.length;
      for (var _$tmp25_index = 0; _$tmp25_index < _$tmp24_len; _$tmp25_index++) {
        item = _$tmp23_data[_$tmp25_index];

        rows.append([new Date(item["col0"]), parseFloat(item["col4"])]);
      }

    } else {
      var _$tmp26_data = _$rapyd$_iter(enumerate(data.slice(1)));
      var _$tmp27_len = _$tmp26_data.length;
      for (var _$tmp28_index = 0; _$tmp28_index < _$tmp27_len; _$tmp28_index++) {
        _$rapyd$_tuple = _$tmp26_data[_$tmp28_index];
        index = _$rapyd$_tuple[0];
        item = _$rapyd$_tuple[1];

        rows[index].append(parseFloat(item["col4"]));
      }

    }

    cols.append(symbol);
  }

});
StockChart.prototype.redraw = (function() {
  var _$rapyd_tuple$_, col, cols, data, key, rows, val;
  cols = $.extend(true, [], this._cols);
  rows = $.extend(true, [], this._rows);
  var _$tmp29_data = _$rapyd$_iter(dict.items(this._filters));
  var _$tmp30_len = _$tmp29_data.length;
  for (var _$tmp31_index = 0; _$tmp31_index < _$tmp30_len; _$tmp31_index++) {
    _$rapyd$_tuple = _$tmp29_data[_$tmp31_index];
    key = _$rapyd$_tuple[0];
    val = _$rapyd$_tuple[1];

    if (val) {
      _$rapyd_tuple$_ = this._filterLogic[key](cols, rows);
      cols = _$rapyd_tuple$_[0];
      rows = _$rapyd_tuple$_[1];
    }

  }

  data = new google.visualization.DataTable();
  data.addColumn("date", "Date");
  var _$tmp32_data = _$rapyd$_iter(cols);
  var _$tmp33_len = _$tmp32_data.length;
  for (var _$tmp34_index = 0; _$tmp34_index < _$tmp33_len; _$tmp34_index++) {
    col = _$tmp32_data[_$tmp34_index];

    data.addColumn("number", col);
  }

  data.addRows(rows);
  this.annotatedTimeline.draw(data, {
    
  });
});
main = function() {
  var $end, $start, $stocks, exchange, exchanges, newStock, onChartLoad, onUpdate, stockFields, symbols, sync, triggerChange, updateChart;
  stockFields = [];
  updateChart = (function() {
    
  });
  onChartLoad = (function() {
    var chart;
    
    chart = new StockChart();
    updateChart = (function(symbol, data) {
      var stock;
      chart.clear();
      var _$tmp35_data = _$rapyd$_iter(stockFields);
      var _$tmp36_len = _$tmp35_data.length;
      for (var _$tmp37_index = 0; _$tmp37_index < _$tmp36_len; _$tmp37_index++) {
        stock = _$tmp35_data[_$tmp37_index];

        chart.add(stock.symbol, stock.data);
      }

      chart.redraw();
    });
  });
  google.load("visualization", "1", {
    "packages": ["annotatedtimeline"],
    "callback": onChartLoad
  });
  triggerChange = (function() {
    $(this).change();
  });
  $start = $("#start-date").datepicker({
    "onSelect": triggerChange
  });
  $end = $("#end-date").datepicker({
    "onSelect": triggerChange
  });
  $start.datepicker("setDate", (-90));
  $end.datepicker("setDate", new Date());
  symbols = [];
  $stocks = $("#stock-input");
  newStock = (function() {
    var get, onWidgetUpdate, symbol;
    symbol = new Stock(symbols);
    $stocks.append(symbol.$widget);
    get = (function() {
      var enddate, startdate;
      startdate = $start.val();
      enddate = $end.val();
      symbol.get(startdate, enddate);
    });
    $start.change(get);
    $end.change(get);
    stockFields.append(symbol);
    onWidgetUpdate = (function(label, data) {
      var isLast, value;
      value = symbol.symbol;
      isLast = symbol.$widget.is(":last-child");
      if ((isLast && (value != ""))) {
        newStock();
      } else if (((value == "") && (!isLast))) {
        stockFields.remove(symbol);
        symbol.$widget.remove();
      }

      updateChart(label, data);
    });
    symbol.callback = onWidgetUpdate;
  });
  sync = 0;
  exchanges = ["nyse", "nasdaq", "lon"];
  onUpdate = (function(query) {
    var symbol, unique;
    
    var _$tmp38_data = _$rapyd$_iter(query["results"]["row"]);
    var _$tmp39_len = _$tmp38_data.length;
    for (var _$tmp40_index = 0; _$tmp40_index < _$tmp39_len; _$tmp40_index++) {
      symbol = _$tmp38_data[_$tmp40_index];

      symbols.append(symbol["col0"]);
    }

    sync += 1;
    if ((sync == exchanges.length)) {
      $stocks.text("Stocks:");
      unique = (function(element, index) {
        return (this.index(element) == index);
      });
      symbols = symbols.filter(unique, symbols);
      newStock();
    }

  });
  $stocks.text("Loading Symbols from Stock Exchanges");
  var _$tmp41_data = _$rapyd$_iter(exchanges);
  var _$tmp42_len = _$tmp41_data.length;
  for (var _$tmp43_index = 0; _$tmp43_index < _$tmp42_len; _$tmp43_index++) {
    exchange = _$tmp41_data[_$tmp43_index];

    new YQL((("select col0 from csv where url=\"http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=" + exchange) + "&render=download\""), onUpdate).fetch();
  }

};

$(document).ready(main);

}());