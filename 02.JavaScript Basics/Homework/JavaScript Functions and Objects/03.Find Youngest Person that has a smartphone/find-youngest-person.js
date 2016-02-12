var people = [
    { firstname : 'George', lastname: 'Kolev', age: 32, hasSmartphone: false },
    { firstname : 'Vasil', lastname: 'Kovachev', age: 40, hasSmartphone: true },
    { firstname : 'Bay', lastname: 'Ivan', age: 81, hasSmartphone: true },
    { firstname : 'Baba', lastname: 'Ginka', age: 40, hasSmartphone: false }];

var youngestPerson = new Object(findYoungestPerson(people));
console.log('The youngest person is'+' '+ youngestPerson['firstname']+ ' '+ youngestPerson['lastname']);



function findYoungestPerson(people) {
    var youngestPerson = {};
    var youngestPersonAge = Number.MAX_VALUE;
    for(var person in people){
        if(people[person].hasSmartphone === true){
            if(people[person].age < youngestPersonAge){
                youngestPerson = people[person];
                youngestPersonAge = people[person].age;
            }
        }
    }

    return youngestPerson;
}