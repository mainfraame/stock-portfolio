'use strict';
var https = require('https');
var Promise = require('promise');
var _ = require('lodash');

module.exports = class Stocks {
    constructor() {
        this.subscriptions = {};
        this.sql = 'select * from yahoo.finance.quotes where symbol in ';
        setInterval(this.getQuotes.bind(this), 500);
    }

    subscribe(ws, ticker) {

        if (!this.subscriptions[ticker]) {
            this.subscriptions[ticker] = [];
        }

        if (this.subscriptions[ticker] && this.subscriptions[ticker].indexOf(ws) === -1) {
            this.subscriptions[ticker].push(ws);
        }
    }

    unsubscribe(ws, ticker) {
        if (this.subscriptions[ticker]) {
            this.subscriptions[ticker].splice(this.subscriptions[ticker].indexOf(ws), 1);
        }
    }

    broadcastQuote(quotes) {
        if (quotes && quotes.query && quotes.query.results) {

            if (!_.isArray(quotes.query.results.quote)) {
                quotes.query.results.quote = [quotes.query.results.quote];
            }

            quotes.query.results.quote.forEach((quote)=> {
                this.subscriptions[quote.symbol].forEach((ws)=> {
                    if (ws.readyState === 'closed') {
                        this.unsubscribe(ws, quote.symbol);
                    } else {
                        ws.send(JSON.stringify({
                            ticker: quote.symbol,
                            quote: quote
                        }));
                    }
                });
            });
        }
    }

    getQuotes() {
        var symbols = Object.keys(this.subscriptions);
        var url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(this.sql + '("' + symbols.join(',') + '")') + '&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=';

        if (symbols.length > 0) {
            return request(url, this.broadcastQuote.bind(this));
        }
    }
};