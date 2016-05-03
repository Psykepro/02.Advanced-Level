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

            getMyProjects();
            getIssuesAndAssignedProjects();

            $scope.$on('updateMyProjects', function(){
                getMyProjects();
            });
            $scope.$on('updateIssuesAndAssignedProjects', function(){
                getIssuesAndAssignedProjects();
            });


            function getMyProjects(){
                projectService.getAllProjects()
                    .then(function (success) {
                        var myProjects = success.filter(function (project) {
                            return identityService.isProjectLeader(project);
                        });
                        self.myProjects = myProjects;
                        self.projectsPagination = Pagination.getNew(5);
                        self.projectsPagination.numPages = Math.ceil(self.myProjects.length / self.projectsPagination.perPage);
                    }, function (error) {
                        console.log(error);
                    });
            }

            function getIssuesAndAssignedProjects(){
                issueService.getMyIssues(100)
                    .then(function (success) {
                        // Issues \\
                        self.myIssues = success;
                        self.issuesPagination = Pagination.getNew(5);
                        self.issuesPagination.numPages = Math.ceil(self.myIssues.length / self.issuesPagination.perPage);

                        // Assigned Projects \\
                        self.assignedProjects = projectService.extractAssignedProjectsFromIssues(self.myIssues);
                        self.assignedProjectsPagination = Pagination.getNew(5);
                        self.assignedProjectsPagination.numPages = Math.ceil(self.assignedProjects.length / self.assignedProjectsPagination.perPage);

                    }, function (error) {
                        console.log(error);
                    });
            }
        }]);