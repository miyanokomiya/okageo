import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { createRequire } from 'module'
const _require = createRequire(import.meta.url)
const pkg = _require('./package.json')
const name = pkg.name
const banner = `/*! ${name} v${pkg.version}, License ${pkg.license}, ${pkg.repository.url} */`

const bundle = (config) => ({
  ...config,
  input: `src/${name}.ts`,
  external: (id) => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [esbuild({ minify: true })],
    output: [
      {
        file: `./dist/${name}.js`,
        format: 'cjs',
        sourcemap: true,
        banner,
      },
      {
        file: `./dist/${name}.mjs`,
        format: 'es',
        sourcemap: true,
        banner,
      },
      {
        file: `./dist/${name}.umd.js`,
        format: 'umd',
        sourcemap: true,
        banner,
        name,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `./dist/${name}.d.ts`,
      format: 'es',
    },
  }),
]
