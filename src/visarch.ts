import { Mesh } from "./rendering/mesh";
import { Renderer } from "./rendering/renderer";

export class VisArch{
    private _renderer: Renderer;

    public constructor() {
        this._renderer = new Renderer("render-context");
    }

    public init(): void {
        this._renderer.init();

        let mesh = new Mesh(
            // x     y    z     r    g    b
            [ -0.5, -0.5, 0.0,  1.0, 1.0, 0.0,
               0.5, -0.5, 0.0,  0.0, 1.0, 1.0,
               0.0,  0.5, 0.0,  1.0, 0.0, 1.0   ],
            // Indices
            [ 0, 1, 2 ]
        );

        this._renderer.setMesh(mesh);

        this.update();
    }

    public resize(): void {
        this._renderer.resize();
    }

    private update(): void {
        this._renderer.draw();
        requestAnimationFrame(this.update.bind( this ));
    }
}
