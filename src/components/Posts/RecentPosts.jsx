'use strict';

const React = require('react');
const Component = require('../../base/Component');

class RecentPosts extends Component {

    renderPosts() {
        return this.props.posts.map(post => {
            let key = "1" + post._id;
            let href = "#/post-" + post.postId;
            return (
                <li className="single-recent-post" key={key}>
                    <a href={href} className="single-menu-element-link">
                        {post.title}
                    </a>
                </li>
            )
        })
    }

    render() {
        return (
        <ul className="recent-posts">
            {this.renderPosts()}
        </ul>
        )
    }
}

module.exports = RecentPosts;
