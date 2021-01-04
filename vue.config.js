const proxyObj = {}
proxyObj['/apis'] = {
  target: 'http://10.34.3.12:8199',
  changeOrigin: true,
  pathRewrite: {
    '^/apis': ''
  }
}
module.exports = {
  lintOnSave: false,
  devServer: {
    host: '10.34.3.12',
    port: 8199,
    proxy: proxyObj
  }
}