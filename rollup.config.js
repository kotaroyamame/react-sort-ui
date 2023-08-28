import { swc } from 'rollup-plugin-swc3'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-import-css'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.ts', '.tsx','css']
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_)
const plugins = targets => [
  nodeResolve({
    extensions
  }),
  swc({
    tsconfig: false,
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true
      },
      transform: {
        react: {
          useBuiltins: true
        }
      },
      externalHelpers: true
    },
    env: {
      targets
    },
    module: {
      type: 'es6'
    },
    sourceMaps: true
  })
]

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/index.cjs.js`,
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [typescript(), css(),nodeResolve()],
  external
}
