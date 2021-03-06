var imdb = imdb || {};

(function(scope){
    'use strict';
    var id = 0;
    function Movie(title, length, rating, country){
        this.title = title;
        this.length = length;
        this.rating = rating;
        this.country = country;
        this._actors = [];
        this._reviews = [];
        this._id = ++id;
    }

    Movie.prototype.addActor = function(actor){
       this._actors.push(actor);
    };

    Movie.prototype.getActors = function(){
        return this._actors;
    };

    Movie.prototype.addReview = function(review){
        this._reviews.push(review);
    };

    Movie.prototype.deleteReview = function(review){
        this._reviews = this._reviews.filter(function(currentReview){
            return currentReview !== review;
        });
    };

    Movie.prototype.deteleReviewById  = function(id){
        this._reviews = this._reviews.filter(function(currentReview){
            return currentReview._id !== id;
        });
    };

    Movie.prototype.getReviews = function(){
        return this._reviews;
    };

    scope._Movie = Movie;
    scope.getMovie = function(title, length, rating, country){
        return new Movie(title, length, rating, country);
    }
}(imdb));