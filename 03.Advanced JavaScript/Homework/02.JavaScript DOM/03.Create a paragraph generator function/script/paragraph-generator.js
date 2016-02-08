createParagraph('wrapper', 'Some text');

function createParagraph(id, text){
    var parent = document.getElementById(id);
    var paragraph = document.createElement('p');
    paragraph.innerText = text;
    parent.appendChild(paragraph);
}
