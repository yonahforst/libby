const { test } = require('tap')

const clear = require('../clear')

test('clear', assert => {
  global.CONTEXT = { foo: 'bar' }
  
  clear()

  assert.false(global.CONTEXT, 'clears existing context')
  assert.end()
})