import * as React from 'react';
import { Planet, PlanetProps } from './Entities/Planet';
import { Package, PackageProps } from './Entities/Package';

class AppState {
    Planets: PlanetProps[];
    Packages: PackageProps[];
}

export default class Game extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            Planets: [
            new PlanetProps(123, 123, 500),
            new PlanetProps(234, 234, 500)
            ],
            Packages: []
        };
    }

    render() {
        if (this.state == null) {
            return null;
        }
        
        var Planets = 
            this.state.Planets.forEach(element => 
              <Planet {...element}/>
        );
        var Packages = 
            this.state.Packages.forEach(element => 
              <Package {...element}/>
        );

        return (
            <div>
                {Planets}
                {Packages}
            </div>
        );
    }
}