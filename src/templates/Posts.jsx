'use strict';

const React = require('react');
const Component = require('../base/Component');

class Posts extends Component {

    static propTypes = {
        posts: React.PropTypes.any.isRequired
    };

    renderPosts() {
        return this.props.posts.map((post, index) => {
            let id = "post-" + post.postId;
            return (
                <li className="single-post" key={index}>
                    <article id={id}>
                        <div className="dot">&nbsp;</div>
                        <h3 className="title">{post.title}</h3>
                        <p className="subtitle">Posted on {post.date} by {post.author}</p>
                        <p className="content">{post.content}</p>
                    </article>
                </li>
            )
        })
    }

    render() {
        return (
            <ul key="posts" className="articles" id="article">
                {this.renderPosts()}
            </ul>
        )
    }
}

module.exports = Posts;
