import {Project} from '@repo/test-kit/project'

jest.setTimeout(60000)

describe.skip('examples/markdown', () => {
  let project

  beforeAll(async () => {
    project = new Project({
      name: 'markdown',
      dir: 'examples/markdown',
    })

    await project.setup()
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(
        project.assets['app.js'].includes('import'),
      ).toBeFalsy()
    })
  })
})
