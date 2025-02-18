import {globby} from '@roots/bud-support'
import {pathExists, readFile} from 'fs-extra'
import {parse} from 'json5'
import {posix as path} from 'path'

describe('repo', function () {
  let packageRoots

  beforeAll(async () => {
    packageRoots = await globby.globby('sources/@roots/*', {
      absolute: true,
      onlyDirectories: true,
    })
  })

  it.skip('publish check: */lib/cjs/index.js', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const cjs = await globby.globby(
            path.join(pkg, 'lib/cjs/index.js'),
          )

          expect(cjs.length).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip('publish check: */lib/esm/index.js', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const esm = await globby.globby(
            path.join(pkg, 'lib/esm/index.js'),
          )

          expect(esm.length).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip('publish check: */types/index.d.ts', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const types = path.join(pkg, 'types/index.d.ts')
          const typesExist = await pathExists(types)
          expect(typesExist).toBe(true)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip('publish check: project references', async () => {
    try {
      await Promise.all(
        packageRoots.map(async pkg => {
          const pkgString = await readFile(
            path.join(pkg, 'package.json'),
            'utf8',
          )
          const pkgJson = parse(pkgString)
          const esmString = await readFile(
            path.join(pkg, 'tsconfig-esm.json'),
            'utf8',
          )
          const esmJson = parse(esmString)
          const cjsString = await readFile(
            path.join(pkg, 'tsconfig.json'),
            'utf8',
          )
          const cjsJson = parse(cjsString)

          const workspaceDeps = Object.keys({
            ...(pkgJson.dependencies ?? {}),
            ...(pkgJson.devDependencies ?? {}),
          }).filter(k => k.includes('@roots/'))

          await Promise.all(
            workspaceDeps.map(async dependency => {
              const cjsRefPath = path.join(
                dependency.split('@roots/').pop(),
                `tsconfig.json`,
              )

              try {
                if (cjsJson)
                  expect(
                    cjsJson.references.filter(({path}: {path: string}) => {
                      return path.includes(cjsRefPath)
                    }).length,
                  ).toEqual(1)
              } catch (error) {
                throw new Error(
                  `Problem with cjs references for ${dependency}`,
                )
              }

              const esmRefPath = path.join(
                dependency.split('@roots/').pop(),
                `tsconfig-esm.json`,
              )

              try {
                expect(
                  esmJson.references.filter(({path}: {path: string}) => {
                    return path.includes(esmRefPath)
                  }).length,
                ).toEqual(1)
              } catch (error) {
                throw new Error(
                  `Problem with mjs references for ${dependency}`,
                )
              }
            }),
          )
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it.skip('root: project references', async () => {
    try {
      const tsConfCjsString = await readFile(
        process.cwd().concat('/config/tsconfig.json'),
        'utf8',
      )
      const tsConfCjs = parse(tsConfCjsString)

      await Promise.all(
        packageRoots.map(async pkg => {
          const name = pkg.split(`sources/`).pop().concat('/tsconfig.json')

          expect(
            tsConfCjs.references.filter(({path}: {path: string}) => {
              return path.includes(name)
            }).length,
          ).toBe(1)
        }),
      )

      const tsConfEsmString = await readFile(
        process.cwd().concat('/config/tsconfig.esm.json'),
        'utf8',
      )
      const tsConfEsm = parse(tsConfEsmString)

      await Promise.all(
        packageRoots.map(async pkg => {
          const name = pkg
            .split(`sources/`)
            .pop()
            .concat('/tsconfig-esm.json')

          expect(
            tsConfEsm.references.filter(({path}: {path: string}) => {
              return path.includes(name)
            }).length,
          ).toBe(1)
        }),
      )
    } catch (error) {
      throw new Error(error)
    }
  })
})
