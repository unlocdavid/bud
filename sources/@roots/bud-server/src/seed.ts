import {Framework} from '@roots/bud-framework'

const src = (modulePath: string) =>
  `@roots/bud-server/client/${modulePath}`

/**
 * Initial values
 *
 * @public
 */
export const seed = (app: Framework) => {
  app.hooks
    .on(`middleware.enabled`, [`dev`, `hot`])
    .hooks.on(`middleware.dev.options`, () => ({
      headers: app.hooks.filter(`middleware.dev.options.headers`),
      publicPath: app.hooks.filter(`middleware.dev.options.publicPath`),
      stats: app.hooks.filter(`middleware.dev.options.stats`),
      writeToDisk: app.hooks.filter(`middleware.dev.options.writeToDisk`),
    }))
    .hooks.on(`middleware.hot.options`, () => ({
      path: app.hooks.filter('middleware.hot.options.path', `/__bud/hmr`),
      log: app.hooks.filter('middleware.hot.options.log', false),
      heartbeat: app.hooks.filter('middleware.hot.options.heartbeat'),
    }))

    .hooks.on(`middleware.dev.options.headers`, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'x-powered-by': '@roots/bud',
    })
    .hooks.on(`middleware.dev.options.publicPath`, () =>
      app.hooks.filter(`build.output.publicPath`),
    )
    .hooks.on(`middleware.dev.options.stats`, false)
    .hooks.on(`middleware.dev.options.writeToDisk`, () => true)

    .hooks.on(`middleware.hot.options.path`, `/__bud/hmr`)
    .hooks.on(
      `middleware.hot.options.log`,
      app.server.serverLogger.scope('server', 'hot').info,
    )
    .hooks.on(`middleware.hot.options.heartbeat`, 2000)

    .hooks.on(`middleware.proxy.target`, new URL(`http://localhost`))

    .hooks.on(
      `dev.client.scripts`,
      new Set([
        app => src(`index.js?name=${app.name}&path=/__bud/hmr`),
        _app => src(`proxy-click-interceptor.js`),
      ]),
    )
    .hooks.on(`dev.url`, new URL(`http://localhost`))
    .hooks.on(`dev.watch.files`, new Set([]))
    .hooks.on(`dev.watch.options`, {})
}
