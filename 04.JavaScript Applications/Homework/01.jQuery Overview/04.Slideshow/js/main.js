'use strict';

//var myInterval = setInterval(function(){
//    console.log('interval');
//}, 1000);

//var animation = $('#slider #slides').animate({'margin-left': '-=720'}, 1000);

$(function () {
    //configuration
    const width = 720,
        changeInterval = 5000,
        animationSpeed = 1000;
    var currentSlide = 1;

    //cache DOM (Optimization)
    var $slider = $('#slider'),
        //search for the container inside the div wrapper (high performance)
        $sliderContainer = $slider.find('#slides'),
        $slides = $sliderContainer.find('.slide');

    var interval;

    function startSlider(){
        interval= setInterval(function(){
            $sliderContainer.animate({'margin-left': '-=' + width}, animationSpeed, function(){
                currentSlide++;
                if(currentSlide === $slides.length){
                    currentSlide = 1;
                    $sliderContainer.css('margin-left', 0);
                }
            });
        }, changeInterval);
    }
    startSlider();

    function stopSlider(){
        clearInterval(interval);
    }

    function slideOnClick(){
        $sliderContainer.css({'margin-left': '-=' + width});
        currentSlide++;
        if(currentSlide === $slides.length){
            currentSlide = 1;
            $sliderContainer.css('margin-left', 0);
        }
    }

    //on mouse enter the automatically slide will stop and after mouse leave will starts again
    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    //on click will slide 1 wallpaper to the left
    $slider.on('click', slideOnClick);

});

