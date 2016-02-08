function testContext() {
    console.log(this);
}

function testFunction(){
    testContext();
}

testContext(); //This example prints all nodes of the global scope and all paths used by the IDE
testFunction(); //This is the same as the previous
var object = new testContext(); // This one prints the name of the Object testContext
