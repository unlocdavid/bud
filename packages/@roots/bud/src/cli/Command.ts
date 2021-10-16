import Base from '@oclif/command'

import {Notifier} from './Notifier'

export abstract class Command extends Base {
  public static description: typeof Base.description =
    'A bud command'

  public notifier: Notifier

  public async init() {
    this.notifier = new Notifier()
  }
}
