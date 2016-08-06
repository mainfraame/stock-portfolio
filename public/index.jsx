'use strict';

import { createHashHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Dashboard from 'views/dashboard.jsx';
import configureStore from 'store';
import './assets/style.scss';

const store = configureStore({
    stocks: [],
    suggestions: []
});

const Main = (
    <Provider store={store}>
        <Dashboard/>
    </Provider>
);

render(Main, document.getElementById('app'));