'use strict';

angular
    .module('issueTrackingSystem', [
        'ngRoute',
        'simplePagination',
        'angularModalService',
        'issueTrackingSystem.home.homeController',
        'issueTrackingSystem.home.dashboardController',
        'issueTrackingSystem.user.userService',
        'issueTrackingSystem.users.adminService',
        'issueTrackingSystem.users.usersController',
        'issueTrackingSystem.issues.issueService',
        'issueTrackingSystem.issues.issueController',
        'issueTrackingSystem.issues.addIssueController',
        'issueTrackingSystem.components.filters.join',
        'issueTrackingSystem.components.services.labelService',
        'issueTrackingSystem.components.services.identityService',
        'issueTrackingSystem.components.services.authenticationService',
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
            .when('/issues/:id', {
                templateUrl: 'app/issues/issue-page.html',
                controller: 'IssueCtrl'
            });
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
