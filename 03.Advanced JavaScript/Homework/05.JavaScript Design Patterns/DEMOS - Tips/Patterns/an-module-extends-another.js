Function.prototype.extend = function(parent){
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

var Person = function(name){
    this.name = name;
};

var Student = function(name){
    Person.call(this, name);
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

// Student extend Person \\
Student.extend(Person);
// Student extend Person //

Student.prototype = (function(){
    var sayHello;

    sayHello = function (){
        console.log(this.name);
    };

    return {
        sayHello : sayHello
    }
})();

var student = new Student('Konio');
student.sayHello(); // returns Konio, because the prototype of Student have been overrode