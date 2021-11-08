import {Framework, Service} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {inject, injectable} from 'tsyringe'

import {Settings} from '../settings/settings.interface'

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public @core
 */
@injectable()
export class Bud extends Framework {
  /**
   * Application name
   *
   * @public
   */
  public ident: string = 'bud'

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    @inject('bud.services') public services: Container<Service>,
    @inject('bud.settings')
    public settings: Settings,
  ) {
    super()
  }
}
