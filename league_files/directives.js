'use strict';

var tounrnamentDirectives = angular.module('tounrnamentDirectives', []);


tounrnamentDirectives.directive('validHcpEga', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {

                var FLOAT_REGEXP = /^\+{0,1}[0-9]{1,2}(\.{1}[0-9]{1}){0,1}$/;
                if (!FLOAT_REGEXP.test(viewValue)) { // valid format 
                    ctrl.$setValidity('validHcpEga', false);
                    return undefined;
                }

                var testHcp = parseFloat(viewValue);
                if (viewValue.substring(0, 1) == '+')
                    testHcp = (-testHcp);

                if (testHcp < -10 || testHcp > 54) {
                    ctrl.$setValidity('validHcpEga', false);
                    return undefined;
                }

                if (testHcp >= 36 && ((((testHcp * 100) - parseInt(testHcp) * 100) / 100) != 0)) {
                    ctrl.$setValidity('validHcpEga', false);
                    return undefined;
                }

                ctrl.$setValidity('validHcpEga', true);
                return viewValue;
            });
        }
    };
});


tounrnamentDirectives.directive("hcpEgaInput", function () {
    return {
        restrict: "A",
        require: '?ngModel',
        link: function ($scope, element, attrs, ctrl) {
            element.on("input", function (e) {

                var val = element.val();
                if (val) {
                    var newVal = val.replace(',', '.');
                    newVal = newVal.replace('-', '+');
                    newVal = newVal.replace(/[^0-9.\+\-]/g, '');
                    if (newVal.split('.').length > 2) {
                        newVal = newVal.substring(0, newVal.length - 1);
                    }
                    if (newVal !== val) {
                        ctrl.$setViewValue(newVal);
                        element.val(newVal);
                    }
                    return newVal;
                }
            });
        }
    };
});


tounrnamentDirectives.directive('syncScroll', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var scroller = angular.element(document.getElementById(attrs.syncScroll));
            scroller.bind('scroll', function () {
                element[0].scrollLeft = scroller[0].scrollLeft;
            });
        }
    }
});