module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  },
  configureWebpack: {
    devServer: {
      compress: true,
      disableHostCheck: true
    }
  }
}
