import {Container} from '@roots/container'
import {Framework, Service, Store} from '@roots/bud-typings'

/**
 * Framework service
 */
export default class extends Container implements Service {
  [key: string]: any

  _app: () => Framework

  public constructor(
    app: () => Framework,
    repository?: Container['repository'],
    dependencies?: {[key: string]: any},
  ) {
    super(repository)

    this._app = app

    dependencies &&
      Object.entries(dependencies).forEach(
        ([name, item]) => (this[name] = item),
      )
  }

  /**
   * Application instance
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Access store property (which may or may not be callable.)
   */
  public access<T = any>(
    /**
     * Container key
     */
    key: Store.Keys,
    /**
     * If true, result is returned as a new container
     */
    containerize?: boolean,
    /**
     * Object to bind lexeical scope of returned result
     */
    binding?: any,
  ): T | null {
    if (this.isFunction(key)) {
      const value = (binding ? this.get(key) : this.get(key))(
        this.app,
      )

      return containerize ? this.app.makeContainer(value) : value
    }

    if (this.get(key)) {
      const value = this.get(key)
      return containerize ? this.app.makeContainer(value) : value
    }

    return null
  }
}
