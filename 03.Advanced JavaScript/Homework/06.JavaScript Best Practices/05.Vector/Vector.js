var Vector,
    a,
    b,
    c,
    wrong,
    anotherWrong;

Vector = (function () {
    'use strict';

    function Vector(dimensions) {
        validateDimensions(dimensions);
        this.dimensions = dimensions;
    }

    Vector.prototype.add = function (other) {
        validateCountOfDimensions(this, other);
        var length = this.dimensions.length,
            resultDimensions = [],
            i;

        for (i = 0; i < length; i++) {
            resultDimensions.push(this.dimensions[i] + other.dimensions[i]);
        }

        return new Vector(resultDimensions);
    };

    Vector.prototype.subtract = function (other) {
        validateCountOfDimensions(this, other);
        var length = this.dimensions.length,
            resultDimensions = [],
            i;

        for (i = 0; i < length; i++) {
            resultDimensions.push(this.dimensions[i] - other.dimensions[i]);
        }

        return new Vector(resultDimensions);
    };

    Vector.prototype.dot = function (other) {
        validateCountOfDimensions(this, other);
        var length = this.dimensions.length,
            dotProduct = 0,
            i;

        for (i = 0; i < length; i++) {
            dotProduct += this.dimensions[i] * other.dimensions[i];
        }

        return dotProduct;
    };

    Vector.prototype.norm = function () {
        var dimensions = this.dimensions,
            length = dimensions.length,
            sum = 0,
            currentDimension,
            i;

        for (i = 0; i < length; i++) {
            currentDimension = dimensions[i];
            sum += currentDimension * currentDimension;
        }

        return Math.sqrt(sum);
    };

    Vector.prototype.toString = function () {
        var resultString = '(' + this.dimensions.join(', ') + ')';
        return resultString;
    };

    function validateCountOfDimensions(firstVector, secondVector) {
        if (firstVector.dimensions.length !== secondVector.dimensions.length) {
            throw new Error('Count of the dimensions must be equal.');
        }
    }

    function validateDimensions(dimensions) {
        if (!dimensions || dimensions.length === 0) {
            throw new Error('Dimensions cannot be undefined or 0.')
        }
    }

    return Vector;
})();


a = new Vector([1, 2, 3]);
b = new Vector([4, 5, 6]);
c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
console.log(a.toString());
console.log(c.toString());

// The following throw errors
wrong = new Vector();
anotherWrong = new Vector([]);
result = a.add(b);
console.log(result.toString());

//a.add(c); // Error
result = a.subtract(b);
console.log(result.toString());

//a.subtract(c); // throws Error
result = a.dot(b);
console.log(result.toString());

//a.dot(c); // throws Error
console.log(a.norm());
console.log(b.norm());
console.log(c.norm());
console.log(a.add(b).norm());
