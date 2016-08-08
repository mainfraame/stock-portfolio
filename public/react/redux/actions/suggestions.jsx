import axios from 'axios'
import _ from 'lodash'

export const getSuggestions = (symbol) => {
    const service = (dispatch) => {
        if (symbol !== '') {
            axios.get('/suggestions/' + symbol).then((suggestions)=> {
                dispatch(suggestionsReady(suggestions.data));
            });
        } else {
            dispatch(suggestionsReady([]));
        }

    };

    return _.debounce(service, 300, {leading: true, trailing: true});
};

const suggestionsReady = (suggestions) => {
    return {
        type: 'SUGGESTIONS_READY',
        suggestions: suggestions
    }
};