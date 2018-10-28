import React, { Component } from 'react';



class Login extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>Please Login</h1>
                <h3>Company Login</h3>
                <input />
                <h3>Company Passcode</h3>
                <input />
                <button>Create Account</button>
                <button>Login</button>
            </div>
        )
    }
}

export default Login