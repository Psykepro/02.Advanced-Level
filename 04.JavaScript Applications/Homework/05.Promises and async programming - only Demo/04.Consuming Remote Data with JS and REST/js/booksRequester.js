$(function(){
    var authToken,
        APP_KEY = 'kid_bkLG5HdQJZ',
        APP_SECRET = '78fdba1f9e6841b18f03ba731407cdd4',
        BASE_URL = 'https://baas.kinvey.com',
        BOOKS_URL ='https://baas.kinvey.com/appdata/kid_bkLG5HdQJZ/books',
        AUTH_TYPE = 'Kinvey ';

    // Getting the auth token
    $.ajax({
        method : 'POST',
        headers: {
            'Authorization' : 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET),
            'Content-Type' : 'application/json'
        },
        url: BASE_URL + '/user/' + APP_KEY + '/login',
        data: JSON.stringify({
            "username": 'koleca',
            "password": '1234'
        }),
        async: false
    }).success(function(data){
        authToken = data._kmd.authtoken;
    });

    // List All Books
    function listAllBooks(){
        var currentBookWrapper,
            ulFragment = document.createDocumentFragment(),
            divFragment = document.createDocumentFragment(),
            booksWrapper = $('#books-wrapper'),
            addButton = $('<button>'),
            titleInput = $('<input>'),
            authorInput = $('<input>'),
            isbnInput = $('<input>'),
            titleLabel = $('<label>'),
            authorLabel = $('<label>'),
            isbnLabel = $('<label>'),
            tagsLabel = $('<label>'),
            tagsInput = $('<input>');

        booksWrapper.empty();
        booksWrapper.append($('<h2>').text('Books:'));
        $.ajax({
            method: 'GET',
            headers: {
                'Authorization' : AUTH_TYPE + authToken
            },
            url: BOOKS_URL,
            async: false,
            success: function(data){
                data.forEach(function (book) {
                    currentBookWrapper = $('<ul>').attr('id', 'book-' + book._id);

                    $('<li>').text('Title: ' + book.title).appendTo(ulFragment);
                    $('<li>').text('Author: ' + book.author).appendTo(ulFragment);
                    $('<li>').text('ISBN: ' + book.isbn).appendTo(ulFragment);
                    $('<li>').text('Tags: ' + book.tags.join(', ')).appendTo(ulFragment);
                    $('<button>').text('Edit').attr('id', 'edit-' + book._id).click(editBook).appendTo(ulFragment);
                    $('<button>').text('Delete').attr('id', 'delete-' + book._id).click(deleteBook).appendTo(ulFragment);
                    $('<div>').attr('id', 'edit-wrapper-' + book._id).appendTo(ulFragment);

                    currentBookWrapper.append(ulFragment);
                    currentBookWrapper.appendTo(divFragment);
                });
                booksWrapper.append(divFragment);

                divFragment = document.createDocumentFragment();
                titleLabel.attr('for', 'title-input').text('Title: ').appendTo(divFragment);
                titleInput.attr('id', 'title-input').appendTo(divFragment);
                authorLabel.attr('for', 'author-input').text('Author: ').appendTo(divFragment);
                authorInput.attr('id', 'author-input').appendTo(divFragment);
                isbnLabel.attr('for', 'isbn-input').text('ISBN: ').appendTo(divFragment);
                isbnInput.attr('id', 'isbn-input').appendTo(divFragment);
                tagsLabel.attr('for', 'tags-input').text('Tags: ').appendTo(divFragment);
                tagsInput.attr({ id: 'tags-input', placeholder: 'tag1, tag2, ...'}).appendTo(divFragment);
                addButton.text('Add book').click(addBook).appendTo(divFragment);

                booksWrapper.append(divFragment);
            }
        })
    }

    listAllBooks();

    function deleteBook(event){
        var bookId = event.target.id.split('-')[1];

        $.ajax({
            method: 'DELETE',
            headers: {
                'Authorization' : AUTH_TYPE + authToken
            },
            url: BOOKS_URL + '/' + bookId,
            async: true,
            success: function(){
                $.notify('Book successfully deleted!', 'success');
                listAllBooks();
            },
            error: function(){
                $.notify("Error book isn't deleted!", 'error');
            }
        })

    }

    function editBook(event){
        var bookId = event.target.id.split('-')[1],
            editWrapper = $('#edit-wrapper-' + bookId),
            titleInput = $('<input>'),
            authorInput = $('<input>'),
            isbnInput = $('<input>'),
            submitButton = $('<button>'),
            tagsInput = $('<input>');

        editWrapper.empty();

        $.ajax({
            method: 'GET',
            headers: {
                'Authorization' : AUTH_TYPE + authToken
            },
            url: BOOKS_URL + '/?query={"_id":"' + bookId + '"}',
            async: false,
            success: function(data){
                var bookObject = data[0],
                    title = bookObject.title,
                    author = bookObject.author,
                    isbn = bookObject.isbn,
                    tags = bookObject.tags;

                titleInput.attr('id', 'title-' + bookId)
                    .val(title)
                    .appendTo(editWrapper);
                authorInput.attr('id', 'author-' + bookId)
                    .val(author)
                    .appendTo(editWrapper);
                isbnInput.attr('id', 'isbn-' + bookId)
                    .val(isbn)
                    .appendTo(editWrapper);
                tagsInput.attr('id', 'tags-' + bookId)
                    .val(tags.join(', '))
                    .appendTo(editWrapper);

                submitButton.text('Submit')
                    .click(function(){ submitEdit(bookId, titleInput, authorInput, isbnInput, tagsInput);})
                    .appendTo(editWrapper);

            }
        })

    }

    function submitEdit(idOfBook, titleInput, authorInput, isbnInput, tagsInput){
        var title = titleInput.val(),
            author = authorInput.val(),
            isbn = isbnInput.val(),
            tags = tagsInput.val();

        $.ajax({
            method: 'PUT',
            headers: {
                'Authorization' : AUTH_TYPE + authToken,
                'Content-Type' : 'application/json'
            },
            url: BOOKS_URL + '/' + idOfBook,
            data: JSON.stringify({
                "title": title,
                "author": author,
                "isbn": isbn,
                "tags": tags
            }),
            async: true,
            success: function(){
                $.notify('Book successfully edited!', 'success');
                listAllBooks();
            },
            error: function(){
                $.notify("Error book isn't edited!", 'error');
                titleInput.val(title);
                authorInput.val(author);
                isbnInput.val(isbn);
            }
        })
    }

    function addBook() {
        var title,
            author,
            isbn,
            tempArr,
            tags = [],
            titleInput = $('#title-input'),
            authorInput = $('#author-input'),
            isbnInput = $('#isbn-input'),
            tagsInput = $('#tags-input');

        title = titleInput.val();
        titleInput.val('');
        author = authorInput.val();
        authorInput.val('');
        isbn = isbnInput.val();
        isbnInput.val('');
        tempArr = tagsInput.val().split(', ');
        tagsInput.val('');
        if(tempArr){
            tempArr.forEach(function(tag){
                tags.push(tag);
            });
        }

        $.ajax({
            method: 'POST',
            headers: {
                'Authorization': AUTH_TYPE + authToken,
                'Content-Type': 'application/json'
            },
            url: BOOKS_URL,
            data: JSON.stringify({
                "title": title,
                "author": author,
                "isbn": isbn,
                "tags": tags
            }),
            async: true,
            success: function () {
                $.notify('Book successfully added!', 'success');
                listAllBooks();
            },
            error: function () {
                $.notify("Error book isn't added!", 'error');
            }
        })
    }

});