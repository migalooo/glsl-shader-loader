const fs = require('fs')

module.exports = function extractShaderSource(loader, path) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) return reject(err)

      loader.resolve(loader.context, path, function(err, resolved) {
        if (err) return reject(err)
        loader.addDependency(resolved)

        fs.readFile(resolved, 'utf-8', function(err, shaderSource) {
          if (err) return reject(err)
          resolve(shaderSource)
        })
      })
    })
  })
}
