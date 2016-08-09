'use strict';

const Fetch = require('isomorphic-fetch');
const timer = typeof performance !== `undefined` && typeof performance.now === `function` ? performance : Date;


class Server {
    /**
     * @param {string} url
     * @param {Object|null} [data]
     * @param {function} callback
     */
    static request(url, data, callback) {
        if (arguments.length === 2) {
            if (typeof arguments[1] === 'function') {
                callback = arguments[1];
                data = null;
            }
        }

        let options = {
            method: data ? 'POST' : 'GET',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json'
            }
        };

        if (data) {
            let body = new FormData();

            if (data instanceof FormData) {
                body = data;
            } else if (data instanceof HTMLFormElement || (typeof data.getAttribute === 'function')) {
                body = new FormData(data);
            } else if (typeof data === 'object') {
                Object.keys(data).forEach(key => body.append(key, data[key]));
            } else {
                options.headers['Content-Type'] = 'text/plain';
                body = data;
            }

            options.body = body;
        }

        let t = timer.now();

        let cb = (error, result) => {
            Server.log(url, data, timer.now() - t, error, result);
            callback(error, result);
        };

            Fetch('https://yamzu.com' + url, options)
            .then(response => {
                response.json()
                    .then(json => {
                        if (json.error) cb(json.error, json.result || null);
                        else cb(null, json.result);
                    })
                    .catch(error => cb({status: response.status, message: response.status == 200 ? response.statusText : 'Invalid response.'}, null));
            })
            .catch(error => cb({status: 500, message: error.message}));
    }

    /**
     * @param {string} url
     * @param {Object|null} data
     * @param {number} time
     * @param {Object|null} error
     * @param {*} result
     */
    static log(url, data, time, error, result) {
        let color = {
            success: '#222222',
            request: '#9E9E9E',
            result: '#4CAF50',
            error: '#F20404'
        };

        console.groupCollapsed('%c  - XHR [' + (data ? 'POST' : 'GET') + '] ' + url + ' (in ' + time.toFixed(2) + ' ms)', 'color: ' + (error ? color.error : color.success) + '; font-weight: normal;');

        if (data) console.log('%c request', 'color: ' + color.request, data);
        if (result) console.log('%c result', 'color: ' + color.result, result);
        if (error) console.log('%c error', 'color: ' + color.error, error);

        console.groupEnd();
    }
}


module.exports = Server;
