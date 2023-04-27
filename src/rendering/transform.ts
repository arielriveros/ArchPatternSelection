import { mat4, vec3 } from "gl-matrix";

export class Transform
{
    public position = vec3.create();
    public eulerRotation = vec3.create();
    public scale	= vec3.fromValues(1, 1, 1);

	private _modelMatrix = mat4.create();

    constructor()
    {
        this._modelMatrix = mat4.identity(this._modelMatrix);
    }

	computeModelMatrix(): void
	{
        let posMat = mat4.create();
        let rotMat = mat4.create();
        let scaleMat = mat4.create();

        mat4.fromTranslation(posMat, this.position);
    
        let rotX = mat4.fromRotation(mat4.create(), this.eulerRotation[0], vec3.fromValues(1, 0, 0));
        let rotY = mat4.fromRotation(mat4.create(), this.eulerRotation[1], vec3.fromValues(0, 1, 0));
        let rotZ = mat4.fromRotation(mat4.create(), this.eulerRotation[2], vec3.fromValues(0, 0, 1));
        mat4.multiply(rotMat, rotX, rotY);
        mat4.multiply(rotMat, rotMat, rotZ);

        mat4.fromScaling(scaleMat, this.scale);

        mat4.multiply(this._modelMatrix, posMat, rotMat);
        mat4.multiply(this._modelMatrix, this._modelMatrix, scaleMat);
	}

    get modelMatrix() { return this._modelMatrix; }

}