import {factory, Framework} from '@roots/bud'
import {Services} from '@roots/bud/types/services'
import {container} from 'tsyringe'

describe('Extensions', function () {
  let extensions

  beforeAll(async () => {
    await factory({
      ci: true,
      log: false,
    })

    const services = container.resolve<Services>('bud.services')
    extensions = services.get('extensions')
  })

  it('[production] bud.extensions.repository matches snapshot', () => {
    expect(extensions.all()).toMatchSnapshot()
  })
})
