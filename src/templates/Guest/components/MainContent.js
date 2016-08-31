'use strict';

const React = require('react');
const Component = require('../../../base/Component');

const Posts = require('./../../Posts/Posts');

class MainContent extends Component {

    render() {
        let filteredPosts = [];
        if(this.props.posts) {
            this.props.posts.map(post => {
                console.log(post);
                if(!post.private) {
                   filteredPosts.push(post);
                }
            });
        }
        return (
            <main className="main-content">
                <header className="blog-title">
                    <h3>Learn React</h3>
                </header>
                <Posts posts={filteredPosts}/>
            </main>
        )
    }
}

module.exports = MainContent;
