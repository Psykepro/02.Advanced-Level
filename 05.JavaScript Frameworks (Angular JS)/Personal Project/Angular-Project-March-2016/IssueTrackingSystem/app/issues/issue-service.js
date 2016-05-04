'use strict';

angular.module('issueTrackingSystem.issues.issueService',[])
    .factory('issueService',[
        '$http',
        '$q',
        'BASE_URL',
        function issueService($http, $q, BASE_URL) {
            var myIssues = null;
            var currentIssue = null;
            var issueComments = null;

            var issueService = {
                initCommentsByIssueId: initCommentsByIssueId,
                updateCommentsByIssueId: updateCommentsByIssueId,
                initMyIssues: initMyIssues,
                updateMyIssues: updateMyIssues,
                initCurrentIssueById: initCurrentIssueById,
                updateCurrentIssue: updateCurrentIssue,
                getMyIssues: getMyIssues,
                addIssue: addIssue,
                getIssueById: getIssueById,
                updateIssue: updateIssue,
                addIssueComment: addIssueComment,
                getIssueComments: getIssueComments,
                updateIssueStatus: updateIssueStatus,
                formatViewEditIssueModel: formatViewEditIssueModel,
                formatBindingIssueModel: formatBindingIssueModel
            };

            function updateCommentsByIssueId(id) {
                issueService
                    .getIssueComments(id)
                    .then(function (success) {
                        issueComments.ShallowCopy(success);
                    });
            }

            function initCommentsByIssueId(id) {
                var deferred = $q.defer();

                if (!issueComments) {
                    issueService
                        .getIssueComments(id)
                        .then(function (success) {
                            issueComments = success;
                            deferred.resolve(issueComments);
                        }, function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(issueComments);
                }

                return deferred.promise;
            }

            function updateMyIssues() {
                issueService
                    .getMyIssues()
                    .then(function (success) {
                        myIssues.ShallowCopy(success);
                    });
            }

            function initMyIssues() {
                var deferred = $q.defer();

                if (!myIssues) {
                    issueService
                        .getMyIssues()
                        .then(function (success) {
                            myIssues = success;
                            deferred.resolve(myIssues);
                        }, function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(myIssues);
                }

                return deferred.promise;
            }

            function updateCurrentIssue(updatedIssue) {
                currentIssue.ShallowCopy(updatedIssue);
            }

            function initCurrentIssueById(id) {
                var deferred = $q.defer();

                if (!currentIssue || currentIssue.Id !== id) {
                    issueService
                        .getIssueById(id)
                        .then(function (success) {
                            currentIssue = success;
                            deferred.resolve(currentIssue);
                        }, function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(currentIssue);
                }

                return deferred.promise;
            }

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

            function addIssueComment(id, comment) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.post(BASE_URL + 'issues/' + id + '/comments', comment)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueComments(id) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/' + id + '/comments')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueById(id) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/' + id)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function updateIssueStatus(issueId, statusId) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.put(BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function updateIssue(id, editedIssue) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                editedIssue = formatBindingIssueModel(editedIssue);
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.put(BASE_URL + 'issues/' + id, editedIssue)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function formatViewEditIssueModel(issue) {
                issue.DueDate = new Date(issue.DueDate);
                issue.Labels = issue.Labels.map(function (labelObj) {
                    return labelObj.Name;
                }).join(', ');

                return issue;
            }

            function formatBindingIssueModel(issue, projectId) {
                issue.ProjectId = parseInt(projectId);
                issue.AssigneeId = issue.Assignee.Id;
                issue.PriorityId = parseInt(issue.Priority.Id);
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