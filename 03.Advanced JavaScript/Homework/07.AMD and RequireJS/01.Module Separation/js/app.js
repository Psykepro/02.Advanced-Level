require.config({
    paths: {
        'item' : 'models/item',
        'section' : 'models/section',
        'container' : 'models/container',
        'factory' : 'models/factory'
    }
});

require(['factory'], function(Factory){
   var container = Factory.Container('TODO List Module');
    container.addToDom();
});