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

import {container} from 'tsyringe'

import {BudBabelConfig} from './config/babel.config.module'
import {BudBabelExtension} from './extension/babel.extension.module'

container.register('bud.babel', BudBabelConfig)
container.register('@roots/bud-babel', BudBabelExtension)

export {BudBabelExtension as extension}
