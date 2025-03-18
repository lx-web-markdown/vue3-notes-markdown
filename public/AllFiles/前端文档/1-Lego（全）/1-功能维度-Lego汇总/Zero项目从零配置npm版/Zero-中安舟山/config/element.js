module.exports = {
  dev: {
    https: false,
    host: 'zyh.lets-me.demo.qpaas.com',
    port: 8080,
    proxies: [], // 只需配置平台以外的接口转发
  },
  server: {
    www: 'www.lets-me.demo.qpaas.com:22122',
  },
  router: {
    base: '/',
  },
};
