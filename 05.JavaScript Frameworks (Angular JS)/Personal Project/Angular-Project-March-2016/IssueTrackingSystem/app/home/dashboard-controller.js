'use strict';

angular
    .module('issueTrackingSystem.dashboard',['issueTrackingSystem.dashboard.issuesService'])
    .controller('DashboardCtrl',[
        '$scope',
        'issuesService',
        'projectService',
    function DashboardCtrl($scope, issuesService, projectService) {
        issuesService.getMyIssues()
            .then(function (success) {
                $scope.myIssues = success;
            }, function (error) {
                console.log(error);
            });

        var userId = sessionStorage['userId'];
        projectService.getAllProjects()
            .then(function(success){
                console.log(success);
            }, function(error){
                console.log(error);
            });

    }]);