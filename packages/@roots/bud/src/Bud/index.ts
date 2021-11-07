import {Constructor, Framework} from '@roots/bud-framework'
import {container} from '@roots/bud-support'

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public @core
 */
class Bud extends Framework {
  /**
   * {@link Bud} class definition
   *
   * @remarks
   * Used internally when creating child Bud instances
   *
   * @public
   */
  public implementation: Constructor = Bud
}

container.register('bud', Bud)

export {Bud}
