import {MiniCssExtractPlugin} from './mini-css-extract-plugin.dependencies'
import type {Plugin} from './mini-css-extract-plugin.interface'

export const name: Plugin['name'] = 'mini-css-extract-plugin'

export const options: Plugin['options'] = ({settings}) => ({
  filename: settings.isTrue('hash')
    ? `${settings.get('hashFormat')}.css`
    : `${settings.get('fileFormat')}.css`,

  chunkFilename: settings.isTrue('hash')
    ? `${settings.get('hashFormat')}.[id].css`
    : `${settings.get('fileFormat')}.[id].css`,

  ...(settings.get('extension.mini-css-extract-plugin') ?? {}),
})

export const make: Plugin['make'] = options =>
  new MiniCssExtractPlugin(options.all())

export const when: Plugin['when'] = ({isProduction}) =>
  isProduction
