// Some browsers don't have method Object.create this is how we fix it \\
if(!Object.create){
    Object.create = function (proto){
        function F(){};
        F.prototype = proto;
        return new F();
    }
}
// Some browsers don't have method Object.create this is how we fix it //

// Create method for extending classes \\
Object.prototype.extends = function(parent){
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};
// Create method for extending classes //

// Create base class Animal with IIFE \\
var Animal = (function (){
    function Animal(name, species){
        this._name = name;
        this._species = species;
    }
    // Adding methods to the class Animal with attaching them to the prototype \\
    Animal.prototype.produceSound = function (){
        throw new Error('Cannot call abstract method Animal.produceSound()')
    };
    Animal.prototype.walk = function(){
        return this._name + ' is walking...';
    };
    // Adding methods to the class Animal with attaching them to the prototype //

    // This is hidden function it is available only in this scope (CLOSURE) \\
    function doSomethingSecret() {}
    // This is hidden function it is available only in this scope (CLOSURE) //

    return Animal;
})();
// Create base class Animal (with IIFE //


// Create Object which is new Instance of the class Animal \\
var animal = new Animal('Pinko', 'panther');
console.log(Object.getPrototypeOf(animal));
// Create Object which is new Instance of the class Animal //


// Inheritance \\
var SnowLeopard = (function (){
    function SnowLeopard(name, isClouded){
        // VERY IMPORTANT IS : DON'T MISS THIS IN THE CALL METHOD !!
        Animal.call(this, name, 'Snow Leopard');
        this._isClouded = isClouded;
    }

    SnowLeopard.extends(Animal);

    // Extend | Override Method \\
    SnowLeopard.prototype.walk = function(){
        return Animal.prototype.walk.call(this) + ' and it is a ' + this._species;
    };
    // Extend | Override Method //

    return SnowLeopard;
})();

// Create object of the class SnowLeopard \\
var shredder = new SnowLeopard('Shredder', true);
console.log(shredder.walk());
// Create object of the class SnowLeopard //


// ADD METHOD TO VARIABLE THE "shredder" \\
shredder.jump = function() {
    console.log(this._name + ' is jumping!');
};
shredder.jump();
// ADD METHOD TO VARIABLE THE "shredder" //