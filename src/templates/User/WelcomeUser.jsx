'use strict';

const React = require('react');
const Component = require('../../base/Component');

const SideBar = require('./components/SideBar');
const MainContent = require('./components/MainContent');
const Footer = require('../Footer');

class WelcomeUser extends Component {
    render() {
        return (
            <div>
                <SideBar posts={this.props.recentPosts} />
                <MainContent posts={this.props.blogPosts} />
                <Footer/>
            </div>
        )
    }
}

module.exports = WelcomeUser;
