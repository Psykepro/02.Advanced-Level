var Person = (function() {
    function Person(name, age, legs){
        Mammal.call(this, legs);
        this.name = name;
        this.age = age;
    }
    // Person extends Mammal \\
    Person.prototype = Object.create(Mammal.prototype);
    Person.prototype.constructor = Person;

    Person.prototype.sayHello = function(){
        console.log('Hello my name is ' + this.name);
    };

    return Person;
})();
