import * as React from 'react';

const logo = require('../logo.svg');

export class PlanetProps {
    X: number;
    Y: number;
    Mass: number;
    constructor(x: number, y: number, mass: number) {
        this.X = x;
        this.Y = y;
        this.Mass = mass;
    }
}

export class Planet extends React.Component<PlanetProps, {}> {
    render() {
        var style = {
            top: this.props.Y,
            left: this.props.X
        };
        return (
            <div style={style}>
            <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }
}