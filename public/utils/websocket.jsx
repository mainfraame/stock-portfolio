'use strict';

export default Object.assign(new WebSocket("ws://localhost:3000"), {
    events: {},
    on: function (event, fn) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        if (this.events[event].indexOf(fn) === -1) {
            this.events[event].push(fn);
            return function (event, fn) {
                this.events[event].splice(this.events[event].indexOf(fn), 1);
                this.unsubscribe(event);
            }.bind(this, event, fn);
        }
    },
    onmessage: function (e) {
        var data = JSON.parse(e.data);

        if (this.events[data.ticker]) {
            this.events[data.ticker].forEach((fn)=> {
                fn(data);
            });
        }
    },
    subscribe: function (ticker, fn) {
        this.send(JSON.stringify({
            type: 'subscribe',
            data: {
                ticker: ticker
            }
        }));

        return this.on(ticker, fn);
    },
    unsubscribe: function (ticker) {
        this.send(JSON.stringify({
            type: 'unsubscribe',
            data: {
                ticker: ticker
            }
        }));
    }
});