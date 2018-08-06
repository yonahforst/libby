const { test } = require('tap')

const replace = require('../replace')

test('replace', assert => {
  global.CONTEXT = { foo: 'bar' }
  
  const expected = {
    'x-correlation-foo': 'bar',
    'x-correlation-bar': 'foo',
  }

  replace({
    foo: 'bar',
    'x-correlation-bar': 'foo',
  })

  assert.deepEquals(global.CONTEXT, expected, 'replaces existing context')
  assert.end()
})