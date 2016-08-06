'use strict';

import React from 'react';
import { connect } from 'react-redux';

class TypeAhead extends React.Component {

    constructor(props) {
        super(props);
    }

    onKeyUp(e) {
        if (e.which === 13) {
            this.props.onSelect(e.target.value);
        } else {
            this.props.onKeyUp(e.target.value);
        }
    }

    render() {
        return (
            <div className='navbar-form navbar-left type-ahead'>
                <input type='text'
                       className='form-control'
                       onKeyUp={this.onKeyUp.bind(this)}
                       placeholder='search for stock'/>
                <ul>
                    {this.props.suggestions.map((suggestion) => {
                        return (
                            <li onClick={this.props.onSelect.bind(this, suggestion)} key={suggestion.symbol}>
                                {suggestion.company} {suggestion.symbol}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default TypeAhead;