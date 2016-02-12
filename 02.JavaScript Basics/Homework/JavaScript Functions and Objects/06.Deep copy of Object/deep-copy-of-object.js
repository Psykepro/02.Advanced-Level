var a = {name: 'Pesho', age: 21};
var b = clone(a); // a deep copy
console.log(compareObjects(a, b));

b = a; // not a deep copy
console.log(compareObjects(a, b));


function compareObjects(object1, object2){
    return object1 == object2;
}

// make a deep copy
function clone(obj) {
    if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }

    return temp;
}
