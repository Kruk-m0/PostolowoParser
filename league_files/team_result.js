'use strict';

var resultTeams = angular.module('resultTeamsControllers', []);

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
resultTeams.controller('resultTeams',
        ['$scope', '$rootScope', '$http',
            function ($scope, $rootScope, $http) {


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
                var bindResults = function () {

                    $scope.format = $scope.tmp[ parseInt($scope.current_key) ][1];

                    $http.get(
                            $rootScope.apiUrl + '/_tournament/teamResult/get_results' +
                            '?id=' + $rootScope.tournament_id +
                            '&format=' + $scope.format
                            ).success(function (data) {
                        if (data)
                            $scope.teams = data.items;
                    });
                };
                bindResults();


                /* watch */
                $scope.$watch('current_key', function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        
                        bindResults();

                        $scope.rows_show = [];
                    }
                });



//                $scope.setFormat = function (format) {
//                    $scope.format = format;
//
//                    bindResults();
//                    $scope.players_rounds = [];
//                    $scope.rows_show = [];
//                };



            }]);

