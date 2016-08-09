'use strict';

const Server = require('../Server');
const Mockups = require('./Mockups');

const ORIGINAL = Server.request;
const timer = typeof performance !== `undefined` && typeof performance.now === `function` ? performance : Date;


class DebugServer {
    static hack(mocks) {
        Server.request = DebugServer.request.bind(Server, mocks)
    }

    static request(mocks, url, data, callback) {
        if (arguments.length === 3) {
            if (typeof arguments[2] === 'function') {
                callback = arguments[2];
                data = null;
            }
        }

        let tmp = findMock(url);
        if (!tmp) return ORIGINAL(url, data, callback);

        let {key, matches, category, index} = tmp;

        let mock = mocks[key] || 'none';

        if (!mock || mock === 'none') return ORIGINAL(url, data, callback);

        let t = timer.now();

        setTimeout(() => {
            let error = Mockups[category][index]['data'][mock].error || null;
            let result = Mockups[category][index]['data'][mock].result || null;

            Server.log(url, data, timer.now() - t, error, result);

            callback(error, result);
        }, 20 + Math.random() * 50);
    }
}

function findMock(href) {
    let found = null;

    Object.keys(Mockups).forEach(category => {
        if (found) return;

        Mockups[category].forEach((mock, index) => {
            if (found) return;

            let matches = href.match(mock.regex);

            if (matches) found = {
                key: category + '.' + index,
                category,
                index,
                matches
            };
        });
    });

    return found;
}


module.exports = DebugServer;