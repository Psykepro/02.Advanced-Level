var app = app || {};

app.customNotifier = (function() {
    return {
        load: function (text, type) {
            return noty({
                text: text,
                type: type,
                timeout: 1000,
                animation: {
                    open: {height: 'toggle'}, // jQuery animate function property object
                    close: {height: 'toggle'}, // jQuery animate function property object
                    easing: 'swing', // easing
                    speed: 500 // opening & closing animation speed
                }
            });
        }
    };
}());