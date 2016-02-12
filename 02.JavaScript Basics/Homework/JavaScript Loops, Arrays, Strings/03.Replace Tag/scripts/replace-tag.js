function getInput() {
    var x = document.getElementById("input").value;
    var input = x.substring(1, x.length - 2);
    var pattern = /(href=[\w\d:\/.]+)/g;
    var link = pattern.exec(input);
    var replacement ='[URL ' + link[0]  + ']';
    input = input.replace(/<a[\s]*href=[\w\d:\/.]+[\s]*>/g,replacement);
    input = input.replace(/<\/a>/g, '[/URL]');
    input = escapeHtml(input);
    jsConsole.writeLine(input);
}


var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}





