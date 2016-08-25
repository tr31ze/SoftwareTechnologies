'use strict';

const React = require('react');
const Component = require('../base/Component');

const CreatePost = require('./CreatePost');
const Login = require('./Login');
const Register = require('./Register');

class FormGuest extends Component {

    constructor() {
        super();
        this._renderMainComponent = this._renderMainComponent.bind(this);
    }

    _renderMainComponent() {
        let MainComponent;
        switch(this.props.type) {
            case "login":
                MainComponent = Login;
                break;
            case "register":
                MainComponent = Register;
                break;
            case "createPost":
                MainComponent = CreatePost;
                break;
            default:
                break;
        }
        return <MainComponent triggerEvent={this.props.triggerEvent} name={this.props.fullName}/>;
    }

    render() {
        return (
            <div>
                <aside className="sidebar">
                    <div className="logo"><img src="images/logo_sidebar.png" alt=""/></div>
                        <nav>
                            <ul>
                                <li className="single-menu-element">
                                    <a href="#/" className="single-menu-element-link">
                                        Home
                                    </a>
                                </li>

                                <li className="single-menu-element">
                                    <a href="#/login" className="single-menu-element-link">
                                        Login
                                    </a>
                                </li>

                                <li className="single-menu-element">
                                    <a href="#/register" className="single-menu-element-link">
                                        Register
                                    </a>
                                </li>
                            </ul>

                        </nav>
                </aside>
                <main className="main-content">
                    {this._renderMainComponent()}
                </main>
            </div>
        )
    }
}

module.exports = FormGuest;
