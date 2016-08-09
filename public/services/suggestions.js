export default ['$http', ($http) => {
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