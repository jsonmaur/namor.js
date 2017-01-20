import { expect } from 'chai'
import isValid from '../src/is-valid'

describe('unit: is-valid', () => {
  it('isValid', () => {
    expect(isValid('a')).to.be.true
    expect(isValid('my-website')).to.be.true
    expect(isValid('-my-website')).to.be.false
    expect(isValid('my-website-')).to.be.false
    expect(isValid('mywebs%ite')).to.be.false
    expect(isValid('my$website')).to.be.false
    expect(isValid('$mywebsite')).to.be.false
    expect(isValid('mywebsite!')).to.be.false
    expect(isValid('my website')).to.be.false
    expect(isValid('mywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsite')).to.be.false
    expect(isValid('login')).to.be.false
    expect(isValid('authentication')).to.be.false
    expect(isValid('login', { blacklist: false })).to.be.true
  })
})
