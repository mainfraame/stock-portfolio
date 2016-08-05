export default function reducer(state = [], action = {}) {
    switch (action.type) {
        case 'ADD_STOCK':
            return state.concat([action.symbol]);
        case 'REMOVE_STOCK':
            return state.filter((symbol) => {
                return symbol !== action.symbol;
            });
        default:
            return state;
    }
}