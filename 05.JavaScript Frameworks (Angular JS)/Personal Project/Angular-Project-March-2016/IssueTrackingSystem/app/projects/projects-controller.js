'use strict';

angular
    .module('issueTrackingSystem.projects.projectsController', [])
    .controller('ProjectsCtrl',[
        '$scope',
        'userService',
        'projectService', function($scope, userService, projectService){
        userService
            .getAllUsers()
            .then(function(success){
                $scope.allUsers = success;
            });

        $scope.addProject = function(project){
            project.Priorities = project.Priorities.split(', ').map(function(element){
                return {
                    Name: element
                }
            });

            console.log(project);
            projectService.addProject(project).then(function(success){
                console.log(success);
                $.notify('You successfully created new project!', 'success');
            }, function(error){
                console.log(error);
                $.notify("Project creation wasn't successful!", 'error');
            })
        };

    }]);