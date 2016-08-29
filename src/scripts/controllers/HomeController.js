'use strict';

require('../libs/framework');
import {showPopup} from '../libs/framework';

module.exports = class HomeController {
    constructor( requester, baseUrl, appKey) {
        this._requester = requester;

        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }


    showPage(loggedIn, showPopup, store) {
        let recentPosts = [];
        this._requester.get(this._baseServiceUrl,

            data => {
                let currentId = 1;

                data.sort((elem1, elem2) => {
                   let date1 = new Date(elem1._kmd.ect);
                   let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                for(let i = 0; i < data.length && i < 5; i++) {
                    data[i].postId = currentId;
                    currentId++;

                    recentPosts.push(data[i]);

                }
                showPopup('success', 'Data loaded');
                let location = 'home';

                store.dispatch({type: 'SET_DATA', action: {data, recentPosts, loggedIn}} );
                store.dispatch({type: 'SET_LOCATION', action: {location}});
                store.dispatch({type: 'CLEAR_MODAL'})
            },
            error => {
                showPopup('error', 'failed to load')
            });
    }

    showSinglePost(postId, store) {
        store.dispatch({type: 'SINGLE_POST', postId});
    }
};
