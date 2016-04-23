'use strict';

angular.module('issueTrackingSystem.components.services.issuesService',[])
    .factory('issuesService',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getMyIssues(pageSize, pageNumber, orderBy){
                pageSize = pageSize || 10;
                pageNumber = pageNumber || 1;
                orderBy = orderBy || 'DueDate desc';

                var deferred = $q.defer();

                var accessToken = sessionStorage["userAuth"];
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
                getMyIssues: getMyIssues
            }
    }]);