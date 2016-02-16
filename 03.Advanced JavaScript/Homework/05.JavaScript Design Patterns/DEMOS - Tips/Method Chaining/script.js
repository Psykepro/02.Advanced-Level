function Person(){

}

Person.prototype.setName = function(name){
    this.name = name;
    return this;
};

Person.prototype.setAge = function(age){
    this.age = age;
    return this;
};

Person.prototype.toString = function(){
    return this.name + ' ' + this.age;
};


var person = new Person().setName('Kolio')
                         .setAge(20)
                         .toString();
console.log(person);

