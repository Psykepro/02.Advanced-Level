var app = app || {};

(function (scope) {
    'use strict';

    function Employee(name, workHours){
        this.setName(name);
        this.setWorkhours(workHours);
    }

    Employee.prototype.getName = function() {
        return this._name;
    };

    Employee.prototype.setName = function(name) {
        if (!name.match(textPattern) || typeof name !== 'string') {
            throw new Error("Name must be string containing only letters and whitespaces.");
        }

        this._name = name;
    };

    Employee.prototype.getWorkhours = function() {
        return this._workHours;
    };

    Employee.prototype.setWorkhours = function(workHours) {
        if (!workHours.toString().match(digitPattern) || isNaN(workHours) || workHours < 0) {
            throw new Error("Work hours must be non-negative number.");
        }

        this._workHours = workHours;
    };

    scope.employee = Employee;

}(app));