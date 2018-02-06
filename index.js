module.exports = function(source){
  this.cacheable()
  // check void main function
  const isMain = /void(\s){1,}main/

  if (isMain.test(source)) {
    return reshapeMainSource(source)
  } else {
    const snippets = praseToSnippets(source)
    return reshapeFunctionSource(snippets)
  }
}

/**
 * Break GLSL functions into code snippets
 */
const praseToSnippets = function(source) {
  const names = []
  const removeSpace = /^\s*\n/gm
  const findGLSLFunctions = /(\/\*([\s\S]*?)\*\/\n*)*(\/\/.*\n)*(float|int|[ib]?vec[2-4]{1}|mat[2-4]{1}|bool)\s+([a-zA-Z0-9_]+)\s*\(.*\)\s*\{/g
  const borderMARK = '@@MARK@@'

  const snippets = source
    .replace(removeSpace, '')
    .replace(findGLSLFunctions, function(data){
      names.push(arguments[5])
      return borderMARK + data
    })
    .split(borderMARK)
    .filter(data => !!data)
    .map((snippet, index) => {
      return {
        name: names[index],
        snippet: snippet
      }
    })
  return snippets 
}

/**
 * Reshape the glsl function to es6 export module 
 */
const reshapeFunctionSource = function(snippets) {
  if (snippets.length === 0) return 
  const merge = snippets.map((data, index) => {
    return `export function ${data.name}() {
      return \`${data.snippet}\`
    }`
  }).join('\n')

  return merge
}

/**
 * Merge glsl shader function code into main entery code
 */
const reshapeMainSource = function(source) {
  // check import statement
  const hasImport = /import(\s){1,}/
  if (!hasImport.test(source)) return `export default \`${source}\``
  // extract import statement
  const findImport = /^[\ \t]*import\s+\{(.*)\}\s+from.*/gm 

  const importsSnippets = [], functionNameSnippets = []

  // parse import lines 
  const mainSnippets = source
    .replace(findImport, function(data){
      importsSnippets.push(arguments[0])
      const functionString = arguments[1]
      const functionNames = functionString
        .split(/\s+|\,/g)
        .filter(data=>!!data)
        .map(data=>data+'()')
      functionNameSnippets.push(...functionNames)
      return ''
    })
    .split(/(?=void)/)

  const exportArrayString = `[\`${mainSnippets[0]}\`, ${functionNameSnippets.join(',')}, \`${mainSnippets[1]}\`]`
  const exportCode = `export default ${exportArrayString}.join(\`\n\`)`
  const mergeCode = importsSnippets.concat([exportCode]).join('\n')

  return mergeCode
}
