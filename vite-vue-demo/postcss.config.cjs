/* eslint-env node */
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: ['last 2 versions', '> 1%', 'not ie < 11'],
      autoprefixer: {
        grid: true,
      },
    }),
  ],
}
