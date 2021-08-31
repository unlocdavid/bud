import {factory, Framework} from '@roots/bud'
import {json5, toml, yaml} from '@roots/bud-support'
import {RuleSetRule} from 'webpack'

describe('bud.build.config', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it(`doesn't include deprecated properties`, () => {
    expect(bud.build.config.hasOwnProperty('devServer')).toBe(
      false,
    )
    expect(bud.build.config.hasOwnProperty('unsafeCache')).toBe(
      false,
    )
  })

  it('has expected bail default', () => {
    expect(bud.build.config.bail).toEqual(true)
  })

  it('has expected cache default', () => {
    expect(bud.build.config.cache).toEqual({
      type: 'memory',
    })
  })

  it('has expected context default', () => {
    expect(bud.build.config.context).toEqual(bud.path('project'))
  })

  it('has expected devtool default', () => {
    expect(bud.build.config.devtool).toEqual(false)
  })

  it('has expected entry default', () => {
    expect(bud.build.config.entry).toEqual(undefined)
  })

  it('has expected experiments default', () => {
    expect(bud.build.config.experiments).toEqual({
      lazyCompilation: false,
    })
  })

  it('has expected infrastructureLogging default', () => {
    expect(bud.build.config.infrastructureLogging).toEqual({
      appendOnly: true,
      level: 'none',
    })
  })

  it('has expected mode default', () => {
    expect(bud.build.config.mode).toEqual('production')
  })

  it('has expected name default', () => {
    expect(bud.build.config.name).toEqual('bud')
  })

  it('has expected node default', () => {
    expect(bud.build.config.node).toEqual(false)
  })

  it('has expected optimization.minimize default', () => {
    expect(bud.build.config.optimization.minimize).toEqual(true)
  })

  it('has expected optimization.emitOnErrors default', () => {
    expect(bud.build.config.optimization.emitOnErrors).toEqual(
      false,
    )
  })

  it('has expected optimization.runtimeChunk default', () => {
    expect(bud.build.config.optimization.runtimeChunk).toEqual(
      undefined,
    )
  })

  it('has expected profile default', () => {
    expect(bud.build.config.profile).toEqual(false)
  })

  it('has expected resolve.alias default', () => {
    expect(bud.build.config.resolve.alias).toEqual({})
  })

  it('has expected resolve.extensions default', () => {
    expect(bud.build.config.resolve.extensions).toEqual([
      '.wasm',
      '.mjs',
      '.js',
      '.jsx',
      '.css',
      '.json',
      '.json5',
      '.toml',
      '.xml',
      '.csv',
      '.tsv',
      '.yml',
      '.yaml',
      '.xml',
    ])
  })

  it('has expected resolve.modules default', () => {
    expect(bud.build.config.resolve.modules).toEqual([
      'src',
      'node_modules',
    ])
  })

  it('has expected stats default', () => {
    expect(bud.build.config.stats).toEqual({})
  })

  it('has expected target default', () => {
    expect(bud.build.config.target).toEqual(undefined)
  })

  it('has expected watch default', () => {
    expect(bud.build.config.watch).toEqual(false)
  })

  it('has expected watchOptions default', () => {
    expect(bud.build.config.watchOptions).toEqual(undefined)
  })

  it('has expected number of plugins', () => {
    expect(bud.build.config.plugins.length).toBe(5)
  })

  it('has valid plugins', () => {
    bud.build.config.plugins.filter(plugin => {
      expect(plugin).toHaveProperty('apply')
    })
  })

  it('has expected default requireEnsure rule', () => {
    expect(bud.build.config.module.rules[0]).toEqual({
      test: /\.[cm]?(jsx?|tsx?)$/,
      parser: {requireEnsure: false},
    })
  })

  it('has expected default asset/image rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[0],
    ).toEqual({
      exclude: /(node_modules|bower_components)/,
      generator: {
        filename: 'assets/[hash][ext][query]',
      },
      test: /\.(png|jpe?g|gif)$/,
      type: 'asset/resource',
    })
  })

  it('has expected default font rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[1],
    ).toEqual({
      exclude: /(node_modules|bower_components)/,
      test: /\.(ttf|otf|eot|woff2?|ico)$/,
      use: [
        {
          loader: bud.path(
            'project',
            'node_modules/resolve-url-loader/index.js',
          ),
          options: {
            root: bud.path('project', 'src'),
            sourceMap: false,
          },
        },
      ],
    })
  })

  it('has expected default svg rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[2],
    ).toEqual({
      exclude: /(node_modules|bower_components)/,
      test: /\.svg$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/[hash][ext][query]',
      },
    })
  })

  it('has expected default html rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[3],
    ).toEqual({
      test: /\.(html?)$/,
      use: [
        {
          loader: bud.path(
            'project',
            'node_modules/html-loader/dist/cjs.js',
          ),
        },
      ],
    })
  })

  it('has expected default csv rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[4],
    ).toEqual({
      test: /\.(csv|tsv)$/,
      use: [
        {
          loader: bud.path(
            'project',
            'node_modules/csv-loader/index.js',
          ),
        },
      ],
    })
  })

  it('has expected default xml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[5],
    ).toEqual({
      test: /\.xml$/,
      use: [
        {
          loader: bud.path(
            'project',
            'node_modules/xml-loader/index.js',
          ),
        },
      ],
    })
  })

  it('has expected default toml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[6],
    ).toEqual({
      parser: {
        parse: toml.parse,
      },
      test: /\.toml$/,
      type: 'json',
    })
  })

  it('has expected default yaml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[7],
    ).toEqual({
      parser: {
        parse: yaml.parse,
      },
      test: /\.ya?ml$/,
      type: 'json',
    })
  })

  it('has expected default json rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[8],
    ).toEqual({
      parser: {
        parse: json5.parse,
      },
      test: /\.json5$/,
      type: 'json',
    })
  })

  it('has expected default css rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[9],
    ).toEqual({
      exclude: /(node_modules|bower_components)/,
      test: /\.css$/,
      use: [
        {
          loader: bud.path(
            'project',
            '/node_modules/mini-css-extract-plugin/dist/loader.js',
          ),
          options: {},
        },
        {
          loader: bud.path(
            'project',
            'node_modules/css-loader/dist/cjs.js',
          ),
          options: {
            importLoaders: 1,
            sourceMap: false,
          },
        },
      ],
    })
  })

  it('has expected default js rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule)
        .oneOf[10],
    ).toEqual({
      exclude: /(node_modules|bower_components)/,
      test: /\.(js|jsx)$/,
      use: [],
    })
  })
})
