'use strict';

angular
    .module('issueTrackingSystem.projects.singleProjectController', [])
    .controller('SingleProjectCtrl',[
        '$scope',
        '$routeParams',
        'ModalService',
        'identityService',
        'projectService',
        'userService',
        function($scope, $routeParams, ModalService, identityService, projectService, userService) {
            var currentId = $routeParams.id;

            projectService.getProjectById(currentId)
                .then(function (success) {
                    $scope.project = success;
                    $scope.projectEdit = success;
                    $scope.projectEdit.Labels = $scope.projectEdit.Labels
                        .map(function (labelObj) {
                            return labelObj.Name;
                        })
                        .join(', ');
                    $scope.projectEdit.Priorities = $scope.projectEdit.Priorities
                        .map(function (priorityObj) {
                            return priorityObj.Name;
                        })
                        .join(', ');
                }, function (error) {
                    console.log(error);
                });

            userService.getAllUsers()
                .then(function (success) {
                    $scope.allUsers = success;
                }, function (error) {
                    console.log(error);
                });

            $scope.showAddIssue = function() {
                ModalService.showModal({
                    templateUrl: 'app/issues/issue-add.html',
                    controller: 'AddIssueCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                    var usersSelect = document.getElementById('assignee');
                    var fragment = generateUsersOptionsFragment($scope.allUsers);
                    usersSelect.appendChild(fragment);
                });
            };

            $scope.isAdmin = identityService.isAdmin;

            $scope.showEditProject = function() {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-edit.html',
                    controller: 'SingleProjectCtrl'
                }).then(function(modal) {
                    modal.element.modal();

                    // Calling my callback function inside, setTimeout(callback, 0); as browsers by default keep all events in a queue,
                    // therefore, when digest loop is running, your callback function will enter the queue and get executed
                    // as soon digest loop is over.
                    setTimeout(function(){
                        var usersSelect = document.getElementById('leadId');
                        var fragment = generateUsersOptionsFragment($scope.allUsers);
                        usersSelect.appendChild(fragment);
                        // TODO: Set the selected value
                        setSelectedOption($scope.projectEdit.Lead.Id, usersSelect.selector);
                    }, 0);
                });
            };

            $scope.updateProject = function updateProject(project) {
                // Formatting the object
                project.Priorities = project.Priorities
                    .split(', ')
                    .map(function (priority) {
                        return {
                            Name: priority
                        }
                    });
                project.Labels = project.Labels
                    .split(', ')
                    .map(function (label) {
                        return {
                            Name: label
                        }
                    });
                project.LeadId = project.Lead.Id;
                delete project.Lead;

                // Updating
                projectService.updateProject(project)
                    .then(function (success) {
                        $.notify('You successfully edited the project!', 'success');
                    }, function (error) {
                        $.notify('You added invalid information!', 'error');
                    });
            }
        }]);