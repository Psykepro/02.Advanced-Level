'use strict';

angular
    .module('issueTrackingSystem.home.dashboardController',[])
    .controller('DashboardCtrl',[
        '$scope',
        'issueService',
        'identityService',
        'projectService',
        'Pagination',
        function DashboardCtrl($scope, issueService, identityService, projectService, Pagination) {
            var self = this;

            //////////
            // Init //
            //////////
            init();

            function init(){
                ////////////////////////////////////////////////////////
                // Check if need to init or update myIssues reference //
                ////////////////////////////////////////////////////////
                if(!self.myProjects){
                    projectService
                        .initMyProjects()
                        .then(function(success){
                            self.myProjects = success;
                            self.projectsPagination = Pagination.getNew(5);
                            self.projectsPagination.numPages = Math.ceil(self.myProjects.length / self.projectsPagination.perPage);
                        }, function(error){
                            $.notify("Error occurred when the server tried to get your projects!", "error");
                        });
                }
                if(!self.myIssues){
                    issueService
                        .initMyIssues()
                        .then(function(success){
                            ////////////
                            // Issues //
                            ////////////
                            self.myIssues = success;
                            self.issuesPagination = Pagination.getNew(5);
                            self.issuesPagination.numPages = Math.ceil(self.myIssues.length / self.issuesPagination.perPage);

                            ///////////////////////
                            // Assigned Projects //
                            ///////////////////////
                            self.assignedProjects = projectService.extractAssignedProjectsFromIssues(self.myIssues);
                            self.assignedProjectsPagination = Pagination.getNew(5);
                            self.assignedProjectsPagination.numPages = Math.ceil(self.assignedProjects.length / self.assignedProjectsPagination.perPage);

                        }, function(error){
                            $.notify("Can't get the issues!", "error");
                        });
                }
            }
        }]);