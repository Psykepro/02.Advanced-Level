'use strict';

angular
    .module('issueTrackingSystem.home.dashboardController',[])
    .controller('DashboardCtrl',[
        '$scope',
        'issueService',
        'projectService',
        'Pagination',
        function DashboardCtrl($scope, issueService, projectService, Pagination) {
            issueService.getMyIssues(100)
                .then(function (success) {
                    $scope.myIssues = success;
                    $scope.assignedProjects = projectService.extractAssignedProjectsFromIssues($scope.myIssues);
                    $scope.assignedProjectsPagination = Pagination.getNew(5);
                    $scope.assignedProjectsPagination.numPages = Math.ceil($scope.assignedProjects.length / $scope.assignedProjectsPagination.perPage);
                    $scope.issuesPagination = Pagination.getNew(5);
                    $scope.issuesPagination.numPages = Math.ceil($scope.myIssues.length / $scope.issuesPagination.perPage);
                }, function (error) {
                    console.log(error);
                });

            projectService.getAllProjects()
                .then(function (success) {
                    var userId = sessionStorage['userId'];
                    var myProjects = success.filter(function (project) {
                        return project.Lead.Id === userId;
                    });
                    $scope.myProjects = myProjects;
                    $scope.projectsPagination = Pagination.getNew(5);
                    $scope.projectsPagination.numPages = Math.ceil($scope.myProjects.length / $scope.projectsPagination.perPage);
                }, function (error) {
                    console.log(error);
                });
        }]);