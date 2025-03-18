/**
 * 以下配置中，如涉及 url，相关配置均不需携带协议头（http 或 https），比如：
 * 错误：https://www.qycloud.com.cn
 * 正确：www.qycloud.com.cn
 */
module.exports = {
  https: false,
  dev: {
    host: 'dev.qycloud.com.cn',
    port: 8080,
    /**
     * 代理配置格式：{ path: String, target: String }
     * target 默认值为配置项 server.wwww 的值
     */
    proxies: [
      { path: '/api' },
      { path: '/api2' },
      { path: '/napi' },
      { path: '/service_org' },
    ],
  },
  server: {
    root: 'qycloud.com.cn',
    www: 'www.qycloud.com.cn',
    sta: 'static.qycloud.com.cn',
    fileio: 'fileio.qycloud.com.cn',
    storeView: 'fileio.qycloud.com.cn',
  },
  previewUrl: 'dp.qycloud.com.cn/op/view.aspx?src=',
  router: {
    base: '/',
  },
};
