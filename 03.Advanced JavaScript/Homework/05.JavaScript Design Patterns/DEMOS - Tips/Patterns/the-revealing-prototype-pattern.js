var Person = function(name){
    this.name = name;
};

// By using IIFE we return only the functions that we want \\
Person.prototype = (function(){
    var a = ' is my name!', sayHello;

    sayHello = function (){
        console.log(this.name + a);
    };

    return {
        sayHello : sayHello
    }
})();
// By using IIFE we return only the functions that we want //


var person = new Person('Koleca');
person.sayHello();
console.log(person.a); // returns undefined, because we don't return a from the IIFE.