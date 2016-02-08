function traverse(selector){

    var element;
    if(selector.charAt(0) === '.'){
        element = document.getElementsByClassName(selector.substr(1));
    }else if(selector.charAt(0) === '#'){
        element = document.getElementById(selector.substr(1));
    }

    for(var i = 0; i < element.length; i++){
        if(element[i].nodeType === 1){
            traverseElementChildren(element[i], '');
        }
    }


    function traverseElementChildren (element, spacing) {
        for(var i = 0; i < element.childNodes.length; i++){
            var child = element.childNodes[i];
            if(child.nodeType === 1){
                var attrsAsString = '';
                Array.prototype.slice.call(child.attributes).forEach(function(attr) {
                    attrsAsString += attr.name + '="' + attr.value + '"' + ' ';
                });
                attrsAsString = attrsAsString.trim();
                console.log(spacing + child.nodeName.toLowerCase() + ': ' + attrsAsString);
                traverseElementChildren(child, spacing + '  ');
            }
        }

    }
}

traverse('.birds');