$(function(){
    const AUTH_TYPE = 'Kinvey ',
        USER_CREDENTIALS = 'f5b34722-3e08-4478-97c2-19cd240baad1.7AsNzuYB3ggQK3XHVsvpOfRJ3PmwG5OA0Be8cpRH3Os=',
        COUNTRIES_URL = 'https://baas.kinvey.com/appdata/kid_WkVZOjXWyb/countries',
        TOWNS_URL = 'https://baas.kinvey.com/appdata/kid_WkVZOjXWyb/towns',
        LOGIN_URL = 'https://baas.kinvey.com/user/kid_WkVZOjXWyb/login',
        APP_KEY = 'kid_WkVZOjXWyb',
        APP_SECRET = '71a869a75d6c45e5a791b91e9f27dbc2';

    function loadCountries(){
        $('#countries-wrapper').empty();
        var header = $('<h1>').text('Countries:');
        $('#countries-wrapper').append(header);
        $.ajax({
            method: 'GET',
            headers: {
                'Authorization' : AUTH_TYPE + USER_CREDENTIALS
            },
            url: COUNTRIES_URL,
            success: function (data) {
                var result,
                    entry,
                    addWrapper,
                    addButton,
                    addInput,
                    div,
                    countryNameWrapper,
                    entryPair,
                    deleteButton,
                    editButton,
                    editTextField,
                    divFragment = document.createDocumentFragment(),
                    wrapperFragment = document.createDocumentFragment(),
                    townsWrapper = $('<div>').attr('id', 'towns-wrapper');

                for (result in data) {
                    entry = data[result];
                    div = $('<div/>');
                    countryNameWrapper = $('<div>').html($('<h2>').text(entry['name'])).attr('id','country-' + entry['_id']);

                    editTextField = $('<input/>');
                    editTextField.attr('id', 'editValue-' + entry['_id']);


                    editButton = $('<button/>');
                    editButton.text('Edit');
                    editButton.attr('id', 'edit-' + entry['_id']);
                    editButton.click(function (event) {
                        var buttonId = event.target.id;
                        editCountry(buttonId.split('-')[1], $('#editValue-' + buttonId.split('-')[1]).val());
                    });

                    deleteButton = $('<button/>');
                    deleteButton.text('Delete');
                    deleteButton.attr('id', 'delete-' + entry['_id']);
                    deleteButton.click(function (event) {
                        deleteCountry(event.target.id.split('-')[1]);
                    });


                    div.html(div.html().replace(/\n/g, '<br/>'));
                    div.attr('id', entry['_id']);
                    deleteButton.appendTo(divFragment);
                    editTextField.appendTo(divFragment);
                    editButton.appendTo(divFragment);
                    countryNameWrapper.click(function () {
                        console.log(this.id);
                        loadTowns(this.id);
                    });
                    div.append(countryNameWrapper);
                    townsWrapper.appendTo(divFragment);
                    div.append(divFragment);
                    div.appendTo(wrapperFragment);


                    addWrapper = $('<div/>').attr('id', 'add-button-wrapper');
                    addInput = $('<input>').attr('id', 'country-name');
                    addButton = $('<button>').attr('id', 'add-country-button').click(addCountry).text('Add Country');
                    addInput.appendTo(addWrapper);
                    addButton.appendTo(addWrapper);

                }
                $('#countries-wrapper').append(wrapperFragment);
                $('#countries-wrapper').append(addWrapper);
            }

    });
    }

    function loadTowns(countryId){
        var countryId = countryId.split('-')[1] || countryId;
        $.ajax({
            method: 'GET',
            headers: {
                'Authorization' : AUTH_TYPE + USER_CREDENTIALS
            },
            url: TOWNS_URL + '/?query={"country._id":"' + countryId + '"}',
            async: false
        }).success(function(data){
            var result,
                entry,
                div,
                container,
                divText,
                entryPair,
                deleteButton,
                editButton,
                editTextField,
                addTownValue,
                addTownButton,
                countryWrapper = $('#country-' + data[0].country._id),
                townsWrapper = $('#towns-wrapper');


            townsWrapper.empty();
            townsWrapper.append($('<h3>').text('Towns:'));
            addTownValue = $('<input/>');
            addTownValue.attr('id', 'townName');
            addTownButton = $('<button>Add Town</button>');
            addTownButton.click(
                function(event) {
                    console.log(event.target.parentNode.id.split('-')[2]);
                    addTown(data[0].country);
                }
            );
            container = $('<div></div>');
            for (result in data) {
                entry = data[result];
                div = $('<div/>');
                divText = '';


                for (entryPair in entry) {
                    if (typeof entry[entryPair] !== 'object') {
                        divText += entryPair + ': ' + entry[entryPair] + '\n';
                    }
                }

                editTextField = $('<input/>');
                editTextField.attr('id', 'editValue-' + entry['_id']);

                editButton = $('<button/>');
                editButton.text('Edit');
                editButton.attr('id', 'edit-' + entry['_id']);
                editButton.click(function (event) {
                    //editTown(event.target.id.split('-')[1], $('#editValue-' + event.target.id.split('-')[1]).val());
                });

                deleteButton = $('<button/>');
                deleteButton.text('Delete');
                deleteButton.attr('id', 'delete-' + entry['_id']);
                deleteButton.click(function (event) {
                    //deleteTown(event.target.id.split('-')[1]);
                });

                div.text(divText);
                div.html(div.html().replace(/\n/g, '<br/>'));
                div.attr('id', entry['_id']);
                deleteButton.appendTo(div);
                editTextField.appendTo(div);
                editButton.appendTo(div);
                container.append(div);
                container.attr('id', 'towns-in-' + countryId);
                container.append(addTownValue);
                container.append(addTownButton);
                townsWrapper.append(countryWrapper);
            }
        })
    }

    function addTown(country){
        var townName = $('#townName');
        $.ajax({
            method: 'POST',
            headers: {
                'Authorization' : AUTH_TYPE + USER_CREDENTIALS
            },
            url: TOWNS_URL,
            data: {
                "name": townName,
                "country": country
            }
        }).success(loadTowns);
    }

    function addCountry() {
        var countryName = $('#country-name').val();
        if(countryName){
            $.ajax({
                method: 'POST',
                headers: {
                    'Authorization' : AUTH_TYPE + USER_CREDENTIALS
                },
                url: COUNTRIES_URL,
                data: {
                    "name": countryName
                }
            }).success(loadCountries);
        }
    }

    function editCountry(countryId, newCountryName) {
        $.ajax({
            method: "PUT",
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', AUTH_TYPE + USER_CREDENTIALS)
            },
            headers: {
                'Authorization' : AUTH_TYPE + USER_CREDENTIALS,
                'Content-Type' : 'application/json'
            },
            data: JSON.stringify({
                "name": newCountryName
            }),
            url: COUNTRIES_URL + '/' + countryId
        }).success(loadCountries);
    }

    function deleteCountry(countryId){
        $.ajax({
            method: "DELETE",
            headers: {
                'Authorization' : AUTH_TYPE + USER_CREDENTIALS
            },
            url: COUNTRIES_URL + '/' + countryId
        }).success(loadCountries);
    }

    loadCountries();
});
