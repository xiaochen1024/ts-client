const tsImportPluginFactory = require('ts-import-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cdsTreeshaking = require('@teambition/clarity-design/lib/tree-shaking-plugin')
const proxyObject = require('./proxy.conf')

const stylRegex = /\.styl$/
const stylModuleRegex = /\.module\.styl$/

module.exports = {
  webpack: (config, env) => {
    const isEnvDevelopment = env === 'development'
    const isEnvProduction = env === 'production'
    const publicPath = require('react-scripts/config/paths').servedPath
    const shouldUseRelativeAssetPaths = publicPath === './'
    // const shouldUseSourceMap =
    //   isEnvProduction && process.env.GENERATE_SOURCEMAP !== 'false'
    const shouldUseSourceMap = isEnvDevelopment

    const getStyleLoaders = (cssOptions, preProcessor, loaderOptions) => {
      const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && {
          loader: MiniCssExtractPlugin.loader,
          options: Object.assign(
            {},
            shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {}
          ),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            sourceMap: shouldUseSourceMap,
            ...cssOptions,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            sourceMap: shouldUseSourceMap,
          },
        },
      ].filter(Boolean)
      if (preProcessor) {
        loaders.push({
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: shouldUseSourceMap,
            ...loaderOptions,
          },
        })
      }
      return loaders
    }

    config.devtool = shouldUseSourceMap ? 'cheap-module-source-map' : false
    if (process.env.BUNDLE_VISUALIZE) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }

    config.module.rules = config.module.rules.map(rule => {
      if (rule.oneOf instanceof Array) {
        return {
          ...rule,
          oneOf: [
            {
              test: stylRegex,
              exclude: stylModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  localIdentName: '[local]--[hash:base64:5]',
                },
                'stylus-loader'
              ),
            },
            {
              test: stylModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
                'stylus-loader'
              ),
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
                      style: true,
                    }),
                  ],
                }),
                compilerOptions: {
                  module: 'es2015',
                },
              },
              exclude: /node_modules/,
            },
            {
              test: /\.less$/,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  localIdentName: '[local]--[hash:base64:5]',
                },
                'less-loader',
                {
                  modifyVars: {
                    // '@primary-color': '#faad14'
                  },
                  javascriptEnabled: true,
                }
              ),
            },
            ...rule.oneOf,
          ],
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
            ...proxyObject,
          },
          allowedHost
        )
        return config
      }
    }
  },
}
