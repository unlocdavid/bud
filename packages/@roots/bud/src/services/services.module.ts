import {container} from '@roots/bud-support'

import {Services} from '.'
import {services} from './services.service'

export const module = container.register<Services>(
  'bud.services',
  {
    useValue: services,
  },
)
