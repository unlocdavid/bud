import {
  bind,
  container,
  fs,
  LoDashStatic,
} from '@roots/bud-support'

export {bind}

export const {existsSync} = fs

export const {isString} =
  container.resolve<LoDashStatic>('lodash')
