angular.module('issueTrackingSystem.users.userService',[])
    .factory('userService',['$q', '$http', 'BASE_URL',
        function($q, $http, BASE_URL){
            return {
                getCurrentUser: function getCurrentUser(){
                    var accessToken = localStorage["userAuth"],
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
            };
        }]);
