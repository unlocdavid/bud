import {Container} from '@roots/container'
import {container} from 'tsyringe'

import {service} from './settings.service'

export const module = container.register<Container>(
  'bud.settings',
  {
    useValue: service,
  },
)
