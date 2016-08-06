export default function reducer(state = [], action = {}) {
    switch (action.type) {
        case 'ADD_STOCK':
            let hasStock = state.some((stock)=> {
                return stock.symbol === action.stock.symbol;
            });
            return hasStock ? state : state.concat([action.stock]);
        case 'REMOVE_STOCK':
            return state.filter((stock) => {
                return stock.symbol !== action.stock.symbol;
            });
        case 'ADJUST_STOCK_AMOUNT':
            return state.map((stock) => {
                if (stock.symbol === action.stock.symbol) {
                    stock.amount = action.stock.amount;
                }
                return stock;
            });
        case 'QUOTES_READY':
            return state.map((stock) => {
                let copy = action.quotes.reduce((results, quote)=> {
                    if (quote.symbol === stock.symbol) {
                        results.push(Object.assign(quote, stock));
                    }
                    return results;
                }, [])[0];
                console.log(copy);
                return copy;
            });
        default:
            return state;
    }
}