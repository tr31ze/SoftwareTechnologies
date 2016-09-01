'use strict';

const React = require('react');
const Component = require('../../../base/Component');
const moment = require('moment');

const SingleComment = require('./Comment');

class CommentsBox extends Component {

    constructor() {
        super();

        this._clickHandler = this._clickHandler.bind(this);
    }

    _clickHandler() {
        let comment = {
            author: this.refs.author.value,
            content: this.refs.content.value
        };
        let currentPostComments = [comment];
        this.props.post.comments.forEach(comment => currentPostComments.push(comment));
        let currentPost = this.props.post;
        currentPost = currentPost.set('comments', currentPostComments);
        this.props.triggerEvent('leaveComment', currentPost);
    }

    render() {
        return (
            <div className="leave-comment">
                <input ref="author" type="text" placeholder="Enter your name" id="author"/>
                <textarea ref="content" type="text" placeholder="Leave your comment here" id="content"/>
                <div id="button">
                    <button type="button" label="comment" id="login-request-button" onClick={this._clickHandler}>comment</button>
                </div>
            </div>
        )
    }

}

module.exports = CommentsBox;
