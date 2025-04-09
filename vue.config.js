module.exports = {
  devServer: {
    host: '0.0.0.0', // 允许局域网访问（默认 localhost）
    port: 8080,      // 修改端口号，默认 8080
    https: false,    // 是否启用 HTTPS
    open: true       // 启动后自动打开浏览器
  }
}
