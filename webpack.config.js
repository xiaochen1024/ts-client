const tsImportPluginFactory = require('ts-import-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const cdsTreeshaking = require('@teambition/clarity-design/lib/tree-shaking-plugin')
const proxyObject = require('./proxy.conf')

module.exports = {
  webpack: (config, env) => {
    config.devtool =
      config.mode === 'development' ? 'cheap-module-source-map' : false
    if (process.env.BUNDLE_VISUALIZE) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    config.module.rules = config.module.rules.map(rule => {
      if (rule.oneOf instanceof Array) {
        return {
          ...rule,
          oneOf: [
            {
              test: /\.styl$/,
              loader: 'style-loader!css-loader!stylus-loader'
            },
            {
              test: /\.(jsx|tsx|js|ts)$/,
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: [
                    cdsTreeshaking()(),
                    tsImportPluginFactory({
                      libraryName: 'antd',
                      libraryDirectory: 'lib',
                      style: true
                    }),
                  ]
                }),
                compilerOptions: {
                  module: 'es2015'
                }
              },
              exclude: /node_modules/
            },
            {
              test: /\.less$/,
              use: [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader' // translates CSS into CommonJS
                },
                {
                  loader: 'less-loader', // compiles Less to CSS
                  options: {
                    modifyVars: {
                      // '@primary-color': '#faad14'
                    },
                    javascriptEnabled: true
                  }
                }
              ]
            },
            ...rule.oneOf
          ]
        }
      }
      return rule
    })
    // console.log(JSON.stringify(config))
    return config
  },
  devServer: function(configFunction, env) {
    if (env === 'development') {
      return (proxy, allowedHost) => {
        const config = configFunction(
          {
            ...proxy,
            ...proxyObject
          },
          allowedHost
        )
        return config
      }
    }
  }
}
