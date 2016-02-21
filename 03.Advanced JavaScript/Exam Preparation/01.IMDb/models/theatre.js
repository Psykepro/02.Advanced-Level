var imdb = imdb || {};

(function(scope){
    'use strict';
    var id = 0;
    function Theatre(title, length, rating, country, isPuppet){
        scope._Movie.call(this, title, length, rating, country, isPuppet);
        this.isPuppet = isPuppet || false;
        this._id = ++id;
    }

    Theatre.extends(scope._Movie);

    scope.getTheatre = function(title, length, rating, country, isPuppet){
        return new Theatre(title, length, rating, country, isPuppet);
    }
}(imdb));