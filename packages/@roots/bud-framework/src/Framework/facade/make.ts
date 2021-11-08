import {container} from '@roots/bud-support'

import {Framework} from '..'

/**
 * make function interface
 *
 * @internal
 */
export interface make {
  (
    name: string,
    tap?: (app: Framework) => Promise<any>,
  ): Promise<Framework>
}

/**
 * Prevent children from making further nested child compilers.
 *
 * @internal
 */
function handleChildNestingError(this: Framework) {
  if (this.root) return

  this.error(
    `\`${this.ident}\` is a child compiler but you tried to call make from it.`,
    `Try \`${this.ident}.root.make\` instead.`,
  )
  throw new Error('compiling child target not supported')
}

/**
 * Returns true if compiler should NOT be used (when the --target flag
 * is set but the compiler is not a target).
 *
 * @internal
 */
function compilerIsExcluded(ctx: Framework, name: string) {
  return ctx.project.has('cli.flags.target') &&
    ctx.project.get('cli.flags.target').length &&
    !ctx.project.get('cli.flags.target').includes(name)
    ? true
    : false
}
/**
 * Instantiate a child instance and add to {@link Framework.children} container
 *
 * @remarks
 * **make** takes two parameters:
 *
 * - The **name** of the new compiler
 * - An optional callback to use for configuring the compiler.
 *
 * @example
 * ```js
 * bud.make('scripts', child => child.entry('app', 'app.js'))
 * ```
 *
 * @public
 */
export async function make(
  name: string,
  callback?: (app: Framework) => Promise<any>,
): Promise<Framework> {
  const ctx = this as Framework

  handleChildNestingError.bind(ctx)()

  if (compilerIsExcluded(ctx, name)) return

  ctx.logger.instance.fav(`new instance:`, name)

  const bud = container
    .createChildContainer()
    .resolve<Framework>('bud')

  bud.ident = name
  bud.root = ctx
  bud.mode = ctx.mode

  await bud.lifecycle()

  if (callback) await callback(bud)

  ctx.children.set(name, bud)

  return ctx
}
