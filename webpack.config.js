const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

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
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8000,
      server: {
        baseDir: './'
      },
      files: ['index.html', 'js/main.js']
    })
  ]
}