import {container} from '@roots/bud-support'

import {Bud} from './bud.service'

export default container.register<Bud>('bud', {useClass: Bud})
