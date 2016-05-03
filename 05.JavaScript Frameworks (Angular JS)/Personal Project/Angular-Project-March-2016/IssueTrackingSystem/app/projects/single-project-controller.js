'use strict';

angular
    .module('issueTrackingSystem.projects.singleProjectController', [])
    .controller('SingleProjectCtrl',[
        '$routeParams',
        'ModalService',
        'identityService',
        'projectService',
        function($routeParams, ModalService, identityService, projectService) {
            var currentId = $routeParams.id,
                self = this;

            projectService.getProjectById(currentId)
                .then(function (success) {
                    self.currentProject = success;
                    self.editProject = projectService.formatViewEditProjectModel(success);
                }, function (error) {
                    console.log(error);
                });


            self.showAddIssue = function() {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-add.html',
                    controller: 'AddIssueCtrl'
                }).then(function(modal) {
                    modal.element.modal();
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
                project = projectService.formatBindingEditProjectModel(project);
                // Updating
                projectService
                    .updateProject(currentId, project)
                    .then(function (success) {
                        $.notify('You successfully edited the project!', 'success');
                        self.currentProject.Name = success.data.Name;
                    }, function (error) {
                        $.notify('You added invalid information!', 'error');
                    });
     
            };
        }]);