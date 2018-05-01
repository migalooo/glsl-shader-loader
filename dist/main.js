/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./test/app.js":
/*!*********************!*\
  !*** ./test/app.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shaders_fragments_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/fragments.glsl */ \"./test/shaders/fragments.glsl\");\n/* harmony import */ var _shaders_fragments_glsl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shaders_fragments_glsl__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconsole.log(_shaders_fragments_glsl__WEBPACK_IMPORTED_MODULE_0___default.a)\n\n\n//# sourceURL=webpack:///./test/app.js?");

/***/ }),

/***/ "./test/shaders/fragments.glsl":
/*!*************************************!*\
  !*** ./test/shaders/fragments.glsl ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifdef GL_ES\\nprecision mediump float;\\n#endif\\nstruct dirlight {\\n\\tvec3 direction;\\n\\tvec3 color;\\n};\\nuniform vec2 u_resolution;\\nuniform vec2 u_mouse;\\nuniform float u_time;\\nfloat noise(in vec2 st) {\\n\\tvec2 i = floor(st);\\n\\tvec2 f = fract(st);\\n\\tfloat a = random(i);\\n\\tfloat b = random(i + vec2(1.0, 0.0));\\n\\tfloat c = random(i + vec2(0.0, 1.0));\\n\\tfloat d = random(i + vec2(1.0, 1.0));\\n\\tvec2 u = (f * f) * (3.0 - (2.0 * f));\\n\\treturn (mix(a, b, u.x) + (((c - a) * u.y) * (1.0 - u.x))) + (((d - b) * u.x) * u.y);\\n}\\n#define OCTAVES 6\\nfloat freq(in vec2 st) {\\n\\tfloat value = 0.0;\\n\\tfloat amplitude = .5;\\n\\tfloat frequency = 0.;\\n\\tfor (int i = 0; i < OCTAVES; i++) {\\n\\t\\tvalue += (amplitude * noise(st));\\n\\t\\tst *= 2.;\\n\\t\\tamplitude *= .5;\\n\\t}\\n\\treturn value;\\n}\\nvoid main() {\\n\\tvec2 st = gl_FragCoord.xy / u_resolution.xy;\\n\\tst.x *= (u_resolution.x / u_resolution.y);\\n\\tvec3 no = noise(st);\\n\\tvec3 color = vec3(0.0);\\n\\tcolor += freq(st * 3.0);\\n\\tgl_FragColor = vec4(color, 1.0);\\n}\\n\"\n\n//# sourceURL=webpack:///./test/shaders/fragments.glsl?");

/***/ })

/******/ });