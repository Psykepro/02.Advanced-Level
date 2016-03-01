$('#paint').on('click', function(){
    var className = '.' + $('#class').val(),
        color = $('#color').val();
    $(className).css('background', color);
    $('#class').val('');
});
