'use strict';

import template from 'html!./portfolio.html';

module.exports = {
    template: template,
    controller: ['$injector', function ($injector) {
        let quotesInterval;
        let $stocks = $injector.get('stocksService');
        let $interval = $injector.get('$interval');

        const getQuotes = () => {
            $stocks.getQuotes(this.stocks)
                .then(mergeQuotes);
        };

        const mergeQuotes = (quotes) => {
            this.stocks.forEach((stock) => {
                quotes.forEach((quote) => {
                    if (stock.symbol === quote.symbol) {
                        Object.assign(stock, quote);
                    }
                });
            });
        };

        this.$onDestroy = () => {
            $interval.cancel(quotesInterval);
        };

        this.onSelect = (stock) => {
            $stocks.createStock(stock).then((stock)=> {
                this.stocks.push(stock);
                getQuotes();
            });
        };

        this.removeStock = (stock) => {
            $stocks.removeStock(stock).then(()=> {
                this.stocks.splice(this.stocks.indexOf(stock), 1);
            });
        };

        this.updateShares = (stock) => {
            $stocks.updateShares(stock);
        };

        quotesInterval = $interval(getQuotes, 5000);

        $stocks.getAll().then((stocks) => {
            this.stocks = stocks;
            getQuotes();
        });
    }]
};