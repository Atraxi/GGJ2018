import * as React from 'react';
import { Vector2, NewId } from '../Util/Util';

const logo = require('../logo.svg');

export class PlanetProps {
    Position: Vector2;
    Velocity: Vector2;
    Mass: number;
    Radius: number;
    HasCollidedWith: PlanetProps;
    key: number;
    constructor(position: Vector2, velocity: Vector2, mass: number, radius: number) {
        this.Position = position;
        this.Velocity = velocity;
        this.Mass = mass;
        this.Radius = radius;
        this.key = NewId();
    }
}

export class Planet extends React.Component<PlanetProps, {}> {
    render() {
        var style: React.CSSProperties = {
            top: this.props.Position.Y / 100,
            left: this.props.Position.X / 100,
            position: 'absolute'
        };
        return (
            <img style={style} src={logo} className="App-logo" alt="logo" />
        );
    }
}