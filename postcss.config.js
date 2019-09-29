module.exports = {
  plugins: [
    require('./buildUtils/postcss-pxtorem-exclude.js')({
      rootValue: 35.5,
      unitPrecision: 5,
      propList: ['*', '!font*'],
      selectorBlackList: [],
      minPixelValue: 1,
      exclude: ['@teambition', 'pages/PC', 'components/PC'],
    }),
    require('autoprefixer')(),
  ],
}
