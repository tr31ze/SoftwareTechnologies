'use strict';

module.exports = class UserController {
    constructor(userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;

        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";
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
            this._baseServiceUrl,
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
        let requestUrl = this._baseServiceUrl + 'login';

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
