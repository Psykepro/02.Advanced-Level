if(!Object.create){
    Object.create = function (proto){
        function F(){};
        F.prototype = proto;
        return new F();
    }
}

Object.prototype.extend = function (properties) {
    function f() { };
    f.prototype = Object.create(this);
    for (var prop in properties) {
        f.prototype[prop] = properties[prop];
    }
    f.prototype._super = this;
    return new f();
};

var shapesModule = (function (){
    var shape = {
        init: function init(color) {
            this._color = color;
        },
        toString: function () {
            var output = 'Color : ' + this._color + '\n' + 'Shape Type : ';
            return output;
        }
    };

    var circle = shape.extend({
        init: function init(color, centerX, centerY, r){
            this._super.init(color);
            this._centerX = centerX;
            this._centerY = centerY;
            this._r = r;
        },
        toString: function () {
            var output = this._super.toString() + 'Circle\n'
                + 'Center X : ' + this._centerX + '\n'
                + 'Center Y : ' + this._centerY + '\n'
                + 'Radius : ' + this._r + '\n';
            return output;
        }
    });

    var rectangle = shape.extend({
        init: function init(color, topLeftX, topLeftY, width, height) {
            this._super.init(color);
            this._topLeftX = topLeftX;
            this._topLeftY = topLeftY;
            this._width = width;
            this._height = height;
        },
        toString: function () {
            var output = this._super.toString() + 'Rectangle\n'
                + 'Top Left Corner X : ' + this._topLeftX + '\n'
                + 'Top Left Corner Y : ' + this._topLeftY + '\n'
                + 'Width : ' + this._width + '\n'
                + 'Height : ' + this._height + '\n';
            return output;
        }
    });

    var triangle = shape.extend({
        init: function init(color, aX, aY, bX, bY, cX, cY) {
            this._super.init(color);
            this._aX = aX;
            this._aY = aY;
            this._bX = bX;
            this._bY = bY;
            this._cX = cX;
            this._cY = cY;
        },
        toString: function () {
            var output = this._super.toString() + 'Triangle\n'
                + 'Point Ax : ' + this._aX + ' Point Ay : '  + this._aY+ '\n'
                + 'Point Bx : ' + this._bX + ' Point By : '  + this._bY+ '\n'
                + 'Point Cx : ' + this._cX + ' Point Cy : '  + this._cY+ '\n';
            return output;
        }
    });

    var line = shape.extend({
        init: function (color, aX, aY, bX, bY) {
            this._super.init(color);
            this._aX = aX;
            this._aY = aY;
            this._bX = bX;
            this._bY = bY;
        },
        toString: function () {
            var output = this._super.toString() + 'Line\n'
                + 'Point Ax : ' + this._aX + ' Point Ay : '  + this._aY+ '\n'
                + 'Point Bx : ' + this._bX + ' Point By : '  + this._bY+ '\n';
            return output;
        }
    });

    var segment = shape.extend({
        init: function (color, aX, aY, bX, bY) {
            this._super.init(color);
            this._aX = aX;
            this._aY = aY;
            this._bX = bX;
            this._bY = bY;
        },
        toString: function () {
            var output = this._super.toString() + 'Segment\n'
                + 'Point Ax : ' + this._aX + ' Point Ay : '  + this._aY + '\n'
                + 'Point Bx : ' + this._bX + ' Point By : '  + this._bY + '\n';
            return output;
        }
    });

    return {
        circle: circle,
        rectangle: rectangle,
        triangle: triangle,
        line: line,
        segment: segment
    }

})();

// __proto__ of all is Object!! \\
var circle = Object.create(shapesModule.circle);
circle.init("AAA",0, 0, 15);
console.log(circle.toString());

var rect = Object.create(shapesModule.rectangle);
rect.init("BBB", 0, 0, 15, 10);
console.log(rect.toString());

var triangle = Object.create(shapesModule.triangle);
triangle.init("CCC", 0, 0, 1, 1, 5, 10);
console.log(triangle.toString());

var line = Object.create(shapesModule.line);
line.init("DDD", 1, 2, 3, 5);
console.log(line.toString());

var segment = Object.create(shapesModule.segment);
segment.init("EEE", 1, 1, 10, 20);
console.log(segment.toString());