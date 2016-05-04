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
        'issueTrackingSystem.common.filters.join',
        'issueTrackingSystem.common.directives.loadUsersDirective',
        'issueTrackingSystem.common.directives.loadPrioritiesDirective',
        'issueTrackingSystem.common.services.labelService',
        'issueTrackingSystem.common.services.identityService',
        'issueTrackingSystem.common.services.authenticationService',
        'issueTrackingSystem.projects.allProjectsController',
        'issueTrackingSystem.projects.projectController',
        'issueTrackingSystem.projects.editProjectController',
        'issueTrackingSystem.projects.addProjectController',
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
                controller: 'UsersCtrl',
                controllerAs: 'vm'
            })
            .when('/projects', {
                templateUrl: 'app/projects/projects.html',
                controller: 'AllProjectsCtrl',
                controllerAs: 'vm'
            })
            .when('/projects/:id', {
                templateUrl: 'app/projects/project-page.html',
                controller: 'ProjectCtrl',
                controllerAs: 'vm'
            })
            .when('/issues/:id', {
                templateUrl: 'app/issues/issue-page.html',
                controller: 'IssueCtrl',
                controllerAs: 'vm'
            });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
