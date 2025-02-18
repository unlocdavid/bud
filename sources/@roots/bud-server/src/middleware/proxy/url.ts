import {Framework} from '@roots/bud-framework'

/**
 * URL helpers for proxy middleware
 *
 * @public
 */
export class ApplicationURL {
  /**
   * Application instance
   *
   * @public
   */
  public get app() {
    return this._app()
  }

  /**
   * Node URL for dev
   *
   * @public
   */
  public get dev(): URL {
    return this.app.server.connection.url
  }

  /**
   * Node URL for proxy
   *
   * @public
   */
  public get proxy(): URL {
    return this.app.hooks.filter('middleware.proxy.target')
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Framework) {}

  /**
   * Asset public path
   *
   * @public
   */
  public get publicPath() {
    const publicPath = this.app.hooks.filter('build.output.publicPath')
    return publicPath !== 'auto' ? publicPath : '/'
  }
}
