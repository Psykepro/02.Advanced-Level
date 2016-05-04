Object.defineProperty(Object.prototype, 'ShallowCopy', {
    value: function (obj) {
        for (var prop in obj) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = obj[prop];
            }
        }
    }, enumerable: false
});