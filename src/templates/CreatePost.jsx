'use strict';

const React = require('react');
const Component = require('../base/Component');
const moment = require('moment');



class CreatePost extends Component {

    constructor() {
        super();

        this._clickHandler = this._clickHandler.bind(this)
    }

    _clickHandler(e) {

        let data = {
            title: this.refs.title.value,
            content: this.refs.content.value,
            author: this.refs.author.value,
            date: moment().format("MMMM Do YYYY")
        }

        this.props.triggerEvent('createPost', data);
    }

    render() {
        return (
            <div className="new-post-wrapper">
                <div className="new-post-block">
                    <h2 id="editor-title">New post</h2>
                    <form id="post-form">
                        <ul className="title-author">
                            <li className="single-element-form">
                                <h1 className="title-form">Blog Post Title:</h1>
                                <input type="text"  placeholder="Title" id="title" ref="title"/>
                            </li>
                            <li className="single-element-form">
                                <h1 className="title-form">Author:</h1>
                                <input ref="author" type="text" value={this.props.user.fullName || "Guest"} placeholder={this.props.user.fullName || "Guest"} id="author" disabled  />
                            </li>
                        </ul>

                        <h1 className="title-form">Content:</h1>
                        <textarea ref="content" className="content-field" placeholder="Content" id="content"></textarea>
                        <br/>
                            <button type="button" id="create-new-post-request-button" onClick={this._clickHandler}>Publish</button>
                    </form>
                </div>

            </div>
        )
    }

}

module.exports = CreatePost;
