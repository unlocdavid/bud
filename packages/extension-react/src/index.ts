import {Bud} from '@roots/bud'
import * as ReactRefreshWebpackPlugin from './react-refresh'

import './interfaces'

/**
 * Extension name
 */
export const name = '@roots/bud-react'

/**
 * Extension register
 */
export const boot = (app: Bud) => {
  app.babel
    .addPreset('@babel/preset-react')
    .extensions.add(
      '@pmmmwh/react-refresh-webpack-plugin',
      ReactRefreshWebpackPlugin,
    )
}
