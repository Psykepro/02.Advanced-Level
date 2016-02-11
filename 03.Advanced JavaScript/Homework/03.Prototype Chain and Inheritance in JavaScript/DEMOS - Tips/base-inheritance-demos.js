// Some browsers don't have method Object.create this is how we fix it \\
if(!Object.create){
    Object.create = function (proto){
        function F(){};
        F.prototype = proto;
        return new F();
    }
}
// Some browsers don't have method Object.create this is how we fix it \\

// Classical Inheritance \\
function Person(name, age){
    this.name = name;
    this.age = age;
}

var person = new Person('Ivan', 20);
console.log(person.name);

function Student(name, age, grade){
    this.name = name;
    this.age = age;
    this.grade = grade;
}
Student.prototype = Object.create(Person.prototype);
// Person = function Person!
// Person.prototype = Object Person!
Student.prototype.constructor = Student;
var student = new Student('Ivan', 20, 1);
console.log(student.name);
console.log(Object.getPrototypeOf(Student));
// Classical Inheritance \\


// PROTOTYPAL Inheritance \\
var person = {
    init : function init(name, age){
        this.name = name;
        this.age = age;
        return this;
    },
    introduce: function introduce(){
        return this.name + ' ' + this.age;
    }
};

var student = Object.create(person);
student.init = function init(name, age, grade){
    person.init.call(this, name, age);
    this.grade = grade;
    return this;
};
// PROTOTYPAL Inheritance \\

// PROTOTYPAL Inheritance extend method  \\
Object.prototype.extend = function(properties){
    function F() {};
    F.prototype = Object.create(this);
    for(var prop in properties){
        F.prototype[prop] = properties[prop];
    }
    F.prototype._super = this;
    return new F();
};

var person = {init: function(name){this.name = name}};

var student = person.extend({
    init: function init(name, grade){
        this._super.init.call(this, name);
        this.grade = grade;
        return this;
    }
});
// PROTOTYPAL Inheritance extend method  \\




