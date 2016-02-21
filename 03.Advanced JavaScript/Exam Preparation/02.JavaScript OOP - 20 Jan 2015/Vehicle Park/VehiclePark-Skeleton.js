function processVehicleParkCommands(commands) {
    'use strict';

    var Models = (function() {
        var Employee = (function() {
            function Employee(name, position, grade) {
                this.setName(name);
                this.setPosition(position);
                this.setGrade(grade);
            }

            Employee.prototype.getName = function() {
                return this._name;
            };

            Employee.prototype.setName = function(name) {
                if (!name || typeof (name) != 'string') {
                    throw new Error("Name cannot be empty or undefined.");
                }
                this._name = name;
            };

            Employee.prototype.getPosition = function() {
                return this._position;
            };

            Employee.prototype.setPosition = function(position) {
                if (!position || typeof (position) != 'string') {
                    throw new Error("Position cannot be empty or undefined.");
                }
                this._position = position;
            };

            Employee.prototype.getGrade = function() {
                return this._grade;
            };

            Employee.prototype.setGrade = function(grade) {
                if (!grade || isNaN(grade)) {
                    throw new Error("Grade cannot be negative number.");
                }
                this._grade = grade;
            };

            Employee.prototype.toString = function() {
                return " ---> " + this.getName() +
                    ",position=" + this.getPosition();
            };

            return Employee;
        }());

        var Vehicle = (function () {
            function Vehicle(brand, age, terrain, wheels){
                if(this.constructor === Vehicle){
                    throw new Error("Can't instantiate abstract class Vehicle");
                }else{
                    this.setBrand(brand);
                    this.setDuration(age);
                    this.setTerrain(terrain);
                    this.setWheels(wheels);
                }
            }

            Vehicle.prototype.getBrand = function() {
                return this._brand;
            };

            Vehicle.prototype.setBrand = function(brand) {
                if (!brand || typeof (brand) != 'string') {
                    throw new Error("Brand cannot be empty or undefined.");
                }
                this._brand = brand;
            };

            Vehicle.prototype.getAge = function() {
                return this._age;
            };

            Vehicle.prototype.setDuration = function(age) {
                if (!age || isNaN(age)) {
                    throw new Error("Age cannot be negative number.");
                }
                age = age.toFixed(1);
                this._age = age;
            };

            Vehicle.prototype.getTerrain = function() {
                return this._age;
            };

            Vehicle.prototype.setTerrain = function(terrain) {
                if (terrain !== 'road' && terrain !== 'all') {
                    throw new Error("Invalid terrain type.");
                }
                this._terrain = terrain;
            };


            Vehicle.prototype.getWheels = function() {
                return this._wheels;
            };

            Vehicle.prototype.setWheels = function(wheels) {
                if (!wheels || isNaN(wheels)) {
                    throw new Error("Wheels cannot be negative number.");
                }
                this._wheels = wheels;
            };

            Vehicle.prototype.toString = function(){
                var vehicle = ' -> ' + this.constructor.name + ': ';
                    vehicle += 'brand=' + this._brand + ',age=' + this._age
                        + ',terrainCoverage=' + this._terrain
                        + ',numberOfWheels=' + this._wheels;
                return vehicle;
            };

            return Vehicle;
        }());

        var Bike = (function () {
            function Bike(brand, age, terrain, frameSize, shifts){
                Vehicle.call(this, brand, age, terrain, '2');
                this.setFrameSize(frameSize);
                this.setShifts(shifts)
            }
            Bike.extend(Vehicle);

            Bike.prototype.getFrameSize = function() {
                return this._frameSize;
            };

            Bike.prototype.setFrameSize = function(frameSize) {
                if (!frameSize || isNaN(frameSize)) {
                    throw new Error("Frame size of wheels cannot be negative number.");
                }
                this._frameSize = frameSize;
            };

            Bike.prototype.getShifts = function() {
                return this._shifts;
            };

            Bike.prototype.setShifts = function(shifts) {
                if (!shifts || typeof (shifts) != 'string') {
                    throw new Error("Shifts cannot be empty or undefined.");
                }
                this._shifts = shifts;
            };

            Bike.prototype.toString = function(){
                var bike = Vehicle.prototype.toString.call(this);
                    bike += ',frameSize=' + this._frameSize
                        + ',numberOfShifts=' + this._shifts;
                return bike;
            };

            return Bike;
        }());

        var Automobile = (function () {
            function Automobile(brand, age, terrain, wheels, consumption, fuelType){
                if(this.constructor === Automobile){
                    throw new Error("Can't instantiate abstract class Automobile.")
                }else{
                    Vehicle.call(this, brand, age, terrain, wheels);
                    this.setConsumption(consumption);
                    this.setFuelType(fuelType);
                }
            }
            Automobile.extend(Vehicle);

            Automobile.prototype.getConsumption = function() {
                return this._consumption;
            };

            Automobile.prototype.setConsumption = function(consumption) {
                if (!consumption || isNaN(consumption)) {
                    throw new Error("Consumption cannot be negative number.");
                }
                this._consumption = consumption;
            };

            Automobile.prototype.getFuelType = function() {
                return this._fuel;
            };

            Automobile.prototype.setFuelType = function(fuel) {
                if (!fuel || typeof (fuel) != 'string') {
                    throw new Error("Fuel type cannot be empty or undefined.");
                }
                this._fuel = fuel;
            };

            Automobile.prototype.toString = function(){
                var automobile = Vehicle.prototype.toString.call(this);
                    automobile += ',consumption=[' + this._consumption + 'l/100km ' + this._fuel + ']';

                return automobile;
            };

            return Automobile;
        }());

        var Truck = (function () {
            function Truck(brand, age, terrain, consumption, fuelType, doors){
                terrain = terrain || 'all';
                Automobile.call(this, brand, age, terrain, '4', consumption, fuelType)
                this.setDoors(doors);
            }
            Truck.extend(Automobile);

            Truck.prototype.getDoors = function() {
                return this._doors;
            };

            Truck.prototype.setDoors = function(doors) {
                if (!doors || isNaN(doors)) {
                    throw new Error("Number of doors cannot be negative number.");
                }
                this._doors = doors;
            };

            Truck.prototype.toString = function(){
                var truck = Automobile.prototype.toString.call(this);
                    truck += ',numberOfDoors=' + this._doors;

                return truck;
            };

            return Truck;
        }());

        var Limo = (function () {
            function Limo(brand, age, wheels, consumption, fuelType){
                Automobile.call(this, brand, age, 'road', wheels, consumption, fuelType);
                this._employees = [];
            }
            Limo.extend(Automobile);

            Limo.prototype.getEmployees = function(){
                return this._employees;
            };

            Limo.prototype.appendEmployee = function(employee){
                if(!employee){
                    throw new Error("Can't add undefined or null employee.");
                }else{
                    var employeeInTheSet = this._employees.filter(function(currentEmployee){
                        return currentEmployee === employee;
                    })[0];
                    if(!employeeInTheSet){
                        this._employees.push(employee);
                    }
                }
            };

            Limo.prototype.detachEmployee = function(employee){
                var employeeInTheSet = this._employees.filter(function(currentEmployee){
                    return currentEmployee === employee;
                })[0];

                if(!employeeInTheSet){
                    throw Error('There is no such employee in the set.');
                }else{
                    this._employees.splice(this._employees.indexOf(employeeInTheSet), 1);
                }
            };

            Limo.prototype.toString = function(){
                var limo = Automobile.prototype.toString.call(this);
                limo += '\n --> Employees, allowed to drive:';
                if(this._employees.length > 0){
                    limo += '\n' + this._employees.join('\n');
                }else{
                    limo += ' ---'
                }

                return limo;
            };

            return Limo;
        }());

        return {
            Employee: Employee,
            Bike: Bike,
            Truck: Truck,
            Limo: Limo
        }
    }());


    var ParkManager = (function(){
        var _vehicles;
        var _employees;

        function init() {
            _vehicles = [];
            _employees = [];
        }

        var CommandProcessor = (function() {

            function processInsertCommand(command) {
                var object;

                switch (command["type"]) {
                    case "bike":
                        object = new Models.Bike(
                            command["brand"],
                            parseFloat(command["age"]),
                            command["terrain-coverage"],
                            parseFloat(command["frame-size"]),
                            command["number-of-shifts"]);
                        _vehicles.push(object);
                        break;
                    case "truck":
                        object = new Models.Truck(
                            command["brand"],
                            parseFloat(command["age"]),
                            command["terrain-coverage"],
                            parseFloat(command["consumption"]),
                            command["type-of-fuel"],
                            parseFloat(command["number-of-doors"]));
                        _vehicles.push(object);
                        break;
                    case "limo":
                        object = new Models.Limo(
                            command["brand"],
                            parseFloat(command["age"]),
                            parseFloat(command["number-of-wheels"]),
                            parseFloat(command["consumption"]),
                            command["type-of-fuel"]);
                        _vehicles.push(object);
                        break;
                    case "employee":
                        object = new Models.Employee(command["name"], command["position"], parseFloat(command["grade"]));
                        _employees.push(object);
                        break;
                    default:
                        throw new Error("Invalid type.");
                }

                return object.constructor.name + " created.";
            }

            function processDeleteCommand(command) {
                var object,
                    index;

                switch (command["type"]) {
                    case "employee":
                        object = getEmployeeByName(command["name"]);
                        _vehicles.forEach(function(t) {
                            if (t instanceof Models.Limo && t.getEmployees().indexOf(object) !== -1) {
                                t.detachEmployee(object);
                            }
                        });
                        index = _employees.indexOf(object);
                        _employees.splice(index, 1);
                        break;
                    case "bike":
                    case "truck":
                    case "limo":
                        object = getVehicleByBrandAndType(command["brand"],command["type"]);
                        index = _vehicles.indexOf(object);
                        _vehicles.splice(index, 1);
                        break;
                    default:
                        throw new Error("Unknown type.");
                }

                return object.constructor.name + " deleted.";
            }

            function processListCommand(command) {
                return formatOutputList(_vehicles);
            }

            function processAppendEmployeeCommand(command) {
                var employee = getEmployeeByName(command["name"]);
                var limos = getLimosByBrand(command["brand"]);

                for (var i=0; i < limos.length; i++) {
                    limos[i].appendEmployee(employee);
                }
                return "Added employee to possible Limos.";
            }

            function processDetachEmployeeCommand(command) {
                var employee = getEmployeeByName(command["name"]);
                var limos = getLimosByBrand(command["brand"]);

                for (var i=0; i < limos.length; i++) {
                    limos[i].detachEmployee(employee);
                }

                return "Removed employee from possible Limos.";
            }



            function processListEmployees (commandArgs) {
                var employees = getEmployeesByGrade(commandArgs["grade"]),
                    output;

                output = 'List Output:\n' + employees.join('\n');

                return output;
            }
            // Functions below are not revealed
            function getEmployeesByGrade(grade) {
                var returnEmployees;
                if(isNaN(grade) || grade === 'all'){
                    returnEmployees = _employees;
                }else{
                    if(isNaN(grade)){
                        throw new Error('Invalid grade');
                    }else{
                        var qualifiedEmployees = _employees.filter(function(employee){
                            return employee.getGrade() >= grade;
                        });
                        returnEmployees = qualifiedEmployees;
                    }
                }
                returnEmployees = returnEmployees.sort(function(a, b){
                    return a.getName().localeCompare(b.getName());
                });
                return returnEmployees;
            }

            function getVehicleByBrandAndType(brand, type) {
                for (var i=0; i < _vehicles.length; i++) {
                    if (_vehicles[i].constructor.name.toString().toLowerCase() === type &&
                        _vehicles[i].getBrand() === brand) {
                        return _vehicles[i];
                    }
                }
                throw new Error("No Limo with such brand exists.");
            }

            function getLimosByBrand(brand) {
                var currentVehicles = [];
                for (var i=0; i < _vehicles.length; i++) {
                    if (_vehicles[i] instanceof Models.Limo &&
                        _vehicles[i].getBrand() === brand) {
                        currentVehicles.push(_vehicles[i]);
                    }
                }
                if (currentVehicles.length > 0) {
                    return currentVehicles;
                }
                throw new Error("No Limo with such brand exists.");
            }

            function getEmployeeByName(name) {

                for (var i = 0; i < _employees.length; i++) {
                    if (_employees[i].getName() === name) {
                        return _employees[i];
                    }
                }
                throw new Error("No Employee with such name exists.");
            }

            function formatOutputList(output) {
                var queryString = "List Output:\n";

                if (output.length > 0) {
                    queryString += output.join("\n");
                } else {
                    queryString = "No results.";
                }

                return queryString;
            }

            return {
                processInsertCommand: processInsertCommand,
                processDeleteCommand: processDeleteCommand,
                processListCommand: processListCommand,
                processAppendEmployeeCommand: processAppendEmployeeCommand,
                processDetachEmployeeCommand: processDetachEmployeeCommand,
                processListEmployees : processListEmployees
            }
        }());

        var Command = (function() {
            function Command(cmdLine) {
                this._cmdArgs = processCommand(cmdLine);
            }

            function processCommand(cmdLine) {
                var parameters = [],
                    matches = [],
                    pattern = /(.+?)=(.+?)[;)]/g,
                    key,
                    value,
                    split;

                split = cmdLine.split("(");
                parameters["command"] = split[0];
                while ((matches = pattern.exec(split[1])) !== null) {
                    key = matches[1];
                    value = matches[2];
                    parameters[key] = value;
                }

                return parameters;
            }

            return Command;
        }());

        function executeCommands(cmds) {
            var commandArgs = new Command(cmds)._cmdArgs,
                action = commandArgs["command"],
                output;

            switch (action) {
                case "insert":
                    output = CommandProcessor.processInsertCommand(commandArgs);
                    break;
                case "delete":
                    output = CommandProcessor.processDeleteCommand(commandArgs);
                    break;
                case "append-employee":
                    output = CommandProcessor.processAppendEmployeeCommand(commandArgs);
                    break;
                case "detach-employee":
                    output = CommandProcessor.processDetachEmployeeCommand(commandArgs);
                    break;
                case "list":
                    output = CommandProcessor.processListCommand(commandArgs);
                    break;
                case "list-employees":
                    output = CommandProcessor.processListEmployees(commandArgs);
                    break;
                default:
                    throw new Error("Unsupported command.");
            }

            return output;
        }

        return {
            init: init,
            executeCommands: executeCommands
        }
    }());

    var output = "";
    ParkManager.init();

    commands.forEach(function(cmd) {
        var result;
        if (cmd != "") {
            try {
                result = ParkManager.executeCommands(cmd) + "\n";
            } catch (e) {
                result = "Invalid command." + "\n";
                //result = e.message + "\n";
            }
            output += result;
        }
    });

    return output;
}



// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function() {
    var arr = [];
    if (typeof (require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line', function(line) {
            arr.push(line);
        }).on('close', function() {
            console.log(processVehicleParkCommands(arr));
        });
    }
})();