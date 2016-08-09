export default ['$http', function ($http) {
    return {
        getAll () {
            return $http.get('/stocks')
                .then((results) => {
                    return results.data;
                });
        },
        getQuotes (stocks) {
            return $http.get('/quotes', {
                params: {
                    symbol: stocks.map((stock) => {
                        return stock.symbol;
                    }).join(',')
                }
            }).then((results) => {
                return results.data;
            });
        },
        createStock (stock) {
            return $http.post('/stocks', stock)
                .then((results) => {
                    return results.data;
                });
        },
        removeStock (stock) {
            return $http.delete('/stocks/' + stock.id)
                .then(() => {
                    return stock;
                });
        },
        updateShares (stock) {
            return $http.put('/stocks', stock)
                .then(() => {
                    return stock;
                });
        }
    };
}];