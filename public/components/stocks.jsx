'use strict';

import React from 'react';

export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
        return (
            <tr key={stock.symbol}>
                <td>
                    {stock.company}
                </td>
                <td>
                    {stock.symbol}
                </td>
                <td>
                    {stock.LastTradePriceOnly || 0}
                </td>
                <td>
                    <input type='text'
                           className="form-control"
                           onKeyUp={this.onAmountChange.bind(this,stock)}
                           defaultValue={stock.amount}/>
                </td>
                <td>
                    {((stock.LastTradePriceOnly || 0) * Number(stock.amount)).toFixed(2)}
                </td>
                <td>
                    <button className="glyphicon glyphicon-trash"
                            onClick={this.props.onRemove.bind(this,stock)}/>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-striped">
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