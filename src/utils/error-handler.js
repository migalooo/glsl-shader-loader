function glslSyntaxError(err, path) {
  if (err['name'] !== 'SyntaxError') return err
  const {line, column} = err.location.start
  const codePosition = ` @ ${path} ${line}:${column}`
  return codePosition 
}

module.exports = {
  glslSyntaxError
}
