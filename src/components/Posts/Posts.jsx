'use strict';

const React = require('react');
const Component = require('../../base/Component');

const CommentBox = require('./components/CommentsBox');

class Posts extends Component {

    static propTypes = {
        posts: React.PropTypes.any
    };

    renderPosts() {

        return this.props.posts.map((post, index) => {
            let id = "post-" + (index + 1);
            return (
                <li className="single-post" key={index}>
                    <article id={id}>
                        <div className="dot">&nbsp;</div>
                        <h3 className="title">
                            {this.props.isLogged ? <a href={"#/" + id}>{post.title}</a> : post.title}
                        </h3>
                        <p className="subtitle">Posted on {post.date} by {post.author}</p>
                        <p className="content">{post.content}</p>
                        {this.props.isLogged ? <a href={"#/" + id} className="post-footer">Continue reading...</a> : <a href="#/login" className="post-footer">Login to see the full article</a>}


                    </article>
                </li>
            )
        })
    }

    render() {
        if(!this.props.posts) return <div></div>;
        return (
            <ul key="posts" className="articles" id="article">
                {this.renderPosts()}
            </ul>
        )
    }
}

module.exports = Posts;
