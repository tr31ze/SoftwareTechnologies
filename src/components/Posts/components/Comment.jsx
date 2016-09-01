'use strict';

const React = require('react');
const Component = require('../../../base/Component');
const moment = require('moment');

class CreatePost extends Component {

    render() {
        let comment = this.props.comment;
        return (
            <div className="single-comment">
                <h4>{comment.author}</h4>
                <div className="comment-content">{comment.content}</div>
            </div>
        )
    }

}

module.exports = CreatePost;
