import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.css'], // Added .css
    }),
    commonjs(),
    postcss({
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]', // CSS modules pattern
      },
      extract: false, // ← CHANGED: Keep CSS as JS modules
      inject: true, // ← CHANGED: Inject CSS into JS
      minimize: true,
      sourceMap: true,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx'],
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};