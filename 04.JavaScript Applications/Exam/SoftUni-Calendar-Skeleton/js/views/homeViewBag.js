var app = app || {};

app.homeViewBag = (function () {
    function showWelcomePage(selector) {
        $.get('templates/welcome-guest.html', function (template) {
            $(selector).html(template);
        });
    }

    function showHomePage(selector, data) {
        $.get('templates/welcome-user.html', function(template) {
            var renderedData = Mustache.render(template, data);
            $(selector).html(renderedData);
        })
    }

    return {
        load: function () {
            return {
                showWelcomePage: showWelcomePage,
                showHomePage: showHomePage
            }
        }
    }
}());