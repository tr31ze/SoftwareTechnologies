'use strict';

require('console-polyfill');

const App = require('./App');
const Server = require('./Server');

window.onload = () => {
    let app = new App();
    app.start(window['INITIAL_DATA'] || {error: null, result: {}});
    setTimeout(() => app.renderTo(document.getElementById('app')), 0);
};