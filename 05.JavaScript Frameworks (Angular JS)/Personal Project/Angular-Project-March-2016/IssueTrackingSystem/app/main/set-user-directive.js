'use strict';

angular
    .module('issueTrackingSystem')
    .directive('setUser', [
        '$rootScope',
        'userService',
        function($rootScope, userService) {
            return {
                restrict: 'A',
                link: function () {
                    userService.getCurrentUser().then(function (success) {
                        $rootScope.currentUser = success.data;
                        $rootScope.$broadcast('userAuthenticated', $rootScope.currentUser);
                    });
                }
            }
        }]);