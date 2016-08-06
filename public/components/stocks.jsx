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
                    {stock.symbol}
                </td>
                <td>
                    {stock.company}
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
                    {(stock.LastTradePriceOnly || 0) * Number(stock.amount)}
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
                <tbody>
                {this.props.stocks.map(this.createRow.bind(this))}
                </tbody>
            </table>
        );
    }
};


//{this.props.stocks.map((stock)=> {
//    return <li>{stock.company} {stock.symbol}</li>;
//    //console.log(stock);
//    //var stock = this.prop.stocks[quote];
//    //var status = Number(stock.Change) > 0 ? 'positive' : 'negative';
//    //return <li className={status} key={quote}>
//    //    <button onClick={this.remove.bind(this, quote)}>X</button>
//    //    <h1>{stock.symbol}</h1>
//    //
//    //    <p title={stock.Name}>{stock.Name}</p>
//    //
//    //    <p>{parseFloat(stock.Ask).toFixed(2)}</p>
//    //
//    //    <p>{parseFloat(stock.Bid).toFixed(2)}</p>
//    //
//    //    <p>$ {parseFloat(stock.Change).toFixed(2)}</p>
//    //
//    //    <p>{parseFloat(stock.ChangeinPercent).toFixed(2)}</p>
//    //</li>;
//})}