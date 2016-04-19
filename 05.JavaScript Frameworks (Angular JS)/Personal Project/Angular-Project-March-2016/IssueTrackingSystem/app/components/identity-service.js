'use strict';

angular.module('issueTrackingSystem.components.identityService',[])
    .factory('identityService',[
        function identity(){
            return {
                isAuthenticated: function isAuthenticated(){
                    var accessToken = sessionStorage["userAuth"];
                    return accessToken;
                }
        };
    }]);