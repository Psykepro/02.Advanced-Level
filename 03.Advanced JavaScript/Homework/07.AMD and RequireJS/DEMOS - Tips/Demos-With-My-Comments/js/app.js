<!--You can install RequireJS by typing in Terminal(Alt + F12) this command:-->
<!--npm install requirejs-->
<!--Note that require and requirejs are 2 different libraries!-->

/* This is how you define paths of the libraries which you want to load.*/
require.config({
    paths: {
        'jQuery' : 'libs/jquery',
        'underscore' : 'libs/underscore',
        'person' : 'models/person',
        'course' : 'models/course'
    }
});

/* The first argument which in this case is empty array
*  is where you put the dependency libraries.*/
require([],function sayHello(){
    console.log('Hello');
});

/* The first argument which in this case is array
 * which contains the dependency library person.
 * The module or the object which is returned
 * from the dependency library is submitted as
 * argument to the function.*/
require(['person', 'underscore', 'jQuery'], function(Person){
    var gosho = new Person('Gosho');
    gosho.sayHello();
    gosho.addCourse('Advanced JS');
    gosho.addCourse('JS Basics');
    console.log(gosho.findCourseById(2));

    console.log(gosho);

    var arr = [1, 2, 3];
     /*You can use underscore(_) and jquery($) without submitting them as argument,
       because they will be attached to the global(window) object.*/
    console.log(_.min(arr));
;    $('#wrapper').text(gosho.name);
});

