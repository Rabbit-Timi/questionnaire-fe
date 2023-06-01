module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://192.168.31.135:3001',
    },
  },
}
