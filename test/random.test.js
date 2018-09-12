import { expect } from 'chai'
import * as random from '../src/random'

describe('unit: random', () => {
  it('randomFromArray', () => {
    const arr = ['one', 'two', 'three', 'four', 'five']
    const rand = random.randomFromArray(arr)
    expect(arr.indexOf(rand)).to.be.above(-1)
  })

  it('randomNumber', () => {
    const testLength = (len) => {
      for (let i = 0; i < 100; i++) {
        const num = random.randomNumber(len)
        expect(num).to.have.length(len)
      }
    }

    testLength(1)
    testLength(5)
    testLength(10)
    testLength(25)
    testLength(50)
    testLength(100)

    /* try/catch is needed to get the coverage :| */
    try {
      random.randomNumber()
    } catch (err) {
      expect(err).to.be.an.instanceof(Error)
    }
    expect(random.randomNumber.bind(null, 0)).to.throw(Error)
  })
})
