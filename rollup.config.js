const postcss = require('rollup-plugin-postcss')
const typescript = require('@rollup/plugin-typescript')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      browser: true,
      custonResolveOptions: {
        moduleDirectory: 'node_modules'
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.mjs', '.cjs']
    }),
    typescript(),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': [
          'createFactory',
          'Component',
          'createElement'
        ]
      }
    }),
    postcss({
      modules: true
    })
  ]
}
