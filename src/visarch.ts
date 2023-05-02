import { InputManager } from "./input/inputManager";
import { ArcBallCamera } from "./rendering/cameras/arcBallCamera";
import { Camera } from "./rendering/cameras/camera";
import { Mesh } from "./rendering/mesh";
import { Renderer } from "./rendering/renderer";

export class VisArch{
    private _renderer: Renderer;
    private _input: InputManager;
    
    private _mesh: Mesh = new Mesh();
    private _camera: ArcBallCamera = new ArcBallCamera(800, 600, 45);

    public constructor() {
        this._input = new InputManager();
        this._renderer = new Renderer("render-context");
    }

    public init(): void {
        this._renderer.init();
        this._input.init(this._renderer.canvas);
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
        this._camera.position = [0, 0, 2];

        this.resize();
        this.update();
    }

    public resize(): void {
        this._renderer.resize(false, this._camera);
    }

    private update(): void {

        if(this._input.isKeyDown("KeyW"))
            this._mesh.position[2] -= 0.01;
        
        if(this._input.isKeyDown("KeyS"))
            this._mesh.position[2] += 0.01;

        if(this._input.isKeyDown("KeyA"))
            this._mesh.position[0] -= 0.01;

        if(this._input.isKeyDown("KeyD"))
            this._mesh.position[0] += 0.01;

        if(this._input.isKeyDown("KeyQ"))
            this._mesh.position[1] -= 0.01;

        if(this._input.isKeyDown("KeyE"))
            this._mesh.position[1] += 0.01;

        if(this._input.isMouseButtonPressed('Left'))
            this._camera.rotate(this._input.getMouseSpeed()[0] * 0.01, this._input.getMouseSpeed()[1] * 0.01);

        if(this._input.isKeyDown("ArrowUp"))
            this._camera.zoom(-0.025);

        if(this._input.isKeyDown("ArrowDown"))
            this._camera.zoom(0.025);
    
        this._renderer.draw(this._mesh, this._camera);
        requestAnimationFrame(this.update.bind( this ));
    }
}
