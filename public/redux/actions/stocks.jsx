import axios from 'axios'

export const addStock = (stock) => {
    return {
        type: 'ADD_STOCK',
        stock: Object.assign({}, stock, {amount: 1})
    }
};

export const adjustAmount = (stock) => {
    return {
        type: 'ADJUST_STOCK_AMOUNT',
        stock: stock
    }
};

export const getQuotes = (stocks) => {
    return (dispatch) => {
        if (stocks && stocks.length > 0) {
            let symbols = stocks.map((stock)=> {
                return 'symbol=' + stock.symbol;
            }).join('&');
            axios.get('/quotes?' + symbols).then((prices)=> {
                dispatch(quotesReady(prices.data));
            });
        } else {
            dispatch(quotesReady([]));
        }
    };
};

export const quotesReady = (quotes) => {
    return {
        type: 'QUOTES_READY',
        quotes: quotes
    }
};

export const removeStock = (symbol) => {
    return {
        type: 'REMOVE_STOCK',
        stock: symbol
    }
};