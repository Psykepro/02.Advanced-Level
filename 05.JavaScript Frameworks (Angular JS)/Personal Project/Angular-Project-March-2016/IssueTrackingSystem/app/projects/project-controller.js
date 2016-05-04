'use strict';

angular
    .module('issueTrackingSystem.projects.projectController', [])
    .controller('ProjectCtrl',[
        '$routeParams',
        'ModalService',
        'identityService',
        'projectService',
        function($routeParams, ModalService, identityService, projectService) {
            var currentId = parseInt($routeParams.id),
                self = this;

             //////////////////
            // Init Project //
           //////////////////
            init();

            self.showAddIssue = function () {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-add.html',
                    controller: 'AddIssueCtrl'
                }).then(function (modal) {
                    modal.element.modal();
                });
            };

            self.isAdmin = identityService.isAdmin;

            self.showEditProject = function () {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-edit.html',
                    controller: 'EditProjectCtrl'
                }).then(function (modal) {
                    modal.element.modal();
                });
            };


            function init(){
                  ////////////////////////////////////////////////////////
                 // Check if need to update the currentIssue reference //
                ////////////////////////////////////////////////////////
                if(!projectService.currentProject || projectService.currentProject.Id !== currentId) {
                    projectService.getProjectById(currentId)
                        .then(function (success) {
                            self.currentProject = projectService.currentProject;
                            console.log(projectService.currentProject);
                            console.log('call project-ctrl');
                        }, function (error) {
                            console.log(error);
                        });
                }else{
                    self.currentProject = projectService.currentProject;
                    console.log('already inited project-ctrl');
                }
            }

        }]);