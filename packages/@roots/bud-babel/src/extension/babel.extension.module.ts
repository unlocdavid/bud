import {Bud} from '@roots/bud'
import {Item, Loader} from '@roots/bud-build'
import {
  container,
  inject,
  Lifecycle,
  scoped,
} from '@roots/bud-support'

import {
  DEFAULT_PLUGINS,
  DEFAULT_PRESETS,
  ident,
} from '../babel.constants'
import {BudBabelConfig} from '../config/babel.config.module'

@scoped(Lifecycle.ContainerScoped)
export class BudBabelExtension {
  public name = '@roots/bud-babel'

  public constructor(
    @inject('bud') public bud: Bud,
    @inject(ident.config) public config: BudBabelConfig,
  ) {}

  public async register(bud) {
    bud.dump(this.config)

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
