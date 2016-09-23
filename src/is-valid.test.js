import test from 'ava'
import isValid from './is-valid'

test('isValid()', (t) => {
  t.true(isValid('my-website'))
  t.false(isValid('-my-website'))
  t.false(isValid('my-website-'))
  t.false(isValid('mywebs%ite'))
  t.false(isValid('my$website'))
  t.false(isValid('$mywebsite'))
  t.false(isValid('mywebsite!'))
  t.false(isValid('my website'))
  t.false(isValid('myweb'))
  t.false(isValid('mywebsitemywebsitemywebsitemywebsitemywebsitemywebsite'))
  t.false(isValid('login'))
  t.false(isValid('authentication'))
})
