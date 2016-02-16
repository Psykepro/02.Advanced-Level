var Student = (function() {
    function Student(name, age, legs, facultyNum){
        Person.call(this, name, age, legs);
            this.facultyNum = facultyNum;
    }

    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;

    Student.prototype.showFacultyNum = function(){
        console.log('My faculty number is ' + this.facultyNum);
    };

    return Student;
})();
