'use strict';

const http = require('request');

const getQuoteUrl = (symbols) => {
    return 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from yahoo.finance.quotes where symbol in ("' + symbols + '")') + '&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env';
};

module.exports = {
    get: function (request, response) {
        http({url: getQuoteUrl(request.query.symbol), json: true}, (error, headers, body) => {
            if (!error) {
                if (!Array.isArray(body.query.results.quote)) {
                    body.query.results.quote = [body.query.results.quote];
                }
                response.json(body.query.results.quote);
            } else {
                response.json([]);
            }
        });
    }
};