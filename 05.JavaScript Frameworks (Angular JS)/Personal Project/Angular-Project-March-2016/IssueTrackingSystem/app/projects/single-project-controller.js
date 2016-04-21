'use strict';

angular
    .module('issueTrackingSystem.projects.singleProjectController', [])
    .controller('SingleProjectCtrl',[
        '$scope',
        '$routeParams',
        'identityService',
        'projectService', function($scope, $routeParams, identityService, projectService){
            var currentId = $routeParams.id;
            projectService.getProjectById(currentId)
                .then(function(success){
                    $scope.project = success;
                }, function(error){
                    console.log(error);
                })
    }]);