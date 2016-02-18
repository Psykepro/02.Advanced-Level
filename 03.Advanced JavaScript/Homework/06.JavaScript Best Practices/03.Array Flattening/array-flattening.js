var isArray = Array.isArray,
    array;

Array.prototype.flatten = function () {
    'use strict';
    var resultArray = [],
        getValues = function (arr) {
            var length = arr.length,i, j, curr;

            for (i = 0, j = length; i < j; i++) {
                curr = arr[i];
                if (isArray(curr)) {
                    getValues(curr);
                } else {
                    resultArray.push(curr)
                }

            }
        };

    this.forEach(function (value) {
        if (isArray(value)) {
            getValues(value);
        } else {
            resultArray.push(value);
        }
    });
    return resultArray;
};

array = [1, 2, 3, 4];
console.log(array.flatten());
array = [1, 2, [3, 4], [5, 6]];
console.log(array.flatten());
console.log(array); // Not changed
array = [0, ["string", "values"], 5.5, [[1, 2, true], [3, 4, false]], 10];
console.log(array.flatten());

