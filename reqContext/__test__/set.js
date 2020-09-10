const { test } = require('tap')

const set = require('../set')

test('set', assert => {
  global.LIBBY_CONTEXT = undefined

  const expected = { 'x-libby-foo': 'bar' }

  set('foo', 'bar')

  assert.deepEquals(global.LIBBY_CONTEXT, expected, 'sets context with key prefix')
  assert.end()
})

test('set - with prefix', assert => {
  global.LIBBY_CONTEXT = { 'x-libby-foo': 'bar' }
  
  const expected = { 
    'x-libby-foo': 'bar',
    'x-libby-bar': 'foo',
  }

  set('x-libby-bar', 'foo')

  assert.deepEquals(global.LIBBY_CONTEXT, expected, 'does not add prefix if it already exists')
  assert.end()
})