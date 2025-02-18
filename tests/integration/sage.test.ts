import {Project} from '@repo/test-kit/project'

describe('sage', test('npm'))
describe('sage', test('yarn'))

function test(pacman) {
  return () => {
    let project

    beforeAll(async () => {
      project = await new Project({
        name: 'sage',
        with: pacman,
        dist: 'public',
      }).setup()
    })

    describe(pacman, () => {
      it('[project.entrypoints.json] has expected app entries', () => {
        expect(project.entrypoints.app.js).toBeInstanceOf(Array)
        expect(project.entrypoints.app.js).toHaveLength(2)
        expect(project.entrypoints.app.css).toBeInstanceOf(Array)
        expect(project.entrypoints.app.css).toHaveLength(1)
        expect(project.entrypoints.app.dependencies).toEqual([])
      })

      it('[project.entrypoints.json] has expected editor entries', () => {
        expect(project.entrypoints.editor.js).toBeInstanceOf(Array)
        expect(project.entrypoints.editor.js).toHaveLength(2)
        expect(project.entrypoints.editor.css).toBeInstanceOf(Array)
        expect(project.entrypoints.editor.css).toHaveLength(1)
      })

      it('[runtime] has contents', () => {
        expect(project.assets['runtime.js'].length).toBeGreaterThan(10)
      })

      it('[runtime] is transpiled', () => {
        expect(project.assets['runtime.js'].includes('import')).toBeFalsy()
      })

      it('[app] has contents', () => {
        expect(project.assets['app.js'].length).toBeGreaterThan(10)
      })

      it('[app] is transpiled', () => {
        expect(project.assets['app.js'].includes('import')).toBeFalsy()
      })

      it('[app] css: has contents', () => {
        expect(project.assets['app.css'].length).toBeGreaterThan(10)
      })

      it('[app] css: is transpiled', () => {
        expect(project.assets['app.css'].includes('@import')).toBe(false)
      })

      it('[app] css: @tailwind directive is transpiled', () => {
        expect(project.assets['app.css'].includes('@apply')).toBe(false)
      })

      it('[app] css: has whitespace removed', () => {
        expect(project.assets['app.css'].match(/    /)).toBeFalsy()
      })

      it('[app] css: has breaks removed', () => {
        expect(project.assets['app.css'].match(/\\n/)).toBeFalsy()
      })

      it('[editor] has contents', () => {
        expect(project.assets['editor.js'].length).toBeGreaterThan(10)
      })

      it('[editor] is transpiled', () => {
        expect(project.assets['editor.js'].includes('import')).toBeFalsy()
      })

      it('[editor] css: has contents', () => {
        expect(project.assets['editor.css'].length).toBeGreaterThan(10)
      })

      it('[editor] css: is transpiled', () => {
        expect(project.assets['editor.css'].includes('@import')).toBe(
          false,
        )
      })

      it('[editor] css: @tailwind directive is transpiled', () => {
        expect(project.assets['editor.css'].includes('@apply')).toBe(false)
      })

      it('[editor] css: has whitespace removed', () => {
        expect(project.assets['editor.css'].match(/    /)).toBeFalsy()
      })

      it('[editor] css: has breaks removed', () => {
        expect(project.assets['editor.css'].match(/\\n/)).toBeFalsy()
      })

      it('[snapshots] package.json is unchanged', async () => {
        expect(project.packageJson).toMatchSnapshot()
      })

      it('[snapshots] public/manifest.json matches expectations', async () => {
        expect(Object.entries(project.manifest).length).toEqual(7)

        expect(project.manifest['app.js']).toMatch(/app\.[\d|\w]*\.js/)
        expect(project.manifest['app.css']).toMatch(/app\.[\d|\w]*\.css/)
        expect(project.manifest['editor.js']).toMatch(
          /editor\.[\d|\w]*\.js/,
        )
        expect(project.manifest['editor.css']).toMatch(
          /editor\.[\d|\w]*\.css/,
        )
        expect(project.manifest['runtime.js']).toMatch(
          /runtime\.[\d|\w]*\.js/,
        )
      })

      it('[snapshots] module map matches snapshot', async () => {
        expect(project.modules.chunks).toMatchSnapshot({
          byName: {
            app: expect.any(Number),
            editor: expect.any(Number),
            runtime: expect.any(Number),
          },
          bySource: {
            '0 app': expect.any(Number),
            '0 editor': expect.any(Number),
            '1 app': expect.any(Number),
            '1 editor': expect.any(Number),
          },
          usedIds: [
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
          ],
        })
      })
    })
  }
}
