// 上汽通用PC
module.exports = {
  https: false,
  dev: {
    host: 'dev.b2eapi.saic-gm.com', // 'dev.ohsms.apps.saic-gm.com',
    port: 5075,
    proxies: [
      {
        path: '/api',
      },
      {
        path: '/eai',
      },
      {
        path: '/api2',
      },
      {
        path: '/napi',
      },
      {
        path: '/service_org',
      },
      {
        path: '/sdkApi',
      },
      {
        path: '/sapi',
      },
      {
        path: '/space-*'
      },
    ],
  },
  server: {
    //   测试环境 http sqty
    // root: 'tongyong.demo.qpaas.com',
    // www: 'www.tongyong.demo.qpaas.com:22331',
    // sta: 'static.tongyong.demo.qpaas.com:22331',
    // fileio: 'fileio.tongyong.demo.qpaas.com:22331',
    // 新测试环境 http sqty
    // www: 'www.sgm.demo.qpaas.com:22331',
    // sta: 'static.sgm.demo.qpaas.com:22331',
    // fileio: 'www.sgm.demo.qpaas.com:22331',
    // 新内网正式环境 http sqty
    root: '10.203.86.210',
    www: '10.203.86.210:5075',
    sta: '10.203.86.210:28003',
    fileio: '10.203.86.210:5075',
    previewService: '10.203.86.210:5075',
    // pre外网  https sqty
    // root: 'apigatewayqa.sgmlink.com',
    // www: 'apigatewayqa.sgmlink.com:5075',
    // sta: 'apigatewayqa.sgmlink.com:5075/beetest',
    // fileio: 'apigatewayqa.sgmlink.com:5075',
    // pre内网 http  sqtynw
    // root: '10.203.123.216',
    // www: '10.203.123.216:15000',
    // sta: '10.203.123.216:18002',
    // fileio: '10.203.123.216:15000',
    // 正式线上外网 https  sqty
    // root: 'b2eapi.saic-gm.com',
    // www: 'b2eapi.saic-gm.com:5075',
    // sta: 'b2eapi.saic-gm.com:4011/beetest',
    // fileio: 'b2eapi.saic-gm.com:5075',
    // 正式上汽线上内网  https  sqtynw
    // root: 'ohsms.apps.saic-gm.com',
    // www: 'ohsms.apps.saic-gm.com',
    // sta: 'ohsms.apps.saic-gm.com:18002',
    // fileio: 'ohsms.apps.saic-gm.com',
  },
  previewUrl: 'dp.qycloud.com.cn/op/view.aspx?src=',
  router: {
    base: '/bee/sqty',
  },
};
