(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = new parent;
        child.prototype.constructor = child;
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
    var WIDTH, HEIGHT, lightDir, lightColor, CHECKER_PATTERN, toggle;
    WIDTH = 440;
    HEIGHT = 240;
    function Vector(x, y, z){
        var self = this;
        if (typeof x === "undefined") x = 0;
        if (typeof y === "undefined") y = 0;
        if (typeof z === "undefined") z = 0;
        self.x = x;
        self.y = y;
        self.z = z;
    };


    Vector.prototype.copy = function copy(){
        var self = this;
        return new Vector(self.x, self.y, self.z);
    };

    Vector.prototype.length = function length(){
        var self = this;
        return Math.sqrt(self.x * self.x + self.y * self.y + self.z * self.z);
    };

    Vector.prototype.sqrLength = function sqrLength(){
        var self = this;
        return self.x * self.x + self.y * self.y + self.z * self.z;
    };

    Vector.prototype.normalize = function normalize(){
        var self = this;
        var inv;
        inv = 1 / self.length();
        return new Vector(self.x * inv, self.y * inv, self.z * inv);
    };

    Vector.prototype.negate = function negate(){
        var self = this;
        return new Vector(-self.x, -self.y, -self.z);
    };

    Vector.prototype.add = function add(v){
        var self = this;
        return new Vector(self.x + v.x, self.y + v.y, self.z + v.z);
    };

    Vector.prototype.sub = function sub(v){
        var self = this;
        return new Vector(self.x - v.x, self.y - v.y, self.z - v.z);
    };

    Vector.prototype.times = function times(k){
        var self = this;
        return new Vector(k * self.x, k * self.y, k * self.z);
    };

    Vector.prototype.dot = function dot(t){
        var self = this;
        return self.x * t.x + self.y * t.y + self.z * t.z;
    };

    Vector.prototype.cross = function cross(w){
        var self = this;
        var v;
        v = new Vector();
        v.x = self.y * w.z - self.z * w.y;
        v.y = -self.x * w.z + self.z * w.x;
        v.z = self.x * w.y - self.y * w.x;
        return v;
    };

    Vector.zero = function zero(){
        return new Vector();
    };

    function Ray(vectOrigin, vectDest){
        var self = this;
        self.origin = vectOrigin;
        self.direction = vectDest;
    };


    Ray.prototype.getPoint = function getPoint(t){
        var self = this;
        return self.origin.add(self.direction.times(t));
    };

    function IntersectionResult(){
        var self = this;
        self.sceneobject = null;
        self.distance = 0;
        self.position = Vector.zero();
        self.normal = Vector.zero();
    };


    IntersectionResult.nohit = function nohit(){
        return new IntersectionResult();
    };

    function Sphere(center, radius){
        var self = this;
        if (typeof center === "undefined") center = new Vector(0, 2, -1);
        if (typeof radius === "undefined") radius = 1;
        self.center = center;
        self.radius = radius;
        self.name = "Sphere";
    };


    Sphere.prototype.initialize = function initialize(){
        var self = this;
        self.sqrRadius = self.radius * self.radius;
    };

    Sphere.prototype.double = function double(){
        var self = this;
        return 100;
    };

    Sphere.prototype.intersect = function intersect(ray){
        var self = this;
        var v, a0, DdotV, discr, r;
        v = ray.origin.sub(self.center);
        a0 = v.sqrLength() - self.sqrRadius;
        DdotV = ray.direction.dot(v);
        if (DdotV <= 0) {
            discr = DdotV * DdotV - a0;
            if (discr >= 0) {
                r = new IntersectionResult();
                r.sceneobject = self;
                r.distance = -DdotV - Math.sqrt(discr);
                r.position = ray.getPoint(r.distance);
                r.normal = r.position.sub(self.center);
                return r;
            }
        }
        return IntersectionResult.nohit();
    };

    function Camera(eye, front, up, fov, aspectratio){
        var self = this;
        self.eye = eye;
        self.front = front;
        self.RefUp = up;
        self.fov = fov;
        self.aspectratio = aspectratio;
    };


    Camera.prototype.initialize = function initialize(){
        var self = this;
        self.right = self.front.cross(self.RefUp);
        self.up = self.right.cross(self.front);
        self.fovScale = Math.tan(self.fov * .5 * Math.PI / 180) * 2;
    };

    Camera.prototype.generateRay = function generateRay(x, y){
        var self = this;
        var r, u, ray;
        r = self.right.times((x - .5) * self.fovScale * self.aspectratio);
        u = self.up.times((y - .5) * self.fovScale);
        ray = new Ray(self.eye, self.front.add(r).add(u).normalize());
        return ray;
    };

    function Union(geometries){
        var self = this;
        self.geometries = geometries;
    };


    Union.prototype.initialize = function initialize(){
        var self = this;
        var geo;
        var _$rapyd$_Iter0 = self.geometries;
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            geo = _$rapyd$_Iter0[_$rapyd$_Index0];
            geo.initialize();
        }
    };

    Union.prototype.intersect = function intersect(ray){
        var self = this;
        var result, minDistance, minResult, geo;
        minDistance = Infinity;
        minResult = new IntersectionResult();
        var _$rapyd$_Iter1 = self.geometries;
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            geo = _$rapyd$_Iter1[_$rapyd$_Index1];
            result = geo.intersect(ray);
            if (result.sceneobject != null && result.distance < minDistance) {
                minDistance = result.distance;
                minResult = result;
            }
        }
        return minResult;
    };

    function Plane(normal, distance){
        var self = this;
        self.normal = normal;
        self.d = distance;
        self.name = "Plane";
    };


    Plane.prototype.initialize = function initialize(){
        var self = this;
        self.position = self.normal.times(self.d);
    };

    Plane.prototype.intersect = function intersect(ray){
        var self = this;
        var a, b, result;
        a = ray.direction.dot(self.normal);
        if (a >= 0) {
            return IntersectionResult.nohit();
        }
        b = self.normal.dot(ray.origin.sub(self.position));
        result = new IntersectionResult();
        result.sceneobject = self;
        result.distance = -b / a;
        result.position = ray.getPoint(result.distance);
        result.normal = self.normal;
        return result;
    };

    function Color(r, g, b){
        var self = this;
        if (typeof r === "undefined") r = 0;
        if (typeof g === "undefined") g = 0;
        if (typeof b === "undefined") b = 0;
        self.r = r;
        self.g = g;
        self.b = b;
    };


    Color.prototype.add = function add(c){
        var self = this;
        return new Color(self.r + c.r, self.g + c.g, self.b + c.b);
    };

    Color.prototype.times = function times(k){
        var self = this;
        return new Color(k * self.r, k * self.g, k * self.b);
    };

    Color.prototype.modulate = function modulate(c){
        var self = this;
        return new Color(self.r * c.r, self.g * c.g, self.b * c.b);
    };

    Color.black = new Color();
    Color.red = new Color(1, 0, 0);
    Color.white = new Color(1, 1, 1);
    Color.green = new Color(0, 1, 0);
    Color.blue = new Color(0, 0, 1);
    Color.gold = new Color(1, .8745098039215686, 0);
    Color.cyan = new Color(0, 1, 1);
    function CheckerMaterial(scale, reflectiveness){
        var self = this;
        self.scale = scale;
        self.reflectiveness = reflectiveness;
    };


    CheckerMaterial.prototype.sample = function sample(ray, position, normal){
        var self = this;
        var v;
        v = Math.abs((Math.floor(position.x * .1) + Math.floor(position.z * self.scale)) % 2);
        if (v < 1) {
            return Color.black;
        } else {
            return Color.white;
        }
    };

    lightDir = new Vector(6, 8.5, 15).normalize();
    lightColor = new Color(1, 1, 1);
    function PhongMaterial(diffuse, specular, shininess, reflectiveness){
        var self = this;
        self.diffuse = diffuse;
        self.specular = specular;
        self.shininess = shininess;
        self.reflectiveness = reflectiveness;
    };


    PhongMaterial.prototype.sample = function sample(ray, position, normal){
        var self = this;
        var NdotL, H, NdotH, diffuseTerm, specularTerm;
        NdotL = normal.dot(lightDir);
        H = lightDir.sub(ray.direction).normalize();
        NdotH = normal.dot(H);
        diffuseTerm = self.diffuse.times(Math.max(NdotL, 0));
        specularTerm = self.specular.times(Math.pow(Math.max(NdotH, 0), self.shininess));
        return lightColor.modulate(diffuseTerm.add(specularTerm));
    };

    function rayTraceRecursive(scene, ray, maxReflect) {
        var result, reflectiveness, mat, r, reflectedColor, color;
        result = scene.intersect(ray);
        if (result.sceneobject) {
            reflectiveness = result.sceneobject.material.reflectiveness;
            mat = result.sceneobject.material;
            color = mat.sample(ray, result.position, result.normal);
            color.times(1 - reflectiveness);
            if (reflectiveness > 0 && maxReflect > 0) {
                r = result.normal.times(-2 * result.normal.dot(ray.direction)).add(ray.direction);
                ray = new Ray(result.position, r);
                reflectedColor = rayTraceRecursive(scene, ray, maxReflect - 1);
                color = color.add(reflectedColor.times(reflectiveness));
            }
            return color;
        }
        return new Color(0, 0, 0);
    }
    CHECKER_PATTERN = true;
    function main() {
        var canvas, ctx, w, h, aspectratio, camera, sphere, sphere2, sphere3, plane, scene, maxDepth, imgdata, sy, sx, index, ray, result, col, x, y;
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        w = canvas.width;
        h = canvas.height;
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0, 0, w, h);
        aspectratio = w / h;
        camera = new Camera(new Vector(0, .56, 8), new Vector(0, 0, -1), new Vector(0, 1, 0), 30, aspectratio);
        camera.initialize();
        sphere = new Sphere(new Vector(1.5, 0, -1), 1);
        sphere.material = new PhongMaterial(Color.red, Color.white, 500, .25);
        sphere2 = new Sphere(new Vector(-1.5, 0, -1), 1);
        sphere2.material = new PhongMaterial(Color.gold, Color.white, 500, .25);
        sphere3 = new Sphere(new Vector(0, 0, -2), 1);
        sphere3.material = new PhongMaterial(Color.blue, Color.white, 500, .25);
        plane = new Plane(new Vector(0, 1, 0), -1);
        if (CHECKER_PATTERN) {
            plane.material = new CheckerMaterial(.1, .9);
        } else {
            plane.material = new PhongMaterial(Color.cyan, Color.white, 500, 1);
        }
        scene = new Union([ plane, sphere, sphere2, sphere3 ]);
        scene.initialize();
        maxDepth = 20;
        imgdata = ctx.createImageData(w, h);
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                sy = 1 - y / h;
                sx = x / w;
                index = (x + y * w) * 4;
                ray = camera.generateRay(sx, sy);
                result = scene.intersect(ray);
                if (result.sceneobject != null) {
                    col = rayTraceRecursive(scene, ray, 4);
                    imgdata.data[index + 0] = col.r * 255;
                    imgdata.data[index + 1] = col.g * 255;
                    imgdata.data[index + 2] = col.b * 255;
                    imgdata.data[index + 3] = 255;
                } else {
                    imgdata.data[index + 0] = 0;
                    imgdata.data[index + 1] = 0;
                    imgdata.data[index + 2] = 0;
                    imgdata.data[index + 3] = 255;
                }
            }
        }
        ctx.putImageData(imgdata, 1, 0);
    }
    toggle = document.getElementById("toggle");
    toggle.onclick = function() {
        CHECKER_PATTERN = !CHECKER_PATTERN;
        main();
    };
    main();
})();