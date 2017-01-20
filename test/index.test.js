import { expect } from 'chai'
import namor from '../src/index'

describe('unit: index', () => {
  it('exports', () => {
    expect(namor.generate).to.be.a('function')
    expect(namor.isValid).to.be.a('function')
  })
})
