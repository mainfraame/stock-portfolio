'use strict';

import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [
                {
                    name: 'home',
                    href: '/home'
                },
                {
                    name: 'dashboard',
                    href: '/dashboard'
                }
            ]
        };
    }

    createLink(state) {
        return <Link to={state.href} activeClassName="selected">{state.name}</Link>;
    }

    render() {
        return <section className="main">
            <ul className="navigation">
                {this.state.routes.map((state, i) => {
                    return <li key={i+'-menu-link'}>{this.createLink(state)}</li>;
                })}
            </ul>
            <section className="viewport">
                {this.props.main}
            </section>
        </section>;
    }
}

export default App;