var input = "HelloWorld";

console.log(sortLetters(input, true));
console.log(sortLetters(input, false));

function sortLetters(string, boolean) {
    var stringToArray = [];
    for(var char in string){
        stringToArray[char] = string[char];
    }

       if(boolean === true){
           stringToArray = stringToArray.sort(function(a, b){
               return a.toLowerCase().localeCompare(b.toLowerCase());
           });
    }else if(boolean === false){
           stringToArray = stringToArray.sort(function(a, b){
            return b.toLowerCase().localeCompare(a.toLowerCase());
        });
    }
    var sortedString = new String("'");

    for(var char in stringToArray){
        sortedString += stringToArray[char];
    }

    sortedString += "'";
    return sortedString;
}

