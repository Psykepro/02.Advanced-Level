angular.module('issueTrackingSystem.common.filters.join', [])
    .filter('join', function() {
        return function (input, joinString) {
            console.log('input');
            console.log(input);
            console.log('joinString');
            console.log(joinString);

            var result = input.join(joinString);
            return result;
        };
    });