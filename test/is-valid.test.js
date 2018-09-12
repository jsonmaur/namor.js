import { expect } from 'chai'
import isValid from '../src/is-valid'

describe('unit: is-valid', () => {
  it('isValid', () => {
    expect(isValid('a')).to.equal(true)
    expect(isValid('my-website')).to.equal(true)
    expect(isValid('-my-website')).to.equal(false)
    expect(isValid('my-website-')).to.equal(false)
    expect(isValid('mywebs%ite')).to.equal(false)
    expect(isValid('my$website')).to.equal(false)
    expect(isValid('$mywebsite')).to.equal(false)
    expect(isValid('mywebsite!')).to.equal(false)
    expect(isValid('my website')).to.equal(false)
    expect(isValid('mywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsite')).to.equal(false)
    expect(isValid('login')).to.equal(true)
    expect(isValid('login', { reserved: true })).to.equal(false)
    expect(isValid('authentication', { reserved: true })).to.equal(false)
  })

  it('isValid deprecations', () => {
    expect(isValid('login', { blacklist: true })).to.equal(false)
  })
})
