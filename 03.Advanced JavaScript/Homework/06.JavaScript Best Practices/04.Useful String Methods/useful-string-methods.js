var example,
    character,
    hello;
String.prototype.startsWith = function(substring){
    'use strict';
    var currentString = this,
        startingPart = currentString.substr(0, substring.length);
    return startingPart.localeCompare(substring) === 0;
};

String.prototype.endsWith = function(substring){
    'use strict';
    var currentString = this,
        startingIndexOfStartingPart = currentString.length - substring.length,
        startingPart = currentString.substr(startingIndexOfStartingPart, substring.length);
    return startingPart.localeCompare(substring) === 0;
};

String.prototype.repeat = function(count){
    'use strict';
    var stringForRepeat = this, resultString = '', index;

    for(index = 0; index < count; index++){
        resultString += stringForRepeat;
    }
    return resultString;
};

String.prototype.padLeft = function(count, character){
    'use strict';
    character = character || ' ';
    var currentString = this,
        string = character.repeat(count);
    return string + currentString;
};

String.prototype.padRight = function(count, character){
    'use strict';
    character = character || ' ';
    var currentString = this,
        string = character.repeat(count);
    return currentString + string;
};

String.prototype.left = function(count){
    'use strict';
    var currentString = this,
        resultString = currentString.substr(0,count);
    return resultString;
};

String.prototype.right = function(count){
    'use strict';
    var currentString = this.split('').reverse().join(''),
        resultString = currentString.substr(0,count).split('').reverse().join('');
    return resultString;
};

example = 'This is an example string used only for demonstration purposes.';
console.log(example.startsWith('This'));
console.log(example.startsWith('this'));
console.log(example.startsWith('other'));
example = 'This is an example string used only for demonstration purposes.';
console.log(example.endsWith('poses.'));
console.log(example.endsWith ('example'));
console.log(example.startsWith('something else'));
example = 'This is an example string used only for demonstration purposes.';
console.log(example.left(9));
console.log(example.left(90));
example = 'This is an example string used only for demonstration purposes.';
console.log(example.right(9));
console.log(example.right(90));
// Combinations must also work
example = 'abcdefgh';
console.log(example.left(5).right(2));
hello = 'hello';
console.log(hello.padLeft(5));
console.log(hello.padLeft(10));
console.log(hello.padLeft(5, '.'));
console.log(hello.padLeft(10, '.'));
console.log(hello.padLeft(2, '.'));
hello = 'hello';
console.log(hello.padRight(1, '$').padLeft(1, '$').padLeft(4).padRight(4));
console.log(hello.padRight(3, '$').padLeft(3, '$').padLeft(2).padRight(2));
console.log(hello.padRight(5, '$').padLeft(5, '$'));
console.log(hello.padRight(3, '$').padLeft(3, '$').padLeft(2).padRight(2));
console.log(hello.padRight(1, '$').padLeft(1, '$').padLeft(4).padRight(4));
character = '*';
console.log(character.repeat(5));
// Alternative syntax
console.log('~'.repeat(3));
// Another combination
console.log('*'.repeat(5).padLeft(10, '-').padRight(15, '+'));




