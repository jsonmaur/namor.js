import test from 'ava'
import namor from './index'

// -----------------------------------------------------------------------------
// exports
// -----------------------------------------------------------------------------

test('exports', (t) => {
  t.is(typeof namor.generate, 'function')
  t.is(typeof namor.isValid, 'function')
})
