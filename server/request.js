'use strict';

var https = require('https');

module.exports = function (url, callback) {
    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var parsed;
            try {
                parsed = JSON.parse(body);
            } catch (e) {
                console.error('ERROR!', e);
            }

            if (parsed) {
                callback(JSON.parse(body));
            } else {
                callback({});
            }

        });
    }).on('error', function (e) {
        console.log(e);
    });
};
