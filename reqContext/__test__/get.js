const { test } = require('tap')

const get = require('../get')

test('get', assert => {
  global.LIBBY_CONTEXT = { foo: 'bar', 'x-libby-bar': 'baz' }
  
  assert.deepEquals(get(), { foo: 'bar', bar: 'baz' }, 'returns context')
  assert.end()
})

test('get - missing context', assert => {
  global.LIBBY_CONTEXT = undefined
  
  assert.deepEquals(get(), { }, 'empty object')
  assert.end()
})