import angular from 'angular';
import '../../src/components/index';

describe('Given StocksIndicator component is rendered', () => {
    let element;
    let scope;

    const scenarios = [
        {
            change: '+1.25%',
            expect: 'glyphicon glyphicon-arrow-up green'
        },
        {
            change: '-1.25%',
            expect: 'glyphicon glyphicon-arrow-down red'
        },
        {
            change: '+0.00%',
            expect: undefined
        }
    ];

    scenarios.forEach((scenario) => {
        describe('When StocksIndicator is rendered with change value of' + scenario.change, () => {
            beforeEach(angular.mock.module('components'));
            beforeEach(angular.mock.inject(($rootScope, $compile) => {
                scope = $rootScope.$new();
                element = angular.element('<stock-indicator change="change"></stock-indicator>');
                element = $compile(element)(scope);
                scope.change = scenario.change;
                $rootScope.$digest();
            }));

            it('Then the element should have the class(es)' + scenario.expect, () => {
                expect(element.find('i').attr('class')).toEqual(scenario.expect);
            });
        });
    });
});