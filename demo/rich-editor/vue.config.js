const path = require('path')
const vConsolePlugin = require('vconsole-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')(),
          require('postcss-plugin-px2rem')({
            rootValue: 75,
            exclude: /(node_module)/,
            mediaQuery: false,
            minPixelValue: 2
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    let isDev = process.env.NODE_ENV === 'development'
    let devPlugins = [
      new vConsolePlugin({
        enable: isDev
      })
    ]
    config.plugins = [...config.plugins, ...devPlugins]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  }
}
