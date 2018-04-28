const path = require('path')

module.exports = function parseImportString(filePath, importStr, callback) {
  // match [loader:] synatx and extract --funcNames | path-- from importStr 
  const extract = importStr.match(/^loader\:\s*import\s+((\{.*\})|([\w-]+))\s+from\s+['|"]([./\w-]+)['|"]/)
  const namesRaw = extract[1], pathRaw = extract[4]
  let isRename, names

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

  return {
    isRename,
    names,
    path: path.join(filePath, pathRaw)
  }
}
