import * as React from 'react';
import { Planet, PlanetProps } from './Entities/Planet';
import { Package, PackageProps } from './Entities/Package';
import NewId from './Util/Id';

class AppState {
    Planets: PlanetProps[];
    Packages: PackageProps[];
}

export default class Game extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            Planets: [
            new PlanetProps(123, 123, 500, NewId()),
            new PlanetProps(234, 234, 500, NewId())
            ],
            Packages: []
        };
    }

    render() {
        if (this.state == null) {
            return null;
        }

        var Planets = 
            this.state.Planets.map(element => 
              <Planet key={element.key} {...element}/>
        );
        var Packages = 
            this.state.Packages.map(element => 
              <Package key={element.key} {...element}/>
        );
        return (
            <div>
                {Planets}
                {Packages}
            </div>
        );
    }
}