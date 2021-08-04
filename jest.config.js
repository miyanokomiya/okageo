module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.ts'],
  globals: {
    'ts-jest': {},
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
}
