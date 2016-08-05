import axios from 'axios'
import _ from 'lodash'

export const getSuggestions = (symbol) => {
    const service = (dispatch) => {
        axios.get('/ticker/' + symbol).then((suggestions)=> {
            console.log('suggestions', suggestions.data);
            dispatch(suggestionsReady(suggestions.data));
        });
    };

    return _.debounce(service, 300, {trailing: true});
};

export const suggestionsReady = (suggestions) => {
    return {
        type: 'SUGGESTIONS_READY',
        suggestions: suggestions
    }
};