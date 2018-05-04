const fs = require('fs')
const path = require('path')
const astGenerator = require('./utils/ast-generator.js').astGenerator
const parseImportString   = require('./utils/parse-import-string.js')
const extractShaderSource = require('./utils/extract-shader-source.js')
const cacheImportSnippets = require('./utils/cache-import-snippets.js')
const selectFunctionCalls = require('./utils/select-function-calls.js')

// In root source, mark the position of import and stored in [anchor], we will replace with shader code after import all shader functions
// In leaf source, to remove duplicates, all the shader code will stored in [snippets] and insert before the frist import statements in root
module.exports = function parser(loader, filePath, ast, cacheNodes, isRoot, callback) {

  // Parse function calls in source
  const funcCallsMask = selectFunctionCalls(ast)
  // Extract --#pragma loader:-- from ast and analyze
  const importInfoArr = ast.statements
    .filter(node => {
      return node.directive === '#pragma' &&  node.value.match(/^loader\:/)
    })
    .map(node => {
      const importInfo = parseImportString(loader, filePath, node.value, callback)
      // Check import statement accessable
      fs.accessSync(importInfo.path)

      if (isRoot) importInfo.anchorId = node.id
      // Filter unexecuted function
      importInfo.names = importInfo.names.filter(name => {
        if (funcCallsMask[name]) return true
        console.info(`[glsl-shader-loader] Info: glsl function '${name}' not imported because it was not called.\n @ ${node.value}` )
        return false
      })

      return importInfo
    })
    .filter(data => data.names.length > 0)

  if (!importInfoArr || importInfoArr.length === 0) return callback(null) 

  // Import shader source 
  Promise.all(importInfoArr.map(data => extractShaderSource(loader, data.path)))
    .then(shaderSources => {
        return Promise.all(shaderSources.map((source, i) => {
          const filePath = importInfoArr[i].path
          const dirname = path.dirname(filePath)
          const astLeaf = astGenerator(source, filePath)

          cacheImportSnippets(astLeaf, isRoot, importInfoArr[i], cacheNodes, callback)
          return deepParser(parser, loader, astLeaf, dirname, cacheNodes)
        }))
    })
    .then(info => {
      return callback(null)
    })
    .catch(err => callback(err))
}

function deepParser(parser, loader, astLeaf, dirname, cacheNodes) {
  return new Promise((resolve, reject) => {
    parser(loader, dirname, astLeaf, cacheNodes, false, function(err){
      if (err)  return reject(err) 
      resolve()
    })
  })
}
