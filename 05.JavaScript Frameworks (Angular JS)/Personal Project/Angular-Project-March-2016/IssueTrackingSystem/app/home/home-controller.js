'use strict';

angular.module('issueTrackingSystem.home.homeController', [])
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
                        sessionStorage['isAdmin'] = success.data.isAdmin;
                        $rootScope.$broadcast('$routeChangeStart');
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
