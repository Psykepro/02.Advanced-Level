var Mammal = (function() {
    function Mammal(legs){
        this.legs = legs;
    }

    Mammal.prototype.showCountOfLegs = function(){
        console.log('Count of legs ' + this.legs);
    };

    return Mammal;
})();
