String.prototype.startsWith = function(substring){
    var currentString = this;
    var startingPart = currentString.substr(0,substring.length);
    if(startingPart.localeCompare(substring) === 0){
        return true;
    }else {
        return false;
    }
};

String.prototype.endsWith = function(substring){
    var currentString = this;
    var startingIndexOfStartingPart = currentString.length - substring.length;
    var startingPart = currentString.substr(startingIndexOfStartingPart, substring.length);
    if(startingPart.localeCompare(substring) === 0){
        return true;
    }else {
        return false;
    }
};

String.prototype.repeat = function(count){
    var stringForRepeat = this, index, resultString = '';

    for(index = 0; index < count; index++){
        resultString += stringForRepeat;
    }
    return resultString;
};

String.prototype.padLeft = function(count, character){
    var currentString = this;
    character = character || ' ';
    var string = character.repeat(count);
    return string + currentString;
};

String.prototype.padRight = function(count, character){
    var currentString = this;
    character = character || ' ';
    var string = character.repeat(count);
    return currentString + string;
};

String.prototype.left = function(count){
    var currentString = this;
    var resultString = currentString.substr(0,count);
    return resultString;
};

String.prototype.right = function(count){
    var currentString = this.split('').reverse().join('');
    var resultString = currentString.substr(0,count).split('').reverse().join('');
    return resultString;
};

var example = "This is an example string used only for demonstration purposes.";
console.log(example.startsWith("This"));
console.log(example.startsWith("this"));
console.log(example.startsWith("other"));
var example = "This is an example string used only for demonstration purposes.";
console.log(example.endsWith("poses."));
console.log(example.endsWith ("example"));
console.log(example.startsWith("something else"));
var example = "This is an example string used only for demonstration purposes.";
console.log(example.left(9));
console.log(example.left(90));
var example = "This is an example string used only for demonstration purposes.";
console.log(example.right(9));
console.log(example.right(90));
// Combinations must also work
var example = "abcdefgh";
console.log(example.left(5).right(2));
var hello = "hello";
console.log(hello.padLeft(5));
console.log(hello.padLeft(10));
console.log(hello.padLeft(5, "."));
console.log(hello.padLeft(10, "."));
console.log(hello.padLeft(2, "."));
var hello = "hello";
console.log(hello.padRight(1, "$").padLeft(1, "$").padLeft(4).padRight(4));
console.log(hello.padRight(3, "$").padLeft(3, "$").padLeft(2).padRight(2));
console.log(hello.padRight(5, "$").padLeft(5, "$"));
console.log(hello.padRight(3, "$").padLeft(3, "$").padLeft(2).padRight(2));
console.log(hello.padRight(1, "$").padLeft(1, "$").padLeft(4).padRight(4));
var character = "*";
console.log(character.repeat(5));
// Alternative syntax
console.log("~".repeat(3));
// Another combination
console.log("*".repeat(5).padLeft(10, "-").padRight(15, "+"));




