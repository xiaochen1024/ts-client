module.exports = {
  plugins: [
    require("postcss-pxtorem")({
      rootValue: 35.5,
      unitPrecision: 5,
      propList: ["*", "!font*"],
      selectorBlackList: [],
      minPixelValue: 1
    }),
    require('autoprefixer')({
      browsers: [
        'ie >= 10',
        'last 10 Chrome version',
        'last 10 Firefox version',
        'last 2 Edge version',
        'Safari >= 8',
        'last 5 Opera version'
      ]
    })
  ]
}
