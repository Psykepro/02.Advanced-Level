Array.prototype.removeItem = function(item) {
    var index = this.indexOf(item);
       if(index > -1){
           this.splice(index,1);
       }
    return this;
};

var arr = [1, 2, 1, 4, 1, 3, 4, 1, 111, 3, 2, 1, '1'];
arr = arr.removeItem(1);
console.log('[' + arr.join(', ') + ']');

var arr = ['hi', 'bye', 'hello' ];
arr.removeItem('bye')
console.log('[' + arr.join(', ') + ']');


