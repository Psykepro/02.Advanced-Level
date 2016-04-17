'use strict';

angular.module('issueTrackingSystem.components.authenticationService', [])
    .factory('authenticationService',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){

            var authenticationService = {
                registerUser:registerUser,
                loginUser:loginUser,
                logoutUser:logoutUser
            };

            function registerUser(user){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register',user)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function loginUser(user){
                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: "grant_type=password&username=" + user.email + "&password=" + user.password
                };
                $http(request)
                    .then(function(success){
                        localStorage['userAuth'] = success.data.access_token;
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function logoutUser(){

            }

            return authenticationService;
    }]);


