'use strict';

angular.module('issueTrackingSystem.user', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'app/user/user.html',
    controller: 'UserController'
  });
}])
.controller('UserController', ['$scope','$q', '$http', function UsersController($scope, $q, $http) {



}]);


