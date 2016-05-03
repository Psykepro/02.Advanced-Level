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
                    attributes.$observe('selectedId', function (value) {
                        if (value) {
                            id = value;
                            console.log(id);
                        }
                    });

                    // TODO : priorities NE SE PODAVAD !!! RAZBERI ZASHTO
                    attributes.$observe('priorities', function (value) {
                        if (value) {
                            priorities = value;
                        }
                    });

                    console.log(priorities);
                    selectElement = element[0];
                    fragment = generatePrioritiesOptionsFragment(priorities);
                    selectElement.appendChild(fragment);
                    if (id) {
                        setSelectedOption(id, selectElement);
                        console.log(selectElement.value);
                    }
                }
            };
        }]);