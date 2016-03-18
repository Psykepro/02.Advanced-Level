$.get('template/tableTemplate.html',function(htmlBeforeRender){
    var data = {
        "persons" : [
            {name:"Garry Finch",jobTitle:"Front end technical lead",webSite:"wwww,dsadsa,sadasdasd"},
            {name:"Bate Pesho",jobTitle:".NET Developer",webSite:"wwww.batPesho.com"},
            {name:"Jichka Minkova",jobTitle:"Java Developer",webSite:"www.minka.com"}
        ]
    };
    var renderedHtml = Mustache.to_html(htmlBeforeRender, data);
    $('#wrapper').html(renderedHtml);
});
