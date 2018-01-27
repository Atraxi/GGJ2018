import * as React from 'react';
import { Vector2 } from '../Util/Util';
const logo = require('../logo.svg');

export class ParcelProps {
    Position: Vector2;
    Velocity: Vector2;
    key: number;
    constructor(position: Vector2, velocity: Vector2, key: number) {
        this.Position = position;
        this.Velocity = velocity;
        this.key = key;
    }
}

export class Parcel extends React.Component<ParcelProps, {}> {
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