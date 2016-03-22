var app = app || {};

app.lecturesViewBag = (function () {
    function showMyLectures(selector, data) {
        console.log(data);
        $.get('templates/calendar.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function() {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (template) {
                        var rendered = Mustache.render(template, calEvent),
                            id = calEvent._id;
                        $('#modal-body').html(rendered);

                        $('#editLecture').on('click', function() {
                            Sammy(function() {
                                $('.modal-backdrop').hide();
                                this.trigger('redirectUrl', {url: '#/calendar/edit/' + id});
                            });
                        });
                        $('#deleteLecture').on('click', function() {
                            Sammy(function() {
                                $('.modal-backdrop').hide();
                                this.trigger('redirectUrl', {url: '#/calendar/delete/' + id});
                            });
                        })
                    });
                    $('#events-modal').modal();
                }
            });

        })
    }

    function showAllLectures(selector, data) {
        console.log(data);
        $.get('templates/calendar.html', function (template) {
            var rendered = Mustache.render(template, data);

            $(selector).html(rendered);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function() {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (template) {
                        var rendered = Mustache.render(template, calEvent);

                        $('#modal-body').html(rendered);
                    });
                    $('#events-modal').modal();
                    $('#editLecture').hide();
                    $('#deleteLecture').hide();
                }
            });

        })
    }

    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (template) {
            $(selector).html(template);
            $('#addLecture').on('click', function () {
                var title = escapeHTML($('#title').val()),
                    start = escapeHTML($('#start').val()),
                    end = escapeHTML($('#end').val());

                Sammy(function () {
                    this.trigger('addLecture', {title: title, start: start, end: end});
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                })
            })
        })
    }

    function showEditLecture(selector, data) {
        $.get('templates/edit-lecture.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#editLecture').on('click', function() {
                var title = escapeHTML($('#title').val()),
                    start = escapeHTML($('#start').val()),
                    end = escapeHTML($('#end').val());
                Sammy(function () {
                    this.trigger('editLecture', {title: title, start: start, end: end, _id: data._id});
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                })
            })
        })
    }

    function showDeleteLecture(selector, data) {
        $.get('templates/delete-lecture.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function() {
                var _this = this;
                Sammy(function () {
                    this.trigger('deleteLecture', data.id);
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                })
            })
        })
    }

    //function showDeleteNote(selector, data) {
    //    $.get('templates/deleteNote.html', function (templ) {
    //        var rendered = Mustache.render(templ, data);
    //        $(selector).html(rendered);
    //        $('#deleteNoteButton').on('click', function() {
    //            var id = $(this).parent().attr('data-id');
    //
    //            Sammy(function () {
    //                this.trigger('deleteNote', {_id:id});
    //                this.trigger('redirectUrl', {url: '#/calendar/my/'});
    //            })
    //        })
    //    })
    //}

    return {
        load: function () {
            return {
                showMyLectures: showMyLectures,
                showAllLectures: showAllLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
}());