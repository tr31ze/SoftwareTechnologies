'use strict';

module.exports = class PostController {
    constructor(postView, requester, baseUrl, appKey) {
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }

    showCreatePostsPage(fullName, isLoggedIn, triggerEvent, store) {
        let location = 'create-post';
        store.dispatch({type: 'SET_LOCATION', action: {location}});
        // this._postView.showCreatePostsPage(fullName, isLoggedIn, triggerEvent);
    }

    createPost(data, showPopup, redirectUrl, store) {
        //TODO: validation
        this._requester.post(this._baseServiceUrl, data, response => {
            showPopup('success', "Successfully created Post");
            redirectUrl('#/');
        }, error => {
            showPopup('error', 'Failed to create post');
        })
    }
}
