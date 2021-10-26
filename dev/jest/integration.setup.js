/* eslint-disable no-console */
// @ts-check

const globby = require('globby')
const execa = require('execa')
const {readFile} = require('fs-extra')
const {dirname} = require('path')
const {noop} = require('lodash')
const {green, magenta, bold} = require('chalk')
const clearBudfiles = require('./util/clearBudfiles')
const Project = require('./util/project')
const {install} = require('./util/dependencies')

/**
 * Setup integration tests
 */
module.exports = async () => {
  await clearBudfiles()
  await install()

  console.log('Reading the projects dir')
  let manifestPaths = await globby('examples/*/package.json')
  manifestPaths = manifestPaths.filter(s =>
    s.includes('examples/bedrock/package.json') ||
    s.includes('examples/node-api/package.json') ||
    s.includes('examples/multi-compiler/package.json')
      ? false
      : true,
  )

  console.log('manifest paths discovered:')
  manifestPaths.map(s => console.log(`- ${s}`))

  await manifestPaths.reduce(async (promised, path, i) => {
    let accumulator = await promised

    /**
     * Static result values
     */
    const result = {
      name: null,
      directory: process.cwd().concat(`/${dirname(path)}`),
      cache: {
        path: null,
        json: null,
      },
      manifest: {
        path: null,
        string: null,
      },
      project: null,
    }
    result.name = result.directory.split('examples/')[1]
    result.cache.path = result.directory.concat(
      '/.budfiles/bud.cache.json',
    )

    /**
     * Display info to console
     */
    console.log('\n ', bold.underline`${result.name}`)
    console.log(`  path: ${result.directory}`)
    console.log(`  cache: ${result.cache.path}`)

    /**
     * Initialize project
     */
    /*       const initttask = execa.command(`yarn bud init`, {
        cwd: result.directory,
      })
      initttask.stdout.pipe(process.stdout)
      initttask.stderr.pipe(process.stderr)
      await initttask.finally(noop)

      console.log(blue`\n [${result.name}] Building project\n`)
 */
    /**
     * Build project
     */
    const buildtask = execa.command(
      `yarn bud build --log --ci`,
      {
        cwd: result.directory,
      },
    )
    buildtask.stdout.pipe(process.stdout)
    buildtask.stderr.pipe(process.stderr)
    await buildtask.finally(noop)

    /**
     * result.cache.json
     */
    result.cache.json = await readFile(result.cache.path)
    console.log(
      green`\n Completed ${i + 1}/${manifestPaths.length}`,
    )

    /**
     * result.project
     */
    result.project = await new Project({
      name: result.name,
      directory: result.directory,
    }).setup()

    /**
     * Done
     */
    return {
      ...accumulator,
      [`${result.name}`]: result,
    }
  }, Promise.resolve({}))
}
