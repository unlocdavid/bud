import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

/**
 * Configure Babel transpiler plugin & presets
 *
 * @example
 * ```js
 * app.babel.setPlugins([
 *  ['@babel/plugin-transform-runtime', {helpers: false}],
 *  '@babel/plugin-proposal-object-rest-spread',
 *  '@babel/plugin-syntax-dynamic-import',
 *  '@babel/plugin-proposal-class-properties',
 * ])
 * ```
 *
 * @public @extension @config
 */
export interface Config {
  /**
   * Registered babel plugins
   *
   * @public
   */
  plugins: Config.Registry

  /**
   * Registered babel presets
   *
   * @public
   */
  presets: Config.Registry

  /**
   * Add a babel plugin
   *
   * @example
   * ```js
   * babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   *
   * @public
   */
  setPlugin(plugin: Config.Registrable): Config

  /**
   * Add babel plugins
   *
   * @public
   */
  setPlugins(plugins: Array<Config.Registrable>): Config

  /**
   * Set the options for a plugin
   *
   * @public
   */
  setPluginOptions(plugin: string, options: any): Config

  /**
   * Add a babel preset
   *
   * @example
   * ```js
   * babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   *
   * @public
   */
  setPreset(preset: Config.Registrable): Config

  /**
   * Add babel presets
   *
   * @public
   */
  setPresets(
    presets: Array<Config.NormalizedPlugin | string>,
  ): Config

  /**
   * Set the options for a preset
   *
   * @public
   */
  setPresetOptions(preset: string, options: any): Config
}

export namespace Config {
  export type Options = {
    plugins?: Plugin[]
    config?: boolean | string
  }

  export type NormalizedPlugin = [string, {[key: string]: any}]

  export type Plugin =
    | string
    | NormalizedPlugin
    | CallableFunction

  export type Registrable = string | NormalizedPlugin

  export interface Registry {
    [key: string]: [string, any]
  }
}

export class Config {
  public name = '@roots/bud-babel'

  public _app: () => Framework

  public plugins: Config.Registry = {}

  public presets: Config.Registry = {}

  public get app() {
    return this._app()
  }

  public constructor(app: Framework) {
    this._app = () => app
  }

  @bind
  public normalizeEntry(
    c: Config.Registrable,
  ): Config.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as Config.NormalizedPlugin)
      : (c as Config.NormalizedPlugin)
  }

  @bind
  public setPlugin(plugin: Config.Registrable): this {
    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  @bind
  public setPlugins(
    plugins: Array<Config.NormalizedPlugin | string>,
  ): this {
    plugins.map(this.setPlugin)

    return this
  }

  @bind
  public setPreset(preset: Config.Registrable): this {
    preset = this.normalizeEntry(preset)

    this.presets = {
      ...this.presets,
      [preset[0]]: preset,
    }

    return this
  }

  @bind
  public setPresets(
    presets: Array<Config.NormalizedPlugin | string>,
  ): this {
    presets.map(this.setPreset)

    return this
  }

  @bind
  public unsetPreset(preset: string) {
    !this.presets[preset]
      ? this.app.error(`${preset} not found`)
      : delete this.presets[preset]

    return this
  }

  @bind
  public unsetPlugin(plugin: string) {
    !this.plugins[plugin]
      ? this.app.error(`${plugin} not found`)
      : delete this.plugins[plugin]

    return this
  }

  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset][0], options]

    return this
  }
}
