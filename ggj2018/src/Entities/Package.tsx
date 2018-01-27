import * as React from 'react';

const logo = require('../logo.svg');

export class PackageProps {
    X: number;
    Y: number;
    VelocityX: number;
    VelocityY: number;
    key: number;
    constructor(x: number, y: number, velocityX: number, velocityY: number, key: number) {
        this.X = x;
        this.Y = y;
        this.VelocityX = velocityX;
        this.VelocityY = velocityY;
        this.key = key;
    }
}

export class Package extends React.Component<PackageProps, {}> {
    render() {
        return (
          <img src={logo} className="App-logo" alt="logo" />
        );
    }
}