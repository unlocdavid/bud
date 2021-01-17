import * as Plugin from './imagemin'
import {Bud} from '@roots/bud'

export * from './types'

/**
 * Extension name
 */
export const name = '@roots/bud-imagemin'

/**
 * Extension config methods
 */
export * as api from './api'

/**
 * Extension boot
 */
export const boot: Bud.Module.Boot = bud => {
  bud.use(Plugin)
}
