'use strict';

angular.module('issueTrackingSystem.issues.issueService',[])
    .factory('issueService',[
        '$http',
        '$q',
        'BASE_URL',
        function issueService($http, $q, BASE_URL) {

            var issueService = {
                getMyIssues: getMyIssues,
                addIssue: addIssue,
                getIssueById: getIssueById,
                updateIssue: updateIssue,
                formatViewEditIssueModel: formatViewEditIssueModel,
                formatBindingEditIssueModel: formatBindingEditIssueModel
            };

            function getMyIssues(pageSize, pageNumber, orderBy) {
                pageSize = pageSize || 10;
                pageNumber = pageNumber || 1;
                orderBy = orderBy || 'DueDate desc';
                var deferred = $q.defer();

                var accessToken = sessionStorage["userAuth"];
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy)
                    .then(function (success) {
                        deferred.resolve(success.data.Issues);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssue(issue) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.post(BASE_URL + 'issues/', issue)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueById(id){
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/' + id)
                    .then(function(success){
                        deferred.resolve(success);
                    }, function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function updateIssue(id, editedIssue){
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.put(BASE_URL + 'issues/' + id, editedIssue)
                    .then(function(success){
                        deferred.resolve(success);
                    }, function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function formatViewEditIssueModel(issue){
                issue.DueDate = new Date(issue.DueDate);
                issue.AssigneeId = issue.Assignee.Id;
                issue.PriorityId = issue.Priority.Id;
                issue.Labels = issue.Labels.map(function(labelObj){
                    return labelObj.Name;
                }).join(', ');

                return issue;
            }

            function formatBindingEditIssueModel(issue){
                issue.Labels = issue.Labels
                    .split(', ')
                    .map(function (label) {
                        return {
                            Name: label
                        }
                    });

                return issue;
            }

            return issueService;
        }]);