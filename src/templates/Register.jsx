'use strict';

const React = require('react');
const Component = require('../base/Component');



class Register extends Component {

    constructor() {
        super();

        this._clickHandler = this._clickHandler.bind(this);
    }

    _clickHandler() {

        let data = {
            username: this.refs.username.value,
            fullName: this.refs.fullName.value,
            password: this.refs.password.value,
            confirmPassword: this.refs.rePassword.value
        };
        this.props.triggerEvent('register', data);
    }
    render() {
        return (
            <div>
                <header id="register-title" className="blog-title">
                    register
                </header>

                <div className="user-login-block">
                    <form className="user-register">
                        <h1 className="form-title">Username:</h1>
                        <input ref="username" type="text"  placeholder="Enter Username" id="username" />
                        <h1 className="form-title">Full Name:</h1>
                        <input ref="fullName" type="text"  placeholder="Enter Full Name" id="full-name" />
                        <h1 className="form-title">Password:</h1>
                        <input ref="password" type="password"  placeholder="Enter password" id="password" />
                        <h1 className="form-title">Confirm Password:</h1>
                        <input ref="rePassword" type="password"  placeholder="Re-Enter password" id="pass-confirm" />
                        <br/>

                            <button type="button" id="register-request-button" onClick={this._clickHandler}>Register</button>
                    </form>
                    <a href="#/login">Login here</a>
                </div>

            </div>
        )
    }
}

module.exports = Register;
