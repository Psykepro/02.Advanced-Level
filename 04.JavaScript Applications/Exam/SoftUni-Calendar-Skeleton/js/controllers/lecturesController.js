var app = app || {};

app.lecturesController = (function () {
    function LecturesController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    LecturesController.prototype.loadAllLectures = function (selector) {
        var _this = this;

        this.model.getAllLectures()
            .then(function (data) {
                _this.viewBag.showAllLectures(selector, data);
            })
    };


    LecturesController.prototype.loadAddLecture = function (selector) {
        this.viewBag.showAddLecture(selector);
    };

    LecturesController.prototype.addLecture = function (data) {
        var result = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: sessionStorage['username']
        };

        this.model.addLecture(result)
            .then(function (success) {
                app.customNotifier.load('You successfully added new lecture!', 'success').notify();
            }, function(error){
                app.customNotifier.load(error.responseText, 'error').notify();
            });
    };

    LecturesController.prototype.loadMyLectures = function(selector){
        var _this = this;
        this.model.getMyLectures().then(function (data) {
            console.log('success');
            _this.viewBag.showMyLectures(selector, data);
        })

    };

    LecturesController.prototype.loadEditLecture = function (selector, lectureId) {
        var _this = this;
        this.model.getLectureById(lectureId).then(function(data){
            data = data[0];
            _this.viewBag.showEditLecture(selector, {title: data.title, start: data.start, end: data.end, _id: lectureId});
        });
    };

    LecturesController.prototype.loadDeleteLecture = function (selector, lectureId) {
        var _this = this;
        this.model.getLectureById(lectureId).then(function(data){
            data = data[0];
            _this.viewBag.showDeleteLecture(selector, {title: data.title, start: data.start, end: data.end, id: lectureId});
        });
    };

    LecturesController.prototype.editLecture = function (data) {
        data.lecturer = sessionStorage['username'];
        console.log(data);
        this.model.editLecture(data._id, data)
            .then(function (success) {
                app.customNotifier.load('You successfully edited the lecture!', 'success').notify();
            },function(error){
                app.customNotifier.load(error.responseText, 'error').notify();
            });
    };

    LecturesController.prototype.deleteLecture = function (lectureId) {
        this.model.deleteLecture(lectureId)
            .then(function (success) {
                app.customNotifier.load('You successfully deleted the lecture!', 'success').notify();
            },function(error){
                app.customNotifier.load(error.responseText, 'error').notify();
            });
    };


    return {
        load: function (viewBag, model) {
            return new LecturesController(viewBag, model);
        }
    };
}());