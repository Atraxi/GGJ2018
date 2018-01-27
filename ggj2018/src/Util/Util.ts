var PreviousId = 0;

export function NewId(): number {
    return PreviousId++;
}

export interface Vector2 {
    X: number;
    Y: number;
}

export function DistanceBetween(a: Vector2, b: Vector2): number {
    return Math.sqrt(Math.pow(a.X - b.X, 2) + Math.pow(a.Y - b.Y, 2));
}

export function MoveToward(origin: Vector2, destination: Vector2, distance: number, distanceBetween?: number): Vector2 {
    if (distanceBetween === undefined) {
        distanceBetween = DistanceBetween(origin, destination);
    }
    return {
        X: (distance / distanceBetween) * (destination.X - origin.X),
        Y: (distance / distanceBetween) * (destination.Y - origin.Y)
    };
}