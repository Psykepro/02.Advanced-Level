'use strict';

angular.module('issueTrackingSystem.components.identityService',[])
    .factory('identityService',[
        function identity(){
            return {
                isAuthenticated: function isAuthenticated(){
                    var accessToken = localStorage["userAuth"];
                    return accessToken;
                }
        };
    }]);