'use strict';

angular
    .module('issueTrackingSystem.projects.singleProjectController', [])
    .controller('SingleProjectCtrl',[
        '$scope',
        '$routeParams',
        'identityService',
        'projectService',
        'userService',
        function($scope, $routeParams, identityService, projectService, userService) {
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