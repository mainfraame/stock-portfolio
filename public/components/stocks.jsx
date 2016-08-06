'use strict';

import React from 'react';

export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.pullPrices();
        this.pull = setInterval(this.pullPrices.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.pull);
    }

    pullPrices() {
        this.props.getQuotes(this.props.stocks);
    }

    onAmountChange(stock, e) {
        stock.amount = e.target.value;
        this.props.onAdjustAmount(stock);
    }

    createRow(stock) {
        let changeClass = parseFloat(stock.PercentChange || 0) > 0 ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down';

        return (
            <tr key={stock.symbol}>
                <td>{stock.company}</td>
                <td>{stock.symbol}</td>
                <td>{stock.LastTradePriceOnly || 0}</td>
                <td>
                    <input type='text'
                           className='form-control'
                           onKeyUp={this.onAmountChange.bind(this,stock)}
                           defaultValue={stock.amount}/>
                </td>
                <td>
                    {((stock.LastTradePriceOnly || 0) * Number(stock.amount)).toFixed(2)}
                    <span className={changeClass}/>
                </td>
                <td>
                    <button className='btn btn-primary'
                            onClick={this.props.onRemove.bind(this,stock)}>
                        <i className='glyphicon glyphicon-trash'/>
                    </button>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Symbol</th>
                    <th>Last Price</th>
                    <th># of Shares</th>
                    <th>Market Value</th>
                    <th>-</th>
                </tr>
                </thead>
                <tbody>
                {this.props.stocks.map(this.createRow.bind(this))}
                </tbody>
            </table>
        );
    }
};