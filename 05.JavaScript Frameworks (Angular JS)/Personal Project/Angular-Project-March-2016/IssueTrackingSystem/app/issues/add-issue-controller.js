'use strict';

angular
    .module('issueTrackingSystem.issues.addIssueController',[])
    .controller('AddIssueCtrl',[
        '$scope',
        '$routeParams',
        '$rootScope',
        'projectService',
        'userService',
        'issueService',
        function($scope, $routeParams, $rootScope, projectService, userService, issueService) {
            var projectId = $routeParams.id;

            userService.getAllUsers()
                .then(function (success) {
                    $scope.users = success;
                }, function (error) {

                });

            projectService.getProjectById(projectId)
                .then(function (success) {
                    $scope.priorities = success.Priorities;
                });

            $scope.addIssue = function (issue) {
                issue.Labels = issue.Labels
                    .split(', ')
                    .map(function (issue) {
                        return {
                            Name: issue
                        }
                    });
                issue.ProjectId = parseInt(projectId);
                issue.PriorityId = parseInt(issue.PriorityId);

                issueService
                    .addIssue(issue)
                    .then(function(success){
                        $.notify('You successfully added new issue!','success');
                        $rootScope.$broadcast('updateIssuesAndAssignedProjects');
                    },function(error){
                        $.notify("Issue isn't created!",'error');
                    })
            }

        }]);