module.exports = {
  devServer: {
    port: 8000, // B 端，前端
    proxy: {
      // '/api': 'http://192.168.31.135:3001',
      '/api': 'http://localhost:3001', // mock
    },
  },
}
