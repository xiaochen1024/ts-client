const postcss = require('postcss')
const pxtorem = require('postcss-pxtorem')

module.exports = postcss.plugin('postcss-pxtorem-exclude', function(options) {
  const cssHandle = pxtorem(options)
  function matchExcludes(file, exclude) {
    if (exclude && Array.isArray(exclude)) {
      for (let i = 0; i <= exclude.length - 1; i++) {
        if (file.match(exclude[i]) !== null) {
          return true
        }
      }
      return false
    } else {
      throw Error('exclude选项应是是个数组')
    }
  }
  return function(css, result) {
    if (matchExcludes(css.source.input.file, options.exclude)) {
      // result.root = css
      return
    }

    cssHandle(css)
  }
})
