'use strict';

angular
    .module('issueTrackingSystem.users.adminService', [])
    .factory('adminService',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q,BASE_URL){
            var adminService = {
                makeAdmin : makeAdmin
            };

            function makeAdmin(userId){
                var deferred = $q.defer();
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'users/makeadmin',
                    headers: {'Content-Type': 'application/json'},
                    data: {'UserId':userId}
                };
                $http(request)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return adminService;
        }]);

