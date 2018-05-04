const path = require('path')
const webpack = require('webpack')

webpack({
  mode: 'development',
  entry: path.resolve(__dirname, './app.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(frag|vert|glsl)$/,
        use: {
          loader: path.resolve(__dirname, '../index.js'),
          options: {
            root: '/test/shaders/collections'
          }
        }
      }
    ]
  }
},(err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stats.toString({
    colors: true
  }))
})
