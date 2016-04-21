'use strict';

angular
    .module('issueTrackingSystem.home.dashboardController',['issueTrackingSystem.dashboard.issuesService'])
    .controller('DashboardCtrl',[
        '$scope',
        'issuesService',
        'projectService',
    function DashboardCtrl($scope, issuesService, projectService) {
        issuesService.getMyIssues()
            .then(function (success) {
                $scope.myIssues = success;
                console.log(success);
            }, function (error) {
                console.log(error);
            });

        projectService.getAllProjects()
            .then(function(success){
                var userId = sessionStorage['userId'];
                var myProjects = success.filter(function(project) {
                    return project.Lead.Id === userId;
                });
                console.log('myProjects');
                console.log(myProjects);
                $scope.myProjects = myProjects;
            }, function (error) {
                console.log(error);
            });
    }]);