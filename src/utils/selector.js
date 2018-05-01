const glsl = require('glsl-man')

function all(ast, attr, value) {
  const matches = []
  const selector = glsl.query.selector(`[${attr}=${value}]`)
  glsl.query.all(ast, selector, matches)
  return matches
}

function id(ast, id) {
  const selector = glsl.query.selector(`[id=${id}]`)
  const node = glsl.query.firstChild(ast, selector)
  return node 
}

function add(anchor, node, after) {
  glsl.mod.add(anchor, node, after)
}

function remove(node) {
  if(node instanceof Array) {
    node.forEach(d => {
      glsl.mod.remove(d)
    })
  } else {
    glsl.mod.remove(node)
  }
}

module.exports = {
  all,
  id,
  add,
  remove
}
