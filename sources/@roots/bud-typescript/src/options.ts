import {Framework} from '@roots/bud-framework'

import {Options} from './fork-ts-checker-webpack-plugin'

/**
 * @public
 */
export interface OptionsFactory {
  (app: Framework): Options
}

/**
 * Configuration to use when bud.mode is `production`.
 *
 * @public
 */
export const production: OptionsFactory = (app: Framework) => ({
  async: false,
  logger: {
    infrastructure: app.logger.instance,
    issues: app.logger.instance,
  },
  typescript: {
    useTypescriptIncrementalApi: true,
    memoryLimit: 4096,
    typescriptPath: require.resolve('typescript'),
    diagnosticOptions: {
      semantic: true,
      syntactic: true,
    },
  },
})

/**
 * options to use when bud.mode is `development`.
 *
 * @public
 */
export const development: OptionsFactory = (app: Framework) => ({
  async: false,
  logger: {
    infrastructure: app.logger.instance,
    issues: app.logger.instance,
  },
  typescript: {
    useTypescriptIncrementalApi: true,
    typescriptPath: require.resolve('typescript'),
    diagnosticOptions: {
      semantic: true,
      syntactic: true,
    },
  },
})
