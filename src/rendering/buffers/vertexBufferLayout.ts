import { gl } from "../renderer";

export class VertexBufferAttributeInfo
{
	type: number = 0;
	count: number = 0;
	normalized: boolean = false;

	static getSizeOfType(type: number): number
	{
		switch (type)
		{
			case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                return 4;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                return 2;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                return 1;
		}
		return 0;
	}
};

export class VertexBufferLayout
{
    private _attributes: VertexBufferAttributeInfo[] = [];
	private _stride: number = 0;
	
	push(type: number, count: number): void
	{
        let size = VertexBufferAttributeInfo.getSizeOfType(type);
        this._attributes.push({ type, count, normalized: false });
		this._stride += size * count; // CHECK IF THIS IS CORRECT
	}

    public get attributes(): VertexBufferAttributeInfo[] { return this._attributes; }
    public get stride(): number { return this._stride; }
};