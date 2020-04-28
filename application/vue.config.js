module.exports = {
  /*
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }, */
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      },
      '/pages/*': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'process.env': {
      NODE_ENV: '"development"'
    }
  }
}
