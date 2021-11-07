import {Container} from '@roots/container'

import {Extension, Mode} from '../'
import {Configuration} from '../Configuration'
import {Service} from '../Service'
import {Framework} from './framework.service'

/**
 * Framework Constructor
 */
export type Constructor = new (
  services: Container<Service>,
  settings: Configuration,
) => Framework

/*
 * Constructor options
 */
export interface Options {
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
