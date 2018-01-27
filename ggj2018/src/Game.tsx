import * as React from 'react';
import { Planet, PlanetProps } from './Entities/Planet';
import { DistanceBetween, MoveToward } from './Util/Util';
import { MouseEvent } from 'react';

interface AppState {
    StartingPlanet: PlanetProps;
    Star: PlanetProps;
    Planets: PlanetProps[];
}

export default class Game extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        var star = new PlanetProps({X: 50000, Y: 50000}, {X: 0, Y: 0}, 100000, 30);
        var planets = [
            new PlanetProps({X: 50000, Y: 10000}, {X: 200, Y: 0}, 200, 30),
            new PlanetProps({X: 50000, Y: 20000}, {X: 280, Y: 0}, 50, 30),
            star
            ];
        this.state = {
            Star: star,
            StartingPlanet: planets[0], 
            Planets: planets,
        };
        this.handleClick = this.handleClick.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop() {
        this.setState((oldState, {}) => {
            var newState = oldState.Planets.slice();
            newState.forEach(planet => {
                if (!planet.HasCollidedWith) {
                    if (planet !== oldState.Star) {
                        planet.Position.X += planet.Velocity.X;
                        planet.Position.Y += planet.Velocity.Y;
                    }
                    planet.Velocity = oldState.Planets.reduce(
                        (previous, current) => {
                            var distanceBetween = DistanceBetween(planet.Position, current.Position);
                            if (distanceBetween < planet.Radius + current.Radius && planet.Mass <= 0) {
                                planet.HasCollidedWith = current;
                            }
                            if (planet !== current) {
                                var acceleration = MoveToward(planet.Position, current.Position, Math.sqrt(current.Mass / distanceBetween), distanceBetween);
                                return {
                                    X: previous.X + acceleration.X,
                                    Y: previous.Y + acceleration.Y
                                };
                            } else {
                                return previous;
                            }
                        },
                        planet.Velocity
                    );
                } else {
                    if (planet !== oldState.Star) {
                        planet.Position.X += planet.HasCollidedWith.Velocity.X;
                        planet.Position.Y += planet.HasCollidedWith.Velocity.Y;
                    }
                }
            });
            return {
                Planets: newState
            };
        });

        requestAnimationFrame(this.gameLoop);
    }

    handleClick(event: MouseEvent<HTMLDivElement>) {
        if (event.button === 0) {
            event.persist();
            this.setState((oldState, {}) => {
                var target = MoveToward(
                    {
                        X: oldState.StartingPlanet.Position.X,
                        Y: oldState.StartingPlanet.Position.Y
                    },
                    {
                        X: event.clientX,
                        Y: event.clientY
                    },
                    oldState.StartingPlanet.Radius + 31
                );
                
                return {
                    Planets: [
                        ...oldState.Planets,
                        new PlanetProps(
                            {
                                X: oldState.StartingPlanet.Position.X + target.X,
                                Y: oldState.StartingPlanet.Position.Y + target.Y
                            },
                            {
                                X: (event.clientX * 100 - oldState.StartingPlanet.Position.X) / 100,
                                Y: (event.clientY * 100 - oldState.StartingPlanet.Position.Y) / 100
                            },
                            0,
                            30
                        )
                    ]
                };
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
        var style: React.CSSProperties = {
            position: 'absolute',
            height: '100%',
            width: '100%'
        };
        return (
            <div style={style} onClick={this.handleClick}>
                {Planets}
            </div>
        );
    }
}