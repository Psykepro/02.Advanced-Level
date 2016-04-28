function generateUsersOptionsFragment(users){
    var fragment = document.createDocumentFragment();
    $.each(users, function () {
        $("<option />").val(this.Id).text(this.Username).appendTo(fragment);
    });
    return fragment;
}

function setSelectedOption(selectedOptionValue, selectorOfElement){
    if(selectedOptionValue && selectorOfElement){
        var queryString = selectorOfElement  + ' option[value=' + selectedOptionValue + ']';
        $(queryString)
            .attr('selected','selected');
    }else{
        console.log('Selected option or the select element is undefined!');
    }
}
