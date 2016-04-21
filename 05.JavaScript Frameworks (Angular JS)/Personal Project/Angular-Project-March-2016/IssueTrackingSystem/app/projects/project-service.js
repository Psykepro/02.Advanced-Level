'use strict';

angular
    .module('issueTrackingSystem.projects.projectService', [])
    .factory('projectService', ['$http', '$q', 'BASE_URL', function ProjectService($http, $q, BASE_URL){
        var projectService = {
            addProject: addProject,
            getAllProjects: getAllProjects,
            getIssuesByProjectId: getIssuesByProjectId,
            getProjectById: getProjectById,
            getMyProjects: getMyProjects
        };

        function addProject(project){
            var deferred = $q.defer();

            $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
            $http.post(BASE_URL + 'Projects', project).then(function(success){
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }
        function getAllProjects(){
            var deferred = $q.defer();

            $http.get(BASE_URL + 'projects/')
                .then(function (success) {
                    deferred.resolve(success.data);
                },function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
        function getMyProjects(userId){
            var deferred = $q.defer();

            $http.get(BASE_URL + 'projects/?LeadId=' + userId)
                .then(function (success) {
                    deferred.resolve(success.data);
                },function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
        function getIssuesByProjectId(id){
            var deferred = $q.defer();

            $http.get(BASE_URL + 'projects/' + id + '/issues')
                .then(function (success) {
                    deferred.resolve(success.data);
                },function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
        function getProjectById(id){
            var deferred = $q.defer();

            $http.get(BASE_URL + 'projects/' + id)
                .then(function (success) {
                    deferred.resolve(success.data);
                },function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }


        return projectService;
    }]);
