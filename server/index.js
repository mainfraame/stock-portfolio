"use strict";

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressWs = require('express-ws');
const Stocks = require('./stocks');
const request = require('./request');

const app = express();
const stocks = new Stocks();

expressWs(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

app.ws('/', function (ws, req) {
    ws.on('message', onMessage.bind(ws));
});

app.get('/ticker', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json([]);
});

app.get('/ticker/:ticker', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    request('https://chstocksearch.herokuapp.com/api/' + req.params.ticker, res.json.bind(res));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function onMessage(msg) {
    msg = JSON.parse(msg);

    switch (msg.type) {
        case 'subscribe':
            stocks.subscribe(this, msg.data.ticker);
            break;
        case 'unsubscribe':
            stocks.unsubscribe(this, msg.data.ticker);
            break;
    }
}

module.exports = app;