'use strict';

angular
    .module('issueTrackingSystem')
    .controller('MainCtrl', [
        '$scope',
        'identityService',
        function($scope, identityService) {
            $scope.isAuthenticated = identityService.isAuthenticated;

            // TODO : change that
            var userAuthenticatedOff = $scope.$on('userAuthenticated', function (event, user) {
                $scope.currentUser = user;
            });
        }]);