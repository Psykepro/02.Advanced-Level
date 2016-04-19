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

            $scope.$on('$routeChangeStart', function(next, current) {
                if(!$scope.currentUser){
                    userService.getCurrentUser().then(function (success) {
                        var currentUser = success.data;
                        currentUser.password = sessionStorage['currentPassword'];
                        $scope.currentUser = currentUser;
                        console.log($scope.currentUser);
                    });
                }else{
                    if($scope.currentUser.password !== sessionStorage['currentPassword']){
                        $scope.currentUser.password = sessionStorage['currentPassword'];
                        console.log($scope.currentUser);
                    }
                }
            });

            $scope.logout = function logout(){
                authenticationService
                    .logoutUser()
                    .then(function(success){
                        sessionStorage.removeItem("userAuth");
                        sessionStorage.removeItem("isAdmin");
                        $.notify("You logged out successfully!", "success");
                    }, function(error){
                        $.notify("You don't logged out successfully!", "error");
                    });
            };



        }]);