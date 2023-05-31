import { Camera } from "./camera";

export class ArcBallCamera extends Camera
{
    private _cameraYaw: number = 0;
    private _cameraPitch: number = 0;
    private _cameraDistance: number = 1;

    public constructor(distance: number, width: number, height: number, fov: number, near: number = 0.1, far: number = 100) {
        super(width, height, fov, near, far);
        this._cameraDistance = distance;
        this.move();
    }

    public zoom(deltaDistance: number) {
        this._cameraDistance += deltaDistance;
        this._cameraDistance = Math.max(0.1, this._cameraDistance);
        this.move();
    }

    public rotate(deltaYaw: number, deltaPitch: number): void {
        this._cameraYaw += deltaYaw;
        if(this._cameraPitch + deltaPitch < Math.PI / 2 && this._cameraPitch + deltaPitch > -Math.PI / 2)
            this._cameraPitch += deltaPitch;
        this.move();
    }

    private move(): void
    {
        const horizontalDistance = this._cameraDistance * Math.cos(this._cameraPitch);
        this.position[0] = horizontalDistance * Math.cos(this._cameraYaw),
        this.position[1] = this._cameraDistance * Math.sin(this._cameraPitch),
        this.position[2] = horizontalDistance * Math.sin(this._cameraYaw)
    }
}