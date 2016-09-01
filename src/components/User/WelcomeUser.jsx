'use strict';

const React = require('react');
const Component = require('../../base/Component');

const MainContent = require('./components/MainContent');
const CreatePost = require('../Posts/CreatePost');
const Footer = require('../../app/components/Footer');

let MainComponent = null;

class WelcomeUser extends Component {
    _renderView() {
        console.log(this.props);
        switch(this.props.location) {
            case 'create-post':
                MainComponent = <CreatePost triggerEvent={this.props.triggerEvent} user={this.props.user}/>;
                break;
            case 'register':
                MainComponent = <Register />;
                break;
            default:
                MainComponent = <MainContent isLogged={this.props.isLogged} modal={this.props.modal} closeModal={this.props.closeModal} posts={this.props.posts} />;
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
