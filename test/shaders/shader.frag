#ifdef GL_ES
precision mediump float;
#endif

struct dirlight
{
  vec3 direction;
  vec3 color;
};

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#pragma loader: import {random} from './collections/random';

#pragma loader: import {noise} from './collections/noise.vert';
#define OCTAVES 6

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  vec3 no = noise(st);
  vec3 color = vec3(0.0);
  color += freq(st*3.0);

  gl_FragColor = vec4(color,1.0);
}
