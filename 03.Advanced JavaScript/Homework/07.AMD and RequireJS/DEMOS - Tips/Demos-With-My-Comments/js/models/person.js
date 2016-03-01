/* Defining the module with no dependency libraries*/

define(['course','underscore'], function(Course){
    var Person = (function () {
        function Person(name){
            this.name = name;
            this.courses = [];
        }

        Person.prototype.sayHello = function () {
            console.log(this.name + ' says hello!')
        };

        Person.prototype.addCourse = function (courseName) {
            this.courses.push(new Course(courseName));
        };

        Person.prototype.findCourseById = function (courseId) {
            return _.find(this.courses, function(c){
                return c.id === courseId;
            })
        };

        return Person;
    }());

    // Returning the module \\
    return Person;
});

