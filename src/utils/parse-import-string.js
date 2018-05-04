const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = function parseImportString(loader, filePath, importStr, callback) {
  // Get options config
  const options = loaderUtils.getOptions(loader)
  // match [loader:] synatx and extract --funcNames | path-- from importStr 
  const extract = importStr.match(/^loader\:\s*import\s+((\{.*\})|([\w-]+))\s+from\s+['|"]([./\w-]+)['|"]/)
  const namesRaw = extract[1], pathRaw = extract[4]
  let isRename, names, fullPath

  if (!namesRaw || !path) return callback(new SyntaxError(importStr))

  // Use syntax --import newName from './file'-- will rename the origin funciton name
  // Use syntax --import {funcName} from './file'-- will extract the matched funcion from source 
  if (namesRaw.match(/^\{/)) {
    isRename = false
    names = namesRaw.replace(/[{}\s]/g, '').split(',')
  } else {
    isRename = true
    names = [namesRaw]
  }

  // If config options root
  if (options && options.root && pathRaw.match(/^\//)) {
    fullPath = path.join(path.resolve('./'), options.root, pathRaw)
  } else {
    fullPath = path.join(filePath, pathRaw)
  }

  return {
    isRename,
    names,
    path: fullPath 
  }
}
