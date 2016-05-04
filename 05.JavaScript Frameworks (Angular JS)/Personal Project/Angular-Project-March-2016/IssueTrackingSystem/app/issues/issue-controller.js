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
            var issueId = parseInt($routeParams.id);
            var self = this;

            //////////
            // Init //
            //////////
            init();

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

                    }, function(error){
                        $.notify('Some error occurred when tried to change the status!', 'error');
                    })
            };

            self.addComment = function addComment(comment){
                issueService
                    .addIssueComment(issueId, comment)
                    .then(function(success){
                        issueService.updateCommentsByIssueId(issueId);
                        $.notify('You successfully added new comment!', 'success');
                    }, function(error){
                        $.notify("You didn't succeed to add new comment!", 'error');
                    })
            };

            function init(){
                self.isIssueAssignee = identityService.isIssueAssignee;
                self.isProjectLeader = identityService.isProjectLeader;

                ////////////////////////////////////////////////////////
                // Check if need to update the currentIssue reference //
                ////////////////////////////////////////////////////////
                if(!self.currentIssue || self.currentIssue.Id !== issueId){
                    issueService
                        .initCurrentIssueById(issueId)
                        .then(function(success){
                            self.currentIssue = success;
                            if(!issueService.issueProject || issueService.issueProject.Id !== self.currentIssue.Project.Id){
                                projectService
                                    .initCurrentProjectById(self.currentIssue.Project.Id)
                                    .then(function(success){
                                        self.issueProject = success;
                                    }, function(error){
                                        $.notify("Can't find this issue's project!", "error");
                                    });
                            }
                        }, function(error){
                            $.notify("Can't find this issue!", "error");
                        });
                    issueService
                        .initCommentsByIssueId(issueId)
                        .then(function(success){
                            self.issueComments = success;
                        }, function(error){
                            $.notify('Some error occurred when tried to get the comments!', 'error');
                        })
                }
            }
        }]);

