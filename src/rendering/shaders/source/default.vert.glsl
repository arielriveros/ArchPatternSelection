#version 300 es

precision mediump float;

layout (location = 0) in vec3 a_position;
layout (location = 1) in vec3 a_color;
        
uniform mat4 u_model;
uniform mat4 u_viewProjection;

out vec3 v_color;
        
void main() {
    v_color = a_color;
    gl_Position = u_viewProjection * u_model * vec4(a_position, 1.0);
}