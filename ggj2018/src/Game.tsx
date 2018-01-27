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
            new PlanetProps({X: 123, Y: 123}, 10, 10, NewId()),
            new PlanetProps({X: 234, Y: 234}, 10, 10, NewId())
            ];
        this.state = {
            StartingPlanet: planets[0], 
            Planets: planets,
            Parcels: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop() {
        this.setState((oldState, {}) => {
            var newState = oldState.Parcels.splice(0);
            newState.forEach(parcel => {
                if (!parcel.HasCollided) {
                    parcel.Position.X += parcel.Velocity.X;
                    parcel.Position.Y += parcel.Velocity.Y;

                    parcel.Velocity = this.state.Planets.reduce(
                        (previous, current) => {
                            var distanceBetween = DistanceBetween(parcel.Position, current.Position);
                            if (distanceBetween < parcel.Radius + current.Radius) {
                                parcel.HasCollided = true;
                            }
                            var acceleration = MoveToward(parcel.Position, current.Position, Math.min(current.Mass / distanceBetween, 1000), distanceBetween);
                            return {
                                X: previous.X + acceleration.X,
                                Y: previous.Y + acceleration.Y
                            };
                        },
                        parcel.Velocity
                    );
                }
            });
            return {
                Parcels: newState
            };
        });
        requestAnimationFrame(this.gameLoop);
    }

    handleClick(event: MouseEvent<HTMLDivElement>) {
        if (event.button === 0) {
            event.persist();
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
                                X: (event.clientX - oldState.StartingPlanet.Position.X) / 100,
                                Y: (event.clientY - oldState.StartingPlanet.Position.Y) / 100
                            },
                            NewId()
                        )
                    ]
                };
            });
        } else if (event.button === 1) {
            this.setState({
                Parcels: []
            });
        }
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
            <div style={style} onClick={this.handleClick}>
                {Planets}
                {Parcels}
            </div>
        );
    }
}