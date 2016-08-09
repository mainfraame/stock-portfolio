'use strict';

const http = require('request');

module.exports = {
    get: function (request, response) {
        if (request.query.term) {
            http({url: 'https://chstocksearch.herokuapp.com/api/' + request.query.term, json: true}).pipe(response);
        } else {
            response.json([]);
        }
    }
};