import { Camera } from "./camera";
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
        gl.cullFace(gl.BACK);
        gl.frontFace(gl.CCW);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        this._shader.create("default.vert.glsl", "default.frag.glsl");
        console.log("Renderer Init");
    }

    public resize(fullscreen: boolean = false, camera: Camera | null = null): void { 
        if(fullscreen) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        }
        if(camera != null) {
            camera.onResize(this._canvas.width, this._canvas.height);
        }
        console.log("Resize");
    }

    public draw(mesh: Mesh, camera: Camera): void {
        gl.clear(gl.COLOR_BUFFER_BIT);
        mesh.update();
        this._shader.use();
        this._shader.setUniform("u_model", 'Matrix4fv', mesh.transform.modelMatrix);
        this._shader.setUniform("u_viewProjection", 'Matrix4fv', camera.getProjectionViewMatrix());
        mesh.draw();
    }

}