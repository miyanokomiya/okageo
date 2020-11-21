import * as okageo from '../src/okageo'

describe('okageo', () => {
  it('export内容が正しいこと', () => {
    expect(okageo).toHaveProperty('geo')
    expect(okageo).toHaveProperty('svg')
    expect(okageo).toHaveProperty('drawing')
  })
})
