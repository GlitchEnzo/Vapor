#include "common.glsl"

precision highp float;

#ifdef VERTEX_SHADER
void main(void) 
{
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    //gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}
#endif

#ifdef FRAGMENT_SHADER
precision mediump float;

void main(void) 
{
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
#endif