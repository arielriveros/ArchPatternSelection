import { Buffer } from "./buffers";
import { gl } from "../renderer";

export class VertexBuffer extends Buffer {
    private _size: number;

    public constructor( size: number, dataType: number = gl.FLOAT, mode: number = gl.TRIANGLES) {
        super(dataType, gl.ARRAY_BUFFER, mode);
        this._size = size;
    }

    public override draw(): void {
        gl.drawArrays(this.mode, 0, this.data.length/this._size);
    }
}