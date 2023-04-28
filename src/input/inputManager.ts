import { KeyHandler } from "./keyHandler";
import { MouseHandler } from "./mouseHandler";

export class InputManager {

    public constructor() {
        console.log("New Input Instance");
    }

    public init(context: HTMLCanvasElement ) {
        KeyHandler.init();
        MouseHandler.init();


        // Keyboard Events
        window.addEventListener("keydown", this.keyDown, false);
        window.addEventListener("keyup", this.keyUp, false);
        
        // Mouse Events
        context.addEventListener("mousedown", this.mouseButtonDown, false);
        context.addEventListener("mouseup", this.mouseButtonUp, false);

        context.addEventListener("contextmenu", this.mouseRightClick, false); // Disable context menu on body if right mouse button is clicked
        context.addEventListener("mousemove", this.mouseMove, false);

        console.log("Input poller initialized");
    }

    private keyDown(event: KeyboardEvent): void{
        event.preventDefault();
        event.stopPropagation();
        KeyHandler.onKeyDown(event.code);
    }

    private keyUp(event: KeyboardEvent): void{
        event.preventDefault();
        event.stopPropagation();
        KeyHandler.onKeyUp(event.code);
    }

    private mouseButtonDown(event: MouseEvent): void {
        event.preventDefault();
        MouseHandler.onButtonDown(event.button);
    }

    private mouseButtonUp(event: MouseEvent): void {
        event.preventDefault();
        MouseHandler.onButtonUp(event.button);
    }

    private mouseRightClick(event: MouseEvent): void { 
        event.preventDefault();
    }

    private mouseMove(event: MouseEvent): void {
        event.preventDefault();
        MouseHandler.onMouseMove(event.clientX, event.clientY, event.movementX, event.movementY);
    }

    public isMouseButtonPressed(button: string): boolean {
        return MouseHandler.isButtonPressed(button);
    }
    
    public isKeyDown(code: string): boolean {
        return KeyHandler.isKeyDown(code);
    }

    public getMousePosition(): number[] {
        return MouseHandler.mousePosition;
    }   

    public getMouseSpeed(): number[] {
        return MouseHandler.mouseSpeed;
    }

    public isMouseMoving(): boolean {
        return MouseHandler.mouseSpeed[0] != 0 || MouseHandler.mouseSpeed[1] != 0;
    }
}