'use strict';

import React from 'react';
import Stocks from 'components/stocks.jsx';
import TypeAhead from 'components/typeahead.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from 'actions/stocks';
import * as suggestionActions from 'actions/suggestions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <nav className='navbar navbar-default'>
                    <div className='navbar-header'>
                        <a className='navbar-brand'>Stock Portfolio</a>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <TypeAhead onKeyUp={this.props.getSuggestions}
                                   onSelect={this.props.addStock}
                                   suggestions={this.props.suggestions}/>
                    </div>
                </nav>
                <Stocks stocks={this.props.stocks}
                        onAdjustAmount={this.props.adjustAmount}
                        onRemove={this.props.removeStock}
                        getQuotes={this.props.getQuotes}/>
            </section>
        );
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