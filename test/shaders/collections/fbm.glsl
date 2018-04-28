float fbm (in vec2 st) {
  float value = 0.0;
  float amplitude = .5;
  float frequency = 0.;

  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * noise(st);
    st *= 2.;
    amplitude *= .5;
  }
  return value;
}
