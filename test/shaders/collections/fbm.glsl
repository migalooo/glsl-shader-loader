#pragma loader: import {plot} from '/draw.glsl';

float fbm (in vec2 st) {
  float value = 0.0;
  float amplitude = .5;
  float frequency = 0.;

  vec2 coord = plot(st);
  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * noise(st);
    st *= 2.;
    amplitude *= .5;
  }
  return value;
}
