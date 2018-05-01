const glsl = require('glsl-man')
const parser = require('./parser.js')
const selector = require('./utils/selector.js')

module.exports = function(source){
  this.cacheable && this.cacheable()
  const callback = this.async()
  const cacheNodes = {
    // Function names mask array for remove duplicates funcitons
    mask: {},
    // Save the leaf import shader code
    snippets: [],
    // Save the root import shader code
    anchor: []
  }

  const ast = glsl.parse(source)

  parser(this, this.context, ast, cacheNodes, true, function(err, isRoot) {
    if (err) return callback(err)
    const {anchor, snippets} = cacheNodes

    // No import return source
    if (anchor.length === 0) return callback(null, `module.exports = ${JSON.stringify(source)}`)

    // Insert root import shader code
    if (anchor.length !== 0) {
      anchor.forEach((node, i) => {
        const anchor = selector.id(ast, node.anchorId)
        // Insert root import shader code
        selector.add(anchor, node.nodes.reverse(), true)
      })
    }

    // No deep import, return root import result 
    if (snippets.length !== 0) {
      const fristAnchorId = anchor.reduce((a, b) => a.anchorId < b.anchorId ? a : b).anchorId
      const fristAnchor = selector.id(ast, fristAnchorId)
      // Insert leaf import shader code
      selector.add(fristAnchor, snippets.reverse(), false)
    }

    // Remove #pragma loader:
    const removeNodes = []
    ast.statements
      .forEach(node => {
        if (node.directive === '#pragma' &&  node.value.match(/^loader\:/)) removeNodes.push(node)
      })

    selector.remove(removeNodes) 

    return callback(null, `module.exports = ${JSON.stringify(glsl.string(ast))}`)
  })
}
