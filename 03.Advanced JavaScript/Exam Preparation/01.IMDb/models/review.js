
var imdb = imdb || {};

(function(scope){
    'use strict';
    function Review(author, content, date){
        this.author = author;
        this.content = content;
        this.date = date;
    }

    scope.getReview = function(author, content, date){
        return new Review(author, content, date);
    }
}(imdb));