import { Mesh } from "./mesh";
import { Shader } from "./shaders/shader";

export let gl: WebGL2RenderingContext;

export class Renderer
{
    private _canvas: HTMLCanvasElement;

    private _shader: Shader;

    public constructor(canvasID: string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasID);
        gl =  <WebGL2RenderingContext>this._canvas.getContext("webgl2");

        this._shader = new Shader(true);
    }

    public init(): void {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this._shader.create("default.vert.glsl", "default.frag.glsl");
        console.log("Renderer Init");
    }

    public resize(): void { 
        console.log("Resize");
    }

    public draw(mesh: Mesh): void {
        gl.clear(gl.COLOR_BUFFER_BIT);
        mesh.update();
        this._shader.use();
        this._shader.setUniform("u_model", 'Matrix4fv', mesh.transform.modelMatrix);
        mesh.draw();
    }

}