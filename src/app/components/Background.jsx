'use strict';

const React = require('react');
const BaseComponent = require('../../base/Component');


class Background extends BaseComponent {
    state = {
        background: 0
    };

    backgrounds = [
        require('../../../light_background-wallpaper-1920x1200.jpg'),
        require('../../../light_blue_background-wallpaper-1920x1080.jpg'),
        require('../../../backgorund-gray.jpg')
    ];

    interval = 0;

    shouldComponentUpdate(props, state) {
        return state.background !== this.state.background;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let background = this.state.background + 1;
            if (background > this.backgrounds.length - 1) background = 0;
            this.setState({background});
        }, 8000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        return (
            <div className="backgrounds">
                 {this.backgrounds.map((src, index) => {
                     return <div key={index} style={{backgroundImage: 'url(' + src + ')'}} className={index === this.state.background ? 'active' : ''}></div>;
                 })}
            </div>
        );
    };
}


module.exports = Background;
