import reducer from 'reducers/index';

import { applyMiddleware, compose, createStore } from 'redux';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';


let finalCreateStore = compose(
    applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState = {stocks: [], suggestions: []}) {
    return finalCreateStore(reducer, initialState);
}