'use strict';

angular
    .module('issueTrackingSystem.dashboard',['issueTrackingSystem.dashboard.issuesService'])
    .controller('DashboardCtrl',[
    '$scope',
    'issuesService',
    function DashboardCtrl($scope, issuesService) {
        issuesService.getMyIssues()
            .then(function (success) {
                $scope.myIssues = success;
            }, function (error) {
                console.log(error);
            });

    }]);