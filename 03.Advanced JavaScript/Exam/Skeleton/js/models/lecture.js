var app = app || {};

(function (scope) {
    'use strict';

    function Lecture(options){
        scope.event.call(this, options);
        this.setTrainer(options.trainer);
        this.setCourse(options.course);
    }

    Lecture.extend(scope.event);

    Lecture.prototype.getTrainer = function() {
        return this._trainer;
    };

    Lecture.prototype.setTrainer = function(trainer) {
        if (!(trainer instanceof scope.trainer)) {
            throw new Error("Trainer must be instance of Trainer.");
        }

        this._trainer = trainer;
    };

    Lecture.prototype.getCourse = function() {
        return this._course;
    };

    Lecture.prototype.setCourse = function(course) {
        if (!(course instanceof scope.course)) {
            throw new Error("Course must be instance of Course.");
        }

        this._course = course;
    };

    scope.lecture = Lecture;
}(app));