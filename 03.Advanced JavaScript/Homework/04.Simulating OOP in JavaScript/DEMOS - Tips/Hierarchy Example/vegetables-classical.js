/* THIS TYPE OF OOP IS USED FOR ABSTRACTION*/

if(!Object.create){
    Object.create = function (proto){
        function F(){};
        F.prototype = proto;
        return new F();
    }
}

Object.prototype.extends = function (parent){
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

var Vegetable = (function (){
    const DEFAULT_GROWTH_RATE = 1;
    function Vegetable(name, growthRate){
        // Check if someone try to instantiate the abstract class Vegetable \\
        if(this.constructor === Vegetable){
            throw new Error("You can't instantiate abstract class.")
        }
        // Check if someone try to instantiate the abstract class Vegetable //
        this._title = name;
        // Simulating default value \\
        this._growthRate = growthRate || DEFAULT_GROWTH_RATE;
        // Simulating default value //
        this._size = 1;
    }

    Vegetable.prototype.getName = function (){
        return this._title;
    };

    Vegetable.prototype.grow = function (){
        this._size += this._size * this._growthRate;
    };

    Vegetable.prototype.die = function (){
        throw new Error("You can't use function of abstract class.")
    };
    return Vegetable;
})();

var Carrot = (function (){
    function Carrot(name, growthRate,color){
        Vegetable.call(this, name, growthRate);
        this._color = color;
        return this;
    }
    Carrot.extends(Vegetable);

    Carrot.prototype.die = function (){
        console.log("I'm dead now :(");
    };

    Carrot.prototype.rot = function(){
        this._growthRate = 0;
        this.die();
    };

    return Carrot;
})();

//var vegetable = new Vegetable('Invalid', 55); //throws Error

var carrot = new Carrot('Pencho The Carrot', 5, 'orange');
console.log(carrot.getName());
carrot.rot();