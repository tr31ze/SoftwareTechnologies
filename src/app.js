'use strict';

const App = require('react-redux-oop').App;
const Container = require('./app/AppContainer');
const Reducers = require('./app/AppReducers');

const HomeView = require('./scripts/views/HomeView');
const PostView = require('./scripts/views/PostView');
const UserView = require('./scripts/views/UserView');
const HomeController = require('./scripts/controllers/HomeController');
const PostController = require('./scripts/controllers/PostController');
const UserController = require('./scripts/controllers/UserController');
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
        this._guestCredentials = "77944a02-f127-44a1-b10b-e34c12bd90c0.jh1THGUz2N4EIs3zq1Kken6fWqY/8YPm04g36B3I/fY=";

        this._AuthService = new AuthorizationService(this.baseUrl, this.appKey, this.appSecret, this._guestCredentials);
        this._requester = new Requester(this._AuthService);

        this._AuthService.initAuthorizationType("Kinvey");

        this.selector = ".wrapper";
        this.mainContentSelector = ".main-content";

        this.homeView = new HomeView(this.mainContentSelector, this.selector);
        this.homeController = new HomeController(this.homeView, this._requester, this.baseUrl, this.appKey);

        this.postView = new PostView(this.mainContentSelector, this.selector);
        this.postController = new PostController(this.postView, this._requester, this.baseUrl, this.appKey);

        this.userView = new UserView(this.mainContentSelector, this.selector);
        this.userController = new UserController(this.userView, this._requester, this.baseUrl, this.appKey);

        initEventServices();

        this._homeRouteHandler = () => this.homeController.showPage(this._AuthService.isLoggedIn(), showPopup, this._store);
        onRoute("#/", this._homeRouteHandler);

        this._singlePostHandler = (postId) => {
            this.homeController.showSinglePost(postId, this._store);
        };

        onRoute("#/post-:id", () => {
            let postId = $(location).attr('href');
            let id = postId.substr(postId.length - 1);
            this._singlePostHandler(id)
        });

        this._showLoginHandler = () => this.userController.showLoginPage(this._AuthService.isLoggedIn(), triggerEvent, this._store);
        onRoute("#/login", this._showLoginHandler);

        this._showRegisterHandler = () => this.userController.showRegisterPage(this._AuthService.isLoggedIn(), triggerEvent, this._store);
        onRoute("#/register", this._showRegisterHandler);

        this._logoutHandler = () => this.userController.logout(redirectUrl, this._store);
        onRoute("#/logout", this._logoutHandler);

        this._showCreatePostsHandler = () => {
            let fullname = sessionStorage.getItem('fullName');
            this.postController.showCreatePostsPage(fullname, this._AuthService.isLoggedIn(), triggerEvent, this._store);
        };
        onRoute('#/posts/create', this._showCreatePostsHandler);

        this._loginHandler = (ev, data) => this.userController.login(data, showPopup, redirectUrl, this._store);
        bindEventHandler('login', this._loginHandler);

        this._registerHandler = (ev, data) => this.userController.register(data, showPopup, redirectUrl, this._store);
        bindEventHandler('register', this._registerHandler);

        this._createPost = (ev, data) => this.postController.createPost(data, showPopup, redirectUrl, this._store);
        bindEventHandler('createPost', this._createPost);

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
