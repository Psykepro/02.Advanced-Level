var HTMLGen = {

    createParagraph : function (id, text){
        var parent = document.getElementById(id);
        var paragraph = document.createElement('p');
        paragraph.innerText = text;
        parent.appendChild(paragraph);
    },
    createDiv : function (id, divClassName){
        var parent = document.getElementById(id);
        var div = document.createElement('div');
        div.className = divClassName;
        parent.appendChild(div);
    },
    createLink : function (id, text, url){
        var parent = document.getElementById(id);
        var link = document.createElement('a');
        link.href = url;
        link.innerText = text;
        parent.appendChild(link);
    }
};

HTMLGen.createParagraph('wrapper', 'Soft Uni');
HTMLGen.createDiv('wrapper', 'section');
HTMLGen.createLink('book', 'C# basics book', 'http://www.introprogramming.info/');
