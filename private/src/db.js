const Sequelize = require('sequelize');

let configuration;

if (process.env.NODE_ENV === 'test') {
    configuration = {
        storage: '../tests/portfolio.sqlite'
    };
} else {
    configuration = {};
}

module.exports = new Sequelize('portfolio', 'root', 'abc', Object.assign({
    logging: false
}, configuration));