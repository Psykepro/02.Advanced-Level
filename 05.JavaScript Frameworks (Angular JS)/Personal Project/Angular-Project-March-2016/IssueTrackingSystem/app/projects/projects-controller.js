'use strict';

angular
    .module('issueTrackingSystem.projects.projectsController', [])
    .controller('ProjectsCtrl',[
        '$scope',
        'userService',
        'projectService',
        'Pagination',
        function($scope, userService, projectService, Pagination) {
            userService
                .getAllUsers()
                .then(function (success) {
                    $scope.allUsers = success;
                });

            $scope.addProject = function (project) {
                project.Priorities = project.Priorities.split(', ').map(function (element) {
                    return {
                        Name: element
                    }
                });

                projectService.addProject(project).then(function (success) {
                    console.log(success);
                    $.notify('You successfully created new project!', 'success');
                }, function (error) {
                    console.log(error);
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