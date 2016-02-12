"use strict";

var inputAsString = prompt('','');
inputAsString = inputAsString.replace('[', '');
inputAsString = inputAsString.replace(']', '');
var arr = new Array(2);
inputAsString = inputAsString.split(', ');
var index = 0;

for (var index = 0; index < arr.length; index++){
    arr[index] = parseInt(inputAsString[index]);
}

document.writeln(calculateCylinderVolume(arr));

function calculateCylinderVolume(arr){
    var radius = arr[0];
    var height = arr[1];
    var volume = height * Math.PI * (radius * radius);
    return volume.toFixed(3);
}