'use strict';

angular
    .module('issueTrackingSystem.home.dashboardController',[])
    .controller('DashboardCtrl',[
        'issueService',
        'identityService',
        'projectService',
        'Pagination',
        function DashboardCtrl(issueService, identityService, projectService, Pagination) {
            var self = this;

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
        }]);