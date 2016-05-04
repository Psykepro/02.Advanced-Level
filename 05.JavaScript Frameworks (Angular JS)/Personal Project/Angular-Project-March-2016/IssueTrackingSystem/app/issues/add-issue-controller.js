'use strict';

angular
    .module('issueTrackingSystem.issues.addIssueController',[])
    .controller('AddIssueCtrl',[
        '$routeParams',
        'projectService',
        'userService',
        'issueService',
        function($routeParams, projectService, userService, issueService) {
            var projectId = $routeParams.id,
                self = this;

            projectService
                .getProjectById(projectId)
                .then(function (success) {
                    self.priorities = success.Priorities;
                });

            self.addIssue = function (issue) {
                issue = issueService.formatBindingIssueModel(issue, projectId);

                issueService
                    .addIssue(issue)
                    .then(function(success){
                        $.notify('You successfully added new issue!','success');
                        issueService.updateMyIssues();
                        projectService.updateAssignedProjects();
                    },function(error){
                        $.notify("Issue isn't created!",'error');
                    })
            }

        }]);