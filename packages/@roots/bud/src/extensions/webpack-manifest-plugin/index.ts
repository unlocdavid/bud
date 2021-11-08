import {WebpackManifestPlugin} from './webpack-manifest-plugin.dependencies'
import type {Plugin} from './webpack-manifest-plugin.interface'

/**
 * Webpack Manifest Plugin adapter
 *
 * @public
 */
const BudWebpackManifestPlugin: Plugin = {
  /**
   * @public
   */
  name: 'webpack-manifest-plugin',

  /**
   * @public
   */
  options: ({settings}) =>
    settings.get('extension.webpack-manifest-plugin'),

  /**
   * @public
   */
  make: (options, {settings}) => {
    return new WebpackManifestPlugin({
      publicPath: settings.get('location.publicPath'),
      ...options.all(),
    })
  },

  /**
   * @public
   */
  when: app => app.settings.isTrue('manifest'),
}

export const {name, options, make, when} =
  BudWebpackManifestPlugin
