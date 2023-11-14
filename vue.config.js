module.exports = {
  devServer:{
    proxy: {
      '/api': {
        target: 'http://location:8080'
      }
    }
  }
}
