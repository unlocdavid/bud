import {container} from '@roots/bud-support'

import {SettingsService} from './settings.service'

export default container.register<typeof SettingsService>(
  'bud.settings',
  {
    useValue: SettingsService,
  },
)
