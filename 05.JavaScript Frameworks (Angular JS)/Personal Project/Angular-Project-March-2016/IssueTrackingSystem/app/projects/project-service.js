'use strict';

angular
    .module('issueTrackingSystem.projects.projectService', [])
    .factory('projectService', [
        '$q',
        '$http',
        'BASE_URL',
        function ProjectService($q, $http, BASE_URL) {
            var currentProject;

            var projectService = {
                projects: [],
                getCurrentProject: getCurrentProject,
                updateCurrentProjectProperties: updateCurrentProjectProperties,
                addProject: addProject,
                getAllProjects: getAllProjects,
                getIssuesByProjectId: getIssuesByProjectId,
                getProjectById: getProjectById,
                getMyProjects: getMyProjects,
                updateProject: updateProject,
                extractAssignedProjectsFromIssues: extractAssignedProjectsFromIssues,
                formatViewEditProjectModel: formatViewEditProjectModel,
                formatBindingProjectModel: formatBindingProjectModel
            };


            function updateCurrentProjectProperties(updatedProject){
                currentProject.ShallowCopy(updatedProject);
            }

            function getCurrentProject(id){
                var deferred = $q.defer();

                if(!currentProject || currentProject.Id !== id){
                    projectService
                        .getProjectById(id)
                        .then(function (success) {
                            currentProject = success;
                            deferred.resolve(currentProject);
                        }, function(error){
                            deferred.reject(error);
                        });
                }else{
                    deferred.resolve(currentProject);
                }

                return deferred.promise;
            }


            function addProject(project) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                project = formatBindingProjectModel(project);
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
                        projectService.projects = success.data;
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

            function formatBindingProjectModel(project){
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

            function formatViewEditProjectModel(project) {
                var editProject = project;
                editProject.Labels = project.Labels
                    .map(function (labelObj) {
                        return labelObj.Name;
                    }).join(', ');

                editProject.Priorities = project.Priorities
                    .map(function (priorityObj) {
                        return priorityObj.Name;
                    }).join(', ');

                return editProject;
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
