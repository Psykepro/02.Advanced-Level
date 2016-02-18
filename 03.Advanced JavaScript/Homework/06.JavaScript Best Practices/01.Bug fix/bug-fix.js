var Person = (function(){
    "use strict";
    function Person(firstName, lastName) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._title = this._firstName + " " + this._lastName;
    }
    return Person;
})(), peter;

peter = new Person("Peter", "Jackson");
console.log(peter._title);
console.log(peter._firstName);
console.log(peter._lastName);


