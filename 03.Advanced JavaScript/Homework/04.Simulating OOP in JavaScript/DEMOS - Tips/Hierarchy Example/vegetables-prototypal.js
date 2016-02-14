/* THIS TYPE OF OOP IS USED FOR MODULES NOT FOR ABSTRACTION */

if(!Object.create){
    Object.create = function (proto){
        function F(){};
        F.prototype = proto;
        return new F();
    }
}

var Vegetable = {
    init: function (name, growthRate) {
        const DEFAULT_GROWTH_RATE = 1;
        const DEFAULT_SIZE = 1;
        this._name = name;
        this._growthRate = growthRate || DEFAULT_GROWTH_RATE;
        this._size = DEFAULT_SIZE;
        return this;
    },
    getName: function () {
        return this._name;
    },
    grow: function () {
        this._size += this._size * this._growthRate;
    },
    die: function () {
        throw new Error("You can't use function of abstract class.")
    }
};

var vegetable = Object.create(Vegetable);
vegetable.init('unknown', 1).grow();
console.log(vegetable._size);
//vegetable.die();

var Carrot = Object.create(Vegetable);
Carrot.init = function(name, growthRate, color){
    Vegetable.init.call(this, name, growthRate);
    this._color = color;
    Carrot.die = function (){
        console.log("I'm dead now :(");
    };
    Carrot.rot = function(){
        this._growthRate = 0;
        this.die();
    };
    return this;
};

Carrot.init('The Carrot', 1, 'orange').rot();