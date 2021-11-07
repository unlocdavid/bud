// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds Babel
 * transpilation to {@link @roots/bud-framework# | @roots/bud-framework}.

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import './interface'
import 'reflect-metadata'

import {container} from '@roots/bud-support'

import {BudBabelConfig} from './config/babel.config.module'
import {BudBabelExtension} from './extension/babel.extension.module'

container.register('babel.config', {useClass: BudBabelConfig})
container.register('@roots/bud-babel', {
  useClass: BudBabelExtension,
})

export {BudBabelExtension as Extension}
