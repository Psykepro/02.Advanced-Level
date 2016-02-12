var input = '["Pesho", 2, "Gosho", 12, 2, "true", 9, undefined, 0, "Penka", { bunniesCount : 10}, [10, 20, 30, 40]]';
input = input.substring(1, input.length - 1);
input = input.replace(/\[[\w\d\s,]+]/g,"");
input = input.split(', ');

var filtered = input.filter(function(value){
    return !isNaN(value) && value != "";
}).map(function(value){
    return Number(value);
});

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

var min = new String(filtered.min());
var max = new String(filtered.max());

function mostFrequentNumber(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

var sorted = filtered.sort(function(a, b){
    return a < b;
})
jsConsole.writeLine('Min number: ' + min);
jsConsole.writeLine('Max number: ' + max);
jsConsole.writeLine('Most frequent number: ' + mostFrequentNumber(filtered));
jsConsole.writeLine('[' + sorted.join(', ') + ']');
