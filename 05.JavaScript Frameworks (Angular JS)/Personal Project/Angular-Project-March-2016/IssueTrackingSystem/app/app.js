'use strict';

angular
    .module('issueTrackingSystem', [
        'ngRoute',
        'simplePagination',
        'issueTrackingSystem.home.homeController',
        'issueTrackingSystem.home.dashboardController',
        'issueTrackingSystem.users.usersController',
        'issueTrackingSystem.users.adminService',
        'issueTrackingSystem.components.userService',
        'issueTrackingSystem.components.issuesService',
        'issueTrackingSystem.components.identityService',
        'issueTrackingSystem.components.authenticationService',
        'issueTrackingSystem.projects.projectsController',
        'issueTrackingSystem.projects.singleProjectController',
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
                controller: 'ProjectsCtrl'
            })
            .when('/projects', {
                templateUrl: 'app/projects/projects.html',
                controller: 'ProjectsCtrl'
            })
            .when('/projects/:id', {
                templateUrl: 'app/projects/project-page.html',
                controller: 'SingleProjectCtrl'
            });
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
