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

                    <h2 className="recent-posts-title">Recent Posts</h2>
                    <hr/>

                </nav>
            </header>
        )
    }
}

module.exports = Header;
