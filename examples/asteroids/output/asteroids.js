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
NUM_ASTEROIDS = 2;
FPS = 30;
FRICTION = 0.05;
THRUST = 0.2;
ROTATE_SPEED_PER_SEC = Math.PI;
ROTATE_SPEED = (ROTATE_SPEED_PER_SEC / FPS);
MAX_ASTEROID_SPEED = 2.0;
SHOT_LIFESPAN = 60;
SHOT_SPEED = 8.0;
SHOT_DELAY = 10;
ASTEROID_SIZE = 180.0;
ASTEROID_SIZES = [90.0, 45.0, 22.0, 11.0];
randfloat = function(min, max) {
  return ((Math.random() * (max - min)) + min);
};

randint = function(min, max) {
  return (Math.floor((Math.random() * ((max - min) + 1))) + min);
};

distsq = function(x1, y1, x2, y2) {
  return (((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
};

Asteroid = function(model, x, y, size) {
  if (typeof x === "undefined") {x = null};
  if (typeof y === "undefined") {y = null};
  if (typeof size === "undefined") {size = 0};
  this.model = model;
  if (((x === null) || (y === null))) {
    this.x = (model.x / 2);
    this.y = (model.y / 2);
    while ((distsq(this.x, this.y, (model.x / 2), (model.y / 2)) < (180 * 180))) {
      this.x = randint(0, model.x);
      this.y = randint(0, model.y);
    }

  } else {
    this.x = x;
    this.y = y;
  }

  this.dx = randfloat(0, MAX_ASTEROID_SPEED);
  this.dy = randfloat(0, MAX_ASTEROID_SPEED);
  this.rot = (randfloat(0, (2 * Math.PI)) - Math.PI);
  this.rotspeed = (randfloat(0, 0.1) - 0.05);
  this.size = size;
  this.radius = ASTEROID_SIZES[this.size];
  this.radius2 = (this.radius * this.radius);
  this.scale = ((this.radius / ASTEROID_SIZE) * 2);
};

Asteroid.prototype.update_dim = (function(pos, d_dim, max_dim) {
  pos += d_dim;
  if ((d_dim < 0)) {
    if ((pos <= 0)) {
      pos = (-pos);
      d_dim = (-d_dim);
    }

  } else {
    if ((pos >= max_dim)) {
      d_dim = (-d_dim);
      pos = ((2 * max_dim) - pos);
    }

  }

  return [pos, d_dim];
});
Asteroid.prototype.move = (function() {
  var _$rapyd_tuple$_;
  _$rapyd_tuple$_ = this.update_dim(this.x, this.dx, this.model.x);
  this.x = _$rapyd_tuple$_[0];
  this.dx = _$rapyd_tuple$_[1];
  _$rapyd_tuple$_ = this.update_dim(this.y, this.dy, this.model.y);
  this.y = _$rapyd_tuple$_[0];
  this.dy = _$rapyd_tuple$_[1];
  this.rot += this.rotspeed;
});
Shot = function(model, ship) {
  this.model = model;
  this.x = ship.x;
  this.y = ship.y;
  this.dx = ship.dx;
  this.dy = ship.dy;
  this.dir = ship.rot;
  this.lifespan = SHOT_LIFESPAN;
};

Shot.prototype.move = (function() {
  var a, i;
  this.lifespan -= 1;
  if ((this.lifespan <= 0)) {
    return false;
  }

  this.x = ((this.x + this.dx) + (SHOT_SPEED * Math.sin(this.dir)));
  this.y = ((this.y + this.dy) - (SHOT_SPEED * Math.cos(this.dir)));
  var _$tmp1_end = this.model.asteroids.length;
  for (i = 0; i < _$tmp1_end; i++) {
    a = this.model.asteroids[i];
    if ((distsq(this.x, this.y, a.x, a.y) < a.radius2)) {
      this.model.split_asteroid(i);
      return false;
    }

  }

  return true;
});
Ship = function(cx, cy) {
  this.cx = cx;
  this.cy = cy;
  this.reset();
};

Ship.prototype.rotate_ship = (function(drot) {
  this.rot += drot;
  if ((drot < (0 - Math.PI))) {
    drot += (2 * Math.PI);
  } else if ((drot > Math.PI)) {
    drot -= (2 * Math.PI);
  }

});
Ship.prototype.thrust = (function() {
  this.dx += (THRUST * Math.sin(this.rot));
  this.dy -= (THRUST * Math.cos(this.rot));
});
Ship.prototype.friction = (function() {
  var dir;
  if (((Math.abs(this.dx) < 0.001) && (Math.abs(this.dy) < 0.001))) {
    this.dx = 0;
    this.dy = 0;
  } else {
    dir = Math.atan2(this.dx, this.dy);
    this.dx -= (FRICTION * Math.sin(dir));
    this.dy -= (FRICTION * Math.cos(dir));
  }

});
Ship.prototype.move = (function() {
  this.shot_delay -= 1;
  this.x += this.dx;
  this.y += this.dy;
  if (((this.dx > 0) && (this.x >= this.cx))) {
    this.x -= this.cx;
  } else if (((this.dx < 0) && (this.x < 0))) {
    this.x += this.cx;
  }

  if (((this.y > 0) && (this.y >= this.cy))) {
    this.y -= this.cy;
  } else if (((this.dy < 0) && (this.y < 0))) {
    this.y += this.cy;
  }

});
Ship.prototype.reset = (function() {
  this.x = (this.cx / 2);
  this.y = (this.cy / 2);
  this.dx = 0;
  this.dy = 0;
  this.rot = 0;
  this.shot_delay = 0;
});
Model = function(x, y) {
  this.x = x;
  this.y = y;
  this.num_asteroids = NUM_ASTEROIDS;
  this.ship = new Ship(x, y);
};

Model.prototype.start_game = (function(view) {
  this.view = view;
});
Model.prototype.update = (function() {
  var a, i;
  var _$tmp2_end = this.asteroids.length;
  for (i = 0; i < _$tmp2_end; i++) {
    a = this.asteroids[i];
    a.move();
    if ((distsq(this.ship.x, this.ship.y, a.x, a.y) < a.radius2)) {
      this.destroyShip();
      return;
    }

  }

  i = this.shots.length;
  while (i--) {
    if ((!this.shots[i].move())) {
      this.shots.pop(i);
      if ((this.asteroids.length == 0)) {
        this.start_next_level();
        return;
      }

    }

  }

  this.ship.move();
  this.view.draw();
});
Model.prototype.start_next_level = (function() {
  this.num_asteroids += 1;
  this.reset();
});
Model.prototype.destroyShip = (function() {
  this.num_asteroids = NUM_ASTEROIDS;
  this.reset();
});
Model.prototype.reset = (function() {
  this.shots = [];
  this.asteroids = range(this.num_asteroids).map(function(i) {return new Asteroid(this);}, this);
  this.ship.reset();
});
Model.prototype.trigger_fire = (function() {
  if ((this.ship.shot_delay > 0)) {
    return;
  } else {
    this.shots.append(new Shot(this, this.ship));
    this.ship.shot_delay = SHOT_DELAY;
  }

});
Model.prototype.split_asteroid = (function(i) {
  var a, j;
  a = this.asteroids[i];
  if ((a.size < (ASTEROID_SIZES.length - 1))) {
    for (j = 0; j < 2; j++) {
      this.asteroids.append(new Asteroid(this, a.x, a.y, (a.size + 1)));
    }

  }

  this.asteroids.pop(i);
});
Controller = function(model) {
  this.model = model;
  this.key_up = false;
  this.key_down = false;
  this.key_left = false;
  this.key_right = false;
  this.key_fire = false;
};

Controller.prototype.start_game = (function(view) {
  var main;
  this.view = view;
  this.model.start_game(view);
  this.model.reset();
  main = this;
  setInterval((function() {
    main.update();
  }), (1000 / FPS));
});
Controller.prototype.update = (function() {
  this.keyboard_updates();
  this.model.update();
});
Controller.prototype.keyboard_updates = (function() {
  var drot, ship;
  ship = this.model.ship;
  drot = 0;
  if (this.key_left) {
    drot -= ROTATE_SPEED;
  }

  if (this.key_right) {
    drot += ROTATE_SPEED;
  }

  if (drot) {
    ship.rotate_ship(drot);
  }

  if (this.key_up) {
    ship.thrust();
  } else {
    ship.friction();
  }

  if (this.key_fire) {
    this.model.trigger_fire();
  }

});
SHOT_COLOR = "#fff";
ASTEROID_SIZE = 180.0;
CANVAS_DIM_X = 800;
CANVAS_DIM_Y = 600;
View = function(w, h, canvas) {
  var i, imgsrcs, main;
  this.width = w;
  this.height = h;
  this.canvas = canvas;
  this.model = new Model(w, h);
  this.controller = new Controller(this.model);
  this.number_images_loaded = 0;
  this.view_loaded = false;
  main = this;
  document.addEventListener("keydown", (function(event) {
    event.preventDefault();
    main.setKey(event.keyCode, true);
  }));
  document.addEventListener("keyup", (function(event) {
    event.preventDefault();
    main.setKey(event.keyCode, false);
  }));
  imgsrcs = ["./images/ship1.png", "./images/ship2.png", "./images/asteroid.png"];
  this.img = [null, null, null];
  for (i = 0; i < 3; i++) {
    main.img[i] = new Image();
    main.img[i].src = imgsrcs[i];
    main.img[i].onload = (function() {
      main.number_images_loaded += 1;
      if ((main.number_images_loaded >= 3)) {
        main.view_loaded = true;
        main.controller.start_game(main);
      }

    });
  }

};

View.prototype.setKey = (function(k, set) {
  if ((k == 38)) {
    this.controller.key_up = set;
  } else if ((k == 40)) {
    this.controller.key_down = set;
  } else if ((k == 37)) {
    this.controller.key_left = set;
  } else if ((k == 39)) {
    this.controller.key_right = set;
  } else if ((k == 32)) {
    this.controller.key_fire = set;
  }

});
View.prototype.draw_asteroid = (function(ctx, asteroid) {
  ctx.save();
  ctx.translate(asteroid.x, asteroid.y);
  ctx.rotate(asteroid.rot);
  ctx.scale(asteroid.scale, asteroid.scale);
  ctx.drawImage(this.img[2], (-(ASTEROID_SIZE / 2)), (-(ASTEROID_SIZE / 2)));
  ctx.restore();
});
View.prototype.draw_shot = (function(ctx, shot) {
  ctx.fillStyle = SHOT_COLOR;
  ctx.fillRect(Math.ceil((shot.x - 1)), Math.ceil((shot.y - 1)), 3, 3);
});
View.prototype.draw_ship = (function(ctx, ship) {
  var img;
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.rot);
  if (this.controller.key_up) {
    img = this.img[1];
  } else {
    img = this.img[0];
  }

  ctx.drawImage(img, (-15), (-12));
  ctx.restore();
});
View.prototype.draw = (function() {
  var ctx, i;
  ctx = this.canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, this.width, this.height);
  var _$tmp1_end = this.model.asteroids.length;
  for (i = 0; i < _$tmp1_end; i++) {
    this.draw_asteroid(ctx, this.model.asteroids[i]);
  }

  var _$tmp2_end = this.model.shots.length;
  for (i = 0; i < _$tmp2_end; i++) {
    this.draw_shot(ctx, this.model.shots[i]);
  }

  this.draw_ship(ctx, this.model.ship);
});
runGame = function() {
  var canvas, view;
  canvas = document.getElementById("myCanvas");
  view = new View(CANVAS_DIM_X, CANVAS_DIM_Y, canvas);
};


}());