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
                    self.editIssue = formatEditIssue(self.currentIssue);
                    self.getSelectedAssigneeId = function getSelectedAssigneeId(){
                        return self.editIssue.AssigneeId;
                    };
                    self.getSelectedPriorityId = function getSelectedPriorityId(){
                        return self.editIssue.PriorityId;
                    };
                    self.showEditIssue = function() {
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
                            self.getPriorities = function(){
                                return self.issueProject.Priorities;
                            };
                            self.isProjectLeader = identityService.isProjectLeader;
                        }, function(error){
                            console.log(error);
                        });
                }, function(error){
                    $.notify("Can't find this issue!", "error");
                });

            self.updateIssue = function updateIssue(editedIssue) {
                editedIssue.Labels = editedIssue.Labels
                                        .split(', ')
                                        .map(function (label) {
                                            return {
                                                Name: label
                                            }
                                        });
                issueService
                    .updateIssue(issueId, editedIssue)
                    .then(function(success){
                        $.notify('You successfully edited the issue!', 'success');
                        // TODO : if you can't update controllers property change to use $scope \\
                        self.currentIssue = success.data;
                        self.editIssue = formatEditIssue(self.currentIssue);
                    }, function(error){
                        $.notify("Editing wasn't successful!", "error");
                    })
            };

            function formatEditIssue(issue){
                var editIssue = {};

                editIssue.Title = issue.Title;
                editIssue.Description = issue.Description;
                editIssue.DueDate = new Date(issue.DueDate);
                editIssue.AssigneeId = issue.Assignee.Id;
                editIssue.PriorityId = issue.Priority.Id;
                editIssue.Labels = issue.Labels.map(function(labelObj){
                    return labelObj.Name;
                }).join(', ');

                return editIssue;
            }
        }]);

