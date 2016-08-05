
let nextStockId = 0;

export const addStock = (symbol) => {
    return {
        type: 'ADD_STOCK',
        symbol: symbol
    }
};

export const removeStock = (symbol) => {
    return {
        type: 'REMOVE_STOCK',
        symbol: symbol
    }
};