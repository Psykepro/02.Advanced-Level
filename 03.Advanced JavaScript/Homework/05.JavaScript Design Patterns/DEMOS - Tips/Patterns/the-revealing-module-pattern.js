var calculator = (function(name){

    // Creating constructor for calculator \\
    function Calc(name){
        this.name = name;
    }
    // Creating constructor for calculator //

    // Attaching the divide method to the calculator's prototype \\
    Calc.prototype.divide = function (a, b){
        try{
            dividableByZero(b);
            return a / b;
        }catch (e){
            console.log(e.message);
        }
    };
    // Attaching the divide method to the calculator's prototype //

    // (PRIVATE) this method will be hidden for outside the module \\
    function dividableByZero(a){
        if(a === 0){
            throw new Error('Division by zero exception')
        }
        return false;
    }
    // (PRIVATE) this method will be hidden for outside the module //

     function divide(a, b){
        try{
            dividableByZero(b);
            return a / b;
        }catch (e){
            console.log(e.message);
        }
    }

    // Everything which we return is visible for outside the module (PUBLIC) \\
    return {
        // return Constructor of Calculator \\
        Calculator : Calc,
        // return Constructor of Calculator //

        name : name,

        // return the reference of the function divide \\
        divide : divide
        // return the reference of the function divide //
    };
    // Everything which we return is visible for outside the module (PUBLIC) //
})('Calculator');

console.log(calculator.divide(1, 2));
var newCalcObj = new calculator.Calculator('New Calculator Object');

console.log(calculator.name);
console.log(newCalcObj.name);