'use strict';

const History = require('history');
const Dom = require('ndom');
const App = require('react-redux-oop').App;

const Nav = require('./controllers/Nav');
const Container = require('./app/AppContainer');
const Reducers = require('./app/AppReducers');
const Routes = require('./Routes');
const Pages = require('./pages');

class Application extends App {
    /**
     * @type {Object}
     * @private
     */
    _history = null;

    /**
     * @type {Object}
     * @private
     */
    _initialData = {};

    /**
     * @type {Container}
     * @private
     */
    _render = null;

    /**
     * @type {Object}
     * @private
     */
    _reducers = null;

    /**
     *
     */
    constructor() {
        super({});

        this._render = Container;

        // Bootstrap

        if (process.env.NODE_ENV !== 'production') {
            this._setupDevTools();
            this._setupDebugMenu();
        }

        // Create navigation

        this._history = History.createHistory();
        this._historyInitiated = false;

        this.configure();

        this._nav = new Nav(this._store);
        this._store.addReducers(Reducers);
        this._store.on('state', this._stateHandler.bind(this));

        this._store.dispatch({type: 'APP_INIT'});
    }

    /**
     * @param {Object} [data]
     */
    start(data = {}) {
        this._initialData = data || {};

        this._history.listen(this._historyHandler.bind(this));
        Dom('body').on('click', 'a', this._linkHandler.bind(this));
    }

    /**
     * @private
     */
    _setupDevTools() {
        this._addMiddleware(require('redux-immutable-state-invariant')());
        this._addMiddleware(require('redux-logger')({collapsed: true, duration: true}));

        let matches = window.location.href.match(/[?&]_debug=([^&]+)\b/);
        let session = (matches && matches.length) ? matches[1] : null;

        let devTools = null;
        if (window['devToolsExtension']) devTools = window['devToolsExtension']();

        if (devTools) this._addEnhancer(devTools);
        if (session) this._addEnhancer(require('redux-devtools').persistState(session));
    }

    /**
     * @private
     */
    _setupDebugMenu() {

    }

    /**
     * @param {MouseEvent} event
     * @private
     */
    _linkHandler(event) {
        let link = event['realTarget'];
        let target = link.target;
        let href = link.getAttribute('href');

        if (
            event.shiftKey || event.ctrlKey || event.which !== 1 ||
            (target && target.toLowerCase() !== '_self') ||
            href.indexOf('//') == 0 || (href.indexOf('://') <= 5 && href.indexOf('://') > -1)
        ) return;

        event.preventDefault();

        if (href === '#') return;

        this._history.push(href);
    }

    /**
     * @param {{pathname: string, search: string, hash: string, action: string, state: Object}} location
     * @private
     */
    _historyHandler(location) {
        let action = location.action;
        let href = location.pathname + location.search + location.hash;
        let state = location.state || {};

        if (!this._historyInitiated) {
            console.log('History INIT:', href);
            this._historyInitiated = true;
            this._nav.init(href, this._initialData ? this._initialData.result : {}, this._initialData ? this._initialData.error : null);
            return;
        }

        console.log('History ' + action + ':', href, state);

        this._nav.navigate(href);
    }

    /**
     * @param {Object} state
     * @private
     */
    _stateHandler(state) {
        let route = state.location && state.location.active.route;
        let error = state.location.active.error;

        if (error) route = {
            page: 'Error',
            props: {},
            partial: false
        };

        if (route) {
            let reducers = Pages[route.page].Reducers;
            let data = state.location.active.data || state.location.active.error;

            if (this._reducers !== reducers) {
                this._store.removeReducers(this._reducers || {});
                this._store.addReducers(reducers);

                this._reducers = reducers;
            }


            if (this._data !== data) {
                this._data = data;

                this._store.dispatch({type: 'PAGE_READY', ...route, data: data});
            }
        }
    }
}


module.exports = Application;
