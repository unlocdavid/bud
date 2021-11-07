import {container, LoDashStatic} from '@roots/bud-support'

export const {bind} = container.resolve('decorators')

export const {isFunction, isUndefined} =
  container.resolve<LoDashStatic>('lodash')
