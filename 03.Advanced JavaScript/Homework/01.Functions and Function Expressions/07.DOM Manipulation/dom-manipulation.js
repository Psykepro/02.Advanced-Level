var domModule = function () {
    function appendChild(element, child) {
        this.parent = retrieveElements(child);
        this.child = createElement(element);
        if (this.parent !== null) {
            for (var i = 0; i < this.parent.length; i++) {
                this.parent[i].appendChild(this.child);
            }
        }
    }

    function removeChild(element, selector) {
        this.parent = retrieveElements(element);
        if (this.parent !== null) {
            for (var i = 0; i < this.parent.length; i++) {
                this.children = getChildren(this.parent[i], selector);
                for (var j = 0; j < this.children.length; j++) {
                    this.parent[i].removeChild(this.children[j]);
                }
            }
        }
    }

    function addHandler(element, eventType, eventHandler) {
        this.parent = retrieveElements(element);
        if (this.parent !== null) {
            for (var i = 0; i < this.parent.length; i++) {
                this.parent[i].addEventListener(eventType, eventHandler);
            }
        }
    }

    function retrieveElements(element) {
        if (element.nodeType !== document.ELEMENT_NODE) {
            return document.querySelectorAll(element);
        }

        return element;
    }

    function createElement(element) {
        if (element.nodeType !== document.ELEMENT_NODE) {
            return document.createElement(element);
        }

        return element;
    }

    function getChildren(element, selector) {
        return element.querySelectorAll(":scope > " + selector);
    }

    return {
        appendChild : appendChild,
        removeChild : removeChild,
        addHandler : addHandler,
        retrieveElements : retrieveElements
    };
}();

var liElement = document.createElement("li");
liElement.innerHTML = "My new bird";

// Appends a list item to ul.birds-list
domModule.appendChild(liElement,".birds-list");

// Removes the first li child from the bird list
domModule.removeChild("ul.birds-list","li:first-child");

// Adds a click event to all bird list items
domModule.addHandler("li.bird", 'click', function(){ alert("I'm a bird!") });

// Retrives all elements of class "bird"
var elements = domModule.retrieveElements(".bird");
console.log(elements);




