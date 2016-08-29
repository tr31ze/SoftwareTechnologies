'use strict';

const Sammy = require('sammy');

export function showPopup(type, text, position) {

    function _showSuccessPopup(text, position) {
        noty({
            text: text,
            timeout: 2000,
            layout: 'top',
            type: 'success'
        });
    }

    function _showInfoPopup(text, position) {
        noty({
            text: text,
            timeout: 2000,
            layout: 'top',
            type: 'information'
        });
    }

    function _showWarningPopup(text, position) {
        noty({
            text: text,
            timeout: 2000,
            layout: 'top',
            type: 'warning'
        });
    }

    function _showErrorPopup(text, position) {
        noty({
            text: text,
            timeout: 2000,
            layout: 'top',
            type: 'error'
        });
    }

    switch (type) {
        case 'success':
            _showSuccessPopup(text, position);
            break;
        case 'info':
            _showInfoPopup(text, position);
            break;
        case 'warning':
            _showWarningPopup(text, position);
            break;
        case 'error':
            _showErrorPopup(text, position);
            break;
    }
}


// EVENT SERVICES

let _isInstanced = false;
let _router;

export function initEventServices() {
    if (_isInstanced) {
        return;
    }

    _router = Sammy(function () {
        //Here we put all pre-initialized functions, event handlers, and so on...

        this.bind('redirectUrl', function (ev, url) {
            this.redirect(url);
        });
    });

    _isInstanced = true;
}

export function redirectUrl(url) {
    Sammy(function () {
        this.trigger('redirectUrl', url);
    });
}

export function bindEventHandler(event, eventHandler) {
    Sammy(function () {
        this.bind(event, eventHandler);
    });
}

export function onRoute(route, routeHandler) {
    Sammy(function () {
        this.get(route, routeHandler);
    });
}

export function triggerEvent(event, data) {
    Sammy(function () {
        this.trigger(event, data);
    });
}

export function run(rootUrl) {
    _router.run(rootUrl);
}
