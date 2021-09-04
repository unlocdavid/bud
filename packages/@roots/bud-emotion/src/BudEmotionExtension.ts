import {Framework, Module} from '@roots/bud-framework'

/**
 * Adds Emotion to `@roots/bud`
 *
 */
interface BudEmotionExtension extends Module {}

const BudEmotionExtension: BudEmotionExtension = {
  name: '@roots/bud-emotion',
  boot({babel}: Framework) {
    babel?.setPlugins && babel.setPlugin('@emotion/babel-plugin')
  },
}

export {BudEmotionExtension}
