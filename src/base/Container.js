'use strict';

const React = require('react');
const Container = require('react-redux-oop').Container;


class BaseContainer extends Container {
    constructor(props, context) {
        super(props, context);

        // this.actions.auth = new Auth();
        // this.actions.user = new User();
        // this.actions.nav = new Nav();
        // this.actions.track = new Tracker();

        this._actions = {

        };
    }
}


module.exports = BaseContainer;
