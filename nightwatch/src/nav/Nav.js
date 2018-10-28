import React, { Component } from 'react';
import './Nav.css';


class Nav extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className="nav-div">
                <h1>NightWatch</h1>
                <div>
                    <button>Log Out</button>
                </div>
            </div>
        )
    }
}

export default Nav