'use strict';

angular
    .module('issueTrackingSystem.projects.projectsController', [])
    .controller('ProjectsCtrl',[
        '$route',
        'userService',
        'projectService',
        'Pagination',
        function($route, userService, projectService, Pagination) {
            var self = this;

            self.addProject = function (project) {
                projectService.addProject(project).then(function (success) {
                    $.notify('You successfully created new project!', 'success');
                    $route.reload();
                }, function (error) {
                    $.notify("Project creation wasn't successful!", 'error');
                })
            };

            projectService.getAllProjects()
                .then(function (success) {
                    self.allProjects = success;
                    self.projectsPagination = Pagination.getNew(8);
                    self.projectsPagination.numPages = Math.ceil(self.allProjects.length / self.projectsPagination.perPage);
                }, function (error) {
                    console.log(error);
                });
        }]);