import decorators from 'helpful-decorators'
import {container} from 'tsyringe'

container.register('decorators', {useValue: decorators})
