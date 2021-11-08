export {readJsonSync} from 'fs-extra'

import {container, LoDashStatic} from '@roots/bud-support'

export const {isEqual} =
  container.resolve<LoDashStatic>('lodash')
