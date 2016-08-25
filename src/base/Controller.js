'use strict';

const Controller = require('react-redux-oop').Controller;
const Server = require('../Server');


class BaseController extends Controller {
    static Actions = {};

    /**
     * @param {string} type
     * @param {string} url
     * @param {Object|null} [post]
     * @param {Object|null} [data]
     * @param {function} [callback]
     * @protected
     */
    _request(type, url, post, data, callback) {
        if (arguments.length === 4) {
            if (typeof arguments[3] === 'function') {
                callback = arguments[3];
                post = arguments[2];
                data = arguments[2] || {};
            }
        }

        if (arguments.length === 3) {
            if (typeof arguments[2] === 'function') {
                callback = arguments[2];
                post = null;
                data = {};
            } else {
                callback = null;
                post = arguments[2];
                data = arguments[2] || {};
            }
        }

        data = data || post || {};

        this.dispatch(type + '_START', {...data});

        Server.request(url, post, (error, result) => {
            if (callback) return callback(error, result, data => this.dispatch(type + '_END', data));
            this.dispatch(type + '_END', {error, result});
        });
    }
}


module.exports = BaseController;