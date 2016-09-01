'use strict';

const React = require('react');
const Component = require('../../../base/Component');

class Login extends Component {

    constructor() {
        super();

        this._clickHandler = this._clickHandler.bind(this);
    }

    _clickHandler() {
        let data = {
            username: this.refs.username.value,
            password: this.refs.password.value
        };
        this.props.triggerEvent('login', data);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="login-page">
                <header className="blog-title">
                    <h3>login</h3>
                </header>

                <div className="user-login-block">
                    <form>
                        <h1 className="form-title">Username:</h1>
                        <input ref="username" type="text" placeholder="Enter Username" id="username"/>
                        <h1 className="form-title">Password:</h1>
                        <input ref="password" type="password"  placeholder="Enter password" id="password" />
                            <br/>
                                <button type="button" id="login-request-button" onClick={this._clickHandler}>Login</button>
                    </form>
                    <a href="#/register"><span className="inner-link">Register here</span></a>
                </div>

            </div>
        )
    }
}

module.exports = Login;
