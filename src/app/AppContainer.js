'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Container = require('react-redux-oop').Container;

const Background = require('./components/Background');
const GuestView = require('../components/Guest/WelcomeGuest');
const UserView = require('../components/User/WelcomeUser');
const GuestHeader = require('./components/GuestHeader');
const UserHeader = require('./components/UserHeader');
const Footer = require('./components/Footer');

import {triggerEvent, redirectUrl} from '../scripts/libs/framework'

require('../styles/style.less');


class AppContainer extends Container {
    static mapper(state) {
        return {
            user: state.user,
            isLogged: state.isLogged,
            location: state.location,
            posts: state.posts,
            recentPosts: state.recentPosts,
            modal: state.modal
        };
    }

    actions = {
        triggerEvent: triggerEvent,
        redirectUrl: redirectUrl,
        closeModal: () => {
            this.actions.redirectUrl('#/');
        }
    };

    render() {
        return (
            <div className="app">
                {this.props.isLogged ? <UserHeader /> : <GuestHeader />}
                {this.props.isLogged ?
                    <UserView
                        isLogged={this.props.isLogged}
                        user={this.props.user}
                        posts={this.props.posts}
                        recentPosts={this.props.recentPosts}
                        modal={this.props.modal}
                        closeModal={this.actions.closeModal}
                        location={this.props.location}
                        triggerEvent={this.actions.triggerEvent}
                    />
                    :
                    <GuestView
                        posts={this.props.posts}
                        location={this.props.location}
                        triggerEvent={this.actions.triggerEvent}
                    />
                }
                <Footer />
                <Background/>
            </div>
        )
    }
}

module.exports = AppContainer.connect();
