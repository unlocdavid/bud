import {config, factory, Framework} from '@roots/bud'

describe('bud.dev', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      mode: 'development',
      config: {...config, ci: true},
    })
  })

  it('sets host', () => {
    bud.dev({host: 'bar.com'})
    expect(bud.server.config.get('host')).toEqual('bar.com')
  })

  it('sets proxy', () => {
    bud.dev({
      proxy: {
        host: 'bar.com',
        port: 9000,
      },
    })

    expect(bud.server.config.get('proxy')).toEqual({
      host: 'bar.com',
      port: 9000,
    })
  })
})
