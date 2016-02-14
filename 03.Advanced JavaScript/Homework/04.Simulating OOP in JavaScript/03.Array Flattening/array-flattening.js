var isArray = Array.isArray;

Array.prototype.flatten = function () {
    var array = this, resultArray = [];
    var getValues = function (arr) {
        var i, j, curr;

        for (i = 0, j = arr.length; i < j; i++) {
            curr = arr[i];
            if (isArray(curr)) {
                getValues(curr);
            } else {
                resultArray.push(curr)
            }

        }
    };

    array.forEach(function (value) {
        if (isArray(value)) {
            getValues(value);
        } else {
            resultArray.push(value);
        }
    });
    return resultArray;
};

var array = [1, 2, 3, 4];
console.log(array.flatten());
array = [1, 2, [3, 4], [5, 6]];
console.log(array.flatten());
console.log(array); // Not changed
array = [0, ["string", "values"], 5.5, [[1, 2, true], [3, 4, false]], 10];
console.log(array.flatten());

