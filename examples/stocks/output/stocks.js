(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = new parent;
        child.prototype.constructor = child;
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
    function enumerate(item) {
        var arr = [];
        for (var i = 0; i < item.length; i++) {
            arr[arr.length] = [i, item[i]];
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
    var JSON, str;
            JSON = JSON || {};
    if (!JSON.stringify) {
        
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
    ;
    }
    str = JSON.stringify;
    function IndexError(message){
        var self = this;
        if (typeof message === "undefined") message = "list index out of range";
        self.name = "IndexError";
        self.message = message;
    };

    _$rapyd$_extends(IndexError, Error);

    function TypeError(message){
        var self = this;
        self.name = "TypeError";
        self.message = message;
    };

    _$rapyd$_extends(TypeError, Error);

    function ValueError(message){
        var self = this;
        self.name = "ValueError";
        self.message = message;
    };

    _$rapyd$_extends(ValueError, Error);

    function AssertionError(message){
        var self = this;
        if (typeof message === "undefined") message = "";
        self.name = "AssertionError";
        self.message = message;
    };

    _$rapyd$_extends(AssertionError, Error);

    if (!Array.prototype.map) {
        
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
	;
    }
    function map(oper, arr) {
        return list(arr.map(oper));
    }
    if (!Array.prototype.filter) {
        
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
	;
    }
    function filter(oper, arr) {
        return list(arr.filter(oper));
    }
    function sum(arr, start) {
        if (typeof start === "undefined") start = 0;
        return arr.reduce(function(prev, cur) {
            return prev + cur;
        }, start);
    }
    function deep_eq(a, b) {
        var i;
        "\n    Equality comparison that works with all data types, returns true if structure and\n    contents of first object equal to those of second object\n\n    Arguments:\n        a: first object\n        b: second object\n    ";
        if (a === b) {
            return true;
        }
        if (a instanceof Array && b instanceof Array || a instanceof Object && b instanceof Object) {
            if (a.constructor !== b.constructor || a.length !== b.length) {
                return false;
            }
            var _$rapyd$_Iter0 = dict.keys(a);
            for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                i = _$rapyd$_Iter0[_$rapyd$_Index0];
                if (b.hasOwnProperty(i)) {
                    if (!deep_eq(a[i], b[i])) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    String.prototype.find = Array.prototype.indexOf;
    String.prototype.strip = String.prototype.trim;
    String.prototype.lstrip = String.prototype.trimLeft;
    String.prototype.rstrip = String.prototype.trimRight;
    String.prototype.join = function(iterable) {
        return iterable.join(this);
    };
    String.prototype.zfill = function(size) {
        var s;
        s = this;
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    };
    function list(iterable) {
        if (typeof iterable === "undefined") iterable = [];
        var result, i;
        result = [];
        var _$rapyd$_Iter1 = iterable;
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            i = _$rapyd$_Iter1[_$rapyd$_Index1];
            result.append(i);
        }
        return result;
    }
    Array.prototype.append = Array.prototype.push;
    Array.prototype.find = Array.prototype.indexOf;
    Array.prototype.index = function(index) {
        var val;
        val = this.find(index);
        if (val == -1) {
            throw new ValueError(str(index) + " is not in list");
        }
        return val;
    };
    Array.prototype.insert = function(index, item) {
        this.splice(index, 0, item);
    };
    Array.prototype.pop = function(index) {
        if (typeof index === "undefined") index = this.length - 1;
        return this.splice(index, 1)[0];
    };
    Array.prototype.extend = function(array2) {
        this.push.apply(this, array2);
    };
    Array.prototype.remove = function(item) {
        var index;
        index = this.find(item);
        this.splice(index, 1);
    };
    Array.prototype.copy = function() {
        return this.slice(0);
    };
    function dict(iterable) {
        var result, key;
        result = {};
        var _$rapyd$_Iter2 = iterable;
        for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
            key = _$rapyd$_Iter2[_$rapyd$_Index2];
            result[key] = iterable[key];
        }
        return result;
    }
    if (typeof Object.getOwnPropertyNames !== "function") {
        dict.keys = function(hash) {
            var keys;
            keys = [];
            
        for (var x in hash) {
            if (hash.hasOwnProperty(x)) {
                keys.push(x);
            }
        }
        ;
            return keys;
        };
    } else {
        dict.keys = function(hash) {
            return Object.getOwnPropertyNames(hash);
        };
    }
    dict.values = function(hash) {
        var vals, key;
        vals = [];
        var _$rapyd$_Iter3 = dict.keys(hash);
        for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
            key = _$rapyd$_Iter3[_$rapyd$_Index3];
            vals.append(hash[key]);
        }
        return vals;
    };
    dict.items = function(hash) {
        var items, key;
        items = [];
        var _$rapyd$_Iter4 = dict.keys(hash);
        for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
            key = _$rapyd$_Iter4[_$rapyd$_Index4];
            items.append([key, hash[key]]);
        }
        return items;
    };
    dict.copy = dict;
    dict.clear = function(hash) {
        var key;
        var _$rapyd$_Iter5 = dict.keys(hash);
        for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
            key = _$rapyd$_Iter5[_$rapyd$_Index5];
            delete hash[key];
        }
    };
        function YQLError(message){
        var self = this;
        self.name = "YQLError";
        self.message = message;
    };

    _$rapyd$_extends(YQLError, Error);

    function YQL(query, callback, diagnostics){
        var self = this;
        if (typeof diagnostics === "undefined") diagnostics = false;
        var doNothing;
        self.query = query;
        doNothing = function() {
        };
        self.callback = callback || doNothing;
        self.diagnostics = diagnostics;
    };


    YQL.prototype.fetch = function fetch(){
        var self = this;
        var scriptEl, uid, encodedQuery, url;
        if (!self.query) {
            throw new YQLError("YQL.query attribute must be defined before invoking YQL.fetch()");
        } else if (!self.callback) {
            throw new YQLError("YQL.callback attribute must be defined before invoking YQL.fetch()");
        }
        scriptEl = document.createElement("script");
        uid = "yql" + new Date().getTime() + str(Math.floor(Math.random() * 1e3)).zfill(3);
        encodedQuery = encodeURIComponent(self.query.toLowerCase());
        window[uid] = function(json) {
            self.callback(json["query"]);
            delete window[uid];
            document.body.removeChild(scriptEl);
        };
        url = "http://query.yahooapis.com/v1/public/yql?q=" + encodedQuery;
        if (self.diagnostics) {
            url += "&diagnostics=true";
        }
        scriptEl.src = url + "&format=json&callback=" + uid;
        document.body.appendChild(scriptEl);
    };

    function Stock(symbols, callback){
        var self = this;
        if (typeof callback === "undefined") callback = null;
        var $start, $end, onUpdate, ENTER, onKeypress;
        self.callback = callback;
        $start = $("#start-date");
        $end = $("#end-date");
        onUpdate = function($event, ui) {
            var startdate, enddate;
            if ($event.type == "autocompleteselect") {
                self.$widget.val(ui.item.value);
            }
            startdate = $start.val();
            enddate = $end.val();
            self.get(startdate, enddate);
        };
        self.$widget = $("<input></input>").autocomplete({
            "minLength": 2,
            "source": symbols,
            "select": onUpdate
        });
        self.data = null;
        self.$widget.blur(onUpdate);
        ENTER = 13;
        onKeypress = function($event) {
            var code;
            code = $event.keyCode || $event.which;
            if (code == ENTER) {
                onUpdate($event);
            }
        };
        self.$widget.keypress(onKeypress);
    };


    Stock.prototype.get = function get(startDate, endDate){
        var self = this;
        var name, format, onUpdate, url;
        "\n\t\tget method for this stock, which retrieves info from google finance\n\t\t";
        name = self.$widget.val();
        if (self.symbol == name && self.startDate == startDate && self.endDate == endDate) {
            return;
        }
        self.symbol = name;
        self.startDate = startDate;
        self.endDate = endDate;
        format = function(date) {
            var mmddyyyy;
            mmddyyyy = date.split("/");
            return "-".join([ mmddyyyy[2], mmddyyyy[0], mmddyyyy[1] ]);
        };
        onUpdate = function(query) {
            if (query["results"] === null) {
                self.data = null;
                self.$widget.css("background", "#fdd");
            } else {
                self.data = query["results"]["row"];
                self.$widget.css("background", "");
            }
            if (self.callback !== null) {
                self.callback(name, self.data);
            }
        };
        if (self.symbol != "") {
            url = "http://www.google.com/finance/historical?q=" + name + "&startdate=" + format(startDate) + "&enddate=" + format(endDate) + "&output=csv";
            new YQL('select * from csv where url="' + url + '"', onUpdate).fetch();
        } else {
            self.data = null;
            self.$widget.css("background", "");
            self.callback(name, self.data);
        }
    };

    function StockChart(){
        var self = this;
        var $options, addFilter, normalize, makeMovingAvg, rsi, _$rapyd$_Unpack, name, fun;
        $options = $("#chart-options");
        self._filters = {};
        self._filterLogic = {};
        addFilter = function(name, callback) {
            var $button, setFilter;
            $button = $('<input type="checkbox" value="' + name.replace(" ", "-") + '">' + name + "</input>");
            $options.append($button);
            self._filterLogic[name] = callback;
            setFilter = function() {
                self._filters[name] = $(this).is(":checked");
                self.redraw();
            };
            $button.click(setFilter);
        };
        normalize = function(cols, rows) {
            var normalized, orig, num, stock, _$rapyd$_Unpack, day, row;
            normalized = [];
            orig = rows[len(rows) - 1];
            var _$rapyd$_Iter6 = enumerate(rows);
            for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
                _$rapyd$_Unpack = _$rapyd$_Iter6[_$rapyd$_Index6];
                day = _$rapyd$_Unpack[0];
                row = _$rapyd$_Unpack[1];
                normalized.append([ row[0] ]);
                var _$rapyd$_Iter7 = enumerate(row.slice(1));
                for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
                    _$rapyd$_Unpack = _$rapyd$_Iter7[_$rapyd$_Index7];
                    num = _$rapyd$_Unpack[0];
                    stock = _$rapyd$_Unpack[1];
                    normalized[day].append(stock / orig[num + 1]);
                }
            }
            return [cols, normalized];
        };
        makeMovingAvg = function(name, days, ema) {
            var sum;
            sum = function(a, b) {
                return a + b;
            };
            return [name, function(cols, rows) {
                var avgs, alpha, moving, row, _$rapyd$_Unpack, idx, col;
                var _$rapyd$_Iter8 = enumerate(cols);
                for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
                    _$rapyd$_Unpack = _$rapyd$_Iter8[_$rapyd$_Index8];
                    idx = _$rapyd$_Unpack[0];
                    col = _$rapyd$_Unpack[1];
                    if (col[len(col) - 1] != ")") {
                        avgs = [ {} ];
                        moving = [];
                        if (ema) {
                            alpha = 2 / (days + 1);
                            moving = rows[len(rows) - 1][idx + 1];
                        }
                        var _$rapyd$_Iter9 = reversed(rows);
                        for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
                            row = _$rapyd$_Iter9[_$rapyd$_Index9];
                            if (ema) {
                                moving = alpha * row[idx + 1] + (1 - alpha) * moving;
                                avgs.unshift({
                                    "col4": moving
                                });
                            } else {
                                moving.append(row[idx + 1]);
                                avgs.unshift({
                                    "col4": moving.reduce(sum) / len(moving)
                                });
                                if (len(moving) >= days) {
                                    moving.shift();
                                }
                            }
                        }
                        self.add(col + " (" + name + ")", avgs, cols, rows);
                    }
                }
                return [cols, rows];
            }];
        };
        rsi = function(cols, rows) {
            var ema15, rsis, current, DATE, prev, row, ups, tmp, downs, rs, index, _$rapyd$_Unpack, idx, col;
            _$rapyd$_Unpack = makeMovingAvg("", 15, true);
            tmp = _$rapyd$_Unpack[0];
            ema15 = _$rapyd$_Unpack[1];
            var _$rapyd$_Iter10 = enumerate(cols);
            for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
                _$rapyd$_Unpack = _$rapyd$_Iter10[_$rapyd$_Index10];
                idx = _$rapyd$_Unpack[0];
                col = _$rapyd$_Unpack[1];
                if (col[len(col) - 1] != ")") {
                    rsis = [ {} ];
                    ups = [];
                    downs = [];
                    prev = rows[len(rows) - 1][idx + 1];
                    var _$rapyd$_Iter11 = reversed(rows);
                    for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
                        row = _$rapyd$_Iter11[_$rapyd$_Index11];
                        current = row[idx + 1];
                        DATE = 0;
                        if (current > prev) {
                            ups.unshift([ DATE, current - prev ]);
                            downs.unshift([ DATE, 0 ]);
                        } else {
                            ups.unshift([ DATE, 0 ]);
                            downs.unshift([ DATE, prev - current ]);
                        }
                        prev = current;
                    }
                    _$rapyd$_Unpack = ema15([ "up" ], ups);
                    tmp = _$rapyd$_Unpack[0];
                    ups = _$rapyd$_Unpack[1];
                    _$rapyd$_Unpack = ema15([ "down" ], downs);
                    tmp = _$rapyd$_Unpack[0];
                    downs = _$rapyd$_Unpack[1];
                    for (index = 0; index < len(ups); index++) {
                        if (downs[index][2]) {
                            rs = ups[index][2] / downs[index][2];
                        } else {
                            rs = 100;
                        }
                        rsis.append({
                            "col4": 100 - 100 / (1 + rs)
                        });
                    }
                    self.add(col + " (RSI)", rsis, cols, rows);
                }
            }
            return [cols, rows];
        };
        var _$rapyd$_Iter12 = [ ["Normalize", normalize], makeMovingAvg("15-Day SMA", 15, false), makeMovingAvg("50-Day SMA", 50, false), makeMovingAvg("15-Day EMA", 15, true), makeMovingAvg("50-Day EMA", 50, true), ["15-Day RSI", 
        rsi] ];
        for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
            _$rapyd$_Unpack = _$rapyd$_Iter12[_$rapyd$_Index12];
            name = _$rapyd$_Unpack[0];
            fun = _$rapyd$_Unpack[1];
            addFilter(name, fun);
        }
        self.annotatedTimeline = new google.visualization.AnnotatedTimeLine($("#chart").get(0));
        self.clear();
    };


    StockChart.prototype.clear = function clear(){
        var self = this;
        self._cols = [];
        self._rows = [];
    };

    StockChart.prototype.add = function add(symbol, data, cols, rows){
        var self = this;
        if (typeof cols === "undefined") cols = self._cols;
        if (typeof rows === "undefined") rows = self._rows;
        var _$rapyd$_Unpack, index, item;
        if (data !== null) {
            if (!len(cols)) {
                var _$rapyd$_Iter13 = data.slice(1);
                for (var _$rapyd$_Index13 = 0; _$rapyd$_Index13 < _$rapyd$_Iter13.length; _$rapyd$_Index13++) {
                    item = _$rapyd$_Iter13[_$rapyd$_Index13];
                    rows.append([ new Date(item["col0"]), parseFloat(item["col4"]) ]);
                }
            } else {
                var _$rapyd$_Iter14 = enumerate(data.slice(1));
                for (var _$rapyd$_Index14 = 0; _$rapyd$_Index14 < _$rapyd$_Iter14.length; _$rapyd$_Index14++) {
                    _$rapyd$_Unpack = _$rapyd$_Iter14[_$rapyd$_Index14];
                    index = _$rapyd$_Unpack[0];
                    item = _$rapyd$_Unpack[1];
                    rows[index].append(parseFloat(item["col4"]));
                }
            }
            cols.append(symbol);
        }
    };

    StockChart.prototype.redraw = function redraw(){
        var self = this;
        var cols, rows, _$rapyd$_Unpack, key, val, data, col;
        cols = $.extend(true, [], self._cols);
        rows = $.extend(true, [], self._rows);
        var _$rapyd$_Iter15 = dict.items(self._filters);
        for (var _$rapyd$_Index15 = 0; _$rapyd$_Index15 < _$rapyd$_Iter15.length; _$rapyd$_Index15++) {
            _$rapyd$_Unpack = _$rapyd$_Iter15[_$rapyd$_Index15];
            key = _$rapyd$_Unpack[0];
            val = _$rapyd$_Unpack[1];
            if (val) {
                _$rapyd$_Unpack = self._filterLogic[key](cols, rows);
                cols = _$rapyd$_Unpack[0];
                rows = _$rapyd$_Unpack[1];
            }
        }
        data = new google.visualization.DataTable();
        data.addColumn("date", "Date");
        var _$rapyd$_Iter16 = cols;
        for (var _$rapyd$_Index16 = 0; _$rapyd$_Index16 < _$rapyd$_Iter16.length; _$rapyd$_Index16++) {
            col = _$rapyd$_Iter16[_$rapyd$_Index16];
            data.addColumn("number", col);
        }
        data.addRows(rows);
        self.annotatedTimeline.draw(data, {});
    };

    function main() {
        var stockFields, updateChart, onChartLoad, triggerChange, $start, $end, symbols, $stocks, newStock, sync, exchanges, onUpdate, exchange;
        stockFields = [];
        updateChart = function() {
        };
        onChartLoad = function() {
            var chart;
            chart = new StockChart();
            updateChart = function(symbol, data) {
                var stock;
                chart.clear();
                var _$rapyd$_Iter17 = stockFields;
                for (var _$rapyd$_Index17 = 0; _$rapyd$_Index17 < _$rapyd$_Iter17.length; _$rapyd$_Index17++) {
                    stock = _$rapyd$_Iter17[_$rapyd$_Index17];
                    chart.add(stock.symbol, stock.data);
                }
                chart.redraw();
            };
        };
        google.load("visualization", "1", {
            "packages": [ "annotatedtimeline" ],
            "callback": onChartLoad
        });
        triggerChange = function() {
            $(this).change();
        };
        $start = $("#start-date").datepicker({
            "onSelect": triggerChange
        });
        $end = $("#end-date").datepicker({
            "onSelect": triggerChange
        });
        $start.datepicker("setDate", -90);
        $end.datepicker("setDate", new Date());
        symbols = [];
        $stocks = $("#stock-input");
        newStock = function() {
            var symbol, get, onWidgetUpdate;
            symbol = new Stock(symbols);
            $stocks.append(symbol.$widget);
            get = function() {
                var startdate, enddate;
                startdate = $start.val();
                enddate = $end.val();
                symbol.get(startdate, enddate);
            };
            $start.change(get);
            $end.change(get);
            stockFields.append(symbol);
            onWidgetUpdate = function(label, data) {
                var value, isLast;
                value = symbol.symbol;
                isLast = symbol.$widget.is(":last-child");
                if (isLast && value != "") {
                    newStock();
                } else if (value == "" && !isLast) {
                    stockFields.remove(symbol);
                    symbol.$widget.remove();
                }
                updateChart(label, data);
            };
            symbol.callback = onWidgetUpdate;
        };
        sync = 0;
        exchanges = [ "nyse", "nasdaq", "lon" ];
        onUpdate = function(query) {
            var symbol, unique;
            var _$rapyd$_Iter18 = query["results"]["row"];
            for (var _$rapyd$_Index18 = 0; _$rapyd$_Index18 < _$rapyd$_Iter18.length; _$rapyd$_Index18++) {
                symbol = _$rapyd$_Iter18[_$rapyd$_Index18];
                symbols.append(symbol["col0"]);
            }
            sync += 1;
            if (sync == len(exchanges)) {
                $stocks.text("Stocks:");
                unique = function(element, index) {
                    return this.index(element) == index;
                };
                symbols = symbols.filter(unique, symbols);
                newStock();
            }
        };
        $stocks.text("Loading Symbols from Stock Exchanges");
        var _$rapyd$_Iter19 = exchanges;
        for (var _$rapyd$_Index19 = 0; _$rapyd$_Index19 < _$rapyd$_Iter19.length; _$rapyd$_Index19++) {
            exchange = _$rapyd$_Iter19[_$rapyd$_Index19];
            new YQL('select col0 from csv where url="http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=' + exchange + '&render=download"', onUpdate).fetch();
        }
    }
    $(document).ready(main);
})();