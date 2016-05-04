'use strict';

angular
    .module('issueTrackingSystem.projects.projectController', [])
    .controller('ProjectCtrl',[
        '$scope',
        '$rootScope',
        '$routeParams',
        'ModalService',
        'identityService',
        'projectService',
        function($scope, $rootScope, $routeParams, ModalService, identityService, projectService) {
            var currentId = parseInt($routeParams.id),
                self = this;

            //////////
            // Init //
            //////////
            init();

            self.showAddIssue = function () {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-add.html',
                    controller: 'AddIssueCtrl'
                }).then(function (modal) {
                    modal.element.modal();
                });
            };

            self.showEditProject = function () {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-edit.html',
                    controller: 'EditProjectCtrl'
                }).then(function (modal) {
                    modal.element.modal();
                });
            };

            function init() {
                self.isAdmin = identityService.isAdmin;
                //////////////////////////////////////////////////////////
                // Check if need to update the currentProject reference //
                //////////////////////////////////////////////////////////
                if (!self.currentProject || self.currentProject.Id !== currentId) {
                    projectService
                        .getCurrentProject(currentId)
                        .then(function(success){
                            self.currentProject = success;
                        })
                }
            }
        }]);