module.exports = {
  compilerOptions: {
    allowSyntheticDefaultImports: true,
    noFallthroughCasesInSwitch: true,
    noUnusedParameters: true,
    noImplicitReturns: true,
    moduleResolution: 'node',
    esModuleInterop: true,
    noUnusedLocals: true,
    noImplicitAny: true,
    target: 'es2015',
    module: 'es2015',
    strict: true,
    jsx: 'react',
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist'],
}
