'use strict';

var teamMatchplay = angular.module('teamMatchplayControllers', []);

/**
 * @param {type} param1
 * @param {type} param2
 */
teamMatchplay.controller('resultsTeamMatchplay',
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
                            $rootScope.apiUrl + '/_tournament/teamMatchplay/get_groups?id=' + $scope.id
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
                            $rootScope.apiUrl + '/_tournament/teamMatchplay/get_results?id=' + $scope.group_id
                            ).
                            success(function (data) {
                                $scope.baskets = data.baskets;
                                $scope.bracket = data.bracket;
                                $scope.round_robin = data.round_robin;
                                $scope.results_list = data.results_list;
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
                
                
                $scope.openMatch = function(id){
                    
                    $rootScope.last_group_id = $scope.group_id;
                    console.log( id );
                    $location.path( '/'+$scope.id+'/team_match/'+id);
                };
                
                
                
            }]);


/**
 * @param {type} param1
 * @param {type} param2
 */
teamMatchplay.controller('teetimeTeamMatchplay',
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
                            $rootScope.apiUrl + '/_tournament/teamMatchplay/get_groups?id=' + $scope.id
                            ).
                            success(function (data) {
                                $scope.groups = data.items;
                                if (data.items)
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
                            $rootScope.apiUrl + '/_tournament/teamMatchplay/get_teetime?id=' + $scope.group_id
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

/**
 * @param {type} param1
 * @param {type} param2
 */
teamMatchplay.controller('matchTeamMatchplay',
        ['$scope', '$rootScope', '$http', '$routeParams', '$location',
            function ($scope, $rootScope, $http, $routeParams, $location) {

                /** Params */
                $scope.id = $routeParams.id;
                $scope.match_id = $routeParams.match_id;

                /**
                 * Bind Groups
                 * @returns {undefined}
                 */
                var bindGroups = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/teamMatchplay/get_groups?id=' + $scope.id
                            ).
                            success(function (data) {
                                $scope.groups = data.items;
                                bindMatch();
                            });
                };

                /**
                 * Bind Tournament
                 * @returns {undefined}
                 */
                var bindMatch = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/teamMatchplay/get_match?id=' + $scope.match_id
                            ).
                            success(function (data) {
                                $scope.team_match = data.match;
                            });
                };
                bindGroups();


            }]);
