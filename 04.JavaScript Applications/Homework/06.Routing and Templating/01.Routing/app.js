var routing = Sammy(function(){
    this.get('#/:name', function(){
        var name = this.params["name"];
        $('#wrapper').empty().append($('<h2>').text('Hello, '+name));
    })
});

routing.run('/');