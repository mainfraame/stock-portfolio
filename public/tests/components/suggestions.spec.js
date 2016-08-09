import angular from 'angular';
import '../../src/components/index';
import stocks from 'json!../fixtures/stocks';
import suggestions from 'json!../fixtures/suggestions';

describe('Given Suggestions component is rendered', () => {
    let controller;
    let scope;
    let element;
    const $suggestionService = {
        getSuggestions () {
        }
    };

    beforeEach(angular.mock.module('components', ($provide) => {
        $provide.value('suggestionService', $suggestionService);
    }));

    beforeEach(angular.mock.inject(($rootScope, $compile, $q) => {
        scope = angular.extend($rootScope.$new(), {
            stocks,
            onSelect () {
            }
        });

        spyOn(scope, 'onSelect');
        spyOn($suggestionService, 'getSuggestions').and.returnValue($q.when(suggestions));

        element = angular.element('<stock-suggestions on-select="onSelect" selected="stocks"></stock-suggestions>');
        element = $compile(element)(scope);
        controller = element.controller('stockSuggestions');

        scope.$digest();
    }));

    describe('When a term is search for and the suggestions are returned', () => {
        beforeEach(() => {
            controller.term = 'foo';
            controller.onChange();
            scope.$digest();
        });

        it('Then parses the existing selected stocks from the suggestions', () => {
            expect(controller.suggestions).not.toContain({
                symbol: 'C',
                company: 'Citigroup Inc.'
            });
        });

        describe('When a suggested stock is selected', () => {
            beforeEach(() => {
                scope.onSelect.calls.reset();
                $suggestionService.getSuggestions.calls.reset();
                controller.select(suggestions[0]);
            });

            it('Then calls the on-select callback', () => {
                expect(scope.onSelect).toHaveBeenCalledWith(suggestions[0]);
            });

            it('Then resets the term property', () => {
                expect(controller.term).toEqual('');
            });

            it('Then calls $suggestionService.getSuggestions', () => {
                expect($suggestionService.getSuggestions).toHaveBeenCalledWith('');
            });
        });
    });
});