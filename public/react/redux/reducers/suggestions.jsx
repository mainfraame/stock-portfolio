export default function reducer(state = [], action = {}) {
    switch (action.type) {
        case 'SUGGESTIONS_READY':
            return action.suggestions;
        default:
            return state;
    }
}