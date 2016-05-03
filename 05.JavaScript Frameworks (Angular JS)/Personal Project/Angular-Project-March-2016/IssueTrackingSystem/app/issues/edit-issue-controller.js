'use strict';

angular
    .module('issueTrackingSystem.issues.editIssueController',[])
    .controller('EditIssueCtrl',[
        '$route',
        '$routeParams',
        'projectService',
        'identityService',
        'issueService',
        function($route, $routeParams, projectService, identityService, issueService) {
            var issueId = $routeParams.id,
                self = this;

            issueService
                .getIssueById(issueId)
                .then(function (success) {
                    self.isIssueAssignee = identityService.isIssueAssignee;
                    self.editIssue = issueService.formatViewEditIssueModel(success.data);
                    projectService
                        .getProjectById(self.editIssue.Project.Id)
                        .then(function (success) {
                            self.issueProject = success;
                            self.isProjectLeader = identityService.isProjectLeader;
                        }, function (error) {
                            console.log(error);
                        });
                }, function (error) {
                    $.notify("Can't find this issue!", "error");
                });


            self.updateIssue = function updateIssue(editedIssue) {
                issueService
                    .updateIssue(issueId, editedIssue)
                    .then(function (success) {
                        $.notify('You successfully edited the issue!', 'success');
                        $route.reload();
                    }, function (error) {
                        $.notify("Editing wasn't successful!", "error");
                    })
            };
        }]);