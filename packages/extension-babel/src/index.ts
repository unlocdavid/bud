import {Bud} from '@roots/bud'
import {addPlugin} from './api/addPlugin'
import {setOptions} from './api/setOptions'
import {addPreset} from './api/addPreset'

import './types'

/**
 * Extension ident
 */
export const name = '@roots/bud-babel'

/**
 * Register babel
 */
export const boot = (app: Bud) => {
  Object.assign(app, {
    /**
     * Babel config object.
     */
    babel: {
      /**
       * Set transform/loader options.
       */
      setOptions: setOptions.bind(app),

      /**
       * Plugins.
       */
      addPlugin: addPlugin.bind(app),

      /**
       * Presets.
       */
      addPreset: addPreset.bind(app),
    },
  })

  app.build
    .set('items.babel', {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [],
        plugins: [],
      },
    })
    .mutate('rules.js.use', use => [
      app.build.access('items.cache'),
      app.build.access('items.thread'),
      app.build.access('items.babel'),
    ])

  app.babel
    .addPreset('@babel/preset-env')
    .babel.addPlugin('@babel/plugin-transform-runtime', {
      helpers: false,
    })
    .babel.setOptions({
      root: app.project(),
      cacheDirectory: app.project(app.options.get('storage')),
    })
}
