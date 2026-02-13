'use strict';

var player = angular.module('playerControllers', []);

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
player.controller('players',
        ['$scope', '$rootScope', '$http', '$routeParams', '$location',
            function ($scope, $rootScope, $http, $routeParams, $location) {

                /**
                 * Bind players list
                 * @returns {undefined}
                 */
                var bindList = function () {
                    $http.get($rootScope.apiUrl + '/_tournament/player/get_players?id=' + $rootScope.tournament_id).
                            success(function (data) {
                                if (data) {

                                    if (data.error == 'no_auth') {
                                        $rootScope.redirect_to = '/'+$rootScope.tournament_id+'/players';
                                        $location.path( "/"+$rootScope.tournament_id+"/login");
                                    } else {
                                        $scope.players1 = data.items1;
                                        $scope.players2 = data.items2;
                                    }
                                }
                            });
                };
                bindList();




            }]);

