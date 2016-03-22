var app = app || {};

app.userViewBag = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#loginButton').on('click', function () {
                var username = escapeHTML($('#username').val()),
                    password = escapeHTML($('#password').val());

                Sammy(function() {
                    this.trigger('login', {username: username, password: password});
                })
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#registerButton').on('click', function () {
                var username = escapeHTML($('#username').val()),
                    password = escapeHTML($('#password').val()),
                    fullName = escapeHTML($('#fullName').val());
                if(password !== fullName){
                    Sammy(function(){
                        this.trigger('redirectUrl', '#/register/')
                    });

                    app.customNotifier.load('You registered successfully.', 'success').notify();
                }

                Sammy(function() {
                    this.trigger('register', {username: username, password: password, fullName: fullName});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());