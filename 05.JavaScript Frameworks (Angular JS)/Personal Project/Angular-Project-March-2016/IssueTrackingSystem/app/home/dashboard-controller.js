'use strict';

angular.module('issueTrackingSystem.dashboard',[
    'issueTrackingSystem.dashboard.issues'
]).controller('DashboardCtrl',[
    '$scope',
    'issues',
    function DashboardController($scope, issues){
        issues.getIssues()
            .then(function(success){
                console.log(success);
                $scope.myIssues = success;
            }, function (error) {
                console.log(error);
            });

}]);