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
            <div>
                <input type="text" onKeyUp={this.onKeyUp.bind(this)}/>
                <ul className="typeAhead">
                    {this.props.suggestions.map((suggestion) => {
                        return <li
                            onClick={this.props.onSelect.bind(this,suggestion)}>{suggestion.company} {suggestion.symbol}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default TypeAhead;