import {container} from 'tsyringe'

import {Bud} from './bud.service'

export const module = container.register<Bud>('bud', {
  useClass: Bud,
})
