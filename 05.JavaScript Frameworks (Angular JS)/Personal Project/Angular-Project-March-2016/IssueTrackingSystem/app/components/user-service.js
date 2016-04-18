'use strict';

angular.module('issueTrackingSystem.components.userService',[])
    .factory('userService',['$q', '$http', 'BASE_URL',
        function($q, $http, BASE_URL){

            var userService = {
                getCurrentUser: getCurrentUser,
                getAllUsers: getAllUsers
            };

            function getCurrentUser(){
                var accessToken = localStorage['userAuth'],
                    deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'users/me')
                    .then(function(success){
                        deferred.resolve(success);
                    },function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAllUsers(){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users')
                    .then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return userService
        }]);
