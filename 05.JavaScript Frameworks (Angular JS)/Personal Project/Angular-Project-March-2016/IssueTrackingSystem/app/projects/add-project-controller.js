'use strict';

angular
    .module('issueTrackingSystem.projects.addProjectController', [])
    .controller('AddProjectCtrl',[
        '$route',
        'projectService',
        function($route, projectService) {
            var self = this;

            self.addProject = function (project) {
                projectService.addProject(project).then(function (success) {
                    $.notify('You successfully created new project!', 'success');
                    $route.reload();
                }, function (error) {
                    $.notify("Project creation wasn't successful!", 'error');
                })
            };
        }]);
