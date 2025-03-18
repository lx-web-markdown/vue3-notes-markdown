const babelConfig = require('./babel');
const serverConfig = require('./server');
const externalConfig = require('./external');
const { chainWebpackPlugins } = require('./plugin');

const {
  router: { base: publicPath },
} = serverConfig;

module.exports = {
  publicPath,
  babelConfig,
  externalConfig,
  chainWebpackPlugins,
  get globalConfig() {
    const { https, server, previewUrl, router } = serverConfig;
    return {
      router,
      previewUrl: https ? `https://${previewUrl}` : `http://${previewUrl}`,
      server: Object.keys(server).reduce((result, key) => {
        if (key === 'root') {
          result[key] = server[key];
        } else {
          const url = server[key].replace(/\/$/, '');
          result[key] = https ? `https://${url}/` : `http://${url}/`;
        }
        return result;
      }, {}),
    };
  },
  get devServer() {
    const {
      https,
      dev: { host, port, proxies, cookieDomain },
      server: { www, root },
    } = serverConfig;
    const parseTarget = (target) => {
      if (/(http|https):\/\/([\w.]+\/?)\S*/.test(target)) {
        return target;
      }
      return https ? `https://${target}` : `http://${target}`;
    };
    const proxy = proxies.reduce((result, { path, target = www }) => {
      const resultTemp = result;
      console.log('parseTarget(target)', parseTarget(target));
      resultTemp[path] = {
        target: parseTarget(target),
        secure: https,
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive',
        },
        onProxyReq(proxyReq, req) {
          const { cookie } = req.headers;
          
          proxyReq.setHeader('referer', parseTarget(target));
          proxyReq.setHeader('host', root);

          proxyReq.setHeader(
            'cookie',
            'PHPSESSID=d4e726d0-728c-4fdf-b8ba-710294c1b617; access_token=d4e726d0-728c-4fdf-b8ba-710294c1b617; CURRENT_ENT=shangqitongyongqiche; ent_user=shangqitongyongqiche_6_admin; locale=zh-CN'
          );
        },
        onProxyRes(proxyRes) {
          const proxyResTemp = proxyRes;
          const setCookies = proxyRes.headers['set-cookie'];
          if (setCookies) {
            proxyResTemp.headers['set-cookie'] = setCookies.map((v) =>
              v.replace(/domain=.*;/g, `domain=${cookieDomain};`)
            );
          }
        },
      };

      console.log('result:::proxy', result);

      return result;
    }, {});
    return {
      disableHostCheck: true,
      // host,
      // port,
      proxy,
      https: https
        ? {
            spdy: {
              protocols: ['http1.1'], // 解决 JSON 响应过大被截断的问题：https://github.com/webpack/webpack-dev-server/issues/1574
            },
          }
        : false,
    };
  },
};
