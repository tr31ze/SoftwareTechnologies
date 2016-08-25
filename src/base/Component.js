'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');


class BaseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
}


module.exports = BaseComponent;