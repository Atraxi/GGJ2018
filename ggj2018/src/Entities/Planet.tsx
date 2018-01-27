import * as React from 'react';

const logo = require('../logo.svg');

export class PlanetProps {
    X: number;
    Y: number;
    Mass: number;
    key: number;
    constructor(x: number, y: number, mass: number, key: number) {
        this.X = x;
        this.Y = y;
        this.Mass = mass;
        this.key = key;
    }
}

export class Planet extends React.Component<PlanetProps, {}> {
    render() {
        var style: React.CSSProperties = {
            top: this.props.Y,
            left: this.props.X,
            position: 'absolute'
        };
        return (
            <div style={style}>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }
}