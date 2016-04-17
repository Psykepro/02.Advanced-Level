'use strict';

angular.module('issueTrackingSystem.dashboard.issues',[])
    .factory('issues',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getIssues(pageSize, pageNumber, orderBy){
                pageSize = pageSize || 10;
                pageNumber = pageNumber || 1;
                orderBy = orderBy || 'DueDate';

                var deferred = $q.defer();

                var accessToken = localStorage["userAuth"];
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber+'&orderBy=' + orderBy)
                    .then(function (success) {
                        deferred.resolve(success.data.Issues);
                    },function (error) {
                        deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getIssues: getIssues
            }
    }]);