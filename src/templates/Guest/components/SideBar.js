'use strict';

const React = require('react');
const Component = require('../../../base/Component');

const RecentPosts = require('./../../RecentPosts');

class SideBar extends Component {
    render() {
        return (
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
        )
    }
}

module.exports = SideBar;
