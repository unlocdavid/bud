import {isFunction} from 'lodash'

import {Bud} from '../../bud'

export const config = async (app: Bud) => {
  if (app.project.isFunction('configs.dynamic.global.config')) {
    const config = app.project.get(
      'configs.dynamic.global.config',
    )
    if (isFunction(config)) {
      app.info(
        `Running ${app.ident} global configuration callback`,
      )

      await config(app)
    }
  }

  if (
    app.project.isFunction('configs.dynamic.conditional.config')
  ) {
    const config = app.project.get(
      'configs.dynamic.conditional.config',
    )
    if (isFunction(config)) {
      app.info(
        `Running ${app.ident} ${app.mode} configuration callback`,
      )

      await config(app)
    }
  }
}
