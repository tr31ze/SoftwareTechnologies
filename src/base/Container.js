'use strict';

const React = require('react');
const Container = require('react-redux-oop').Container;

// Check if u will use actions

class BaseContainer extends Container {
    constructor(props, context) {
        super(props, context);

        this._actions = {

        };
    }
}


module.exports = BaseContainer;
