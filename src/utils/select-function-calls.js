const selector = require('./selector.js').all
const mask = require('./constructor-mask.js')

module.exports = function selectFunctionCalls(ast) {
  const funcCallsMask = {}
  selector(ast, 'type', 'function_call')
    .forEach(node => {
      // Exclude glsl functions
      if (!mask[node.function_name]) funcCallsMask[node.function_name] = true
    })

  return funcCallsMask
}
