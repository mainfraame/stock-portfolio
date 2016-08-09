const Stocks = require('../models/stocks');

module.exports = {
    create (request, response) {
        return Stocks
            .create(Object.assign(request.body, {shares: 1}))
            .then((stock) => {
                response.json(stock);
            });
    },
    read (request, response) {
        return Stocks
            .findAll()
            .then((results) => {
                response.json(results);
            });
    },
    update (request, response) {
        return Stocks
            .update(request.body, {
                where: {
                    id: request.body.id
                }
            })
            .then(() => {
                response.json(request.body);
            });
    },
    destroy (request, response) {
        return Stocks
            .destroy({
                where: {
                    id: request.params.id
                }
            })
            .then(() => {
                response.json(Number(request.params.id));
            });
    }
};