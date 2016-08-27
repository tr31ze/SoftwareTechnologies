'use strict';

const React = require('react');
const Component = require('../../base/Component');


class Header extends Component {
    render() {
        return (
            <header className="header">
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
            </header>
        )
    }
}

module.exports = Header;
