'use strict';

module.exports = class PostController {
    constructor(requester, baseUrl, appKey) {
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
        if(!data.author.length || data.content.length < 20 || !data.title.length) {
            showPopup('error', 'Something is missing in the article');
            return;
        }

        this._requester.post(this._baseServiceUrl, data, response => {
            showPopup('success', "Successfully created Post");
            redirectUrl('#/');
        }, error => {
            showPopup('error', 'Failed to create post');
        })
    }
}
