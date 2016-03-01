define([], function(){
    function Container(title){
        this.setTitle(title);
        this._sections = [];
        this._isFirstSectionCreated = false;
    }

    Container.prototype.setTitle = function(title){
        if(title === '' || title === undefined || title === null){
            throw new Error('Title of the container cannot be empty or null and must be defined.');
        }
        this._title = title;
    };

    Container.prototype.getTitle = function(){
        return this._title;
    };

    function addSection(that){
        var parent = document.getElementById('sections-wrapper');
        var sectionTitle = document.querySelector('#input-section-title');
        sectionTitle = sectionTitle.value;

        require(['factory'], function(Factory){
            var newSection = Factory.Section(sectionTitle);
            newSection.addToDom(parent);
            console.log(that);
            console.log(that._sections);
            that._sections.push(newSection);
            if(!that._isFirstSectionCreated){
                parent.style.border = '1px solid black';
                that._isFirstSectionCreated = true;
            }
        });


    }

    Container.prototype.addToDom = function(){
        var that = this;
        var body = document.body;
        body.style.margin = '0';
        var wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'wrapper');

        var container = document.createElement('div');
        container.style.textAlign = 'center';
        var header = document.createElement('h1');
        header.setAttribute('id', 'header-of-container');
        header.innerHTML = this.getTitle();
        container.setAttribute('id', 'container-wrapper');
        var sectionsWrapper = document.createElement('div');
        sectionsWrapper.setAttribute('id', 'sections-wrapper');
        var footer = document.createElement('footer');
        footer.setAttribute('id', 'add-button-wrapper');
        var inputForSectionTitle = document.createElement('input');
        inputForSectionTitle.setAttribute('id', 'input-section-title');
        inputForSectionTitle.setAttribute('type', 'text');
        inputForSectionTitle.setAttribute('placeholder', 'Title...');
        var addSectionButton = document.createElement('button');
        addSectionButton.setAttribute('id', 'add-section-button');
        addSectionButton.addEventListener('click', function(){addSection(that)});
        addSectionButton.innerHTML = 'New Section';

        footer.appendChild(inputForSectionTitle);
        footer.appendChild(addSectionButton);
        container.appendChild(header);
        container.appendChild(sectionsWrapper);
        container.appendChild(footer);
        wrapper.appendChild(container);
        document.body.appendChild(wrapper);

    };

    return Container;
});
