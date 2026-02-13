'use strict';

var livescoreTeams = angular.module('livescoreTeamsControllers', []);

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
livescoreTeams.controller('livescoreTeams',
        ['$scope', '$rootScope', '$http',
            function ($scope, $rootScope, $http) {

                $scope.format = 'sp_brutto';
                $scope.classification = '0';

                /**
                 * Bind players list
                 * @returns {undefined}
                 */
                var bindLivescore = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/teamResult/get_results' +
                            '?id=' + $rootScope.tournament_id +
                            '&format=' + $scope.format
                            ).success(function (data) {
                        if (data)
                            $scope.teams = data.items;
                    });
                };
                bindLivescore();




                $scope.setFormat = function (format) {
                    $scope.format = format;

                    bindLivescore();
                    $scope.players_rounds = [];
                    $scope.rows_show = [];
                };



            }]);

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
livescoreTeams.controller('livescoreTeamsTv',
        ['$scope', '$rootScope', '$http',
            function ($scope, $rootScope, $http) {
                
                
                $rootScope.hide_nav = true;
                $rootScope.tv = true;
                
                $scope.format = 'sp_brutto';
                $scope.classification = '0';

                /**
                 * Bind players list
                 * @returns {undefined}
                 */
                var bindLivescore = function () {
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/teamResult/get_results' +
                            '?id=' + $rootScope.tournament_id +
                            '&format=' + $scope.format
                            ).success(function (data) {
                        if (data)
                            $scope.teams = data.items;
                    });
                };
                bindLivescore();




                $scope.setFormat = function (format) {
                    $scope.format = format;

                    bindLivescore();
                    $scope.players_rounds = [];
                    $scope.rows_show = [];
                };



            }]);

