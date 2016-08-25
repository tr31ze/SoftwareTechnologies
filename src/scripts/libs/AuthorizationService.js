'use strict';


let _guestCredentials;
let _appCredentials;

class AuthorizationService {
    constructor(baseServiceUrl, appId, appSecret, guestUserCredentials) {
        this.baseServiceUrl = baseServiceUrl;
        this.appId = appId;
        this.appSecret = appSecret;
        _guestCredentials = guestUserCredentials;
        _appCredentials = btoa(appId + ":" + appSecret);
    }

    initAuthorizationType(authType) {
        this.authType = authType;
    }

    getCurrentUser() {
        return sessionStorage['username'];
    }

    isLoggedIn() {
        return this.getCurrentUser() != undefined;
    }

    getAuthorizationHeaders(isGuest) {
        let headers = {};

        if (this.isLoggedIn()) {
            headers = {
                'Authorization': this.authType + ' ' + sessionStorage['_authToken']
            };
        } else if (!this.isLoggedIn() && isGuest) {
            headers = {
                'Authorization': this.authType + ' ' + _guestCredentials
            };
        } else if (!this.isLoggedIn() && !isGuest) {
            headers = {
                'Authorization': 'Basic' + ' ' + _appCredentials
            };
        }

        headers['Content-Type'] = 'application/json';

        return headers;
    }
}

module.exports = AuthorizationService;
