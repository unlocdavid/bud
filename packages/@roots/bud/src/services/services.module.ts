import {container} from '@roots/bud-support'
import {Container} from '@roots/container'

import {services} from './services.service'

export default container.register<Container>('bud.services', {
  useValue: services,
})
