const textPattern = /^[A-Za-z\s]+$/g,
    digitPattern = /^[\d]+$/g;

Function.prototype.extend = function(parent){
    'use strict';
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};