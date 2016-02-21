var app = app || {};

(function (scope) {
    'use strict';
    function Event(options){
        if(this.constructor === Event){
            throw new Error("Can't instantiate abstract class Event");
        }else{
            this.setTitle(options.title);
            this.setType(options.type);
            this.setDuration(options.duration);
            this.setDate(options.date);
        }
    }

    Event.prototype.getTitle = function() {
        return this._title;
    };

    Event.prototype.setTitle = function(title) {
        if (!title.match(textPattern) || typeof title !== 'string') {
            throw new Error("Title must be string containing only letters and whitespaces.");
        }

        this._title = title;
    };


    Event.prototype.getType = function() {
        return this._type;
    };

    Event.prototype.setType = function(type) {
        if (!type.match(textPattern) || typeof type !== 'string') {
            throw new Error("Type must be string containing only letters and whitespaces.");
        }

        this._type = type;
    };


    Event.prototype.getDuration = function() {
        return this._duration;
    };

    Event.prototype.setDuration = function(duration) {
        if (!duration.toString().match(digitPattern) || isNaN(duration) || duration < 0) {
            throw new Error("Duration must be non-negative number.");
        }

        this._duration = duration;
    };

    Event.prototype.getDate = function() {
        return this._date;
    };

    Event.prototype.setDate = function(date) {
        if (!(date instanceof Date)) {
            throw new Error("Date must be instance of Date.");
        }

        this._date = date;
    };

    scope.event = Event;
}(app));