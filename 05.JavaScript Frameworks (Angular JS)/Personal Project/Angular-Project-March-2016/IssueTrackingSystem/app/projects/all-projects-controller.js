'use strict';

angular
    .module('issueTrackingSystem.projects.allProjectsController', [])
    .controller('AllProjectsCtrl',[
        'projectService',
        'Pagination',
        function(projectService, Pagination) {
            var self = this;

            projectService.getAllProjects()
                .then(function (success) {
                    self.allProjects = success;
                    self.projectsPagination = Pagination.getNew(8);
                    self.projectsPagination.numPages = Math.ceil(self.allProjects.length / self.projectsPagination.perPage);
                }, function (error) {
                    console.log(error);
                });
        }]);