'use strict';

import angular from 'angular';
import portfolio from '../../components/index';
import stocks from '../fixtures/stocks';
import suggestions from '../fixtures/suggestions';

describe('Given Suggestions component is rendered', function () {
    var controller;
    var scope;
    var element;
    var $suggestionService = {
        getSuggestions: function () {
        }
    };

    beforeEach(angular.mock.module('components', function ($provide) {
        $provide.value('suggestionService', $suggestionService);
    }));

    beforeEach(angular.mock.inject(function ($rootScope, $compile, $q) {
        scope = angular.extend($rootScope.$new(), {
            stocks: stocks,
            onSelect: function () {
            }
        });

        spyOn(scope, 'onSelect');
        spyOn($suggestionService, 'getSuggestions').and.returnValue($q.when(suggestions));

        element = angular.element('<stock-suggestions on-select="onSelect" selected="stocks"></stock-suggestions>');
        element = $compile(element)(scope);
        controller = element.controller('stockSuggestions');

        scope.$digest();
    }));

    describe('When a term is search for and the suggestions are returned', function () {
        beforeEach(function () {
            controller.term = 'foo';
            controller.onChange();
            scope.$digest();
        });

        it('Then parses the existing selected stocks from the suggestions', function () {
            expect(controller.suggestions).not.toContain({
                symbol: 'C',
                company: 'Citigroup Inc.'
            });
        });

        describe('When a suggested stock is selected', function () {
            beforeEach(function () {
                scope.onSelect.calls.reset();
                $suggestionService.getSuggestions.calls.reset();
                controller.select(suggestions[0]);
            });

            it('Then calls the on-select callback', function () {
                expect(scope.onSelect).toHaveBeenCalledWith(suggestions[0]);
            });

            it('Then resets the term property', function () {
                expect(controller.term).toEqual('');
            });

            it('Then calls $suggestionService.getSuggestions', function () {
                expect($suggestionService.getSuggestions).toHaveBeenCalledWith('');
            });
        });
    });
});