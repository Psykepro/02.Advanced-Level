'use strict';

angular.module('issueTrackingSystem.components.identityService',[])
    .factory('identityService',[
        function identity(){
            var identity = {
                isAuthenticated: isAuthenticated
            };

            function isAuthenticated(){
                var accessToken = sessionStorage["userAuth"];
                return accessToken;
            }

            return identity;
    }]);