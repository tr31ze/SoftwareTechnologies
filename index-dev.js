'use strict';

require('console-polyfill');

const App = require('./src/App');
const Server = require('./src/Server');
const Ndom = require('ndom');

const Dat = require('./src/debug/dat.gui');
const Mockups = require('./src/debug/Mockups');
const DebugServer = require('./src/debug/Server');

let mocks = {};

let gui = new Dat.GUI({scrollable: true, autoPlace: false, width: 300}); //{autoPlace: false}
gui.useLocalStorage = true;
gui.remember(mocks);
gui.close();

Object.keys(Mockups).forEach(category => {
    let folder = gui.addFolder(category);

    Mockups[category].forEach((mock, index) => {
        let name = mock.regex.toString().replace(/^\/\^?/, '').replace(/\$?\/$/, '').replace(/\\\//g, '/');
        let options = ['none'].concat(Object.keys(mock.data));

        mocks[category + '.' + index] = mocks[category + '.' + index] || 'none';

        folder.add(mocks, category + '.' + index, options).name(name).onChange(() => DebugServer.hack(mocks));
    });
});

DebugServer.hack(mocks);
require('./src/debug/debug.less');


window.onload = () => {
    let app = new App();

    Server.request(window.location.pathname, null, (error, result) => {
        app.start({error, result});
        setTimeout(() => app.renderTo(document.getElementById('app')), 0);
    });

    document.getElementById('debug').appendChild(gui.domElement);
    Ndom(window).emit('resize');
};