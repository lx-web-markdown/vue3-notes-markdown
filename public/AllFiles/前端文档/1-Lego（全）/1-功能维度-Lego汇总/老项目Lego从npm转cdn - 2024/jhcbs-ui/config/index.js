// /open/bee?url=/csafety-jhcbs/platform/chengbaoshangzhangha&title=承包商账户申请
const internalIp = require('internal-ip');
const babelConfig = require('./babel');
const serverConfig = require('./server');
const externalConfig = require('./external');
const { chainWebpackPlugins } = require('./plugin');

const {
  router: { base: publicPath },
} = serverConfig;
const setWebSocketConfig = (server, https) => {
  let webSocketConfig = null;
  Object.keys(server).forEach((key) => {
    if (key === 'ws') {
      const socket = server[key];
      webSocketConfig = {
        socketDomain: `${https ? 'wss' : 'ws'}://${socket}`,
        loginIp: internalIp.v4.sync(),
      };
    }
  });
  return webSocketConfig && JSON.stringify(webSocketConfig);
};

module.exports = {
  publicPath,
  babelConfig,
  externalConfig,
  chainWebpackPlugins,
  get globalConfig() {
    const {
      // eslint-disable-next-line comma-dangle
      https, server, previewUrl, router
    } = serverConfig;
    return {
      router,
      previewUrl: https ? `https://${previewUrl}` : `http://${previewUrl}`,
      server: Object.keys(server).reduce((result, key) => {
        if (
          key === 'root' || key === 'ws' || key === 'websocketProtocol' || key === 'websocket'
        ) {
          result[key] = server[key];
        } else {
          const url = server[key].replace(/\/$/, '');
          result[key] = https ? `https://${url}/` : `http://${url}/`;
        }
        return result;
      }, {}),
      websocketConfig: setWebSocketConfig(server, https),
    };
  },
  get devServer() {
    const {
      https,
      dev: { host, port, proxies },
      server: { www },
    } = serverConfig;
    const parseTarget = (target) => {
      if (/(http|https):\/\/([\w.]+\/?)\S*/.test(target)) {
        return target;
      }
      return https ? `https://${target}` : `http://${target}`;
    };
    const proxy = proxies.reduce((result, { path, target = www }) => {
      result[path] = {
        target: parseTarget(target),
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive',
        },
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('cookie', 'PHPSESSID=422f26fb-b1f9-4b4e-b70c-bccc3277aaa0; access_token=422f26fb-b1f9-4b4e-b70c-bccc3277aaa0; CURRENT_ENT=henanjunhuafazhanguf; ent_user=henanjunhuafazhanguf_6_u0000002136844154; client_string=r96p1fu00000021368441541734936524000');
        },
      };
      return result;
    }, {});
    return {
      // disableHostCheck: true,
      host,
      port,
      proxy,
      // https: https
      //   ? {
      //     spdy: {
      //       protocols: ['http1.1'], // 解决 JSON 响应过大被截断的问题：https://github.com/webpack/webpack-dev-server/issues/1574
      //     },
      //   }
      //   : false,
    };
  },
};
