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
                extractAssignedProjectsFromIssues: extractAssignedProjectsFromIssues,
                formatViewEditProjectModel: formatViewEditProjectModel,
                formatBindingEditProjectModel: formatBindingEditProjectModel
            };

            function addProject(project) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                // Formatting the project \\
                project.Priorities = project.Priorities.split(', ').map(function (priority) {
                    return {
                        Name: priority
                    }
                });
                project.Labels = project.Labels.split(', ').map(function (label) {
                    return {
                        Name: label
                    }
                });

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.post(BASE_URL + 'projects', project).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function updateProject(id, project) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.put(BASE_URL + 'projects/' + id, project)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAllProjects() {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'projects/')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function extractAssignedProjectsFromIssues(issues) {
                return issues.map(function (issue) {
                    return issue.Project;
                });
            }

            function getMyProjects(userId) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'projects/?LeadId=' + userId)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssuesByProjectId(id) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'projects/' + id + '/issues')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function formatBindingEditProjectModel(project){
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

                return project;
            }

            function formatViewEditProjectModel(project){
                project.Labels = project.Labels
                    .map(function (labelObj) {
                        return labelObj.Name;
                    })
                    .join(', ');
                project.Priorities = project.Priorities
                    .map(function (priorityObj) {
                        return priorityObj.Name;
                    })
                    .join(', ');

                return project;
            }

            function getProjectById(id) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
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
