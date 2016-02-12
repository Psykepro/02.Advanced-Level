function solve(input) {
    const baseConsumptionPer100km = 10,
        gasCoefficient = 1.2,
        dieselCoefficient = 0.8,
        firstRouteLength = 110,
        firstRouteWithSnow = 10,
        secondRouteLength = 95,
        secondRouteWithSnow = 30;

    var index, car, currentLine,
        fuelType, route,
        luggageWeight, allCars = [], litersNeeded;

    for(index in input){
        currentLine = input[index].split(' ').map(function(elem){
            return elem.trim();
        });

        car = currentLine[0];
        fuelType = currentLine[1];
        route = Number(currentLine[2]);
        luggageWeight = Number(currentLine[3]);

        litersNeeded = calculateNeededLiters(fuelType, route, luggageWeight);
        allCars.push(new String(car + ' ' + fuelType + ' ' + route + ' ' + litersNeeded));
    }
    console.log(allCars.join('\n'));
    function calculateNeededLiters(fuelType, route, luggageWeight) {
        var extraFuelNeedByWeight = luggageWeight * 0.01;
        var currentFuelConsumption,
            totalConsumption,
            extraFuelForSnowPart;

        if(fuelType === 'gas'){
            currentFuelConsumption  = extraFuelNeedByWeight + (baseConsumptionPer100km * gasCoefficient);
        }else if(fuelType === 'diesel'){
            currentFuelConsumption  = extraFuelNeedByWeight + (baseConsumptionPer100km * dieselCoefficient);
        }else{
            currentFuelConsumption  = extraFuelNeedByWeight + baseConsumptionPer100km;
        }

        if(route === 1){
            totalConsumption = firstRouteLength * (currentFuelConsumption / 100);
            extraFuelForSnowPart = firstRouteWithSnow * ((0.3 * currentFuelConsumption) / 100);
            totalConsumption = Math.round(totalConsumption + extraFuelForSnowPart);
        }else{
            totalConsumption = secondRouteLength * (currentFuelConsumption / 100);
            extraFuelForSnowPart = secondRouteWithSnow * ((0.3 * currentFuelConsumption) / 100);
            totalConsumption = Math.round(totalConsumption + extraFuelForSnowPart);
        }
        return Number(totalConsumption);
    }
}


solve(['BMW petrol 1 320.5',
    'Golf petrol 2 150.75',
    'Lada gas 1 202',
    'Mercedes diesel 2 312.54']
);