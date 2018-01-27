import * as React from 'react';
import { Vector2 } from '../Util/Util';

const logo = require('../logo.svg');

export class PlanetProps {
    Position: Vector2;
    Mass: number;
    Radius: number;
    key: number;
    constructor(position: Vector2, mass: number, radius: number, key: number) {
        this.Position = position;
        this.Mass = mass;
        this.Radius = radius;
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