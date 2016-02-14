// Some browsers don't have method Object.create this is how we fix it \\
if(!Object.create){
    Object.create = function (proto){
        function F(){};
        F.prototype = proto;
        return new F();
    }
}
// Some browsers don't have method Object.create this is how we fix it //

// Use this for extending if u need to extend methods \\
Object.prototype.extend = function (properties) {
    function F() { };
    F.prototype = Object.create(this);
    for (var property in properties) {
        F.prototype[property] = properties[property];
    }
    F.prototype._super = this;
    return new F();
};
// Use this for extending if u need to extend methods //

// Create base class Animal \\
// Pascal case means -> class !
var Animal = {
    init: function(name, species){
        this._name = name;
        this._species = species;
        return this;
    },
    walk: function(){
        console.log(this._name + ' is walking...');
    },
    produceSound: function(){
        throw new Error('Cannot call abstract method Animal.produceSound()')
    }
};
// Create base class Animal //

var animal = Object.create(Animal);
animal.init('George', 'horse');
console.log(animal);
animal.walk();


// INHERITANCE \\
var Tiger = Object.create(Animal);
Tiger.init = function(name, isSaberToothTiger){
    Animal.init.call(this, name, 'Tiger');
    this._isSaberToothTiger = isSaberToothTiger;
};
// INHERITANCE //

// Create Object of class Tiger \\
var crusher = Object.create(Tiger);
crusher.init('Crusher', false);
// Create Object of class Tiger //

// OVERRIDE METHOD \\
crusher.produceSound =  function(){
    console.log('ROARRRRRRRRR');
};
// OVERRIDE METHOD //

// ADD METHOD TO VARIABLE THE "Crusher" \\
crusher.jump = function() {
    console.log(crusher._name + ' is jumping!');
};
// ADD METHOD TO VARIABLE THE "Crusher" //

// ADD METHOD TO THE CLASS "Tiger" \\
Tiger.sleep = function(){
    console.log(this._name + ' is sleeping zZzZz...');
};
// ADD METHOD TO THE CLASS "Tiger" //

console.log(crusher);
crusher.walk();
crusher.produceSound();
crusher.jump();
crusher.sleep();



