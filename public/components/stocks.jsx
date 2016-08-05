'use strict';

import React from 'react';

export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ul className="stock-list">
            {this.props.stocks.map((stock)=> {
                return <li>{stock.company} {stock.symbol}</li>;
                //console.log(stock);
                //var stock = this.prop.stocks[quote];
                //var status = Number(stock.Change) > 0 ? 'positive' : 'negative';
                //return <li className={status} key={quote}>
                //    <button onClick={this.remove.bind(this, quote)}>X</button>
                //    <h1>{stock.symbol}</h1>
                //
                //    <p title={stock.Name}>{stock.Name}</p>
                //
                //    <p>{parseFloat(stock.Ask).toFixed(2)}</p>
                //
                //    <p>{parseFloat(stock.Bid).toFixed(2)}</p>
                //
                //    <p>$ {parseFloat(stock.Change).toFixed(2)}</p>
                //
                //    <p>{parseFloat(stock.ChangeinPercent).toFixed(2)}</p>
                //</li>;
            })}
        </ul>
    }
};