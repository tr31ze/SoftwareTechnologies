'use strict';


const AppState = {
    user: null,
    isLogged: false,
    location: 'home',
    posts: null,
    recentPosts: null,
    modal: {
        isOpen: false,
        post: null
    }
};


module.exports = require('seamless-immutable')(AppState);
