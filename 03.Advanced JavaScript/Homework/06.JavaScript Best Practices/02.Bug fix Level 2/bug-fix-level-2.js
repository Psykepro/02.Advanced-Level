var Person = (function(){
    'use strict';
    function Person(firstName, lastName) {
        this._firstName = firstName;
        this._lastName = lastName;


        Object.defineProperty(this, "_fullName", {
            get: function () {
                return this._firstName + " " + this._lastName;
            },
            set: function (name) {
                var names = name.split(" ");
                this._firstName = names[0];
                this._lastName = names[1];
            }
        });
    }
    return Person;
})();

var person = new Person("Peter", "Jackson");
// Getting values
console.log(person._firstName);
console.log(person._lastName);
console.log(person._fullName);
// Changing values
person.firstName = "Michael";
console.log(person._firstName);
console.log(person._fullName);
person.lastName = "Williams";
console.log(person._lastName);
console.log(person._fullName);
// Changing the full name should work too
person.fullName = "Alan Marcus";
console.log(person._fullName);
console.log(person._firstName);
console.log(person._lastName);
