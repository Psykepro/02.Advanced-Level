'use strict';

angular
    .module('issueTrackingSystem.users.usersController', [])
    .controller('UsersCtrl', [
        '$rootScope',
        '$location',
        'userService',
        'adminService',
        function UsersCtrl($rootScope, $location, userService, adminService) {
            var self = this;

            userService.getAllUsers()
                .then(function (success) {
                    self.users = success;
                }, function (error) {
                    $.notify('Error occurred when tried to get the users!', 'error');
                });

            self.promoteToAdmin = function($event, userId){
                adminService.makeAdmin(userId)
                    .then(function(success){
                        $.notify('You successfully made new admin!', 'success');
                        $event.currentTarget.remove();
                    }, function(error){
                        $.notify("Admin wasn't made!", 'error');
                    })
            };

            self.changePassword = function(account){
                userService.changePassword(account)
                    .then(function(success){
                        $location.path('#/');
                        $location.replace();
                        $.notify('You successfully changed the password!', 'success');
                    }, function(error){
                       if(error.status === 400){
                           self.account = {};
                           self.wrongPassword = true;
                           $.notify('You entered wrong password!', 'error');
                       }
                    })
            }
    }]);


