'use strict';

angular
    .module('issueTrackingSystem.projects.singleProjectController', [])
    .controller('SingleProjectCtrl',[
        '$scope',
        '$routeParams',
        'ModalService',
        'identityService',
        'projectService',
        function($scope, $routeParams, ModalService, identityService, projectService) {
            var currentId = $routeParams.id,
                self = this;

            projectService.getProjectById(currentId)
                .then(function (success) {
                    self.project = success;
                    self.projectEdit = success;

                    self.getSelectedLeadId = function getSelectedLeadId(){
                        return self.projectEdit.Lead.Id;
                    };

                    self.projectEdit.Labels = self.projectEdit.Labels
                        .map(function (labelObj) {
                            return labelObj.Name;
                        })
                        .join(', ');
                    self.projectEdit.Priorities = self.projectEdit.Priorities
                        .map(function (priorityObj) {
                            return priorityObj.Name;
                        })
                        .join(', ');
                }, function (error) {
                    console.log(error);
                });


            self.showAddIssue = function() {
                ModalService.showModal({
                    templateUrl: 'app/issues/issue-add.html',
                    controller: 'AddIssueCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                    var usersSelect = document.getElementById('assignee');
                    var fragment = generateUsersOptionsFragment(self.users);
                    usersSelect.appendChild(fragment);
                });
            };
            
            self.isAdmin = identityService.isAdmin;

            self.showEditProject = function() {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-edit.html',
                    controller: 'SingleProjectCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                });
            };

            self.updateProject = function updateProject(project) {
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