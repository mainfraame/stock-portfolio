'use strict';

import React from 'react';
import Stocks from 'components/stocks.jsx';
import TypeAhead from 'components/typeahead.jsx';
import socket from 'utils/websocket.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from 'actions/stocks';
import * as suggestionActions from 'actions/suggestions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        //this.connections = [];
        //this.state = {
        //    quote: '',
        //    quotes: {}
        //};
    }

    //componentWillUnmount() {
    //    this.connections.forEach(Function.prototype.call, Function.prototype.call);
    //}

    //updateState(data) {
    //    this.state.quotes[data.ticker] = data.quote;
    //    this.setState(this.state);
    //}

    //remove(quote) {
    //    delete this.state.quotes[quote];
    //    socket.unsubscribe(quote);
    //    this.setState(this.state);
    //}

    //setStock(e) {
    //    if (e.which === 13) {
    //        this.connections.push(socket.subscribe(e.target.value, (state) => this.updateState(state)));
    //        e.target.value = '';
    //    } else {
    //
    //    }
    //}

    onKeyUp(symbol) {
        this.props.getSuggestions(symbol);
    }

    onSelect(symbol) {
        this.props.addStock(symbol);
    }

    render() {
        console.log(this.props);
        return <section className="quotes">
            <TypeAhead onSelect={this.onSelect.bind(this)}
                       onKeyUp={this.onKeyUp.bind(this)}
                       suggestions={this.props.suggestions}/>
            <Stocks stocks={this.props.stocks}/>
        </section>;
    }
}

function mapStateToProps(state) {
    return {
        stocks: state.stocks,
        suggestions: state.suggestions
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, stockActions, suggestionActions), dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);