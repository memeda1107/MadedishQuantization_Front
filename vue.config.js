const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // 若需保留 /api，改为 '/api' 或删除此行
      },
    },
  },
});

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // 后端实际地址
//         changeOrigin: true,
//         pathRewrite: { '^/api': '' }, // 重写路径（可选）
//       },
//     },
//   },
// };
