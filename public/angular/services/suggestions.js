'use strict';

module.exports = ['$http', function ($http) {

    return {
        getSuggestions: function (term) {
            return $http.get('/suggestions', {
                params: {
                    term: term
                }
            }).then(function (results) {
                return results.data;
            });
        }
    };
}];