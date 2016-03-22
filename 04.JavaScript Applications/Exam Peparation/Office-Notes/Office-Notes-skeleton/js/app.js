var app = app || {};


(function () {
    var router = Sammy(function () {
        var selector = '#container';
        var requester = app.requester.load('kid_Wkb0-1CoJZ', '750ff4faba9645808f5ff45968cf465c', 'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var notesViewBag = app.notesViewBag.load();

        var userModel = app.userModel.load(requester);
        var notesModel = app.lecturesModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var notesController = app.lecturesController.load(notesViewBag, lecturesModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                $('#menu').hide();
            } else {
                $('#welcomeMenu').text('Welcome, ' + sessionStorage['fullName']);
                $('#menu').show();
            }
        });

        this.get('#/', function() {
            homeController.loadWelcomePage(selector);
        });

        this.get('#/home/', function() {
            homeController.loadHomePage(selector);
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/office/', function() {
            lecturesController.loadOfficeNotes(selector);
        });

        this.get('#/myNotes/', function() {
            lecturesController.loadMyNotes(selector);
        });

        this.get('#/addNote/', function() {
            lecturesController.loadAddNote(selector);
        });

        this.bind('redirectUrl', function(ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(ev, data) {
            userController.login(data);
        });

        this.bind('register', function(ev, data) {
            userController.register(data);
        });

        this.bind('addNote', function(ev, data) {
            lecturesController.addNote(data);
        });

        this.bind('showEditNote', function(ev, data) {
            lecturesController.loadEditNote(selector, data);
        });

        this.bind('editNote', function(ev, data) {
            lecturesController.editNote(data);
        });

        this.bind('showDeleteNote', function(ev, data) {
            lecturesController.loadDeleteNote(selector, data);
        });

        this.bind('deleteNote', function(ev, data) {
            lecturesController.deleteNote(data._id);
        })
    });

    router.run('#/');
}());

