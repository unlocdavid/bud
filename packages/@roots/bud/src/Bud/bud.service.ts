import {
  Configuration,
  Constructor,
  Framework,
  Service,
} from '@roots/bud-framework'
import {inject, injectable} from '@roots/bud-support'
import {Container} from '@roots/container'

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
  public name: string = 'bud'

  /**
   * Constructor definition
   *
   * @remarks
   * Used internally when creating child Bud instances
   *
   * @public
   */
  public implementation: Constructor = Bud

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    @inject('bud.services') services: Container<Service>,
    @inject('bud.settings') settings: Configuration,
  ) {
    super(services, settings)
  }
}
