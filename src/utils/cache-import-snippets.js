const selector = require('./selector.js').all

module.exports = function cacheImportSnippets(ast, isRoot, importInfo, cacheNodes, callback) {
  let selectorNodes = []

  // Select function declaration from ast
  const funcDeclar = selector(ast, 'type', 'function_declaration')
    .filter(node => {
      return node.name !== 'main'
    })

  if (importInfo.isRename) {
    if (funcDeclar.length > 1) callback(new SyntaxError(`There are more than 2 function declarations in ${importInfo.path}, try to use -- import {func} from "./path"; -- instead`))

    const newName = importInfo.names[0]
    if (cacheNodes.mask[newName]) return // function has import before 

    funcDeclar[0].name = newName
    selectorNodes.push(funcDeclar[0])
    cacheNodes.mask[newName] = true
  } else {
    importInfo.names.forEach(name => {
      if (cacheNodes.mask[name]) return 

      const matchNode = funcDeclar.filter(node => name === node.name)
      if (matchNode.length === 0) callback(new SyntaxError(`Can't find function declaration by the name [${name}] in ${importInfo.path}`))

      selectorNodes.push(matchNode[0])
      cacheNodes.mask[name] = true
    })
  }

  // In root, cache import id
  isRoot
  ? cacheNodes.anchor.push({anchorId: importInfo.anchorId, nodes: selectorNodes})
  : cacheNodes.snippets.push(...selectorNodes)
} 
