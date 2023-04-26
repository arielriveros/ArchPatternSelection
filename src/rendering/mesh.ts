
import { VertexBuffer } from "./buffers/vertexBuffer";
import { IndexBuffer } from "./buffers/indexBuffer";
import { gl } from "./renderer";
import { VertexArray } from "./buffers/vertexArray";
import { VertexBufferLayout } from "./buffers/vertexBufferLayout";

export class Mesh
{
    protected _vertices: number[];
    protected _indices: number[] | null;

    protected _vertexArray!: VertexArray;
    protected _vertexBuffer!: VertexBuffer;
    protected _indexBuffer!: IndexBuffer;
    
    public constructor(vertices: number[], indices: number[] | null = null)
    {
        this._vertices = vertices;
        this._indices = indices;
    }

    public load(): void { 
        this._vertexArray = new VertexArray();

        this._vertexBuffer = new VertexBuffer(6, gl.FLOAT, gl.TRIANGLES);
        this._vertexBuffer.pushData(this._vertices);

        let layout: VertexBufferLayout = new VertexBufferLayout();
        layout.push(gl.FLOAT, 3); // Position attribute
        layout.push(gl.FLOAT, 3); // Color Attribute


        this._vertexArray.attachVertexBuffer(this._vertexBuffer, layout);

        if(this._indices)
        {
            this._indexBuffer = new IndexBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.pushData(this._indices);
        }

        this._vertexBuffer.unbind();

        if(this._indices)
            this._indexBuffer.unbind();
    }

    public unload(): void
    {
        this._vertexBuffer.unbind();
    }

    public draw(): void
    {
        this._vertexArray.bind();
        this._vertexBuffer.bind();
        if(this._indices) { 
            this._indexBuffer.bind();
            this._indexBuffer.draw();
        }
        else
            this._vertexBuffer.draw();
    }
}