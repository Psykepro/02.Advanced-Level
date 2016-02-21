var app = app || {};

(function (scope) {
    'use strict';

    function Hall(name, capacity){
        this.setName(name);
        this.setCapacity(capacity);
        this.parties = [];
        this.lectures = [];
    }

    Hall.prototype.getName = function() {
        return this._name;
    };

    Hall.prototype.setName = function(name) {
        if (!name.match(textPattern) || typeof name !== 'string') {
            throw new Error("Name must be string containing only letters and whitespaces.");
        }

        this._name = name;
    };

    Hall.prototype.getCapacity = function() {
        return this._capacity;
    };

    Hall.prototype.setCapacity = function(capacity) {
        if (!capacity.toString().match(digitPattern) || isNaN(capacity)) {
            throw new Error("Capacity must be a number.");
        }

        this._capacity = capacity;
    };

    Hall.prototype.addEvent = function(event){
        if(event instanceof scope.party){
            this.parties.push(event);
        }else if(event instanceof scope.lecture){
            this.lectures.push(event);
        }else{
            throw new Error('Invalid type.')
        }
    };

    scope.hall = Hall;
}(app));
