'use strict';

angular
    .module('issueTrackingSystem.home.dashboardController',[])
    .controller('DashboardCtrl',[
        '$scope',
        'issuesService',
        'projectService',
        'Pagination',
    function DashboardCtrl($scope, issuesService, projectService, Pagination) {
        issuesService.getMyIssues()
            .then(function (success) {
                $scope.myIssues = success;
                $scope.pagination = Pagination.getNew(5);
                $scope.pagination.numPages = Math.ceil($scope.myIssues.length / $scope.pagination.perPage);
                console.log(success);
            }, function (error) {
                console.log(error);
            });

        projectService.getAllProjects()
            .then(function(success){
                var userId = sessionStorage['userId'];
                console.log(userId);
                var myProjects = success.filter(function(project) {
                    return project.Lead.Id === userId;
                });
                $scope.myProjects = myProjects;
            }, function (error) {
                console.log(error);
            });
    }]);