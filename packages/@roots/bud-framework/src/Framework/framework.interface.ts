import {Extension, Mode, Services} from '../'
import {Configuration} from '../Configuration'
import {Framework} from './framework.service'

/**
 * Framework Constructor
 */
export type Constructor = new (options: Options) => Framework

/*
 * Constructor options
 */
export interface Options {
  /**
   * Application name
   *
   * @remarks
   * In the context of the parent compiler this options is used
   * for many things, including determining where to look for configuration
   * files and fundamental, related conventions.
   *
   * @defaultValue 'bud'
   *
   * @internal
   */
  name: string

  /**
   * The mode to run the application in. Either `production` or `development`.
   *
   * @public
   */
  mode?: Mode

  /**
   * The object providing initial configuration values.
   *
   * @remarks
   * It is probable that extensions and services will modify
   * values introduced in this object. If you are looking to simply modify
   * configuration values it is generally a better idea to use the
   * {@link @roots/bud-hooks#Hooks | Hooks class} instead.
   *
   * @public
   */
  config?: Partial<Configuration>

  /**
   * Framework services
   * @public
   */
  services?: Services

  /**
   * @internal
   */
  childOf?: Framework

  /**
   * Extensions to be registered
   *
   * @public
   */
  extensions?: () => Record<
    string,
    Extension.Module | Extension.CompilerPlugin
  >
}
