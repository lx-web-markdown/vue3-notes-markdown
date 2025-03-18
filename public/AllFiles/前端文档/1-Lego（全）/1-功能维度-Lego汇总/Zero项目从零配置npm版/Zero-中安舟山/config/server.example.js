module.exports = {
  dev: {
    https: true,
    host: 'dev.qycloud.com.cn',
    port: 8080,
    proxies: [], // 只需配置平台以外的接口转发
  },
  server: {
    www: 'www.qycloud.com.cn',
  },
  router: {
    base: '/',
  },
};
