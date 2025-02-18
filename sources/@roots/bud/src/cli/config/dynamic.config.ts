import {chalk, lodash, Signale} from '@roots/bud-support'

import {Bud} from '../../Bud/index.js'

const {isFunction} = lodash

/**
 * User config parser
 *
 * @internal
 */
class Configuration {
  /**
   * Class constructor
   *
   * @param app - Bud instance
   * @param logger - Logger instance
   * @param key - configuration key (project service repository)
   *
   * @internal
   */
  public constructor(
    public app: Bud,
    public logger: Signale,
    public paths: Array<string>,
  ) {
    paths.map(path => {
      this.logger.log(`processing ${path}`)
    })
  }

  /**
   * @internal
   */
  public async run(): Promise<void> {
    await Promise.all(
      this.paths.map(async path => {
        const callback = await this.import(path)
        await this.invoke(callback, path)
      }),
    )
  }

  /**
   * @internal
   */
  public async import(config: string) {
    try {
      this.logger.await({
        message: 'importing module',
        suffix: chalk.dim(config),
      })

      const raw = config.endsWith('.ts')
        ? await this.app.ts.read(config)
        : await import(config)

      const result = isFunction(raw?.default) ? raw.default : raw

      if (!isFunction(result)) {
        this.logger.error({message: config})
        throw new Error(`${config} is not a function`)
      }

      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @internal
   */
  public async invoke(callback, path) {
    try {
      if (!isFunction(callback)) {
        this.logger.error({message: path})
        throw new Error(`${path} is not a function`)
      }

      this.logger.await({
        message: `calling user config`,
        suffix: chalk.dim(path),
      })

      await callback(this.app)
    } catch (error) {
      this.logger.error({message: error})
    }
  }
}

/**
 * @internal
 */
export const configs = async (app: Bud, logger: Signale) => {
  const generalConfigs = app.project.get('configs.dynamic.global')
  const conditionalConfigs = app.project.get('configs.dynamic.conditional')

  const processAllEnqueued = async () => {
    await app.api.processQueue()
    await app.extensions.processQueue()
  }

  if (generalConfigs?.length) {
    await processAllEnqueued()

    const dynamicConfig = new Configuration(app, logger, generalConfigs)
    await dynamicConfig.run()

    await processAllEnqueued()
  }

  if (conditionalConfigs?.length) {
    await processAllEnqueued()

    const staticConfig = new Configuration(app, logger, conditionalConfigs)
    await staticConfig.run()

    await processAllEnqueued()
  }
}
