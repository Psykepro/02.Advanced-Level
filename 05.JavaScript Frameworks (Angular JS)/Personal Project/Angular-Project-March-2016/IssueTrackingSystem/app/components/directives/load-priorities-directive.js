'use strict';

angular
    .module('issueTrackingSystem.components.directives.loadPrioritiesDirective', [])
    .directive('loadPriorities', [function loadPriorities() {
            return {
                restrict: 'A',
                scope: {
                    selectedId: '@',
                    priorities: '@'
                },
                link: function (scope, element, attributes) {
                    var fragment,
                        selectElement,
                        priorities,
                        id;


                    attributes.$observe('priorities', function (value) {
                        if (value) {
                            priorities = eval(value);
                            selectElement = element[0];
                            fragment = generatePrioritiesOptionsFragment(priorities);
                            selectElement.appendChild(fragment);
                            attributes.$observe('selectedId', function (value) {
                                if (value) {
                                    id = value;
                                    setSelectedOption(id, selectElement);
                                    console.log(selectElement.value);
                                }
                            });
                        }
                    });



                }
            };
        }]);