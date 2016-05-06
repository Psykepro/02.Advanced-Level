'use strict';

angular
    .module('issueTrackingSystem.projects.addProjectController', [])
    .controller('AddProjectCtrl',[
        '$rootScope',
        'identityService',
        'projectService',
        function AddProjectCtrl($rootScope, identityService, projectService) {
            var self = this;

            self.addProject = function (project) {
                projectService
                    .addProjectRequest(project)
                    .then(function (success) {
                        $.notify('You successfully created new project!', 'success');
                        projectService.updateProjects();
                        if(identityService.isProjectLeader(success.data)){
                            projectService.updateMyProjects();
                        }
                    }, function (error) {
                        $.notify("Project creation wasn't successful!", 'error');
                    })
            };
        }]);
