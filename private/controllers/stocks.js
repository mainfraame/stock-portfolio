'use strict';

const Stocks = require('../models/stocks');

module.exports = {
    create: function (request, response) {
        return new Stocks(Object.assign(request.body, {shares: 1}))
            .save()
            .then((stock) => {
                response.json(stock.toJSON());
            });
    },
    read: function (request, response) {
        return Stocks
            .fetchAll()
            .then((stocks) => {
                response.json(stocks.toJSON());
            });
    },
    update: function (request, response) {
        return new Stocks({id: request.body.id})
            .save({
                shares: request.body.shares
            }, {
                patch: true
            })
            .then((stock) => {
                response.json(stock.toJSON());
            });
    },
    destroy: function (request, response) {
        return new Stocks({id: request.params.id})
            .destroy()
            .then((model) => {
                response.json(model.toJSON());
            });
    }
};