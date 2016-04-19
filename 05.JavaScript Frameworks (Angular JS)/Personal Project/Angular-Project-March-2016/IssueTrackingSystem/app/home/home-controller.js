'use strict';

angular.module('issueTrackingSystem.home', [])
    .controller('HomeCtrl', [
        '$scope',
        '$rootScope',
        'authenticationService',
        function HomeCtrl($scope, $rootScope, authenticationService) {

            $scope.login = function(user){
                authenticationService
                    .loginUser(user)
                    .then(function (success) {
                        sessionStorage['userAuth'] = success.data.access_token;
                        sessionStorage['currentPassword'] = user.password;
                        $.notify("You successfully logged in!", "success");
                    },function(error){
                        $.notify("You didn't logged in!", "error");
                    });
            };

            $scope.register = function(user){
                authenticationService
                    .registerUser(user)
                    .then(function (success) {
                        $scope.login(user);
                    },function(error){
                        console.log(error);
                    });
            };
    }]);
