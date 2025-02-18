/**
 * Monorepo configuration
 *
 * @public
 */
export const config: config = {
  name: 'bud.js',
  description:
    '⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix',
  logo: 'https://cdn.roots.io/app/uploads/logo-bud.svg',
  url: {
    discourse: 'https://discourse.roots.io/c/bud/24',
    docs: 'https://bud.js.org',
    git: 'git@github.com:roots/bud',
    web: 'https://github.com/roots/bud',
  },
  organization: {
    name: 'Roots Software Foundation LLC',
    site: 'https://roots.io',
    twitter: 'https://twitter.com/rootswp',
    favicon: 'https://roots.io/favicon.ico',
  },
  contributors: {
    kellymears: {
      type: ['🚀 steward', '💻 dev', '✍🏽 docs'],
    },
    qwp6t: {
      type: ['🚀 steward', '💻 dev', '✍🏽 docs'],
    },
    retlehs: {
      type: ['🚀 steward'],
    },
    swalkinshaw: {
      type: ['🚀 steward', '✍🏽 docs'],
    },
    clayrisser: {
      type: ['✍🏽 docs'],
    },
    catgofire: {
      type: ['✍🏽 docs'],
    },
  },
  sponsors: [
    {
      image: 'https://cdn.roots.io/app/uploads/km-digital.svg',
      title: 'KM Digital',
      url: 'https://k-m.com/',
    },
    {
      image: 'https://cdn.roots.io/app/uploads/carrot.svg',
      title: 'Carrot',
      url: 'https://carrot.com/',
    },
    {
      image: 'https://cdn.roots.io/app/uploads/c21redwood.svg',
      title: 'C21 Redwood Realty',
      url: 'https://www.c21redwood.com/',
    },
    {
      image: 'https://cdn.roots.io/app/uploads/wordpress.svg',
      title: 'WordPress.com',
      url: 'https://wordpress.com/',
    },
    {
      image: 'https://cdn.roots.io/app/uploads/pantheon.svg',
      title: 'Pantheon',
      url: 'https://pantheon.io/',
    },
  ],
  packages: {
    core: [
      '@roots/bud',
      '@roots/bud-api',
      '@roots/bud-build',
      '@roots/bud-cache',
      '@roots/bud-compiler',
      '@roots/bud-dashboard',
      '@roots/bud-extensions',
      '@roots/bud-framework',
      '@roots/bud-hooks',
      '@roots/bud-server',
      '@roots/bud-support',
    ],
    extension: [
      '@roots/bud-babel',
      '@roots/bud-compress',
      '@roots/bud-criticalcss',
      '@roots/bud-emotion',
      '@roots/bud-entrypoints',
      '@roots/bud-esbuild',
      '@roots/bud-eslint',
      '@roots/bud-library',
      '@roots/bud-mdx',
      '@roots/bud-postcss',
      '@roots/bud-preset-recommend',
      '@roots/bud-prettier',
      '@roots/bud-purgecss',
      '@roots/bud-react',
      '@roots/bud-sass',
      '@roots/bud-solid',
      '@roots/bud-stylelint',
      '@roots/bud-tailwindcss',
      '@roots/bud-terser',
      '@roots/bud-typescript',
      '@roots/bud-vue',
      '@roots/bud-wordpress-dependencies',
      '@roots/bud-wordpress-externals',
      '@roots/bud-wordpress-manifests',
      '@roots/sage',
    ],
    library: [
      '@roots/container',
      '@roots/critical-css-webpack-plugin',
      '@roots/dependencies',
      '@roots/entrypoints-webpack-plugin',
      '@roots/eslint-config',
      '@roots/filesystem',
      '@roots/ink-prettier',
    ],
  },
}

export type ContributionTypes = '🚀 steward' | '💻 dev' | '✍🏽 docs'

export interface config {
  /**
   * Project name
   */
  name: string

  /**
   * Project description
   */
  description: string

  /**
   * Project logo
   */
  logo: string

  /**
   * Project links
   */
  url: {
    discourse: `https://discourse.roots.io/${string}`
    docs: `https://${string}`
    git: 'git@github.com:roots/bud'
    web: 'https://github.com/roots/bud'
  }

  /**
   * Project organization information
   */
  organization: {
    name: string
    site: `https://${string}`
    twitter: `https://${string}`
    favicon: `https://${string}.ico`
  }

  /**
   * Record of contributors
   */
  contributors: Record<string, Record<string, Array<ContributionTypes>>>

  /**
   * Sponsoring organizations
   */
  sponsors: Array<{
    image: `https://${string}`
    title: string
    url: `https://${string}`
  }>

  /**
   * Packages
   */
  packages: {
    core: Array<string>
    extension: Array<string>
    library: Array<string>
  }
}
