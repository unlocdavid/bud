import {Framework, Service} from '@roots/bud-framework'
import {Container} from '@roots/container'

export type Services = Container<
  Record<string, new (app: Framework) => Service>
>
