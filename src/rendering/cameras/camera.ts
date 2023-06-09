import { mat4, vec3 } from "gl-matrix";

export class Camera
{
    private _projectionMatrix = mat4.create();
    private _viewMatrix = mat4.create();

    public position = vec3.create();
    public rotation = vec3.create();

    private _fov: number = 45;
    private _aspect: number = 1;
    private _near: number = 0.1;
    private _far: number = 100;

    constructor(width: number, height: number, fov: number, near: number = 0.1, far: number = 100) {
        this._fov = fov;
        this._aspect = width / height;
        this._near = near;
        this._far = far;
    }

    private getProjectionMatrix(): mat4 {
        return mat4.perspective(this._projectionMatrix, this._fov * (Math.PI / 180), this._aspect, this._near, this._far);
    }

    private getViewMatrix(): mat4 {
        return mat4.lookAt(this._viewMatrix, this.position, [0, 0, 0], [0, 1, 0]);
    }

    public getProjectionViewMatrix(): mat4 {
        let projectionViewMatrix = mat4.create();
        mat4.multiply(projectionViewMatrix, this.getProjectionMatrix(), this.getViewMatrix());
        return projectionViewMatrix;
    }

    public onResize(width: number, height: number): void {
        this._aspect = width / height;
    }
}