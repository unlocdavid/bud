// @ts-check
const {bud} = require('@roots/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => {
  return [...modules, bud.project('./../../node_modules')]
})

bud.store.get('webpack.plugins.find')

bud.use([
  require('@roots/bud-entrypoints'),
  require('@roots/bud-babel'),
  require('@roots/bud-postcss'),
  require('@roots/bud-react'),
  require('@roots/bud-imagemin'),
  require('@roots/bud-tailwindcss'),
])

bud.postcss.presetEnv({})

bud.entry('create-bud-app', ['app.js', 'global.css']).run()
