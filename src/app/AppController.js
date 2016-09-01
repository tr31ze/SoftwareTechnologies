'use strict';

require('../scripts/libs/framework');
import {showPopup} from '../scripts/libs/framework';


const Controller = require('react-redux-oop').Controller;

/*
I am not using this controller in the project yet...
 */

class AppController extends Controller {

    constructor(requester, baseUrl, appKey) {
        super();

        this._requester = requester;

        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
        this._userServiceUrl = baseUrl + "/user/" + appKey + "/";
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

    showLoginPage(isLoggedIn, triggerEvent, store) {
        let location = 'login';
        store.dispatch({type: 'SET_LOCATION', action: {location}});
        // this._userView.showLoginPage(isLoggedIn, triggerEvent);

        // this._store.dispatch({type: 'SHOW_LOGIN_PAGE', isLoggedIn, triggerEvent});
    }

    showRegisterPage(isLoggedIn, triggerEvent, store) {
        // this._userView.showRegisterPage(isLoggedIn, triggerEvent);

        let location = 'register';
        store.dispatch({type: 'SET_LOCATION', action: {location}});
    }

    register(data, showPopup, redirectUrl, store) {
        if(data.username.length < 6) {
            showPopup('error', 'Username must be at least 6 characters');
            return;
        }

        if(data.fullName.length < 6) {
            showPopup('error', 'Full name must be at least 6 characters');
            return;
        }

        if(data.password.length < 6) {
            showPopup('error', 'Password must be at least 6 characters');
            return;
        }

        if(data.password != data.confirmPassword) {
            showPopup('error', 'Password doesn\'t match');
            return;
        }

        delete data['confirmPassword'];

        this._requester.post(
            this._userServiceUrl,
            data,
            data => {
                showPopup('success', 'Successfully registered');

                // redirectUrl('#/login');

                let location = 'login';
                store.dispatch({type: 'SET_LOCATION', action: {location}});

            }, error => {
                showPopup('error', 'Something went wrong');

            }
        )
    }

    login(data, showPopup, redirectUrl, store) {
        let requestUrl = this._userServiceUrl + 'login';

        console.log(data);

        this._requester.post(requestUrl, data, response => {
            showPopup('success', 'Successfully logged in');
            sessionStorage.setItem('username', response.username);
            sessionStorage.setItem('_authToken', response._kmd.authtoken);
            sessionStorage.setItem('fullName', response.fullName);
            store.dispatch({type: 'LOGIN', response});
            redirectUrl('#/');
        }, error => {
            showPopup('error', 'Something went wrong');

        })
    }

    logout(redirectUrl, store) {
        sessionStorage.clear();

        store.dispatch({type: 'LOGOUT'});

        redirectUrl('#/');
    }
}


module.exports = AppController;
