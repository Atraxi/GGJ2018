import * as React from 'react';
import { Planet, PlanetProps } from './Entities/Planet';
import { Parcel, ParcelProps } from './Entities/Parcel';
import { NewId, DistanceBetween, MoveToward } from './Util/Util';
import { MouseEvent } from 'react';

interface AppState {
    StartingPlanet: PlanetProps;
    Planets: PlanetProps[];
    Parcels: ParcelProps[];
}

export default class Game extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        var planets = [
            new PlanetProps(123, 123, 500, NewId()),
            new PlanetProps(234, 234, 500, NewId())
            ];
        this.state = {
            StartingPlanet: planets[0], 
            Planets: planets,
            Parcels: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
    }

    gameLoop() {
        this.state.Parcels.forEach((parcel) => {
            parcel.Position.X += parcel.Velocity.X;
            parcel.Position.Y += parcel.Velocity.Y;

            parcel.Velocity = this.state.Planets.reduce(
                (previous, current) => {
                    return MoveToward(previous, current.Position, current.Mass / DistanceBetween(previous, current.Position));
                },
                parcel.Position
            );
        });
        requestAnimationFrame(this.gameLoop);
    }

    handleInput(event: MouseEvent<HTMLDivElement>) {
        this.setState((oldState, {}) => {
            return {
                Parcels: [
                    ...oldState.Parcels,
                    new ParcelProps(
                        {
                            X: oldState.StartingPlanet.Position.X,
                            Y: oldState.StartingPlanet.Position.Y
                        },
                        {
                            X: oldState.StartingPlanet.Position.X - event.screenX,
                            Y: oldState.StartingPlanet.Position.Y - event.screenY
                        },
                        NewId()
                    )
                ]
            };
        });
    }

    render() {
        if (this.state == null) {
            return null;
        }
        var Planets = 
            this.state.Planets.map(element => 
              <Planet key={element.key} {...element}/>
        );
        var Parcels = 
            this.state.Parcels.map(element => 
              <Parcel key={element.key} {...element}/>
        );
        var style: React.CSSProperties = {
            position: 'absolute',
            height: '100%',
            width: '100%'
        };
        return (
            <div style={style} onClick={this.handleInput}>
                {Planets}
                {Parcels}
            </div>
        );
    }
}