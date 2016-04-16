'use strict';

angular.module('issueTrackingSystem.home', [
    'issueTrackingSystem.users.authentication'
])
    .controller('HomeController', [
        '$scope',
        'authenticationService',
        function HomeController($scope, authenticationService) {

            $scope.login = function(user){
                authenticationService.loginUser(user)
                    .then(function (success) {
                        console.log(success);

                    },function(error){
                        console.log(error);
                    });
            };

            $scope.register = function(user){
                authenticationService.registerUser(user)
                    .then(function (success) {
                        $scope.login(user);
                    },function(error){
                        console.log(error);
                    });
            };
    }]);