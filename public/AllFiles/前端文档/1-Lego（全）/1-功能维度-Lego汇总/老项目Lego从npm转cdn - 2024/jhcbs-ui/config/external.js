const path = require('path');
const { router } = require('./server');

const publicPath = router.base.replace(/\/$/, '');

function getDistVendorResources(key, isDevelopment) {
  const scripts = [];
  if (isDevelopment) {
    scripts.push(path.join(__dirname, `../node_modules/${key}/dist/${key}.js`));
  } else {
    scripts.push(path.join(__dirname, `../node_modules/${key}/dist/${key}.min.js`));
  }

  return {
    scripts,
    styles: [],
    resources: [],
  };
}

const externalConfigs = {
  'vue': {
    name: 'Vue',
    resources: isDevelopment => getDistVendorResources('vue', isDevelopment),
  },
  'vuex': {
    name: 'Vuex',
    resources: isDevelopment => getDistVendorResources('vuex', isDevelopment),
  },
  'vue-router': {
    name: 'VueRouter',
    resources: isDevelopment => getDistVendorResources('vue-router', isDevelopment),
  },
  'jquery': {
    name: 'jQuery',
    resources: isDevelopment => getDistVendorResources('jquery', isDevelopment),
  },
  'element-ui': {
    name: 'ELEMENT',
    resources: () => ({
      scripts: [path.join(__dirname, '../node_modules/element-ui/lib/index.js')],
      styles: [path.join(__dirname, '../node_modules/element-ui/lib/theme-chalk/index.css')],
      resources: [path.join(__dirname, '../node_modules/element-ui/lib/theme-chalk/fonts')],
    }),
  },
  '@qycloud/lego': {
    name: 'lego',
    resources: () => ({
      scripts: [],
      styles: [],
      resources: [],
    }),
  },
};

module.exports = {
  get externals() {
    return Object.keys(externalConfigs).reduce((result, key) => {
      result[key] = externalConfigs[key].name;
      return result;
    }, {});
  },

  chainWebpackExternals(config) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const { importScripts, importStyles, copyConfigs } = Object.keys(externalConfigs).reduce((result, key) => {
      const { scripts, styles, resources } = externalConfigs[key].resources(isDevelopment);
      const { version } = require(path.join(__dirname, `../node_modules/${key}/package.json`));
      scripts.forEach((script) => {
        const distFileName = `${key}-${version}/${path.basename(script)}`;
        result.copyConfigs.push({
          from: script,
          to: path.join(__dirname, `../dist/js/${distFileName}`),
        });
        result.importScripts.push(`<script src="${publicPath}/js/${distFileName}"></script>`);
      });

      styles.forEach((style) => {
        const distFileName = `${key}-${version}/${path.basename(style)}`;
        result.copyConfigs.push({
          from: style,
          to: path.join(__dirname, `../dist/css/${distFileName}`),
        });
        result.importStyles.push(`<link rel="stylesheet" href="${publicPath}/css/${distFileName}">`);
      });

      resources.forEach((resource) => {
        const distFileName = `${key}-${version}/${path.basename(resource)}`;
        result.copyConfigs.push({
          from: resource,
          to: path.join(__dirname, `../dist/css/${distFileName}`),
        });
      });

      return result;
    }, { importScripts: [], importStyles: [], copyConfigs: [] });

    config.plugin('copy').tap((args) => {
      args[0] = [...args[0], ...copyConfigs];
      return args;
    });

    importStyles.push(
      '<link rel="stylesheet" href="/napi/unpkg/lego.css">',
    );

    importScripts.push(
      '<script src="/napi/unpkg/global.js"></script>',
    );
    importScripts.push(
      '<script src="/napi/unpkg/lego-deps.js"></script>',
    );
    importScripts.push('<script src="/napi/unpkg/lego.js"></script>');

    importScripts.push(
      '<script type="text/javascript" src="/public/dist/framework/external.js"></script>',
    );

    config.plugin('html').tap((args) => {
      args[0].templateParameters = {
        ...(args[0].templateParameters),
        importStyles: importStyles.join('\n'),
        importScripts: importScripts.join('\n'),
      };
      return args;
    });
  },
};
