import {Extension, Framework} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'

export type BudHtmlWebpackPlugin = Extension.CompilerPlugin<
  HtmlWebpackPlugin,
  HtmlWebpackPlugin.Options
>

export const BudHtmlWebpackPlugin: BudHtmlWebpackPlugin = {
  name: 'html-webpack-plugin',

  options(app: Framework) {
    return {
      publicPath: app.publicPath(),
      templateParameters: {
        ...(app.env.getPublicEnv() ?? {}),
        ...(app.settings.get(
          'extension.webpack-define-plugin',
        ) ?? {}),
      },
      ...(app.settings.get('extension.html-webpack-plugin') ??
        {}),
    }
  },

  make: options => new HtmlWebpackPlugin(options.all()),

  when: ({settings}) => settings.isTrue('html'),
}
