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
            var issueId = $routeParams.id,
                fragment;

            userService
                .getAllUsers()
                .then(function(success) {
                    $scope.users = success;
                    fragment = generateUsersOptionsFragment($scope.users);
                }, function(error){
                    console.log(error);
                });

            issueService
                .getIssueById(issueId)
                .then(function(success){
                    $scope.isIssueAssignee = identityService.isIssueAssignee;
                    $scope.currentIssue = success.data;

                    $scope.showEditProject = function() {
                        ModalService.showModal({
                            templateUrl: 'app/issues/issue-edit.html',
                            controller: 'IssueCtrl'
                        }).then(function(modal) {
                            modal.element.modal();
                            $scope.editIssue = formatViewEditIssue($scope.currentIssue);
                            var usersSelect = $('#users-issue-edit');
                            if(usersSelect){
                                usersSelect.append(fragment);
                                setSelectedOption($scope.editIssue.Assignee.Id, usersSelect.selector);
                                console.log(usersSelect);
                                console.log(usersSelect.val());
                                console.log(usersSelect[0].options[usersSelect[0].selectedIndex].innerHTML);
                            }
                        });
                    };

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

            function formatViewEditIssue(issue){
                var editIssue = issue;
                editIssue.Labels = issue.Labels.map(function(labelObj){
                    return labelObj.Name;
                }).join(', ');
                editIssue.DueDate = new Date(issue.DueDate);

                return editIssue;
            }
        }]);

