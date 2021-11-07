import {container} from '@roots/bud-support'
import {Constructor as Ctor} from 'type-fest'

import {Controller as Service} from './controller.service'

export type Constructor = Ctor<Service>

container.register<Constructor>('extension.controller', {
  useValue: Service,
})

export {Service}
