'use strict';

angular
    .module('issueTrackingSystem.projects.projectService', [])
    .factory('projectService', [
        '$http',
        '$q',
        'BASE_URL',
        function ProjectService($http, $q, BASE_URL) {
            var projectService = {
                addProject: addProject,
                getAllProjects: getAllProjects,
                getIssuesByProjectId: getIssuesByProjectId,
                getProjectById: getProjectById,
                getMyProjects: getMyProjects,
                updateProject: updateProject,
                extractAssignedProjectsFromIssues: extractAssignedProjectsFromIssues
            };

            function addProject(project) {
                var deferred = $q.defer();

                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.post(BASE_URL + 'projects', project).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function updateProject(project) {
                var deferred = $q.defer();

                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.put(BASE_URL + 'projects/' + project.Id, project).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function getAllProjects() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function extractAssignedProjectsFromIssues(issues){
                return issues.map(function(issue){
                    return issue.Project;
                });
            }

            function getMyProjects(userId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/?LeadId=' + userId)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssuesByProjectId(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id + '/issues')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }


            return projectService;
        }]);
