'use strict';

const React = require('react');
const Component = require('../../base/Component');

const SideBar = require('./components/SideBar');
const MainContent = require('./components/MainContent');
const Footer = require('../Footer');

class WelcomeGuest extends Component {

    render() {
        console.log(SideBar);
        return (
            <div>
                <SideBar posts={this.props.recentPosts} />
                <MainContent posts={this.props.blogPosts} />
                <Footer/>
            </div>
        )
    }
}

module.exports = WelcomeGuest;
