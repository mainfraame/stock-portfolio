export default ['$http', function ($http) {
    return {
        getSuggestions: function (term) {
            return $http.get('/suggestions', {
                params: {
                    term: term
                }
            }).then((results) => {
                return results.data;
            });
        }
    };
}];