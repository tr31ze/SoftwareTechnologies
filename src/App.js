'use strict';

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
require('./styles/form-style.css');
require('./styles/main-style.css');
require('./styles/new-post-style.css');

(function createApp() {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_SJu1XCSK"; // Place your appKey from Kinvey here...
    let appSecret = "d1fe226ed4664a33b93d726845fe9c79"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "ee209af4-7f4f-4be6-ace8-1a01a609600b.Bj7Cd4NVcNMjJy+pFC6fZVjqWmg75kI3OqYOhTr/gDE="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester
    console.log(AuthorizationService);
    let AuthService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    let requester = new Requester(AuthService);

    AuthService.initAuthorizationType("Kinvey");

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController
    console.log(HomeView);
    let homeView = new HomeView(mainContentSelector, selector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    let postView = new PostView(mainContentSelector, selector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    let userView = new UserView(mainContentSelector, selector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        homeController.showPage(AuthService.isLoggedIn(), showPopup);
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(AuthService.isLoggedIn(), triggerEvent);
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(AuthService.isLoggedIn(), triggerEvent);
    });

    onRoute("#/logout", function () {
        // Logout the current user...
        userController.logout(redirectUrl);
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...

        let fullname = sessionStorage.getItem('fullName');
        postController.showCreatePostsPage(fullname, AuthService.isLoggedIn(), triggerEvent);
    });

    bindEventHandler('login', function (ev, data) {
        // Login the user...
        console.log(data);
        userController.login(data, showPopup, redirectUrl);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data, showPopup, redirectUrl);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createPost(data, showPopup, redirectUrl);
    });

    run('#/');
})();
