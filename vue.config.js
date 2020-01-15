const path = require('path')
module.exports = {
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
  }
}
