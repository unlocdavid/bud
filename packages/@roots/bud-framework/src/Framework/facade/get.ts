import {isFunction} from 'lodash'

import {Framework} from '../framework.service'

/**
 * get function interface
 *
 * @internal
 */
export interface get {
  (
    this: Framework,
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework
}

/**
 * get function interface
 *
 * @internal @override
 */
export interface get {
  (name: string, tap?: (app: Framework) => Framework): Framework
}

/**
 * Retrieves a specific {@link Framework | Framework instance} by name.
 *
 * @public
 */
export const get: get = function (
  name: string,
  tap?: (app: Framework) => Framework,
): Framework {
  this.log('get request', name)

  const instance = this.children.get(name)

  if (tap && isFunction(tap)) {
    tap(instance)
  }

  return instance
}
