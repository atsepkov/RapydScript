(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = new parent;
        child.prototype.constructor = child;
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
    var JSON, str, NUM_ASTEROIDS, FPS, FRICTION, THRUST, ROTATE_SPEED_PER_SEC, ROTATE_SPEED, MAX_ASTEROID_SPEED, SHOT_LIFESPAN, SHOT_SPEED, SHOT_DELAY, ASTEROID_SIZES, SHOT_COLOR, ASTEROID_SIZE, CANVAS_DIM_X, CANVAS_DIM_Y;
    "\nView\n\nThe view contains the canvas and has all the logic for drawing the game state\non the screen. The original Pyjs code used multiple libraries here. Of the 3\nfiles, this one required the most changes to port to RapydScript.\n";
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
        "\nModel\n\nThe model contains the classes representing the various game objects - the asteroid, ship\nand shots. These are used to store all the state information on these different objects\nas well as helping modify them. The original Pyjs code did not use any libraries so\nporting over this code required almost no changes to the code.\n";
    NUM_ASTEROIDS = 2;
    FPS = 30;
    FRICTION = .05;
    THRUST = .2;
    ROTATE_SPEED_PER_SEC = Math.PI;
    ROTATE_SPEED = ROTATE_SPEED_PER_SEC / FPS;
    MAX_ASTEROID_SPEED = 2;
    SHOT_LIFESPAN = 60;
    SHOT_SPEED = 8;
    SHOT_DELAY = 10;
    ASTEROID_SIZE = 180;
    ASTEROID_SIZES = [ 90, 45, 22, 11 ];
    function randfloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    function randint(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function distsq(x1, y1, x2, y2) {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    }
    function Asteroid(model, x, y, size){
        var self = this;
        if (typeof x === "undefined") x = null;
        if (typeof y === "undefined") y = null;
        if (typeof size === "undefined") size = 0;
        self.model = model;
        if (x === null || y === null) {
            self.x = model.x / 2;
            self.y = model.y / 2;
            while (distsq(self.x, self.y, model.x / 2, model.y / 2) < 180 * 180) {
                self.x = randint(0, model.x);
                self.y = randint(0, model.y);
            }
        } else {
            self.x = x;
            self.y = y;
        }
        self.dx = randfloat(0, MAX_ASTEROID_SPEED);
        self.dy = randfloat(0, MAX_ASTEROID_SPEED);
        self.rot = randfloat(0, 2 * Math.PI) - Math.PI;
        self.rotspeed = randfloat(0, .1) - .05;
        self.size = size;
        self.radius = ASTEROID_SIZES[self.size];
        self.radius2 = self.radius * self.radius;
        self.scale = self.radius / ASTEROID_SIZE * 2;
    };


    Asteroid.prototype.update_dim = function update_dim(pos, d_dim, max_dim){
        var self = this;
        pos += d_dim;
        if (d_dim < 0) {
            if (pos <= 0) {
                pos = -pos;
                d_dim = -d_dim;
            }
        } else {
            if (pos >= max_dim) {
                d_dim = -d_dim;
                pos = 2 * max_dim - pos;
            }
        }
        return [pos, d_dim];
    };

    Asteroid.prototype.move = function move(){
        var self = this;
        var _$rapyd$_Unpack;
        _$rapyd$_Unpack = self.update_dim(self.x, self.dx, self.model.x);
        self.x = _$rapyd$_Unpack[0];
        self.dx = _$rapyd$_Unpack[1];
        _$rapyd$_Unpack = self.update_dim(self.y, self.dy, self.model.y);
        self.y = _$rapyd$_Unpack[0];
        self.dy = _$rapyd$_Unpack[1];
        self.rot += self.rotspeed;
    };

    function Shot(model, ship){
        var self = this;
        self.model = model;
        self.x = ship.x;
        self.y = ship.y;
        self.dx = ship.dx;
        self.dy = ship.dy;
        self.direction = ship.rot;
        self.lifespan = SHOT_LIFESPAN;
    };


    Shot.prototype.move = function move(){
        var self = this;
        var _$rapyd$_Unpack, i, a;
        self.lifespan -= 1;
        if (self.lifespan <= 0) {
            return false;
        }
        self.x = self.x + self.dx + SHOT_SPEED * Math.sin(self.direction);
        self.y = self.y + self.dy - SHOT_SPEED * Math.cos(self.direction);
        var _$rapyd$_Iter6 = enumerate(self.model.asteroids);
        for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
            _$rapyd$_Unpack = _$rapyd$_Iter6[_$rapyd$_Index6];
            i = _$rapyd$_Unpack[0];
            a = _$rapyd$_Unpack[1];
            if (distsq(self.x, self.y, a.x, a.y) < a.radius2) {
                self.model.split_asteroid(i);
                return false;
            }
        }
        return true;
    };

    function Ship(cx, cy){
        var self = this;
        self.cx = cx;
        self.cy = cy;
        self.reset();
    };


    Ship.prototype.rotate_ship = function rotate_ship(drot){
        var self = this;
        self.rot += drot;
        if (drot < 0 - Math.PI) {
            drot += 2 * Math.PI;
        } else if (drot > Math.PI) {
            drot -= 2 * Math.PI;
        }
    };

    Ship.prototype.thrust = function thrust(){
        var self = this;
        self.dx += THRUST * Math.sin(self.rot);
        self.dy -= THRUST * Math.cos(self.rot);
    };

    Ship.prototype.friction = function friction(){
        var self = this;
        var direction;
        if (Math.abs(self.dx) < .001 && Math.abs(self.dy) < .001) {
            self.dx = 0;
            self.dy = 0;
        } else {
            direction = Math.atan2(self.dx, self.dy);
            self.dx -= FRICTION * Math.sin(direction);
            self.dy -= FRICTION * Math.cos(direction);
        }
    };

    Ship.prototype.move = function move(){
        var self = this;
        self.shot_delay -= 1;
        self.x += self.dx;
        self.y += self.dy;
        if (self.dx > 0 && self.x >= self.cx) {
            self.x -= self.cx;
        } else if (self.dx < 0 && self.x < 0) {
            self.x += self.cx;
        }
        if (self.y > 0 && self.y >= self.cy) {
            self.y -= self.cy;
        } else if (self.dy < 0 && self.y < 0) {
            self.y += self.cy;
        }
    };

    Ship.prototype.reset = function reset(){
        var self = this;
        self.x = self.cx / 2;
        self.y = self.cy / 2;
        self.dx = 0;
        self.dy = 0;
        self.rot = 0;
        self.shot_delay = 0;
    };

    function Model(x, y){
        var self = this;
        self.x = x;
        self.y = y;
        self.num_asteroids = NUM_ASTEROIDS;
        self.ship = new Ship(x, y);
    };


    Model.prototype.start_game = function start_game(view){
        var self = this;
        self.view = view;
    };

    Model.prototype.update = function update(){
        var self = this;
        var a, i;
        var _$rapyd$_Iter7 = self.asteroids;
        for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
            a = _$rapyd$_Iter7[_$rapyd$_Index7];
            a.move();
            if (distsq(self.ship.x, self.ship.y, a.x, a.y) < a.radius2) {
                self.destroyShip();
                return;
            }
        }
        var _$rapyd$_Iter8 = reversed(range(len(self.shots)));
        for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
            i = _$rapyd$_Iter8[_$rapyd$_Index8];
            if (!self.shots[i].move()) {
                self.shots.pop(i);
                if (len(self.asteroids) == 0) {
                    self.start_next_level();
                    return;
                }
            }
        }
        self.ship.move();
        self.view.draw();
    };

    Model.prototype.start_next_level = function start_next_level(){
        var self = this;
        self.num_asteroids += 1;
        self.reset();
    };

    Model.prototype.destroyShip = function destroyShip(){
        var self = this;
        self.num_asteroids = NUM_ASTEROIDS;
        self.reset();
    };

    Model.prototype.reset = function reset(){
        var self = this;
        self.shots = [];
        self.asteroids = (function() {
            var _$rapyd$_Iter = range(self.num_asteroids), _$rapyd$_Result = [], i;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                i = _$rapyd$_Iter[_$rapyd$_Index];
                _$rapyd$_Result.push(new Asteroid(self));
            }
            return _$rapyd$_Result;
        })();
        self.ship.reset();
    };

    Model.prototype.trigger_fire = function trigger_fire(){
        var self = this;
        if (self.ship.shot_delay > 0) {
            return;
        } else {
            self.shots.append(new Shot(self, self.ship));
            self.ship.shot_delay = SHOT_DELAY;
        }
    };

    Model.prototype.split_asteroid = function split_asteroid(i){
        var self = this;
        var a, j;
        a = self.asteroids[i];
        if (a.size < len(ASTEROID_SIZES) - 1) {
            for (j = 0; j < 2; j++) {
                self.asteroids.append(new Asteroid(self, a.x, a.y, a.size + 1));
            }
        }
        self.asteroids.pop(i);
    };

        "\nController\n\nThe controller runs the game and modifies the Model. This required very few changes\nto port from Pyjs.\n";
    
    function Controller(model){
        var self = this;
        self.model = model;
        self.key_up = false;
        self.key_down = false;
        self.key_left = false;
        self.key_right = false;
        self.key_fire = false;
    };


    Controller.prototype.start_game = function start_game(view){
        var self = this;
        self.view = view;
        self.model.start_game(view);
        self.model.reset();
        setInterval(function() {
            self.update();
        }, 1e3 / FPS);
    };

    Controller.prototype.update = function update(){
        var self = this;
        self.keyboard_updates();
        self.model.update();
    };

    Controller.prototype.keyboard_updates = function keyboard_updates(){
        var self = this;
        var ship, drot;
        ship = self.model.ship;
        drot = 0;
        if (self.key_left) {
            drot -= ROTATE_SPEED;
        }
        if (self.key_right) {
            drot += ROTATE_SPEED;
        }
        if (drot) {
            ship.rotate_ship(drot);
        }
        if (self.key_up) {
            ship.thrust();
        } else {
            ship.friction();
        }
        if (self.key_fire) {
            self.model.trigger_fire();
        }
    };

    SHOT_COLOR = "#fff";
    ASTEROID_SIZE = 180;
    CANVAS_DIM_X = 800;
    CANVAS_DIM_Y = 600;
    function View(w, h, canvas){
        var self = this;
        var imgsrcs, i;
        self.width = w;
        self.height = h;
        self.canvas = canvas;
        self.model = new Model(w, h);
        self.controller = new Controller(self.model);
        self.number_images_loaded = 0;
        self.view_loaded = false;
        document.addEventListener("keydown", function(event) {
            event.preventDefault();
            self.setKey(event.keyCode, true);
        });
        document.addEventListener("keyup", function(event) {
            event.preventDefault();
            self.setKey(event.keyCode, false);
        });
        imgsrcs = [ "./images/ship1.png", "./images/ship2.png", "./images/asteroid.png" ];
        self.img = [ null, null, null ];
        for (i = 0; i < 3; i++) {
            self.img[i] = new Image();
            self.img[i].src = imgsrcs[i];
            self.img[i].onload = function() {
                self.number_images_loaded += 1;
                if (self.number_images_loaded >= 3) {
                    self.view_loaded = true;
                    self.controller.start_game(self);
                }
            };
        }
    };


    View.prototype.setKey = function setKey(k, set){
        var self = this;
        if (k == 38) {
            self.controller.key_up = set;
        } else if (k == 40) {
            self.controller.key_down = set;
        } else if (k == 37) {
            self.controller.key_left = set;
        } else if (k == 39) {
            self.controller.key_right = set;
        } else if (k == 32) {
            self.controller.key_fire = set;
        }
    };

    View.prototype.draw_asteroid = function draw_asteroid(ctx, asteroid){
        var self = this;
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.rot);
        ctx.scale(asteroid.scale, asteroid.scale);
        ctx.drawImage(self.img[2], -(ASTEROID_SIZE / 2), -(ASTEROID_SIZE / 2));
        ctx.restore();
    };

    View.prototype.draw_shot = function draw_shot(ctx, shot){
        var self = this;
        ctx.fillStyle = SHOT_COLOR;
        ctx.fillRect(Math.ceil(shot.x - 1), Math.ceil(shot.y - 1), 3, 3);
    };

    View.prototype.draw_ship = function draw_ship(ctx, ship){
        var self = this;
        var img;
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.rot);
        if (self.controller.key_up) {
            img = self.img[1];
        } else {
            img = self.img[0];
        }
        ctx.drawImage(img, -15, -12);
        ctx.restore();
    };

    View.prototype.draw = function draw(){
        var self = this;
        var ctx, i;
        ctx = self.canvas.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, self.width, self.height);
        for (i = 0; i < len(self.model.asteroids); i++) {
            self.draw_asteroid(ctx, self.model.asteroids[i]);
        }
        for (i = 0; i < len(self.model.shots); i++) {
            self.draw_shot(ctx, self.model.shots[i]);
        }
        self.draw_ship(ctx, self.model.ship);
    };

    window.runGame = function() {
        var canvas, view;
        canvas = document.getElementById("myCanvas");
        view = new View(CANVAS_DIM_X, CANVAS_DIM_Y, canvas);
    };
})();