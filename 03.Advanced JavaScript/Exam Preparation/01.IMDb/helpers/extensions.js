Function.prototype.extends = function(parent){
    'use strict';
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};