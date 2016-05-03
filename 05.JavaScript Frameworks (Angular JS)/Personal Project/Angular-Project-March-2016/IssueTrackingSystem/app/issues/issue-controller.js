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
                    self.editIssue = issueService.formatViewEditIssueModel(self.currentIssue);
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
                            self.isProjectLeader = identityService.isProjectLeader;
                        }, function(error){
                            console.log(error);
                        });
                }, function(error){
                    $.notify("Can't find this issue!", "error");
                });

            self.updateIssue = function updateIssue(editedIssue) {
                editedIssue = issueService.formatBindingEditIssueModel(editedIssue);

                issueService
                    .updateIssue(issueId, editedIssue)
                    .then(function(success){
                        $.notify('You successfully edited the issue!', 'success');
                        // TODO : if you can't update controllers property change to use $scope \\
                        self.currentIssue.Title = success.data.Title;
                        //self.editIssue = formatEditIssue(self.currentIssue);
                    }, function(error){
                        $.notify("Editing wasn't successful!", "error");
                    })
            };
        }]);

