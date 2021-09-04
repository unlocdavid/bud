/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud

 * @packageDocumentation
 */

import {Api} from './Api'
import {Repository} from './repository'

declare module '@roots/bud-framework' {
  interface Framework extends Repository {}
}

export {Api, Repository}
