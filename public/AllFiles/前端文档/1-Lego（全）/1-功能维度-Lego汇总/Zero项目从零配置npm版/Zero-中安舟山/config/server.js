module.exports = {
  dev: {
    https: true,
    // https: false,
    // host: 'dev.www.qycloud.com.cn',
    host: 'dev.www.zhonganhse.com',
    port: 8080,
    proxies: [], // 只需配置平台以外的接口转发
  },
  server: {
    www: 'https://www.zhonganhse.com/',
    // www: 'https://www.sinochemlogistics.com/',
  },
  router: {
    base: '/',
  },
};
