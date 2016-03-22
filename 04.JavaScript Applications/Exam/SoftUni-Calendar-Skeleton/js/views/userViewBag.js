var app = app || {};

app.userViewBag = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (template) {
            $(selector).html(template);
            $('#login-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function() {
                    this.trigger('login', {username: username, password: password});
                })
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (template) {
            $(selector).html(template);
            $('#register-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val();

                if(password !== confirmPassword){
                    $('#password').val('');
                    $('#confirm-password').val('');
                    app.customNotifier.load("The both passwords aren't the same.", 'error').notify();
                }else{
                    Sammy(function() {
                        this.trigger('register', {username: username, password: password});
                    })
                }
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