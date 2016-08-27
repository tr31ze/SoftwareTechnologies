'use strict';

const AppState = require('./AppState');


const AppReducers = {

    'APP_INIT': {
        '*': [
            () => AppState
        ]
    },

    'SET_DATA': {
        '*': [
            (state = AppState, action) => {
                console.log(state);
                console.log(action);
                return state
                    .set('posts', action.action.data)
                    .set('recentPosts', action.action.recentPosts)
                    .set('loggedIn', action.action.loggedIn);
            }
        ]
    },

    'SET_LOCATION': {
        '*': [
            (state = AppState, action) => state.set('location', action.action.location)
        ]
    },

    'LOGIN': {
        '*': [
            (state = AppState, action) => {
                return state
                    .set('isLogged', true)
                    .set('user', action.response);
            }
        ]
    },

    'LOGOUT': {
        '*': [
            (state = AppState) => {
                return state
                    .set('isLogged', false)
                    .set('user', null)
            }
        ]
    }

};


module.exports = AppReducers;
