import * as React from 'react';

const logo = require('../logo.svg');

export class PackageProps {
    X: number;
    Y: number;
    VelocityX: number;
    VelocityY: number;
}

export class Package extends React.Component<PackageProps, {}> {
    render() {
        return (
          <img src={logo} className="App-logo" alt="logo" />
        );
    }
}