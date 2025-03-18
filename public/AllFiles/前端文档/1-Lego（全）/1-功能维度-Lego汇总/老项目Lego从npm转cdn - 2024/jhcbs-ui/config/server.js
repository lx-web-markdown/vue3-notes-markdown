/**
 * 以下配置中，如涉及 url，相关配置均不需携带协议头（http 或 https），比如：
 * 错误：https://www.qycloud.com.cn
 * 正确：www.qycloud.com.cn
 */
module.exports = {
  https: true,
  dev: {
    // host: 'dev.zhonganhse.com',
    port: 9001,
    /**
     * 代理配置格式：{ path: String, target: String }
     * target 默认值为配置项 server.wwww 的值
     */
    proxies: [
      { path: '/api' },
      { path: '/api2' },
      { path: '/napi' },
      { path: '/micro-apps' },
      { path: '/sapi' },
      { path: '/service_org' },
      {
        path: '/sdkintelberth',
        target: 'https://106.39.132.60:8443/',

      },
      {
        path: '/coscosdk',
        target: 'http://106.39.132.60:8443/',
      },
      {
        path: '/zshse/',
        target: 'http://106.39.132.60:8443/',
      },
      {
        path: '/safetyjapi',
        target: 'http://106.39.132.60:8443/',
      },

    ],
  },
  server: {
    www: '106.39.132.60:8443',
    root: '106.39.132.60:8443',
    sta: '106.39.132.60:8443',
    fileio: '106.39.132.60:8443',
    storeView: '106.39.132.60:8443',
  },
  previewUrl: 'dp.qycloud.com.cn/op/view.aspx?src=',
  router: {
    base: '/',
  },
};
