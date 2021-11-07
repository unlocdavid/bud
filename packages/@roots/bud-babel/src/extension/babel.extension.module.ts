import {Item, Loader} from '@roots/bud-build'
import {Framework} from '@roots/bud-framework'
import {container, inject, Lifecycle, scoped} from 'tsyringe'

const {bind} = container.resolve('decorators')

import {
  DEFAULT_PLUGINS,
  DEFAULT_PRESETS,
} from '../babel.constants'
import {BudBabelConfig} from '../config/babel.config.module'

@scoped(Lifecycle.ContainerScoped)
export class BudBabelExtension {
  public name = '@roots/bud-babel'

  public constructor(
    @inject('bud.babel') public config: BudBabelConfig,
  ) {}

  @bind
  public async register(bud: Framework) {
    bud.babel = this.config

    bud.build.loaders.babel = new Loader(() =>
      require.resolve('babel-loader'),
    )

    bud.build.items.babel = new Item({
      loader: ({build}) => build.loaders.babel,
      options: app => {
        const options: {
          cacheDirectory: string
          env: any
          root: string
          presets?: any
          plugins?: any
        } = {
          cacheDirectory: app.path('storage', 'cache', 'babel'),
          env: {
            development: {
              compact: false,
            },
          },
          root: app.path('src'),
        }

        if (app.babel?.presets) {
          options.presets = Object.values(app.babel.presets)
        }

        if (app.babel?.plugins) {
          options.plugins = Object.values(app.babel.plugins)
        }

        return options
      },
    })

    bud.build.rules.js.use = app => [app.build.items.babel]

    bud.babel
      .setPresets(DEFAULT_PRESETS)
      .setPlugins(DEFAULT_PLUGINS)
  }
}
