import { Loader } from "../../utils/loader";
import { gl } from "../renderer";

export class Shader {
    private _program!: WebGLProgram; 
    private _debug: boolean;

    public get program(): WebGLProgram {
        return this._program;
    }

    public constructor(debug: boolean = false) {
        this._debug = debug;
    }

    public create(vertexShaderSrc: string, fragmentShaderSrc: string): void
    {
        let vs: WebGLShader = this.loadSource(vertexShaderSrc, gl.VERTEX_SHADER);
        let fs: WebGLShader = this.loadSource(fragmentShaderSrc, gl.FRAGMENT_SHADER);
        this._program = this.createProgram(vs, fs);
    }

    private loadSource(sourceUrl: string, type: number): WebGLShader
    {
        let source = Loader.loadText(`./shaders/${sourceUrl}`);
        let shader: WebGLShader | null = gl.createShader(type);
        if(shader)
        {
            // Sets shader source and compiles it
            gl.shaderSource(shader, source as string);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
                console.error(`Error compiling vertex shader.\n${gl.getShaderInfoLog(shader)}`);
            
            if(this._debug)
                console.log(`Shader compiled successfully`);
        }

        return shader as WebGLShader;
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram
    {
        let program = gl.createProgram() as WebGLProgram;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // WebGL Program linking and error catching
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS))
            console.error(`Error linking WebGL program.\n${gl.getProgramInfoLog(program)}`);

        if(this._debug)
        {
            // Program validation, only use in debugging mode for performance reasons
            gl.validateProgram(program);
            if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
                console.error(`Error validating WebGL program.\n${gl.getProgramInfoLog(program)}`);
        }
        
        return program;
    }

    public getAttributeLocation(attrib: string): number
    {
        return gl.getAttribLocation(this._program, attrib);
    }

    public getUniformLocation(uniform: string): WebGLUniformLocation | null
    {
        return gl.getUniformLocation(this._program, uniform);
    }

    public setUniform(uniform: string, type: string, value: Int32Array | Float32Array | number): void
    {
        let location: WebGLUniformLocation | null = this.getUniformLocation(uniform);
        switch(type)
        {
            case "float":
                gl.uniform1f(location, value as number);
                break;
            case "1fv":
                gl.uniform1fv(location, value as Float32Array);
                break;
            case "2fv":
                gl.uniform2fv(location, value as Float32Array);
                break;
            case "3fv":
                gl.uniform3fv(location, value as Float32Array);
                break;
            case "4fv":
                gl.uniform4fv(location, value as Float32Array);
                break;
            case "1iv":
                gl.uniform1iv(location, value as Int32Array);
                break;
            case "2iv":
                gl.uniform2iv(location, value as Int32Array);
                break;
            case "3iv":
                gl.uniform3iv(location, value as Int32Array);
                break;
            case "4iv":
                gl.uniform4iv(location, value as Int32Array);
                break;
            case "Matrix3fv":
                gl.uniformMatrix3fv(location, false, value as Float32Array);
                break;
            case "Matrix4fv":
                gl.uniformMatrix4fv(location, false, value as Float32Array);
                break;
            default:
                console.error(`Uniform type ${type} not supported.`);
        }
    }

    public use(): void
    {
        gl.useProgram(this._program);
    }

    public remove(): void
    {
        gl.deleteProgram(this._program);
    }
}