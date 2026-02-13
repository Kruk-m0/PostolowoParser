'use strict';

var app = angular.module('ngTournament',
        [
            'ngRoute',
            'angular-storage',
            'angular-jwt',
            'environment',
            'ngAnimate',
            'ngMask', 
            'ngFileUpload',
            'ngSanitize',
            'ngCookies',
            'tournamentServices',
            'tounrnamentDirectives',
            'tounrnamentFactorys',
            'tournamentFilters',
            'mainControllers',
            'infoControllers',
            'playerControllers',
            'teetimeControllers',
            'registrationControllers',
            'livescoreControllers',
            'resultControllers',
            'matchplayControllers',
            'teamMatchplayControllers',
            'teamsControllers',
            'livescoreTeamsControllers',
            'resultTeamsControllers',
            'pascalprecht.translate'
        ]);



app.config(function(envServiceProvider) {
    envServiceProvider.config({
        domains: {
            new: ['eagle-new.polski.golf'],
            prod: ['eagle.polski.golf'],
            dev: ['eagle-dev.polski.golf'],
            test: ['eagle-test.polski.golf'],
            local: ['localhost'],
        },
        vars: {
            new: {
                appUrl: '//eagle-new.polski.golf/',
                apiUrl: '//eagle-new.polski.golf/api/',
            },
            prod: {
                appUrl: '//eagle.polski.golf/',
                apiUrl: '//eagle.polski.golf/api/',
            },
            dev: {
                appUrl: '//eagle-dev.polski.golf/',
                apiUrl: '//eagle-dev.polski.golf/api/',
            },
            test: {
                appUrl: '//eagle-test.polski.golf/',
                apiUrl: '//eagle-test.polski.golf/api/',
            },
            local: {
                appUrl: '//localhost/',
                apiUrl: '//localhost/api/',
            },

            // defaults: {
            //     apiUrl: '//api.default.com/v1',
            //     staticUrl: '//static.default.com'
            // }
        }
    });
    envServiceProvider.check();
});

app.run([ '$rootScope', 'envService', function ($rootScope, envService) {
    $rootScope.env = envService.get();
    $rootScope.appUrl = envService.read('appUrl');
    $rootScope.apiUrl = envService.read('apiUrl');
}]);

app.config(
        ['$routeProvider', '$httpProvider',
            function ($routeProvider, $httpProvider) {

                $routeProvider.when('/:id/info', {
                    controller: 'info',
                    templateUrl: 'partials/info.html'
                });

                $routeProvider.when('/:id/players', {
                    controller: 'players',
                    templateUrl: 'partials/players.html'
                });

                $routeProvider.when('/:id/teetime', {
                    controller: 'teetime',
                    templateUrl: 'partials/teetime.html'
                });

                $routeProvider.when('/:id/results', {
                    controller: 'results',
                    templateUrl: 'partials/results.html'
                });

                $routeProvider.when('/:id/livescore', {
                    controller: 'results',
                    templateUrl: 'partials/results.html'
                });

                $routeProvider.when('/:id/registration', {
                    controller: 'registration',
                    templateUrl: 'partials/registration.html'
                });

                $routeProvider.when('/:id/registration_paid', {
                    controller: 'registrationPaid',
                    templateUrl: 'partials/registration_paid.html'
                });

                $routeProvider.when('/:id/registration_am_other', {
                    controller: 'registrationAmOther',
                    templateUrl: 'partials/registration_am_other.html'
                });

                $routeProvider.when('/:id/registration_non_am_other', {
                    controller: 'registrationNonAmOther',
                    templateUrl: 'partials/registration_non_am_other.html'
                })

                $routeProvider.when('/:id/livescore_teams', {
                    controller: 'resultTeams',
                    templateUrl: 'partials/results_teams.html'
                });

                $routeProvider.when('/:id/teams', {
                    controller: 'teams',
                    templateUrl: 'partials/teams.html'
                });
                $routeProvider.when('/:id/results_teams', {
                    controller: 'resultTeams',
                    templateUrl: 'partials/results_teams.html'
                });

                // =============== Matchplay ==================
                
                $routeProvider.when('/:id/teetime_matchplay', {
                    controller: 'teetimeMatchplay',
                    templateUrl: 'partials/teetime_matchplay.html'
                });
                
                
                $routeProvider.when('/:id/results_matchplay', {
                    controller: 'resultsMatchplay',
                    templateUrl: 'partials/results_matchplay.html'
                });
                
                // =============== Team Matchplay ==================
                
                $routeProvider.when('/:id/teetime_team_matchplay', {
                    controller: 'teetimeTeamMatchplay',
                    templateUrl: 'partials/teetime_team_matchplay.html'
                });
                
                
                $routeProvider.when('/:id/results_team_matchplay', {
                    controller: 'resultsTeamMatchplay',
                    templateUrl: 'partials/results_team_matchplay.html'
                });
             
                $routeProvider.when('/:id/team_match/:match_id', {
                    controller: 'matchTeamMatchplay',
                    templateUrl: 'partials/match_team_matchplay.html'
                });

                // ================== Auth ====================

                $routeProvider.when('/:id/login', {
                    controller: 'login',
                    templateUrl: 'partials/auth/login.html'
                });


                // ================== Default ====================

                $routeProvider.otherwise({
                    redirectTo: '/:id/info'
                });

            }]);


app.config(['$translateProvider',  function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });
    // $translateProvider.preferredLanguage('pl');
    $translateProvider.registerAvailableLanguageKeys(['en', 'pl'], {
        'en_*': 'en',
        'pl_*': 'de'
    })
    .determinePreferredLanguage();
    $translateProvider.useCookieStorage();
}]);

app.run(['$translate', '$rootScope',  function($translate, $rootScope) {
    // Attempt to retrieve the stored language preference
    var storedLang = $translate.storage().get($translate.storageKey());
    // If there's a stored language, use it, otherwise default to 'pl'

    var preferredLang = $translate.preferredLanguage();
    if( preferredLang != 'pl' || preferredLang != 'en' )
        preferredLang = 'en';

    var defaultLang = storedLang || preferredLang;
    $translate.use(defaultLang);
    $rootScope.lang = defaultLang;
}]);


app.run(
        ['$rootScope', '$routeParams', '$http', 'store', 'translationService', '$window',
            function ($rootScope, $routeParams, $http, store, translationService, $window) {
                
                
                $rootScope.tournaments_blockade = false;
                $rootScope.tournaments_blockade_info = null;

                /** set logged user  */

                /** @var string Banner */
                $rootScope.banner = {
                    type: 'img',
                    src: '/tournament/ad/citi700x100.png',
                    url: 'http://www.citibank.pl/poland/corporate/polish/biznes-bez-granic.htm'
                };


                /**
                 * 
                 * @returns {undefined}
                 */
                var bindTournament = function () {
                    $http.get('/api/_tournament/tournament/get_tournament?id=' + $rootScope.tournament_id).
                            success(function (data) {
                                if (data) {
                                    $rootScope.tournament = data.tournament;
                                    $window.document.title = data.tournament.name + ' | PZG Eagle 2.0';
                                }
                            });
                };
                
                var bindBlockade = function () {
                    $http.get('/api/_tournament/blockade/get_blockade').
                            success(function (data) {
                                $rootScope.tournaments_blockade = data.blockade;
                                $rootScope.tournaments_blockade_info = data.info;
                            });
                };
                
                
                $rootScope.$on('$routeChangeSuccess', function (scope, current, pre) {
                    if ($routeParams.id > 0 && $rootScope.tournament_id != $routeParams.id) {
                        $rootScope.tournament_id = $routeParams.id;
                        bindTournament();
                        bindBlockade();
                    }
                });
            }]);



app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('headerAccountToken');
    }]);


/**
 * 
 */
app.config(
        ['$routeProvider', '$httpProvider',
            function ($routeProvider, $httpProvider) {
                $httpProvider.defaults.cache = false;
                if (!$httpProvider.defaults.headers.get) {
                    $httpProvider.defaults.headers.get = {};
                }
                // disable IE ajax request caching
                $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
                //.....here proceed with your routes
            }]);
