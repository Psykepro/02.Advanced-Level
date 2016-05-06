'use strict';

angular
    .module('issueTrackingSystem.projects.projectController', [])
    .controller('ProjectCtrl',[
        '$scope',
        '$routeParams',
        'ModalService',
        'identityService',
        'projectService',
        'issueService',
        function($scope, $routeParams, ModalService, identityService, projectService, issueService) {
            var currentId = parseInt($routeParams.id),
                self = this;

            //////////
            // Init //
            //////////
            init();

            self.showAddIssue = function () {
                ModalService.showModal({
                    templateUrl: 'app/issues/issue-add.html',
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
                        .initCurrentProjectById(currentId)
                        .then(function(success){
                            self.currentProject = success;
                            console.log(self.currentProject);
                        })
                }
                issueService
                    .getIssuesByProjectId(currentId)
                    .then(function(success){
                        //////////////////////////////////
                        // Set current project's issues //
                        //////////////////////////////////
                        self.allProjectIssues = success;
                    }, function(error){
                        $.notify("Error occurred when tried to get the project's issues!", 'error');
                    });
            }
        }]);