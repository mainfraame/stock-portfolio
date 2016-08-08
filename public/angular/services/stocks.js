'use strict';

module.exports = ['$http', function ($http) {
    return {
        getAll: function () {
            return $http.get('/stocks')
                .then(function (results) {
                    return results.data;
                });
        },
        getQuotes: function (stocks) {
            return $http.get('/quotes', {
                params: {
                    symbol: stocks.map(function (stock) {
                        return stock.symbol;
                    })
                }
            }).then(function (results) {
                return results.data;
            });
        },
        createStock: function (stock) {
            return $http.post('/stocks', stock).then(function (results) {
                return results.data;
            });
        },
        removeStock: function (stock) {
            return $http.delete('/stocks/' + stock.id).then(function (stock) {
                return stock;
            }.bind(null, stock));
        },
        updateShares: function (stock) {
            console.log('updating');
            return $http.put('/stocks', stock).then(function (stock) {
                return stock;
            });
        }
    }
}];