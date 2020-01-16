const path = require('path')
// const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@ant-design/icons/lib/dist$', path.resolve(__dirname, 'src/antdIcon.js'))
  },
  configureWebpack: config => {
    config.externals = {
      '_g6': 'G6'
    }
  }
}
