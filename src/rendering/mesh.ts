
import { VertexBuffer } from "./buffers/vertexBuffer";
import { IndexBuffer } from "./buffers/indexBuffer";
import { gl } from "./renderer";
import { VertexArray } from "./buffers/vertexArray";
import { VertexBufferLayout } from "./buffers/vertexBufferLayout";
import { vec3 } from "gl-matrix";
import { Transform } from "./transform";

export class Mesh
{
    public position: vec3 = vec3.create();
	public rotation: vec3 = vec3.create();
	public scale: vec3	  = vec3.fromValues(1, 1, 1);

    public transform: Transform = new Transform();

    private _vertices: number[] = [];
    private _indices: number[] | null = null;

    private _vertexArray!: VertexArray;
    private _vertexBuffer!: VertexBuffer;
    private _indexBuffer!: IndexBuffer;
    
    public constructor() {}

    public update(): void
    {
        this.transform.position = this.position;
        this.transform.eulerRotation = this.rotation;
        this.transform.scale = this.scale;
        this.transform.computeModelMatrix();
    }

    public load(vertices: number[], indices: number[] | null = null): void { 
        this._vertices = vertices;
        this._indices = indices;

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

        this._vertexBuffer.unbind();
        if(this._indices)
            this._indexBuffer.unbind();
        this._vertexArray.unbind();
    }
}