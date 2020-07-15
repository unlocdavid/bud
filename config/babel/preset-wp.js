/**
 * @roots/babel-preset-wp
 */

module.exports = {
  presets: [
    require('@babel/preset-env', {
      modules: false,
      forceAllTransforms: true,
    }),
    require('@babel/preset-typescript'),
    require('@babel/preset-react'),
  ],
  plugins: [
    require('@babel/plugin-syntax-dynamic-import'),
    require('@babel/plugin-proposal-object-rest-spread'),
    [
      require('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
    ],
    require('babel-plugin-macros'),
  ],
}
