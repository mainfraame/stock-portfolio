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

    adjustShares(stock, e) {
        stock.shares = Number(e.target.value);
        this.props.adjustShares(stock);
    }

    createRow(stock) {
        let changeClass = parseFloat(stock.PercentChange || 0) > 0 ?
            'glyphicon glyphicon-arrow-up' :
            'glyphicon glyphicon-arrow-down';

        return (
            <tr key={stock.id}>
                <td>{stock.company}</td>
                <td>{stock.symbol}</td>
                <td>
                    {stock.LastTradePriceOnly || 0}
                    <span className={changeClass}/>
                </td>
                <td>
                    <input type='text'
                           className='form-control'
                           onKeyUp={this.adjustShares.bind(this, stock)}
                           defaultValue={stock.shares}/>
                </td>
                <td>
                    {((stock.LastTradePriceOnly || 0) * stock.shares).toFixed(2)}
                </td>
                <td>
                    <button className='btn btn-primary'
                            onClick={this.props.removeStock.bind(this, stock)}>
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