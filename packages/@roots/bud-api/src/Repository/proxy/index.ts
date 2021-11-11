import {Configuration, Framework} from '@roots/bud-framework'

export interface proxy {
  (options?: Configuration['server']['proxy'] | false): Framework
}

/**
 * Set proxy settings for the development server.
 *
 * @remarks
 *
 * - By default there is no proxy enabled.
 *
 * - If enabled with no  proxies whatever is running on localhost on port 8000.
 *
 * @example
 * Enable:
 *
 * ```js
 * bud.proxy()
 * ```
 *
 * @example
 * Disable:
 *
 * ```js
 * bud.proxy({enabled: false})
 * ```
 *
 * @example
 * Specify host and port:
 *
 * ```js
 * bud.proxy({
 *  host: 'example.test',
 *  port: 3000,
 * })
 * ```
 *
 * @public @config
 */
export const proxy: proxy = function (options) {
  this as Framework

  if (!this.server) return this

  if (options === false)
    this.store.set('server.middleware.proxy', false)
  else this.store.set('server.middleware.proxy', true)

  if (typeof options !== 'boolean') {
    this.store.set('server.proxy.target', options)
  }

  return this
}
