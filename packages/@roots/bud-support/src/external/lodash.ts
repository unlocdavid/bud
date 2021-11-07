import library, {LoDashStatic} from 'lodash'

import {container} from '../'

container.register<LoDashStatic>('lodash', {
  useValue: library,
})

export {library as lodash}
export {LoDashStatic}
