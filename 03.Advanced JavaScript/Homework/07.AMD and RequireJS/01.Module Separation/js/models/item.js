define(['factory'], function(){

    const DEFAULT_COMPLETED_VALUE = false;
    function Item(content){
        setContent(content);
        setIsCompleted(DEFAULT_COMPLETED_VALUE);
    }

    function setIsCompleted(isCompleted){
        if(typeof(isCompleted) !== "boolean"){
            throw new Error('The status must be boolean.');
        }
        this._isCompleted = isCompleted;
    }

    function setContent(content){
        if(content === '' || content === undefined || content === null){
            throw new Error('Content of the item cannot be empty or null and must be defined.');
        }
        this._content = content;
    }

    function getIsCompleted(){
        return this._isCompleted;
    }
    function getContent(){
        return this._content;
    }

    function onItemChange(){
        setIsCompleted(!getIsCompleted());
        var sender = (this && this.target) || (window.event && window.event.srcElement);
        var paragraphToChange = sender.parentNode;
        paragraphToChange = paragraphToChange.getElementsByTagName('p')[0];
        if(getIsCompleted() === false){
            paragraphToChange.style.backgroundColor = '#FFF';
        }else{
            paragraphToChange.style.backgroundColor = '#90EE90';
        }
    }

    Item.prototype.addToDom = function(parent, id){
        id = 'item-' + id;
        var listElement = document.createElement('li');
        listElement.setAttribute('class', 'item-wrapper');
        var checkboxAsElement = document.createElement('input');
        checkboxAsElement.setAttribute('type', 'checkbox');
        checkboxAsElement.setAttribute('id', id);
        checkboxAsElement.addEventListener('change', onItemChange);
        var paragraphAsElement = document.createElement('p');
        paragraphAsElement.innerHTML = getContent();
        listElement.appendChild(checkboxAsElement);
        listElement.appendChild(paragraphAsElement);
        parent.appendChild(listElement);
    };

    return Item;
});