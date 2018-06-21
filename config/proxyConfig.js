module.exports = {
  proxy: {
    '/project': {    //将www.exaple.com印射为/apis
      target: 'http://localhost:8081/project/',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/project': ''   //需要rewrite的,
      }
    }
  }
}
