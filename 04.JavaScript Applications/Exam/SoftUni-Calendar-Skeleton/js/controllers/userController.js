var app = app || {};

app.userController = (function() {
    function UserController(viewBag, model, notifier) {
        this.model = model;
        this.viewBag = viewBag;

    }

    UserController.prototype.loadLoginPage = function(selector) {
        this.viewBag.showLoginPage(selector);
    };

    UserController.prototype.login = function(data) {
        return this.model.login(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['fullName'] = success.fullName;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
                app.customNotifier.load('You logged in successfully.', 'success').notify();
            }, function(error){
                app.customNotifier.load('Wrong username or password.', 'error').notify();
            });
    };


    UserController.prototype.loadRegisterPage = function(selector) {
        this.viewBag.showRegisterPage(selector);
    };

    UserController.prototype.register = function(data) {
        return this.model.register(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
                app.customNotifier.load('You registered successfully.', 'success').notify();
            }, function(error){
                app.customNotifier.load(error.responseText, 'error').notify();
            });
    };

    UserController.prototype.logout = function() {
        this.model.logout()
            .then(function() {
                sessionStorage.clear();

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
                app.customNotifier.load('You logged out successfully.', 'success').notify();
            }, function(error){
                app.customNotifier.load(error.responseText, 'error').notify();
            })
    };

    return {
        load: function(viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
}());