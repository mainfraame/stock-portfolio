'use strict';

import { createHashHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRedirect, useRouterHistory } from 'react-router';

import { Provider } from 'react-redux';

import App from 'controllers/app.jsx';
import Dashboard from 'controllers/dashboard.jsx';
import Home from 'controllers/home.jsx';
import socket from 'utils/websocket.jsx'

import configureStore from 'stores/stocks';


socket.onopen = () => {
    const store = configureStore({
        stocks: [],
        suggestions: []
    });

    const Main = <Provider store={store}>
        <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
            <Route path="/" component={App}>
                <IndexRedirect to="home"/>
                <Route path="home" components={{main: Home}}/>
                <Route path="dashboard" components={{main: Dashboard}}/>
            </Route>
        </Router>
    </Provider>;


    console.log('connection made');
    render(Main, document.getElementById('app'));
};
