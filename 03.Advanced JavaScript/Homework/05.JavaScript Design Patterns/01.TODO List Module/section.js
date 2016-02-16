var todoListModule = todoListModule || {};

(function(todoListModule) {
    function Section(title){
        this.setTitle(title);
        this._items = [];
        this._currentItemId = 1;
    }

    Section.prototype.getIdForCurrentSection = function(){
        var id = this.getTitle().toLowerCase().replace(/\s+/g, '-');
        return id;
    };

    Section.prototype.setTitle = function(title){
        if(title === '' || title === undefined || title === null){
            throw new Error('Title of the section cannot be empty or null and must be defined.');
        }
        this._title = title;
    };

   Section.prototype.getTitle = function(){
        return this._title;
    };

     function addItem(that) {
         var currentSection = document.getElementById(that.getIdForCurrentSection() + '-wrapper');
         var itemContent = currentSection.querySelector('.input-item-content');
         itemContent = itemContent.value;
         var parent = currentSection.querySelector('ul');
         var newItem = new todoListModule.Item(itemContent);
         newItem.addToDom(parent, that._currentItemId);
         that._currentItemId++;
         that._items.push(newItem);
     }

    Section.prototype.addToDom = function(parent){
        var that = this;
        var sectionWrapper = document.createElement('div');
        sectionWrapper.setAttribute('id', this.getIdForCurrentSection() + '-wrapper');

        var section = document.createElement('section');
        section.setAttribute('id', this.getIdForCurrentSection());

        var headerOfSection = document.createElement('h1');
        headerOfSection.innerHTML = this.getTitle();
        section.appendChild(headerOfSection);

        var listOfItems = document.createElement('ul');
        section.appendChild(listOfItems);
        sectionWrapper.appendChild(section);

        var footer = document.createElement('footer');
        footer.setAttribute('class', 'add-item-wrapper');

        var inputForItemContent = document.createElement('input');
        inputForItemContent.setAttribute('class', 'input-item-content');
        inputForItemContent.setAttribute('type', 'text');
        inputForItemContent.setAttribute('placeholder', 'Add item...');

        var addItemButton = document.createElement('button');
        addItemButton.setAttribute('id', 'add-item-button');
        addItemButton.addEventListener('click', function (){addItem(that)});
        addItemButton.innerHTML = '+';

        footer.appendChild(inputForItemContent);
        footer.appendChild(addItemButton);
        sectionWrapper.appendChild(footer);
        parent.appendChild(sectionWrapper);
    };

    todoListModule.Section = Section;
})(todoListModule);
