const http = require('request');

module.exports = {
    get (request, response) {
        if (request.query.term) {
            const config = {
                url: 'https://chstocksearch.herokuapp.com/api/' + request.query.term,
                json: true
            };

            http(config).pipe(response);
        } else {
            response.json([]);
        }
    }
};