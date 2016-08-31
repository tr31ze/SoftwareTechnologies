'use strict';

const React = require('react');
const Component = require('../../base/Component');

const MainContent = require('./components/MainContent');
const Login = require('../User/components/Login');
const Register = require('../User/components/Register');
const Footer = require('../../app/components/Footer');

let MainComponent = null;
class WelcomeGuest extends Component {

    _renderView() {
        switch(this.props.location) {
            case 'login':
                MainComponent = <Login triggerEvent={this.props.triggerEvent}/>;
                break;
            case 'register':
                MainComponent = <Register triggerEvent={this.props.triggerEvent}/>;
                break;
            default:
                MainComponent = <MainContent posts={this.props.posts} />;
                break;
        }
        return MainComponent;
    }

    render() {
        console.log(this.props);
        return (

            <div>
                {this._renderView()}
            </div>
        )
    }
}

module.exports = WelcomeGuest;
