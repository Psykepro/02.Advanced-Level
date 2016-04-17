'use strict';

angular
    .module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.users.userService',
        'issueTrackingSystem.components.identityService',
        'issueTrackingSystem.components.authenticationService'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'})
            .when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/user', {
                templateUrl: 'app/user/user.html',
                controller: 'UserCtrl'
            })
            .when('/projects', {
                templateUrl: 'app/projects/projects.html'
            });
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
