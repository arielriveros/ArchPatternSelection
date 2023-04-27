import { Camera } from "./rendering/camera";
import { Mesh } from "./rendering/mesh";
import { Renderer } from "./rendering/renderer";

export class VisArch{
    private _renderer: Renderer;
    
    private _mesh: Mesh = new Mesh();
    private _camera: Camera = new Camera();

    public constructor() {
        this._renderer = new Renderer("render-context");
    }

    public init(): void {
        this._renderer.init();

        this._mesh.load(
            // x     y    z     r    g    b
            [ -0.5, -0.5, 0.5,  1.0, 1.0, 0.0,
                0.5, -0.5, 0.5,  0.0, 1.0, 1.0,
                0.5,  0.5, 0.5,  1.0, 0.0, 1.0,
                -0.5,  0.5, 0.5,  1.0, 1.0, 1.0,
                -0.5, -0.5, -0.5,  1.0, 1.0, 0.0,
                0.5, -0.5, -0.5,  0.0, 1.0, 1.0,
                0.5,  0.5, -0.5,  1.0, 0.0, 1.0,
                -0.5,  0.5, -0.5,  1.0, 1.0, 1.0   ],
            // Indices
            [ 0, 1, 2, 2, 3, 0,
                1, 5, 6, 6, 2, 1,
                7, 6, 5, 5, 4, 7,
                4, 0, 3, 3, 7, 4,
                4, 5, 1, 1, 0, 4,
                3, 2, 6, 6, 7, 3 ]
        );

        this._mesh.scale = [0.5, 0.5, 0.5];
        this._camera.position = [0, 1, 2];
        this.update();
    }

    public resize(): void {
        this._renderer.resize();
    }

    private update(): void {
        this._mesh.position[0] += Math.sin(Date.now() / 1000) / 500;
        this._mesh.position[1] += Math.cos(Date.now() / 1000) / 500;

        this._mesh.rotation[1] += 0.01;
    
        this._renderer.draw(this._mesh, this._camera);
        requestAnimationFrame(this.update.bind( this ));
    }
}
