var app = app || {};

(function (scope) {
    'use strict';
    function Trainer(name, workHours){
        scope.employee.call(this, name, workHours);
        this.courses = [];
        this.feedbacks = [];
    }
    Trainer.extend(scope.employee);

    Trainer.prototype.addFeedback = function(feedback){
        if(typeof feedback !== 'string'){
            throw new Error('The type of Feedback must be string.')
        }else{
            this.feedbacks.push(feedback);
        }
    };

    Trainer.prototype.addCourse = function(course){
        if (!(course instanceof scope.course)) {
            throw new Error("Course must be instance of Course.");
        }else{
            this.courses.push(course);
        }
    };

    scope.trainer = Trainer;
}(app));