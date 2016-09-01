'use strict';

const React = require('react');
const Component = require('../../base/Component');

const ModalWindow = require('react-modal');
const CommentBox = require('../Posts/components/CommentsBox');

class Modal extends Component {

    afterOpen() {
        console.log("Open");
    }

    render() {
        let post = this.props.post || null;

        let customStyle = {

            overlay : {
                position          : 'fixed',
                top               : 0,
                left              : 0,
                right             : 0,
                bottom            : 0,
                backgroundColor   : 'rgba(128, 127, 120, 0.75)'
            },

            content: {
                top                        : '20%',
                left                       : '20%',
                right                      : '20%',
                bottom                     : '20%',
                border                     : '3px solid darkturquoise',
                background                 : '#fff',
                overflow                   : 'auto',
                WebkitOverflowScrolling    : 'touch',
                borderRadius               : '2%',
                outline                    : 'none',
                padding                    : '2%'
            }
        };

        return (
            <div>
                <ModalWindow
                    isOpen={this.props.isOpen}
                    style={customStyle}
                    onAfterOpen={this.afterOpen}
                    onRequestClose={this.props.closeModal}
                    >
                    <div className="single-post-modal">
                        <article>
                            <h2 className="title">{post ? post.title : null}</h2>
                            <p className="subtitle">Posted on {post ? post.date : null} by {post ? post.author : null}</p>
                            <p className="content">{post ? post.content : null}</p>
                        </article>
                        <div className="post-link">
                            <a href={post ? post.link : null}>See the full article here</a>
                        </div>
                        {post ? post.comments ? <CommentBox comments={post.comments}/> : null : null}
                    </div>


                    <button onClick={this.props.closeModal}>close</button>

                </ModalWindow>
            </div>
        )
    }
}

module.exports = Modal;
