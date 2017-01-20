import { expect } from 'chai'
import generate, { getPattern, processPattern, addTrailingNumber } from '../src/generate'

describe('unit: generator', () => {
  it('generate', () => {
    expect(generate()).to.match(/^[a-z]*-[a-z]*-[0-9]{4}$/)
    expect(generate({ wordCount: 1 })).to.match(/^[a-z]*-[0-9]{4}$/)
    expect(generate({ wordCount: 2 })).to.match(/^[a-z]*-[a-z]*-[0-9]{4}$/)
    expect(generate({ wordCount: 3 })).to.match(/^[a-z]*-[a-z]*-[a-z]*-[0-9]{4}$/)
    expect(generate({ wordCount: 4 })).to.match(/^[a-z]*-[a-z]*-[a-z]*-[a-z]*-[0-9]{4}$/)
    expect(generate({ numCount: 0 })).to.match(/^[a-z]*-[a-z]*$/)
    expect(generate({ numCount: 1 })).to.match(/^[a-z]*-[a-z]*-[0-9]{1}$/)
    expect(generate({ numCount: 20 })).to.match(/^[a-z]*-[a-z]*-[0-9]{20}$/)
    expect(generate({ wordCount: 1, numCount: 0 })).to.match(/^[a-z]*$/)
    expect(generate({ manly: true })).to.match(/^[a-z]*-[a-z]*-[0-9]{4}$/)
    expect(() => generate({ numCount: -1 })).to.throw(Error)
    expect(() => generate({ numCount: 60 })).to.throw(Error)
  })

  it('generate deprecations', () => {
    expect(generate({ words: 1 })).to.match(/^[a-z]*-[0-9]{4}$/)
    expect(generate({ words: 1, numLen: 0 })).to.match(/^[a-z]*$/)
  })

  it('getPattern', () => {
    expect(getPattern(2).join('-')).to.match(/^[a-z]*-[a-z]*$/)
    expect(getPattern('2').join('-')).to.match(/^[a-z]*-[a-z]*$/)
    expect(() => getPattern(0)).to.throw(Error)
    expect(() => getPattern(5)).to.throw(Error)
  })

  it('processPattern', () => {
    expect(processPattern(['noun', 'verb'])).to.match(/^[a-z]*-[a-z]*$/)
  })

  it('addTrailingNumber', () => {
    expect(addTrailingNumber('hi', 2)).to.match(/^hi-[0-9]{2}$/)
  })
})
