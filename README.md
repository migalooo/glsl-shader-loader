# GLSL Shader Loader
The loader will import separate shader file as javascript string.

## Install
```bash
npm install --save-dev glsl-shader-loader
```

## Usage 

webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: [
          {
            loader: 'glsl-shader-loader',
            options: {}  
          }
        ]
      }
    ]
  }
}
```

Import shader source code from shader files

```js
// main.js
import vertexShaderSource from './vertexShader.glsl'
import fragmentShaderSource from './fragmentShader.glsl'
...
const shader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(shader, vertexShaderSource)
...
const shader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(shader, fragmentShaderSource)
...

// vertexShader.glsl
attribute vec2 a_position;
void main() {
  ...
}

// fragmentShader.glsl
precision mediump float;
...
void main() {
  ...
}
```

Use ES6 modules import GLSL functions from a separate file 

```js
// fragmentShader.glsl
import { plot } from './shaderFunctions.glsl';

precision mediump float;
...
void main() {
  ...
  plot(coord, color);
  ...
}

// shaderFunctions.glsl
float plot (vec2 coord, float color){
  return  smoothstep( color-0.01, color, coord.y) - smoothstep( color, color+0.01, coord.y);
}
vec2 distance (vec2 coord){
  ...
}
```
