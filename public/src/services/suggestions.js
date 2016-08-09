export default ['$http', function ($http) {
    return {
        getSuggestions (term) {
            return $http.get('/suggestions', {
                params: {
                    term
                }
            }).then((results) => {
                return results.data;
            });
        }
    };
}];