'use strict';

var matchplay = angular.module('matchplayControllers', []);

/**
 * @param {type} param1
 * @param {type} param2
 */
matchplay.controller('resultsMatchplay',
        ['$scope', '$rootScope', '$http', '$routeParams', '$location',
            function ($scope, $rootScope, $http, $routeParams, $location) {

                /**
                 * Route param
                 */
                $scope.id = $routeParams.id;
                $scope.group_id = null;
                
                /**
                 * Bind Groups
                 * @returns {undefined}
                 */
                var bindGroups = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/matchplay/get_groups?id=' + $scope.id
                            ).
                            success(function (data) {
                                $scope.groups = data.items;
                                $scope.group_id = data.items[0].id;
                                bindResults();
                            });
                };
                
                /**
                 * Bind bracket
                 * @returns {undefined}
                 */
                var bindResults = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/matchplay/get_results?id=' + $scope.group_id
                            ).
                            success(function (data) {
                                $scope.baskets = data.baskets;
                                $scope.bracket = data.bracket;
                                $scope.round_robin = data.round_robin;
                            });
                };
                bindGroups();

                /**
                 * Set Group Id
                 * @param {type} id
                 * @returns {undefined}
                 */
                $scope.setGroup = function (id) {
                    $scope.group_id = id;
                    bindResults();
                };
            }]);


/**
 * @param {type} param1
 * @param {type} param2
 */
matchplay.controller('teetimeMatchplay',
        ['$scope', '$rootScope', '$http', '$routeParams', '$location',
            function ($scope, $rootScope, $http, $routeParams, $location) {

                /** Params */
                $scope.id = $routeParams.id;
                
                /**
                 * Bind Groups
                 * @returns {undefined}
                 */
                var bindGroups = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/matchplay/get_groups?id=' + $scope.id
                            ).
                            success(function (data) {
                                $scope.groups = data.items;
                                $scope.group_id = data.items[0].id;
                                bindTeetime();
                            });
                };

                /**
                 * Bind Tournament
                 * @returns {undefined}
                 */
                var bindTeetime = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/matchplay/get_teetime?id=' + $scope.group_id
                            ).
                            success(function (data) {
                                $scope.matches = data.items;
                            });
                };
                bindGroups();

                /**
                 * Set Group Id
                 * @param {type} id
                 * @returns {undefined}
                 */
                $scope.setGroup = function (id) {
                    $scope.group_id = id;
                    bindTeetime();
                };
            }]);
