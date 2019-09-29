module.exports = {
  plugins: [
    // require("postcss-pxtorem")({
    //   rootValue: 35.5,
    //   unitPrecision: 5,
    //   propList: ["*", "!font*"],
    //   selectorBlackList: [],
    //   minPixelValue: 1
    // }),
    require('autoprefixer')()
  ]
}
