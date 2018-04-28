# GLSL Shader Loader
[![Build Status](https://travis-ci.org/migalooo/glsl-shader-loader.svg?branch=master)] [![Build Status](https://img.shields.io/badge/node-%3E%3D%20v6.0.0-blue.svg)]
> A WebGL shader loader for [Webpack](https://webpack.js.org/concepts/), support for import **GLSL functions** from files and generates a shader string for WebGL program.

**GLSL Shader Loader** provid many features as following.
- Allow import `.glsl` source file as a Javacript string for WebGL program. 
- Support `import` syntax in `.glsl` file that can extract GLSL functions from other files
- Remove invalid import if the function will not be called 
- Repeated functions are imported only once
- Syntax tree analysis

---

### Install
```bash
npm install --save-dev glsl-shader-loader
```

### Configuration
In your webpack configuration:
```js
module: {
  rules: [{
    test: /\.glsl$/,
    use: [
      { 
        loader: 'glsl-shader-loader',
        options: {}  
      }
    ]
  }]
}
```

### Usage
Import shader source code from shader files

> --dir
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
