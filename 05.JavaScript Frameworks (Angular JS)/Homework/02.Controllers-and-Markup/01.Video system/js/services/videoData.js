app.factory('videoData',function videoData(){
    var videos = [{
        title: 'Culture Shock - Troglodyte (Original Mix)',
        pictureUrl: 'https://i.ytimg.com/vi/6cDsF9hXD5k/maxresdefault.jpg',
        length: '5.16',
        category: 'Music',
        subscribers: 409,
        date: new Date(2012, 6, 19),
        haveSubtitles: false,
        comments:[
            {
                username: 'Kolio Kolev',
                content: 'Damn nice drop',
                date: new Date(2014, 12, 15, 12, 30, 0),
                likes: 3,
                websiteUrl: 'http://Kolio.com/'
            }

        ]
    },{
        title: 'Course introduction',
        pictureUrl: 'http://newtrend.bg/wp-content/uploads/2015/03/SoftUni-Logo.png',
        length: '3:32',
        category: 'IT',
        subscribers: 3,
        date: new Date(2014, 12, 15),
        haveSubtitles: false,
        comments: [
            {
                username: 'Pesho Peshev',
                content: 'Congratulations Nakov',
                date: new Date(2014, 12, 15, 12, 30, 0),
                likes: 3,
                websiteUrl: 'http://pesho.com/'
            }
        ]
    }];

    return {
        getVideos: function () {
            return videos;
        },
        addVideo: function (video) {
            videos.push(video);
        },
        getCategories: function(){
            var categories = [];
            videos.forEach(function (video) {
                categories.push(video.category);
            });

            return categories;
        },
        getDates: function () {
            var dates = [];
            videos.forEach(function (video) {
                dates.push(video.date);
            });

            return dates;
        }
    }
});