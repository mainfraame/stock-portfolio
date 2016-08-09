const bodyParser = require('body-parser');
const controllers = require('./controllers/config.json');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public/dist')));

controllers.forEach((config) => {
    app[config.method](config.path, require(config.controller)[config.controllerMethod]);
});

app.listen(3000, () => {
    console.log('Stock Portfolio @ localhost:3000');
});