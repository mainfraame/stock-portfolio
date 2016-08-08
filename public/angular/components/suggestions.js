'use strict';

import template from 'html!components/suggestions.html';

module.exports = {
    template: template,
    bindings: {
        onSelect: '=',
        selected: '='
    },
    controller: ['$injector', function ($injector) {
        let $suggestions = $injector.get('suggestionService');

        this.onChange = () => {
            $suggestions.getSuggestions(this.term).then((suggestions)=> {
                this.suggestions = suggestions.filter((suggestion)=> {
                    return !this.selected.some((selected)=> {
                        return suggestion.symbol === selected.symbol;
                    });
                });
            });
        };

        this.select = (suggestion) => {
            this.term = '';
            this.onSelect(suggestion);
            this.onChange('');
        };
    }]
};