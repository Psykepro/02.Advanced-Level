'use strict';

angular
    .module('issueTrackingSystem')
    .controller('MainCtrl', [
        '$scope',
        'identityService',
        'authenticationService',
        'userService',
        'ModalService',
        function($scope, identityService, authenticationService, userService, ModalService) {
            $scope.isAuthenticated = identityService.isAuthenticated;

            $scope.$on('$routeChangeStart', function() {
                if(!$scope.currentUser && sessionStorage['userAuth']){
                    userService.getCurrentUser().then(function (success) {
                        var currentUser = success.data;
                        sessionStorage['userId'] = success.data.Id;
                        sessionStorage['isAdmin'] = success.data.isAdmin;
                        $scope.isAdmin = identityService.isAdmin;
                        $scope.currentUser = currentUser;
                    });
                }
            });

            $scope.showCreateProject = function(){
                ModalService.showModal({
                    templateUrl: 'app/projects/project-add.html',
                    controller: 'ProjectsCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                    userService
                        .getAllUsers()
                        .then(function (success) {
                            var usersSelect = $('#leadId');
                            var fragment = generateUsersOptionsFragment(success);
                            usersSelect.append(fragment);
                        });

                });
            };

            $scope.logout = function logout(){
                authenticationService
                    .logoutUser()
                    .then(function(success){
                        sessionStorage.removeItem("userAuth");
                        sessionStorage.removeItem("userId");
                        sessionStorage.removeItem("isAdmin");
                        $scope.currentUser = undefined;
                        $.notify("You logged out successfully!", "success");
                    }, function(error){
                        $.notify("You don't logged out successfully!", "error");
                    });
            };
        }]);