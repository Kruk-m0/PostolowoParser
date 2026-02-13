'use strict';

var registration = angular.module('registrationControllers', []);

/**
 * @param {type} param1
 * @param {type} param2
 */
registration.controller('registration',
    ['$scope', '$rootScope', '$http', '$routeParams', 'Upload', '$timeout',
        function ($scope, $rootScope, $http, $routeParams, Upload, $timeout) {

            /** @var string */
            $scope.email = '';

            /** @var strong */
            $scope.password = '';

            /** @var int */
            $scope.response = 0;

            $scope.step = 1;

            $scope.payment_type = null;
            $scope.payment_price = null;

            var setPaymentType = function () {
                if (
                    $rootScope.tournament
                ) {
                    if ($rootScope.tournament.payments_config.transfer == true)
                        $scope.payment_type = 3;
                    if ($rootScope.tournament.payments_config.onsite == true)
                        $scope.payment_type = 2;
                    if ($rootScope.tournament.payments_config.online == true)
                        $scope.payment_type = 1;
                }
            };
            setPaymentType();

            /** watch */
            $rootScope.$watch('tournament', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    setPaymentType();
                }
            });

            /** @var boolean */
            $scope.form_step1_submited = false;
            $scope.button_blocked = false;

            /**
             * Register Am PGU
             * @returns {undefined}
             */
            $scope.submitStep1RegistrationAmPGU = function () {

                $scope.response = 0;
                $scope.form_step1_submited = true;
                $scope.button_blocked = true;

                if (
                    $scope.form.$valid &&
                    (
                        ($scope.payment_type == 1 && $scope.payment_price != null)
                        || ($scope.payment_type != 1)
                    )
                ) {
                    $http.post(
                        $rootScope.apiUrl + '/_tournament/registration/registration_step1_am_pgu',
                        {
                            tournament_id: $rootScope.tournament_id,
                            email: $scope.email,
                            password: $scope.password,
                            payment_type: $scope.payment_type,
                            payment_price: $scope.payment_price
                        }
                    ).success(function (data) {

                        if (data.success == 1) {
                            $scope.step = 2;
                            $scope.step2 = data.data;
                        } else {
                            $scope.response = data.error;
                        }

                        $scope.email = '';
                        $scope.password = '';
                        $scope.form_step1_submited = false;
                        $scope.button_blocked = false;
                    });
                } else {
                    $scope.button_blocked = false;
                }
            };

            $scope.form_step2_submited = false;
            /**
             * Register Am PGU
             * @returns {undefined}
             */
            $scope.submitStep2RegistrationAmPGU = function ( payment = true, form=null) {

                $scope.form_step2_submited = true;

                form = form || $scope.form2;
                if (!form || form.$invalid) {
                    return;
                }


                if ($scope.payment_type == 1) {
                    $scope.form_step2_submited_ok = true;
                    $http.post(
                        $rootScope.apiUrl + '/_tournament/registration/registration_step2_am_pgu_pay',
                        {
                            tournament_id: $rootScope.tournament_id,
                            id: $scope.step2.id,
                            email_trackman: $scope.step2.email_trackman ? $scope.step2.email_trackman : '',
                            payment: payment,
                            payment_type: $scope.payment_type,
                            payment_price: $scope.payment_price
                        }
                    ).success(function (data) {
                        if (data.success == 1 && data.payment_url) {
                            window.location = data.payment_url;
                        } else if (data.success == 1) {
                            $scope.response = 10;
                            $scope.step = 3;
                        } else {
                            $scope.response = data.error;
                        }
                    });
                } else {
                    $scope.form_step2_submited_ok= true;
                    $http.post(
                        $rootScope.apiUrl + '/_tournament/registration/registration_step2_am_pgu',
                        {
                            tournament_id: $rootScope.tournament_id,
                            id: $scope.step2.id,
                            email_trackman: $scope.step2.email_trackman ? $scope.step2.email_trackman : '',
                            payment_type: $scope.payment_type,
                            payment_price: $scope.payment_price
                        }
                    ).success(function (data) {
                        if (data.success == 1) {
                            $scope.response = 10;
                            $scope.step = 3;
                        } else {
                            $scope.response = data.error;
                        }

                        $scope.form_step2_submited = false;
                        $scope.form_step2_submited_ok = false;
                    });
                }
            };
            $scope.form_step2_submited = false;
            $scope.form_step2_submited_ok = false;

            /**
             *
             * @param price
             * @param name
             */
            $scope.submitPayRegistrationAmPgu = function (price, name) {
                $scope.form_pay_submited = true;

            };
        }]);


/**
 * @param {type} param1
 * @param {type} param2
 */
registration.controller('registrationAmOther',
    ['$scope', '$rootScope', '$http', '$routeParams', 'Upload', '$timeout',
        function ($scope, $rootScope, $http, $routeParams, Upload, $timeout) {

            /**
             * Initial data
             */
            $scope.player = {
                first_name: '',
                last_name: '',
                club: '',
                country_id: '1',
                gender: '0'
            };

            $scope.response = 0;
            $scope.step = 1;

            $scope.payment_type = null;
            $scope.payment_price = null;

            var setPaymentType = function () {
                if (
                    $rootScope.tournament
                ) {
                    if ($rootScope.tournament.payments_config.transfer == true)
                        $scope.payment_type = 3;
                    if ($rootScope.tournament.payments_config.onsite == true)
                        $scope.payment_type = 2;
                    if ($rootScope.tournament.payments_config.online == true)
                        $scope.payment_type = 1;
                }
            };
            setPaymentType();

            /** watch */
            $rootScope.$watch('tournament', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    setPaymentType();
                }
            });


            /**
             * Bind Countries
             * @returns {undefined}
             */
            var bindCountries = function () {
                $http
                    .get($rootScope.apiUrl + '/_tournament/registration/get_countries').success(function (data) {
                    $scope.countries = data.items;
                });
            };
            bindCountries();


            $scope.submitStep1RegistrationAmOther = function () {

                $scope.response = 0;
                $scope.form1_step1_submited = true;
                if ($scope.form.$valid && $scope.player.hcp_document && (
                    ($scope.payment_type == 1 && $scope.payment_price != null)
                    || ($scope.payment_type != 1))
                ) {
                    $scope.step = 2;
                    $scope.form1_step1_submited = false;
                }
            };

            /**
             * Submit player Am Other (with HCP)
             * @param {type} id
             * @returns {undefined}
             */
            $scope.submitRegisterAmOther = function (payment = true) {

                $scope.form_step2_submited = true;
                $scope.form_step2_payment = payment;

                if ($scope.payment_type == 1) {
                    if ($scope.form.$valid && $scope.player.hcp_document && $scope.payment_price != null) {
                        $scope.form_step2_submited = true;
                        $http
                            .post(
                                $rootScope.apiUrl + '/_tournament/registration/register_am_other_pay',
                                {
                                    player: $scope.player,
                                    tournament_id: $routeParams.id,
                                    payment: payment,
                                    payment_type: $scope.payment_type,
                                    payment_price: $scope.payment_price
                                }
                            )
                            .success(function (data) {
                                if (data.success == 1) {
                                    if (data.payment_url) {
                                        window.location = data.payment_url;
                                    } else  {
                                        $scope.response = 10;
                                    }
                                } else {
                                    $scope.response = data.error;
                                }
                                $scope.form_step2_submited = false;
                            })
                            .error(function (data) {
                                $scope.form_step2_submited = false;
                            });
                    }
                } else {
                    if ($scope.form.$valid && $scope.player.hcp_document) {
                        $scope.form_step2_submited = true;
                        $http
                            .post(
                                $rootScope.apiUrl + '/_tournament/registration/register_am_other',
                                {
                                    player: $scope.player,
                                    tournament_id: $routeParams.id,
                                    payment_type: $scope.payment_type
                                }
                            )
                            .success(function (data) {
                                if (data.success == 1) {
                                    $scope.response = 10;
                                } else {
                                    $scope.response = data.error;
                                }
                                $scope.form_step2_submited = false;
                            })
                            .error(function (data) {
                                $scope.form_step2_submited = false;
                            });
                    }
                }
            };
//
//
            /**
             * Upload HCP document
             */
            $scope.show_uploader = true;

            /**
             * Upload file
             *
             * @param {type} file
             * @param {type} errFiles
             * @returns {undefined}
             */
            $scope.uploadFile = function (file, errFiles) {


                $scope.form_blocked = true;
                $scope.show_uploader = false;


                $scope.f = file;
                $scope.err_file = errFiles && errFiles[0];


                if (file) {

                    file.upload = Upload.upload({
                        url: $rootScope.apiUrl + '/_tournament/registration/upload_hcp',
                        data: {file: file}
                    });

                    file.upload.then(function (response) {

                        $timeout(function () {

                            file.result = response.data;
                            $scope.player.hcp_document = response.data.file_name;
                            $scope.player.hcp_document_tmp = response.data.tmp_name;

                            $scope.form_blocked = false;
                        });

                    }, function (response) {

                        if (response.status > 0) {

                            $scope.errorMsg1 = response.status + ': ' + response.data;
                        }

                    }, function (evt) {

                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });

                } else {

                    $scope.form_blocked = false;
                    $scope.show_uploader = true;
                }


                if ($scope.err_file)
                    $scope.show_uploader = false;

            };

            /**
             * Delete file
             *
             * @returns {undefined}
             */
            $scope.deleteFile = function () {

                $scope.show_uploader = true;
                $scope.player.hcp_document = null;
                $scope.player.hcp_document_tmp = null;
                $scope.f = null;
                $scope.err_file = null;
            };

        }]);


registration.controller('registrationPaid',
    ['$scope', '$rootScope', '$http', '$routeParams', 'Upload', '$timeout',
        function ($scope, $rootScope, $http, $routeParams, Upload, $timeout) {

        }]);


registration.controller('registrationNonAmOther',
    ['$scope', '$rootScope', '$http', '$routeParams', 'Upload', '$timeout',
        function ($scope, $rootScope, $http, $routeParams, Upload, $timeout) {

            /**
             * Initial data
             */
            $scope.player = {
                first_name: '',
                last_name: '',
                club: '',
                country_id: '1',
                gender: '0',
                member_type: '3',
                has_hcp: '1'
            };

            $scope.response = 0;
            $scope.step = 1;

            $scope.payment_type = null;
            $scope.payment_price = null;

            var setPaymentType = function () {
                if (
                    $rootScope.tournament
                ) {
                    if ($rootScope.tournament.payments_config.transfer == true)
                        $scope.payment_type = 3;
                    if ($rootScope.tournament.payments_config.onsite == true)
                        $scope.payment_type = 2;
                    if ($rootScope.tournament.payments_config.online == true)
                        $scope.payment_type = 1;
                }
            };
            setPaymentType();

            /** watch */
            $rootScope.$watch('tournament', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    setPaymentType();
                }
            });

            /**
             * Bind Countries
             * @returns {undefined}
             */
            var bindCountries = function () {
                $http
                    .get($rootScope.apiUrl + '/_tournament/registration/get_countries').success(function (data) {
                    $scope.countries = data.items;
                });
            };
            bindCountries();


            $scope.submitStep1RegistrationAmOther = function () {

                $scope.response = 0;
                $scope.form1_step1_submited = true;
                if ($scope.form.$valid &&
                    ($scope.player.hcp_document || $scope.player.has_hcp == 2)
                    && (
                    ($scope.payment_type == 1 && $scope.payment_price != null)
                    || ($scope.payment_type != 1))
                ) {
                    $scope.step = 2;
                    $scope.form1_step1_submited = false;
                }
            };

            /**
             * Submit player Am Other (with HCP)
             * @param {type} id
             * @returns {undefined}
             */
            $scope.submitRegisterAmOther = function (payment = true) {

                $scope.form_step2_submited = true;
                $scope.form_step2_payment = payment;

                if ($scope.payment_type == 1) {
                    if ($scope.form.$valid && ($scope.player.hcp_document || $scope.player.has_hcp == 2) && $scope.payment_price != null) {
                        $scope.form_step2_submited = true;
                        $http
                            .post(
                                $rootScope.apiUrl + '/_tournament/registration/register_non_am_other_pay',
                                {
                                    player: $scope.player,
                                    tournament_id: $routeParams.id,
                                    payment: payment,
                                    payment_type: $scope.payment_type,
                                    payment_price: $scope.payment_price
                                }
                            )
                            .success(function (data) {
                                if (data.success == 1) {
                                    if (data.payment_url) {
                                        window.location = data.payment_url;
                                    } else  {
                                        $scope.response = 10;
                                    }
                                } else {
                                    $scope.response = data.error;
                                }
                                $scope.form_step2_submited = false;
                            })
                            .error(function (data) {
                                $scope.form_step2_submited = false;
                            });
                    }
                } else {
                    if ($scope.form.$valid && ($scope.player.hcp_document || $scope.player.has_hcp == 2)) {
                        $scope.form_step2_submited = true;
                        $http
                            .post(
                                $rootScope.apiUrl + '/_tournament/registration/register_non_am_other',
                                {
                                    player: $scope.player,
                                    tournament_id: $routeParams.id,
                                    payment_type: $scope.payment_type
                                }
                            )
                            .success(function (data) {
                                if (data.success == 1) {
                                    $scope.response = 10;
                                } else {
                                    $scope.response = data.error;
                                }
                                $scope.form_step2_submited = false;
                            })
                            .error(function (data) {
                                $scope.form_step2_submited = false;
                            });
                    }
                }
            };
//
//
            /**
             * Upload HCP document
             */
            $scope.show_uploader = true;

            /**
             * Upload file
             *
             * @param {type} file
             * @param {type} errFiles
             * @returns {undefined}
             */
            $scope.uploadFile = function (file, errFiles) {


                $scope.form_blocked = true;
                $scope.show_uploader = false;


                $scope.f = file;
                $scope.err_file = errFiles && errFiles[0];


                if (file) {

                    file.upload = Upload.upload({
                        url: $rootScope.apiUrl + '/_tournament/registration/upload_hcp',
                        data: {file: file}
                    });

                    file.upload.then(function (response) {

                        $timeout(function () {

                            file.result = response.data;
                            $scope.player.hcp_document = response.data.file_name;
                            $scope.player.hcp_document_tmp = response.data.tmp_name;

                            $scope.form_blocked = false;
                        });

                    }, function (response) {

                        if (response.status > 0) {

                            $scope.errorMsg1 = response.status + ': ' + response.data;
                        }

                    }, function (evt) {

                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });

                } else {

                    $scope.form_blocked = false;
                    $scope.show_uploader = true;
                }


                if ($scope.err_file)
                    $scope.show_uploader = false;

            };

            /**
             * Delete file
             *
             * @returns {undefined}
             */
            $scope.deleteFile = function () {

                $scope.show_uploader = true;
                $scope.player.hcp_document = null;
                $scope.player.hcp_document_tmp = null;
                $scope.f = null;
                $scope.err_file = null;
            };

        }]);


