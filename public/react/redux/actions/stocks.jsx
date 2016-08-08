import axios from 'axios'

export const getStocks = () => {
    return (dispatch) => {
        axios.get('/stocks')
            .then((stock)=> {
                dispatch(gotStocks(stock.data));
                getQuotes(stock.data)(dispatch);
            });
    };
};

export const gotStocks = (stocks) => {
    return {
        type: 'STOCKS_READY',
        stocks: stocks
    }
};

export const addedStock = (stock) => {
    return {
        type: 'ADDED_STOCK',
        stock: stock
    }
};

export const addStock = (stock) => {
    return (dispatch) => {
        axios.post('/stocks', Object.assign({}, stock, {shares: 1}))
            .then((stock)=> {
                dispatch(addedStock(stock.data));
            });
    };
};

export const adjustShares = (stock) => {
    return (dispatch) => {
        axios.put('/stocks', stock)
            .then((stock)=> {
                dispatch(adjustedShares(stock.data));
            });
    };
};

export const adjustedShares = (stock) => {
    return {
        type: 'ADJUSTED_SHARES',
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

export const removeStock = (stock) => {
    return (dispatch) => {
        axios.delete('/stocks/' + stock.id)
            .then(()=> {
                dispatch(removedStock(stock));
            });
    };
};

export const removedStock = (stock) => {
    return {
        type: 'REMOVED_STOCK',
        stock: stock
    }
};