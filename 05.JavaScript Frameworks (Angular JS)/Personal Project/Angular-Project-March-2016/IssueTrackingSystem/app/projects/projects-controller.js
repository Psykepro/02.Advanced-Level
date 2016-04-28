'use strict';

angular
    .module('issueTrackingSystem.projects.projectsController', [])
    .controller('ProjectsCtrl',[
        '$scope',
        '$rootScope',
        'userService',
        'projectService',
        'Pagination',
        function($scope, $rootScope, userService, projectService, Pagination) {
            $scope.addProject = function (project) {
                project.Priorities = project.Priorities.split(', ').map(function (priority) {
                    return {
                        Name: priority
                    }
                });

                project.Labels = project.Labels.split(', ').map(function (label) {
                    return {
                        Name: label
                    }
                });

                projectService.addProject(project).then(function (success) {
                    $.notify('You successfully created new project!', 'success');
                    $rootScope.$broadcast('updateMyProjects');
                }, function (error) {
                    $.notify("Project creation wasn't successful!", 'error');
                })
            };

            projectService.getAllProjects()
                .then(function (success) {
                    $scope.allProjects = success;
                    $scope.projectsPagination = Pagination.getNew(8);
                    $scope.projectsPagination.numPages = Math.ceil($scope.allProjects.length / $scope.projectsPagination.perPage);
                }, function (error) {
                    console.log(error);
                });
        }]);