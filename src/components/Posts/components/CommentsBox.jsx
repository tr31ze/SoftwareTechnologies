'use strict';

const React = require('react');
const Component = require('../../../base/Component');
const moment = require('moment');

const SingleComment = require('./Comment');

class CommentsBox extends Component {

    render() {
        return (
            <div className="comments-box">
                {this.props.comments.map((comment, index) => <SingleComment comment={comment} key={index}/>)}
            </div>
        )
    }

}

module.exports = CommentsBox;
