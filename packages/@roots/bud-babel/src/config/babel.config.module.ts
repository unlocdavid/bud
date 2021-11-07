import {injectable} from 'tsyringe'

import {bind} from '../babel.dependencies'
import {Registry} from './babel.config.interface'

@injectable()
export class BudBabelConfig {
  /**
   * @public
   */
  public plugins: Registry = {}

  /**
   * @public
   */
  public presets: Registry = {}

  /**
   * Class constructor
   *
   * @public
   */
  public constructor() {}

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPreset(
    name: string,
    preset: [string, any] | string,
  ): this {
    if (Array.isArray(preset)) {
      this.presets[name] = preset
      return this
    }

    this.presets[name] = [preset]
    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPresets(presets: {
    [key: string]: [string, any] | string
  }): this {
    this.presets = Object.entries(presets).reduce(
      (presets, [name, preset]) => {
        if (Array.isArray(preset)) {
          presets[name] = preset
          return presets
        }

        presets[name] = [preset]
        return presets
      },
      {},
    )

    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public unsetPreset(preset: string) {
    this.presets[preset] && delete this.presets[preset]
    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [
      this.presets[preset].shift(),
      options,
    ]

    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPlugin(
    name: string,
    plugin: [any, any] | string,
  ): this {
    if (Array.isArray(plugin)) {
      this.plugins[name] = plugin
      return this
    }

    this.plugins[name] = [plugin]
    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPlugins(plugins: {
    [key: string]: [any, any] | string
  }): this {
    this.plugins = Object.entries(plugins).reduce(
      (plugins, [name, plugin]) => {
        if (Array.isArray(plugin)) {
          plugins[name] = plugin
          return plugins
        }

        plugins[name] = [plugin]
        return plugins
      },
      {},
    )

    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public unsetPlugin(plugin: string) {
    this.plugins[plugin] && delete this.plugins[plugin]
    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [
      this.plugins[plugin].shift(),
      options,
    ]

    return this
  }
}
