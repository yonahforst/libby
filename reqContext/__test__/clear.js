const { test } = require('tap')

const clear = require('../clear')

test('clear', assert => {
  global.LIBBY_CONTEXT = { foo: 'bar' }
  
  clear()

  assert.false(global.LIBBY_CONTEXT, 'clears existing context')
  assert.end()
})