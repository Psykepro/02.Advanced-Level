if(!Object.create){
    Object.create = function (proto){
        function F(){};
        F.prototype = proto;
        return new F();
    }
}

Object.prototype.extends = function(parent){
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

var shapeModule =(function(){
    var Shape = (function (){
        function Shape(color){
            this._color = color;
        }
        Shape.prototype.toString = function (){
            var output = 'Shape Type : ' + arguments[0] +'\n'
                + 'Color : ' + this._color + '\n';
            return output;
        };
        return Shape;
    })();

    var Circle = (function (){
        function Circle(color, centerX, centerY, r){
            Shape.call(this, color);
            this._centerX = centerX;
            this._centerY = centerY;
            this._r = r;
        }

        Circle.extends(Shape);

        Circle.prototype.toString = function (){
            var output = Shape.prototype.toString.call(this, Circle.name)
                + 'Center X : ' + this._centerX + '\n'
                + 'Center Y : ' + this._centerY + '\n'
                + 'Radius : ' + this._r + '\n';
            return output;
        };
        return Circle;
    })();

    var Rectangle = (function (){
        function Rectangle(color, topLeftX, topLeftY, width, height){
            Shape.call(this, color);
            this._topLeftX = topLeftX;
            this._topLeftY = topLeftY;
            this._width = width;
            this._height = height ;
        }

        Rectangle.extends(Shape);

        Rectangle.prototype.toString = function (){
            var output = Shape.prototype.toString.call(this, Rectangle.name)
                + 'Top Left Corner X : ' + this._topLeftX + '\n'
                + 'Top Left Corner Y : ' + this._topLeftY + '\n'
                + 'Width : ' + this._width + '\n'
                + 'Height : ' + this._height + '\n';
            return output;
        };
        return Rectangle;
    })();

    var Triangle = (function (){
        function Triangle(color, aX, aY, bX, bY, cX, cY){
            Shape.call(this, color);
            this._aX = aX;
            this._aY = aY;
            this._bX = bX;
            this._bY = bY;
            this._cX = cX;
            this._cY = cY;
        }

        Triangle.extends(Shape);

        Triangle.prototype.toString = function (){
            var output = Shape.prototype.toString.call(this, Triangle.name)
                + 'Point Ax : ' + this._aX + ' Point Ay : '  + this._aY+ '\n'
                + 'Point Bx : ' + this._bX + ' Point By : '  + this._bY+ '\n'
                + 'Point Cx : ' + this._cX + ' Point Cy : '  + this._cY+ '\n';
            return output;
        };
        return Triangle;
    })();

    var Line = (function (){
        function Line(color, aX, aY, bX, bY, cX, cY){
            Shape.call(this, color);
            this._aX = aX;
            this._aY = aY;
            this._bX = bX;
            this._bY = bY;
        }

        Line.extends(Shape);

        Line.prototype.toString = function (){
            var output = Shape.prototype.toString.call(this, Line.name)
                + 'Point Ax : ' + this._aX + ' Point Ay : '  + this._aY+ '\n'
                + 'Point Bx : ' + this._bX + ' Point By : '  + this._bY+ '\n';
            return output;
        };
        return Line;
    })();

    var Segment = (function (){
        function Segment(color, aX, aY, bX, bY, cX, cY){
            Shape.call(this, color);
            this._aX = aX;
            this._aY = aY;
            this._bX = bX;
            this._bY = bY;

        }

        Segment.extends(Shape);

        Segment.prototype.toString = function (){
            var output = Shape.prototype.toString.call(this, Segment.name)
                + 'Point Ax : ' + this._aX + ' Point Ay : '  + this._aY + '\n'
                + 'Point Bx : ' + this._bX + ' Point By : '  + this._bY + '\n';
            return output;
        };
        return Segment;
    })();

    // Return only the concrete classes. The abstract "Shape" remains hidden.
    return {
        Circle : Circle,
        Rectangle : Rectangle,
        Triangle : Triangle,
        Line : Line,
        Segment : Segment
    }
})();

// __proto__ of the class Circle is Shape
// __proto__ of the object circle is Circle
var circle = new shapeModule.Circle('#FFF', 5, 6, 4);
console.log(circle.toString());

// __proto__ of the class Rectangle is Shape
// __proto__ of the object rectangle is Rectangle
var rectangle = new shapeModule.Rectangle('#FFF', 2, 2, 4, 5);
console.log(rectangle.toString());

// __proto__ of the class Triangle is Shape
// __proto__ of the object triangle is Triangle
var triangle = new shapeModule.Triangle('#FFF', 1, 1, 2, 2, 3, 3);
console.log(triangle.toString());

// __proto__ of the class Line is Shape
// __proto__ of the object line is Line
var line = new shapeModule.Line('#FFF', 5, 6, 4, 5);
console.log(line.toString());

// __proto__ of the class Segment is Shape
// __proto__ of the object segment is Segment
var segment = new shapeModule.Segment('#FFF', 5, 6, 4, 1);
console.log(segment.toString());



