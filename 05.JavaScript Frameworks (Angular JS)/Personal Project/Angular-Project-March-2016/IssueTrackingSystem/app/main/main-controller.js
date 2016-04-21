'use strict';

angular
    .module('issueTrackingSystem')
    .controller('MainCtrl', [
        '$scope',
        'identityService',
        'authenticationService',
        'userService',
        function($scope, identityService, authenticationService, userService) {
            $scope.isAuthenticated = identityService.isAuthenticated;

            $scope.$on('$routeChangeStart', function() {
                if(!$scope.currentUser && sessionStorage['userAuth']){
                    userService.getCurrentUser().then(function (success) {
                        var currentUser = success.data;
                        sessionStorage['userId'] = success.data.Id;
                        $scope.currentUser = currentUser;
                    });
                }
            });

            $scope.logout = function logout(){
                authenticationService
                    .logoutUser()
                    .then(function(success){
                        sessionStorage.removeItem("userAuth");
                        sessionStorage.removeItem("userId");
                        $.notify("You logged out successfully!", "success");
                    }, function(error){
                        $.notify("You don't logged out successfully!", "error");
                    });
            };



        }]);