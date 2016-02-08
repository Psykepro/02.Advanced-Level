var domModule = (function(){
    var object = {};
    function isElementOrSelector(elementForCheck){
            var indexOfDot = elementForCheck.split('').filter(function (elem) {
                return elem === '.';
            })[0];
            if(indexOfDot){
                if(elementForCheck[0] === '.'){
                    return 'class selector';
                }else{
                    return 'element with class';
                }
            }else{
                var indexOfHash = elementForCheck.split('').filter(function (elem, index) {
                    return elem === '#';
                })[0];
                if(indexOfHash){
                    if(elementForCheck[0] === '#'){
                        return 'id selector';
                    }else{
                        return 'element with id';
                    }
                }else{
                    var indexOfPseudoSelector = elementForCheck.split('').filter(function (elem) {
                        return elem === ':';
                    })[0];
                    if(indexOfPseudoSelector){
                        return 'element with pseudo selector'
                    }else{
                        return 'element';
                    }
                }
            }
    }
    function isElement(o){
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    }

    function getGivenElement(element){
        var typeOfElement = isElementOrSelector(element);
        switch (typeOfElement){
            case 'element': element = document.getElementsByTagName(element.substr(1));
                break;
            case 'element with id':
                element = element.split('#')[1];
                element = document.getElementById(element);
                break;
            case 'id selector':
                element = document.getElementById(element.substr(1));
                break;
            case 'element with class':
                element = element.split('.')[1];
                element = document.getElementsByClassName(element);
                break;
            case 'class selector':
                element = document.getElementsByClassName(element.substr(1));
                break;
        }
        return element;
    }

    function getChildrenByPseudoSelector(parent, elementType, pseudoSelector){
        var child;
        // I add only these 2 pseudo selectors because this is just for the homework
        switch (pseudoSelector){
            case 'first-child':
                child = parent.getElementsByTagName(elementType)[0];
                break;
            case 'last-child':
                //I can't find how to get the last child of given type without jQuery
                child = parent.lastElementChild;
                break;
        }
        return child;
    }

    function getGivenChild(parent, children){
        var typeOfChild = isElementOrSelector(children);
        switch (typeOfChild){
            case 'element':
                children = parent.getElementsByTagName(children);
                break;
            case 'element with id':
                children = parent.getElementById(children);
                break;
            case 'id selector':
                children = parent.getElementById(children.substr(1));
                break;
            case 'element with class':
                children = children.split('.')[1];
                children = parent.getElementsByClassName(children);
                break;
            case 'class selector':
                children = parent.getElementsByClassName(children.substr(1));
                break;
            case 'element with pseudo selector':
                children = children.split(':');
                var elementType = children[0];
                var pseudoSelector = children[1];
                children = getChildrenByPseudoSelector(parent, elementType, pseudoSelector);
                break;
        }
        return children;
    }

    function createElement(element){
        try{
            element = document.createElement(element);
        }catch (e){
            console.log('Invalid element.')
        }
        return element;
    }

    /* The names of the methods begins with '_', because i can't find how to create the property
       without override the Element.appendChild() method. */
    object._appendChild = function (child, element) {
        if(!isElement(element)){
            element = getGivenElement(element);
        }
        if(!isElement(child)){
            child = createElement(child);
        }
        var textNode = document.createTextNode("NEW ELEMENT!");
        child.appendChild(textNode);
        for (var i = 0; i < element.length; i++) {
            element[i].appendChild(child);
        }
    };

    object._removeChild = function (element, child){
        if(!isElement(element)){
            element = getGivenElement(element);
        }

        for (var i = 0; i < element.length; i++) {
            child = getGivenChild(element[i], child);
            if(child.length !== undefined){
                for(var j = 0; j < child.length; j++){
                    element[i].removeChild(child[j]);
                }
            }else{
                element[i].removeChild(child);
            }
        }
    };

    object._addHandler = function(element, eventType, eventHandler){
        if(!isElement(element)){
            element = getGivenElement(element);
        }
        for (var i = 0; i < element.length; i++) {
            element[i].addEventListener(eventType, eventHandler);
        }

    };

    object._retrieveElements = function(selector){
        selector = getGivenElement(selector);
        return selector;
    };
    return object;
})();

var liElement = document.createElement('li');
// Appends a list item to ul.birds-list
domModule._appendChild(liElement,'.birds-list');
// Removes the first li child from the bird list
domModule._removeChild('ul.birds-list','li:first-child');
// Adds a click event to all bird list items
domModule._addHandler("li.birds", 'click', function(){ alert("I'm a bird!") });
// Retrives all elements of class "bird"
var elements = domModule._retrieveElements(".bird");
console.log(elements);




