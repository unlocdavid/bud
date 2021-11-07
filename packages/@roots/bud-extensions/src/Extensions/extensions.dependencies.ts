import {container, LoDashStatic} from '@roots/bud-support'

export const {bind} = container.resolve('decorators')
export const {
  isEqual,
  isString,
  get,
  isFunction,
  isNull,
  isUndefined,
} = container.resolve<LoDashStatic>('lodash')
