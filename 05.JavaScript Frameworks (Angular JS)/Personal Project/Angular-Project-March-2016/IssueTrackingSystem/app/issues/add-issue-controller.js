'use strict';

angular
    .module('issueTrackingSystem.issues.addIssueController',[])
    .controller('AddIssueCtrl',[
        '$routeParams',
        '$rootScope',
        'projectService',
        'userService',
        'issueService',
        function($routeParams, $rootScope, projectService, userService, issueService) {
            var projectId = $routeParams.id,
                self = this;


            projectService.getProjectById(projectId)
                .then(function (success) {
                    self.priorities = success.Priorities;
                });

            self.addIssue = function (issue) {
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
                        console.log(success);
                        $rootScope.$broadcast('updateIssuesAndAssignedProjects');
                    },function(error){
                        $.notify("Issue isn't created!",'error');
                    })
            }

        }]);