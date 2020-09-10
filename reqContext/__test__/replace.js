const { test } = require('tap')

const replace = require('../replace')

test('replace', assert => {
  global.LIBBY_CONTEXT = { foo: 'bar' }
  
  const expected = {
    'x-libby-foo': 'bar',
    'x-libby-bar': 'foo',
  }

  replace({
    foo: 'bar',
    'x-libby-bar': 'foo',
  })

  assert.deepEquals(global.LIBBY_CONTEXT, expected, 'replaces existing context')
  assert.end()
})