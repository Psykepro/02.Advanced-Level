'use strict';

angular
    .module('issueTrackingSystem.users', ['ngRoute'])
    .controller('UsersCtrl', [
        '$scope',
        'userService',
        'adminService',
        function UserCtrl($scope, userService, adminService) {
            $scope.adminService = sessionStorage.isAdmin;

            userService.getAllUsers()
                .then(function (success) {
                    console.log(success);
                    $scope.users = success;
                }, function (error) {
                    console.log(error);
                });

            $scope.promoteToAdmin = adminService.makeAdmin;
    }]);


