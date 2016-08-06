const http = require('request');

module.exports = {
    get: (request, response) => {
        if (!Array.isArray(request.query.symbol)) {
            request.query.symbol = [request.query.symbol];
        }
        var url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from yahoo.finance.quotes where symbol in ("' + request.query.symbol.join(',') + '")') + '&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env';
        http({url: url, json: true}, (error, headers, body) => {

            if (!Array.isArray(body.query.results.quote)) {
                body.query.results.quote = [body.query.results.quote];
            }
            response.json(body.query.results.quote);
        });
    }
};