'use strict';

const http = require('request');

module.exports = {
    get: (request, response) => {
        let term = request.query.term;

        if (term) {
            http({url: 'https://chstocksearch.herokuapp.com/api/' + term, json: true}).pipe(response);
        } else {
            response.json([]);
        }
    }
};