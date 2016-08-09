import angular from 'angular';
import '../../src/views/index';
import quotes from 'json!../fixtures/quotes';
import quotedStocks from 'json!../fixtures/quotedStocks';
import stocks from 'json!../fixtures/stocks';

describe('Given Portfolio component is rendered', () => {
    let controller;
    let scope;
    let $interval;
    const $stocksService = {
        createStock: () => {
        },
        getAll: () => {
        },
        getQuotes: () => {
        },
        removeStock: () => {
        },
        updateShares: () => {
        }
    };

    const newStock = {
        id: 6,
        company: 'Alphabet Inc.',
        shares: 1,
        symbol: 'GOOGL'
    };

    beforeEach(angular.mock.module('views', ($provide) => {
        $provide.value('stocksService', $stocksService);
    }));

    beforeEach(angular.mock.inject(($injector) => {
        const $componentController = $injector.get('$componentController');
        const $rootScope = $injector.get('$rootScope');
        const $q = $injector.get('$q');

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

    it('Then calls $stocksService.getAll', () => {
        expect($stocksService.getAll).toHaveBeenCalled();
    });

    it('Then calls $stocksService.getQuotes with the returned stocks array', () => {
        expect($stocksService.getQuotes).toHaveBeenCalledWith(controller.stocks);
    });

    it('Then merges the quotes with the stocks array', () => {
        expect(controller.stocks).toEqual(quotedStocks);
    });

    describe('When the onSelect method is called', () => {
        beforeEach(() => {
            $stocksService.getQuotes.calls.reset();
            controller.onSelect(newStock);
            scope.$digest();
        });

        it('Then calls $stocksService.createStock with new stock object', () => {
            expect($stocksService.createStock).toHaveBeenCalledWith(newStock);
        });

        it('Then calls $stocksService.getQuotes', () => {
            expect($stocksService.getQuotes).toHaveBeenCalled();
        });
    });

    describe('When the removeSelect method is called', () => {
        let removedStock;
        beforeEach(() => {
            removedStock = controller.stocks[0];
            controller.removeStock(removedStock);
            scope.$digest();
        });

        it('Then removes the stock from the stocks array', () => {
            expect(controller.stocks).not.toContain(removedStock);
        });
    });

    describe('When the pull interval is reached for getQuotes', () => {
        beforeEach(() => {
            $stocksService.getQuotes.calls.reset();
            $interval.flush(5000);
            scope.$digest();
        });

        it('Then calls $stocksService.getQuotes', () => {
            expect($stocksService.getQuotes).toHaveBeenCalled();
        });
    });

    describe('When $onDestroy is called', () => {
        beforeEach(() => {
            controller.$onDestroy();
        });

        it('Then cancels the interval', () => {
            expect($interval.cancel).toHaveBeenCalled();
        });
    });
});