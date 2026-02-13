'use strict';

var tournamentFilters = angular.module('tournamentFilters', []);


tournamentFilters.filter('hcp_text', function () {
    return function (input) {
        if (input) {
            if (input.length > 0)
                if (input.charAt(0) == '-')
                    return '+' + input.substr(1, input.length);
        }
        return input;
    };
});

tournamentFilters.filter('replace_urls', function () {
    return function (input) {
        if (input) {
            if (input.length > 0) {
                var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
                return input.replace(exp, "<a href='$1' target=\"_blank\">$1</a>");
            }
        }
        return input;
    };
});