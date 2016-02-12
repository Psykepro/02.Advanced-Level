function solve(input){
    var index, currentDateTokens, currentDate, biggestFan, biggestHater, fansDates = [], hatersDates = [];
    const minDate = new Date('1900', '01' - 1, '01'), maxDate = new Date('2015', '01' - 1, '01'),
        fansAndHatersRestrictDate = new Date('1973', '05' - 1, '25');

    for(index in input){
        currentDateTokens = input[index].split('.');
        currentDate = new Date(currentDateTokens[2], currentDateTokens[1] - 1, currentDateTokens[0]);
        if(currentDate > minDate && currentDate < maxDate){
            if(currentDate >= fansAndHatersRestrictDate){
                fansDates.push(currentDate);
            }else{
                hatersDates.push(currentDate);
            }
        }
    }

    if(fansDates.length === 0 && hatersDates.length === 0){
        console.log('No result');
    }else{
        if(fansDates.length > 0){
            biggestFan = new Date(Math.max.apply(null, fansDates));
            console.log('The biggest fan of ewoks was born on ' + biggestFan.toDateString());
        }if(hatersDates.length > 0){
            biggestHater = new Date(Math.min.apply(null, hatersDates));
            console.log('The biggest hater of ewoks was born on ' + biggestHater.toDateString());
        }
    }
}

//solve(['22.03.2014',
//    '17.05.1933',
//    '10.10.1954']);
//console.log();
//solve(['22.03.2000']);
//console.log();
//solve(['22.03.1700',
//    '01.07.2020']);

solve(['25.11.2002',
    '19.06.2001',
    '18.13.1966',
    '29.03.1955']);










