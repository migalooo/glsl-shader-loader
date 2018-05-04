# GLSL Shader Loader
![Build Status](https://travis-ci.org/migalooo/glsl-shader-loader.svg?branch=master) ![Build Status](https://img.shields.io/badge/node-%3E%3D%20v6.0.0-blue.svg)

This is a static shader source bundler for WebGL program, provide a possibility for management shader source by creating separate files.
> glsl-shader-loader for [Webpack](https://webpack.js.org/concepts/), supports for import **GLSL functions** from file and generates a shader string for WebGL program.

**GLSL Shader Loader** provids many features as following.
- Allow import `.glsl` source file as a Javacript string for WebGL program 
- Support `import` [statement](#usage) in `.glsl` file that can extract GLSL functions from other files (includes nested reference)
- Remove invalid import if the function will not be called 
- Repeated functions are imported only once
- Syntax tree analysis and error detection

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
    test: /\.(frag|vert|glsl)$/,
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
You can import GLSL functions with `#pragma loader:` statements in `.glsl` file
- Import specified function by name
  **`#pragma loader: import {nameA, nameB} from './file.glsl';`**

- Import the only function in file by a new name
  **`#pragma loader: import rename from './file.glsl';`**

- **NOTE**:
  - Only if there is a single function in `.glsl` file will you be able to rename it 
  - If the imported function is not called, the function source will not insert in shader source
  - In case two functions have the same name, only import once
  - Imported function will replace the position of import statement in order

### Options
| Name | Type | Default | Description |
|------|:----:|:--------:|:-----------|
| [root](#root) | {String} | undefined | Specify the root path of source |

### `root`

configuration:
```javascript
{ 
  loader: 'glsl-shader-loader',
  options: {
    root: '/src/shaders' 
  }
}
```
Use `/` redirect to the specified directory.
> e.g. `#pragma loader: import {light} from '/lights.glsl';` will search `lights.glsl` under the path `projectRoot/src/shaders/`

### Example

A directory structured like this:
```
.
├─ app.js 
├─ fragmentShaderSource.glsl 
└─ /collections/
   ├─ light.glsl 
   └─ random.glsl
```

Setting up shaders in **app.js** you might write code like this:
```js
import fragmentShaderSource from './fragmentShaderSource.glsl'

gl.shaderSource(fragmentShader, fragmentShaderSource)
...
```


In shader code **fragmentShaderSource.glsl**, import `randomDirection` and `spotLight` from file:
```glsl
precision mediump float;

varying vec4 v_color;
varying vec3 v_normal;

#pragma loader: import randomDirection from './collections/random.glsl';

#pragma loader: import {spotLight} from './collections/spotLight.glsl';

...

void main() {
  vec3 direction = randomDirection(range);
  vec3 spot = spotLight(direction, v_normal);
  ...
  gl_FragColor = v_result_color;
}
```

**light.glsl**
```glsl
vec3 spotLight (vec3 direction vec3 normal) {
  ...
  return spot;
}

vec3 ambientLight (vec3 direction vec3 normal) {
  ...
  return ambient;
}
```

**random.glsl**
```glsl
vec3 random(vec2 range) {
  ...
  return random;
}
```

`import fragmentShaderSource from './fragmentShaderSource.glsl'` Will return this JavaScript string:
```glsl
precision mediump float;

varying vec4 v_color;
varying vec3 v_normal;

vec3 randomDirection(vec2 range) {
  ...
  return random;
}

vec3 spotLight (vec3 direction vec3 normal) {
  ...
  return spot;
}

...

void main() {
  vec3 direction = randomDirection(range);
  vec3 spot = spotLight(direction, v_normal);
  ...
  gl_FragColor = v_result_color;
}

```
