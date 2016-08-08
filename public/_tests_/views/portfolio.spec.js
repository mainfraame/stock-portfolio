import angular from 'angular';
import portfolio from '../../views/index';
import quotes from '../fixtures/quotes';
import quotedStocks from '../fixtures/quotedStocks';
import stocks from '../fixtures/stocks';

describe('Given Portfolio component is rendered', function () {
    var controller;
    var scope;
    var $interval;
    var $stocksService = {
        createStock: function () {
        },
        getAll: function () {
        },
        getQuotes: function () {
        },
        removeStock: function () {
        },
        updateShares: function () {
        }
    };

    var newStock = {
        id: 6,
        company: 'Alphabet Inc.',
        shares: 1,
        symbol: 'GOOGL'
    };

    beforeEach(angular.mock.module('views', function ($provide) {
        $provide.value('stocksService', $stocksService);
    }));

    beforeEach(angular.mock.inject(function ($injector) {
        var $componentController = $injector.get('$componentController');
        var $rootScope = $injector.get('$rootScope');
        var $q = $injector.get('$q');

        $interval = $injector.get('$interval');

        spyOn($interval, 'cancel');
        spyOn($stocksService, 'getAll').and.returnValue($q.when(stocks));
        spyOn($stocksService, 'getQuotes').and.returnValue($q.when(quotes));
        spyOn($stocksService, 'createStock').and.returnValue($q.when(newStock));
        spyOn($stocksService, 'removeStock').and.returnValue($q.when({}));

        scope = $rootScope.$new();
        controller = $componentController('portfolio', {$scope: scope}, {});
        scope.$digest();
    }));

    it('Then calls $stocksService.getAll', function () {
        expect($stocksService.getAll).toHaveBeenCalled();
    });

    it('Then calls $stocksService.getQuotes with the returned stocks array', function () {
        expect($stocksService.getQuotes).toHaveBeenCalledWith(controller.stocks);
    });

    it('Then merges the quotes with the stocks array', function () {
        expect(controller.stocks).toEqual(quotedStocks);
    });

    describe('When the onSelect method is called', function () {
        beforeEach(function () {
            $stocksService.getQuotes.calls.reset();
            controller.onSelect(newStock);
            scope.$digest();
        });

        it('Then calls $stocksService.createStock with new stock object', function () {
            expect($stocksService.createStock).toHaveBeenCalledWith(newStock);
        });

        it('Then calls $stocksService.getQuotes', function () {
            expect($stocksService.getQuotes).toHaveBeenCalled();
        });
    });

    describe('When the removeSelect method is called', function () {
        var removedStock;
        beforeEach(function () {
            removedStock = controller.stocks[0];
            controller.removeStock(removedStock);
            scope.$digest();
        });

        it('Then removes the stock from the stocks array', function () {
            expect(controller.stocks).not.toContain(removedStock);
        });
    });

    describe('When the pull interval is reached for getQuotes', function () {
        beforeEach(function () {
            $stocksService.getQuotes.calls.reset();
            $interval.flush(5000);
            scope.$digest();
        });

        it('Then calls $stocksService.getQuotes', function () {
            expect($stocksService.getQuotes).toHaveBeenCalled();
        });
    });

    describe('When $onDestroy is called', function () {
        beforeEach(function () {
            controller.$onDestroy();
        });

        it('Then cancels the interval', function () {
            expect($interval.cancel).toHaveBeenCalled();
        });
    });
});