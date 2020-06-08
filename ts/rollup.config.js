import typescript from 'rollup-plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import visualizer from 'rollup-plugin-visualizer';

export default {
  input: 'index.tsx',
  output: {
    file: 'lib/index.js',
    format: 'iife',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
    resolve(),
    typescript(),
    uglify(),
    visualizer({ filename: 'lib/viz.html' }),
  ],
  external: [],
};
