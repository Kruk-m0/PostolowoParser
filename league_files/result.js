'use strict';

var result = angular.module('resultControllers', []);

/**
 * @param {type} param1
 * @param {type} param2
 */
result.controller('results',
        ['$scope', '$rootScope', '$http', '$routeParams', '$location',
            function ($scope, $rootScope, $http, $routeParams, $location) {

                $scope.current_key = '1';
                $scope.tmp = [
                    [0, 'sp_netto', 'Główna (StrokePlay Netto)'],
                    [0, 'sp_brutto', 'Główna (StrokePlay Brutto)'],
                    [0, 'stb_netto', 'Główna (Stableford Netto)'],
                    [0, 'stb_brutto', 'Główna (Stableford Brutto)']
                ];

                $scope.classification = '0';
                $scope.format = 'sp_brutto';

                /**
                 * Bind players list
                 * @returns {undefined}
                 */
                var bindLivescore = function () {
                    
                    
                    $scope.format = $scope.tmp[ parseInt($scope.current_key) ][1]; 
                    
                    $http.get(
                            $rootScope.apiUrl + '/_tournament/livescore/get_livescore' +
                            '?id=' + $rootScope.tournament_id +
                            '&format=' + $scope.tmp[ parseInt($scope.current_key) ][1] +
                            '&classification=' + $scope.tmp[ parseInt($scope.current_key) ][0]
                            ).success(function (data) {
                        if (data) {

                            $scope.items = data.items;
                            
                            $scope.tournament_status = data.tournament_status;

                            $scope.tmp = [
                                [0, 'sp_netto', 'Główna (StrokePlay Netto)'],
                                [0, 'sp_brutto', 'Główna (StrokePlay Brutto)'],
                                [0, 'stb_netto', 'Główna (Stableford Netto)'],
                                [0, 'stb_brutto', 'Główna (Stableford Brutto)']
                            ];
                            angular.forEach($rootScope.tournament.classifications, function (value, key) {
                                if (value.spnetto)
                                    $scope.tmp.push([value.id, 'sp_netto', value.name + ' (StrokePlay Netto)']);
                                if (value.spbrutto)
                                    $scope.tmp.push([value.id, 'sp_brutto', value.name + ' (StrokePlay Brutto)']);
                                if (value.stbnetto)
                                    $scope.tmp.push([value.id, 'stb_netto', value.name + ' (Stableford Netto)']);
                                if (value.stbbrutto)
                                    $scope.tmp.push([value.id, 'stb_brutto', value.name + ' (Stableford Brutto)']);

                            });

                        }
                    });
                };
                bindLivescore();
                
                /**
                 * Refresh Results 
                 * 
                 * @returns {undefined}
                 */
                $scope.refreshResults = function(){
                    $scope.items = [];
                    bindLivescore();
                    $scope.rows_show = [];
                };

                /* watch */
                $scope.$watch('current_key', function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        bindLivescore();
                        
                         $scope.rows_show = [];
                    }
                });

                $scope.rows_show = [];
                $scope.players_rounds = [];
                $scope.current_player_round = [];
                $scope.rows = [];

                /**
                 * Show socrecard
                 * 
                 * @param int $index
                 * @param int player_id
                 * @returns null
                 */
                $scope.showScorecard = function ($index, player_id) {

                    /** set player id */
                    $scope.player_id = player_id;

                    if ($scope.rows_show[$index])
                        $scope.rows_show[$index] = false;
                    else
                        $scope.rows_show[$index] = true;
                };
            }]);




/**
 * Scorecard
 */
result.controller('scorecard',
        ['$scope', '$rootScope', '$http',
            function ($scope, $rootScope, $http) {

                
                /**
                 * Get scorecard
                 * */
                $http.get($rootScope.apiUrl + '/_tournament/scorecard/get_scorecard?player_id=' + $scope.player_id).
                        success(function (data) {
                            $scope.player = data.player;
                            $scope.scorecard = data.scorecard;
                        });

                /**
                 * Scorecard Template 
                 * @returns {String}
                 */
                $scope.scorecardTpl = function ( format ) {
                    return 'partials/scorecard.html';
                };
            }]);

