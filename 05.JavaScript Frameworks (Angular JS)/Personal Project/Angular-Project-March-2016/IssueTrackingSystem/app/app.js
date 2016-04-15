'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.home',
  'issueTrackingSystem.dashboard',
  'issueTrackingSystem.users.identity',
  'issueTrackingSystem.users.userService'
])
    .config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])

    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/')

    .controller('MainCtrl', ['$scope', 'identityService', 'userService', function($scope, identityService, userService){
        $scope.isAuthenticated = identityService.isAuthenticated;
    }])
    .directive('setUser', ['userService', function(userService){
  return {
    restrict: 'A',
    link: function(scope){
      userService.getCurrentUser().then(function(success){
        // TODO : Change this
        scope.$parent.currentUser = success.data;
      });
    }
  }
}]);
