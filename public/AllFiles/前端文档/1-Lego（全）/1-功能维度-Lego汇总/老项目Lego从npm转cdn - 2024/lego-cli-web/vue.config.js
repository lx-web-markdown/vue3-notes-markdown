const autoprefixer = require('autoprefixer');
const path = require('path');
const {
  publicPath, babelConfig, externalConfig, devServer, globalConfig, chainWebpackPlugins,
} = require('./config');

function chainWebpackGloablConfig(config) {
  config.plugin('html').tap((args) => {
    args[0].templateParameters = {
      ...(args[0].templateParameters),
      globalConfig,
    };
    return args;
  });
}

module.exports = {
  publicPath,
  devServer,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    externalConfig.chainWebpackExternals(config);
    chainWebpackPlugins(config);
    chainWebpackGloablConfig(config);
  },
  configureWebpack: {
    externals: externalConfig.externals,
    devtool: 'none',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [
            path.join(__dirname, '/node_modules/element-ui'),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig,
            },
          ],
        },
      ],
    },
  },
};
