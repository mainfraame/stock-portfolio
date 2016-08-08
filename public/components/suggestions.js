'use strict';

module.exports = {
    template: `<section class="stock-suggestions">
        <input type="text"
               class="form-control"
               ng-model="$ctrl.term"
               ng-change="$ctrl.onChange()"
               ng-model-options="{ debounce: 300 }"
               placeholder="search for stock"/>
        <ul ng-if="$ctrl.suggestions.length > 0">
            <li ng-repeat="suggestion in $ctrl.suggestions"
                ng-click="$ctrl.select(suggestion)">
                <span>{{ suggestion.company }} {{ suggestion.symbol }}</span>
            </li>
        </ul>
    </section>`,
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