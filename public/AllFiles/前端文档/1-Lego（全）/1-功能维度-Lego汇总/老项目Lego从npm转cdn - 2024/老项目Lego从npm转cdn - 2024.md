* 启业云官方文档：https://docs.qpaas.com/docs/guide/ynlqozp18vn6nvsc
* 两个参考项目
    * 上汽通用：lego-cli-web
    * 中安惟新【河南骏化】承包商管理系统项目：jhcbs-ui







# 升级CDN导入

## 1. `config/external.js`

```js
  '@qycloud/lego': {
    name: 'lego',
    resources: () => ({
      scripts: [],
      styles: [],
      resources: [],
    }),
  },
```

```js
    importScripts.push(
      `<script src="/napi/unpkg/global.js"></script>`
    );
    importScripts.push(
      `<script src="/napi/unpkg/lego-deps.js"></script>`
    );
    importScripts.push(
      `<script src="/napi/unpkg/lego.js"></script>`
    );
    importStyles.push(
      `<link rel="stylesheet" href="/napi/unpkg/lego.css">`
    );
```





![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2024/images/001.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2024/images/002.png)



## 2. `config/server.js`

```js
/**
 * 以下配置中，如涉及 url，相关配置均不需携带协议头（http 或 https），比如：
 * 错误：https://www.qycloud.com.cn
 * 正确：www.qycloud.com.cn
 */
module.exports = {
  https: true,
  dev: {
    // host: 'dev.zhonganhse.com',       // 可要 可不要，不要就localhost:9001，要就 dev.zhonganhse.com:9001
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
        target: 'https://106.39.132.60:8443/',    // 指定代理地址
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
    www: '106.39.132.60:8443',    // 代理地址
    root: '106.39.132.60:8443',
    sta: '106.39.132.60:8443',
    fileio: '106.39.132.60:8443',
    storeView: '106.39.132.60:8443',
  },
  previewUrl: 'dp.qycloud.com.cn/op/view.aspx?src=',
  router: {
    base: '/csafety-jhcbs/platform',   // 多级路径
  },
};
```



![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2024/images/003.png)





## 3. `config/index.js`

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2024/images/005.png)



![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2024/images/004.png)





















