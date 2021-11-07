import {join} from 'path'

import {Locations} from '../..'
import {Framework} from '../framework.service'

export interface path {
  (
    this: Framework,
    key: keyof Locations & string,
    ...path: string[]
  ): string
}

export interface path {
  (key: keyof Locations & string, ...path: string[]): string
}

export const path: path = function (
  key: keyof Locations & string,
  ...path: string[]
): string {
  return join(
    ...[
      key !== 'project'
        ? this.hooks.filter('location.project')
        : false,
      this.hooks.filter(`location.${key}`),
      ...(path ?? []),
    ].filter(Boolean),
  )
}
