'use strict';

angular
    .module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.users',
        'issueTrackingSystem.users.userService',
        'issueTrackingSystem.users.adminService',
        'issueTrackingSystem.components.identityService',
        'issueTrackingSystem.components.authenticationService'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'})
            .when('/', {
                templateUrl: 'app/home/home.html'
            })
            .when('/users', {
                templateUrl: 'app/user/users.html',
                controller: 'UsersCtrl'
            })
            .when('/projects', {
                templateUrl: 'app/projects/projects.html'
            });
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
