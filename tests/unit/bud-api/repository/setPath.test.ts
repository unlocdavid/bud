import {Bud, factory} from '@repo/test-kit/bud'

const NEW_PATH = `${process.cwd()}/foo`

describe('bud.setPath', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.setPath).toBeInstanceOf(Function)
  })

  it('returns Bud', () => {
    expect(bud.setPath('project', NEW_PATH)).toBeInstanceOf(Bud)
  })

  it('properly sets path', () => {
    bud.setPath('project', NEW_PATH)
    expect(bud.path('project')).toEqual(NEW_PATH)
  })

  it('properly sets multiple paths', () => {
    const value = {
      project: NEW_PATH,
      src: 'foo',
      dist: 'bar',
    }

    bud.setPath(value)

    expect(bud.path('project')).toBe(value.project)
    expect(bud.path('src')).toEqual(
      `${value.project}/${value.src}`,
    )
    expect(bud.path('dist')).toEqual(
      `${value.project}/${value.dist}`,
    )
  })
})
