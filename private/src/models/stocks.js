const Sequalize = require('sequelize');
const db = require('../db');

module.exports = db.define('stocks', {
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    symbol: Sequalize.TEXT,
    company: Sequalize.TEXT,
    shares: Sequalize.INTEGER
});