export default function reducer(state = [], action = {}) {
    switch (action.type) {
        case 'ADDED_STOCK':
            let hasStock = state.some((stock)=> {
                return stock.symbol === action.stock.symbol;
            });
            return hasStock ? state : state.concat([action.stock]);
        case 'STOCKS_READY':
            return state.concat(action.stocks);
        case 'REMOVED_STOCK':
            return state.filter((stock) => {
                return stock.id !== action.stock.id;
            });
        case 'ADJUSTED_SHARES':
            return state.map((stock) => {
                if (stock.symbol === action.stock.symbol) {
                    stock.shares = action.stock.shares;
                }
                return stock;
            });
        case 'QUOTES_READY':
            return state.map((stock) => {
                return action.quotes.reduce((results, quote)=> {
                    if (quote.symbol === stock.symbol) {
                        results.push(Object.assign(quote, stock));
                    }
                    return results;
                }, [])[0];
            });
        default:
            return state;
    }
}