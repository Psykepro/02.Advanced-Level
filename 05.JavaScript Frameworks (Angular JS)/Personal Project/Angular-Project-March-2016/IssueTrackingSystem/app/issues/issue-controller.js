'use strict';

angular
    .module('issueTrackingSystem.issues.issueController',[])
    .controller('IssueCtrl',[
        '$scope',
        '$routeParams',
        'issueService',
        'projectService',
        'identityService',
        'userService',
        'ModalService',
        function($scope, $routeParams, issueService, projectService, identityService, userService, ModalService) {
            var issueId = $routeParams.id;
            userService
                .getAllUsers()
                .then(function(success){
                    $scope.users = success;
                }, function(error){
                    console.log(error);
                });


            $scope.showEditProject = function() {
                ModalService.showModal({
                    templateUrl: 'app/issues/issue-edit.html',
                    controller: 'IssueCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                });
            };

            issueService
                .getIssueById(issueId)
                .then(function(success){
                    $scope.currentIssue = success.data;
                    $scope.isIssueAssignee = identityService.isIssueAssignee;
                    projectService
                        .getProjectById($scope.currentIssue.Project.Id)
                        .then(function(success){
                            $scope.issueProject = success;
                            $scope.isProjectLeader = identityService.isProjectLeader;
                        }, function(error){
                            console.log(error);
                        });
                }, function(error){
                    $.notify("Can't find this issue!", "error");
                });
        }]);

