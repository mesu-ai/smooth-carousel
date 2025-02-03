import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const devMode = process.env.NODE_ENV === 'development';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      name: 'TextCrafter',
      exports: 'named', // Ensure named exports are preserved
      sourcemap: devMode ? 'inline' : false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named', // Preserve named exports for CommonJS
      sourcemap: devMode ? 'inline' : false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    typescript({ tsconfig: 'tsconfig.json' }),
    postcss({
      extract: 'styles.min.css',
      minimize: !devMode,
    }),
    !devMode && terser(),
  ],
};