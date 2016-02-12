var array = [
    "Pesho",
    4,
    4.21,
    { name : 'Valyo', age : 16 },
    { type : 'fish', model : 'zlatna ribka' },
    [1,2,3],
    "Gosho",
    { name : 'Penka', height: 1.65}
];

function extractObjects(array) {
    return array.filter(function(element){
        return (typeof(element) === "object") && !Array.isArray(element);
    });
}
var extractedObjects = new Array (extractObjects(array));
extractedObjects.forEach(function(element){
    console.log(element);
});
