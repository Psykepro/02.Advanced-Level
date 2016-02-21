var app = app || {};

(function (scope) {
    'use strict';

    function Party(options){
        scope.event.call(this, options);
        this.setIsCatered(options.isCatered);
        this.setIsBirthday(options.isBirthday);
        this.setOrganiser(options.organiser);
    }

    Party.extend(scope.event);

    Party.prototype.checkIsCatered = function() {
        return this._isCatered;
    };

    Party.prototype.setIsCatered = function(isCatered) {
        if (typeof isCatered !== 'boolean') {
            throw new Error("Type of isCatered must be boolean.");
        }

        this._isCatered = isCatered;
    };

    Party.prototype.checkIsBirthday = function() {
        return this._isBirthday;
    };

    Party.prototype.setIsBirthday = function(isBirthday) {
        if (typeof isBirthday !== 'boolean') {
            throw new Error("Type of isBirthday must be boolean.");
        }

        this._isBirthday = isBirthday;
    };

    Party.prototype.getOrganiser = function() {
        return this._organiser;
    };

    Party.prototype.setOrganiser = function(organiser) {
        if (!(organiser instanceof scope.employee)) {
            throw new Error("Organiser must be instance of Employee.");
        }

        this._organiser = organiser;
    };

    scope.party = Party;

}(app));