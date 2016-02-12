function solve(input){
    var pattern = /([/^mine/$]{4}).*?[-]{1}(gold|silver|diamonds):([\d]+)/gi,
        lineIndex,
        currentLine,
        match,
        key,
        value;
var oresAndTheirQuantity = new Array(3);
    oresAndTheirQuantity['silver'] = 0;
    oresAndTheirQuantity['gold'] = 0;
    oresAndTheirQuantity['diamonds'] = 0;

    for(lineIndex in input){
        pattern = /([/^mine/$]{4}).*?[-]{1}(gold|silver|diamonds):([\d]+)/gi;
        currentLine = input[lineIndex].replace(/[\s]+/g, '');
        match = pattern.exec(currentLine);

        if(match === null){
            continue;
        }else{
            key = match[2];
            value = Number(match[3]);
            oresAndTheirQuantity[key] += value;
        }
    }

    console.log("*Silver: " + oresAndTheirQuantity['silver']);
    console.log("*Gold: " + oresAndTheirQuantity['gold']);
    console.log("*Diamonds: " + oresAndTheirQuantity['diamonds']);
}


solve(['mine bobovDol - gold: 10',
    'mine medenRudnik - silver: 22',
    'mine chernoMore - shrimps : 24',
    'gold: 50']);

solve(['mine bobovdol - gold: 10',
    'mine - diamonds: 5',
    'mine colas - wood: 10',
    'mine myMine - silver:  14',
    'mine silver:14 - silver: 14']);








