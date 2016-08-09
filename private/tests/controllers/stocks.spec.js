const request = require('request');
const stocks = require('../fixtures/stocks.json');

process.env.NODE_ENV = 'test';

describe('Given the server starts', () => {
    let app;
    let createdStock;
    const port = 4000;

    beforeAll((done) => {
        app = require('../../src/app.js').listen(port, done);
    });

    afterAll(() => {
        app.close();
    });

    describe('When localhost:' + port + '/stocks POST is called', () => {

        beforeAll((done) => {
            request({
                url: 'http://localhost:' + port + '/stocks',
                method: 'POST',
                json: stocks[0]
            }, (error, response, body) => {
                createdStock = body;
                done();
            });
        });

        it('Then returns the newly created stock object', () => {
            expect(createdStock).toEqual(jasmine.objectContaining(stocks[0]));
        });

        it('Then sets the id property on the newly created stock object', () => {
            expect(createdStock.id).toBeDefined();
        });
    });

    describe('When localhost:' + port + '/stocks GET is called', () => {
        let result;

        beforeAll((done) => {
            request({
                url: 'http://localhost:' + port + '/stocks',
                json: true
            }, (error, response, body) => {
                result = body;
                done();
            });
        });

        it('Then returns the newly created stock object', () => {
            expect(result).toContain(jasmine.objectContaining(stocks[0]));
        });
    });

    describe('When localhost:' + port + '/stocks PUT is called', () => {
        let result;

        beforeAll((done) => {
            request({
                url: 'http://localhost:' + port + '/stocks',
                method: 'PUT',
                json: {
                    id: createdStock.id,
                    shares: 4
                }
            }, (error, response, body) => {
                result = body;
                done();
            });
        });

        it('Then updates the newly created stock objects shares property', () => {
            expect(result.shares).toEqual(4);
        });
    });

    describe('When localhost:' + port + '/stocks DELETE is called', () => {
        let result;

        beforeAll((done) => {
            request({
                url: 'http://localhost:' + port + '/stocks/' + createdStock.id,
                method: 'DELETE'
            }, (error, response, body) => {
                result = body;
                done();
            });
        });

        it('Then returns the deleted share object', () => {
            expect(result).toContain(createdStock.id);
        });
    });
});