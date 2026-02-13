'use strict';

var teams = angular.module('teamsControllers', []);

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
teams.controller('teams',
        ['$scope', '$rootScope', '$http',
            function ($scope, $rootScope, $http) {

                /**
                 * Bind players list
                 * @returns {undefined}
                 */
                var bindList = function () {
                    $http.get($rootScope.apiUrl + '/_tournament/team/get_teams?id=' + $rootScope.tournament_id).
                            success(function (data) {
                                if (data) {
                                    $scope.teams = data.items;
                                }
                            });
                };
                bindList();
            }]);

