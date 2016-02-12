function solve(input){
    var luggage =  new Array(), currentLineSplit, lineIndex, owner,
        ownerName, luggageName, isFood, isDrink, isFragile, weightKG, trasferredWith, type;
    var patternForSplit = /\.*\*\.*/g;

    for(lineIndex = 0; lineIndex < input.length - 1; lineIndex++){
        // process data
        currentLineSplit = input[lineIndex].split(patternForSplit);
        ownerName = currentLineSplit[0];
        luggageName = currentLineSplit[1];
        isFood =  currentLineSplit[2] === 'true';
        isDrink = currentLineSplit[3] === 'true';
        isFragile = currentLineSplit[4] === 'true';
        weightKG = Number(currentLineSplit[5]);
        trasferredWith = currentLineSplit[6];
        if(isFood && !isDrink){
            type = 'food';
        }else if(isDrink && !isFood){
            type = 'drink';
        }else{
            type = 'other';
        }

        // take data
        if(!luggage[ownerName]){
            luggage[ownerName] = new Array();
            luggage[ownerName].push({
                luggageName: luggageName,
                kg: weightKG,
                fragile: isFragile,
                type: type,
                transferredWith: trasferredWith});
        }
        else{
            luggage[ownerName].push({
            luggageName: luggageName,
            kg: weightKG,
            fragile: isFragile,
            type: type,
            transferredWith: trasferredWith});
        }
    }

    // sort data
    var sortBy = input[input.length - 1];

    if(sortBy === 'strict'){
        //print
        printLuggage();
    }else if(sortBy === 'weight') {
        for(owner in luggage){
            luggage[owner] = luggage[owner].sort(function (a, b){
               return a.kg - b.kg;
            });
        }
        // print
        printLuggage();
    }else if(sortBy === 'luggage name'){
        for(owner in luggage){
            luggage[owner] = luggage[owner].sort(function (a, b){
                return a.luggageName.localeCompare(b.luggageName);
            });
        }
        // print
        printLuggage();
    }

    function printLuggage() {
        var output = '{';
        for(owner in luggage){
            output +=  ('"' + owner + '":{');
            for(var currentLuggage in luggage[owner]){
                output +=  ('"' + luggage[owner][currentLuggage].luggageName + '":{');
                output +=  ('"kg":' + luggage[owner][currentLuggage].kg + ',');
                output +=  ('"fragile":' + luggage[owner][currentLuggage].fragile + ',');
                output +=  ('"type":"' + luggage[owner][currentLuggage].type + '",');
                output +=  ('"transferredWith":"' + luggage[owner][currentLuggage].transferredWith + '"}');
                if(currentLuggage < luggage[owner].length - 1){
                    output += ',';
                }
            }
            output += '}';
            if(owner !== ownerName){
                output += ',';
            }
        }
        output += '}';
        console.log(output);
    }
}

//solve(['Yana Slavcheva.*.clothes.*.false.*.false.*.false.*.2.2.*.backpack',
//    'Kiko.*.socks.*.false.*.false.*.false.*.0.2.*.backpack',
//    'Kiko.*.banana.*.true.*.false.*.false.*.3.2.*.backpack',
//    'Kiko.*.sticks.*.false.*.false.*.false.*.1.6.*.ATV',
//    'Kiko.*.glasses.*.false.*.false.*.true.*.3.*.ATV',
//    'Manov.*.socks.*.false.*.false.*.false.*.0.3.*.ATV',
//    'weight']);
//
//solve(['Yana Slavcheva.*.clothes.*.false.*.false.*.false.*.2.2.*.backpack',
//    'Kiko.*.socks.*.false.*.false.*.false.*.0.2.*.backpack',
//    'Kiko.*.banana.*.true.*.false.*.false.*.3.2.*.backpack',
//    'Kiko.*.sticks.*.false.*.false.*.false.*.1.6.*.ATV',
//    'Kiko.*.glasses.*.false.*.false.*.true.*.3.*.ATV',
//    'Manov.*.socks.*.false.*.false.*.false.*.0.3.*.ATV',
//    'luggage name']);

solve(['Yana Slavcheva*....clothes*....false*....false*....false*....2.2*....backpack',
        'Kiko*....sticks*....false*....false*....false*....1.6*....ATV',
        'Kiko*....sheets*....false*....false*....false*....3.6*....backpack',
        'Kiko*....banana*....true*....false*....false*....3.2*....backpack',
        'Kiko*....glasses*....false*....false*....true*....0.2*....ATV',
        'Kiko*....glasses*....false*....false*....true*....3*....ATV',
        'Manov*....socks*....false*....false*....false*....0.3*....ATV',
        'luggage name']);







