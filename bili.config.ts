import { Config } from 'bili'

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src']
      }
    }
  },
  input: 'src/okageo.ts',
  output: {
    format: ['cjs-min', 'esm-min', 'umd-min'],
    moduleName: 'okageo'
  },
  banner: true
}

export default config
