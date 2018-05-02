const glsl = require('glsl-man')
const error = require('./error-handler.js')

function astGenerator(source, sourcePath) {
  let ast
  try {
    ast = glsl.parse(source)
  } catch(err) {
    err.message += error.glslSyntaxError(err, sourcePath)
    throw err
  } 
  return ast
}

module.exports = {
  astGenerator
}
