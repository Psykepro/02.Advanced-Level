angular.module('issueTrackingSystem.users.identity',[])
    .factory('identityService',[
        function identityService(){
            return {
                isAuthenticated: function isAuthenticated(){
                    var accessToken = localStorage["userAuth"];
                    return accessToken;
                }
        };
    }]);