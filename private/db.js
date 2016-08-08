'use strict';

module.exports = require('bookshelf')(require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'portfolio',
        charset: 'utf8'
    }
}));