'use strict';

angular
    .module('issueTrackingSystem')
    .controller('MainCtrl', [
        '$scope',
        'identityService',
        'authenticationService',
        function($scope, identityService, authenticationService) {
            $scope.isAuthenticated = identityService.isAuthenticated;

            // TODO : change that
            var userAuthenticatedOff = $scope.$on('userAuthenticated', function (event, user) {
                $scope.currentUser = user;
            });

            $scope.logout = function logout(){
                authenticationService
                    .logoutUser()
                    .then(function(success){
                        localStorage.removeItem("userAuth");
                        sessionStorage.removeItem("isAdmin");
                        $.notify("You logged out successfully!", "success");
                    }, function(error){
                        $.notify("You don't logged out successfully!", "error");
                    });
            };

        }]);