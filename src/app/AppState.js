'use strict';


const AppState = {
    user: null,
    isLogged: false,
    location: 'home',
    posts: null,
    recentPosts: null
};


module.exports = require('seamless-immutable')(AppState);
