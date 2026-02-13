'use strict';

var tournamentServices = angular.module('tournamentServices', []);

tournamentServices.service('translationService', ['$http', 'store', function ($http, store) {

        this.getTranslation = function ($rootScope, language) {

            store.set('lng', language);
            var languageFilePath = 'translations/' + language + '.json';
            $http.get(languageFilePath).
                    success(function (data) {
                        $rootScope.translation = data;
                    }).error(function () {
                console.log('Błąd połączenia z API');
            });
        };
    }]);


tournamentServices.service('AuthMember',
        ['store', 'jwtHelper',
            function (store, jwtHelper) {


                this.setUser = function (token) {
                    store.set('member_token', token);
                };

                this.isLogged = function () {
                    var token = store.get('member_token');
                    if (token) {
                        return true;
                    } else {
                        return false;
                    }
                };

                this.getUser = function () {
                    var token = store.get('member_token');
                    if (token) {
                        return jwtHelper.decodeToken(token);
                    }
                };

                this.deleteToken = function () {
                    store.remove('member_token');
                };

                this.getToken = function () {
                    return store.get('member_token');
                };

            }]);