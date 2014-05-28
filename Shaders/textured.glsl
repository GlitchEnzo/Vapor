#include "common.glsl"

varying vec2 vTextureCoord;

precision highp float;

#ifdef VERTEX_SHADER
void main(void) 
{
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
}
#endif

#ifdef FRAGMENT_SHADER
precision mediump float;

void main(void) 
{
    gl_FragColor = texture2D(uMainTexture, vTextureCoord);
}
#endif