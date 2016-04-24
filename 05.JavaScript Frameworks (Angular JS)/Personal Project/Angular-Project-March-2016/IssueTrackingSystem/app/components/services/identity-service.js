'use strict';

angular.module('issueTrackingSystem.components.services.identityService',[])
    .factory('identityService',[function identity() {
        var identity = {
            isAuthenticated: isAuthenticated,
            isAdmin: isAdmin
        };

        function isAuthenticated() {
            var accessToken = sessionStorage["userAuth"];
            return accessToken;
        }

        function isAdmin(){
            var isAdmin = sessionStorage["isAdmin"];
            if(isAdmin === true){
                return true;
            }else{
                return false;
            }
        }

        return identity;
    }]);