'use strict';

var tounrnamentFactorys = angular.module('tounrnamentFactorys', []);

/**
 *  Auth 
 *  
 * @param {type} param1
 * @param {type} param2
 */
tounrnamentFactorys.factory('headerAccountToken', [
    'store', '$location', 'AuthMember',
    function (store, $location, AuthMember) {

        return {
            /** add token to http header */
            request: function (config) {
                config.headers.AccountToken = AuthMember.getToken();
                return config;
            },
            /** check response */
            response: function (response) {
                
//                if (response.data.error == 'no_auth') {
//                    AuthMember.deleteToken();
//                    $location.path("/login");
//                }
                return response;
            },
            /** check response */
            responseError: function (rejection) {
                
                
                
            }
        }
    }]);

