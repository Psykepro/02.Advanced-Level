'use strict';

angular
    .module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.users',
        'issueTrackingSystem.users.adminService',
        'issueTrackingSystem.components.userService',
        'issueTrackingSystem.components.identityService',
        'issueTrackingSystem.components.authenticationService',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.projects.projectService'
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
            .when('/profile/password', {
                templateUrl: 'app/user/user-change-password.html',
                controller: 'UsersCtrl'
            })
            .when('/projects/add', {
                templateUrl: 'app/projects/project-add.html',
                controller: 'ProjectCtrl'
            })
            .when('/projects', {
                templateUrl: 'app/projects/projects.html',
                controller: 'ProjectCtrl'
            })
            .when('/projects/:id', {
                templateUrl: 'app/projects/project-page.html',
                controller: 'ProjectCtrl'
            });
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
