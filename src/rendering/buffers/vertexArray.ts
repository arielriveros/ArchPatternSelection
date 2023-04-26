import { gl } from "../renderer";
import { VertexBuffer } from "./vertexBuffer";
import { VertexBufferAttributeInfo, VertexBufferLayout } from "./vertexBufferLayout";

export class VertexArray
{
	private _vertexArray: WebGLVertexArrayObject;
	
	constructor(){
        this._vertexArray = gl.createVertexArray() as WebGLVertexArrayObject;
    }
    
	bind(): void {
        gl.bindVertexArray(this._vertexArray);
    }


    unbind(): void {
        gl.bindVertexArray(null);
    }

    delete(): void {
        gl.deleteVertexArray(this._vertexArray);
    }

    attachVertexBuffer(vertexBuffer: VertexBuffer, layout: VertexBufferLayout): void {
        this.bind();
        vertexBuffer.bind();
        let attributes: VertexBufferAttributeInfo[] = layout.attributes;
        let offset: number = 0;
        for (let i = 0; i < attributes.length; ++i)
        {
            let attribute: VertexBufferAttributeInfo = attributes[i];
            gl.enableVertexAttribArray(i);
            gl.vertexAttribPointer(
                i,
                attribute.count,
                attribute.type,
                attribute.normalized,
                layout.stride,
                offset
            );
            offset += attribute.count * VertexBufferAttributeInfo.getSizeOfType(attribute.type);
        }
    }
};