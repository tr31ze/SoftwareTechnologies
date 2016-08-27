'use strict';

const React = require('react');
const Component = require('../../base/Component');

const MainContent = require('./components/MainContent');
const CreatePost = require('../CreatePost');
const Footer = require('../Footer');

let MainComponent = null;

class WelcomeUser extends Component {
    _renderView() {
        switch(this.props.location) {
            case 'create-post':
                MainComponent = <CreatePost triggerEvent={this.props.triggerEvent}/>;
                break;
            case 'register':
                MainComponent = <Register />;
                break;
            default:
                MainComponent = <MainContent posts={this.props.posts} />;
                break;
        }
        return MainComponent;
    }

    render() {

        return (

            <div>
                {this._renderView()}
            </div>
        )
    }
}

module.exports = WelcomeUser;
