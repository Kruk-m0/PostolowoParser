'use strict';

var main = angular.module('mainControllers', []);

/**
 * Header controller
 */
main.controller('header',
        ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'AuthMember', '$translate',
            function ($scope, $rootScope, $routeParams, $location, $http, AuthMember, $translate) {

                /** @var int Tournament **/
                $rootScope.tournament_id = $routeParams.id;

                $rootScope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
                    $rootScope.lang = langKey;
                };

                /**
                 * 
                 * @returns String 
                 */
                $scope.header_tpl = function () {
                    $rootScope.tournament_id = $routeParams.id;
                    return 'partials/main/header.html';
                };

                /**
                 * 
                 * @param {string} path
                 * @returns {Boolean}
                 */
                $scope.isActive = function (path) {
                    var regExp = new RegExp('/' + path);
                    if (regExp.test($location.path()))
                        return true;
                    return false;
                };

                /**
                 * 
                 * @returns {undefined}
                 */
                $scope.logout = function () {
                    AuthMember.deleteToken();
                    $rootScope.user_logged = null;
                    $location.path("/" + $rootScope.tournament_id + "/info");
                };

            }]);


/**
 * Banner controller
 */
main.controller('banner',
        ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'AuthMember',
            function ($scope, $rootScope, $routeParams, $location, $http, AuthMember) {


                /** @var string Banner */
                $rootScope.banner = {
                    type: 'img',
                    src: '/tournament/ad/Q3SB_1_600x90.jpg',
                    url: 'https://www.audi.pl/pl/modele/q3/q3-sportback/?gad_source=1&gad_campaignid=23454676315&gbraid=0AAAAABvRR7gJS8VDrDJkJodXo5Qch-omI'
                };

                /**
                 * 
                 * @returns String 
                 */
                $scope.banner_tpl = function () {
                    return 'partials/main/banner.html';
                };
            }]);
