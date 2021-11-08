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
    tap?: (app: Framework) => any,
  ): Promise<Framework>
}

/**
 * Prevent children from making further nested child compilers.
 *
 * @internal
 */
function handleChildNestingError(this: Framework) {
  !this.isRoot &&
    this.error(
      `\`${this.ident}\` is a child compiler but you tried to call make from it. Try \`${this.ident}.parent.make\` instead.`,
      `${this.ident}.make`,
    )
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
  tap?: (app: Framework) => any,
): Promise<Framework> {
  const ctx = this as Framework

  handleChildNestingError.bind(ctx)()
  ctx.logger.instance.fav(`new instance:`, name)

  const bud = container
    .createChildContainer()
    .resolve<Framework>('bud')

  bud.ident = name
  bud.root = ctx
  bud.mode = ctx.mode

  await bud.lifecycle()

  if (tap) await tap(bud)

  ctx.children.set(name, bud)

  return ctx
}
