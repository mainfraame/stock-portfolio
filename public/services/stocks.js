export default ['$http', ($http) => {
    return {
        getAll: function() {
            return $http.get('/stocks')
                .then((results) => {
                    return results.data;
                });
        },
        getQuotes: function(stocks) {
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
        createStock: function(stock) {
            return $http.post('/stocks', stock)
                .then((results) => {
                    return results.data;
                });
        },
        removeStock: function(stock) {
            return $http.delete('/stocks/' + stock.id)
                .then(() => {
                    return stock;
                });
        },
        updateShares: function(stock) {
            return $http.put('/stocks', stock)
                .then(() => {
                    return stock;
                });
        }
    }
}];