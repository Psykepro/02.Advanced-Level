var Vector = (function (){
    function Vector(dimensions){
        validateDimensions(dimensions);
        this.dimensions = dimensions;
    }

    Vector.prototype.add = function(other){
        validateCountOfDimensions(this, other);
        var length = this.dimensions.length;
        var resultDimensions = [];

        for(var i = 0; i < length; i++){
            resultDimensions.push(this.dimensions[i] + other.dimensions[i]);
        }

        return new Vector(resultDimensions);
    };

    Vector.prototype.subtract = function(other){
        validateCountOfDimensions(this, other);
        var length = this.dimensions.length;
        var resultDimensions = [];

        for(var i = 0; i < length; i++){
            resultDimensions.push(this.dimensions[i] - other.dimensions[i]);
        }

        return new Vector(resultDimensions);
    };

    Vector.prototype.dot = function(other){
        validateCountOfDimensions(this, other);
        var length = this.dimensions.length;
        var dotProduct = 0;

        for(var i = 0; i < length; i++){
            dotProduct += this.dimensions[i] * other.dimensions[i];
        }

        return dotProduct;
    };

    Vector.prototype.norm = function(){
        var dimensions = this.dimensions;
        var length = dimensions.length;
        var sum = 0;

        for(var i = 0; i < length; i++){
            var currentDimension = dimensions[i];
            sum += currentDimension * currentDimension;
        }

        return Math.sqrt(sum);
    };

    Vector.prototype.toString = function (){
        var resultString = '(' + this.dimensions.join(', ') + ')';
        return resultString;
    };

    function validateCountOfDimensions(firstVector, secondVector){
        if(firstVector.dimensions.length !== secondVector.dimensions.length){
            throw new Error('Count of the dimensions must be equal.');
        }
    }

    function validateDimensions(dimensions){
        if(!dimensions || dimensions.length === 0){
            throw new Error('Dimensions cannot be undefined or 0.')
        }
    }

    return Vector;
})();


var a = new Vector([1, 2, 3]);
var b = new Vector([4, 5, 6]);
var c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
console.log(a.toString());
console.log(c.toString());

// The following throw errors
var wrong = new Vector();
var anotherWrong = new Vector([]);
a = new Vector([1, 2, 3]);
b = new Vector([4, 5, 6]);
c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
result = a.add(b);
console.log(result.toString());

//a.add(c); // Error

a = new Vector([1, 2, 3]);
b = new Vector([4, 5, 6]);
c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
result = a.subtract(b);
console.log(result.toString());

//a.subtract(c); // throws Error

a = new Vector([1, 2, 3]);
b = new Vector([4, 5, 6]);
c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
result = a.dot(b);
console.log(result.toString());

//a.dot(c); // throws Error

a = new Vector([1, 2, 3]);
b = new Vector([4, 5, 6]);
c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
console.log(a.norm());
console.log(b.norm());
console.log(c.norm());
console.log(a.add(b).norm());
