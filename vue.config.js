const proxyObj = {}
proxyObj['/apis'] = {
  target: 'http://10.34.3.12:8000',
  changeOrigin: false,
  pathRewrite: {
    '^/apis': ''
  }
}
module.exports = {
  lintOnSave: false,
  devServer: {
    host: '10.34.3.12',
    port: 8899,
    proxy: proxyObj
  }
}