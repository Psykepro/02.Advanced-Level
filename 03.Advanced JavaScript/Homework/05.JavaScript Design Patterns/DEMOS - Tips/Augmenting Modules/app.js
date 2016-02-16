var mammal = new Mammal(4);
console.log('Mammal :');
mammal.showCountOfLegs();

var person = new Person('Niki', 20, 2);
console.log('\nPerson :');
person.showCountOfLegs();
person.sayHello();

var student = new Student('Koleca', 21, 2, 1715);
console.log('\nStudent :');
student.showCountOfLegs();
student.sayHello();
student.showFacultyNum();
