var input = '[200, 120, 23, 67, 350, 420, 170, 212, 401, 615, -1]';
input = input.substring(1, input.length - 1);
input = input.split(', ');

var filtered = input.filter(function(value){
   if(!isNaN(value) && value != ""){
       var number = Number(value);
       if(number < 400 && number > 0){
           return true;
       }
   }
    else{
       return false;
   }
}).map(function(value){
    var number = Number(value);
    number = number - ((number * 20) / 100);
    return number;
}).sort(function(a,b){
    return a > b;
});

jsConsole.writeLine('[ ' + filtered.join(', ')+ ' ]');


