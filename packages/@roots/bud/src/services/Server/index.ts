import {Application, Base} from './server.dependencies'

/**
 * Server service
 *
 * @public
 */
export class Server extends Base {
  /**
   * Service register callback
   *
   * @public
   */
  public async register({container, settings}): Promise<void> {
    this.application = Application()
    this.config = container(settings.get('server'))
  }
}
