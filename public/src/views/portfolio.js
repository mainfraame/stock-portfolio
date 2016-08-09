import template from 'html!./portfolio.html';

export default {
    template,
    controller: ['$injector', function ($injector) {
        const $stocks = $injector.get('stocksService');
        const $interval = $injector.get('$interval');

        const mergeQuotes = (quotes) => {
            this.stocks.forEach((stock) => {
                quotes.forEach((quote) => {
                    if (stock.symbol === quote.symbol) {
                        Object.assign(stock, quote);
                    }
                });
            });
        };

        const getQuotes = () => {
            $stocks.getQuotes(this.stocks)
                .then(mergeQuotes);
        };

        const quotesInterval = $interval(getQuotes, 5000);

        this.$onDestroy = () => {
            $interval.cancel(quotesInterval);
        };

        this.onSelect = (stock) => {
            $stocks.createStock(stock).then((newStock) => {
                this.stocks.push(newStock);
                getQuotes();
            });
        };

        this.removeStock = (stock) => {
            $stocks.removeStock(stock).then(() => {
                this.stocks.splice(this.stocks.indexOf(stock), 1);
            });
        };

        this.updateShares = (stock) => {
            $stocks.updateShares(stock);
        };

        $stocks.getAll().then((stocks) => {
            this.stocks = stocks;
            getQuotes();
        });
    }]
};