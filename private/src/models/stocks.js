const Sequalize = require('sequelize');
const db = require('../db');

module.exports = db.define('stocks', {
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    symbol: Sequalize.STRING(11),
    company: Sequalize.STRING(255),
    shares: Sequalize.INTEGER
});