#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#pragma loader: import {random} from './collections/random.glsl';

#pragma loader: import {noise} from './collections/noise.glsl';

#define OCTAVES 6
#pragma loader: import freq from './collections/fbm.glsl';

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  vec3 color = vec3(0.0);
  color += freq(st*3.0);

  gl_FragColor = vec4(color,1.0);
}
