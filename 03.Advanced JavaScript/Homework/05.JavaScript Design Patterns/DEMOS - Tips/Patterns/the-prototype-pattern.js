// Parent Constructor \\
var Calculator = function(name){
    this.name = name;

};
// Parent Constructor //

// Calculator.prototype is a object and here we override it by adding new functions as properties. \\
Calculator.prototype = {
    add : function(a, b) {
        return a + b;
    },
    subtract: function(a, b){
        // this.add(a, b); <--you can call the method add like this
        return a - b;
    },
    product: function(a, b){
        return a * b;
    },
    divide: function(a, b){
        return a / b;
    }
};
// Calculator.prototype is a object and here we override it by adding new functions as properties. //

// Child Constructor \\
var Elka = function(name){
    this.name = name;
};
// Child Constructor //

// Override Elka.prototype by making the add method with multiplying the numbers by 2 \\
Elka.prototype = {
    add : function(a, b){
        return a*2 + b*2;
    }
};
// Override Elka.prototype by making the add method with multiplying the numbers by 2 //

// Elka.prototype extends Calculator.prototype \\
Elka.prototype = Object.create(Calculator.prototype);
Elka.prototype.constructor = Elka;
// Elka.prototype extends Calculator.prototype //

var calc = new Calculator('SoftUniCalc');
console.log(calc.add(2, 3));
console.log(calc.product(6, 7));

/* As you can see from the result Elka.prototype have been override with the Calculator.prototype
   and the method add returns a + b not a*2 + b*2. */
var elka = new Elka('SoftUniElka');
console.log(elka.add(2, 3)); // returns 5