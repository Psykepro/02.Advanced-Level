var calculator = (function(name){

    // (PRIVATE) this method will be hidden for outside the module \\
    function dividableByZero(a){
        if(a === 0){
            throw new Error('Division by zero exception')
        }
        return false;
    }
    // (PRIVATE) this method will be hidden for outside the module //


    // Everything which we return is visible for outside the module (PUBLIC) \\
    return {
        name : name,
        // (PUBLIC) this method will be visible for outside the module \\
        divide : function (a, b){
            try{
                dividableByZero(b);
                return a / b;
            }catch (e){
                console.log(e.message);
            }
        }
        // (PUBLIC) this method will be visible for outside the module //
    };
    // Everything which we return is visible for outside the module (PUBLIC) //
})('Calculator');

calculator.divide(3, 0); // throws exception
console.log(calculator.name);