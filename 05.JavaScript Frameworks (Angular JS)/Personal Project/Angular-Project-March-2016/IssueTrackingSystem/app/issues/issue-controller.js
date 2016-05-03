'use strict';

angular
    .module('issueTrackingSystem.issues.issueController',[])
    .controller('IssueCtrl',[
        '$scope',
        '$routeParams',
        '$route',
        'issueService',
        'projectService',
        'identityService',
        'ModalService',
        function($scope, $routeParams, $route, issueService, projectService, identityService, ModalService) {
            var issueId = $routeParams.id,
                self = this;

            issueService
                .getIssueById(issueId)
                .then(function(success){
                    self.currentIssue = success.data;
                    self.isIssueAssignee = identityService.isIssueAssignee;
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

            issueService
                .getIssueComments(issueId)
                .then(function(success){
                    self.comments = success.data;
                }, function(error){
                    console.log(error);
                });

            self.showEditIssue = function() {
                ModalService.showModal({
                    templateUrl: 'app/issues/issue-edit.html',
                    controller: 'EditIssueCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                });
            };

            self.changeStatus = function changeStatus(statusId){
                issueService
                    .updateIssueStatus(issueId ,statusId)
                    .then(function(success){
                        $route.reload();
                    }, function(error){
                        $.notify('Some error occured when tried to change the status!', 'error');
                    })
            };

            self.addComment = function addComment(comment){
                issueService
                    .addIssueComment(issueId, comment)
                    .then(function(success){
                        console.log(success);
                    }, function(error){
                        console.log(error);
                    })
            };
        }]);

