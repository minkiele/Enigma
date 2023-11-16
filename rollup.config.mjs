import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const extensions = ['.mjs', '.js', '.json', '.node', '.ts'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'enigma/bundle.cjs',
      format: 'cjs',
    },
    {
      file: 'enigma/bundle.mjs',
      format: 'esm',
    },
  ],
  external: ['events'],
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
    }),
    commonjs(),
    terser(),
  ],
};
