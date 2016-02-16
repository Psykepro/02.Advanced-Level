//Classical OOP in JS is used for concrete objects.
//    Prototypal OOP in JS is used for Modules.


//this is how you use the more abstract context in the concrete function\\
function Person(name){
    // Check if the function is not used as constructor \\
    if(!this instanceof arguments.callee){
        return new arguments.callee(name);
    }
    // Check if the function is not used as constructor //

    // Cache this - save the context of the object in variable \\
    var self = this;
    self._title = name;
    self.getName = function getPersonName() {
        return self._title;
    };
    // Cache this - save the context of the object in variable //
    return this;
}

var p =  new Person('Peter');
var q =  Person('Quiter');
var getPersonName = p.getName;
console.log(getPersonName());
// Cache this - save the context of the object in variable //





