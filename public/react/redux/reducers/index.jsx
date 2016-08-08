import { combineReducers } from 'redux';
import suggestions from 'reducers/suggestions';
import stocks from 'reducers/stocks';

export default combineReducers({
    stocks,
    suggestions
});