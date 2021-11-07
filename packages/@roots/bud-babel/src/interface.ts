import {Item, Loader} from '@roots/bud-build'

import {BudBabelConfigService} from './config/babel.config.service'
import * as BudBabelExtensionService from './extension/babel.extension.service'

declare module '@roots/bud-framework' {
  interface Framework {
    babel: BudBabelConfigService
  }

  interface Modules {
    '@roots/bud-babel': typeof BudBabelExtensionService
  }

  interface Loaders {
    babel: Loader
  }

  interface Items {
    babel: Item
  }
}
