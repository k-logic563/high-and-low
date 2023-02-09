const path = require('path')

const mode = process.env.NODE_ENV

module.exports = {
  mode,
  entry: './src/js/index.js',
  output: {
    path: `${__dirname}/js`,
    filename: "main.js"
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    open: true,
    static: './'
  }
}