import {join} from 'path'

import {Bud, factory} from '../../../util/bud'

describe('bud.path', function () {
  let bud: Bud
  let dir = join(process.cwd(), 'tests/util/project')

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(() => {
    bud.hooks.on('location.project', () => dir)
  })

  it('returns the correct project path', () => {
    const path = bud.path('project')

    expect(path).toEqual(dir)
    expect(bud.hooks.filter('location.project')).toEqual(path)
  })
})
