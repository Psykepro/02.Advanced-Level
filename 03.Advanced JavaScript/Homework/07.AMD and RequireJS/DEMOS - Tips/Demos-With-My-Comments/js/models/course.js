define([], function(){
    var id = 0;
    var Course = (function () {
        function Course(name){
            this.name = name;
            this.id = ++id;
        }

        return Course;
    }());

    // Returning the module \\
    return Course;
});