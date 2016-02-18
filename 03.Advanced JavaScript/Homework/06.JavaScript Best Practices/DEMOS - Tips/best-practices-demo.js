/* Always declare variables with only 1 var in front the first one an then others with comma.
 And always declare them in the beginning of the javascript file, because otherwise you will
 loose some of the performance(HOISITNG). Declare the variables which will be initialized at this moment
 before others.*/
var arr = [1 , 2, 3],
    /* When you save the length value of some array in variable you make better performance when you use it,
   in any cycle for condition. Otherwise if you is the property 'arr.length' it will getting the value on every,
   iteration of the cycle. */
    length = arr.length,
    firstNum = arr[0],
    name,
    number;

function someFunction(){
    /* Always use strict mode in some inner scope instead of in the global scope.
       Because is you use it in the global scope and you use library which don't use strict mode.
       May will have some errors.*/
    'use strict';

}


/* Always use literals for objects and arrays otherwise you use unnecessarily the constructor function.*/
var right = [],
    wrong = new Array();


/* Conditional Expressions and Equality */
// Use this \\
if(name)
{

}

// Instead this \\
if(name !== ''){

}

// Use this \\
if(!name)
{

}

// Instead this \\
if(name == ''){

}

// Use this \\
if(number.length)
{

}

// Instead this \\
if(number.length > 0){

}
/* Conditional Expressions and Equality */