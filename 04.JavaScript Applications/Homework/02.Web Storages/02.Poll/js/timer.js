function Timer(delay, callback) {
    var timerId, start, remaining = delay, temp = callback;

    callback = function (){
        temp();
        window.clearTimeout(timerId);
    };

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
        console.log(remaining);
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();

    this.getTimeLeft = function() {
        return remaining - (new Date() - start);
    };
}

