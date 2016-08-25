'use strict';

const React = require('react');
const Component = require('../../../base/Component');

const Posts = require('./../../Posts');

class MainContent extends Component {
    render() {
        return (
            <main className="main-content">
                <header className="blog-title">
                    <h3>home</h3>
                </header>
                <Posts posts={this.props.posts}/>
            </main>
        )
    }
}

module.exports = MainContent;
