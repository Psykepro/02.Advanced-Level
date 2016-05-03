'use strict';

angular
    .module('issueTrackingSystem.issues.issueController',[])
    .controller('IssueCtrl',[
        '$routeParams',
        'issueService',
        'projectService',
        'identityService',
        'ModalService',
        function($routeParams, issueService, projectService, identityService, ModalService) {
            var issueId = $routeParams.id,
                self = this;

            issueService
                .getIssueById(issueId)
                .then(function(success){
                    self.currentIssue = success.data;
                    self.isIssueAssignee = identityService.isIssueAssignee;
                    self.editIssue = formatViewEditIssue(self.currentIssue);
                    self.getSelectedAssigneeId = function getSelectedAssigneeId(){
                        return self.editIssue.Assignee.Id;
                    };
                    self.getSelectedPriorityId = function getSelectedPriorityId(){
                        return self.editIssue.Priority.Id;
                    };
                    self.showEditIssue = function() {
                        console.log(self.issueProject);
                        ModalService.showModal({
                            templateUrl: 'app/issues/issue-edit.html',
                            controller: 'IssueCtrl'
                        }).then(function(modal) {
                            modal.element.modal();
                        });
                    };

                    projectService
                        .getProjectById(self.currentIssue.Project.Id)
                        .then(function(success){
                            self.issueProject = success;
                            self.isProjectLeader = identityService.isProjectLeader;
                        }, function(error){
                            console.log(error);
                        });
                }, function(error){
                    $.notify("Can't find this issue!", "error");
                });

            function formatViewEditIssue(issue){
                var editIssue = issue;
                editIssue.Labels = issue.Labels.map(function(labelObj){
                    return labelObj.Name;
                }).join(', ');
                editIssue.DueDate = new Date(issue.DueDate);

                return editIssue;
            }
        }]);

