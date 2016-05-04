'use strict';

angular
    .module('issueTrackingSystem.projects.projectService', [])
    .factory('projectService', [
        '$q',
        '$http',
        'BASE_URL',
        'identityService',
        function ProjectService($q, $http, BASE_URL, identityService) {
            var currentProject;
            var projects;
            var myProjects;

            var projectService = {
                updateMyProjects: updateMyProjects,
                initMyProjects: initMyProjects,
                updateProjects: updateProjects,
                initProjects: initProjects,
                initCurrentProjectById: initCurrentProjectById,
                updateCurrentProject: updateCurrentProject,
                addProject: addProject,
                getAllProjects: getAllProjects,
                getIssuesByProjectId: getIssuesByProjectId,
                getProjectById: getProjectById,
                updateProject: updateProject,
                extractAssignedProjectsFromIssues: extractAssignedProjectsFromIssues,
                formatViewEditProjectModel: formatViewEditProjectModel,
                formatBindingProjectModel: formatBindingProjectModel
            };


            function updateMyProjects(){
                projectService
                    .getAllProjects()
                    .then(function (success) {
                        var temp = success.filter(function (project) {
                            return identityService.isProjectLeader(project);
                        });
                        myProjects.ShallowCopy(temp);
                    });
            }

            function initMyProjects(){
                var deferred = $q.defer();

                if(!myProjects){
                    projectService
                        .getAllProjects()
                        .then(function (success) {
                            myProjects = success.filter(function (project) {
                                return identityService.isProjectLeader(project);
                            });
                            deferred.resolve(myProjects);
                        }, function(error){
                            deferred.reject(error);
                        });
                }else{
                    deferred.resolve(myProjects);
                }

                return deferred.promise;
            }

            function updateProjects(){
                projectService
                    .getAllProjects()
                    .then(function (success) {
                        projects.ShallowCopy(success);
                    });
            }

            function initProjects(){
                var deferred = $q.defer();

                if(!projects){
                    projectService
                        .getAllProjects()
                        .then(function (success) {
                            projects = success;
                            deferred.resolve(projects);
                        }, function(error){
                            deferred.reject(error);
                        });
                }else{
                    deferred.resolve(projects);
                }

                return deferred.promise;
            }

            function updateCurrentProject(updatedProject){
                currentProject.ShallowCopy(updatedProject);
            }

            function initCurrentProjectById(id){
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
