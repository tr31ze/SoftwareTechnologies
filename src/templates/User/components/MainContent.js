'use strict';

const React = require('react');
const Component = require('../../../base/Component');

const Posts = require('./../../Posts');
const Modal = require('../../Modal/Modal');

class MainContent extends Component {
    render() {
        return (
            <main className="main-content">
                <header className="blog-title">
                    <h3>home</h3>
                </header>
                <Posts isLogged={this.props.isLogged} posts={this.props.posts}/>
                <Modal isOpen={this.props.modal.isOpen} post={this.props.modal.post} closeModal={this.props.closeModal}></Modal>
            </main>
        )
    }
}

module.exports = MainContent;
