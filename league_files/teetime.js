'use strict';

var teetime = angular.module('teetimeControllers', []);

/**
 * Tee time 
 * @param {type} param1
 * @param {type} param2
 */
teetime.controller('teetime',
        ['$scope', '$rootScope', '$http', '$routeParams', '$location',
            function ($scope, $rootScope, $http, $routeParams, $location) {

                /**
                 * Bind players list
                 * @returns {undefined}
                 */
                var bindTeetime = function () {
                    $http.get($rootScope.apiUrl + '/_tournament/teetime/get_teetime?id=' + $rootScope.tournament_id).
                            success(function (data) {
                                if (data) {
                                    if (data.error == 'no_auth') {
                                        $rootScope.redirect_to = '/'+$rootScope.tournament_id+'/teetime';
                                        $location.path( "/"+$rootScope.tournament_id+"/login");
                                    } else {
                                        $scope.round = data.round;
                                        $scope.items = data.items;
                                    }
                                }
                            });
                };
                bindTeetime();

            }]);
