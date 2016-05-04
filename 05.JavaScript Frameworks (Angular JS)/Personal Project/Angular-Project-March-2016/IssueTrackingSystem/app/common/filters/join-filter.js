angular.module('issueTrackingSystem.common.filters.join', [])
    .filter('join', function() {
        return function (input, joinString) {
            var result = input.join(joinString);
            return result;
        };
    });