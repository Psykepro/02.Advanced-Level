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
                $scope.issuesPagination = Pagination.getNew(5);
                $scope.issuesPagination.numPages = Math.ceil($scope.myIssues.length / $scope.issuesPagination.perPage);
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
                $scope.myProjects = myProjects;
                $scope.projectsPagination = Pagination.getNew(5);
                $scope.projectsPagination.numPages = Math.ceil($scope.myProjects.length / $scope.projectsPagination.perPage);
            }, function (error) {
                console.log(error);
            });
    }]);