'use strict';

var info = angular.module('infoControllers', []);


/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
info.controller('info',
        ['$scope', '$rootScope', '$http', '$routeParams',
            function ($scope, $rootScope, $http, $routeParams) {

                /** @var int Tournament Id */
                var tournament_id = $routeParams.id;

                /* watch */
                $rootScope.$watch('tournament', function (newValue, oldValue) {

                    if (newValue) {

                        if($rootScope.tournament.main_type == "1")
                            bindMatchplayGroups();

                        if($rootScope.tournament.main_type == "3")
                            bindTeamMatchplayGroups();

                    }
                });

                /**
                 * Bind Matchplay Groups 
                 * @returns {undefined}
                 */
                var bindMatchplayGroups = function () {

                    $http.get($rootScope.apiUrl + '/_tournament/matchplay/get_groups?id=' + tournament_id).
                            success(function (data) {
                                $scope.matchplay_groups = data.items;
                            });
                };
                
                /**
                 * Bind Matchplay Groups 
                 * @returns {undefined}
                 */
                var bindTeamMatchplayGroups = function () {
                    $http.get($rootScope.apiUrl + '/_tournament/teamMatchplay/get_groups?id=' + tournament_id).
                            success(function (data) {
                                $scope.team_matchplay_groups = data.items;
                            });
                };
            }]);
