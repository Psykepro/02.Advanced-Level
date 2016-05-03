'use strict';

angular
    .module('issueTrackingSystem', [
        'ngRoute',
        'ngMaterial',
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
        'issueTrackingSystem.issues.editIssueController',
        'issueTrackingSystem.components.filters.join',
        'issueTrackingSystem.components.directives.loadUsersDirective',
        'issueTrackingSystem.components.directives.loadPrioritiesDirective',
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
                controller: 'UsersCtrl',
                controllerAs: 'vm'
            })
            .when('/profile/password', {
                templateUrl: 'app/user/user-change-password.html',
                controller: 'UsersCtrl'
            })
            .when('/projects', {
                templateUrl: 'app/projects/projects.html',
                controller: 'ProjectsCtrl',
                controllerAs: 'vm'
            })
            .when('/projects/:id', {
                templateUrl: 'app/projects/project-page.html',
                controller: 'SingleProjectCtrl',
                controllerAs: 'vm'
            })
            .when('/issues/:id', {
                templateUrl: 'app/issues/issue-page.html',
                controller: 'IssueCtrl',
                controllerAs: 'vm'
            });
    }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
