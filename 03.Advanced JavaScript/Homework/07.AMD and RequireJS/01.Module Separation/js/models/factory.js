define(['item', 'section', 'container'], function(Item, Section, Container){
    return {
        Item : function(content){
            return new Item(content);
        },
        Section : function(title){
            return new Section(title);
        },
        Container : function(title){
            return new Container(title);
        }
    }
});
