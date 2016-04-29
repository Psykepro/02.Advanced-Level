'use strict';

angular
    .module('issueTrackingSystem.users.usersController', [])
    .controller('UsersCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        'userService',
        'adminService',
        function UsersCtrl($scope, $rootScope, $location, userService, adminService) {

            userService.getAllUsers()
                .then(function (success) {
                    $scope.users = success;
                }, function (error) {
                    $.notify('Error occurred when tried to get the users!', 'error');
                });

            $scope.promoteToAdmin = function($event, userId){
                adminService.makeAdmin(userId)
                    .then(function(success){
                        $.notify('You successfully made new admin!', 'success');
                        $event.currentTarget.remove();
                    }, function(error){
                        $.notify("Admin wasn't made!", 'error');
                    })
            };

            $scope.changePassword = function(account){
                userService.changePassword(account)
                    .then(function(success){
                        $location.path('#/');
                        $location.replace();
                        $.notify('You successfully changed the password!', 'success');
                    }, function(error){
                       if(error.status === 400){
                           $scope.account = {};
                           $scope.wrongPassword = true;
                           $.notify('You entered wrong password!', 'error');
                       }
                    })
            }
    }]);


