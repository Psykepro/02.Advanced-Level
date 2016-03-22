var app = app || {};

(function () {
    var router = Sammy(function () {
        var selector = '#container';
        var menuSelector = '#menu';
        var requester = app.requester.load('kid_-km8hONT1Z', '55a12d618e1c49ad8ccd39749a704f63', 'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var lecturesViewBag = app.lecturesViewBag.load();

        var userModel = app.userModel.load(requester);
        var lecturesModel = app.lecturesModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var lecturesController = app.lecturesController.load(lecturesViewBag, lecturesModel);


        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                $.get('templates/menu-login.html', function(template){
                    $(menuSelector).html(template);
                });
            } else {
                $.get('templates/menu-home.html', function(template){
                    $(menuSelector).html(template);
                });
            }
        });

        this.get('#/', function() {
            if(!sessionStorage['sessionId']){
                homeController.loadWelcomePage(selector);
            }else {
                homeController.loadHomePage(selector);
            }
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

        this.get('#/calendar/list/', function() {
            lecturesController.loadAllLectures(selector);
        });

        this.get('#/calendar/add/', function() {
            lecturesController.loadAddLecture(selector);
        });

        this.get('#/calendar/delete/:id', function() {
            lecturesController.loadDeleteLecture(selector, this.params['id']);
        });

        this.get('#/calendar/my/', function() {
            lecturesController.loadMyLectures(selector);
        });

        this.get('#/calendar/edit/:id', function() {
            lecturesController.loadEditLecture(selector, this.params['id']);
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

        this.bind('addLecture', function(ev, data) {
            lecturesController.addLecture(data);
        });

        this.bind('showEditNote', function(ev, data) {
            lecturesController.loadEditNote(selector, data);
        });

        this.bind('editLecture', function(ev, data) {
            lecturesController.editLecture(data);
        });

        this.bind('deleteLecture', function(ev, lectureId) {
            lecturesController.deleteLecture(lectureId);
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

