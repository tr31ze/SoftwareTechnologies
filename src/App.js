'use strict';

const App = require('react-redux-oop').App;
const Container = require('./app/AppContainer');
const Reducers = require('./app/AppReducers');

const AppController = require('./app/AppController');
const AuthorizationService = require('./scripts/libs/AuthorizationService');
const Requester = require('./scripts/libs/Requester');

import {initEventServices, showPopup, onRoute, bindEventHandler, run, triggerEvent, redirectUrl} from './scripts/libs/framework';
require('./styles/style.less');

class Application extends App {

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

    constructor() {
        super({});

        this._render = Container;

        // Bootstrap

        if (process.env.NODE_ENV !== 'production') {
            this._setupDevTools();
            this._setupDebugMenu();
        }

        this.configure();

        this._store.addReducers(Reducers);

        this.baseUrl = "https://baas.kinvey.com";
        this.appKey = "kid_SJu1XCSK";
        this.appSecret = "d1fe226ed4664a33b93d726845fe9c79";
        this._guestCredentials = "d0f1995a-bc7c-400c-a1ee-c97823ea6166.3bRdYQ8Wtk3WNNS5wV0uSubp+1yu/b/dIpLGY4PV1eM=";

        this._AuthService = new AuthorizationService(this.baseUrl, this.appKey, this.appSecret, this._guestCredentials);
        this._requester = new Requester(this._AuthService);

        this._AuthService.initAuthorizationType("Kinvey");

        this.selector = ".wrapper";
        this.mainContentSelector = ".main-content";

        this.appController = new AppController(this._requester, this.baseUrl, this.appKey);

        initEventServices();

        this._homeRouteHandler = () => this.appController.showPage(this._AuthService.isLoggedIn(), showPopup, this._store);
        onRoute("#/", this._homeRouteHandler);

        this._singlePostHandler = (postId) => {
            this.appController.showSinglePost(postId, this._store);
        };

        onRoute("#/post-:id", () => {
            let postId = $(location).attr('href');
            let id = postId.substr(postId.length - 1);
            this._singlePostHandler(id)
        });

        this._showLoginHandler = () => this.appController.showLoginPage(this._AuthService.isLoggedIn(), triggerEvent, this._store);
        onRoute("#/login", this._showLoginHandler);

        this._showRegisterHandler = () => this.appController.showRegisterPage(this._AuthService.isLoggedIn(), triggerEvent, this._store);
        onRoute("#/register", this._showRegisterHandler);

        this._logoutHandler = () => this.appController.logout(redirectUrl, this._store);
        onRoute("#/logout", this._logoutHandler);

        this._showCreatePostsHandler = () => {
            let fullname = sessionStorage.getItem('fullName');
            this.appController.showCreatePostsPage(fullname, this._AuthService.isLoggedIn(), triggerEvent, this._store);
        };
        onRoute('#/posts/create', this._showCreatePostsHandler);

        this._loginHandler = (ev, data) => this.appController.login(data, showPopup, redirectUrl, this._store);
        bindEventHandler('login', this._loginHandler);

        this._registerHandler = (ev, data) => this.appController.register(data, showPopup, redirectUrl, this._store);
        bindEventHandler('register', this._registerHandler);

        this._createPost = (ev, data) => this.appController.createPost(data, showPopup, redirectUrl, this._store);
        bindEventHandler('createPost', this._createPost);

        this._commentHandler = (ev, data) => this.appController.leaveComment(data, showPopup, redirectUrl, this._store);
        bindEventHandler('leaveComment', this._commentHandler);

        run('#/');

        this._store.dispatch({type: 'APP_INIT'});
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
};

window.onload = () => {
    let app = new Application();
    setTimeout(() => app.renderTo(document.getElementById('app')), 0);
};
