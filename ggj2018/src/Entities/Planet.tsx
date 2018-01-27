import * as React from 'react';
import { Vector2 } from '../Util/Util';

const logo = require('../logo.svg');

export class PlanetProps {
    Position: Vector2;
    Mass: number;
    key: number;
    constructor(X: number, Y: number, mass: number, key: number) {
        this.Position = {X, Y};
        this.Mass = mass;
        this.key = key;
    }
}

export class Planet extends React.Component<PlanetProps, {}> {
    render() {
        var style: React.CSSProperties = {
            top: this.props.Position.Y,
            left: this.props.Position.X,
            position: 'absolute'
        };
        return (
            <img style={style} src={logo} className="App-logo" alt="logo" />
        );
    }
}