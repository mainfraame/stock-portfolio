const http = require('request');

module.exports = {
    get: (request, response) => {
        http({url: 'https://chstocksearch.herokuapp.com/api/' + request.params.symbol, json: true}).pipe(response);
    }
};