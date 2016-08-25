'use strict';

const React = require('react');
const Component = require('../base/Component');

const CreatePost = require('./CreatePost');
const Login = require('./Login');

class FormUser extends Component {
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
                                    <a href="#/posts/create" className="single-menu-element-link">
                                        Create Post
                                    </a>
                                </li>

                                <li className="single-menu-element">
                                    <a href="#/logout" className="single-menu-element-link">
                                        Logout
                                    </a>
                                </li>
                            </ul>

                        </nav>
                </aside>
                <main className="main-content">
                    {this.props.login ? <Login triggerEvent={this.props.triggerEvent}/> : <CreatePost triggerEvent={this.props.triggerEvent} name={this.props.fullName} />}
                </main>
            </div>
        )
    }
}

module.exports = FormUser;
