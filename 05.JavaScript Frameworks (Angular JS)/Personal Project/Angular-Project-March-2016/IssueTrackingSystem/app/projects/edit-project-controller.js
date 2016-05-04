'use strict';

angular
    .module('issueTrackingSystem.projects.editProjectController', [])
    .controller('EditProjectCtrl',[
        '$route',
        '$routeParams',
        'projectService',
        'identityService',
        function EditProjectCtrl($route, $routeParams, projectService, identityService) {
            var currentId = parseInt($routeParams.id),
                self = this;
            self.isAdmin = identityService.isAdmin;

            //////////////////
            // Init Project //
            //////////////////
            init();


            self.updateProject = function updateProject(project) {
                // Formatting the object
                project = projectService.formatBindingEditProjectModel(project);
                // Updating
                projectService
                    .updateProject(currentId, project)
                    .then(function (success) {
                        $.notify('You successfully edited the project!', 'success');
                         ///////////////////////////////////////
                        // Update current issue by reference //
                       ///////////////////////////////////////
                        projectService.getProjectById(currentId);
                    }, function (error) {
                        $.notify('You added invalid information!', 'error');
                    });
            };

            function init(){
                  ////////////////////////////////////////////////////////
                 // Check if need to update the currentIssue reference //
                ////////////////////////////////////////////////////////
                if(!projectService.currentProject || projectService.currentProject.Id !== currentId){
                    projectService.getProjectById(currentId)
                        .then(function () {
                            self.editProject = projectService.formatViewEditProjectModel(angular.copy(projectService.currentProject));
                        }, function (error) {
                            console.log(error);
                        });
                }else{
                    self.editProject = projectService.formatViewEditProjectModel(angular.copy(projectService.currentProject));
                }
            }
        }]);
