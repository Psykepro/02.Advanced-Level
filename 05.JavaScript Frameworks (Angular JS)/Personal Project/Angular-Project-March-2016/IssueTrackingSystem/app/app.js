'use strict';

angular
    .module('issueTrackingSystem', [
        'ngRoute',
        'simplePagination',
        'issueTrackingSystem.home.homeController',
        'issueTrackingSystem.home.dashboardController',
        'issueTrackingSystem.users.usersController',
        'issueTrackingSystem.users.adminService',
        'issueTrackingSystem.components.services.userService',
        'issueTrackingSystem.components.services.issuesService',
        'issueTrackingSystem.components.services.identityService',
        'issueTrackingSystem.components.services.authenticationService',
        'issueTrackingSystem.components.filters.join',
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
            })
            .when('/projects/:id/edit', {
                templateUrl: 'app/projects/project-edit.html',
                controller: 'SingleProjectCtrl'
            });
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
