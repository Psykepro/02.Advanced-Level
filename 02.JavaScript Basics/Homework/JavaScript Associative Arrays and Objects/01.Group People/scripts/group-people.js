function Person(firstName, lastName, age){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}


var people = [
    new Person('Scott', 'Guthrie', 38),
    new Person('Scott', 'Johns', 36),
    new Person('Scott', 'Hanselman', 39),
    new Person('Jesse', 'Liberty', 57),
    new Person('Jon', 'Skeet', 38)
];

function groupBy(property){
    switch (property){
        case 'age': jsConsole.writeLine(groupByAge(people));
            break;
        case 'firstName': jsConsole.writeLine(groupByFirstName(people));
            break;
        case 'lastName': jsConsole.writeLine(groupByLastName(people));
            break;
    }
}


function groupByAge(people){
   var groupedByAge = [];
    for(var person in people){
        var personAsString = new String(people[person].firstName + ' ' + people[person].lastName
            + '(' + 'age ' + people[person].age + ')');
        var currentKey = people[person].age;
        if(groupedByAge[currentKey] === null || groupedByAge[currentKey] === undefined){
            groupedByAge[currentKey] = [personAsString];
        }else{
            groupedByAge[currentKey].push(personAsString);
        }
    }
    return generateOutput(groupedByAge);
}

groupBy('age');
groupBy('firstName');
groupBy('lastName');

function groupByFirstName(people){
    var groupedByFirstName = [];
    for(var person in people){
        var personAsString = new String(people[person].firstName + ' ' + people[person].lastName
            + '(' + 'age ' + people[person].age + ')');
        var currentKey = people[person].firstName;
        if(groupedByFirstName[currentKey] === null || groupedByFirstName[currentKey] === undefined){
            groupedByFirstName[currentKey] = [personAsString];
        }else{
            groupedByFirstName[currentKey].push(personAsString);
        }
    }
    return generateOutput(groupedByFirstName);
}

function groupByLastName(people){
    var groupedByLastName = [];
    for(var person in people){
        var personAsString = new String(people[person].firstName + ' ' + people[person].lastName
            + '(' + 'age ' + people[person].age + ')');
        var currentKey = people[person].lastName;
        if(groupedByLastName[currentKey] === null || groupedByLastName[currentKey] === undefined){
            groupedByLastName[currentKey] = [personAsString];
        }else{
            groupedByLastName[currentKey].push(personAsString);
        }
    }
    return generateOutput(groupedByLastName);
}

function generateOutput(group){
    var output = "";

    for(var key in group){
        output += ("Group " + key + " : [");
        output += group[key].join(', ');
        output += '\]</br>';
    }

    return output;
}