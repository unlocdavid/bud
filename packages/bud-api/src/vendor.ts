import {Api} from '@roots/bud-typings'

export const vendor: Api.Vendor = function () {
  this.options.enable('webpack.optimization.splitChunks')

  return this
}
