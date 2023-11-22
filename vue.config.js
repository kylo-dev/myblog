module.exports = {
  devServer:{
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // target: "http://blog-backend:8080",
        changeOrigin: true,
      }
    }
  }
}
