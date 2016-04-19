'use strict';

angular
    .module('issueTrackingSystem.projects.projectService', [])
    .factory('projectService', ['$http', '$q', 'BASE_URL', function ProjectService($http, $q, BASE_URL){
        var projectService = {
            addProject: addProject
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

        return projectService;
    }]);
