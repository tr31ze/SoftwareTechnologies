'use strict';

const React = require('react');
const Component = require('../../../base/Component');

const Posts = require('./../../Posts');

class MainContent extends Component {

    render() {
        let filteredPosts = [];
        if(this.props.posts) {
            filteredPosts = this.props.posts.map(post => {
                if(!post.isPrivate) {
                    return post;
                }
            });
        }
        return (
            <main className="main-content">
                <header className="blog-title">
                    <h3>home</h3>
                </header>
                <Posts posts={filteredPosts}/>
            </main>
        )
    }
}

module.exports = MainContent;
