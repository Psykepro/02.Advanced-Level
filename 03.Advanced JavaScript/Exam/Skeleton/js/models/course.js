var app = app || {};

(function (scope) {
    'use strict';

    function Course(name, numberOfLectures){
        this.setName(name);
        this.setNumberOfLectures(numberOfLectures);
    }

    Course.prototype.getName = function() {
        return this._name;
    };

    Course.prototype.setName = function(name) {
        if (!name.match(textPattern) || typeof name !== 'string') {
            throw new Error("Name must be string containing only letters and whitespaces.");
        }

        this._name = name;
    };

    Course.prototype.getNumberOfLectures = function() {
        return this._numberOfLectures;
    };

    Course.prototype.setNumberOfLectures = function(numberOfLectures) {
        if (!numberOfLectures.toString().match(digitPattern) || isNaN(numberOfLectures) || numberOfLectures < 0) {
            throw new Error("Number of lectures must be non-negative number.");
        }

        this._numberOfLectures = numberOfLectures;
    };

    scope.course = Course;

}(app));