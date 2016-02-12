function solve(input){
    var patternForFirstPart = /coin\s[0-9]+/gi;
    var patternForSecondPart = /[.]{1}[0]*[1-9]+/gi;
    var validCoins = input.filter(function(string){
        var matchFirstPart = patternForFirstPart.exec(string);
        var matchSecondPart = patternForSecondPart.exec(string);
        var isValid = (matchFirstPart !== null) && (matchSecondPart === null);
        patternForFirstPart = /coin\s[0-9]+/gi;
        patternForSecondPart = /[.]{1}[0]*[1-9]+/gi;
        return isValid;
    }).map(function(elem){
        var num = Number(elem.split(/[\s]+/gi)[1]);
        return num;
    });

    if(validCoins === undefined){
        console.log('gold : 0');
        console.log('silver : 0');
        console.log('bronze : 0');
    }else{
        var coins = 0;
        for (var i = validCoins.length; i--;) {
            coins += validCoins[i];
        }

        var goldCoins = Number((coins / 100).toString().split('.')[0]);
        coins -= (goldCoins * 100);
        var silverCoins = Number((coins / 10).toString().split('.')[0]);
        coins -= (silverCoins * 10);
        var bronzeCoins = coins;
        console.log('gold : ' + goldCoins);
        console.log('silver : ' + silverCoins);
        console.log('bronze : ' + bronzeCoins);
    }
}

//Number(coins.toString().split('.')[0]);

solve(['coin -1','coin two', 'coin 5', 'coin 10.50', 'coin 20', 'coin 50', 'coin hundred','cigars 1']);
//solve(['coin 1','coin 2', 'coin 5', 'coin 10', 'coin 20', 'coin 50', 'coin 100', 'coin 200', 'coin 500','cigars 1']);
//solve(['coin one', 'coin two', 'coin five', 'coin ten', 'coin twenty', 'coin fifty', 'coin hundred', 'cigars 1']);
//solve(['coin 1', 'coin two', 'coin 5', 'coin 10.50', 'coin 20', 'coin 50', 'coin hundred', 'cigars 1']);
//solve(['coin 10041', 'coin 0.99', 'coin -5', 'coin 105.0', 'coin 2002.01', 'coin fifty', 'coin -100', 'cigars 1']);








