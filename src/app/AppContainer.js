'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Container = require('react-redux-oop').Container;

const GuestView = require('../templates/Guest/WelcomeGuest');
const UserView = require('../templates/User/WelcomeUser');
const GuestHeader = require('./components/GuestHeader');
const UserHeader = require('./components/UserHeader');
const Footer = require('../templates/Footer');

import {triggerEvent} from '../scripts/libs/framework'

require('../styles/style.less');

class AppContainer extends Container {
    static mapper(state) {
        return {
            user: state.user,
            isLogged: state.isLogged,
            location: state.location,
            posts: state.posts,
            recentPosts: state.recentPosts
        };
    }

    actions = {
        triggerEvent: triggerEvent
    };

    render() {
        let location = this.props.location;
        let isLogged = this.props.isLogged;
        return (
            <div className="app">
                {isLogged ? <UserHeader /> : <GuestHeader />}
                {isLogged ? <UserView posts={this.props.posts} recentPosts={this.props.recentPosts} location={this.props.location} triggerEvent={this.actions.triggerEvent}/> : <GuestView posts={this.props.posts} location={this.props.location} triggerEvent={this.actions.triggerEvent}/>}
                <Footer />
            </div>
        )
    }
}

module.exports = AppContainer.connect();
