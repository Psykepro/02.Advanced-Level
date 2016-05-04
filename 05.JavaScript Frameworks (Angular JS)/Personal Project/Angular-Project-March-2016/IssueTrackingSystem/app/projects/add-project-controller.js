'use strict';

angular
    .module('issueTrackingSystem.projects.addProjectController', [])
    .controller('AddProjectCtrl',[
        'projectService',
        function AddProjectCtrl(projectService) {
            var self = this;

            self.addProject = function (project) {
                projectService
                    .addProject(project)
                    .then(function (success) {
                        $.notify('You successfully created new project!', 'success');
                    }, function (error) {
                        $.notify("Project creation wasn't successful!", 'error');
                    })
            };
        }]);
