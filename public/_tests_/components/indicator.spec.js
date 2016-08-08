import angular from 'angular';
import '../../components/index';

var element;
var scope;

var scenarios = [
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
        expect: ''
    }
];

scenarios.forEach(function (scenario,i) {
    describe('Given StocksIndicator component is rendered with change value of ' + scenario.change, function () {
        beforeEach(angular.mock.module('components'));
        beforeEach(angular.mock.inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element('<stock-indicator change="change"></stock-indicator>');
            element = $compile(element)(scope);
            scope.change = scenario.change;
            $rootScope.$digest();
        }));

        it('Then the element should have the class(es)' + scenario.expect, function () {
            expect(element.find('i').attr('class')).toContain(scenario.expect);
        });
    });
});